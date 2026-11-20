import http.server
import socketserver
import webbrowser
import threading
import json
import os
import time

PORT = 8000
DIRECTORY = "public"
EXPORTS_DIR = "exports"

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)

    def do_POST(self):
        if self.path == '/api/save':
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            data = json.loads(post_data.decode('utf-8'))
            
            os.makedirs(EXPORTS_DIR, exist_ok=True)
            
            # Save the project state
            with open(os.path.join(EXPORTS_DIR, 'project.json'), 'w') as f:
                json.dump(data, f, indent=2)

            # Generate HTML pages
            frames = data.get('frames', [])
            global_css = data.get('globalCSS', '')
            
            with open(os.path.join(EXPORTS_DIR, 'style.css'), 'w', encoding='utf-8') as f:
                f.write(global_css)

            for frame in frames:
                filename = frame.get('name', 'index') + '.html'
                html_content = f"""<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{frame.get('name', 'Page')}</title>
    <link rel="stylesheet" href="style.css">
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
                with open(os.path.join(EXPORTS_DIR, filename), 'w', encoding='utf-8') as f:
                    f.write(html_content)

            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({"status": "success"}).encode('utf-8'))
        else:
            self.send_response(404)
            self.end_headers()

def open_browser():
    # Wait a bit for the server to start
    time.sleep(1)
    webbrowser.open(f'http://localhost:{PORT}')

if __name__ == "__main__":
    os.makedirs(DIRECTORY, exist_ok=True)
    os.makedirs(EXPORTS_DIR, exist_ok=True)
    
    with socketserver.TCPServer(("", PORT), Handler) as httpd:
        print(f"Serving UI Builder at http://localhost:{PORT}")
        threading.Thread(target=open_browser).start()
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\nShutting down server.")
