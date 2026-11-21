import json
import tempfile
import unittest
from pathlib import Path

from backend.exporter import export_project, render_frame_html


class TestExporter(unittest.TestCase):
    def test_render_frame_html_includes_head_and_body(self):
        html = render_frame_html(
            {
                "name": "landing",
                "backgroundColor": "#fafafa",
                "headHtml": '<meta name="description" content="Demo">',
                "html": '<section id="el-1"><h1>Hello</h1></section>',
            }
        )
        self.assertIn("<!DOCTYPE html>", html)
        self.assertIn("<title>landing</title>", html)
        self.assertIn('<meta name="description" content="Demo">', html)
        self.assertIn("background-color: #fafafa;", html)
        self.assertIn('<section id="el-1"><h1>Hello</h1></section>', html)

    def test_export_project_writes_json_css_and_frames(self):
        payload = {
            "globalCSS": "body { font-family: Inter, sans-serif; }",
            "frames": [
                {"name": "home", "backgroundColor": "#ffffff", "html": "<p>Home</p>"},
                {"name": "about", "backgroundColor": "#f0f0f0", "html": "<p>About</p>"},
            ],
        }
        with tempfile.TemporaryDirectory() as tmp:
            export_project(payload, tmp)
            out = Path(tmp)

            self.assertTrue((out / "project.json").exists())
            self.assertTrue((out / "style.css").exists())
            self.assertTrue((out / "home.html").exists())
            self.assertTrue((out / "about.html").exists())

            saved = json.loads((out / "project.json").read_text(encoding="utf-8"))
            self.assertEqual(len(saved["frames"]), 2)
            self.assertIn("<p>Home</p>", (out / "home.html").read_text(encoding="utf-8"))
            self.assertIn("font-family: Inter", (out / "style.css").read_text(encoding="utf-8"))


if __name__ == "__main__":
    unittest.main()
