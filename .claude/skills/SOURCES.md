# Where these skills come from

Copied on 18 Nov 2026 so every session on this repo has them. Each keeps its upstream licence. To update one, copy the folder again from the source at a newer commit.

| Skill | Source | Commit | Licence |
|---|---|---|---|
| `ux-law-gates` | Written for this repo. Laws, detector and page audit are from the account-level `ux-laws` skill. `detect.mjs` was patched to find Linux Chromium and run as root. | | |
| `impeccable` | github.com/pbakaus/impeccable `.claude/skills/impeccable` | 8644175 | Apache 2.0 |
| `humanizer` | github.com/blader/humanizer | 8c307f3 | MIT |
| `diagram-design` | github.com/cathrynlavery/diagram-design `skills/diagram-design` | 7a12007 | MIT |
| `security-audit` | github.com/cloudflare/security-audit-skill `skills/security-audit` | c1c8a8c | MIT |
| `brainstorming`, `verification-before-completion`, `systematic-debugging`, `writing-plans` | github.com/obra/superpowers `skills/` | 2ce8aa1 | MIT |
| `grill-me`, `handoff` | github.com/mattpocock/skills `skills/productivity/` | 5beb35b | MIT |
| `frontend-ui-engineering`, `browser-testing-with-devtools`, `spec-driven-development` | github.com/addyosmani/agent-skills `skills/` | aeac41d | MIT |

The three big collections (Superpowers, Matt Pocock, Addy Osmani) have 15, 38 and 25 skills. Only the ones that fit a design prototype were copied, so that their names do not clash (two have a `test-driven-development`, and Matt Pocock's `code-review` clashes with the built-in one).

Not copied:

- **Graphify** (github.com/safishamsi/graphify) is a Python tool, not a folder skill. To use it, run `pip install graphify` and see its README.
- **Ponytail** and **I Have ADHD** were in the list but could not be found on GitHub under the names in the post.
- **Impeccable** downloads its engine binary from its GitHub releases the first time `scripts/impeccable` runs.
