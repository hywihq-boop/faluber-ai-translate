/**
 * LinguaFlow Popup — API 设置 + 界面语言（支持多语言）
 */
const $ = s => document.querySelector(s);

// ===== 多语言（popup 专用 key） =====
function T(z,t,e,j,k,f,d,s,p,r,a,h,T,v,i,n,l,u,b,c){return{'zh-CN':z,'zh-TW':t||z,en:e,ja:j,ko:k,fr:f||e,de:d||e,es:s||e,pt:p||e,ru:r||e,ar:a||e,hi:h||e,th:T||e,vi:v||e,it:i||e,nl:n||e,pl:l||e,tr:u||e,id:b||e,sv:c||e}}
const I18N = {
  apiSettings: T('API 设置','API 設定','API Settings','API設定','API 설정','Paramètres API','API-Einstellungen','Configuración API','Configurações API','Настройки API','إعدادات API','API सेटिंग्स','ตั้งค่า API','Cài đặt API','Impostazioni API','API-instellingen','Ustawienia API','API Ayarları','Pengaturan API','API-inställningar'),
  apiKey: T('API Key','API Key','API Key','APIキー','API 키','Clé API','API-Schlüssel','Clave API','Chave API','Ключ API','مفتاح API','API कुंजी','API Key','Khóa API','Chiave API','API-sleutel','Klucz API','API Anahtarı','Kunci API','API-nyckel'),
  apiUrl: T('API 地址','API 位址','API URL','APIアドレス','API 주소','URL API','API-URL','URL API','URL da API','URL API','رابط API','API URL','ที่อยู่ API','URL API','URL API','API-URL','URL API','API URL','URL API','API-URL'),
  model: T('模型','模型','Model','モデル','모델','Modèle','Modell','Modelo','Modelo','Модель','النموذج','मॉडल','โมเดล','Mô hình','Modello','Model','Model','Model','Model','Modell'),
  testConn: T('测试连接','測試連接','Test Connection','接続テスト','연결 테스트','Tester la connexion','Verbindung testen','Probar conexión','Testar conexão','Проверить связь','اختبار الاتصال','कनेक्शन परीक्षण','ทดสอบการเชื่อมต่อ','Kiểm tra kết nối','Testa connessione','Verbinding testen','Test połączenia','Bağlantıyı Test Et','Tes Koneksi','Testa anslutning'),
  shortcut: T('快捷键','快捷鍵','Shortcut','ショートカット','단축키','Raccourci','Tastenkürzel','Atajo','Atalho','Горячая клавиша','اختصار','शॉर्टकट','ทางลัด','Phím tắt','Scorciatoia','Sneltoets','Skrót','Kısayol','Pintasan','Genväg'),
  enterKey: T('请先填写 API Key','請先填寫 API Key','Enter API Key first','APIキーを入力してください','API 키를 먼저 입력하세요','Saisissez la clé API','API-Key eingeben','Ingrese la clave API','Insira a chave API','Введите ключ API','أدخل مفتاح API أولاً','पहले API कुंजी दर्ज करें','กรุณากรอก API Key ก่อน','Nhập API Key trước','Inserisci prima la chiave API','Voer eerst API-sleutel in','Najpierw wprowadź klucz API','Önce API Anahtarını girin','Masukkan API Key dulu','Ange API-nyckel först'),
  testing: T('测试中…','測試中…','Testing…','テスト中…','테스트 중…','Test…','Test…','Probando…','Testando…','Проверка…','جارٍ الاختبار…','परीक्षण हो रहा है…','กำลังทดสอบ…','Đang kiểm tra…','Test…','Testen…','Testowanie…','Test ediliyor…','Menguji…','Testar…'),
  success: T('✅ 连接成功','✅ 連接成功','✅ Connected','✅ 接続成功','✅ 연결 성공','✅ Connecté','✅ Verbunden','✅ Conectado','✅ Conectado','✅ Подключено','✅ تم الاتصال','✅ कनेक्टेड','✅ เชื่อมต่อสำเร็จ','✅ Kết nối thành công','✅ Connesso','✅ Verbonden','✅ Połączono','✅ Bağlandı','✅ Terhubung','✅ Ansluten'),
  failed: T('失败','失敗','Failed','失敗','실패','Échec','Fehlgeschlagen','Fallido','Falhou','Ошибка','فشل','विफल','ล้มเหลว','Thất bại','Fallito','Mislukt','Niepowodzenie','Başarısız','Gagal','Misslyckades'),
};

function t(key) {
  const entry = I18N[key];
  if (!entry) return key;
  return entry[uiLang] || entry['en'] || entry['zh-CN'] || key;
}

let uiLang = 'zh-CN';

function updateAllText() {
  const set = (sel, key) => { const el = typeof sel === 'string' ? document.querySelector(sel) : sel; if (el) el.textContent = t(key); };
  set('.section-title:first-of-type', 'apiSettings');
  set('#api-key ~ label', null); // label is before, skip
  set('.form-group:nth-child(2) label', 'apiUrl');
  set('.form-group:nth-child(3) label', 'model');
  set('#test-api', 'testConn');
  set('.footer span:first-child', null); // shortcut text needs special handling
}

// Actually use data attributes for simpler binding
function initI18n() {
  // Labels with data-i18n
  document.querySelectorAll('[data-i18n]').forEach(el => {
    el.textContent = t(el.dataset.i18n);
  });
}

// ===== Init =====
chrome.storage.sync.get({ apiKey:'', apiUrl:'https://api.deepseek.com/v1', model:'deepseek-chat', uiLang:'zh-CN' }, s => {
  uiLang = s.uiLang;
  $('#api-key').value = s.apiKey || '';
  $('#api-url').value = s.apiUrl;
  $('#model').value = s.model;
  $('#ui-lang').value = s.uiLang;
  initI18n();
  updateTokenDisplay();
});

// Auto-save
['#api-key','#api-url','#model'].forEach(sel => {
  $(sel).addEventListener('change', () => {
    chrome.storage.sync.set({
      apiKey: $('#api-key').value.trim(),
      apiUrl: $('#api-url').value.trim().replace(/\/$/,''),
      model: $('#model').value.trim(),
    });
  });
});

// UI Language sync
$('#ui-lang').addEventListener('change', () => {
  const lang = $('#ui-lang').value;
  uiLang = lang;
  chrome.storage.sync.set({ uiLang: lang });
  initI18n();
  chrome.tabs.query({}, tabs => {
    tabs.forEach(tab => {
      chrome.tabs.sendMessage(tab.id, { type: 'UI_LANG_CHANGED', uiLang: lang }).catch(()=>{});
    });
  });
});

// API Key visibility
$('#toggle-key').addEventListener('click', () => {
  const el = $('#api-key');
  el.type = el.type === 'password' ? 'text' : 'password';
});

// Test connection
$('#test-api').addEventListener('click', async () => {
  const key = $('#api-key').value.trim();
  const url = $('#api-url').value.trim().replace(/\/$/,'');
  const model = $('#model').value.trim();
  if (!key) { showResult(t('enterKey'), 'error'); return; }
  const btn = $('#test-api'); btn.textContent = t('testing'); btn.disabled = true;
  try {
    const resp = await chrome.runtime.sendMessage({ type: 'TEST_API', settings: { apiKey: key, apiUrl: url, model } });
    showResult(resp?.success ? t('success') : `❌ ${resp?.error || t('failed')}`, resp?.success ? 'success' : 'error');
  } catch(e) { showResult(`❌ ${e.message}`, 'error'); }
  btn.textContent = t('testConn'); btn.disabled = false;
});

function showResult(msg, type) {
  const el = $('#test-result'); el.textContent = msg; el.className = 'test-result ' + (type||'');
  setTimeout(() => { el.textContent = ''; }, 5000);
}

// Token
function updateTokenDisplay() {
  chrome.storage.local.get(null, data => {
    let total = 0, input = 0, output = 0;
    for (const k of Object.keys(data)) if (k.startsWith('tokens_')) { total += data[k].total||0; input += data[k].input||0; output += data[k].output||0; }
    const fmt = n => n>=1000?`${(n/1000).toFixed(1)}K`:String(n);
    const cost = estimateCost(input, output);
    $('#token-usage').innerHTML = `📊 ${fmt(total)} tokens${cost>0?` · ≈ ¥${cost.toFixed(4)}`:''}`;
  });
}

function estimateCost(input, output) {
  const model = $('#model').value.trim();
  const p = { 'deepseek-chat':[1,2], 'deepseek-reasoner':[4,16] }[model] || [1,2];
  return (input/1e6)*p[0] + (output/1e6)*p[1];
}

chrome.runtime.onMessage.addListener(msg => {
  if (msg.type === 'TOKEN_USAGE_UPDATED') updateTokenDisplay();
  if (msg.type === 'UI_LANG_CHANGED' && msg.uiLang) {
    uiLang = msg.uiLang;
    $('#ui-lang').value = uiLang;
    initI18n();
  }
});
$('#model').addEventListener('change', updateTokenDisplay);
