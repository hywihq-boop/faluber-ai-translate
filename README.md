[English](README.md) | [简体中文](README.zh-CN.md) | [繁體中文](README.zh-TW.md) | [日本語](README.ja.md) | [한국어](README.ko.md) | [Русский](README.ru.md) | [العربية](README.ar.md)

<div align="center">
  <img src="icons/logo.png" width="96" height="96" style="border-radius:18px">

  # 🌐 Faluber Translate

  ### AI-Powered Web Page Translation

  <sub>A Chrome extension that translates web pages using AI. Text-node-level DOM manipulation.<br>50 target languages · 20 UI languages · OpenAI-compatible API · MIT open source.</sub>

  <br>

  ![version](https://img.shields.io/badge/v2.0.10-7c5cfc?style=flat-square)
  ![manifest](https://img.shields.io/badge/MV3-blue?style=flat-square)
  ![license](https://img.shields.io/badge/MIT-green?style=flat-square)

  <br><br>

  <a href="https://github.com/hywihq-boop/faluber-translate/releases"><img src="https://img.shields.io/badge/⬇_Download_Latest-7c5cfc?style=for-the-badge" alt="Download"></a>
  &nbsp;
  <a href="https://github.com/hywihq-boop/faluber-translate"><img src="https://img.shields.io/badge/⭐_Star_on_GitHub-222?style=for-the-badge" alt="Star"></a>

  <br><br>

  <table align="center"><tr>
  <td align="center"><b style="font-size:20px;color:#5ce0fc">50+</b><br><sub style="color:#888">Languages</sub></td>
  <td align="center"><b style="font-size:20px;color:#5ce0fc">2</b><br><sub style="color:#888">Modes</sub></td>
  <td align="center"><b style="font-size:20px;color:#5ce0fc">8</b><br><sub style="color:#888">Concurrent</sub></td>
  <td align="center"><b style="font-size:20px;color:#5ce0fc">10</b><br><sub style="color:#888">Providers</sub></td>
  <td align="center"><b style="font-size:20px;color:#5ce0fc">~1s</b><br><sub style="color:#888">Word Explain</sub></td>
  </tr></table>
</div>

---

## ✨ Core Features

<table>
<tr>
<td width="50%">

### 🚀 One-Click Full-Page Translation
Click the floating widget or press <kbd>Alt+T</kbd>. Text-node-level DOM replacement preserves page layout. Auto-detection of source language.

</td>
<td width="50%">

### 🔍 Ctrl + Smart Explain
Hover over any word + tap <kbd>Ctrl</kbd> for an AI-powered explanation bubble. Or select text + <kbd>Ctrl</kbd>. Two-tier fallback: NLP prompt → HTML inspection. Zero DOM pollution.

</td>
</tr>
<tr>
<td width="50%">

### ⚡ Dual Translation Modes
**Standard** — 3 concurrent, viewport-first, balanced speed & cost.<br>
**Turbo** — 8 concurrent, full-page, maximum speed. Settings persist across sessions.

</td>
<td width="50%">

### 🔑 Multi-API Management
10 built-in provider presets. Save multiple API configs, switch anytime. Auto-fetch available models. Custom endpoints supported.

</td>
</tr>
<tr>
<td width="50%">

### 📋 Translation Panel <kbd>Alt+Q</kbd>
Side-by-side floating input/output panel. Real-time translation independent from page translation. Any language pair.

</td>
<td width="50%">

### 💾 Smart Caching
In-memory + persistent dual-layer. Up to 2,000 entries, 1-hour TTL. Auto-flush every 30s + on `beforeunload`. Auto-clears on language change.

</td>
</tr>
</table>

---

## 🖥️ Demo

### Full-Page Translation + Floating Widget

Click the widget in the bottom-right corner or press <kbd>Alt+T</kbd>. The entire page is translated in place. Hover over translated text to see the original.

<div style="border-radius:12px;overflow:hidden;border:1px solid #30363d;background:#161b22;max-width:780px;margin:0 auto 20px">
  <div style="display:flex;align-items:center;gap:8px;padding:10px 14px;background:#21262d;border-bottom:1px solid #30363d">
    <span style="width:10px;height:10px;border-radius:50%;background:#f87171;display:inline-block"></span>
    <span style="width:10px;height:10px;border-radius:50%;background:#facc15;display:inline-block"></span>
    <span style="width:10px;height:10px;border-radius:50%;background:#4ade80;display:inline-block"></span>
    <span style="padding:4px 12px;border-radius:6px;background:rgba(255,255,255,0.05);font-size:11px;color:#8b949e;flex:1;margin-left:4px">wikipedia.org — Artificial Intelligence</span>
  </div>
  <div style="padding:24px">
    <h3 style="color:#e6edf3;margin-bottom:12px;font-size:18px">Artificial Intelligence</h3>
    <p style="color:#8b949e;font-size:13px;margin-bottom:10px;line-height:1.7">
      <mark style="background:rgba(124,92,252,0.2);color:#c0c0d0;padding:0 2px;border-radius:2px">人工智能</mark>（AI）是机器展示的智能。领先的 AI 教科书将这一领域定义为<mark style="background:rgba(124,92,252,0.2);color:#c0c0d0;padding:0 2px;border-radius:2px">"智能代理"</mark>的研究。
    </p>
    <p style="color:#8b949e;font-size:13px;margin-bottom:10px;line-height:1.7">
      AI 应用包括<mark style="background:rgba(124,92,252,0.2);color:#c0c0d0;padding:0 2px;border-radius:2px">高级搜索引擎</mark>、<mark style="background:rgba(124,92,252,0.2);color:#c0c0d0;padding:0 2px;border-radius:2px">推荐系统</mark>、<mark style="background:rgba(124,92,252,0.2);color:#c0c0d0;padding:0 2px;border-radius:2px">语音识别</mark>、<mark style="background:rgba(124,92,252,0.2);color:#c0c0d0;padding:0 2px;border-radius:2px">自动驾驶</mark>以及<mark style="background:rgba(124,92,252,0.2);color:#c0c0d0;padding:0 2px;border-radius:2px">生成式 AI</mark>。
    </p>

  </div>
  <div style="margin:0 16px 16px;border-radius:18px;background:#0d1117;border:1px solid #30363d;overflow:hidden">
    <div style="display:flex;align-items:center;justify-content:space-between;padding:10px 13px">
      <span style="font-size:11px;color:#8b949e">Auto</span>
      <span style="display:inline-block;width:32px;height:18px;border-radius:99px;background:#7c5cfc"><span style="display:inline-block;margin:2px 0 0 15px;width:14px;height:14px;border-radius:50%;background:#fff"></span></span>
      <span style="padding:5px 14px;border-radius:13px;background:rgba(74,222,128,0.1);color:#4ade80;border:1px solid rgba(74,222,128,0.2);font-size:11px;font-weight:600">Translated</span>
    </div>
    <div style="padding:6px 13px;background:rgba(255,255,255,0.03);display:flex;justify-content:space-between;align-items:center;font-size:10px;color:#8b949e">
      <span>Tokens <b style="color:#7c5cfc">2.5K</b></span>
      <span style="color:#4ade80">Cache Hit 42%</span>
    </div>
  </div>
</div>

---

### Ctrl + Explain — Hover & Tap

Hover your mouse over a word and tap <kbd>Ctrl</kbd>. An AI explanation bubble pops up instantly. No DOM modification — the original text stays intact.

<div style="border-radius:12px;overflow:hidden;border:1px solid #30363d;background:#161b22;max-width:780px;margin:0 auto 20px">
  <div style="display:flex;align-items:center;gap:8px;padding:10px 14px;background:#21262d;border-bottom:1px solid #30363d">
    <span style="width:10px;height:10px;border-radius:50%;background:#f87171;display:inline-block"></span>
    <span style="width:10px;height:10px;border-radius:50%;background:#facc15;display:inline-block"></span>
    <span style="width:10px;height:10px;border-radius:50%;background:#4ade80;display:inline-block"></span>
    <span style="padding:4px 12px;border-radius:6px;background:rgba(255,255,255,0.05);font-size:11px;color:#8b949e;flex:1;margin-left:4px">github.com — Trending today</span>
  </div>
  <div style="padding:24px">
    <p style="margin-bottom:6px;font-size:14px"><span style="color:#58a6ff">usestrix</span> / <mark style="background:rgba(124,92,252,0.3);color:#e6edf3;padding:0 3px;border-radius:2px">strix</mark></p>
    <p style="font-size:11px;color:#8b949e;margin-bottom:16px">An agentic skills framework &amp; software development methodology.</p>
    <p style="margin-bottom:6px;font-size:14px"><span style="color:#58a6ff">actions</span> / checkout</p>
    <p style="font-size:11px;color:#8b949e;margin-bottom:16px">Action for checking out a repo</p>
    <p style="margin-bottom:6px;font-size:14px"><span style="color:#58a6ff">affaan-m</span> / ECC</p>
    <p style="font-size:11px;color:#8b949e;margin-bottom:20px">The agent harness performance optimization system.</p>

    <div style="border-radius:12px;background:#161b22;border:1px solid rgba(124,92,252,0.35);padding:10px 13px;font-size:12px;line-height:1.6;color:#c0c0d0;max-width:380px">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">
        <b style="color:#9061f9;font-size:13px">💬 strix</b>
        <span style="color:#8b949e">✕</span>
      </div>
      <div style="font-size:11px;color:#c0c0d0">
        "Strix" is Latin for "owl", also the name of ASUS's premium gaming brand ROG Strix. Commonly used as a project or organization name on GitHub.
      </div>
    </div>
  </div>
</div>

---

### Translation Panel — <kbd>Alt+Q</kbd>

Press <kbd>Alt+Q</kbd> to open a floating side-by-side translation panel. Type or paste text on the left, get the translation on the right.

<div style="border-radius:12px;overflow:hidden;border:1px solid #30363d;background:#161b22;max-width:780px;margin:0 auto 20px">
  <div style="display:flex;align-items:center;gap:8px;padding:10px 14px;background:#21262d;border-bottom:1px solid #30363d">
    <span style="width:10px;height:10px;border-radius:50%;background:#f87171;display:inline-block"></span>
    <span style="width:10px;height:10px;border-radius:50%;background:#facc15;display:inline-block"></span>
    <span style="width:10px;height:10px;border-radius:50%;background:#4ade80;display:inline-block"></span>
    <span style="padding:4px 12px;border-radius:6px;background:rgba(255,255,255,0.05);font-size:11px;color:#8b949e;flex:1;margin-left:4px">Faluber Translate — Translation Panel</span>
  </div>
  <div style="padding:24px;display:flex;gap:12px;align-items:stretch">
    <div style="flex:1;display:flex;flex-direction:column">
      <span style="font-size:10px;color:#8b949e;margin-bottom:4px;text-transform:uppercase">Input — English</span>
      <textarea readonly style="flex:1;background:#0d1117;border:1px solid #30363d;border-radius:8px;color:#c0c0d0;padding:12px;font-size:12px;resize:none;min-height:120px;width:100%;font-family:inherit;outline:none">Artificial intelligence is transforming how we interact with technology. From voice assistants to self-driving cars, AI applications are becoming ubiquitous.</textarea>
    </div>
    <div style="display:flex;align-items:center;color:#7c5cfc;font-size:20px">→</div>
    <div style="flex:1;display:flex;flex-direction:column">
      <span style="font-size:10px;color:#8b949e;margin-bottom:4px;text-transform:uppercase">Output — 简体中文</span>
      <textarea readonly style="flex:1;background:#0d1117;border:1px solid rgba(74,222,128,0.2);border-radius:8px;color:#4ade80;padding:12px;font-size:12px;resize:none;min-height:120px;width:100%;font-family:inherit;outline:none">人工智能正在改变我们与技术互动的方式。从语音助手到自动驾驶汽车，AI 应用在我们的日常生活中变得越来越无处不在。</textarea>
    </div>
  </div>
</div>

---

### Settings & Mode Switching

Manage multiple API configurations, switch providers, auto-fetch models, and toggle between translation modes — all from the popup or floating widget detail panel.

<div style="display:flex;gap:20px;flex-wrap:wrap;justify-content:center;margin:20px auto">
  <div style="width:300px;background:#0d1117;border:1px solid #30363d;border-radius:14px;overflow:hidden">
    <div style="display:flex;align-items:center;gap:10px;padding:14px 16px;border-bottom:1px solid #21262d">
      <div style="width:28px;height:28px;border-radius:6px;background:linear-gradient(135deg,#7c5cfc,#5ce0fc)"></div>
      <b style="background:linear-gradient(135deg,#7c5cfc,#5ce0fc);-webkit-background-clip:text;-webkit-text-fill-color:transparent">Faluber Translate</b>
    </div>
    <div style="padding:14px 16px;border-bottom:1px solid #21262d">
      <span style="font-size:10px;color:#6e7681;text-transform:uppercase">API Settings</span>
      <div style="display:flex;gap:4px;margin:6px 0 8px">
        <select style="flex:1;padding:7px 10px;background:#161b22;border:1px solid #30363d;border-radius:8px;color:#c0c0d0;font-size:11px"><option>Default</option></select>
        <span style="padding:4px 8px;background:rgba(124,92,252,0.12);color:#7c5cfc;border-radius:4px;font-size:14px">＋</span>
      </div>
      <span style="font-size:10px;color:#6e7681;text-transform:uppercase">Provider</span>
      <select style="width:100%;padding:7px 10px;background:#161b22;border:1px solid #30363d;border-radius:8px;color:#c0c0d0;font-size:11px;margin:4px 0 8px"><option>DeepSeek</option></select>
      <span style="font-size:10px;color:#6e7681;text-transform:uppercase">API Key</span>
      <input type="password" value="sk-••••••••••••••" readonly style="width:100%;padding:7px 10px;background:#161b22;border:1px solid #30363d;border-radius:8px;color:#c0c0d0;font-size:11px;margin:4px 0 8px;font-family:monospace;outline:none">
      <span style="font-size:10px;color:#6e7681;text-transform:uppercase">API URL</span>
      <input value="https://api.deepseek.com/v1" readonly style="width:100%;padding:7px 10px;background:#161b22;border:1px solid #30363d;border-radius:8px;color:#c0c0d0;font-size:11px;margin:4px 0 8px;font-family:monospace;outline:none">
      <div style="display:flex;gap:8px;margin-top:10px">
        <span style="padding:6px 12px;background:rgba(124,92,252,0.12);color:#7c5cfc;border-radius:8px;font-size:11px;font-weight:600">Test Connection</span>
        <span style="padding:6px 12px;background:rgba(74,222,128,0.12);color:#4ade80;border-radius:8px;font-size:11px;font-weight:600">💾 Save</span>
        <span style="font-size:10px;color:#4ade80">✅ Connected</span>
      </div>
    </div>
    <div style="display:flex;justify-content:space-between;padding:10px 16px;font-size:10px;color:#6e7681">
      <span>Shortcut <kbd style="background:#161b22;border:1px solid #30363d;padding:1px 4px;border-radius:3px;font-size:9px">Alt+T</kbd></span>
      <span>🌐 简体中文</span>
    </div>
  </div>

  <div style="width:260px;background:#0d1117;border:1px solid #30363d;border-radius:14px;padding:14px;font-size:11px">
    <div style="display:flex;justify-content:space-between;margin-bottom:12px">
      <b style="color:#e6edf3;font-size:13px">Settings</b>
      <span style="background:rgba(248,113,133,0.1);color:#f87171;border-radius:6px;padding:3px 8px;font-size:10px">Clear Cache</span>
    </div>
    <div style="margin-bottom:10px">
      <span style="font-size:10px;color:#6e7681">Language</span>
      <div style="background:#161b22;border:1px solid #30363d;border-radius:6px;padding:6px 8px;color:#c0c0d0;font-size:11px;margin-top:3px">🇨🇳 简体中文 ▾</div>
    </div>
    <div style="display:flex;gap:6px;margin-bottom:12px">
      <div style="flex:1"><span style="font-size:10px;color:#6e7681">Source</span><div style="background:#161b22;border:1px solid #30363d;border-radius:6px;padding:6px 8px;color:#c0c0d0;font-size:11px;margin-top:3px">Auto Detect ▾</div></div>
      <div style="flex:1"><span style="font-size:10px;color:#6e7681">Target</span><div style="background:#161b22;border:1px solid #30363d;border-radius:6px;padding:6px 8px;color:#c0c0d0;font-size:11px;margin-top:3px">简体中文 ▾</div></div>
    </div>
    <div style="margin-bottom:12px">
      <span style="font-size:10px;color:#6e7681">Mode</span>
      <div style="margin-top:3px">
        <div style="display:flex;align-items:center;justify-content:space-between;background:#161b22;border:1px solid #30363d;border-radius:6px;padding:6px 8px;color:#c0c0d0;font-size:11px">⚡ Standard <span style="color:#6e7681">▾</span></div>
        <div style="background:#161b22;border:1px solid #30363d;border-radius:0 0 6px 6px;margin-top:1px;overflow:hidden">
          <div style="padding:6px 8px;font-size:11px;color:#9061f9;font-weight:600;background:rgba(124,92,252,0.08)">⚡ Standard</div>
          <div style="padding:6px 8px;font-size:11px;color:#c0c0d0">🚀 Turbo</div>
        </div>
      </div>
    </div>
    <div style="height:1px;background:#21262d;margin:12px 0"></div>
    <table style="width:100%;font-size:10px;border:none">
      <tr><td style="color:#6e7681;border:none;padding:2px 0">Input</td><td style="color:#e6edf3;text-align:right;border:none;padding:2px 0">12.5K</td></tr>
      <tr><td style="color:#6e7681;border:none;padding:2px 0">Output</td><td style="color:#e6edf3;text-align:right;border:none;padding:2px 0">3.2K</td></tr>
      <tr><td style="color:#6e7681;border:none;padding:2px 0">Total</td><td style="color:#e6edf3;text-align:right;border:none;padding:2px 0">15.7K</td></tr>
      <tr><td style="color:#6e7681;border:none;padding:2px 0">Est. Cost</td><td style="color:#e6edf3;text-align:right;border:none;padding:2px 0">¥0.0189</td></tr>
      <tr><td style="color:#6e7681;border:none;padding:2px 0">Cache</td><td style="color:#e6edf3;text-align:right;border:none;padding:2px 0">142 entries</td></tr>
    </table>
  </div>
</div>

<br>

---

## 📦 Quick Start

<table>
<tr>
<td align="center" width="33%"><b style="font-size:16px">1. Install</b><br><sub>Download zip from <a href="https://github.com/hywihq-boop/faluber-translate/releases">Releases</a>, unzip,<br>load unpacked in <code>chrome://extensions</code></sub></td>
<td align="center" width="33%"><b style="font-size:16px">2. Configure</b><br><sub>Choose provider, enter API Key,<br>test connection, save</sub></td>
<td align="center" width="33%"><b style="font-size:16px">3. Translate</b><br><sub>Open any page, click the widget<br>or press <kbd>Alt+T</kbd></sub></td>
</tr>
</table>

---

## 🔧 10 API Providers

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
User Triggers Translation
  → Content Script traverses DOM, collects visible text nodes
  → Visibility check → CJK dedup → Min-length → Cache dedup
  → Sort by Y-coordinate, merge adjacent
  → Batch → Service Worker (3–8 concurrent)
  → AI API call (OpenAI-compatible format) → Return results
  → DOM text replacement → Real-time progress bar
```

### Mode Comparison

| Parameter | Standard | Turbo |
|-----------|----------|-------|
| Concurrency | 3 | 8 |
| Batch size | 400 chars | 250 chars |
| Page scope | Viewport only | Full page |
| Scroll detect | ✅ | — |
| Hover detect | ✅ | — |
| Dynamic content | ✅ | ✅ |

### Cache

| Layer | Storage | Limit | TTL | Flush |
|-------|---------|-------|-----|-------|
| Memory | `Map<src, tgt>` | ∞ | Session | — |
| Persistent | `chrome.storage.local` | 2,000 | 1 hr | 30s + `beforeunload` |

---

## 🌍 50 Target · 20 UI Languages

<details>
<summary><b>Click to expand — all 50 languages</b></summary>
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
├── docs/                          # Product website
└── generate-icons.js              # Icon generator (dev tool)
```

---

## 🔒 Privacy

- API key stored **locally** in Chrome sync storage
- Requests go **directly** from your browser to your API provider
- **No third-party servers involved** — your data stays between you and your provider

---

<div align="center">
  <br>
  <a href="https://github.com/hywihq-boop/faluber-translate">⭐ Star</a> ·
  <a href="https://github.com/hywihq-boop/faluber-translate/releases">📦 Releases</a> ·
  <a href="https://github.com/hywihq-boop/faluber-translate/issues">🐛 Bug Report</a> ·
  <a href="LICENSE">📝 MIT</a>
  <br><br>
  <sub>Made with ❤️ · No user data collected</sub>
</div>
