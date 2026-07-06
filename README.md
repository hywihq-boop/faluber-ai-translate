[English](README.md) | [简体中文](README.zh-CN.md) | [繁體中文](README.zh-TW.md) | [日本語](README.ja.md) | [한국어](README.ko.md) | [Русский](README.ru.md) | [العربية](README.ar.md)

# 🌐 Faluber Translate — AI-Powered Web Page Translation

A Chrome browser extension that translates web pages using AI (OpenAI-compatible APIs like DeepSeek, OpenAI, Qwen, etc.). Built with Manifest V3, it performs text-node-level DOM manipulation for seamless translation across 50 target languages with a 20-language UI.

![version](https://img.shields.io/badge/version-2.0.10-7c5cfc)
![manifest](https://img.shields.io/badge/manifest-v3-blue)
![license](https://img.shields.io/badge/license-MIT-green)

## ✨ Features

- 🚀 **One-click full-page translation** — Click the icon or press `Alt+T`
- 🌍 **50 target languages** — AI-driven, supports any language pair
- ⚡ **Dual translation modes** — Standard (balanced) and High (maximum speed)
- 🔑 **Multi-API support** — 10 built-in provider presets (DeepSeek, OpenAI, Groq, Qwen, etc.)
- 💬 **Ctrl+Explain bubble** — Hover over a word + press Ctrl for AI-powered explanation
- 📋 **Translation panel** — Press `Alt+Q` for a side-by-side input/output translation panel
- 👆 **Hover to see original** — Mouse over translated text to reveal the source
- ↩️ **One-click restore** — Revert to original page at any time
- 📊 **Real-time progress** — Visual progress bar during translation
- 💾 **Smart caching** — In-memory + persistent cache with 1-hour TTL
- 🎨 **Clean dark UI** — Floating widget with collapsible design

## 📦 Installation

### 1. Load the Extension

1. Open Chrome/Edge and go to `chrome://extensions/`
2. Enable **Developer mode** (top-right toggle)
3. Click **Load unpacked**
4. Select the `faluber translate` folder
5. Done!

### 2. Configure API

1. Click the Faluber Translate icon in the toolbar
2. Choose a provider from the dropdown (DeepSeek, OpenAI, etc.)
3. Enter your **API Key**
4. Click **Test Connection** to verify
5. Click **Save**

### 3. Start Translating

- Open any web page, click the icon → **Translate Page**
- Or press **`Alt+T`**

## 🎮 Usage

| Action | How |
|--------|-----|
| Translate page | Click icon → "Translate" or `Alt+T` |
| Translate selection | Select text → press `Ctrl` |
| Translation panel | `Alt+Q` |
| Explain word | Hover over word → press `Ctrl` |
| Restore original | Click icon → "Restore" |
| Cancel translation | Press `Esc` |
| See original | Hover over translated text |
| Switch language | Use the popup language selectors |

## 🔧 Supported APIs

Built-in presets for 10 providers. Any OpenAI-compatible API works:

| Provider | API Base URL | Model |
|----------|-------------|-------|
| DeepSeek | `https://api.deepseek.com/v1` | `deepseek-chat` |
| OpenAI | `https://api.openai.com/v1` | `gpt-4o-mini` |
| Groq | `https://api.groq.com/openai/v1` | `llama-3.3-70b` |
| Together AI | `https://api.together.xyz/v1` | `meta-llama/...` |
| OpenRouter | `https://openrouter.ai/api/v1` | `openai/gpt-4o` |
| SiliconFlow | `https://api.siliconflow.cn/v1` | `deepseek-ai/...` |
| Moonshot | `https://api.moonshot.cn/v1` | `moonshot-v1-8k` |
| Zhipu | `https://open.bigmodel.cn/api/paas/v4` | `glm-4` |
| DashScope | `https://dashscope.aliyuncs.com/compatible-mode/v1` | `qwen-plus` |
| Custom | Any OpenAI-compatible endpoint | Any model |

## 📂 Project Structure

```
faluber translate/
├── manifest.json                 # Extension config (Manifest V3)
├── popup/
│   ├── popup.html                # Settings popup
│   ├── popup.js                  # Multi-API management logic
│   └── popup.css                 # Popup styles
├── content/
│   ├── content.js                # DOM text extraction & replacement
│   └── content.css               # Widget styles
├── background/
│   └── service-worker.js         # API calls & message routing
├── icons/                        # Extension icons
├── generate-icons.js             # Icon generation script (dev tool)
├── LICENSE
└── README.md
```

## 🛠️ How It Works

### Translation Flow

```
User triggers translation
  → Content Script traverses DOM, collects visible text nodes
  → Filters: visibility check, CJK dedup, min-length, cache dedup
  → Sorted by Y-coordinate, merged by adjacency
  → Batched and sent to Service Worker (3–8 concurrent workers)
  → Service Worker calls AI API (OpenAI-compatible format)
  → Results returned to Content Script for DOM replacement
  → Real-time progress bar + completion notification
```

### Smart Text Processing

- Skips `<script>`, `<style>`, `<code>`, and other non-content tags
- Filters pure numbers, URLs, emoji, and untranslatable content
- Checks `display:none`, `visibility:hidden`, and other visibility states
- Preserves HTML entities and special characters
- Adjacent text nodes (same parent or sibling parents) are merged before sending

### Translation Modes

| Parameter | Standard | High (Turbo) |
|-----------|----------|--------------|
| Concurrency | 3 | 8 |
| Batch size | 400 chars | 250 chars |
| Full page | No (viewport only) | Yes |
| Scroll detection | Yes | No |
| Hover detection | Yes | No |
| Mutation observer | Yes | Yes |

### Cache System

- **In-memory**: `Map<sourceText, translatedText>` for instant lookup
- **Persistent**: `chrome.storage.local`, up to 2,000 entries, 1-hour TTL
- **Auto-flush**: Every 30 seconds + on `beforeunload`
- **Auto-clear**: When target language changes

### Ctrl+Explain (Floating Bubble)

- Hover over a word + tap `Ctrl` (not hold)
- Or select text + press `Ctrl`
- Two-tier fallback: natural language prompt → HTML inspection
- Close with ✕, `Esc`, or click elsewhere

## 🔒 Privacy

- Your API key is stored locally in Chrome's sync storage
- All translation requests go directly from your browser to your configured API provider
- No third-party servers involved — your data stays between you and your API provider

## 📝 License

MIT — see [LICENSE](LICENSE) for details.
