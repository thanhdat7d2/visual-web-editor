import json
import os
from pathlib import Path


def export_project(data: dict, exports_dir: str | os.PathLike = "exports") -> None:
    """Persist project JSON, global stylesheet, and per-frame HTML files."""
    out_dir = Path(exports_dir)
    out_dir.mkdir(parents=True, exist_ok=True)

    with open(out_dir / "project.json", "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2)

    global_css = data.get("globalCSS", "")
    with open(out_dir / "style.css", "w", encoding="utf-8") as f:
        f.write(global_css)

    for frame in data.get("frames", []):
        filename = f"{frame.get('name', 'index')}.html"
        html_content = render_frame_html(frame)
        with open(out_dir / filename, "w", encoding="utf-8") as f:
            f.write(html_content)


def render_frame_html(frame: dict) -> str:
    """Render a complete standalone HTML5 document for a single frame."""
    extra_head = frame.get("headHtml", "")
    extra_head_block = f"\n    {extra_head}" if extra_head else ""
    return f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{frame.get('name', 'Page')}</title>
    <link rel="stylesheet" href="style.css">{extra_head_block}
    <style>
        body {{
            margin: 0;
            padding: 0;
            overflow-x: hidden;
            background-color: {frame.get('backgroundColor', '#ffffff')};
        }}
    </style>
</head>
<body>
    {frame.get('html', '')}
</body>
</html>"""
