#!/usr/bin/env node
// UX-law hook: PostToolUse on Edit/Write of an .html file. Scans the saved page at phone width
// and pushes new immediate-tier findings into Claude's context. Contract: never break a turn,
// always exit 0. Repeat findings for the same file are not re-sent (cache in .ux-laws/cache.json).
// Turn off per project with .ux-laws/config.json { "enabled": false }.
import fs from 'node:fs';
import path from 'node:path';
import { audit, enrich, formatText, loadConfig } from './detect.mjs';

const say = text => process.stdout.write(JSON.stringify({ hookSpecificOutput: { hookEventName: 'PostToolUse', additionalContext: text } }));

async function main() {
  let ev = {};
  try { const chunks = []; for await (const c of process.stdin) chunks.push(c); ev = JSON.parse(Buffer.concat(chunks).toString() || '{}'); } catch { return; }
  const file = ev.tool_input?.file_path;
  if (!file || !/\.html?$/i.test(file) || !fs.existsSync(file)) return;
  if (/\/(node_modules|\.git|fixtures)\//.test(file)) return;

  const config = loadConfig(path.dirname(file));
  if (config.enabled === false) return;
  const root = config._root || process.env.CLAUDE_PROJECT_DIR || process.cwd();
  const rel = path.relative(root, file);
  const globRe = g => new RegExp('^' + g.split('**').map(s => s.split('*').map(x => x.replace(/[.+?^${}()|[\]\\]/g, '\\$&')).join('[^/]*')).join('.*') + '$');
  if ((config.ignoreFiles || []).some(g => globRe(g).test(rel))) return;

  let raw;
  try { raw = await audit(file, { timeoutMs: 12000 }).catch(() => audit(file, { timeoutMs: 12000 })); } catch { return; }
  const findings = enrich(raw, { config });

  const cacheDir = path.join(root, '.ux-laws');
  const cachePath = path.join(cacheDir, 'cache.json');
  let cache = {};
  try { cache = JSON.parse(fs.readFileSync(cachePath, 'utf8')); } catch {}
  const key = f => `${f.id}|${f.selector}|${f.snippet}`;
  const before = new Set(cache[file] || []);
  const fresh = findings.filter(f => !before.has(key(f)));
  cache[file] = findings.map(key);
  try { fs.mkdirSync(cacheDir, { recursive: true }); fs.writeFileSync(cachePath, JSON.stringify(cache)); } catch {}

  if (fresh.length) {
    say(`[ux-laws] The UX-law check of ${rel} at phone width (375px) found ${fresh.length} new problem${fresh.length > 1 ? 's' : ''}.` +
      (findings.length > fresh.length ? ` ${findings.length - fresh.length} problems from an earlier check are still open.` : '') +
      ` The check looked only at visible elements. Fix the real problems now. If a finding is incorrect, add data-ux-ignore="<rule-id>" to the element and tell the user. Write all UX-law output in ASD-STE100.\n` +
      formatText(fresh, { max: 4 }));
  } else if (!findings.length && before.size) {
    say(`[ux-laws] ${rel}: the earlier UX-law problems are fixed. The check found no problems.`);
  }
}

main().catch(() => {}).finally(() => process.exit(0));
