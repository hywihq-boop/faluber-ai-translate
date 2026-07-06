<div align="center">
  <img src="icons/logo.png" width="96" height="96" style="border-radius:18px">

  # 🌐 Faluber Translate

  ### AI 智能网页翻译插件

  <sub>基于 AI 的 Chrome 浏览器翻译插件。文本节点级 DOM 操作。<br>50 种目标语言 · 20 种界面语言 · 兼容 OpenAI 格式 API · MIT 开源。</sub>

  <br>

  ![version](https://img.shields.io/badge/v2.0.10-7c5cfc?style=flat-square)
  ![manifest](https://img.shields.io/badge/MV3-blue?style=flat-square)
  ![license](https://img.shields.io/badge/MIT-green?style=flat-square)

  <br><br>

  <a href="https://github.com/hywihq-boop/faluber-translate/releases"><img src="https://img.shields.io/badge/⬇_下载最新版-7c5cfc?style=for-the-badge" alt="下载"></a>
  &nbsp;
  <a href="https://github.com/hywihq-boop/faluber-translate"><img src="https://img.shields.io/badge/⭐_Star_on_GitHub-222?style=for-the-badge" alt="Star"></a>

  <br><br>

  <table align="center"><tr>
  <td align="center"><b style="font-size:20px;color:#5ce0fc">50+</b><br><sub style="color:#888">支持语言</sub></td>
  <td align="center"><b style="font-size:20px;color:#5ce0fc">2</b><br><sub style="color:#888">翻译模式</sub></td>
  <td align="center"><b style="font-size:20px;color:#5ce0fc">8</b><br><sub style="color:#888">并发翻译</sub></td>
  <td align="center"><b style="font-size:20px;color:#5ce0fc">10</b><br><sub style="color:#888">API 提供商</sub></td>
  <td align="center"><b style="font-size:20px;color:#5ce0fc">~1s</b><br><sub style="color:#888">词语解释</sub></td>
  </tr></table>
</div>

---

## ✨ 核心功能

<table>
<tr>
<td width="50%">

### 🚀 一键整页翻译
点击悬浮球或按 <kbd>Alt+T</kbd> 翻译整个页面。文本节点级 DOM 替换，不破坏页面结构。支持自动检测源语言。

</td>
<td width="50%">

### 🔍 Ctrl + 智能解释
鼠标指向任意词汇 + 单击 <kbd>Ctrl</kbd> 弹出 AI 解释气泡。选中文字 + <kbd>Ctrl</kbd> 解释整段。两级回退：NLP 提示词 → HTML 检测。零 DOM 污染。

</td>
</tr>
<tr>
<td width="50%">

### ⚡ 双档翻译模式
**标准** — 3 并发，视野优先，速度与消耗均衡。<br>
**极速** — 8 并发，全页翻译，速度拉满。设置持久化保存。

</td>
<td width="50%">

### 🔑 多 API 管理
内置 10 家提供商预设。保存多个 API 配置随时切换。自动拉取可用模型。支持自定义接口。

</td>
</tr>
<tr>
<td width="50%">

### 📋 翻译面板 <kbd>Alt+Q</kbd>
左右布局的浮动翻译面板。输入原文即时翻译，独立于页面翻译。支持任意语言对。

</td>
<td width="50%">

### 💾 智能缓存
内存 + 持久化双层缓存。最多 2,000 条、1 小时 TTL。每 30 秒 + `beforeunload` 自动刷盘。切换语言自动清除。

</td>
</tr>
</table>

---

## 🖥️ 效果演示

### 整页翻译 + 悬浮球

点击右下角悬浮球的「翻译」按钮或按 <kbd>Alt+T</kbd>，整页文本即刻翻译。鼠标悬停已翻译文字会高亮显示原文。

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
      <span style="font-size:11px;color:#8b949e">自动</span>
      <span style="display:inline-block;width:32px;height:18px;border-radius:99px;background:#7c5cfc"><span style="display:inline-block;margin:2px 0 0 15px;width:14px;height:14px;border-radius:50%;background:#fff"></span></span>
      <span style="padding:5px 14px;border-radius:13px;background:rgba(74,222,128,0.1);color:#4ade80;border:1px solid rgba(74,222,128,0.2);font-size:11px;font-weight:600">已翻译</span>
    </div>
    <div style="padding:6px 13px;background:rgba(255,255,255,0.03);display:flex;justify-content:space-between;align-items:center;font-size:10px;color:#8b949e">
      <span>Token <b style="color:#7c5cfc">2.5K</b></span>
      <span style="color:#4ade80">缓存命中 42%</span>
    </div>
  </div>
</div>

---

### Ctrl + 智能解释

鼠标指向任意词汇，单击 <kbd>Ctrl</kbd> 键，AI 即刻弹出解释气泡。不修改网页文本，零 DOM 污染。

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
        Strix 是拉丁语"猫头鹰"，也是华硕旗下高端电竞品牌 ROG Strix 系列的名称。GitHub 上常被用作项目名或组织名。
      </div>
    </div>
  </div>
</div>

---

### 翻译面板 — <kbd>Alt+Q</kbd>

按 <kbd>Alt+Q</kbd> 打开浮动翻译面板，左侧输入原文、右侧输出译文。支持任意语言对，独立于页面翻译。

<div style="border-radius:12px;overflow:hidden;border:1px solid #30363d;background:#161b22;max-width:780px;margin:0 auto 20px">
  <div style="display:flex;align-items:center;gap:8px;padding:10px 14px;background:#21262d;border-bottom:1px solid #30363d">
    <span style="width:10px;height:10px;border-radius:50%;background:#f87171;display:inline-block"></span>
    <span style="width:10px;height:10px;border-radius:50%;background:#facc15;display:inline-block"></span>
    <span style="width:10px;height:10px;border-radius:50%;background:#4ade80;display:inline-block"></span>
    <span style="padding:4px 12px;border-radius:6px;background:rgba(255,255,255,0.05);font-size:11px;color:#8b949e;flex:1;margin-left:4px">Faluber Translate — 翻译面板</span>
  </div>
  <div style="padding:24px;display:flex;gap:12px;align-items:stretch">
    <div style="flex:1;display:flex;flex-direction:column">
      <span style="font-size:10px;color:#8b949e;margin-bottom:4px;text-transform:uppercase">输入 — English</span>
      <textarea readonly style="flex:1;background:#0d1117;border:1px solid #30363d;border-radius:8px;color:#c0c0d0;padding:12px;font-size:12px;resize:none;min-height:120px;width:100%;font-family:inherit;outline:none">Artificial intelligence is transforming how we interact with technology. From voice assistants to self-driving cars, AI applications are becoming ubiquitous.</textarea>
    </div>
    <div style="display:flex;align-items:center;color:#7c5cfc;font-size:20px">→</div>
    <div style="flex:1;display:flex;flex-direction:column">
      <span style="font-size:10px;color:#8b949e;margin-bottom:4px;text-transform:uppercase">输出 — 简体中文</span>
      <textarea readonly style="flex:1;background:#0d1117;border:1px solid rgba(74,222,128,0.2);border-radius:8px;color:#4ade80;padding:12px;font-size:12px;resize:none;min-height:120px;width:100%;font-family:inherit;outline:none">人工智能正在改变我们与技术互动的方式。从语音助手到自动驾驶汽车，AI 应用在我们的日常生活中变得越来越无处不在。</textarea>
    </div>
  </div>
</div>

---

### API 设置与模式切换

管理多 API 配置、切换提供商、自动拉取可用模型、切换翻译模式——全部在 Popup 弹窗或悬浮球详情面板中完成。

<div style="display:flex;gap:20px;flex-wrap:wrap;justify-content:center;margin:20px auto">
  <div style="width:300px;background:#0d1117;border:1px solid #30363d;border-radius:14px;overflow:hidden">
    <div style="display:flex;align-items:center;gap:10px;padding:14px 16px;border-bottom:1px solid #21262d">
      <div style="width:28px;height:28px;border-radius:6px;background:linear-gradient(135deg,#7c5cfc,#5ce0fc)"></div>
      <b style="background:linear-gradient(135deg,#7c5cfc,#5ce0fc);-webkit-background-clip:text;-webkit-text-fill-color:transparent">Faluber Translate</b>
    </div>
    <div style="padding:14px 16px;border-bottom:1px solid #21262d">
      <span style="font-size:10px;color:#6e7681;text-transform:uppercase">API 设置</span>
      <div style="display:flex;gap:4px;margin:6px 0 8px">
        <select style="flex:1;padding:7px 10px;background:#161b22;border:1px solid #30363d;border-radius:8px;color:#c0c0d0;font-size:11px"><option>Default</option></select>
        <span style="padding:4px 8px;background:rgba(124,92,252,0.12);color:#7c5cfc;border-radius:4px;font-size:14px">＋</span>
      </div>
      <span style="font-size:10px;color:#6e7681;text-transform:uppercase">提供商</span>
      <select style="width:100%;padding:7px 10px;background:#161b22;border:1px solid #30363d;border-radius:8px;color:#c0c0d0;font-size:11px;margin:4px 0 8px"><option>DeepSeek</option></select>
      <span style="font-size:10px;color:#6e7681;text-transform:uppercase">API Key</span>
      <input type="password" value="sk-••••••••••••••" readonly style="width:100%;padding:7px 10px;background:#161b22;border:1px solid #30363d;border-radius:8px;color:#c0c0d0;font-size:11px;margin:4px 0 8px;font-family:monospace;outline:none">
      <span style="font-size:10px;color:#6e7681;text-transform:uppercase">API 地址</span>
      <input value="https://api.deepseek.com/v1" readonly style="width:100%;padding:7px 10px;background:#161b22;border:1px solid #30363d;border-radius:8px;color:#c0c0d0;font-size:11px;margin:4px 0 8px;font-family:monospace;outline:none">
      <div style="display:flex;gap:8px;margin-top:10px">
        <span style="padding:6px 12px;background:rgba(124,92,252,0.12);color:#7c5cfc;border-radius:8px;font-size:11px;font-weight:600">测试连接</span>
        <span style="padding:6px 12px;background:rgba(74,222,128,0.12);color:#4ade80;border-radius:8px;font-size:11px;font-weight:600">💾 保存</span>
        <span style="font-size:10px;color:#4ade80">✅ 连接成功</span>
      </div>
    </div>
    <div style="display:flex;justify-content:space-between;padding:10px 16px;font-size:10px;color:#6e7681">
      <span>快捷键 <kbd style="background:#161b22;border:1px solid #30363d;padding:1px 4px;border-radius:3px;font-size:9px">Alt+T</kbd></span>
      <span>🌐 简体中文</span>
    </div>
  </div>

  <div style="width:260px;background:#0d1117;border:1px solid #30363d;border-radius:14px;padding:14px;font-size:11px">
    <div style="display:flex;justify-content:space-between;margin-bottom:12px">
      <b style="color:#e6edf3;font-size:13px">翻译设置</b>
      <span style="background:rgba(248,113,133,0.1);color:#f87171;border-radius:6px;padding:3px 8px;font-size:10px">清除缓存</span>
    </div>
    <div style="margin-bottom:10px">
      <span style="font-size:10px;color:#6e7681">Language</span>
      <div style="background:#161b22;border:1px solid #30363d;border-radius:6px;padding:6px 8px;color:#c0c0d0;font-size:11px;margin-top:3px">🇨🇳 简体中文 ▾</div>
    </div>
    <div style="display:flex;gap:6px;margin-bottom:12px">
      <div style="flex:1"><span style="font-size:10px;color:#6e7681">源语种</span><div style="background:#161b22;border:1px solid #30363d;border-radius:6px;padding:6px 8px;color:#c0c0d0;font-size:11px;margin-top:3px">自动检测 ▾</div></div>
      <div style="flex:1"><span style="font-size:10px;color:#6e7681">目标语种</span><div style="background:#161b22;border:1px solid #30363d;border-radius:6px;padding:6px 8px;color:#c0c0d0;font-size:11px;margin-top:3px">简体中文 ▾</div></div>
    </div>
    <div style="margin-bottom:12px">
      <span style="font-size:10px;color:#6e7681">翻译模式</span>
      <div style="margin-top:3px">
        <div style="display:flex;align-items:center;justify-content:space-between;background:#161b22;border:1px solid #30363d;border-radius:6px;padding:6px 8px;color:#c0c0d0;font-size:11px">⚡ 标准模式 <span style="color:#6e7681">▾</span></div>
        <div style="background:#161b22;border:1px solid #30363d;border-radius:0 0 6px 6px;margin-top:1px;overflow:hidden">
          <div style="padding:6px 8px;font-size:11px;color:#9061f9;font-weight:600;background:rgba(124,92,252,0.08)">⚡ 标准模式</div>
          <div style="padding:6px 8px;font-size:11px;color:#c0c0d0">🚀 极速模式</div>
        </div>
      </div>
    </div>
    <div style="height:1px;background:#21262d;margin:12px 0"></div>
    <table style="width:100%;font-size:10px;border:none">
      <tr><td style="color:#6e7681;border:none;padding:2px 0">输入</td><td style="color:#e6edf3;text-align:right;border:none;padding:2px 0">12.5K</td></tr>
      <tr><td style="color:#6e7681;border:none;padding:2px 0">输出</td><td style="color:#e6edf3;text-align:right;border:none;padding:2px 0">3.2K</td></tr>
      <tr><td style="color:#6e7681;border:none;padding:2px 0">总计</td><td style="color:#e6edf3;text-align:right;border:none;padding:2px 0">15.7K</td></tr>
      <tr><td style="color:#6e7681;border:none;padding:2px 0">预估费用</td><td style="color:#e6edf3;text-align:right;border:none;padding:2px 0">¥0.0189</td></tr>
      <tr><td style="color:#6e7681;border:none;padding:2px 0">缓存条目</td><td style="color:#e6edf3;text-align:right;border:none;padding:2px 0">142</td></tr>
    </table>
  </div>
</div>

<br>

---

## 📦 三步开始

<table>
<tr>
<td align="center" width="33%"><b style="font-size:16px">1. 安装</b><br><sub>从 <a href="https://github.com/hywihq-boop/faluber-translate/releases">Releases</a> 下载 zip，解压后<br>在 <code>chrome://extensions</code> 加载已解压的扩展</sub></td>
<td align="center" width="33%"><b style="font-size:16px">2. 配置</b><br><sub>选择提供商，填入 API Key，<br>测试连接，保存</sub></td>
<td align="center" width="33%"><b style="font-size:16px">3. 翻译</b><br><sub>打开任意网页，点击悬浮球<br>或按 <kbd>Alt+T</kbd></sub></td>
</tr>
</table>

---

## 🔧 10 家 API 提供商

| 提供商 | API 地址 |
|--------|----------|
| ⭐ DeepSeek | `https://api.deepseek.com/v1` |
| OpenAI | `https://api.openai.com/v1` |
| Groq | `https://api.groq.com/openai/v1` |
| Together AI | `https://api.together.xyz/v1` |
| OpenRouter | `https://openrouter.ai/api/v1` |
| SiliconFlow | `https://api.siliconflow.cn/v1` |
| Moonshot | `https://api.moonshot.cn/v1` |
| 智谱 | `https://open.bigmodel.cn/api/paas/v4` |
| 阿里百炼 | `https://dashscope.aliyuncs.com/compatible-mode/v1` |
| 自定义 | 任意 OpenAI 兼容端点 |

---

## 🛠️ 工作原理

```
用户触发翻译
  → Content Script 遍历 DOM，收集可见文本节点
  → 可见性检测 → CJK 去重 → 最小长度过滤 → 缓存去重
  → 按 Y 坐标排序，相邻节点合并
  → 分包 → 发 Service Worker（3–8 并发）
  → 调 AI API（OpenAI 兼容格式）→ 返回结果
  → DOM 文本替换 → 实时进度条
```

### 模式对比

| 参数 | 标准 | 极速 |
|------|------|------|
| 并发数 | 3 | 8 |
| 分批大小 | 400 字符 | 250 字符 |
| 翻译范围 | 可见区域 | 全页 |
| 滚动检测 | ✅ | — |
| 悬停检测 | ✅ | — |
| 动态内容 | ✅ | ✅ |

### 缓存

| 层级 | 存储 | 上限 | TTL | 刷盘 |
|------|------|------|-----|------|
| 内存 | `Map<原文, 译文>` | ∞ | 会话 | — |
| 持久化 | `chrome.storage.local` | 2,000 | 1 小时 | 30s + `beforeunload` |

---

## 🌍 50 种目标 · 20 种界面语言

<details>
<summary><b>展开查看全部 50 种语言</b></summary>
<br>

`简体中文` `繁體中文` `English` `日本語` `한국어` `Français` `Deutsch` `Español` `Português` `Русский` `العربية` `हिन्दी` `ไทย` `Tiếng Việt` `Italiano` `Nederlands` `Polski` `Türkçe` `Bahasa Indonesia` `Svenska` `Dansk` `Suomi` `Norsk` `Čeština` `Română` `Magyar` `Ελληνικά` `עברית` `Українська` `Melayu` `Filipino` `বাংলা` `اردو` `فارسی` `Kiswahili` `தமிழ்` `తెలుగు` `मराठी` `ગુજરાતી` `ಕನ್ನಡ` `മലയാളം` `ਪੰਜਾਬੀ` `Български` `Slovenčina` `Lietuvių` `Latviešu` `Eesti` `Slovenščina` `Hrvatski` `Српски`

</details>

---

## 📂 项目结构

```
faluber translate/
├── manifest.json
├── background/service-worker.js   # API 调用与消息路由
├── content/
│   ├── content.js                 # DOM 文本提取与替换
│   └── content.css                # 悬浮球样式
├── popup/
│   ├── popup.html                 # 设置弹窗
│   ├── popup.js                   # 多 API 管理
│   └── popup.css
├── icons/                         # 扩展图标
├── docs/                          # 产品官网
└── generate-icons.js              # 图标生成器（开发工具）
```

---

## 🔒 隐私

- API Key 仅存储在 Chrome **本地**同步存储中
- 翻译请求**直接**从浏览器发送到你的 API 提供商
- **不经过第三方服务器** — 数据只在你和 API 提供商之间传输

---

<div align="center">
  <br>
  <a href="https://github.com/hywihq-boop/faluber-translate">⭐ Star</a> ·
  <a href="https://github.com/hywihq-boop/faluber-translate/releases">📦 下载</a> ·
  <a href="https://github.com/hywihq-boop/faluber-translate/issues">🐛 反馈 Bug</a> ·
  <a href="LICENSE">📝 MIT</a>
  <br><br>
  <sub>用 ❤️ 制作 · 不收集任何用户数据</sub>
</div>
