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
| `content/content.js` | 网页注入（`document_end`） | DOM 文本收集、翻译调度、右下角悬浮球 UI、缓存、hover 检测、滚动观察 |
| `background/service-worker.js` | Service Worker | API 调用（批量翻译 `[N]` 格式、单词解释、连接测试）、Token 统计、API 请求/响应日志 |
| `popup/` | Popup (popup.html/js/css) | API 配置（Key/URL/Model）+ 界面语言选择（与悬浮球双向同步） |

### 文本收集核心

`collectTextNodes(root, opts)`：`TreeWalker` 遍历文本节点 → `isVisible`（display/visibility/零尺寸）→ `isTranslatable`（CJK 去重/符号过滤/最小 3 字符）→ `translationMap` 去重 → 按 Y 坐标排序 → 同父元素合并（`|` 分隔）

### 翻译调度

`translateAndApply(textNodes)`：先查 `translationCache`（命中直接 apply）→ 未命中分包（首批 400 字符、后续 800）→ 3 路并发 worker 池 → 批量发 SW → apply 结果（`textNode.textContent = translated`）→ 写入 cache

### 缓存系统

- **内存**：`translationCache`（Map，原文→译文），`translationMap`（Map，textNode→{original}），`explainCache`（原文→解释）
- **持久化**：`chrome.storage.local`，2000 条，1 小时 TTL，30 秒刷盘 + `beforeunload` 立即刷
- **语言切换**：检测 `last_target_lang` 变化 → 自动清除缓存

### 右下角 UI（Open Design v9）

三层结构：Toast 栈 → 进度条 → 连续卡片（`.lf-card` 包裹详情面板 + 悬浮球）
- 悬浮球：iOS 开关 + pill 按钮 + SVG chevron + token 尾栏
- 拖拽：始终 `right/bottom` 定位
- 详情面板：`max-height` 动画向上展开

### 关键设计决策

- **文本节点级替换**：`textNode.textContent = translated`，绝不触碰 DOM 元素结构
- **[N] 格式输出**：AI 返回 `[0] 译文\n[1] 译文`，自然换行分隔，零额外 token 开销
- **视野优先**：初始只翻译 `viewport + 200px`，滚动时扩展至 `1.5x viewport`
- **本地去重**：CJK 字符占比 > 30% 或 CJK > 0 且无英文词 → 跳过（已是目标语言）
- **词汇解释**：Ctrl+悬停未翻译词汇 → 发 `EXPLAIN_WORD` → AI 返回目标语言解释

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
- 新增文本节点收集时**必须在本地判断是否需要翻译**（CJK 检测 + 缓存查重），确认真有新内容才发 API
- 避免单条翻译请求（system prompt 开销 ~100 token/次），hover 检测至少攒 3 条才发
- `isVisible` 过滤 `display:none` / `visibility:hidden` / 零尺寸，防止隐藏 tooltip/popover 被翻译
