import http.server
import json
import socketserver
import threading
import time
import webbrowser
from pathlib import Path

from backend.exporter import export_project

PROJECT_ROOT = Path(__file__).resolve().parent.parent
PUBLIC_DIR = PROJECT_ROOT / "public"
EXPORTS_DIR = PROJECT_ROOT / "exports"


class ReusableThreadingTCPServer(socketserver.ThreadingTCPServer):
    allow_reuse_address = True
    daemon_threads = True


class EditorRequestHandler(http.server.SimpleHTTPRequestHandler):
    extensions_map = {
        **http.server.SimpleHTTPRequestHandler.extensions_map,
        ".js": "application/javascript",
        ".mjs": "application/javascript",
        ".css": "text/css",
    }

    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(PUBLIC_DIR), **kwargs)

    def do_POST(self):
        if self.path == "/api/save":
            try:
                content_length = int(self.headers.get("Content-Length", "0"))
                post_data = self.rfile.read(content_length)
                data = json.loads(post_data.decode("utf-8"))
                export_project(data, EXPORTS_DIR)
            except (ValueError, OSError) as exc:
                self.send_response(400)
                self.send_header("Content-type", "application/json")
                self.end_headers()
                self.wfile.write(json.dumps({"status": "error", "message": str(exc)}).encode("utf-8"))
                return

            self.send_response(200)
            self.send_header("Content-type", "application/json")
            self.end_headers()
            self.wfile.write(json.dumps({"status": "success"}).encode("utf-8"))
        else:
            self.send_response(404)
            self.end_headers()


def _open_browser(url: str) -> None:
    time.sleep(0.8)
    webbrowser.open(url)


def serve(port: int = 8000, open_in_browser: bool = True) -> None:
    PUBLIC_DIR.mkdir(parents=True, exist_ok=True)
    EXPORTS_DIR.mkdir(parents=True, exist_ok=True)

    url = f"http://localhost:{port}"
    with ReusableThreadingTCPServer(("", port), EditorRequestHandler) as httpd:
        print(f"Serving Carostar Design at {url}")
        if open_in_browser:
            threading.Thread(target=_open_browser, args=(url,), daemon=True).start()
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nShutting down server.")
