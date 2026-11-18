# hooks

The on-save scan. After every Edit or Write of an `.html`/`.htm` file, `scripts/hook.mjs` renders the page at 375px, runs the immediate-tier rules (not advisory ones) and pushes **new** findings into the conversation as a `[ux-laws]` note. Findings already reported for that file are not repeated; when a file goes from findings to clean, it says so once. It never blocks or fails a turn. It skips `node_modules`, `.git` and `fixtures` folders.

It is wired in the project's `.claude/settings.local.json` (machine-local, not committed) as a PostToolUse hook:

```json
{ "matcher": "Edit|Write", "hooks": [{ "type": "command", "command": "[ ! -f \"$HOME/.claude/skills/ux-laws/scripts/hook.mjs\" ] || node \"$HOME/.claude/skills/ux-laws/scripts/hook.mjs\"", "timeout": 20, "statusMessage": "Checking UX laws" }] }
```

Project config: `.ux-laws/config.json` at the project root (the cache lives next to it in `.ux-laws/cache.json`).

```json
{ "enabled": true, "ignoreRules": [], "ignoreFiles": ["docs/**", "*.dc.html"] }
```

| Action | What to do |
|---|---|
| `status` | Show whether the hook entry exists in `.claude/settings.local.json`, and print `.ux-laws/config.json` |
| `on` | Add the hook entry above if missing; set `"enabled": true` |
| `off` | Set `"enabled": false` (leave the settings entry) |
| `ignore <rule-id>` | Add to `ignoreRules`. Ask the user first: it silences the rule everywhere |
| `ignore-file <glob>` | Add to `ignoreFiles`. Ask the user first |
| `reset` | Delete `.ux-laws/cache.json` so every finding is reported again |

When a `[ux-laws]` note arrives: triage per SKILL.md, fix real problems in the same turn, and mention any `data-ux-ignore` you added.
