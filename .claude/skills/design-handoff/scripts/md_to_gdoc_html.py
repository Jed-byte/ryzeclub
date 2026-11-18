#!/usr/bin/env python3
"""Convert a markdown file to simple HTML that Google Drive turns into a native Google Doc.
Usage: python3 md_to_gdoc_html.py input.md > output.html
Handles: h1-h3, paragraphs, bullet and numbered lists, tables, fenced code blocks, bold, italics, inline code."""
import re, sys, html

def inline(t):
    t = html.escape(t)
    t = re.sub(r"\*\*(.+?)\*\*", r"<strong>\1</strong>", t)
    t = re.sub(r"(?<![\w*])\*([^*\n]+?)\*(?![\w*])", r"<em>\1</em>", t)
    t = re.sub(r"`([^`]+)`", r"<code>\1</code>", t)
    t = re.sub(r"\[([^\]]+)\]\((https?://[^)]+)\)", r'<a href="\2">\1</a>', t)
    return t

def convert(src):
    lines = src.split("\n"); out = []; i = 0
    while i < len(lines):
        l = lines[i]
        if l.startswith("```"):
            j = i + 1; buf = []
            while j < len(lines) and not lines[j].startswith("```"): buf.append(lines[j]); j += 1
            out.append("<pre>" + html.escape("\n".join(buf)) + "</pre>"); i = j + 1; continue
        m = re.match(r"^(#{1,3})\s+(.*)", l)
        if m:
            n = len(m.group(1)); out.append(f"<h{n}>{inline(m.group(2))}</h{n}>"); i += 1; continue
        if l.startswith("|"):
            rows = []
            while i < len(lines) and lines[i].startswith("|"):
                if not re.match(r"^\|\s*:?-", lines[i]):
                    rows.append([c.strip() for c in lines[i].strip().strip("|").split("|")])
                i += 1
            cells = "".join("<tr>" + "".join(f"<{'th' if r == 0 else 'td'}>{inline(c)}</{'th' if r == 0 else 'td'}>" for c in row) + "</tr>" for r, row in enumerate(rows))
            out.append("<table border='1' cellpadding='4'>" + cells + "</table>"); continue
        if re.match(r"^\s*[-*]\s", l):
            items = []
            while i < len(lines) and re.match(r"^\s*[-*]\s", lines[i]):
                items.append(inline(re.sub(r"^\s*[-*]\s", "", lines[i]))); i += 1
            out.append("<ul>" + "".join(f"<li>{x}</li>" for x in items) + "</ul>"); continue
        if re.match(r"^\s*\d+\.\s", l):
            items = []
            while i < len(lines) and re.match(r"^\s*\d+\.\s", lines[i]):
                items.append(inline(re.sub(r"^\s*\d+\.\s", "", lines[i]))); i += 1
            out.append("<ol>" + "".join(f"<li>{x}</li>" for x in items) + "</ol>"); continue
        if l.startswith(">"):
            out.append("<blockquote>" + inline(l.lstrip("> ")) + "</blockquote>"); i += 1; continue
        if l.strip() in ("", "---"):
            i += 1; continue
        out.append(f"<p>{inline(l)}</p>"); i += 1
    return "\n".join(out)

if __name__ == "__main__":
    src = open(sys.argv[1], encoding="utf-8").read() if len(sys.argv) > 1 else sys.stdin.read()
    sys.stdout.write(convert(src))
