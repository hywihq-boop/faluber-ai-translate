# Contributing to Faluber Translate

Thanks for your interest in contributing! This document outlines how to get started.

## Getting Started

1. Fork the repo and clone it locally
2. Load the extension in Chrome:
   - Go to `chrome://extensions/`
   - Enable **Developer mode**
   - Click **Load unpacked** and select the project folder
3. Make your changes
4. Test thoroughly (see below)
5. Submit a PR

## Development

### Architecture

Three runtime environments:

| Context | File | Role |
|---------|------|------|
| Content Script | `content/content.js` | DOM traversal, text replacement, floating UI |
| Service Worker | `background/service-worker.js` | API calls, token tracking, prompt templates |
| Popup | `popup/popup.*` | Settings UI, API management |

### Debugging

- **Content script logs**: Open page DevTools (F12) → Console → filter `[LF`
- **Service Worker logs**: `chrome://extensions` → Faluber Translate → "Service Worker" link
- **API logs**:
  ```js
  chrome.storage.local.get('lf_api_log', d => console.table(d.lf_api_log || []))
  ```

### Code Style

- Match the existing style — no reformatting
- Comments in English for new code
- Keep changes minimal and focused

## Pull Requests

- One feature/fix per PR
- Describe what changed and why
- Test your changes on at least 2 different websites
- Update `manifest.json` version if applicable

## Reporting Bugs

Use the [Bug Report](https://github.com/your-username/faluber-translate/issues/new?template=bug_report.md) template. Include:
- Chrome version
- Extension version
- Steps to reproduce
- Expected vs actual behavior

## Feature Requests

Use the [Feature Request](https://github.com/your-username/faluber-translate/issues/new?template=feature_request.md) template.
