# Carostar Design

A lightweight, Figma-inspired visual HTML page builder with an infinite pan/zoom canvas, strict semantic HTML element palette, live DOM tree inspector, and static HTML/CSS code export — built with **zero build tools** using native ES Modules, modular CSS, and Python's standard library.

---

## Key Features

- **Strict 116-Element HTML Catalog**: Add only standard, categorized HTML elements across **Root (12)**, **Sectioning (17)**, **Elements (56)**, and **Text (31)** with live search, category filtering, hover descriptions, click-to-place, and double-click quick-add.
- **Smooth Infinite Canvas**:
  - `Space + Drag` panning with frame-rate-independent exponential smoothing.
  - Smooth cursor-centered wheel zooming (`10%` – `500%`) with a synchronized dot grid and zoom HUD.
  - Drag, resize, and rotate controls (powered by Moveable.js) mounted inside the transformed canvas space so selection indicators stay pixel-locked during zoom and pan.
- **Live DOM / Element Tree**: Collapsible, recursive tree displaying every frame, top-level element, and nested child node (`<table>`, `<thead>`, `<tr>`, `<ul>`, `<li>`, `<details>`, `<summary>`, etc.) for direct selection and inspection.
- **Properties & HTML Attributes Inspector**: Edit layout geometry, text/inner content, arbitrary HTML attributes (`href`, `src`, `alt`, `type`, `placeholder`, `datetime`, etc.), colors, typography, and per-element custom CSS.
- **Multi-Frame Static Code Export**: Exports every frame as a standalone `.html` file (placing document-head metadata like `<meta>`, `<link>`, `<style>`, `<script>`, `<title>` inside `<head>`), alongside a shared `style.css` and `project.json`.

---

## Tech Stack

| Layer | Technology |
| --- | --- |
| Frontend | Vanilla JavaScript (Native ES Modules), Modular CSS, HTML5 |
| Canvas Manipulation | [Moveable.js](https://daybrush.com/moveable/) + custom `requestAnimationFrame` Camera Controller |
| Backend | Python 3 Standard Library (`http.server`, `socketserver`) |
| Testing & CI | Python `unittest`, Node.js `node:test`, GitHub Actions |

---

## Project Structure

```text
carostar-design/
├── .github/workflows/
│   └── ci.yml                 # Automated CI (Python & JS test suites)
├── backend/
│   ├── __init__.py
│   ├── exporter.py            # Static HTML/CSS & project.json exporter
│   └── server.py              # HTTP server with explicit ES module MIME types
├── public/
│   ├── index.html             # Application shell
│   ├── css/
│   │   ├── main.css           # Entry stylesheet
│   │   ├── tokens.css         # Theme variables, reset & base buttons
│   │   ├── layout.css         # Toolbar, sidebars & tab layout
│   │   ├── palette.css        # HTML Elements palette styles
│   │   ├── dom-tree.css       # Recursive DOM tree styles
│   │   ├── canvas.css         # Infinite canvas, frames & zoom HUD
│   │   └── inspector.css      # Properties panel & attribute editor
│   └── js/
│       ├── main.js            # App entry point & event wiring
│       ├── catalog/
│       │   └── html-elements.js   # Strict 116-element HTML catalog
│       ├── core/
│       │   ├── state.js       # Shared editor state
│       │   └── utils.js       # Pure geometry, color & DOM helpers
│       ├── canvas/
│       │   ├── camera.js      # Smooth Space+Drag pan & cursor zoom
│       │   └── elements.js    # Element & frame creation/duplication/deletion
│       ├── panels/
│       │   ├── palette.js     # Searchable HTML elements palette
│       │   ├── dom-tree.js    # Collapsible DOM / Element tree
│       │   └── inspector.js   # Properties & HTML attributes inspector
│       └── io/
│           └── exporter.js    # DOM serializer & /api/save client
├── tests/
│   ├── test_exporter.py       # Backend HTML/CSS export unit tests
│   └── test_catalog.mjs       # Frontend catalog & utility unit tests
├── run.py                     # CLI entry point
├── CONTRIBUTING.md
└── LICENSE
```

---

## Getting Started

### Prerequisites

- **Python 3.9+** (standard library only — no `pip install` required)
- **Node.js 18+** *(optional, only needed to run the JavaScript test suite)*

### Run Locally

```bash
python run.py
```

This starts the local server at `http://localhost:8000` and opens it in your default browser.

CLI options:

```bash
python run.py --port 3000 --no-browser
```

---

## Controls & Shortcuts

| Action | Control |
| --- | --- |
| Pan Canvas | Hold `Space` + Left-click Drag |
| Zoom Canvas | Mouse Wheel / Trackpad Scroll (zooms toward cursor) |
| Place Element | Click a tag in the Elements palette, then click inside a frame |
| Quick-Add Element | Double-click any tag in the Elements palette |
| Select Tool | `V` or `Esc` |

---

## Running Tests

```bash
# Backend unit tests
python -m unittest discover -s tests -v

# Frontend catalog & utility tests
node --test tests/test_catalog.mjs
```

---

## License

Licensed under the [MIT License](LICENSE).
