#!/usr/bin/env node
// UX-law detector. Renders a page in headless Chrome at phone width, runs page-audit.js,
// and prints findings mapped to rules.mjs. No npm dependencies: talks to Chrome over the
// DevTools protocol with Node's built-in WebSocket (Node 22+).
//
//   node detect.mjs <file.html|url> [--width 375] [--height 812] [--json] [--all]
//
// --all includes advisory rules. Exit 0 = clean, 2 = findings, 1 = could not run.
// Project config (optional): .ux-laws/config.json { "ignoreRules": [], "ignoreFiles": [] }

import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawn } from 'node:child_process';
import { pathToFileURL, fileURLToPath } from 'node:url';
import { RULES_BY_ID } from './rules.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));

const CHROME_CANDIDATES = [
  process.env.UX_LAWS_CHROME,
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Chromium.app/Contents/MacOS/Chromium',
  '/usr/bin/google-chrome', '/usr/bin/chromium', '/usr/bin/chromium-browser',
].filter(Boolean);

export function findChrome() {
  for (const c of CHROME_CANDIDATES) if (fs.existsSync(c)) return c;
  const pw = path.join(os.homedir(), 'Library/Caches/ms-playwright');
  if (fs.existsSync(pw)) {
    for (const d of fs.readdirSync(pw).filter(d => d.startsWith('chromium')).sort().reverse()) {
      for (const sub of ['chrome-mac/Chromium.app/Contents/MacOS/Chromium', 'chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing']) {
        const p = path.join(pw, d, sub);
        if (fs.existsSync(p)) return p;
      }
    }
  }
  return null;
}

export function loadConfig(startDir) {
  for (let d = path.resolve(startDir); ; d = path.dirname(d)) {
    const p = path.join(d, '.ux-laws', 'config.json');
    if (fs.existsSync(p)) { try { return { ...JSON.parse(fs.readFileSync(p, 'utf8')), _root: d }; } catch { return { _root: d }; } }
    if (d === path.dirname(d)) return {};
  }
}

function globToRe(g) {
  return new RegExp('^' + g.split('**').map(s => s.split('*').map(x => x.replace(/[.+?^${}()|[\]\\]/g, '\\$&')).join('[^/]*')).join('.*') + '$');
}

function cdp(wsUrl) {
  const ws = new WebSocket(wsUrl);
  let id = 0;
  const pending = new Map(), listeners = [];
  ws.onmessage = ev => {
    const msg = JSON.parse(ev.data);
    if (msg.id && pending.has(msg.id)) {
      const { resolve, reject } = pending.get(msg.id); pending.delete(msg.id);
      msg.error ? reject(new Error(msg.error.message)) : resolve(msg.result);
    } else listeners.forEach(l => l(msg));
  };
  const ready = new Promise((res, rej) => { ws.onopen = res; ws.onerror = rej; });
  return {
    ready,
    send: (method, params = {}, sessionId) => new Promise((resolve, reject) => {
      const mid = ++id; pending.set(mid, { resolve, reject });
      ws.send(JSON.stringify({ id: mid, method, params, ...(sessionId ? { sessionId } : {}) }));
    }),
    on: fn => listeners.push(fn),
    close: () => ws.close(),
  };
}

export async function audit(target, { width = 375, height = 812, timeoutMs = 15000 } = {}) {
  const chrome = findChrome();
  if (!chrome) throw new Error('Chrome not found (set UX_LAWS_CHROME to a Chrome/Chromium binary)');
  const url = /^https?:|^file:/.test(target) ? target : pathToFileURL(path.resolve(target)).href;
  const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'ux-laws-'));
  const proc = spawn(chrome, [
    '--headless=new', '--remote-debugging-port=0', `--user-data-dir=${profile}`,
    '--no-first-run', '--no-default-browser-check', '--disable-gpu', '--hide-scrollbars',
    '--allow-file-access-from-files', 'about:blank',
  ], { stdio: ['ignore', 'ignore', 'pipe'] });

  const cleanup = () => { try { proc.kill('SIGKILL'); } catch {} try { fs.rmSync(profile, { recursive: true, force: true }); } catch {} };
  const timer = setTimeout(cleanup, timeoutMs);
  try {
    const wsUrl = await new Promise((resolve, reject) => {
      let buf = '';
      proc.stderr.on('data', d => { buf += d; const m = buf.match(/DevTools listening on (ws:\/\/\S+)/); if (m) resolve(m[1]); });
      proc.on('exit', () => reject(new Error('Chrome exited before DevTools was ready')));
    });
    const c = cdp(wsUrl); await c.ready;
    const { targetId } = await c.send('Target.createTarget', { url: 'about:blank' });
    const { sessionId } = await c.send('Target.attachToTarget', { targetId, flatten: true });
    const s = (m, p) => c.send(m, p, sessionId);
    await s('Page.enable');
    await s('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: 2, mobile: true });
    await s('Emulation.setTouchEmulationEnabled', { enabled: true, maxTouchPoints: 5 });
    const loaded = new Promise(res => c.on(m => { if (m.sessionId === sessionId && m.method === 'Page.loadEventFired') res(); }));
    await s('Page.navigate', { url });
    await Promise.race([loaded, new Promise(r => setTimeout(r, 8000))]);
    await new Promise(r => setTimeout(r, 900)); // fonts, framework renders, entry animations
    const src = fs.readFileSync(path.join(HERE, 'page-audit.js'), 'utf8');
    const { result, exceptionDetails } = await s('Runtime.evaluate', { expression: `window.__UX_W=${width};\n` + src, returnByValue: true, awaitPromise: true });
    if (exceptionDetails) throw new Error('audit script failed: ' + (exceptionDetails.exception?.description || exceptionDetails.text));
    c.close();
    return { url, ...result.value };
  } finally {
    clearTimeout(timer); cleanup();
  }
}

export function enrich(raw, { includeAdvisory = false, config = {} } = {}) {
  const ignore = new Set(config.ignoreRules || []);
  return raw.findings
    .filter(f => RULES_BY_ID[f.id] && !ignore.has(f.id))
    .map(f => ({ ...RULES_BY_ID[f.id], selector: f.selector, snippet: f.snippet }))
    .filter(f => includeAdvisory || f.tier !== 'advisory');
}

export function formatText(findings, { max = 6 } = {}) {
  const byRule = new Map();
  for (const f of findings) byRule.set(f.id, [...(byRule.get(f.id) || []), f]);
  const out = [];
  for (const [id, fs_] of byRule) {
    const r = fs_[0];
    out.push(`• ${r.title}. Found ${fs_.length} time${fs_.length > 1 ? 's' : ''}.${r.tier === 'advisory' ? ' Advice only.' : ''} (${r.law}; ${id})`);
    out.push(`  Result: ${r.why}`);
    out.push(`  Fix: ${r.fix}`);
    for (const f of fs_.slice(0, max)) out.push(`    - ${f.selector}: ${f.snippet}`);
    if (fs_.length > max) out.push(`    - ${fs_.length - max} more.`);
  }
  return out.join('\n');
}

async function main() {
  const args = process.argv.slice(2);
  const opt = k => { const i = args.indexOf(k); return i >= 0 ? args[i + 1] : undefined; };
  const target = args.find((a, i) => !a.startsWith('--') && !['--width', '--height'].includes(args[i - 1]));
  if (!target) { console.error('usage: detect.mjs <file|url> [--width 375] [--height 812] [--json] [--all]'); process.exit(1); }
  const config = /^https?:/.test(target) ? loadConfig(process.cwd()) : loadConfig(path.dirname(path.resolve(target)));
  if (!/^https?:/.test(target) && config._root) {
    const rel = path.relative(config._root, path.resolve(target));
    if ((config.ignoreFiles || []).some(g => globToRe(g).test(rel))) { console.log('The project settings in .ux-laws/config.json tell the check to ignore this file.'); process.exit(0); }
  }
  try {
    const o = { width: +(opt('--width') || 375), height: +(opt('--height') || 812) };
    const raw = await audit(target, o).catch(() => audit(target, o)); // one retry: Chrome start-up can race
    const findings = enrich(raw, { includeAdvisory: args.includes('--all'), config });
    if (args.includes('--json')) console.log(JSON.stringify({ url: raw.url, meta: raw.meta, findings }, null, 2));
    else {
      console.log(`UX-law check of ${raw.url} at ${raw.meta.width}px. The check found ${raw.meta.interactive} controls and ${raw.meta.fields} fields.`);
      console.log(findings.length ? formatText(findings) : 'The check found no problems.');
    }
    process.exit(findings.filter(f => f.tier !== 'advisory').length ? 2 : 0);
  } catch (e) {
    console.error('The UX-law check did not run. Reason: ' + (e?.message || e?.type || String(e)));
    process.exit(1);
  }
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) main();
