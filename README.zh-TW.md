<div align="center">
  <img src="icons/logo.png" width="96" height="96" style="border-radius:18px">

  # 🌐 Faluber Translate

  ### AI 智慧網頁翻譯外掛

  <sub>基於 AI 的 Chrome 瀏覽器翻譯外掛。文字節點級 DOM 操作。<br>50 種目標語言 · 20 種介面語言 · 相容 OpenAI 格式 API · MIT 開源。</sub>

  <br>

  ![version](https://img.shields.io/badge/v2.0.10-7c5cfc?style=flat-square)
  ![manifest](https://img.shields.io/badge/MV3-blue?style=flat-square)
  ![license](https://img.shields.io/badge/MIT-green?style=flat-square)

  <br><br>

  <a href="https://github.com/hywihq-boop/faluber-translate/releases"><img src="https://img.shields.io/badge/⬇_下載最新版-7c5cfc?style=for-the-badge" alt="下載"></a>
  &nbsp;
  <a href="https://github.com/hywihq-boop/faluber-translate"><img src="https://img.shields.io/badge/⭐_Star_on_GitHub-222?style=for-the-badge" alt="Star"></a>

  <br><br>

  <table align="center"><tr>
  <td align="center"><b style="font-size:20px;color:#5ce0fc">50+</b><br><sub style="color:#888">支援語言</sub></td>
  <td align="center"><b style="font-size:20px;color:#5ce0fc">2</b><br><sub style="color:#888">翻譯模式</sub></td>
  <td align="center"><b style="font-size:20px;color:#5ce0fc">8</b><br><sub style="color:#888">併發翻譯</sub></td>
  <td align="center"><b style="font-size:20px;color:#5ce0fc">10</b><br><sub style="color:#888">API 提供商</sub></td>
  <td align="center"><b style="font-size:20px;color:#5ce0fc">~1s</b><br><sub style="color:#888">詞語解釋</sub></td>
  </tr></table>
</div>

---

## ✨ 核心功能

<table>
<tr>
<td width="50%">

### 🚀 一鍵整頁翻譯
點擊懸浮球或按 <kbd>Alt+T</kbd> 翻譯整個頁面。文字節點級 DOM 替換，不破壞頁面結構。支援自動檢測來源語言。

</td>
<td width="50%">

### 🔍 Ctrl + 智慧解釋
滑鼠指向任意詞彙 + 單擊 <kbd>Ctrl</kbd> 彈出 AI 解釋氣泡。選取文字 + <kbd>Ctrl</kbd> 解釋整段。兩級回退：NLP 提示詞 → HTML 檢測。零 DOM 污染。

</td>
</tr>
<tr>
<td width="50%">

### ⚡ 雙檔翻譯模式
**標準** — 3 併發，視野優先，速度與消耗均衡。<br>
**極速** — 8 併發，全頁翻譯，速度拉滿。設定持久化保存。

</td>
<td width="50%">

### 🔑 多 API 管理
內建 10 家提供商預設。儲存多個 API 設定隨時切換。自動拉取可用模型。支援自訂介面。

</td>
</tr>
<tr>
<td width="50%">

### 📋 翻譯面板 <kbd>Alt+Q</kbd>
左右佈局的浮動翻譯面板。輸入原文即時翻譯，獨立於頁面翻譯。支援任意語言對。

</td>
<td width="50%">

### 💾 智慧快取
記憶體 + 持久化雙層快取。最多 2,000 條、1 小時 TTL。每 30 秒 + `beforeunload` 自動刷盤。切換語言自動清除。

</td>
</tr>
</table>

---

## 🖥️ 效果展示

### 整頁翻譯 + 懸浮球

點擊右下角懸浮球的「翻譯」按鈕或按 <kbd>Alt+T</kbd>，整頁文字即刻翻譯。滑鼠懸停已翻譯文字會高亮顯示原文。

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
      <mark style="background:rgba(124,92,252,0.2);color:#c0c0d0;padding:0 2px;border-radius:2px">人工智能</mark>（AI）是機器展示的智能。領先的 AI 教科書將這一領域定義為<mark style="background:rgba(124,92,252,0.2);color:#c0c0d0;padding:0 2px;border-radius:2px">"智慧代理"</mark>的研究。
    </p>
    <p style="color:#8b949e;font-size:13px;margin-bottom:10px;line-height:1.7">
      AI 應用包括<mark style="background:rgba(124,92,252,0.2);color:#c0c0d0;padding:0 2px;border-radius:2px">進階搜尋引擎</mark>、<mark style="background:rgba(124,92,252,0.2);color:#c0c0d0;padding:0 2px;border-radius:2px">推薦系統</mark>、<mark style="background:rgba(124,92,252,0.2);color:#c0c0d0;padding:0 2px;border-radius:2px">語音辨識</mark>、<mark style="background:rgba(124,92,252,0.2);color:#c0c0d0;padding:0 2px;border-radius:2px">自動駕駛</mark>以及<mark style="background:rgba(124,92,252,0.2);color:#c0c0d0;padding:0 2px;border-radius:2px">生成式 AI</mark>。
    </p>
  </div>
  <div style="margin:0 16px 16px;border-radius:18px;background:#0d1117;border:1px solid #30363d;overflow:hidden">
    <div style="display:flex;align-items:center;justify-content:space-between;padding:10px 13px">
      <span style="font-size:11px;color:#8b949e">自動</span>
      <span style="display:inline-block;width:32px;height:18px;border-radius:99px;background:#7c5cfc"><span style="display:inline-block;margin:2px 0 0 15px;width:14px;height:14px;border-radius:50%;background:#fff"></span></span>
      <span style="padding:5px 14px;border-radius:13px;background:rgba(74,222,128,0.1);color:#4ade80;border:1px solid rgba(74,222,128,0.2);font-size:11px;font-weight:600">已翻譯</span>
    </div>
    <div style="padding:6px 13px;background:rgba(255,255,255,0.03);display:flex;justify-content:space-between;align-items:center;font-size:10px;color:#8b949e">
      <span>Token <b style="color:#7c5cfc">2.5K</b></span>
      <span style="color:#4ade80">快取命中 42%</span>
    </div>
  </div>
</div>

---

### Ctrl + 智慧解釋

滑鼠指向任意詞彙，單擊 <kbd>Ctrl</kbd> 鍵，AI 即刻彈出解釋氣泡。不修改網頁文字，零 DOM 污染。

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
        Strix 是拉丁語"貓頭鷹"，也是華碩旗下高階電競品牌 ROG Strix 系列的名稱。GitHub 上常被用作專案名或組織名。
      </div>
    </div>
  </div>
</div>

---

### 翻譯面板 — <kbd>Alt+Q</kbd>

按 <kbd>Alt+Q</kbd> 開啟浮動翻譯面板，左側輸入原文、右側輸出譯文。支援任意語言對，獨立於頁面翻譯。

<div style="border-radius:12px;overflow:hidden;border:1px solid #30363d;background:#161b22;max-width:780px;margin:0 auto 20px">
  <div style="display:flex;align-items:center;gap:8px;padding:10px 14px;background:#21262d;border-bottom:1px solid #30363d">
    <span style="width:10px;height:10px;border-radius:50%;background:#f87171;display:inline-block"></span>
    <span style="width:10px;height:10px;border-radius:50%;background:#facc15;display:inline-block"></span>
    <span style="width:10px;height:10px;border-radius:50%;background:#4ade80;display:inline-block"></span>
    <span style="padding:4px 12px;border-radius:6px;background:rgba(255,255,255,0.05);font-size:11px;color:#8b949e;flex:1;margin-left:4px">Faluber Translate — 翻譯面板</span>
  </div>
  <div style="padding:24px;display:flex;gap:12px;align-items:stretch">
    <div style="flex:1;display:flex;flex-direction:column">
      <span style="font-size:10px;color:#8b949e;margin-bottom:4px;text-transform:uppercase">輸入 — English</span>
      <textarea readonly style="flex:1;background:#0d1117;border:1px solid #30363d;border-radius:8px;color:#c0c0d0;padding:12px;font-size:12px;resize:none;min-height:120px;width:100%;font-family:inherit;outline:none">Artificial intelligence is transforming how we interact with technology. From voice assistants to self-driving cars, AI applications are becoming ubiquitous.</textarea>
    </div>
    <div style="display:flex;align-items:center;color:#7c5cfc;font-size:20px">→</div>
    <div style="flex:1;display:flex;flex-direction:column">
      <span style="font-size:10px;color:#8b949e;margin-bottom:4px;text-transform:uppercase">輸出 — 繁體中文</span>
      <textarea readonly style="flex:1;background:#0d1117;border:1px solid rgba(74,222,128,0.2);border-radius:8px;color:#4ade80;padding:12px;font-size:12px;resize:none;min-height:120px;width:100%;font-family:inherit;outline:none">人工智慧正在改變我們與技術互動的方式。從語音助手到自動駕駛汽車，AI 應用在我們的日常生活中變得越來越無處不在。</textarea>
    </div>
  </div>
</div>

---

### API 設定與模式切換

管理多 API 設定、切換提供商、自動拉取可用模型、切換翻譯模式——全部在 Popup 彈窗或懸浮球詳情面板中完成。

<div style="display:flex;gap:20px;flex-wrap:wrap;justify-content:center;margin:20px auto">
  <div style="width:300px;background:#0d1117;border:1px solid #30363d;border-radius:14px;overflow:hidden">
    <div style="display:flex;align-items:center;gap:10px;padding:14px 16px;border-bottom:1px solid #21262d">
      <div style="width:28px;height:28px;border-radius:6px;background:linear-gradient(135deg,#7c5cfc,#5ce0fc)"></div>
      <b style="background:linear-gradient(135deg,#7c5cfc,#5ce0fc);-webkit-background-clip:text;-webkit-text-fill-color:transparent">Faluber Translate</b>
    </div>
    <div style="padding:14px 16px;border-bottom:1px solid #21262d">
      <span style="font-size:10px;color:#6e7681;text-transform:uppercase">API 設定</span>
      <div style="display:flex;gap:4px;margin:6px 0 8px">
        <select style="flex:1;padding:7px 10px;background:#161b22;border:1px solid #30363d;border-radius:8px;color:#c0c0d0;font-size:11px"><option>Default</option></select>
        <span style="padding:4px 8px;background:rgba(124,92,252,0.12);color:#7c5cfc;border-radius:4px;font-size:14px">＋</span>
      </div>
      <span style="font-size:10px;color:#6e7681;text-transform:uppercase">提供商</span>
      <select style="width:100%;padding:7px 10px;background:#161b22;border:1px solid #30363d;border-radius:8px;color:#c0c0d0;font-size:11px;margin:4px 0 8px"><option>DeepSeek</option></select>
      <span style="font-size:10px;color:#6e7681;text-transform:uppercase">API Key</span>
      <input type="password" value="sk-••••••••••••••" readonly style="width:100%;padding:7px 10px;background:#161b22;border:1px solid #30363d;border-radius:8px;color:#c0c0d0;font-size:11px;margin:4px 0 8px;font-family:monospace;outline:none">
      <span style="font-size:10px;color:#6e7681;text-transform:uppercase">API 位址</span>
      <input value="https://api.deepseek.com/v1" readonly style="width:100%;padding:7px 10px;background:#161b22;border:1px solid #30363d;border-radius:8px;color:#c0c0d0;font-size:11px;margin:4px 0 8px;font-family:monospace;outline:none">
      <div style="display:flex;gap:8px;margin-top:10px">
        <span style="padding:6px 12px;background:rgba(124,92,252,0.12);color:#7c5cfc;border-radius:8px;font-size:11px;font-weight:600">測試連線</span>
        <span style="padding:6px 12px;background:rgba(74,222,128,0.12);color:#4ade80;border-radius:8px;font-size:11px;font-weight:600">💾 儲存</span>
        <span style="font-size:10px;color:#4ade80">✅ 連線成功</span>
      </div>
    </div>
    <div style="display:flex;justify-content:space-between;padding:10px 16px;font-size:10px;color:#6e7681">
      <span>快速鍵 <kbd style="background:#161b22;border:1px solid #30363d;padding:1px 4px;border-radius:3px;font-size:9px">Alt+T</kbd></span>
      <span>🌐 繁體中文</span>
    </div>
  </div>

  <div style="width:260px;background:#0d1117;border:1px solid #30363d;border-radius:14px;padding:14px;font-size:11px">
    <div style="display:flex;justify-content:space-between;margin-bottom:12px">
      <b style="color:#e6edf3;font-size:13px">翻譯設定</b>
      <span style="background:rgba(248,113,133,0.1);color:#f87171;border-radius:6px;padding:3px 8px;font-size:10px">清除快取</span>
    </div>
    <div style="margin-bottom:10px">
      <span style="font-size:10px;color:#6e7681">Language</span>
      <div style="background:#161b22;border:1px solid #30363d;border-radius:6px;padding:6px 8px;color:#c0c0d0;font-size:11px;margin-top:3px">🇨🇳 繁體中文 ▾</div>
    </div>
    <div style="display:flex;gap:6px;margin-bottom:12px">
      <div style="flex:1"><span style="font-size:10px;color:#6e7681">來源語種</span><div style="background:#161b22;border:1px solid #30363d;border-radius:6px;padding:6px 8px;color:#c0c0d0;font-size:11px;margin-top:3px">自動檢測 ▾</div></div>
      <div style="flex:1"><span style="font-size:10px;color:#6e7681">目標語種</span><div style="background:#161b22;border:1px solid #30363d;border-radius:6px;padding:6px 8px;color:#c0c0d0;font-size:11px;margin-top:3px">繁體中文 ▾</div></div>
    </div>
    <div style="margin-bottom:12px">
      <span style="font-size:10px;color:#6e7681">翻譯模式</span>
      <div style="margin-top:3px">
        <div style="display:flex;align-items:center;justify-content:space-between;background:#161b22;border:1px solid #30363d;border-radius:6px;padding:6px 8px;color:#c0c0d0;font-size:11px">⚡ 標準模式 <span style="color:#6e7681">▾</span></div>
        <div style="background:#161b22;border:1px solid #30363d;border-radius:0 0 6px 6px;margin-top:1px;overflow:hidden">
          <div style="padding:6px 8px;font-size:11px;color:#9061f9;font-weight:600;background:rgba(124,92,252,0.08)">⚡ 標準模式</div>
          <div style="padding:6px 8px;font-size:11px;color:#c0c0d0">🚀 極速模式</div>
        </div>
      </div>
    </div>
    <div style="height:1px;background:#21262d;margin:12px 0"></div>
    <table style="width:100%;font-size:10px;border:none">
      <tr><td style="color:#6e7681;border:none;padding:2px 0">輸入</td><td style="color:#e6edf3;text-align:right;border:none;padding:2px 0">12.5K</td></tr>
      <tr><td style="color:#6e7681;border:none;padding:2px 0">輸出</td><td style="color:#e6edf3;text-align:right;border:none;padding:2px 0">3.2K</td></tr>
      <tr><td style="color:#6e7681;border:none;padding:2px 0">總計</td><td style="color:#e6edf3;text-align:right;border:none;padding:2px 0">15.7K</td></tr>
      <tr><td style="color:#6e7681;border:none;padding:2px 0">預估費用</td><td style="color:#e6edf3;text-align:right;border:none;padding:2px 0">¥0.0189</td></tr>
      <tr><td style="color:#6e7681;border:none;padding:2px 0">快取條目</td><td style="color:#e6edf3;text-align:right;border:none;padding:2px 0">142</td></tr>
    </table>
  </div>
</div>

<br>

---

## 📦 三步開始

<table>
<tr>
<td align="center" width="33%"><b style="font-size:16px">1. 安裝</b><br><sub>從 <a href="https://github.com/hywihq-boop/faluber-translate/releases">Releases</a> 下載 zip，解壓縮後<br>在 <code>chrome://extensions</code> 載入已解壓的擴充功能</sub></td>
<td align="center" width="33%"><b style="font-size:16px">2. 設定</b><br><sub>選擇提供商，填入 API Key，<br>測試連線，儲存</sub></td>
<td align="center" width="33%"><b style="font-size:16px">3. 翻譯</b><br><sub>開啟任意網頁，點擊懸浮球<br>或按 <kbd>Alt+T</kbd></sub></td>
</tr>
</table>

---

## 🔧 10 家 API 提供商

| 提供商 | API 位址 |
|--------|----------|
| ⭐ DeepSeek | `https://api.deepseek.com/v1` |
| OpenAI | `https://api.openai.com/v1` |
| Groq | `https://api.groq.com/openai/v1` |
| Together AI | `https://api.together.xyz/v1` |
| OpenRouter | `https://openrouter.ai/api/v1` |
| SiliconFlow | `https://api.siliconflow.cn/v1` |
| Moonshot | `https://api.moonshot.cn/v1` |
| 智譜 | `https://open.bigmodel.cn/api/paas/v4` |
| 阿里百煉 | `https://dashscope.aliyuncs.com/compatible-mode/v1` |
| 自訂 | 任意 OpenAI 相容端點 |

---

## 🛠️ 運作原理

```
使用者觸發翻譯
  → Content Script 走訪 DOM，收集可見文字節點
  → 可見性偵測 → CJK 去重 → 最小長度過濾 → 快取去重
  → 按 Y 座標排序，相鄰節點合併
  → 分包 → 發 Service Worker（3–8 併發）
  → 調 AI API（OpenAI 相容格式）→ 返回結果
  → DOM 文字替換 → 即時進度條
```

### 模式對比

| 參數 | 標準 | 極速 |
|------|------|------|
| 併發數 | 3 | 8 |
| 分批大小 | 400 字元 | 250 字元 |
| 翻譯範圍 | 可見區域 | 全頁 |
| 捲動偵測 | ✅ | — |
| 懸停偵測 | ✅ | — |
| 動態內容 | ✅ | ✅ |

### 快取

| 層級 | 儲存 | 上限 | TTL | 刷盤 |
|------|------|------|-----|------|
| 記憶體 | `Map<原文, 譯文>` | ∞ | 工作階段 | — |
| 持久化 | `chrome.storage.local` | 2,000 | 1 小時 | 30s + `beforeunload` |

---

## 🌍 50 種目標 · 20 種介面語言

<details>
<summary><b>展開檢視全部 50 種語言</b></summary>
<br>

`简体中文` `繁體中文` `English` `日本語` `한국어` `Français` `Deutsch` `Español` `Português` `Русский` `العربية` `हिन्दी` `ไทย` `Tiếng Việt` `Italiano` `Nederlands` `Polski` `Türkçe` `Bahasa Indonesia` `Svenska` `Dansk` `Suomi` `Norsk` `Čeština` `Română` `Magyar` `Ελληνικά` `עברית` `Українська` `Melayu` `Filipino` `বাংলা` `اردو` `فارسی` `Kiswahili` `தமிழ்` `తెలుగు` `मराठी` `ગુજરાતી` `ಕನ್ನಡ` `മലയാളം` `ਪੰਜਾਬੀ` `Български` `Slovenčina` `Lietuvių` `Latviešu` `Eesti` `Slovenščina` `Hrvatski` `Српски`

</details>

---

## 📂 專案結構

```
faluber translate/
├── manifest.json
├── background/service-worker.js   # API 呼叫與訊息路由
├── content/
│   ├── content.js                 # DOM 文字擷取與替換
│   └── content.css                # 懸浮球樣式
├── popup/
│   ├── popup.html                 # 設定彈窗
│   ├── popup.js                   # 多 API 管理
│   └── popup.css
├── icons/                         # 擴充功能圖示
├── docs/                          # 產品官網
└── generate-icons.js              # 圖示產生器（開發工具）
```

---

## 🔒 隱私

- API Key 僅儲存在 Chrome **本機**同步儲存中
- 翻譯請求**直接**從瀏覽器傳送到你的 API 提供商
- **不經由第三方伺服器** — 資料只在你和 API 提供商之間傳輸

---

<div align="center">
  <br>
  <a href="https://github.com/hywihq-boop/faluber-translate">⭐ Star</a> ·
  <a href="https://github.com/hywihq-boop/faluber-translate/releases">📦 下載</a> ·
  <a href="https://github.com/hywihq-boop/faluber-translate/issues">🐛 回報 Bug</a> ·
  <a href="LICENSE">📝 MIT</a>
  <br><br>
  <sub>用 ❤️ 製作 · 不收集任何使用者資料</sub>
</div>
