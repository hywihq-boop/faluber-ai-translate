# 🌐 Faluber Translate — AI 智能网页翻译插件

一款基于 AI 的 Chrome 浏览器翻译插件（兼容 OpenAI 格式 API，如 DeepSeek、OpenAI、通义千问等）。基于 Manifest V3，通过文本节点级 DOM 操作实现页面翻译，支持 50 种目标语言和 20 种界面语言。

![version](https://img.shields.io/badge/version-2.0.10-7c5cfc)
![manifest](https://img.shields.io/badge/manifest-v3-blue)
![license](https://img.shields.io/badge/license-MIT-green)

## ✨ 功能

- 🚀 **一键翻译整页** — 点击图标或按 `Alt+T`
- 🌍 **50 种目标语言** — AI 驱动，支持任意语言对
- ⚡ **双档翻译模式** — 标准（均衡）和极速（最高速度）
- 🔑 **多 API 支持** — 内置 10 家提供商预设（DeepSeek、OpenAI、Groq、通义千问等）
- 💬 **Ctrl+解释气泡** — 鼠标悬停单词 + 按 Ctrl 获取 AI 解释
- 📋 **翻译面板** — 按 `Alt+Q` 打开左右布局的输入/输出翻译面板
- 👆 **悬停查看原文** — 鼠标悬停已翻译文本即可看到原文
- ↩️ **一键还原** — 随时恢复原始页面
- 📊 **实时进度** — 翻译过程中显示可视化进度条
- 💾 **智能缓存** — 内存缓存 + 持久化缓存，1 小时 TTL
- 🎨 **深色 UI** — 可折叠的悬浮球设计

## 📦 安装

### 1. 加载扩展

1. 打开 Chrome/Edge，进入 `chrome://extensions/`
2. 开启右上角**开发者模式**
3. 点击**加载已解压的扩展程序**
4. 选择 `faluber translate` 文件夹
5. 完成！

### 2. 配置 API

1. 点击工具栏中的 Faluber Translate 图标
2. 从下拉菜单选择提供商（DeepSeek、OpenAI 等）
3. 输入你的 **API Key**
4. 点击**测试连接**验证配置
5. 点击**保存**

### 3. 开始翻译

- 打开任意网页，点击图标 → **翻译当前页面**
- 或直接按 **`Alt+T`**

## 🎮 使用方式

| 操作 | 方式 |
|------|------|
| 翻译页面 | 点击图标 → "翻译" 或 `Alt+T` |
| 翻译选中文本 | 选中文字 → 按 `Ctrl` |
| 翻译面板 | `Alt+Q` |
| 解释单词 | 鼠标悬停单词 → 按 `Ctrl` |
| 还原原文 | 点击图标 → "还原" |
| 取消翻译 | 按 `Esc` |
| 查看原文 | 鼠标悬停翻译后的文本 |
| 切换语言 | 使用弹出面板的语言选择器 |

## 🔧 支持的 API

内置 10 家提供商预设，兼容任意 OpenAI 格式 API：

| 提供商 | API 地址 | 模型 |
|--------|----------|------|
| DeepSeek | `https://api.deepseek.com/v1` | `deepseek-chat` |
| OpenAI | `https://api.openai.com/v1` | `gpt-4o-mini` |
| Groq | `https://api.groq.com/openai/v1` | `llama-3.3-70b` |
| Together AI | `https://api.together.xyz/v1` | `meta-llama/...` |
| OpenRouter | `https://openrouter.ai/api/v1` | `openai/gpt-4o` |
| SiliconFlow | `https://api.siliconflow.cn/v1` | `deepseek-ai/...` |
| Moonshot | `https://api.moonshot.cn/v1` | `moonshot-v1-8k` |
| 智谱 | `https://open.bigmodel.cn/api/paas/v4` | `glm-4` |
| 阿里百炼 | `https://dashscope.aliyuncs.com/compatible-mode/v1` | `qwen-plus` |
| 自定义 | 任意 OpenAI 兼容端点 | 任意模型 |

## 📂 项目结构

```
faluber translate/
├── manifest.json                 # 扩展配置 (Manifest V3)
├── popup/
│   ├── popup.html                # 设置弹出面板
│   ├── popup.js                  # 多 API 管理逻辑
│   └── popup.css                 # 弹出面板样式
├── content/
│   ├── content.js                # DOM 文本提取与替换
│   └── content.css               # 悬浮球样式
├── background/
│   └── service-worker.js         # API 调用与消息路由
├── icons/                        # 扩展图标
├── generate-icons.js             # 图标生成脚本（开发工具）
├── LICENSE
└── README.md
```

## 🛠️ 工作原理

### 翻译流程

```
用户触发翻译
  → Content Script 遍历 DOM，收集可见文本节点
  → 过滤：可见性检测、CJK 去重、最小长度、缓存去重
  → 按 Y 坐标排序，相邻合并
  → 分包发送至 Service Worker（3–8 路并发）
  → Service Worker 调用 AI API（OpenAI 兼容格式）
  → 结果返回 Content Script 替换 DOM
  → 实时进度条 + 完成通知
```

### 智能文本处理

- 跳过 `<script>`、`<style>`、`<code>` 等非内容标签
- 过滤纯数字、URL、Emoji 等不可翻译内容
- 检测 `display:none`、`visibility:hidden` 等隐藏状态
- 保留 HTML 实体和特殊字符
- 相邻文本节点（同父元素或父元素为兄弟）合并后发送

### 翻译模式

| 参数 | 标准 | 极速 |
|------|------|------|
| 并发数 | 3 | 8 |
| 分批大小 | 400 字符 | 250 字符 |
| 全页翻译 | 否（仅可见区域） | 是 |
| 滚动检测 | 是 | 否 |
| 悬停检测 | 是 | 否 |
| DOM 变化监听 | 是 | 是 |

### 缓存系统

- **内存缓存**：`Map<原文, 译文>` 即时查询
- **持久化缓存**：`chrome.storage.local`，最多 2000 条，1 小时 TTL
- **自动刷盘**：每 30 秒 + `beforeunload` 时
- **自动清除**：目标语言切换时

### Ctrl+解释（浮动气泡）

- 鼠标悬停单词 + 点按 `Ctrl`（非长按）
- 或选中文本 + 按 `Ctrl`
- 两级回退：自然语言提示词 → HTML 代码检查
- 点击 ✕、`Esc` 或点击空白处关闭

## 🔒 隐私

- 你的 API Key 仅存储在 Chrome 本地同步存储中
- 所有翻译请求直接从你的浏览器发送到你配置的 API 提供商
- 不经过任何第三方服务器 — 你的数据只在你和 API 提供商之间传输

## 📝 许可证

MIT — 详见 [LICENSE](LICENSE)。
