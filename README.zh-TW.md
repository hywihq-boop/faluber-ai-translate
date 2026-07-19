<div align="center">
  <img src="icons/logo.png" width="96" height="96" style="border-radius:18px">

  # 🌐 Faluber AI翻译

  ### AI 智慧網頁翻譯外掛 — 50 種語言，10 家 API 提供商

  ![version](https://img.shields.io/github/v/release/hywihq-boop/faluber-Ai-Translate?style=flat-square)
  ![manifest](https://img.shields.io/badge/MV3-blue?style=flat-square)
  ![license](https://img.shields.io/badge/MIT-green?style=flat-square)

  <br>

  <a href="https://github.com/hywihq-boop/faluber-Ai-Translate/releases"><img src="https://img.shields.io/badge/⬇_下載最新版-7c5cfc?style=for-the-badge" alt="下載"></a>
  &nbsp;
  <a href="https://github.com/hywihq-boop/faluber-Ai-Translate"><img src="https://img.shields.io/badge/⭐_Star-222?style=for-the-badge" alt="Star"></a>
</div>

<br>

> **Faluber AI翻译** 是一款基於 AI 的 Chrome/Edge 瀏覽器翻譯外掛。直接在 DOM 中替換文字節點——不用 iframe，不用浮層。純淨的翻譯體驗，支援 **50 種目標語言**、**10 家內建 API 提供商**、**雙檔翻譯模式**。

---

## 📸 效果截圖

<div align="center">
  <p><em>🎬 整頁翻譯 — 點擊 <kbd>Alt+T</kbd>，英文逐段翻譯成中文</em></p>
  <img src="assets/translate-demo.gif" alt="翻譯演示" width="780">
  <br><br>

  <p><em>🎬 Ctrl + 智慧解釋 — 滑鼠指向詞彙並按 <kbd>Ctrl</kbd>，AI 彈出解釋氣泡</em></p>
  <img src="assets/explain-demo.gif" alt="Ctrl+解釋演示" width="780">
  <br><br>

  <p><em>🎬 翻譯面板 <kbd>Alt+Q</kbd> — 輸入文字，即時獲得翻譯</em></p>
  <img src="assets/panel-demo.gif" alt="翻譯面板演示" width="780">
  <br><br>

  <p><em>🎬 懸浮球收折 / 詳情面板展開 — 動圖演示</em></p>
  <img src="assets/collapse-expand.gif" alt="收折動畫" width="360">
  &nbsp;
  <img src="assets/detail-panel.gif" alt="詳情面板動畫" width="360">
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
滑鼠指向任意詞彙 + 單擊 <kbd>Ctrl</kbd> 彈出 AI 解釋氣泡。選取文字 + <kbd>Ctrl</kbd> 解釋整段。兩級回退：NLP 提示詞 → HTML 檢測。

</td>
</tr>
<tr>
<td width="50%">

### ⚡ 雙檔翻譯模式
**標準** — 3 併發，視野優先，速度與消耗均衡。<br>
**極速** — 8 併發，全頁翻譯，速度拉滿。

</td>
<td width="50%">

### 🔑 多 API 管理
內建 10 家提供商預設（DeepSeek、OpenAI、Groq、通義千問...）。儲存多個設定隨時切換。自動拉取模型。支援自訂介面。

</td>
</tr>
<tr>
<td width="50%">

### 📋 翻譯面板 <kbd>Alt+Q</kbd>
浮動左右佈局輸入/輸出面板。即時翻譯，獨立於頁面翻譯。支援任意語言對。

</td>
<td width="50%">

### 💾 智慧快取 — 省錢利器
記憶體 + 持久化雙層快取，重複文字命中即返回，**不消耗 token**。最多 2,000 條，1 小時 TTL。每 30 秒自動存檔，切換語言自動清除。快取命中率即時可見。

</td>
</tr>
</table>

---

## 📦 安裝

### 方法一：下載 Release 壓縮包（推薦）

1. 打開 [Releases](https://github.com/hywihq-boop/faluber-Ai-Translate/releases) 頁面
2. 下載最新版 `faluber-Ai-Translate-vX.X.X.zip`
3. 打開 `chrome://extensions`，開啟右上角**開發者模式**
4. 將下載的 zip 檔案**直接拖入**瀏覽器視窗
5. 完成！

### 方法二：下載原始碼 zip

1. 在倉庫主頁點擊綠色 **Code** 按鈕 → Download ZIP
2. 同樣拖入 `chrome://extensions` 即可

### 設定與使用

| 步驟 | |
|------|---|
| **設定 API** | 點擊外掛圖示 → 選擇提供商 → 填入 API Key → 測試連線 → 儲存 |
| **開始翻譯** | 開啟任意網頁 → 點擊右下角懸浮球或按 <kbd>Alt+T</kbd> |

---

## 🔧 API 提供商

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
  → 按 Y 座標排序，相鄰合併 → 分包 → Service Worker（3–8 併發）
  → 調 AI API（OpenAI 相容格式）→ 返回 → DOM 文字替換
  → 即時進度條 + 完成通知
```

### 模式對比

| | 標準 | 極速 |
|---|------|------|
| 併發數 | 3 | 8 |
| 分批大小 | 400 字元 | 250 字元 |
| 範圍 | 可見區域 | 全頁 |
| 捲動偵測 | ✅ | — |
| 懸停偵測 | ✅ | — |
| 動態內容 | ✅ | ✅ |

---

## 🌍 語言支援

<details>
<summary><b>50 種目標語言 + 20 種介面語言 — 展開檢視</b></summary>
<br>

`简体中文` `繁體中文` `English` `日本語` `한국어` `Français` `Deutsch` `Español` `Português` `Русский` `العربية` `हिन्दी` `ไทย` `Tiếng Việt` `Italiano` `Nederlands` `Polski` `Türkçe` `Bahasa Indonesia` `Svenska` `Dansk` `Suomi` `Norsk` `Čeština` `Română` `Magyar` `Ελληνικά` `עברית` `Українська` `Melayu` `Filipino` `বাংলা` `اردو` `فارسی` `Kiswahili` `தமிழ்` `తెలుగు` `मराठी` `ગુજરાતી` `ಕನ್ನಡ` `മലയാളം` `ਪੰਜਾਬੀ` `Български` `Slovenčina` `Lietuvių` `Latviešu` `Eesti` `Slovenščina` `Hrvatski` `Српски`

</details>

---

## 📂 專案結構

```
faluber-ai-translate/
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
├── assets/                        # 截圖
└── docs/                          # 產品官網
```

---

## 🔒 隱私

- API Key 僅儲存在 Chrome **本機**同步儲存中
- 翻譯請求**直接**從瀏覽器傳送到你的 API 提供商
- **不經由第三方伺服器** — 資料只在你和 API 提供商之間傳輸

---

<div align="center">
  <br>
  <a href="https://github.com/hywihq-boop/faluber-Ai-Translate">⭐ Star</a> ·
  <a href="https://github.com/hywihq-boop/faluber-Ai-Translate/releases">📦 下載</a> ·
  <a href="https://github.com/hywihq-boop/faluber-Ai-Translate/issues">🐛 回報 Bug</a> ·
  <a href="LICENSE">📝 MIT</a>
</div>
