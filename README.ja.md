# 🌐 Faluber Translate — AI 搭載ウェブページ翻訳

AI（DeepSeek、OpenAI、Qwen などの OpenAI 互換 API）を使用した Chrome ブラウザ翻訳拡張機能。Manifest V3 で構築され、テキストノードレベルの DOM 操作により、50 のターゲット言語と 20 の UI 言語でシームレスな翻訳を実現します。

![version](https://img.shields.io/badge/version-2.0.10-7c5cfc)
![manifest](https://img.shields.io/badge/manifest-v3-blue)
![license](https://img.shields.io/badge/license-MIT-green)

## ✨ 機能

- 🚀 **ワンクリック全ページ翻訳** — アイコンをクリックするか `Alt+T` を押す
- 🌍 **50 のターゲット言語** — AI 駆動、任意の言語ペアに対応
- ⚡ **2 つの翻訳モード** — 標準（バランス）と高速（最大速度）
- 🔑 **マルチ API 対応** — 10 のプロバイダープリセット（DeepSeek、OpenAI、Groq、Qwen 等）
- 💬 **Ctrl+説明バブル** — 単語にホバー + Ctrl で AI 説明を表示
- 📋 **翻訳パネル** — `Alt+Q` で左右分割の入出力翻訳パネルを表示
- 👆 **原文ホバー表示** — 翻訳テキストにマウスを重ねると原文を表示
- ↩️ **ワンクリック復元** — いつでも元のページに戻せる
- 📊 **リアルタイム進捗** — 翻訳中にビジュアルプログレスバーを表示
- 💾 **スマートキャッシュ** — メモリ + 永続キャッシュ、1 時間 TTL
- 🎨 **クリーンなダーク UI** — 折りたたみ可能なフローティングウィジェット

## 📦 インストール

### 1. 拡張機能を読み込む

1. Chrome/Edge を開き `chrome://extensions/` に移動
2. 右上の**デベロッパーモード**を有効にする
3. **パッケージ化されていない拡張機能を読み込む**をクリック
4. `faluber translate` フォルダを選択
5. 完了！

### 2. API を設定する

1. ツールバーの Faluber Translate アイコンをクリック
2. ドロップダウンからプロバイダーを選択（DeepSeek、OpenAI 等）
3. **API キー**を入力
4. **接続テスト**をクリックして確認
5. **保存**をクリック

### 3. 翻訳を開始する

- 任意のウェブページを開き、アイコンをクリック → **ページを翻訳**
- または **`Alt+T`** を押す

## 🎮 使い方

| 操作 | 方法 |
|------|------|
| ページ翻訳 | アイコン → "翻訳" または `Alt+T` |
| 選択テキスト翻訳 | テキストを選択 → `Ctrl` |
| 翻訳パネル | `Alt+Q` |
| 単語の説明 | 単語にホバー → `Ctrl` |
| 原文に戻す | アイコン → "復元" |
| 翻訳キャンセル | `Esc` |
| 原文を表示 | 翻訳テキストにホバー |
| 言語切替 | ポップアップの言語セレクター |

## 🔧 対応 API

10 のプロバイダープリセット内蔵。OpenAI 互換 API ならどれでも動作：

| プロバイダー | API ベース URL | モデル |
|-------------|---------------|-------|
| DeepSeek | `https://api.deepseek.com/v1` | `deepseek-chat` |
| OpenAI | `https://api.openai.com/v1` | `gpt-4o-mini` |
| Groq | `https://api.groq.com/openai/v1` | `llama-3.3-70b` |
| Together AI | `https://api.together.xyz/v1` | `meta-llama/...` |
| OpenRouter | `https://openrouter.ai/api/v1` | `openai/gpt-4o` |
| SiliconFlow | `https://api.siliconflow.cn/v1` | `deepseek-ai/...` |
| Moonshot | `https://api.moonshot.cn/v1` | `moonshot-v1-8k` |
| Zhipu | `https://open.bigmodel.cn/api/paas/v4` | `glm-4` |
| DashScope | `https://dashscope.aliyuncs.com/compatible-mode/v1` | `qwen-plus` |
| カスタム | 任意の OpenAI 互換エンドポイント | 任意のモデル |

## 📂 プロジェクト構成

```
faluber translate/
├── manifest.json                 # 拡張機能設定 (Manifest V3)
├── popup/
│   ├── popup.html                # 設定ポップアップ
│   ├── popup.js                  # マルチ API 管理ロジック
│   └── popup.css                 # ポップアップスタイル
├── content/
│   ├── content.js                # DOM テキスト抽出と置換
│   └── content.css               # ウィジェットスタイル
├── background/
│   └── service-worker.js         # API 呼び出しとメッセージルーティング
├── icons/                        # 拡張機能アイコン
├── generate-icons.js             # アイコン生成スクリプト（開発ツール）
├── LICENSE
└── README.md
```

## 🛠️ 仕組み

### 翻訳フロー

```
ユーザーが翻訳をトリガー
  → Content Script が DOM を走査し、可視テキストノードを収集
  → フィルター：可視性チェック、CJK 重複除去、最小長、キャッシュ重複除去
  → Y 座標でソート、隣接ノードをマージ
  → バッチ化して Service Worker に送信（3–8 並列ワーカー）
  → Service Worker が AI API を呼び出し（OpenAI 互換形式）
  → 結果を Content Script に返して DOM を置換
  → リアルタイムプログレスバー + 完了通知
```

### スマートテキスト処理

- `<script>`、`<style>`、`<code>` 等の非コンテンツタグをスキップ
- 純粋な数字、URL、絵文字など翻訳不要なコンテンツをフィルタリング
- `display:none`、`visibility:hidden` 等の非表示状態を検出
- HTML エンティティと特殊文字を保持
- 隣接テキストノード（同じ親または兄弟の親）をマージして送信

### 翻訳モード

| パラメータ | 標準 | 高速（ターボ） |
|-----------|------|---------------|
| 並列数 | 3 | 8 |
| バッチサイズ | 400 文字 | 250 文字 |
| 全ページ | いいえ（ビューポートのみ） | はい |
| スクロール検出 | はい | いいえ |
| ホバー検出 | はい | いいえ |
| MutationObserver | はい | はい |

### キャッシュシステム

- **メモリ**：`Map<原文, 訳文>` で即時検索
- **永続**：`chrome.storage.local`、最大 2,000 エントリ、1 時間 TTL
- **自動フラッシュ**：30 秒毎 + `beforeunload` 時
- **自動クリア**：ターゲット言語変更時

### Ctrl+説明（フローティングバブル）

- 単語にホバー + `Ctrl` をタップ（長押しではない）
- またはテキストを選択 + `Ctrl`
- 2 段階フォールバック：自然言語プロンプト → HTML 検査
- ✕、`Esc`、または他の場所をクリックで閉じる

## 🔒 プライバシー

- API キーは Chrome の同期ストレージにローカル保存
- すべての翻訳リクエストはブラウザから直接設定済み API プロバイダーに送信
- 第三者サーバーは介在しません — データはあなたと API プロバイダー間のみ

## 📝 ライセンス

MIT — 詳細は [LICENSE](LICENSE) を参照。
