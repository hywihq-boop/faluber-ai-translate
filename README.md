[English](README.md) | [简体中文](README.zh-CN.md) | [繁體中文](README.zh-TW.md) | [日本語](README.ja.md) | [한국어](README.ko.md) | [Русский](README.ru.md) | [العربية](README.ar.md)

<div align="center">
  <img src="icons/logo.png" width="96" height="96" style="border-radius:18px">

  # 🌐 Faluber Translate

  ### AI-Powered Web Page Translation — 50 Languages, 10 API Providers

  ![version](https://img.shields.io/badge/v2.0.10-7c5cfc?style=flat-square)
  ![manifest](https://img.shields.io/badge/MV3-blue?style=flat-square)
  ![license](https://img.shields.io/badge/MIT-green?style=flat-square)

  <br>

  <a href="https://github.com/hywihq-boop/faluber-translate/releases"><img src="https://img.shields.io/badge/⬇_Download_Latest-7c5cfc?style=for-the-badge" alt="Download"></a>
  &nbsp;
  <a href="https://github.com/hywihq-boop/faluber-translate"><img src="https://img.shields.io/badge/⭐_Star-222?style=for-the-badge" alt="Star"></a>
</div>

<br>

> **Faluber Translate** is a Chrome extension that translates web pages using AI. It replaces text nodes directly in the DOM — no iframes, no overlays. Just clean, native-feeling translation with **50 target languages**, **10 built-in API providers**, and **dual translation modes**.

---

## 📸 Screenshots

> **Want to see it in action?** Add your screenshots to `assets/` and they'll appear here:
>
> | Screenshot | What to capture |
> |------------|----------------|
> | `assets/screenshot-translate.png` | Full-page translation with the floating widget |
> | `assets/screenshot-explain.png` | Ctrl + Explain bubble on a word |
> | `assets/screenshot-panel.png` | Translation Panel (Alt+Q) side-by-side |
> | `assets/screenshot-settings.png` | Settings popup & mode switching |

---

## ✨ Features

<table>
<tr>
<td width="50%">

### 🚀 One-Click Full-Page Translation
Click the floating widget or press <kbd>Alt+T</kbd>. Text-node-level DOM replacement preserves page layout. Supports auto-detection of source language.

</td>
<td width="50%">

### 🔍 Ctrl + Smart Explain
Hover over any word + tap <kbd>Ctrl</kbd> for an AI-powered explanation bubble. Select text + <kbd>Ctrl</kbd> to explain a passage. Two-tier fallback: NLP prompt → HTML inspection.

</td>
</tr>
<tr>
<td width="50%">

### ⚡ Dual Translation Modes
**Standard** — 3 concurrent, viewport-first, balanced speed & cost.<br>
**Turbo** — 8 concurrent, full-page, maximum speed.

</td>
<td width="50%">

### 🔑 Multi-API Management
10 built-in provider presets (DeepSeek, OpenAI, Groq, Qwen...). Save multiple configs, switch anytime. Auto-fetch models. Custom endpoints supported.

</td>
</tr>
<tr>
<td width="50%">

### 📋 Translation Panel <kbd>Alt+Q</kbd>
Floating side-by-side input/output panel. Real-time translation independent from page translation. Any language pair.

</td>
<td width="50%">

### 💾 Smart Caching
In-memory + persistent dual-layer cache. 2,000 entries max, 1-hour TTL. Auto-flush + `beforeunload`. Auto-clears on language change.

</td>
</tr>
</table>

---

## 📦 Quick Start

| Step | |
|------|---|
| **1. Install** | Download zip from [Releases](https://github.com/hywihq-boop/faluber-translate/releases), unzip, load unpacked in `chrome://extensions` |
| **2. Configure** | Click extension icon → choose provider → enter API Key → test connection → save |
| **3. Translate** | Open any web page → click floating widget or press <kbd>Alt+T</kbd> |

---

## 🔧 API Providers

| Provider | API Base URL |
|----------|-------------|
| ⭐ DeepSeek | `https://api.deepseek.com/v1` |
| OpenAI | `https://api.openai.com/v1` |
| Groq | `https://api.groq.com/openai/v1` |
| Together AI | `https://api.together.xyz/v1` |
| OpenRouter | `https://openrouter.ai/api/v1` |
| SiliconFlow | `https://api.siliconflow.cn/v1` |
| Moonshot | `https://api.moonshot.cn/v1` |
| Zhipu | `https://open.bigmodel.cn/api/paas/v4` |
| DashScope | `https://dashscope.aliyuncs.com/compatible-mode/v1` |
| Custom | Any OpenAI-compatible endpoint |

---

## 🛠️ How It Works

```
User triggers translation
  → Content Script traverses DOM, collects visible text nodes
  → Visibility check → CJK dedup → Min-length → Cache dedup
  → Sort by Y, merge adjacent → Batch → Service Worker (3–8 concurrent)
  → AI API (OpenAI-compatible format) → Return → DOM text replacement
  → Real-time progress bar + completion notification
```

### Mode Comparison

| | Standard | Turbo |
|---|----------|-------|
| Concurrency | 3 | 8 |
| Batch size | 400 chars | 250 chars |
| Scope | Viewport | Full page |
| Scroll detect | ✅ | — |
| Hover detect | ✅ | — |
| Dynamic content | ✅ | ✅ |

---

## 🌍 Languages

<details>
<summary><b>50 target languages + 20 UI languages — click to expand</b></summary>
<br>

`简体中文` `繁體中文` `English` `日本語` `한국어` `Français` `Deutsch` `Español` `Português` `Русский` `العربية` `हिन्दी` `ไทย` `Tiếng Việt` `Italiano` `Nederlands` `Polski` `Türkçe` `Bahasa Indonesia` `Svenska` `Dansk` `Suomi` `Norsk` `Čeština` `Română` `Magyar` `Ελληνικά` `עברית` `Українська` `Melayu` `Filipino` `বাংলা` `اردو` `فارسی` `Kiswahili` `தமிழ்` `తెలుగు` `मराठी` `ગુજરાતી` `ಕನ್ನಡ` `മലയാളം` `ਪੰਜਾਬੀ` `Български` `Slovenčina` `Lietuvių` `Latviešu` `Eesti` `Slovenščina` `Hrvatski` `Српски`

</details>

---

## 📂 Structure

```
faluber translate/
├── manifest.json
├── background/service-worker.js   # API calls & routing
├── content/
│   ├── content.js                 # DOM text extraction & replacement
│   └── content.css                # Widget styles
├── popup/
│   ├── popup.html                 # Settings popup
│   ├── popup.js                   # Multi-API management
│   └── popup.css
├── icons/                         # Extension icons
├── assets/                        # Screenshots
└── docs/                          # Product website
```

---

## 🔒 Privacy

- API key stored **locally** in Chrome sync storage
- Requests go **directly** from your browser to your API provider
- **No third-party servers** — your data stays between you and your provider

---

<div align="center">
  <br>
  <a href="https://github.com/hywihq-boop/faluber-translate">⭐ Star</a> ·
  <a href="https://github.com/hywihq-boop/faluber-translate/releases">📦 Releases</a> ·
  <a href="https://github.com/hywihq-boop/faluber-translate/issues">🐛 Bug Report</a> ·
  <a href="LICENSE">📝 MIT</a>
</div>
