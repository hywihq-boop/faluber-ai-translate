# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

**Faluber AI翻译** — Chrome/Edge 浏览器 AI 翻译插件（Manifest V3），基于 OpenAI 兼容 API（DeepSeek 等），文本节点级别 DOM 替换实现页面翻译。支持 50 种目标语言、20 种 UI 语言、10 家内置 API 提供商。

- 仓库: `hywihq-boop/faluber-Ai-Translate`
- 扩展 ID: `mdiodonkindbjkehkmoheglkedodkofa`（通过 `manifest.json` 中 `key` 字段固化）
- GitHub Pages: `https://hywihq-boop.github.io/faluber-Ai-Translate/`
- 私钥: `faluber-key.pem`（CRX 打包用，已加入 `.gitignore`）

## 架构 — 三个运行时

| 文件 | 运行时 | 职责 |
|------|------|------|
| `content/content.js` | 网页注入（`document_end`，`<all_urls>`） | DOM 文本收集、翻译调度、悬浮球 UI（CSS 以 `<style id="lf-styles">` 注入）、缓存、Ctrl 解释气泡、滚动/悬停观察器 |
| `background/service-worker.js` | Service Worker（`type: module`） | API 调用（批量翻译 `[N]` 格式、单词解释、连接测试、模型拉取）、Token 统计（按 API Key 前缀分桶 `tokens_<prefix>`）、50 种语言本地化提示词模板、`chrome.commands` 快捷键处理 |
| `popup/popup.html` + `popup.js` + `popup.css` | Popup | 多 API 管理（添加/切换/删除）+ 10 家提供商预设 + 模型拉取 + UI 语言同步 + Token 用量显示 + 版本号显示 |

### 数据流

```
用户触发翻译（Alt+T / 悬浮球点击）
  → Content Script: collectTextNodes() 遍历 DOM 收集文本节点
  → 可见性过滤 → CJK 去重 → 最小 3 字符 → 缓存去重
  → Y 坐标排序，同父/兄弟空格合并 → 按 batchLimit 分包
  → N 路并发（根据模式 3 或 8）→ translateBatch() → chrome.runtime.sendMessage
  → SW: handleBatchTranslate() 调 API（OpenAI 兼容格式）→ [N] 占位输出
  → Content Script: applyTranslation() 写入第一个 textNode，其余清空
  → 实时进度条 + 完成通知
```

### 文本收集核心 — `collectTextNodes(root, opts)`

`TreeWalker` 遍历文本节点 → `isVisible()` → `isTranslatable()`（CJK 去重 / 符号过滤 / 最小 3 字符）→ `translationMap` 去重 → 按 Y 坐标排序 → 同父/兄弟元素空格合并 → 返回 `[{node, text, y, subNodes}]`

### 翻译调度 — `translateAndApply(textNodes)`

先查 `translationCache` → 未命中按 `MODES[mode].batchLimit` 分包 → N 路并发 worker → `translateBatch()` 发 SW → `applyTranslation()` 写入 DOM → 写缓存 → 标记脏。

合并逻辑：相邻 text node（同父元素或父元素是相邻兄弟）空格拼接为一个整体发给 AI。第一个节点写入译文，其余清空。`translationMap` 保留原始值用于还原。

## 两档翻译模式

通过悬浮球详情面板的下拉菜单切换，存入 `chrome.storage.sync.mode`。

| 参数 | medium（标准） | high（极速） |
|---|---|---|
| concurrency | 3 | 8 |
| batchLimit | 400 | 250 |
| fullPage | false | true |
| scroll | true | false |
| hover | true | false |
| mutation | true | true |

不支持并发的 API 直接报错阻止翻译。

## 快捷键

| 快捷键 | 功能 | 实现方式 |
|--------|------|----------|
| `Alt+T` | 翻译/还原当前页面 | `chrome.commands` → SW `onCommand` → `sendMessage` |
| `Alt+Q` | 打开翻译面板 | **主**: content.js 直接 keydown 监听（`e.altKey && e.code === 'KeyQ'`，`e.preventDefault()`）**辅**: `chrome.commands` → SW `TOGGLE_PANEL` 消息（用于 `chrome://extensions/shortcuts` 自定义快捷键） |
| `Ctrl`（单击） | 智能解释气泡 | content.js keydown 监听 `Control`/`Meta`，250ms 防抖后检测光标位置/划词 → `handleExplainPoint()` |
| `Esc` | 取消翻译/关闭气泡/关闭面板 | content.js keydown 监听 |

`togglePanel()` 有 300ms debounce（`_lastToggle`）防止 keydown 和 SW 消息双重触发。

## Ctrl 解释 — 浮动气泡

**触发**: 鼠标指向词汇 + 单击 Ctrl（不用按住）；或划词选中 + 按 Ctrl

**流程**: 光标定位 → 提取光标处单词 + 周围 80 字符上下文 + 父元素 HTML → `chrome.runtime.sendMessage({type:'EXPLAIN_WORD'})` → SW 两层递进:
1. 自然语言 prompt（含 domain + 上下文）→ `max_tokens:1000, reasoning_effort:low`
2. AI 返回"不知道" → HTML 代码兜底猜测

气泡不修改 DOM 文本节点。✕ / Esc / 点击空白关闭。解释语言跟随 `targetLang`。`explainCache`（Map）缓存解释结果。

## 缓存系统

- **内存**: `translationCache`（Map，原文→译文），`translationMap`（Map，textNode→{original}），`explainCache`（原文→解释）
- **持久化**: `chrome.storage.local`，2000 条，1 小时 TTL，30 秒刷盘 + `beforeunload` 立即刷
- **语言切换**: 检测 `last_target_lang` 变化 → 自动清除缓存

## 多 API 管理

存储: `chrome.storage.sync.apis` 数组，每项 `{id, name, apiKey, apiUrl, model}`。`activeApiId` 标记当前。首次加载自动迁移旧版 `{apiKey, apiUrl, model}` 格式。

10 家内置提供商预设: DeepSeek、OpenAI、Groq、Together AI、OpenRouter、SiliconFlow、Moonshot、智谱、阿里百炼、自定义（任意 OpenAI 兼容端点）。

## API 参数

- 翻译: `temperature: 0.3, max_tokens: 3000, reasoning_effort: 'low'`
- 解释: `max_tokens: 1000, reasoning_effort: 'low'`（无 temperature）
- 面板翻译: `max_tokens` 动态计算 `min(chunk.length * 3 + 100, 800)`

## 提示词本地化

SW 中 `LANG_MAP` 和 `PROMPT` 两个全局对象覆盖 50 种语言。`PROMPT` 按目标语言提供本地化提示词模板（`main` + `html` 兜底）。`buildPrompt()` 根据 `targetLang` 选择模板，未适配语言用英文模板 + 追加 `Answer in <LANG>.`。

## 错误处理

- 翻译错误 → 悬浮球顶部红色错误条（`#lf-error-bar`），可手动关闭
- API 空响应 → 显示 `⚠️ 错误信息`，不静默
- Content script `chrome.runtime.sendMessage` → `chrome.runtime.lastError` 检查 `context invalidated`
- SW 快捷键处理 `catch` 输出 `console.error('[Faluber] ...')`

## 开发规范

- **每次修改代码后，更新 `manifest.json` 中的 `version` 版本号。** 格式: `X.Y.Z`，根据改动幅度递增
- **完成修改后提交到 git。** 提交信息格式: `v版本号: 简短描述`
- **不要使用 `git rebase -i`**（环境不支持交互式 rebase）

## 打包

用 Node.js 创建 zip（UTF-8 + forward slash 路径）:

```javascript
node -e "
const fs = require('fs');
function createZip(files, outputPath) {
  const chunks = [], centralDir = [];
  let offset = 0;
  function crc32(data) {
    let crc = 0xFFFFFFFF;
    for (let i = 0; i < data.length; i++) { crc ^= data[i]; for (let j = 0; j < 8; j++) crc = (crc >>> 1) ^ (crc & 1 ? 0xEDB88320 : 0); }
    return (crc ^ 0xFFFFFFFF) >>> 0;
  }
  function toDateBytes() {
    const d = new Date();
    return { time: (d.getSeconds() >> 1) | (d.getMinutes() << 5) | (d.getHours() << 11), date: d.getDate() | ((d.getMonth() + 1) << 5) | ((d.getFullYear() - 1980) << 9) };
  }
  for (const [localPath, zipPath] of files) {
    const content = fs.readFileSync(localPath);
    const { time, date } = toDateBytes(), crc = crc32(content);
    const nameBytes = Buffer.from(zipPath, 'utf-8');
    const lh = Buffer.alloc(30 + nameBytes.length);
    lh.writeUInt32LE(0x04034b50, 0); lh.writeUInt16LE(20, 4); lh.writeUInt16LE(0x0800, 6);
    lh.writeUInt16LE(0, 8); lh.writeUInt16LE(time, 10); lh.writeUInt16LE(date, 12);
    lh.writeUInt32LE(crc, 14); lh.writeUInt32LE(content.length, 18); lh.writeUInt32LE(content.length, 22);
    lh.writeUInt16LE(nameBytes.length, 26); lh.writeUInt16LE(0, 28);
    nameBytes.copy(lh, 30);
    chunks.push(lh, content);
    const cd = Buffer.alloc(46 + nameBytes.length);
    cd.writeUInt32LE(0x02014b50, 0); cd.writeUInt16LE(20, 4); cd.writeUInt16LE(20, 6); cd.writeUInt16LE(0x0800, 8);
    cd.writeUInt16LE(0, 10); cd.writeUInt16LE(time, 12); cd.writeUInt16LE(date, 14);
    cd.writeUInt32LE(crc, 16); cd.writeUInt32LE(content.length, 20); cd.writeUInt32LE(content.length, 24);
    cd.writeUInt16LE(nameBytes.length, 28); cd.writeUInt16LE(0, 30); cd.writeUInt16LE(0, 32);
    cd.writeUInt16LE(0, 34); cd.writeUInt16LE(0, 36); cd.writeUInt32LE(0, 38); cd.writeUInt32LE(offset, 42);
    nameBytes.copy(cd, 46);
    centralDir.push(cd);
    offset += lh.length + content.length;
  }
  const cdOff = offset;
  for (const e of centralDir) { chunks.push(e); offset += e.length; }
  const eocd = Buffer.alloc(22);
  eocd.writeUInt32LE(0x06054b50, 0); eocd.writeUInt16LE(0, 4); eocd.writeUInt16LE(0, 6);
  eocd.writeUInt16LE(files.length, 8); eocd.writeUInt16LE(files.length, 10);
  eocd.writeUInt32LE(offset - cdOff, 12); eocd.writeUInt32LE(cdOff, 16); eocd.writeUInt16LE(0, 20);
  chunks.push(eocd);
  fs.writeFileSync(outputPath, Buffer.concat(chunks));
}
const files = [
  ['manifest.json', 'manifest.json'],
  ['background/service-worker.js', 'background/service-worker.js'],
  ['content/content.js', 'content/content.js'],
  ['content/content.css', 'content/content.css'],
  ['popup/popup.html', 'popup/popup.html'],
  ['popup/popup.js', 'popup/popup.js'],
  ['popup/popup.css', 'popup/popup.css'],
  ['icons/icon16.png', 'icons/icon16.png'],
  ['icons/icon48.png', 'icons/icon48.png'],
  ['icons/icon128.png', 'icons/icon128.png'],
  ['icons/logo.png', 'icons/logo.png'],
];
createZip(files, 'faluber-Ai-Translate-vX.X.X.zip');
console.log('Done:', files.length, 'files');
"
```

输出 `faluber-Ai-Translate-vX.X.X.zip`，解压后 `chrome://extensions` → 加载已解压的扩展程序。**不要用 PowerShell Compress-Archive**（路径用反斜杠会导致加载失败）。

发布 Release：
```bash
gh release create vX.X.X faluber-Ai-Translate-vX.X.X.zip --title "vX.X.X — 简短描述" --notes '发布说明'
```

## 调试

- **查看 API 日志**（网页 F12 Console）:
  ```javascript
  chrome.storage.local.get('lf_api_log', d => console.table(d.lf_api_log || []))
  ```
- **查看内容脚本日志**（F12 → Console → 筛选 `[LF` 或 `Faluber`）
- **查看 Service Worker 日志**: `chrome://extensions` → Faluber AI翻译 → Service Worker 链接
- **查看快捷键注册状态**: `chrome://extensions/shortcuts`
