// 模拟 collectTextBlocks 提取页面文本，输出完整 API 请求
const fs = require('fs');
const html = fs.readFileSync('C:/Users/hywih/Downloads/Privacy & Terms – Google翻译前.html', 'utf8');

// 提取无子元素的叶子标签文本
const leafTexts = [];
const tagRegex = /<([a-zA-Z][a-zA-Z0-9]*)(\s[^>]*)?>([^<]{2,})<\/\1>/g;
let match;
while ((match = tagRegex.exec(html)) !== null) {
  const tag = match[1].toLowerCase();
  const text = match[3].trim();

  const skipTags = ['script', 'style', 'noscript', 'code', 'pre', 'kbd', 'var', 'samp',
    'textarea', 'input', 'select', 'option', 'svg', 'math', 'canvas', 'iframe', 'object',
    'embed', 'audio', 'video', 'img', 'area', 'map', 'template', 'slot'];
  if (skipTags.includes(tag)) continue;

  if (/^[\d\s.,;:!?()\[\]{}<>+\-*/=@#$%^&~`|\\/_"'«»„"''‹›·•…]+$/.test(text)) continue;
  if (/^https?:\/\/\S+$/.test(text)) continue;
  if (!/\p{L}/u.test(text)) continue;
  if (text.length < 5) continue;

  leafTexts.push({ tag, text });
}

// 去重
const seen = new Set();
const unique = leafTexts.filter(item => {
  const key = item.text;
  if (seen.has(key)) return false;
  seen.add(key);
  return true;
});

// 构建完整 prompt
const lines = unique.map((item, i) => `[${i}] ` + item.text).join('\n');

const systemPrompt = 'Translate each [ID] segment from auto-detect to zh-CN. Return ONLY a JSON object like {"0":"translated text 1","1":"translated text 2"}. Preserve [ID] numbering exactly.';

const output = `========== 页面提取的文本块：${unique.length} 条 ==========

${unique.map((item, i) => `[${i}] <${item.tag}> ${item.text}`).join('\n')}

========== SYSTEM PROMPT ==========
${systemPrompt}

========== USER MESSAGE ==========
${lines}

========== 完整 API 请求 JSON ==========
${JSON.stringify({
  model: 'deepseek-chat',
  messages: [
    { role: 'system', content: systemPrompt },
    { role: 'user', content: lines }
  ],
  temperature: 0.3,
  max_tokens: 16000,
  response_format: { type: 'json_object' }
}, null, 2)}
`;

fs.writeFileSync('C:/Users/hywih/Downloads/linguaflow-api-request.txt', output, 'utf8');
console.log('已写入: C:/Users/hywih/Downloads/linguaflow-api-request.txt');
console.log('文本块数量:', unique.length);
console.log('User message 字符数:', lines.length);
