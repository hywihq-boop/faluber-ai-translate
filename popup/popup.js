/**
 * Faluber Translate Popup — Multi-API management + provider presets + model fetching + concurrency options
 */
const $ = s => document.querySelector(s);

// ===== 提供商预设 =====
const PROVIDERS = {
  deepseek:    { name: 'DeepSeek', url: 'https://api.deepseek.com/v1', models: ['deepseek-chat', 'deepseek-reasoner'] },
  openai:      { name: 'OpenAI', url: 'https://api.openai.com/v1', models: ['gpt-4o', 'gpt-4o-mini', 'gpt-4-turbo', 'gpt-3.5-turbo'] },
  groq:        { name: 'Groq', url: 'https://api.groq.com/openai/v1', models: ['llama-3.3-70b-versatile', 'llama-3.1-8b-instant', 'mixtral-8x7b-32768'] },
  together:    { name: 'Together AI', url: 'https://api.together.xyz/v1', models: ['meta-llama/Llama-3.3-70B-Instruct', 'mistralai/Mixtral-8x7B-Instruct'] },
  openrouter:  { name: 'OpenRouter', url: 'https://openrouter.ai/api/v1', models: ['openai/gpt-4o', 'anthropic/claude-3.5-sonnet', 'google/gemini-2.0-flash'] },
  siliconflow: { name: 'SiliconFlow', url: 'https://api.siliconflow.cn/v1', models: ['deepseek-ai/DeepSeek-V3', 'Qwen/Qwen2.5-7B-Instruct'] },
  moonshot:    { name: 'Moonshot', url: 'https://api.moonshot.cn/v1', models: ['moonshot-v1-8k', 'moonshot-v1-32k', 'moonshot-v1-128k'] },
  zhipu:       { name: 'Zhipu', url: 'https://open.bigmodel.cn/api/paas/v4', models: ['glm-4', 'glm-4-flash', 'glm-4-plus'] },
  dashscope:   { name: 'DashScope', url: 'https://dashscope.aliyuncs.com/compatible-mode/v1', models: ['qwen-turbo', 'qwen-plus', 'qwen-max'] },
  custom:      { name: 'Custom', url: '', models: [] },
};

// ===== 多语言 =====
function T(z,t,e,j,k,f,d,s,p,r,a,h,T,v,i,n,l,u,b,c){return{'zh-CN':z,'zh-TW':t||z,en:e,ja:j,ko:k,fr:f||e,de:d||e,es:s||e,pt:p||e,ru:r||e,ar:a||e,hi:h||e,th:T||e,vi:v||e,it:i||e,nl:n||e,pl:l||e,tr:u||e,id:b||e,sv:c||e}}
const I18N = {
  apiSettings: T('API 设置','API 設定','API Settings','API設定','API 설정','Paramètres API','API-Einstellungen','Configuración API','Configurações API','Настройки API','إعدادات API','API सेटिंग्स','ตั้งค่า API','Cài đặt API','Impostazioni API','API-instellingen','Ustawienia API','API Ayarları','Pengaturan API','API-inställningar'),
  apiKey: T('API Key','API Key','API Key','APIキー','API 키','Clé API','API-Schlüssel','Clave API','Chave API','Ключ API','مفتاح API','API कुंजी','API Key','Khóa API','Chiave API','API-sleutel','Klucz API','API Anahtarı','Kunci API','API-nyckel'),
  apiUrl: T('API 地址','API 位址','API URL','APIアドレス','API 주소','URL API','API-URL','URL API','URL da API','URL API','رابط API','API URL','ที่อยู่ API','URL API','URL API','API-URL','URL API','API URL','URL API','API-URL'),
  model: T('模型','模型','Model','モデル','모델','Modèle','Modell','Modelo','Modelo','Модель','النموذج','मॉडल','โมเดล','Mô hình','Modello','Model','Model','Model','Modell'),
  testConn: T('测试连接','測試連接','Test Connection','接続テスト','연결 테스트','Tester la connexion','Verbindung testen','Probar conexión','Testar conexão','Проверить связь','اختبار الاتصال','कनेक्शन परीक्षण','ทดสอบการเชื่อมต่อ','Kiểm tra kết nối','Testa connessione','Verbinding testen','Test połączenia','Bağlantıyı Test Et','Tes Koneksi','Testa anslutning'),
  shortcut: T('快捷键','快捷鍵','Shortcut','ショートカット','단축키','Raccourci','Tastenkürzel','Atajo','Atalho','Горячая клавиша','اختصار','शॉर्टकट','ทางลัด','Phím tắt','Scorciatoia','Sneltoets','Skrót','Kısayol','Pintasan','Genväg'),
  enterKey: T('请先填写 API Key','請先填寫 API Key','Enter API Key first','APIキーを入力してください','API 키를 먼저 입력하세요','Saisissez la clé API','API-Key eingeben','Ingrese la clave API','Insira a chave API','Введите ключ API','أدخل مفتاح API أولاً','पहले API कुंजी दर्ज करें','กรุณากรอก API Key ก่อน','Nhập API Key trước','Inserisci prima la chiave API','Voer eerst API-sleutel in','Najpierw wprowadź klucz API','Önce API Anahtarını girin','Masukkan API Key dulu','Ange API-nyckel först'),
  testing: T('测试中…','測試中…','Testing…','テスト中…','테스트 중…','Test…','Test…','Probando…','Testando…','Проверка…','جارٍ الاختبار…','परीक्षण हो रहा है…','กำลังทดสอบ…','Đang kiểm tra…','Test…','Testen…','Testowanie…','Test ediliyor…','Menguji…','Testar…'),
  success: T('✅ 连接成功','✅ 連接成功','✅ Connected','✅ 接続成功','✅ 연결 성공','✅ Connecté','✅ Verbunden','✅ Conectado','✅ Conectado','✅ Подключено','✅ تم الاتصال','✅ कनेक्टेड','✅ เชื่อมต่อสำเร็จ','✅ Kết nối thành công','✅ Connesso','✅ Verbonden','✅ Połączono','✅ Bağlandı','✅ Terhubung','✅ Ansluten'),
  failed: T('失败','失敗','Failed','失敗','실패','Échec','Fehlgeschlagen','Fallido','Falhou','Ошибка','فشل','विफल','ล้มเหลว','Thất bại','Fallito','Mislukt','Niepowodzenie','Başarısız','Gagal','Misslyckades'),
  apiName: T('名称','名稱','Name','名前','이름','Nom','Name','Nombre','Nome','Имя','الاسم','नाम','ชื่อ','Tên','Nome','Naam','Nazwa','İsim','Nama','Namn'),
  provider: T('提供商','提供商','Provider','プロバイダー','제공자','Fournisseur','Anbieter','Proveedor','Provedor','Провайдер','المزود','प्रदाता','ผู้ให้บริการ','Nhà cung cấp','Provider','Provider','Dostawca','Sağlayıcı','Penyedia','Leverantör'),
  addApi: T('添加 API','新增 API','Add API','APIを追加','API 추가','Ajouter API','API hinzufügen','Añadir API','Adicionar API','Добавить API','إضافة API','API जोड़ें','เพิ่ม API','Thêm API','Aggiungi API','API toevoegen','Dodaj API','API Ekle','Tambah API','Lägg till API'),
  deleteApi: T('删除 API','刪除 API','Delete API','APIを削除','API 삭제','Supprimer API','API löschen','Eliminar API','Excluir API','Удалить API','حذف API','API हटाएं','ลบ API','Xóa API','Elimina API','API verwijderen','Usuń API','API Sil','Hapus API','Ta bort API'),
  save: T('保存','儲存','Save','保存','저장','Enregistrer','Speichern','Guardar','Salvar','Сохранить','حفظ','सहेजें','บันทึก','Lưu','Salva','Opslaan','Zapisz','Kaydet','Simpan','Spara'),
  fetchModels: T('拉取可用模型','拉取可用模型','Fetch models','モデル一覧を取得','모델 목록 가져오기','Récupérer modèles','Modelle abrufen','Obtener modelos','Buscar modelos','Получить модели','جلب النماذج','मॉडल लाएं','ดึงรายการโมเดล','Lấy danh sách mô hình','Recupera modelli','Modellen ophalen','Pobierz modele','Modelleri Getir','Ambil model','Hämta modeller'),
  supportsConcurrency: T('支持并发（勾选→默认标准模式，取消→默认低并发）','支援並發（勾選→預設標準模式，取消→預設低並發）','Supports concurrency (checked→Standard mode, unchecked→Eco mode)','同時実行に対応（チェック→標準モード、解除→エコモード）','동시성 지원 (체크→표준 모드, 해제→에코 모드)','Supporte la concurrence (coché→Standard, décoché→Éco)','Parallele Anfragen (aktiv→Standard, inaktiv→Sparmodus)','Soporta concurrencia (✓→Estándar, ✗→Eco)','Suporta concorrência (✓→Padrão, ✗→Eco)','Поддержка параллельных запросов (вкл→Стандарт, выкл→Эконом)','يدعم التزامن (مفعل→قياسي، معطل→اقتصادي)','समवर्ती समर्थन (चेक→मानक, अनचेक→इको)','รองรับการทำงานพร้อมกัน (ติ๊ก→มาตรฐาน, ไม่ติ๊ก→ประหยัด)','Hỗ trợ đồng thời (chọn→Tiêu chuẩn, bỏ chọn→Tiết kiệm)','Supporta concorrenza (✓→Standard, ✗→Eco)','Ondersteunt gelijktijdigheid (aan→Standaard, uit→Eco)','Współbieżność (✓→Standard, ✗→Eco)','Eşzamanlılık (işaretli→Standart, işaretsiz→Eko)','Dukung konkurensi (✓→Standar, ✗→Eco)','Stöder samtidighet (✓→Standard, ✗→Eco)'),
  fetchOk: T('✅ 拉取到','✅ 拉取到','✅ Found','✅ 取得','✅ 가져옴','✅ Trouvé','✅ Gefunden','✅ Encontrados','✅ Encontrados','✅ Найдено','✅ تم العثور على','✅ मिले','✅ พบ','✅ Đã tìm thấy','✅ Trovati','✅ Gevonden','✅ Znaleziono','✅ Bulundu','✅ Ditemukan','✅ Hittade'),
  fetchEmpty: T('⚠️ 未找到可用模型','⚠️ 未找到可用模型','⚠️ No models found','⚠️ モデルが見つかりません','⚠️ 모델을 찾을 수 없음','⚠️ Aucun modèle trouvé','⚠️ Keine Modelle gefunden','⚠️ No se encontraron modelos','⚠️ Nenhum modelo encontrado','⚠️ Модели не найдены','⚠️ لم يتم العثور على نماذج','⚠️ कोई मॉडल नहीं मिला','⚠️ ไม่พบโมเดล','⚠️ Không tìm thấy mô hình','⚠️ Nessun modello trovato','⚠️ Geen modellen gevonden','⚠️ Nie znaleziono modeli','⚠️ Model bulunamadı','⚠️ Tidak ada model','⚠️ Inga modeller hittades'),
  cannotDelete: T('至少保留一个 API','至少保留一個 API','Keep at least one API','少なくとも1つのAPIが必要','최소 1개의 API가 필요','Gardez au moins une API','Mindestens eine API behalten','Conserve al menos una API','Mantenha pelo menos uma API','Оставьте хотя бы один API','احتفظ بواجهة API واحدة على الأقل','कम से कम एक API रखें','เก็บไว้อย่างน้อย 1 API','Giữ ít nhất một API','Mantieni almeno una API','Houd minstens één API','Zachowaj przynajmniej jedno API','En az bir API saklayın','Pertahankan setidaknya satu API','Behåll minst en API'),
  saved: T('✅ 已保存','✅ 已儲存','✅ Saved','✅ 保存済','✅ 저장됨','✅ Enregistré','✅ Gespeichert','✅ Guardado','✅ Salvo','✅ Сохранено','✅ تم الحفظ','✅ सहेजा गया','✅ บันทึกแล้ว','✅ Đã lưu','✅ Salvato','✅ Opgeslagen','✅ Zapisano','✅ Kaydedildi','✅ Tersimpan','✅ Sparat'),
};
function t(key) { const e = I18N[key]; return e ? (e[uiLang] || e['en'] || e['zh-CN'] || key) : key; }

let uiLang = 'zh-CN';
let apis = [];
let activeApiId = null;

// ===== 数据迁移 =====
async function migrateIfNeeded() {
  const stored = await chrome.storage.sync.get({ apis: null, apiKey: '', apiUrl: '', model: '' });
  if (!stored.apis && stored.apiKey) {
    apis = [{
      id: 'default', name: 'Default',
      apiKey: stored.apiKey,
      apiUrl: stored.apiUrl || 'https://api.deepseek.com/v1',
      model: stored.model || 'deepseek-chat',
      supportsConcurrency: true,
    }];
    activeApiId = 'default';
    await chrome.storage.sync.set({ apis, activeApiId });
    await chrome.storage.sync.remove(['apiKey', 'apiUrl', 'model']);
    return true;
  }
  return false;
}

function getActiveApi() {
  if (!apis.length) return null;
  return apis.find(a => a.id === activeApiId) || apis[0];
}

function getDefaultApiData() {
  return {
    id: 'api_' + Date.now(),
    name: 'New API',
    apiKey: '',
    apiUrl: 'https://api.deepseek.com/v1',
    model: 'deepseek-chat',
  };
}

// ===== 自动检测提供商 =====
function detectProvider(url) {
  if (!url) return 'custom';
  const u = url.toLowerCase();
  if (u.includes('deepseek')) return 'deepseek';
  if (u.includes('openai')) return 'openai';
  if (u.includes('groq')) return 'groq';
  if (u.includes('together')) return 'together';
  if (u.includes('openrouter')) return 'openrouter';
  if (u.includes('siliconflow')) return 'siliconflow';
  if (u.includes('moonshot')) return 'moonshot';
  if (u.includes('bigmodel')) return 'zhipu';
  if (u.includes('dashscope') || u.includes('aliyuncs')) return 'dashscope';
  return 'custom';
}

// ===== UI 填充 =====
function populateApiSelector() {
  const sel = $('#api-selector');
  if (!sel) return;
  sel.innerHTML = '';
  apis.forEach(api => {
    const opt = document.createElement('option');
    opt.value = api.id;
    opt.textContent = api.name || api.id;
    if (api.id === activeApiId) opt.selected = true;
    sel.appendChild(opt);
  });
}

function populateApiForm(api) {
  if (!api) return;
  $('#api-name').value = api.name || '';
  $('#api-key').value = api.apiKey || '';
  $('#api-url').value = api.apiUrl || '';
  $('#provider').value = detectProvider(api.apiUrl);
  populateModelSelect(api.model);
}

function populateModelSelect(currentModel) {
  const sel = $('#model');
  if (!sel) return;
  const prov = PROVIDERS[$('#provider').value];
  const existing = new Set(Array.from(sel.options).map(o => o.value));
  const addOpt = m => { if (m && !existing.has(m)) { sel.appendChild(new Option(m, m)); existing.add(m); } };
  if (prov && prov.models) prov.models.forEach(addOpt);
  if (currentModel) { addOpt(currentModel); sel.value = currentModel; }
}

function refreshUI() {
  populateApiSelector();
  const api = getActiveApi();
  if (api) populateApiForm(api);
  $('#btn-del-api').disabled = apis.length <= 1;
}

// ===== 保存 =====
async function saveCurrentApi() {
  const api = getActiveApi();
  if (!api) return;
  api.name = $('#api-name').value.trim() || api.id;
  api.apiKey = $('#api-key').value.trim();
  api.apiUrl = $('#api-url').value.trim().replace(/\/$/, '');
  api.model = $('#model').value.trim();
  await chrome.storage.sync.set({ apis, activeApiId });
  refreshUI();
  return api;
}

// ===== 测试连接 =====
async function testConnection() {
  const key = $('#api-key').value.trim();
  const url = $('#api-url').value.trim().replace(/\/$/, '');
  const model = $('#model').value;
  if (!key) { showResult(t('enterKey'), 'error'); return; }
  const btn = $('#btn-test');
  btn.textContent = t('testing'); btn.disabled = true;
  try {
    const resp = await chrome.runtime.sendMessage({ type: 'TEST_API', settings: { apiKey: key, apiUrl: url, model } });
    showResult(resp?.success ? t('success') : `❌ ${resp?.error || t('failed')}`, resp?.success ? 'success' : 'error');
  } catch(e) { showResult(`❌ ${e.message}`, 'error'); }
  btn.textContent = t('testConn'); btn.disabled = false;
}

function showResult(msg, type) {
  const el = $('#test-result');
  el.textContent = msg; el.className = 'test-result ' + (type||'');
  setTimeout(() => { el.textContent = ''; el.className = 'test-result'; }, 5000);
}

// ===== 拉取模型 =====
async function fetchModels() {
  const key = $('#api-key').value.trim();
  const url = $('#api-url').value.trim().replace(/\/$/, '');
  if (!key || !url) {
    showFetchStatus(t('enterKey'), 'error');
    return;
  }
  const btn = $('#btn-fetch-models');
  const status = $('#fetch-status');
  btn.textContent = '⏳'; btn.disabled = true;
  status.textContent = ''; status.className = 'fetch-status';
  try {
    const resp = await chrome.runtime.sendMessage({ type: 'FETCH_MODELS', apiKey: key, apiUrl: url });
    if (resp?.success && resp.models?.length) {
      const sel = $('#model'); const cur = sel.value;
      const existing = new Set(Array.from(sel.options).map(o => o.value));
      resp.models.forEach(m => { if (!existing.has(m)) { sel.appendChild(new Option(m, m)); existing.add(m); } });
      if (cur && !existing.has(cur)) { sel.appendChild(new Option(cur, cur)); }
      sel.value = cur;
      showFetchStatus(`${t('fetchOk')} ${resp.models.length} models`, 'success');
    } else if (resp?.success) {
      showFetchStatus(t('fetchEmpty'), 'error');
    } else {
      showFetchStatus(`❌ ${resp?.error || t('failed')}`, 'error');
    }
  } catch(e) {
    showFetchStatus(`❌ ${e.message}`, 'error');
  }
  btn.textContent = '🔄'; btn.disabled = false;
}

function showFetchStatus(msg, type) {
  const el = $('#fetch-status');
  el.textContent = msg; el.className = 'fetch-status ' + (type||'');
  setTimeout(() => { el.textContent = ''; el.className = 'fetch-status'; }, 6000);
}

// ===== i18n 初始化 =====
function initI18n() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    el.textContent = t(el.dataset.i18n);
  });
  document.querySelectorAll('[data-i18n-title]').forEach(el => {
    el.title = t(el.dataset.i18nTitle);
  });
}

// ===== Token 显示 =====
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
  const model = $('#model').value;
  const p = { 'deepseek-chat':[1,2], 'deepseek-reasoner':[4,16] }[model] || [1,2];
  return (input/1e6)*p[0] + (output/1e6)*p[1];
}

// ===== 事件绑定 =====
function bindEvents() {
  // API 选择器
  $('#api-selector').addEventListener('change', async () => {
    // 先保存当前
    await saveCurrentApiSilent();
    activeApiId = $('#api-selector').value;
    await chrome.storage.sync.set({ activeApiId });
    const api = getActiveApi();
    if (api) populateApiForm(api);
  });

  // 添加
  $('#btn-add-api').addEventListener('click', async () => {
    await saveCurrentApiSilent();
    const newApi = getDefaultApiData();
    apis.push(newApi);
    activeApiId = newApi.id;
    await chrome.storage.sync.set({ apis, activeApiId });
    refreshUI();
  });

  // 删除
  $('#btn-del-api').addEventListener('click', async () => {
    if (apis.length <= 1) { showResult(t('cannotDelete'), 'error'); return; }
    const idx = apis.findIndex(a => a.id === activeApiId);
    apis.splice(idx, 1);
    activeApiId = apis[0].id;
    await chrome.storage.sync.set({ apis, activeApiId });
    refreshUI();
  });

  // 提供商切换
  $('#provider').addEventListener('change', () => {
    const prov = PROVIDERS[$('#provider').value];
    if (prov && prov.url) {
      $('#api-url').value = prov.url;
    }
    // 预填该提供商的默认模型
    const sel = $('#model'); const curModel = sel.value;
    sel.innerHTML = ''; const existing = new Set();
    if (prov && prov.models) { prov.models.forEach(m => { sel.appendChild(new Option(m, m)); existing.add(m); }); }
    if (curModel && !existing.has(curModel)) { sel.appendChild(new Option(curModel, curModel)); }
    sel.value = curModel;
    saveCurrentApiSilent();
  });

  // 拉取模型
  $('#btn-fetch-models').addEventListener('click', fetchModels);

  // 保存按钮
  $('#btn-save').addEventListener('click', async () => {
    await saveCurrentApi();
    showResult(t('saved'), 'success');
  });

  // 测试连接
  $('#btn-test').addEventListener('click', testConnection);

  // API Key 显示/隐藏
  $('#toggle-key').addEventListener('click', () => {
    const el = $('#api-key');
    el.type = el.type === 'password' ? 'text' : 'password';
  });

  // Auto-save on input blur
  ['#api-name','#api-key','#api-url','#model'].forEach(sel => {
    $(sel).addEventListener('blur', () => saveCurrentApiSilent());
  });

  // UI Language
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
}

async function saveCurrentApiSilent() {
  const api = getActiveApi();
  if (!api) return;
  api.name = $('#api-name').value.trim() || api.id;
  api.apiKey = $('#api-key').value.trim();
  api.apiUrl = $('#api-url').value.trim().replace(/\/$/, '');
  api.model = $('#model').value;
  // 更新 selector 中当前条目的名称
  const sel = $('#api-selector');
  if (sel) { const opt = sel.querySelector(`option[value="${api.id}"]`); if (opt) opt.textContent = api.name || api.id; }
  await chrome.storage.sync.set({ apis, activeApiId });
}

// ===== 初始化 =====
(async () => {
  // 迁移旧格式
  await migrateIfNeeded();

  // 加载存储
  const stored = await chrome.storage.sync.get({ apis: null, activeApiId: null, uiLang: 'zh-CN' });
  uiLang = stored.uiLang;
  if (stored.apis) {
    apis = stored.apis;
    activeApiId = stored.activeApiId || apis[0]?.id || null;
  }
  if (!apis.length) {
    // 首次使用，创建默认 API
    apis = [getDefaultApiData()];
    activeApiId = apis[0].id;
  }

  // 设置 UI 语言
  $('#ui-lang').value = uiLang;
  initI18n();

  // 填充 UI
  refreshUI();

  // 显示版本号
  fetch('../manifest.json').then(r=>r.json()).then(m=>{ const el=document.getElementById('popup-version'); if(el) el.textContent=m.version; }).catch(()=>{});

  // 绑定事件
  bindEvents();

  // Token 显示
  updateTokenDisplay();

  // 监听 token 更新
  chrome.runtime.onMessage.addListener(msg => {
    if (msg.type === 'TOKEN_USAGE_UPDATED') updateTokenDisplay();
    if (msg.type === 'UI_LANG_CHANGED' && msg.uiLang) {
      uiLang = msg.uiLang;
      $('#ui-lang').value = uiLang;
      initI18n();
    }
  });
  $('#model').addEventListener('change', updateTokenDisplay);
})();
