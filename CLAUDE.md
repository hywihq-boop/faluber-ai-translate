# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

Faluber Translate — Chrome 浏览器 AI 翻译插件（Manifest V3）。基于 OpenAI 兼容 API（DeepSeek 等），用文本节点级别的 DOM 操作实现页面翻译，支持 50 种目标语言和 20 种 UI 语言。

## 架构

```
用户点击翻译 → Content Script 遍历 body 文本节点 → 按视野过滤 + CJK 去重 + 缓存去重
→ 分批发 Service Worker → SW 调 API ([N] 格式输出) → 返回翻译 → Content Script 替换 textNode.textContent
```

### 三个运行时

| 文件 | 运行时 | 职责 |
|------|------|------|
| `content/content.js` | 网页注入（`document_end`） | DOM 文本收集、翻译调度、右下角悬浮球 UI（CSS 以 JS 注入 `<style id="lf-styles">`）、缓存、hover 检测、滚动观察、Ctrl+解释气泡 |
| `background/service-worker.js` | Service Worker | API 调用（批量翻译 `[N]` 格式、单词解释、连接测试、模型拉取）、Token 统计（按 key 前缀分桶 `tokens_<prefix>`）、50 种语言提示词模板 |
| `popup/popup.html` + `popup.js` + `popup.css` | Popup | 多 API 管理（添加/切换/删除）+ 10 家提供商预设 + 模型拉取 + UI 语言同步 + Token 显示 |

### 文本收集核心

`collectTextNodes(root, opts)`：`TreeWalker` 遍历文本节点 → `isVisible` → `isTranslatable`（CJK 去重/符号过滤/最小 3 字符）→ `translationMap` 去重 → 按 Y 坐标排序 → 同父/兄弟元素空格合并 → 返回 `[{node, text, y, subNodes}]`

### 翻译调度

`translateAndApply(textNodes)`：先查 `translationCache` → 未命中按 `MODES[mode].batchLimit` 分包 → N 路并发 worker → `translateBatch` 发 SW → `applyTranslation` 写入 DOM → 写入 cache。

合并逻辑：相邻 text node（同父元素或父元素是相邻兄弟）用空格拼接为一个整体发给 AI。`applyTranslation` 将译文写入第一个节点，其余清空（`translationMap` 保留原始值用于还原）。

### 两档翻译模式

通过详情面板自定义下拉菜单切换，存入 `chrome.storage.sync.mode`。配置位于 `MODES` 常量：

| 参数 | medium（标准） | high（极速） |
|---|---|---|
| concurrency | 3 | 8 |
| batchLimit | 400 | 250 |
| fullPage | false | true |
| scroll | true | false |
| hover | true | false |
| mutation | true | true |

低档模式已移除。不支持并发的 API 直接报错阻止翻译。

### 模式选择器 UI

自定义下拉菜单（`.lf-custom-select`），两个 `<div data-value>` 选项，每个带 `title` 属性承载多语言详解。点击外部自动关闭。`updateModeUI()` 统一刷新。

### 缓存系统

- **内存**：`translationCache`（Map，原文→译文），`translationMap`（Map，textNode→{original}），`explainCache`（原文→解释）
- **持久化**：`chrome.storage.local`，2000 条，1 小时 TTL，30 秒刷盘 + `beforeunload` 立即刷
- **语言切换**：检测 `last_target_lang` 变化 → 自动清除缓存

### Ctrl+解释（浮动气泡）

**触发方式**：鼠标指向词汇 + 单击 Ctrl（不是按住）；划词选中 + 按 Ctrl

**流程**：光标定位 → 提取光标处单词 + 收集周围 80 字符上下文 + 父元素 HTML → 发 SW → 两层层递进：
1. 自然语言 prompt（含 domain + 上下文）→ `max_tokens:1000, reasoning_effort:low`
2. AI 说"不知道" → HTML 代码兜底猜测

气泡弹窗不修改 DOM 文本节点，✕/Esc/点击空白关闭。解释语言跟随 `targetLang`。

### 多 API 管理

存储格式：`chrome.storage.sync.apis` 数组，每项 `{id, name, apiKey, apiUrl, model}`。`activeApiId` 标记当前。首次加载自动迁移旧版 `{apiKey, apiUrl, model}` 格式。

### API 参数

- 翻译：`temperature: 0.3, max_tokens: 3000, reasoning_effort: 'low'`
- 解释：`max_tokens: 1000, reasoning_effort: 'low'`（无 temperature）

### 提示词本地化

SW 中 `LANG_MAP` 和 `PROMPT` 两个全局对象覆盖 50 种语言。`PROMPT` 按目标语言提供完整的本地化提示词模板（`main` + `html` 兜底）。`buildPrompt()` 根据 `targetLang` 选择模板，未适配语言用英文模板 + 追加 `Answer in <LANG>.`。

### 错误处理

翻译错误 → widget 顶部内联红色错误条（`#lf-error-bar`），可手动关闭。
API 空响应 → 显示 `⚠️ 错误信息`，不静默。

## 打包

```bash
python -c "
import zipfile, os
os.chdir('D:/cursor/translate')
with zipfile.ZipFile('faluber-translate.zip','w', zipfile.ZIP_DEFLATED) as z:
    for f in ['manifest.json']: z.write(f)
    for f in ['service-worker.js']: z.write('background/'+f, 'background/'+f)
    for f in ['content.js','content.css']: z.write('content/'+f, 'content/'+f)
    for f in ['popup.html','popup.js','popup.css']: z.write('popup/'+f, 'popup/'+f)
    for f in ['icon16.png','icon48.png','icon128.png','logo.png']: z.write('icons/'+f, 'icons/'+f)
print('Done:', len(z.namelist()), 'files')
"
```

输出 `faluber-translate.zip`，解压后 `chrome://extensions` → 加载已解压的扩展程序。

## 调试

- **查看 API 日志**（网页 F12 Console）：
  ```javascript
  chrome.storage.local.get('lf_api_log', d => console.table(d.lf_api_log || []))
  ```
- **查看内容脚本日志**（F12 → Console → 筛选 `[LF`）
- **查看 Service Worker 日志**：`chrome://extensions` → Faluber Translate → Service Worker 链接

## 网站

`website/index.html` — 单页滚动式产品官网，吸顶导航 + 锚点跳转。四个章节：首页/功能介绍/效果演示/安装配置/语言支持。
