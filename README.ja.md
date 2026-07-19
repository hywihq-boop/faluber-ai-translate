<div align="center">
  <img src="icons/logo.png" width="96" height="96" style="border-radius:18px">

  # 🌐 Faluber AI翻译

  ### AI 搭載ウェブページ翻訳 — 50 言語、10 API プロバイダー

  ![version](https://img.shields.io/github/v/release/hywihq-boop/faluber-Ai-Translate?style=flat-square)
  ![manifest](https://img.shields.io/badge/MV3-blue?style=flat-square)
  ![license](https://img.shields.io/badge/MIT-green?style=flat-square)

  <br>

  <a href="https://github.com/hywihq-boop/faluber-Ai-Translate/releases"><img src="https://img.shields.io/badge/⬇_ダウンロード-7c5cfc?style=for-the-badge" alt="ダウンロード"></a>
  &nbsp;
  <a href="https://github.com/hywihq-boop/faluber-Ai-Translate"><img src="https://img.shields.io/badge/⭐_Star-222?style=for-the-badge" alt="Star"></a>
</div>

<br>

> **Faluber AI翻译** は AI を活用した Chrome/Edge ブラウザ翻訳拡張機能です。iframe やオーバーレイを使わず、DOM のテキストノードを直接置換。**50 のターゲット言語**、**10 の API プロバイダー**、**デュアル翻訳モード**を搭載。

---

## 📸 スクリーンショット

<div align="center">
  <p><em>🎬 全ページ翻訳 — <kbd>Alt+T</kbd> で英文が中国語に徐々に翻訳</em></p>
  <img src="assets/translate-demo.gif" alt="翻訳デモ" width="780">
  <br><br>

  <p><em>🎬 Ctrl + スマート説明 — 単語にホバーして <kbd>Ctrl</kbd> で説明を表示</em></p>
  <img src="assets/explain-demo.gif" alt="Ctrl+説明デモ" width="780">
  <br><br>

  <p><em>🎬 翻訳パネル <kbd>Alt+Q</kbd> — テキスト入力で即時翻訳</em></p>
  <img src="assets/panel-demo.gif" alt="翻訳パネルデモ" width="780">
  <br><br>

  <p><em>🎬 ウィジェット折りたたみ / 詳細パネル — アニメーション</em></p>
  <img src="assets/collapse-expand.gif" alt="折りたたみ" width="360">
  &nbsp;
  <img src="assets/detail-panel.gif" alt="詳細パネル" width="360">
</div>

---

## ✨ 主要機能

<table>
<tr>
<td width="50%">

### 🚀 ワンクリック全ページ翻訳
フローティングウィジェットをクリック、または <kbd>Alt+T</kbd> でページ全体を翻訳。テキストノードレベルの DOM 置換でページ構造を維持。

</td>
<td width="50%">

### 🔍 Ctrl + スマート説明
任意の単語にホバー + <kbd>Ctrl</kbd> タップで AI 説明バブルを表示。テキスト選択 + <kbd>Ctrl</kbd> で文章全体を説明。

</td>
</tr>
<tr>
<td width="50%">

### ⚡ デュアル翻訳モード
**標準** — 3 並列、ビューポート優先。<br>
**ターボ** — 8 並列、全ページ、最大速度。

</td>
<td width="50%">

### 🔑 マルチ API 管理
10 のプロバイダープリセット内蔵（DeepSeek、OpenAI、Groq、Qwen...）。複数設定の保存、切替、モデル自動取得。

</td>
</tr>
<tr>
<td width="50%">

### 📋 翻訳パネル <kbd>Alt+Q</kbd>
左右分割のフローティング翻訳パネル。即時翻訳、ページ翻訳とは独立して動作。全言語ペア対応。

</td>
<td width="50%">

### 💾 スマートキャッシュ — API コスト削減
メモリ + 永続の二層キャッシュ。重複テキストは即時ヒット、**トークン消費ゼロ**。最大 2,000 エントリ、1 時間 TTL。30 秒毎に自動保存。言語切替で自動クリア。キャッシュ命中率をリアルタイム表示。

</td>
</tr>
</table>

---

## 📦 インストール

### 方法 1：Release をダウンロード（推奨）

1. [Releases](https://github.com/hywihq-boop/faluber-Ai-Translate/releases) を開く
2. 最新の `faluber-Ai-Translate-vX.X.X.zip` をダウンロード
3. `chrome://extensions` を開き、**デベロッパーモード**を有効にする
4. ダウンロードした zip を**直接ドラッグ＆ドロップ**
5. 完了！

### 方法 2：ソースコード ZIP をダウンロード

1. リポジトリページの緑の **Code** ボタン → Download ZIP
2. 同様に `chrome://extensions` にドラッグ＆ドロップ

### 設定と使用

| 手順 | |
|------|---|
| **API を設定** | 拡張機能アイコンをクリック → プロバイダー選択 → API キー入力 → 接続テスト → 保存 |
| **翻訳開始** | 任意のページを開く → ウィジェットをクリックまたは <kbd>Alt+T</kbd> |

---

## 🔧 API プロバイダー

| プロバイダー | API ベース URL |
|-------------|---------------|
| ⭐ DeepSeek | `https://api.deepseek.com/v1` |
| OpenAI | `https://api.openai.com/v1` |
| Groq | `https://api.groq.com/openai/v1` |
| Together AI | `https://api.together.xyz/v1` |
| OpenRouter | `https://openrouter.ai/api/v1` |
| SiliconFlow | `https://api.siliconflow.cn/v1` |
| Moonshot | `https://api.moonshot.cn/v1` |
| Zhipu | `https://open.bigmodel.cn/api/paas/v4` |
| DashScope | `https://dashscope.aliyuncs.com/compatible-mode/v1` |
| カスタム | 任意の OpenAI 互換エンドポイント |

---

## 🛠️ 仕組み

```
ユーザーが翻訳をトリガー
  → Content Script が DOM を走査し、可視テキストノードを収集
  → 可視性チェック → CJK 重複除去 → 最小長フィルター → キャッシュ重複除去
  → Y 座標ソート、隣接マージ → バッチ化 → Service Worker（3–8 並列）
  → AI API（OpenAI 互換形式）を呼出 → 返却 → DOM テキスト置換
  → リアルタイムプログレスバー + 完了通知
```

### モード比較

| | 標準 | ターボ |
|---|------|-------|
| 並列数 | 3 | 8 |
| バッチサイズ | 400 文字 | 250 文字 |
| 範囲 | ビューポート | 全ページ |
| スクロール検出 | ✅ | — |
| ホバー検出 | ✅ | — |
| 動的コンテンツ | ✅ | ✅ |

---

## 🌍 50 言語 · 20 UI 言語

<details>
<summary><b>展開して全言語を表示</b></summary>
<br>

`简体中文` `繁體中文` `English` `日本語` `한국어` `Français` `Deutsch` `Español` `Português` `Русский` `العربية` `हिन्दी` `ไทย` `Tiếng Việt` `Italiano` `Nederlands` `Polski` `Türkçe` `Bahasa Indonesia` `Svenska` `Dansk` `Suomi` `Norsk` `Čeština` `Română` `Magyar` `Ελληνικά` `עברית` `Українська` `Melayu` `Filipino` `বাংলা` `اردو` `فارسی` `Kiswahili` `தமிழ்` `తెలుగు` `मराठी` `ગુજરાતી` `ಕನ್ನಡ` `മലയാളം` `ਪੰਜਾਬੀ` `Български` `Slovenčina` `Lietuvių` `Latviešu` `Eesti` `Slovenščina` `Hrvatski` `Српски`

</details>

---

## 📂 プロジェクト構成

```
faluber-ai-translate/
├── manifest.json
├── background/service-worker.js   # API 呼出とルーティング
├── content/
│   ├── content.js                 # DOM テキスト抽出と置換
│   └── content.css                # ウィジェットスタイル
├── popup/
│   ├── popup.html                 # 設定ポップアップ
│   ├── popup.js                   # マルチ API 管理
│   └── popup.css
├── icons/                         # 拡張機能アイコン
├── assets/                        # スクリーンショット
└── docs/                          # 製品ウェブサイト
```

---

## 🔒 プライバシー

- API キーは Chrome 同期ストレージに**ローカル**保存
- リクエストはブラウザから**直接**設定済み API プロバイダーに送信
- **第三者サーバーは介在しません**

---

<div align="center">
  <br>
  <a href="https://github.com/hywihq-boop/faluber-Ai-Translate">⭐ Star</a> ·
  <a href="https://github.com/hywihq-boop/faluber-Ai-Translate/releases">📦 リリース</a> ·
  <a href="https://github.com/hywihq-boop/faluber-Ai-Translate/issues">🐛 バグ報告</a> ·
  <a href="LICENSE">📝 MIT</a>
</div>
