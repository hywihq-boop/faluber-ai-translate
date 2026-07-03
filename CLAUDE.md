# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

LinguaFlow — Chrome 浏览器 AI 翻译插件（Manifest V3）。基于 DeepSeek API（OpenAI 兼容格式），用文本节点级别的 DOM 操作实现页面翻译，支持 50 种目标语言和 20 种 UI 语言。

## 架构

```
用户点击翻译 → Content Script 遍历 body 文本节点 → 按视野过滤 + CJK 去重 + 缓存去重
→ 分批发 Service Worker → SW 调 DeepSeek API ([N] 格式输出) → 返回翻译 → Content Script 替换 textNode.textContent
```

### 三个运行时

| 文件 | 运行时 | 职责 |
|------|------|------|
| `content/content.js` + `content.css` | 网页注入（`document_end`） | DOM 文本收集、翻译调度、右下角悬浮球 UI（全部 CSS 以 JS 注入 `<style id="lf-styles">`）、缓存、hover 检测、滚动观察 |
| `background/service-worker.js` | Service Worker | API 调用（批量翻译 `[N]` 格式、单词解释、连接测试）、Token 统计（按 API key 前缀分桶 `tokens_<prefix>`）、API 请求/响应日志 |
| `popup/popup.html` + `popup.js` + `popup.css` | Popup | 多 API 管理（添加/切换/删除）+ 提供商预设（10 家，自动填 URL）+ 模型拉取 + 并发支持开关 + UI 语言同步 + Token 显示 |

### 文本收集核心

`collectTextNodes(root, opts)`：`TreeWalker` 遍历文本节点 → `isVisible`（display/visibility/零尺寸）→ `isTranslatable`（CJK 去重/符号过滤/最小 3 字符）→ `translationMap` 去重 → 按 Y 坐标排序 → 同父元素合并（`|` 分隔）

### 翻译调度

`translateAndApply(textNodes)`：先查 `translationCache`（命中直接 apply）→ 未命中按 `MODES[mode].batchLimit` 分包（low=800, medium=400, high=250）→ N 路并发 worker 池（由 mode 决定）→ 批量发 SW → apply 结果（`textNode.textContent = translated`）→ 写入 cache

### 三档翻译模式

通过详情面板自定义下拉菜单切换，存入 `chrome.storage.sync.mode`。配置位于 `MODES` 常量（content.js 第 20 行）：

| 参数 | low（省着用） | medium（标准） | high（拉满） |
|---|---|---|---|
| concurrency | 1 | 3 | 8 |
| batchLimit | 800 | 400 | 250 |
| fullPage | true | false | true |
| scroll | false | true | false |
| hover | false | true | false |
| mutation | false | true | true |

各观察器在 `startScrollObserver()` / `startMutationObserver()` 内部读取 `MODES[mode]` 自行判断是否注册监听器。`startTranslation()` 也会根据 `cfg.scroll` / `cfg.mutation` 决定是否调用这些函数。

### 模式选择器 UI

自定义下拉菜单（`.lf-custom-select`），三个 `<div data-value>` 选项，每个带 `title` 属性承载多语言详解（`modeLowDesc` / `modeMediumDesc` / `modeHighDesc`）。点击外部自动关闭。`updateModeUI()` 统一刷新标签、当前选中文字、所有选项的 textContent 和 title。

### 缓存系统

- **内存**：`translationCache`（Map，原文→译文），`translationMap`（Map，textNode→{original}），`explainCache`（原文→解释）
- **持久化**：`chrome.storage.local`，2000 条，1 小时 TTL，30 秒刷盘 + `beforeunload` 立即刷
- **语言切换**：检测 `last_target_lang` 变化 → 自动清除缓存

### 右下角 UI（Open Design v2）

`#lf-wrapper` 固定容器（260px↔56px 宽度过渡）包含：收折按钮 + widget + 迷你球
- **收折按钮**：玻璃态渐变圆钮（28px），紫色边框+光晕，左右弹跳动画，位于卡片左侧外
- **悬浮球**：flexbox 布局（`justify-content:space-between`），iOS 开关 + pill 按钮 + chevron + token 尾栏
- **迷你球**：56px 圆形，译/T 文字，翻译中绿色旋转光效。收折时 wrapper 缩至 56px，widget 缩小消失
- **详情面板**：`max-height` 动画向上展开，进度条绝对定位不占布局流
- **拖拽**：wrapper 级别拖拽，始终 `right/bottom` 定位
- **折叠持久化**：`chrome.storage.local.lf_collapsed`，刷新不闪（先 await 读再 buildUI）

### 三种语言逻辑

| 变量 | 存储 | 用途 |
|------|------|------|
| `uiLang` | `chrome.storage.sync` | 插件界面文字 + 迷你球文字（中文=译，其他=T） |
| `targetLang` | `chrome.storage.sync` | 翻译输出语言 + 解释输出语言 |
| `sourceLang` | `chrome.storage.sync` | 翻译源语言（默认 auto） |

### 存储约定

| 存储 | 用途 | 示例 key |
|------|------|------|
| `chrome.storage.sync` | 跨设备配置（少量） | `apis`（API 配置数组，每项含 id/name/apiKey/apiUrl/model/supportsConcurrency）, `activeApiId`, `sourceLang`, `targetLang`, `uiLang`, `mode` |
| `chrome.storage.local` | 本地大数据/临时状态 | `translation_cache`（2000条，1h TTL）, `tokens_<key_prefix>`（按 API key 分桶统计）, `lf_api_log`, `lf_collapsed`, `last_target_lang`, `tmode_<tabId>` |

### UI 语言同步

- Popup 中切换 UI 语言 → `chrome.tabs.sendMessage(tab, {type:'UI_LANG_CHANGED', uiLang})` → Content Script `updateAllUIText()` 刷新全部界面文字（含模式选择器选项和 tooltip）
- Popup 的 i18n 使用 `data-i18n` 属性 + `initI18n()` 扫描刷新；Content Script 使用 `T()` 函数 + `t(key)` 查找 + 手动更新 DOM

### 关键设计决策

- **文本节点级替换**：`textNode.textContent = translated`，绝不触碰 DOM 元素结构
- **[N] 格式输出**：AI 返回 `[0] 译文\n[1] 译文`，自然换行分隔，零额外 token 开销
- **视野优先**：初始只翻译 `viewport + 200px`，滚动时扩展至 `1.5x viewport`
- **本地去重**：CJK 字符占比 > 30% 或 CJK > 0 且无英文词 → 跳过（已是目标语言）
- **Ctrl+解释（浮动气泡）**：不依赖翻译状态，任何页面可用。检测光标下词组→浮动气泡弹窗（不修改 DOM 文本节点）→自然语言发给 AI（含 domain + 上下文）→显示解释。推理模型（deepseek-v4-flash）空响应时用 `max_tokens:2000` 重试。✕/Esc/点击空白关闭。解释语言跟随 `targetLang`
- **多 API 管理**：popup 中可添加多个 API 配置，保存到 `chrome.storage.sync.apis` 数组。`activeApiId` 标记当前使用的 API。首次加载自动迁移旧版 `{apiKey, apiUrl, model}` 格式
- **API 日志**：Service Worker 每次调用记录 `lf_api_log`（prompt/response/tokens），悬浮球双击导出到 Console

## 调试

- **查看 API 日志**（网页 F12 Console）：
  ```javascript
  chrome.storage.local.get('lf_api_log', d => console.table(d.lf_api_log || []))
  ```
- **查看内容脚本日志**（网页 F12 → Console → 筛选 `[LF`）
- **查看 Service Worker 日志**：`chrome://extensions` → LinguaFlow → Service Worker 链接
- **API 日志存储**：`chrome.storage.local` key `lf_api_log`，每 10 秒自动刷新

## 性能约束

- Token 消耗是第一优先级，翻译速度是第二优先级
- **低档模式**：彻底关闭 scroll/mutation/hover 监听，单线程全页翻译，适配严格 API 限流
- **中档模式**：CJK 检测 + 缓存查重 + 视野优先避免无效 API 调用；hover 检测至少攒 3 条才发
- **高档模式**：8 路并发 + 250 字符微型分包，牺牲 token 用量换取首批翻译秒出
- `isVisible` 过滤 `display:none` / `visibility:hidden` / 零尺寸，防止隐藏 tooltip/popover 被翻译
