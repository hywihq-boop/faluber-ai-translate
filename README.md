# 🌐 LinguaFlow — AI 智能翻译插件

基于 **DeepSeek AI** 的 Chrome 浏览器翻译插件，支持全球语言互译，一键翻译整页。

![version](https://img.shields.io/badge/version-1.0.0-7c5cfc)
![manifest](https://img.shields.io/badge/manifest-v3-blue)

## ✨ 功能

- 🚀 **一键翻译整页** — 点击图标或按 `Alt+T` 即可翻译
- 🌍 **任意语言互译** — AI 驱动，支持 20+ 语言及任意语言对
- 🔑 **自带 API Key** — 使用你自己的 DeepSeek（或其他 OpenAI 兼容 API）
- 👆 **悬停查看原文** — 鼠标悬停翻译后的文本即可看到原文
- ↩️ **一键还原** — 随时恢复原始页面
- 📊 **翻译进度** — 实时显示翻译进度条
- 🎨 **精美 UI** — 深色主题，渐变紫青配色
- ⚡ **并发翻译** — 4 路并发请求，翻译速度快

## 📦 安装

### 1. 加载插件

1. 打开 Chrome/Edge，地址栏输入 `chrome://extensions/`
2. 打开右上角 **开发者模式**
3. 点击 **加载已解压的扩展程序**
4. 选择 `translate` 文件夹
5. 完成！

### 2. 配置 API

1. 点击浏览器工具栏的 LinguaFlow 图标
2. 展开 **⚙️ API 设置**
3. 填写你的 **DeepSeek API Key**（在 [platform.deepseek.com](https://platform.deepseek.com) 获取）
4. 点击 **🔍 测试连接** 确认配置正确
5. 默认使用 DeepSeek，也支持其他 OpenAI 兼容 API

### 3. 开始翻译

- 打开任意网页，点击 LinguaFlow 图标 → **翻译当前页面**
- 或直接按快捷键 **`Alt+T`**

## 🎮 使用方式

| 操作 | 方式 |
|------|------|
| 翻译页面 | 点击图标 + "翻译当前页面" |
| 翻译页面 | 快捷键 `Alt+T` |
| 还原原文 | 点击图标 + "还原原文" |
| 取消翻译 | 按 `Esc` |
| 查看原文 | 鼠标悬停翻译后的文本 |
| 切换语言 | 点击 🔄 交换按钮 |

## 🔧 支持的 API

默认使用 **DeepSeek**，也兼容以下 API（OpenAI 兼容格式）：

| 服务 | API 地址 | 模型 |
|------|----------|------|
| DeepSeek | `https://api.deepseek.com/v1` | `deepseek-chat` |
| OpenAI | `https://api.openai.com/v1` | `gpt-4o-mini` |
| 通义千问 | `https://dashscope.aliyuncs.com/compatible-mode/v1` | `qwen-plus` |
| 自定义 Ollama | `http://localhost:11434/v1` | `qwen2.5` |

只要 API 支持 OpenAI Chat Completions 格式即可使用。

## 📂 项目结构

```
translate/
├── manifest.json              # 插件配置 (Manifest V3)
├── popup/
│   ├── popup.html             # 弹出设置面板
│   ├── popup.js               # 设置逻辑
│   └── popup.css              # UI 样式
├── content/
│   ├── content.js             # DOM 文本提取与替换
│   └── content.css            # 进度条/提示框样式
├── background/
│   └── service-worker.js      # API 调用与消息路由
├── icons/                     # 插件图标
├── generate-icons.js          # 图标生成脚本
└── README.md
```

## 🛠️ 技术细节

### 翻译流程

```
用户触发翻译
  → Content Script 遍历 DOM，收集可见文本块
  → 智能分段（合并短文本、拆分长文本）
  → 4 路并发发送到 Service Worker
  → Service Worker 调用 DeepSeek API
  → 结果返回 Content Script 替换文本
  → 实时进度条 + 翻译完成通知
```

### 智能文本处理

- 自动跳过 `<script>`、`<style>`、`<code>` 等非内容标签
- 跳过纯数字、URL、Emoji 等不可翻译内容
- 检测可见性（`display:none`、`visibility:hidden` 等）
- 保留 HTML 实体和特殊字符
- 翻译后悬停显示原文

### 性能优化

- 4 路并发请求，翻译速度快
- 请求失败自动重试（指数退避）
- 支持取消翻译（按 `Esc`）
- 进度实时反馈
