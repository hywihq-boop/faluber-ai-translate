<div align="center">
  <img src="icons/logo.png" width="96" height="96" style="border-radius:18px">

  # 🌐 Faluber Translate

  ### AI 智慧網頁翻譯外掛 — 50 種語言，10 家 API 提供商

  ![version](https://img.shields.io/badge/v2.0.10-7c5cfc?style=flat-square)
  ![manifest](https://img.shields.io/badge/MV3-blue?style=flat-square)
  ![license](https://img.shields.io/badge/MIT-green?style=flat-square)

  <br>

  <a href="https://github.com/hywihq-boop/faluber-translate/releases"><img src="https://img.shields.io/badge/⬇_下載最新版-7c5cfc?style=for-the-badge" alt="下載"></a>
  &nbsp;
  <a href="https://github.com/hywihq-boop/faluber-translate"><img src="https://img.shields.io/badge/⭐_Star-222?style=for-the-badge" alt="Star"></a>
</div>

<br>

> **Faluber Translate** 是一款基於 AI 的 Chrome 瀏覽器翻譯外掛。直接在 DOM 中替換文字節點——不用 iframe，不用浮層。純淨的翻譯體驗，支援 **50 種目標語言**、**10 家內建 API 提供商**、**雙檔翻譯模式**。

---

## 📸 效果截圖

> **想看實際效果？** 把截圖放到 `assets/` 資料夾即可顯示：
>
> | 截圖檔案 | 截取內容 |
> |----------|----------|
> | `assets/screenshot-translate.png` | 整頁翻譯 + 懸浮球效果 |
> | `assets/screenshot-explain.png` | Ctrl + 智慧解釋氣泡 |
> | `assets/screenshot-panel.png` | 翻譯面板 (Alt+Q) 左右佈局 |
> | `assets/screenshot-settings.png` | API 設定彈窗 & 模式切換 |

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

### 💾 智慧快取
記憶體 + 持久化雙層快取。最多 2,000 條、1 小時 TTL。自動刷盤 + `beforeunload`。切換語言自動清除。

</td>
</tr>
</table>

---

## 📦 三步開始

| 步驟 | |
|------|---|
| **1. 安裝** | 從 [Releases](https://github.com/hywihq-boop/faluber-translate/releases) 下載 zip，解壓縮後在 `chrome://extensions` 載入已解壓的擴充功能 |
| **2. 設定** | 點擊外掛圖示 → 選擇提供商 → 填入 API Key → 測試連線 → 儲存 |
| **3. 翻譯** | 開啟任意網頁 → 點擊懸浮球或按 <kbd>Alt+T</kbd> |

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
  <a href="https://github.com/hywihq-boop/faluber-translate">⭐ Star</a> ·
  <a href="https://github.com/hywihq-boop/faluber-translate/releases">📦 下載</a> ·
  <a href="https://github.com/hywihq-boop/faluber-translate/issues">🐛 回報 Bug</a> ·
  <a href="LICENSE">📝 MIT</a>
</div>
