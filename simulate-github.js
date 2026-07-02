// 模拟 collectTextBlocks 提取 GitHub Trending 页面的文本节点
const fs = require('fs');
const html = fs.readFileSync('C:/Users/hywih/Downloads/Trending repositories on GitHub today.html', 'utf8');

// 移除 script 和 style 内容
const cleaned = html.replace(/<script[\s\S]*?<\/script>/gi, '').replace(/<style[\s\S]*?<\/style>/gi, '');

// 提取所有叶子标签中的文本（近似文本节点）
const skipTags = new Set(['script', 'style', 'noscript', 'code', 'pre', 'kbd', 'var', 'samp',
  'textarea', 'input', 'select', 'option', 'svg', 'math', 'canvas', 'iframe', 'object',
  'embed', 'audio', 'video', 'img', 'area', 'map', 'template', 'slot']);

// 匹配 <tag>text</tag> 模式（叶子元素）
const tagRegex = /<([a-zA-Z][a-zA-Z0-9]*)(\s[^>]*)?>([^<]{1,})<\/\1>/g;
let match;
const texts = [];

while ((match = tagRegex.exec(cleaned)) !== null) {
  const tag = match[1].toLowerCase();
  const text = match[3].trim();
  if (skipTags.has(tag)) continue;
  if (text.length < 5) continue;
  if (/^[\d\s.,;:!?()\[\]{}<>+\-*/=@#$%^&~`|\\/_"'«»„"''‹›·•… -⁯]+$/.test(text)) continue;
  if (/^https?:\/\/\S+$/.test(text)) continue;
  if (!/\p{L}/u.test(text)) continue;

  texts.push({ tag, text });
}

// 去重
const seen = new Set();
const unique = texts.filter(t => { const k = t.text; if (seen.has(k)) return false; seen.add(k); return true; });

console.log('=== 收集到 ' + unique.length + ' 个文本 ===\n');
unique.forEach((t, i) => {
  console.log(`[${i}] <${t.tag}> ${t.text.substring(0, 100)}`);
});
