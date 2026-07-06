# 🌐 Faluber Translate — AI 智慧網頁翻譯外掛

一款基於 AI 的 Chrome 瀏覽器翻譯外掛（相容 OpenAI 格式 API，如 DeepSeek、OpenAI、通義千問等）。基於 Manifest V3，透過文字節點級 DOM 操作實現頁面翻譯，支援 50 種目標語言和 20 種介面語言。

![version](https://img.shields.io/badge/version-2.0.10-7c5cfc)
![manifest](https://img.shields.io/badge/manifest-v3-blue)
![license](https://img.shields.io/badge/license-MIT-green)

## ✨ 功能

- 🚀 **一鍵翻譯整頁** — 點擊圖示或按 `Alt+T`
- 🌍 **50 種目標語言** — AI 驅動，支援任意語言對
- ⚡ **雙檔翻譯模式** — 標準（均衡）和極速（最高速度）
- 🔑 **多 API 支援** — 內建 10 家提供商預設（DeepSeek、OpenAI、Groq、通義千問等）
- 💬 **Ctrl+解釋氣泡** — 滑鼠懸停單詞 + 按 Ctrl 獲取 AI 解釋
- 📋 **翻譯面板** — 按 `Alt+Q` 開啟左右佈局的輸入/輸出翻譯面板
- 👆 **懸停檢視原文** — 滑鼠懸停已翻譯文字即可看到原文
- ↩️ **一鍵還原** — 隨時恢復原始頁面
- 📊 **即時進度** — 翻譯過程中顯示視覺化進度條
- 💾 **智慧快取** — 記憶體快取 + 持久化快取，1 小時 TTL
- 🎨 **深色 UI** — 可折疊的懸浮球設計

## 📦 安裝

### 1. 載入擴充功能

1. 開啟 Chrome/Edge，進入 `chrome://extensions/`
2. 開啟右上角**開發者模式**
3. 點擊**載入未封裝的擴充功能**
4. 選擇 `faluber translate` 資料夾
5. 完成！

### 2. 設定 API

1. 點擊工具列中的 Faluber Translate 圖示
2. 從下拉選單選擇提供商（DeepSeek、OpenAI 等）
3. 輸入你的 **API Key**
4. 點擊**測試連線**驗證設定
5. 點擊**儲存**

### 3. 開始翻譯

- 開啟任意網頁，點擊圖示 → **翻譯目前頁面**
- 或直接按 **`Alt+T`**

## 🎮 使用方式

| 操作 | 方式 |
|------|------|
| 翻譯頁面 | 點擊圖示 → "翻譯" 或 `Alt+T` |
| 翻譯選取文字 | 選取文字 → 按 `Ctrl` |
| 翻譯面板 | `Alt+Q` |
| 解釋單詞 | 滑鼠懸停單詞 → 按 `Ctrl` |
| 還原原文 | 點擊圖示 → "還原" |
| 取消翻譯 | 按 `Esc` |
| 檢視原文 | 滑鼠懸停翻譯後的文字 |
| 切換語言 | 使用彈出面板的語言選擇器 |

## 🔧 支援的 API

內建 10 家提供商預設，相容任意 OpenAI 格式 API：

| 提供商 | API 位址 | 模型 |
|--------|----------|------|
| DeepSeek | `https://api.deepseek.com/v1` | `deepseek-chat` |
| OpenAI | `https://api.openai.com/v1` | `gpt-4o-mini` |
| Groq | `https://api.groq.com/openai/v1` | `llama-3.3-70b` |
| Together AI | `https://api.together.xyz/v1` | `meta-llama/...` |
| OpenRouter | `https://openrouter.ai/api/v1` | `openai/gpt-4o` |
| SiliconFlow | `https://api.siliconflow.cn/v1` | `deepseek-ai/...` |
| Moonshot | `https://api.moonshot.cn/v1` | `moonshot-v1-8k` |
| 智譜 | `https://open.bigmodel.cn/api/paas/v4` | `glm-4` |
| 阿里百煉 | `https://dashscope.aliyuncs.com/compatible-mode/v1` | `qwen-plus` |
| 自訂 | 任意 OpenAI 相容端點 | 任意模型 |

## 📂 專案結構

```
faluber translate/
├── manifest.json                 # 擴充功能設定 (Manifest V3)
├── popup/
│   ├── popup.html                # 設定彈出面板
│   ├── popup.js                  # 多 API 管理邏輯
│   └── popup.css                 # 彈出面板樣式
├── content/
│   ├── content.js                # DOM 文字擷取與取代
│   └── content.css               # 懸浮球樣式
├── background/
│   └── service-worker.js         # API 呼叫與訊息路由
├── icons/                        # 擴充功能圖示
├── generate-icons.js             # 圖示產生腳本（開發工具）
├── LICENSE
└── README.md
```

## 🛠️ 運作原理

### 翻譯流程

```
使用者觸發翻譯
  → Content Script 走訪 DOM，收集可見文字節點
  → 過濾：可見性偵測、CJK 去重、最小長度、快取去重
  → 按 Y 座標排序，相鄰合併
  → 分包傳送至 Service Worker（3–8 路併發）
  → Service Worker 呼叫 AI API（OpenAI 相容格式）
  → 結果傳回 Content Script 取代 DOM
  → 即時進度條 + 完成通知
```

### 智慧文字處理

- 跳過 `<script>`、`<style>`、`<code>` 等非內容標籤
- 過濾純數字、URL、Emoji 等不可翻譯內容
- 偵測 `display:none`、`visibility:hidden` 等隱藏狀態
- 保留 HTML 實體和特殊字元
- 相鄰文字節點（同父元素或父元素為兄弟）合併後傳送

### 翻譯模式

| 參數 | 標準 | 極速 |
|------|------|------|
| 併發數 | 3 | 8 |
| 分批大小 | 400 字元 | 250 字元 |
| 全頁翻譯 | 否（僅可見區域） | 是 |
| 捲動偵測 | 是 | 否 |
| 懸停偵測 | 是 | 否 |
| DOM 變化監聽 | 是 | 是 |

### 快取系統

- **記憶體快取**：`Map<原文, 譯文>` 即時查詢
- **持久化快取**：`chrome.storage.local`，最多 2000 條，1 小時 TTL
- **自動刷盤**：每 30 秒 + `beforeunload` 時
- **自動清除**：目標語言切換時

### Ctrl+解釋（浮動氣泡）

- 滑鼠懸停單詞 + 輕按 `Ctrl`（非長按）
- 或選取文字 + 按 `Ctrl`
- 兩級回退：自然語言提示詞 → HTML 程式碼檢查
- 點擊 ✕、`Esc` 或點擊空白處關閉

## 🔒 隱私

- 你的 API Key 僅儲存在 Chrome 本機同步儲存中
- 所有翻譯請求直接從你的瀏覽器傳送到你設定的 API 提供商
- 不經由任何第三方伺服器 — 你的資料只在你和 API 提供商之間傳輸

## 📝 授權條款

MIT — 詳見 [LICENSE](LICENSE)。
