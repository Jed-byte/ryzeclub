# Publishing the output to Google Docs

Use this when the user asks to "push", "send", "publish" or "put this in Google Docs / Drive", or when they want to share the brief or plan with a designer, engineer or the CEO. Skip it silently if no Google Drive tool is available in the session.

## Why HTML, not markdown

The Drive connector creates a native Google Doc when it receives HTML with `contentMimeType: text/html`. Markdown pasted as plain text arrives as literal `#` and `|` characters. So convert first: headings to `<h1>`–`<h3>`, bullet lists to `<ul>`, numbered lists to `<ol>`, tables to `<table>`, bold to `<strong>`, and fenced code blocks (the brief and handoff-note templates) to `<pre>`. Keep it simple; Google Docs ignores most CSS.

## Steps

Verified 2026-09-29: a 2,300-word brief converted this way arrived as a native Google Doc with headings, lists and bold intact.

1. Finish the markdown document first and show it in chat. Publish only what the user has seen.
2. Convert the markdown to HTML with the bundled script: `python3 scripts/md_to_gdoc_html.py plan.md > plan.html` (path relative to this skill's folder). It handles headings, lists, tables, code blocks, bold and links. Do not hand-write the HTML.
3. Call the Drive `create_file` tool with:
   - `title`: the document's H1, e.g. `Pulse Analytics — Design brief`
   - `contentMimeType`: `text/html`
   - `textContent`: the HTML
   - `parentId`: only if the user named a Drive folder; otherwise omit and it lands in My Drive
4. If the user named a recipient (the designer, the FE lead), call `share_file` with their email and role `commenter` for a brief or plan, `writer` only if asked. Never share with anyone the user did not name.
5. Reply with the document link and the title, one line. Do not paste the document again.

## What not to do

- Do not create the Doc before the content is final; edits afterwards need a new upload, since the connector cannot update body text.
- Do not put the prototype code or the skill's own instructions into the Doc.
- Do not guess a Drive folder or a recipient email.
