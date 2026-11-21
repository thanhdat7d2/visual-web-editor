# Contributing

Thank you for your interest in contributing to **Carostar Design**!

## Architecture Principles

- **Zero-build frontend**: Keep frontend code in standard ES Modules (`public/js/`) and modular CSS (`public/css/`) without requiring a bundler.
- **Strict HTML allowlist**: Any element added to the canvas must be registered in `public/js/catalog/html-elements.js`.
- **Standard-library backend**: Keep the Python backend (`backend/`) dependency-free using only Python's standard library.

## Local Development

1. Run the development server:
   ```bash
   python run.py
   ```
2. Run all automated checks before opening a pull request:
   ```bash
   python -m unittest discover -s tests -v
   node --test tests/test_catalog.mjs
   ```

## Pull Request Checklist

- [ ] Code is split into focused modules (no monolithic files).
- [ ] All Python and JavaScript tests pass locally.
- [ ] No generated files from `exports/` or `__pycache__/` are committed.
