/**
 * LinguaFlow Service Worker — API 调用 + 完整日志
 */
// ===== 日志 =====
let apiLog = [];
const MAX_LOG = 100;
function saveApiLog(entry) {
  apiLog.push({ ...entry, t: Date.now() });
  if (apiLog.length > MAX_LOG) apiLog = apiLog.slice(-MAX_LOG);
  chrome.storage.local.set({ lf_api_log: apiLog.slice(-50) }).catch(()=>{});
}

// ===== 消息处理 =====
chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === 'GET_TAB_ID') { sendResponse({ tabId: sender.tab?.id }); return; }
  if (msg.type === 'BATCH_TRANSLATE') { handleBatchTranslate(msg, sendResponse); return true; }
  if (msg.type === 'EXPLAIN_WORD') { handleExplain(msg, sendResponse); return true; }
  if (msg.type === 'TEST_API') { handleTestApi(msg, sendResponse); return true; }
  return false;
});

// ===== 批量翻译 =====
async function handleBatchTranslate(msg, sendResponse) {
  const startTime = Date.now();
  const { items, settings } = msg;
  const { apiKey, apiUrl, model, targetLang } = settings;
  const totalChars = items.reduce((s, it) => s + it.text.length, 0);

  const lines = items.map(it => `[${it.id}] ${it.text}`).join('\n');
  const targetName = { 'zh-CN':'Simplified Chinese','zh-TW':'Traditional Chinese',en:'English',ja:'Japanese',ko:'Korean',fr:'French',de:'German',es:'Spanish' }[targetLang] || targetLang;
  const systemPrompt = `Translate to ${targetName}. Output each [ID] translation on a new line in same order. Keep [ID] markers. No extra text.`;

  console.log(`[SW] 批量翻译: ${items.length} 项, ${totalChars} 字符`);

  try {
    const body = JSON.stringify({
      model, messages: [{ role: 'system', content: systemPrompt }, { role: 'user', content: lines }],
      temperature: 0.3, max_tokens: 3000,
    });

    const logEntry = {
      items: items.length, chars: totalChars, model,
      prompt: lines.substring(0, 500),
      systemPrompt,
    };

    const response = await fetch(`${apiUrl}/chat/completions`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${apiKey}` },
      body,
    });

    if (!response.ok) {
      let errMsg = `HTTP ${response.status}`;
      try { const e = await response.json(); errMsg = e.error?.message || errMsg; } catch {}
      throw new Error(errMsg);
    }

    const data = await response.json();
    const raw = data.choices?.[0]?.message?.content?.trim() || '';
    const translations = parseResponse(raw, items);
    const elapsed = Date.now() - startTime;
    const usage = data.usage;

    // 保存完整日志
    logEntry.response = raw.substring(0, 500);
    logEntry.elapsed = elapsed;
    logEntry.tokens = usage ? { in: usage.prompt_tokens, out: usage.completion_tokens, total: usage.total_tokens, cacheHit: usage.prompt_cache_hit_tokens || 0 } : null;
    logEntry.resultCount = Object.keys(translations).length;
    saveApiLog(logEntry);

    console.log(`[SW] 完成: ${elapsed}ms, tokens:${usage?.total_tokens || '?'}`);

    if (usage) {
      const key = `tokens_${apiKey.substring(0, 8)}`;
      const stored = await chrome.storage.local.get(key);
      const prev = stored[key] || { input:0, output:0, total:0 };
      await chrome.storage.local.set({ [key]: {
        input: prev.input + (usage.prompt_tokens||0),
        output: prev.output + (usage.completion_tokens||0),
        total: prev.total + (usage.total_tokens||0),
        cacheHit: (prev.cacheHit||0) + (usage.prompt_cache_hit_tokens||0),
        cacheMiss: (prev.cacheMiss||0) + ((usage.prompt_tokens||0) - (usage.prompt_cache_hit_tokens||0)),
        lastModel: model,
      }});
      chrome.runtime.sendMessage({ type:'TOKEN_USAGE_UPDATED' }).catch(()=>{});
    }

    sendResponse({ success: true, translations, usage: data.usage });
  } catch (err) {
    saveApiLog({ ...logEntry, error: err.message, elapsed: Date.now() - startTime });
    sendResponse({ success: false, error: err.message });
  }
}

function parseResponse(raw, items) {
  const translations = {};
  const markerRegex = /^\[(\d+)\]\s*/;
  const lines = raw.split('\n');
  let currentId = null, currentText = '';
  for (const line of lines) {
    const m = line.match(markerRegex);
    if (m) {
      if (currentId !== null) translations[currentId] = currentText.trim();
      currentId = m[1]; currentText = line.substring(m[0].length);
    } else if (currentId !== null) { currentText += '\n' + line; }
  }
  if (currentId !== null) translations[currentId] = currentText.trim();
  if (Object.keys(translations).length > 0) {
    for (const item of items) { if (!translations[item.id]) translations[item.id] = item.text; }
    return translations;
  }
  try { const json = JSON.parse(raw); for (const item of items) translations[item.id] = json[item.id] || item.text; return translations; } catch {}
  for (const item of items) translations[item.id] = item.text;
  return translations;
}

// ===== 解释 =====
async function handleExplain(msg, sendResponse) {
  const { word, nearbyText, settings } = msg;
  const { apiKey, apiUrl, model, targetLang } = settings;
  const langName = { 'zh-CN':'Simplified Chinese','zh-TW':'Traditional Chinese','ja':'Japanese','ko':'Korean','fr':'French','de':'German','es':'Spanish' }[targetLang] || targetLang || 'English';
  try {
    // 把整个上下文 + 目标词一起发给 AI，让它结合上下文解释
    const fullText = nearbyText || word;
    const prompt = `解释"${fullText}"中的"${word}"是什么含义`;
    const system = `用${langName}返回1-2句解释。只返回解释，不含任何其他字符。`;
    const response = await fetch(`${apiUrl}/chat/completions`, {
      method: 'POST',
      headers: { 'Content-Type':'application/json', 'Authorization':`Bearer ${apiKey}` },
      body: JSON.stringify({
        model,
        messages: [{ role:'system', content: system }, { role:'user', content: prompt }],
        temperature:0.3, max_tokens:150,
      }),
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    const explanation = data.choices?.[0]?.message?.content?.trim() || word;
    // 记录 token 用量
    if (data.usage) {
      const key = `tokens_${apiKey.substring(0, 8)}`;
      const stored = await chrome.storage.local.get(key);
      const prev = stored[key] || { input:0, output:0, total:0 };
      await chrome.storage.local.set({ [key]: {
        input: prev.input + (data.usage.prompt_tokens||0),
        output: prev.output + (data.usage.completion_tokens||0),
        total: prev.total + (data.usage.total_tokens||0),
        cacheHit: prev.cacheHit||0, cacheMiss: prev.cacheMiss||0,
        lastModel: model,
      }});
      chrome.runtime.sendMessage({ type:'TOKEN_USAGE_UPDATED' }).catch(()=>{});
      sendResponse({ success:true, explanation, usage: data.usage });
    } else {
      sendResponse({ success:true, explanation });
    }
  } catch (err) { sendResponse({ success:false, error:err.message }); }
}

// ===== 快捷键 =====
chrome.commands.onCommand.addListener(async (command) => {
  if (command === 'translate-page') {
    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      if (!tab?.id) return;
      const settings = await chrome.storage.sync.get({ apiKey:'', apiUrl:'https://api.deepseek.com/v1', model:'deepseek-chat', sourceLang:'auto', targetLang:'zh-CN', hoverOriginal:true, showProgress:true });
      if (!settings.apiKey) { chrome.action.openPopup(); return; }
      await chrome.tabs.sendMessage(tab.id, { type:'START_TRANSLATION', settings });
    } catch {}
  }
});

// ===== 测试连接 =====
async function handleTestApi(msg, sendResponse) {
  try {
    const { apiKey, apiUrl, model } = msg.settings;
    const response = await fetch(`${apiUrl}/chat/completions`, {
      method:'POST',
      headers: { 'Content-Type':'application/json', 'Authorization':`Bearer ${apiKey}` },
      body: JSON.stringify({ model, messages:[{ role:'system', content:'Reply with only "OK".' },{ role:'user', content:'Hi' }], max_tokens:5, temperature:0 }),
    });
    if (response.ok) sendResponse({ success:true });
    else {
      let errMsg = `HTTP ${response.status}`;
      try { const e = await response.json(); errMsg = e.error?.message || errMsg; } catch {}
      sendResponse({ success:false, error:errMsg });
    }
  } catch (err) { sendResponse({ success:false, error:err.message }); }
}
