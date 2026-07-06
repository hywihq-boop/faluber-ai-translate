<div align="center">
  <img src="icons/logo.png" width="96" height="96" style="border-radius:18px">

  # 🌐 Faluber Translate

  ### AI 搭載ウェブページ翻訳

  <sub>AI を活用した Chrome ブラウザ翻訳拡張機能。テキストノードレベルの DOM 操作。<br>50 言語対応 · 20 UI 言語 · OpenAI 互換 API · MIT オープンソース。</sub>

  <br>

  ![version](https://img.shields.io/badge/v2.0.10-7c5cfc?style=flat-square)
  ![manifest](https://img.shields.io/badge/MV3-blue?style=flat-square)
  ![license](https://img.shields.io/badge/MIT-green?style=flat-square)

  <br><br>

  <a href="https://github.com/hywihq-boop/faluber-translate/releases"><img src="https://img.shields.io/badge/⬇_ダウンロード-7c5cfc?style=for-the-badge" alt="ダウンロード"></a>
  &nbsp;
  <a href="https://github.com/hywihq-boop/faluber-translate"><img src="https://img.shields.io/badge/⭐_Star_on_GitHub-222?style=for-the-badge" alt="Star"></a>

  <br><br>

  <table align="center"><tr>
  <td align="center"><b style="font-size:20px;color:#5ce0fc">50+</b><br><sub style="color:#888">言語</sub></td>
  <td align="center"><b style="font-size:20px;color:#5ce0fc">2</b><br><sub style="color:#888">モード</sub></td>
  <td align="center"><b style="font-size:20px;color:#5ce0fc">8</b><br><sub style="color:#888">同時翻訳</sub></td>
  <td align="center"><b style="font-size:20px;color:#5ce0fc">10</b><br><sub style="color:#888">API</sub></td>
  <td align="center"><b style="font-size:20px;color:#5ce0fc">~1s</b><br><sub style="color:#888">単語説明</sub></td>
  </tr></table>
</div>

---

## ✨ 主要機能

<table>
<tr>
<td width="50%">

### 🚀 ワンクリック全ページ翻訳
フローティングウィジェットをクリック、または <kbd>Alt+T</kbd> でページ全体を翻訳。テキストノードレベルの DOM 置換でページ構造を維持。ソース言語の自動検出に対応。

</td>
<td width="50%">

### 🔍 Ctrl + スマート説明
任意の単語にホバー + <kbd>Ctrl</kbd> タップで AI 説明バブルを表示。テキスト選択 + <kbd>Ctrl</kbd> で文章全体を説明。2 段階フォールバック：NLP プロンプト → HTML 検出。DOM 汚染ゼロ。

</td>
</tr>
<tr>
<td width="50%">

### ⚡ デュアル翻訳モード
**標準** — 3 並列、ビューポート優先、速度とコストのバランス。<br>
**ターボ** — 8 並列、全ページ、最大速度。設定は永続化。

</td>
<td width="50%">

### 🔑 マルチ API 管理
10 のプロバイダープリセット内蔵。複数の API 設定を保存し、いつでも切替可能。モデル自動取得。カスタムエンドポイント対応。

</td>
</tr>
<tr>
<td width="50%">

### 📋 翻訳パネル <kbd>Alt+Q</kbd>
左右分割のフローティング翻訳パネル。入力した原文を即時翻訳、ページ翻訳とは独立して動作。全言語ペア対応。

</td>
<td width="50%">

### 💾 スマートキャッシュ
メモリ + 永続の二層キャッシュ。最大 2,000 エントリ、1 時間 TTL。30 秒毎 + `beforeunload` で自動フラッシュ。言語切替で自動クリア。

</td>
</tr>
</table>

---

## 🖥️ デモ

### 全ページ翻訳 + フローティングウィジェット

右下のウィジェットをクリック、または <kbd>Alt+T</kbd> を押すとページ全体が即座に翻訳されます。

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
      <mark style="background:rgba(124,92,252,0.2);color:#c0c0d0;padding:0 2px;border-radius:2px">人工知能</mark>（AI）は機械が示す知能です。主要な AI 教科書では、この分野を<mark style="background:rgba(124,92,252,0.2);color:#c0c0d0;padding:0 2px;border-radius:2px">「知的エージェント」</mark>の研究と定義しています。
    </p>
    <p style="color:#8b949e;font-size:13px;margin-bottom:10px;line-height:1.7">
      AI の応用には<mark style="background:rgba(124,92,252,0.2);color:#c0c0d0;padding:0 2px;border-radius:2px">高度な検索エンジン</mark>、<mark style="background:rgba(124,92,252,0.2);color:#c0c0d0;padding:0 2px;border-radius:2px">推薦システム</mark>、<mark style="background:rgba(124,92,252,0.2);color:#c0c0d0;padding:0 2px;border-radius:2px">音声認識</mark>、<mark style="background:rgba(124,92,252,0.2);color:#c0c0d0;padding:0 2px;border-radius:2px">自動運転</mark>、<mark style="background:rgba(124,92,252,0.2);color:#c0c0d0;padding:0 2px;border-radius:2px">生成 AI</mark> が含まれます。
    </p>
  </div>
  <div style="margin:0 16px 16px;border-radius:18px;background:#0d1117;border:1px solid #30363d;overflow:hidden">
    <div style="display:flex;align-items:center;justify-content:space-between;padding:10px 13px">
      <span style="font-size:11px;color:#8b949e">自動</span>
      <span style="display:inline-block;width:32px;height:18px;border-radius:99px;background:#7c5cfc"><span style="display:inline-block;margin:2px 0 0 15px;width:14px;height:14px;border-radius:50%;background:#fff"></span></span>
      <span style="padding:5px 14px;border-radius:13px;background:rgba(74,222,128,0.1);color:#4ade80;border:1px solid rgba(74,222,128,0.2);font-size:11px;font-weight:600">翻訳済</span>
    </div>
    <div style="padding:6px 13px;background:rgba(255,255,255,0.03);display:flex;justify-content:space-between;align-items:center;font-size:10px;color:#8b949e">
      <span>Tokens <b style="color:#7c5cfc">2.5K</b></span>
      <span style="color:#4ade80">キャッシュ 42%</span>
    </div>
  </div>
</div>

---

### Ctrl + スマート説明

任意の単語にホバーして <kbd>Ctrl</kbd> をタップすると、AI が即座に説明バブルを表示します。

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
        「Strix」はラテン語で「フクロウ」を意味し、ASUS のプレミアムゲーミングブランド ROG Strix の名前でもあります。GitHub ではプロジェクト名や組織名としてよく使われています。
      </div>
    </div>
  </div>
</div>

---

### 翻訳パネル — <kbd>Alt+Q</kbd>

<kbd>Alt+Q</kbd> で左右分割のフローティング翻訳パネルを表示。左側に原文を入力すると、右側に翻訳が表示されます。

<div style="border-radius:12px;overflow:hidden;border:1px solid #30363d;background:#161b22;max-width:780px;margin:0 auto 20px">
  <div style="display:flex;align-items:center;gap:8px;padding:10px 14px;background:#21262d;border-bottom:1px solid #30363d">
    <span style="width:10px;height:10px;border-radius:50%;background:#f87171;display:inline-block"></span>
    <span style="width:10px;height:10px;border-radius:50%;background:#facc15;display:inline-block"></span>
    <span style="width:10px;height:10px;border-radius:50%;background:#4ade80;display:inline-block"></span>
    <span style="padding:4px 12px;border-radius:6px;background:rgba(255,255,255,0.05);font-size:11px;color:#8b949e;flex:1;margin-left:4px">Faluber Translate — 翻訳パネル</span>
  </div>
  <div style="padding:24px;display:flex;gap:12px;align-items:stretch">
    <div style="flex:1;display:flex;flex-direction:column">
      <span style="font-size:10px;color:#8b949e;margin-bottom:4px;text-transform:uppercase">入力 — English</span>
      <textarea readonly style="flex:1;background:#0d1117;border:1px solid #30363d;border-radius:8px;color:#c0c0d0;padding:12px;font-size:12px;resize:none;min-height:120px;width:100%;font-family:inherit;outline:none">Artificial intelligence is transforming how we interact with technology. From voice assistants to self-driving cars, AI applications are becoming ubiquitous.</textarea>
    </div>
    <div style="display:flex;align-items:center;color:#7c5cfc;font-size:20px">→</div>
    <div style="flex:1;display:flex;flex-direction:column">
      <span style="font-size:10px;color:#8b949e;margin-bottom:4px;text-transform:uppercase">出力 — 日本語</span>
      <textarea readonly style="flex:1;background:#0d1117;border:1px solid rgba(74,222,128,0.2);border-radius:8px;color:#4ade80;padding:12px;font-size:12px;resize:none;min-height:120px;width:100%;font-family:inherit;outline:none">人工知能は、私たちがテクノロジーと対話する方法を変革しています。音声アシスタントから自動運転車まで、AI アプリケーションは日常生活のあらゆる場面で普及しつつあります。</textarea>
    </div>
  </div>
</div>

---

### API 設定とモード切替

ポップアップまたはフローティングウィジェットから API 設定の管理、プロバイダー切替、モデル取得、モード切替が可能です。

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
      <span style="font-size:10px;color:#6e7681;text-transform:uppercase">プロバイダー</span>
      <select style="width:100%;padding:7px 10px;background:#161b22;border:1px solid #30363d;border-radius:8px;color:#c0c0d0;font-size:11px;margin:4px 0 8px"><option>DeepSeek</option></select>
      <span style="font-size:10px;color:#6e7681;text-transform:uppercase">API キー</span>
      <input type="password" value="sk-••••••••••••••" readonly style="width:100%;padding:7px 10px;background:#161b22;border:1px solid #30363d;border-radius:8px;color:#c0c0d0;font-size:11px;margin:4px 0 8px;font-family:monospace;outline:none">
      <span style="font-size:10px;color:#6e7681;text-transform:uppercase">API URL</span>
      <input value="https://api.deepseek.com/v1" readonly style="width:100%;padding:7px 10px;background:#161b22;border:1px solid #30363d;border-radius:8px;color:#c0c0d0;font-size:11px;margin:4px 0 8px;font-family:monospace;outline:none">
      <div style="display:flex;gap:8px;margin-top:10px">
        <span style="padding:6px 12px;background:rgba(124,92,252,0.12);color:#7c5cfc;border-radius:8px;font-size:11px;font-weight:600">接続テスト</span>
        <span style="padding:6px 12px;background:rgba(74,222,128,0.12);color:#4ade80;border-radius:8px;font-size:11px;font-weight:600">💾 保存</span>
        <span style="font-size:10px;color:#4ade80">✅ 接続成功</span>
      </div>
    </div>
    <div style="display:flex;justify-content:space-between;padding:10px 16px;font-size:10px;color:#6e7681">
      <span>ショートカット <kbd style="background:#161b22;border:1px solid #30363d;padding:1px 4px;border-radius:3px;font-size:9px">Alt+T</kbd></span>
      <span>🌐 日本語</span>
    </div>
  </div>

  <div style="width:260px;background:#0d1117;border:1px solid #30363d;border-radius:14px;padding:14px;font-size:11px">
    <div style="display:flex;justify-content:space-between;margin-bottom:12px">
      <b style="color:#e6edf3;font-size:13px">翻訳設定</b>
      <span style="background:rgba(248,113,133,0.1);color:#f87171;border-radius:6px;padding:3px 8px;font-size:10px">キャッシュ削除</span>
    </div>
    <div style="margin-bottom:10px">
      <span style="font-size:10px;color:#6e7681">Language</span>
      <div style="background:#161b22;border:1px solid #30363d;border-radius:6px;padding:6px 8px;color:#c0c0d0;font-size:11px;margin-top:3px">🇯🇵 日本語 ▾</div>
    </div>
    <div style="display:flex;gap:6px;margin-bottom:12px">
      <div style="flex:1"><span style="font-size:10px;color:#6e7681">ソース</span><div style="background:#161b22;border:1px solid #30363d;border-radius:6px;padding:6px 8px;color:#c0c0d0;font-size:11px;margin-top:3px">自動検出 ▾</div></div>
      <div style="flex:1"><span style="font-size:10px;color:#6e7681">ターゲット</span><div style="background:#161b22;border:1px solid #30363d;border-radius:6px;padding:6px 8px;color:#c0c0d0;font-size:11px;margin-top:3px">日本語 ▾</div></div>
    </div>
    <div style="margin-bottom:12px">
      <span style="font-size:10px;color:#6e7681">モード</span>
      <div style="margin-top:3px">
        <div style="display:flex;align-items:center;justify-content:space-between;background:#161b22;border:1px solid #30363d;border-radius:6px;padding:6px 8px;color:#c0c0d0;font-size:11px">⚡ 標準 <span style="color:#6e7681">▾</span></div>
        <div style="background:#161b22;border:1px solid #30363d;border-radius:0 0 6px 6px;margin-top:1px;overflow:hidden">
          <div style="padding:6px 8px;font-size:11px;color:#9061f9;font-weight:600;background:rgba(124,92,252,0.08)">⚡ 標準</div>
          <div style="padding:6px 8px;font-size:11px;color:#c0c0d0">🚀 ターボ</div>
        </div>
      </div>
    </div>
    <div style="height:1px;background:#21262d;margin:12px 0"></div>
    <table style="width:100%;font-size:10px;border:none">
      <tr><td style="color:#6e7681;border:none;padding:2px 0">入力</td><td style="color:#e6edf3;text-align:right;border:none;padding:2px 0">12.5K</td></tr>
      <tr><td style="color:#6e7681;border:none;padding:2px 0">出力</td><td style="color:#e6edf3;text-align:right;border:none;padding:2px 0">3.2K</td></tr>
      <tr><td style="color:#6e7681;border:none;padding:2px 0">合計</td><td style="color:#e6edf3;text-align:right;border:none;padding:2px 0">15.7K</td></tr>
      <tr><td style="color:#6e7681;border:none;padding:2px 0">推定コスト</td><td style="color:#e6edf3;text-align:right;border:none;padding:2px 0">¥0.0189</td></tr>
      <tr><td style="color:#6e7681;border:none;padding:2px 0">キャッシュ</td><td style="color:#e6edf3;text-align:right;border:none;padding:2px 0">142 件</td></tr>
    </table>
  </div>
</div>

<br>

---

## 📦 3 ステップで開始

<table>
<tr>
<td align="center" width="33%"><b style="font-size:16px">1. インストール</b><br><sub><a href="https://github.com/hywihq-boop/faluber-translate/releases">Releases</a> から zip をダウンロード、<br>解凍して <code>chrome://extensions</code> で読み込み</sub></td>
<td align="center" width="33%"><b style="font-size:16px">2. API 設定</b><br><sub>プロバイダーを選択、API キー入力、<br>接続テスト、保存</sub></td>
<td align="center" width="33%"><b style="font-size:16px">3. 翻訳</b><br><sub>任意のページを開き、ウィジェットを<br>クリックまたは <kbd>Alt+T</kbd></sub></td>
</tr>
</table>

---

## 🔧 10 の API プロバイダー

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
  → Y 座標でソート、隣接ノードをマージ
  → バッチ化 → Service Worker に送信（3–8 並列）
  → AI API（OpenAI 互換形式）を呼出 → 結果返却
  → DOM テキスト置換 → リアルタイムプログレスバー
```

### モード比較

| パラメータ | 標準 | ターボ |
|-----------|------|-------|
| 並列数 | 3 | 8 |
| バッチサイズ | 400 文字 | 250 文字 |
| ページ範囲 | ビューポートのみ | 全ページ |
| スクロール検出 | ✅ | — |
| ホバー検出 | ✅ | — |
| 動的コンテンツ | ✅ | ✅ |

### キャッシュ

| 層 | ストレージ | 上限 | TTL | フラッシュ |
|----|-----------|------|-----|-----------|
| メモリ | `Map<原文, 訳文>` | ∞ | セッション | — |
| 永続 | `chrome.storage.local` | 2,000 | 1 時間 | 30s + `beforeunload` |

---

## 🌍 50 言語 · 20 UI 言語

<details>
<summary><b>展開して全 50 言語を表示</b></summary>
<br>

`简体中文` `繁體中文` `English` `日本語` `한국어` `Français` `Deutsch` `Español` `Português` `Русский` `العربية` `हिन्दी` `ไทย` `Tiếng Việt` `Italiano` `Nederlands` `Polski` `Türkçe` `Bahasa Indonesia` `Svenska` `Dansk` `Suomi` `Norsk` `Čeština` `Română` `Magyar` `Ελληνικά` `עברית` `Українська` `Melayu` `Filipino` `বাংলা` `اردو` `فارسی` `Kiswahili` `தமிழ்` `తెలుగు` `मराठी` `ગુજરાતી` `ಕನ್ನಡ` `മലയാളം` `ਪੰਜਾਬੀ` `Български` `Slovenčina` `Lietuvių` `Latviešu` `Eesti` `Slovenščina` `Hrvatski` `Српски`

</details>

---

## 📂 プロジェクト構成

```
faluber translate/
├── manifest.json
├── background/service-worker.js   # API 呼出とメッセージルーティング
├── content/
│   ├── content.js                 # DOM テキスト抽出と置換
│   └── content.css                # ウィジェットスタイル
├── popup/
│   ├── popup.html                 # 設定ポップアップ
│   ├── popup.js                   # マルチ API 管理
│   └── popup.css
├── icons/                         # 拡張機能アイコン
├── docs/                          # 製品ウェブサイト
└── generate-icons.js              # アイコン生成（開発ツール）
```

---

## 🔒 プライバシー

- API キーは Chrome 同期ストレージに**ローカル**保存
- 翻訳リクエストはブラウザから**直接**設定済み API プロバイダーに送信
- **第三者サーバーは介在しません** — データはあなたと API プロバイダー間のみ

---

<div align="center">
  <br>
  <a href="https://github.com/hywihq-boop/faluber-translate">⭐ Star</a> ·
  <a href="https://github.com/hywihq-boop/faluber-translate/releases">📦 リリース</a> ·
  <a href="https://github.com/hywihq-boop/faluber-translate/issues">🐛 バグ報告</a> ·
  <a href="LICENSE">📝 MIT</a>
  <br><br>
  <sub>❤️ で制作 · ユーザーデータ収集なし</sub>
</div>
