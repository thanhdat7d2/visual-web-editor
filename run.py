import argparse

from backend.server import serve


def main() -> None:
    parser = argparse.ArgumentParser(description="Run the Visual Web Editor local server.")
    parser.add_argument("--port", type=int, default=8000, help="Port to listen on (default: 8000)")
    parser.add_argument("--no-browser", action="store_true", help="Do not automatically open the browser")
    args = parser.parse_args()

    serve(port=args.port, open_in_browser=not args.no_browser)


if __name__ == "__main__":
    main()
