/**
 * LinguaFlow — Open Design v9
 */
(function () {
  'use strict';

  let isTranslated = false, isTranslating = false;
  let translationMap = new Map();
  let translationCache = new Map();
  let inFlightNodes = new Set();
  let settings = {};
  let abortController = null;
  let scrollTimer = null;
  let mutationObserver = null;
  let pendingNodes = [], pendingTimer = null;
  let switchIntent = false, showTranslation = false;
  let pageTokens = { input: 0, output: 0, total: 0, cacheHits: 0, apiCalls: 0 };
  let tabId = null;
  let expanded = false, dragState = null, dragMoved = false;
  let uiLang = 'zh-CN';
  let untranslatedNodes = new Set(); // API 返回原文的节点（专有名词等）
  let explainCache = new Map(); // 原文 → 解释

  // ===== 多语言（20 种 UI 语言，DeepSeek API 生成） =====
  // zh-CN,zh-TW,en,ja,ko,fr,de,es,pt,ru,ar,hi,th,vi,it,nl,pl,tr,id,sv
  function T(z,t,e,j,k,f,d,s,p,r,a,h,T,v,i,n,l,u,b,c){return{'zh-CN':z,'zh-TW':t||z,en:e,ja:j,ko:k,fr:f||e,de:d||e,es:s||e,pt:p||e,ru:r||e,ar:a||e,hi:h||e,th:T||e,vi:v||e,it:i||e,nl:n||e,pl:l||e,tr:u||e,id:b||e,sv:c||e}}
  const I18N={autoTranslate:T('自动翻译','自動翻譯','Auto Translate','自動翻訳','자동 번역','Auto Traduire','Auto-Übersetzung','Auto Traducir','Auto Traduzir','Автоперевод','ترجمة تلقائية','स्वतः अनुवाद','แปลอัตโนมัติ','Tự động dịch','Auto Traduci','Auto Vertalen','Auto tłumacz','Otomatik Çeviri','Terjemahan Otomatis','Autoöversätt'),translatePage:T('翻译本页','翻譯本頁','Translate','翻訳','번역','Traduire','Übersetzen','Traducir','Traduzir','Перевести','ترجمة','अनुवाद','แปล','Dịch','Traduci','Vertalen','Tłumacz','Çevir','Terjemahkan','Översätt'),translated:T('已翻译','已翻譯','Translated','翻訳済','번역됨','Traduit','Übersetzt','Traducido','Traduzido','Переведено','مترجم','अनुवादित','แปลแล้ว','Đã dịch','Tradotto','Vertaald','Przetłumaczono','Çevrildi','Diterjemahkan','Översatt'),translating:T('翻译中…','翻譯中…','Translating…','翻訳中…','번역 중…','Traduction…','Übersetze…','Traduciendo…','Traduzindo…','Перевод…','جارٍ الترجمة…','अनुवाद हो रहा…','กำลังแปล…','Đang dịch…','Traduzione…','Bezig met vertalen…','Tłumaczenie…','Çevriliyor…','Menerjemahkan…','Översätter…'),canceled:T('翻译已取消','翻譯已取消','Translation canceled','翻訳キャンセル','번역 취소됨','Traduction annulée','Übersetzung abgebrochen','Traducción cancelada','Tradução cancelada','Перевод отменен','تم إلغاء الترجمة','अनुवाद रद्द','ยกเลิกการแปล','Đã hủy dịch','Traduzione annullata','Vertaling geannuleerd','Anulowano tłum.','Çeviri iptal edildi','Terjemahan dibatalkan','Översättning avbruten'),noText:T('未找到可翻译文本','未找到可翻譯文本','No translatable text','翻訳可能なテキストなし','번역 가능한 텍스트 없음','Aucun texte traduisible','Kein übersetzbarer Text','Sin texto traducible','Sem texto traduzível','Нет текста','لا يوجد نص قابل للترجمة','अनुवाद योग्य पाठ नहीं','ไม่มีข้อความที่แปลได้','Không có văn bản','Nessun testo traducibile','Geen vertaalbare tekst','Brak tekstu','Çevrilecek metin yok','Tidak ada teks','Ingen översättbar text'),noKey:T('请先配置 API Key','請先配置 API Key','Configure API Key','APIキーを設定してください','API 키 설정 필요','Configurer clé API','API-Schlüssel konfigurieren','Configurar API Key','Configurar Chave API','Настроить API','تكوين مفتاح API','API कुंजी कॉन्फ़िगर करें','ตั้งค่า API Key','Cấu hình API Key','Configura chiave API','API-sleutel configureren','Skonfiguruj klucz API','API Anahtarını Yapılandır','Konfigurasi API Key','Konfigurera API-nyckel'),completed:T('翻译完成','翻譯完成','Translation complete','翻訳完了','번역 완료','Traduction terminée','Übersetzung abgeschlossen','Traducción completa','Tradução concluída','Перевод завершен','اكتملت الترجمة','अनुवाद पूर्ण','แปลเสร็จ','Dịch xong','Traduzione completata','Vertaling voltooid','Tłumaczenie gotowe','Çeviri tamamlandı','Terjemahan selesai','Översättning klar'),failed:T('失败','失敗','failed','失敗','실패','échec','fehlgeschlagen','falló','falhou','Ошибка','فشل','विफल','ล้มเหลว','thất bại','fallito','mislukt','niepowodzenie','başarısız','gagal','misslyckades'),segments:T('段','段','segments','件','개','segments','Segmente','segmentos','segmentos','сегментов','مقاطع','खंड','ส่วน','đoạn','segmenti','segmenten','segmenty','bölüm','segmen','segment'),settings:T('翻译设置','翻譯設定','Settings','設定','설정','Paramètres','Einstellungen','Ajustes','Configurações','Настройки','الإعدادات','सेटिंग्स','ตั้งค่า','Cài đặt','Impostazioni','Instellingen','Ustawienia','Ayarlar','Pengaturan','Inställningar'),history:T('历史token用量','歷史token用量','Token History','トークン履歴','토큰 기록','Historique des jetons','Token-Verlauf','Historial de Tokens','Histórico de Tokens','История токенов','سجل الرموز','टोकन इतिहास','ประวัติโทเค็น','Lịch sử Token','Cronologia token','Token Geschiedenis','Historia tokenów','Token Geçmişi','Riwayat Token','Tokenhistorik'),clearCache:T('清除缓存','清除快取','Clear Cache','キャッシュ削除','캐시 삭제','Vider le cache','Cache leeren','Limpiar Caché','Limpar Cache','Очистить кэш','مسح الذاكرة المؤقتة','कैश साफ़ करें','ล้างแคช','Xóa Cache','Cancella cache','Cache wissen','Wyczyść pamięć','Önbelleği Temizle','Hapus Cache','Rensa cache'),cacheCleared:T('缓存已清除','快取已清除','Cache cleared','キャッシュ削除済','캐시 삭제됨','Cache vidé','Cache geleert','Caché limpiada','Cache limpo','Кэш очищен','تم المسح','कैश साफ़ हुआ','ล้างแคชแล้ว','Đã xóa Cache','Cache cancellata','Cache gewist','Pamięć wyczyszczona','Önbellek temizlendi','Cache dihapus','Cache rensad'),pageTokens:T('本页token消耗','本頁token消耗','Page tokens','ページトークン','페이지 토큰','Jetons de page','Seiten-Token','Tokens de página','Tokens da página','Токены страницы','رموز الصفحة','पृष्ठ टोकन','โทเค็นหน้า','Token trang','Token pagina','Paginatokens','Tokeny strony','Sayfa tokenları','Token halaman','Sidtoken'),hitRate:T('缓存命中率','快取命中率','Cache hit rate','キャッシュヒット率','캐시 적중률','Taux de succès du cache','Cache-Trefferquote','Tasa de aciertos','Taxa de acerto do cache','Попадания в кэш','معدل الوصول للذاكرة','कैश हिट दर','อัตราแคชฮิต','Tỉ lệ cache','Tasso di hit cache','Cache hitratio','Trafność pamięci','Önbellek isabet oranı','Rasio cache','Cacheträffar'),langSwitch:T('语言切换至','語言切換至','Language:','言語変更:','언어 변경:','Langue :','Sprache:','Idioma:','Idioma:','Язык:','اللغة:','भाषा:','ภาษา:','Ngôn ngữ:','Lingua:','Taal:','Język:','Dil:','Bahasa:','Språk:'),cacheClearedSwitch:T('，缓存已清除','，快取已清除',', cache cleared','、キャッシュ削除済',', 캐시 삭제됨','cache vidé','Cache geleert','caché limpiada','cache limpo','кэш очищен','تم مسح الذاكرة المؤقتة','कैश साफ़ हुआ','ล้างแคชแล้ว','đã xóa cache','cache cancellata','cache gewist','pamięć wyczyszczona','önbellek temizlendi','cache dihapus','cache rensad'),input:T('输入','輸入','Input','入力','입력','Entrée','Eingabe','Entrada','Entrada','Ввод','الإدخال','इनपुट','อินพุต','Đầu vào','Input','Invoer','Wejście','Giriş','Masukan','Indata'),output:T('输出','輸出','Output','出力','출력','Sortie','Ausgabe','Salida','Saída','Вывод','الإخراج','आउटपुट','เอาต์พุต','Đầu ra','Output','Uitvoer','Wyjście','Çıkış','Keluaran','Utdata'),total:T('总计','總計','Total','合計','합계','Total','Gesamt','Total','Total','Всего','المجموع','कुल','รวม','Tổng','Totale','Totaal','Razem','Toplam','Total','Totalt'),estCost:T('预估费用','預估費用','Est. cost','推定費用','예상 비용','Coût estimé','Geschätzte Kosten','Costo est.','Custo estimado','Ориент. стоимость','التكلفة التقريبية','अनुमानित लागत','ค่าใช้จ่ายโดยประมาณ','Chi phí ước tính','Costo stimato','Geschatte kosten','Szac. koszt','Tah. maliyet','Perkiraan biaya','Beräknad kostnad'),cacheEntries:T('缓存条目','快取條目','Cache entries','キャッシュ項目','캐시 항목','Entrées du cache','Cache-Einträge','Entradas de caché','Entradas de cache','Записей в кэше','إدخالات الذاكرة','कैश प्रविष्टियाँ','รายการแคช','Mục cache','Voci cache','Cache-items','Wpisy pamięci','Önbellek girişleri','Entri cache','Cacheposter'),restored:T('已还原原文','已還原原文','Original restored','原文に戻した','원문 복원됨','Original restauré','Original wiederhergestellt','Original restaurado','Original restaurado','Оригинал восстановлен','تمت استعادة الأصل','मूल पुनर्स्थापित','คืนค่าต้นฉบับแล้ว','Đã khôi phục gốc','Originale ripristinato','Origineel hersteld','Przywrócono oryginał','Orijinal geri yüklendi','Asli dipulihkan','Original återställt'),autoDetect:T('自动检测','自動檢測','Auto Detect','自動検出','자동 감지','Détection auto','Automatisch erkennen','Detectar auto.','Detecção Automática','Автоопределение','كشف تلقائي','स्वतः पहचान','ตรวจจับอัตโนมัติ','Tự động phát hiện','Rilevamento automatico','Automatisch detecteren','Auto wykrywanie','Otomatik Algıla','Deteksi Otomatis','Autodetektera'),source:T('源语种','源語種','Source','ソース','소스','Source','Quelle','Origen','Origem','Исходный','المصدر','स्रोत','ต้นทาง','Nguồn','Sorgente','Bron','Źródło','Kaynak','Sumber','Källa'),target:T('目标语种','目標語種','Target','ターゲット','타겟','Cible','Ziel','Destino','Destino','Целевой','الهدف','लक्ष्य','ปลายทาง','Đích','Destinazione','Doel','Cel','Hedef','Target','Mål'),autoShort:T('自动','自動','Auto','自動','자동','Auto','Auto','Auto','Auto','Авто','تلقائي','स्वतः','อัตโนมัติ','Tự động','Auto','Auto','Auto','Otomatik','Otomatis','Auto')};

  function t(key) {
    const entry = I18N[key];
    if (!entry) return key;
    return entry[uiLang] || entry['en'] || entry['zh-CN'] || key;
  }

  function updateAllUIText() {
    // 悬浮球
    const orbLabel = document.querySelector('.lf-orb-label');
    if (orbLabel) orbLabel.textContent = t('autoShort');
    const btnT = document.getElementById('btn-translate');
    if (btnT && !isTranslating) btnT.textContent = showTranslation ? t('translated') : t('translatePage');
    const btnC = document.getElementById('btn-clear');
    if (btnC) btnC.textContent = t('clearCache');
    // 详情标题
    const t0 = document.getElementById('lf-title-settings');
    if (t0) t0.textContent = t('settings');
    const t1 = document.getElementById('lf-title-history');
    if (t1) t1.textContent = t('history');
    // 语言标签
    const s = document.getElementById('dl-source'); if (s) s.textContent = t('source');
    const tg = document.getElementById('dl-target'); if (tg) tg.textContent = t('target');
    const oa = document.getElementById('opt-auto'); if (oa) oa.textContent = t('autoDetect');
    // Token 尾栏
    const pt = document.getElementById('txt-page-tokens'); if (pt) pt.textContent = t('pageTokens');
    const hr = document.getElementById('txt-hit-rate'); if (hr) hr.textContent = t('hitRate');
    // 进度条
    const pl = document.getElementById('prog-label'); if (pl) pl.textContent = t('translating');
    // 详情网格标签
    updateDetailNumbers();
  }

  const EXCLUDE_TAGS = new Set(['SCRIPT','STYLE','NOSCRIPT','CODE','PRE','KBD','VAR','SAMP',
    'TEXTAREA','INPUT','SELECT','OPTION','SVG','MATH','CANVAS','IFRAME','OBJECT','EMBED',
    'AUDIO','VIDEO','IMG','AREA','MAP','TEMPLATE','SLOT']);
  const RE_SYMBOLS = /^[\d\s.,;:!?()\[\]{}<>+\-*/=@#$%^&~`|\\/_"'«»„"''‹›·•…]+$/;
  const RE_URL = /^https?:\/\/\S+$/;
  const RE_LETTER = /\p{L}/u;

  function injectStyles() {
    if (document.getElementById('lf-styles')) return;
    const s = document.createElement('style'); s.id = 'lf-styles';
    s.textContent = `
:root{--lf-purple:#7c5cfc;--lf-purple-soft:#9061f9;--lf-cyan:#5ce0fc;--lf-green:#4ade80;--lf-red:#f87171;--lf-yellow:#facc15;--lf-bg:rgba(15,15,26,0.94);--lf-border:rgba(255,255,255,0.08);--lf-text:#c0c0d0;--lf-text-strong:#e0e0e0;--lf-text-weak:#7a7a8e}
#lf-widget{position:fixed;right:16px;bottom:16px;z-index:2147483646;display:flex;flex-direction:column;align-items:stretch;font-family:system-ui;user-select:none;width:260px;gap:6px}
.lf-glass{background:var(--lf-bg);backdrop-filter:blur(16px) saturate(1.2);-webkit-backdrop-filter:blur(16px) saturate(1.2);border:1px solid var(--lf-border);border-top-color:rgba(255,255,255,0.12);box-shadow:inset 0 1px 0 rgba(255,255,255,0.04),0 8px 32px rgba(0,0,0,0.45),0 2px 6px rgba(0,0,0,0.35)}
.lf-progress{border-radius:12px;padding:0 12px;max-height:0;opacity:0;overflow:hidden;transition:max-height 0.3s cubic-bezier(0.4,0,0.2,1),opacity 0.25s ease,padding 0.3s cubic-bezier(0.4,0,0.2,1)}
.lf-progress.show{max-height:68px;opacity:1;padding:12px}
.lf-progress-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:8px}
.lf-progress-text{font-size:11px;color:var(--lf-text-strong);font-weight:500}
.lf-progress-cancel{width:22px;height:22px;display:grid;place-items:center;background:transparent;border:none;color:var(--lf-text-weak);font-size:12px;cursor:pointer;border-radius:5px;transition:all 0.15s}
.lf-progress-cancel:hover{color:var(--lf-text);background:rgba(255,255,255,0.05)}
.lf-track{height:3px;background:rgba(255,255,255,0.05);border-radius:999px;overflow:hidden}
.lf-fill{height:100%;width:0%;background:linear-gradient(90deg,var(--lf-purple),var(--lf-cyan));border-radius:999px;transition:width 0.25s cubic-bezier(0.4,0,0.2,1)}
.lf-card{border-radius:18px;overflow:hidden;display:flex;flex-direction:column}
.lf-detail{max-height:0;opacity:0;overflow:hidden;transition:max-height 0.35s cubic-bezier(0.4,0,0.2,1),opacity 0.25s ease}
.lf-detail.open{max-height:280px;opacity:1}
.lf-detail-inner{padding:14px}
.lf-detail-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:12px}
.lf-detail-title{font-size:12px;font-weight:600;color:var(--lf-text-strong)}
.lf-detail-grid{display:grid;grid-template-columns:1fr auto;gap:7px 20px}
.lf-detail-label{font-size:11px;color:var(--lf-text-weak)}
.lf-detail-value{font-size:11px;font-weight:500;color:var(--lf-text-strong);text-align:right;font-variant-numeric:tabular-nums}
.lf-clear-btn{background:rgba(248,113,133,0.10);color:var(--lf-red);border:none;border-radius:6px;padding:3px 8px;font-size:10px;font-weight:500;cursor:pointer;font-family:inherit;transition:background 0.2s}
.lf-clear-btn:hover{background:rgba(248,113,133,0.18)}
.lf-orb{display:grid;grid-template-columns:1fr auto 1fr;align-items:center;padding:10px 13px;cursor:grab;min-height:42px}
.lf-orb:active{cursor:grabbing}
.lf-orb-left{display:flex;align-items:center;gap:8px;justify-self:start}
.lf-orb-center{justify-self:center}
.lf-orb-right{justify-self:end}
.lf-orb-label{font-size:11px;color:var(--lf-text-weak);font-weight:500;white-space:nowrap}
.lf-toggle{width:32px;height:18px;border-radius:999px;background:rgba(255,255,255,0.1);border:none;position:relative;cursor:pointer;padding:0;flex-shrink:0;transition:background 0.3s ease}
.lf-toggle::after{content:"";position:absolute;top:2.5px;left:2.5px;width:13px;height:13px;border-radius:50%;background:#fff;box-shadow:0 1px 4px rgba(0,0,0,0.3);transition:transform 0.3s cubic-bezier(0.4,0,0.2,1)}
.lf-toggle.active{background:var(--lf-purple)}
.lf-toggle.active::after{transform:translateX(14px)}
.lf-pill-btn{height:26px;padding:0 14px;border-radius:13px;background:rgba(124,92,252,0.08);color:var(--lf-purple-soft);border:1px solid rgba(124,92,252,0.18);font-family:inherit;font-size:11px;font-weight:600;cursor:pointer;white-space:nowrap;transition:all 0.2s ease;display:flex;align-items:center;gap:4px}
.lf-pill-btn:hover{background:rgba(124,92,252,0.14);border-color:rgba(124,92,252,0.3)}
.lf-pill-btn.translating{background:rgba(124,92,252,0.05);color:#8b5cf6;border-color:rgba(124,92,252,0.1);cursor:default}
.lf-pill-btn.done{background:rgba(74,222,128,0.1);color:var(--lf-green);border-color:rgba(74,222,128,0.2)}
.lf-btn-spinner{width:10px;height:10px;border:2px solid rgba(124,92,252,0.2);border-top-color:var(--lf-purple-soft);border-radius:50%;animation:lf-spin 0.8s linear infinite;display:inline-block}
@keyframes lf-spin{to{transform:rotate(360deg)}}
.lf-chevron{width:28px;height:28px;display:inline-flex;align-items:center;justify-content:center;background:transparent;border:none;color:var(--lf-text-weak);cursor:pointer;border-radius:7px;transition:all 0.3s cubic-bezier(0.4,0,0.2,1);padding:0}
.lf-chevron:hover{color:var(--lf-text);background:rgba(255,255,255,0.05)}
.lf-chevron.open{transform:rotate(180deg)}
.lf-chevron svg{width:20px;height:20px;stroke:currentColor;stroke-width:2.2;fill:none;stroke-linecap:round;stroke-linejoin:round}
.lf-fold-btn{width:20px;height:20px;display:inline-flex;align-items:center;justify-content:center;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:5px;color:rgba(255,255,255,0.3);cursor:pointer;padding:0;transition:all 0.3s ease}.lf-fold-btn:hover{background:rgba(255,255,255,0.08);color:rgba(255,255,255,0.6)}.lf-fold-btn.folded svg{transform:rotate(180deg)}.lf-token-tail{padding:4px 13px 5px;background:rgba(0,0,0,0.12);cursor:pointer;display:flex;justify-content:space-between;align-items:center;transition:background 0.2s}
.lf-token-tail:hover{background:rgba(0,0,0,0.22)}
.lf-token-text,.lf-token-hit{font-size:10px;color:var(--lf-text-weak);font-weight:500;font-variant-numeric:tabular-nums}
.lf-token-num{color:var(--lf-purple);font-weight:600}
.lf-token-hit{color:var(--lf-green)}.lf-token-hit.zero{color:var(--lf-text-weak)}
button:focus-visible{outline:2px solid rgba(124,92,252,0.5);outline-offset:2px}
#lf-toast-stack{position:absolute;bottom:100%;right:0;margin-bottom:8px;display:flex;flex-direction:column;gap:6px;pointer-events:none;align-items:flex-end}
.lf-toast{padding:9px 13px;border-radius:10px;font-size:11px;font-weight:500;opacity:0;transform:translateY(6px);transition:opacity 0.2s ease,transform 0.2s ease;display:flex;align-items:center;gap:5px;white-space:nowrap;pointer-events:auto}
.lf-toast.show{opacity:1;transform:translateY(0)}
.lf-toast.success{background:rgba(74,222,128,0.10);border:1px solid rgba(74,222,128,0.16);color:var(--lf-green)}
.lf-toast.warning{background:rgba(250,204,21,0.10);border:1px solid rgba(250,204,21,0.16);color:var(--lf-yellow)}
.lf-toast.error{background:rgba(248,113,133,0.10);border:1px solid rgba(248,113,133,0.16);color:var(--lf-red)}
[data-linguaflow-translated="true"]:hover{background-color:rgba(124,92,252,0.08)!important;border-radius:2px}
`;
    document.head.appendChild(s);
  }

  function buildUI() {
    injectStyles();
    const widget = document.createElement('div');
    widget.id = 'lf-widget';
    widget.innerHTML = `
      <div id="lf-toast-stack"></div>
      <div id="lf-progress" class="lf-glass lf-progress">
        <div class="lf-progress-header">
          <span class="lf-progress-text"><span id="prog-label">${t('translating')}</span> <span id="prog-cur">0</span>/<span id="prog-total">0</span></span>
          <button class="lf-progress-cancel" id="btn-cancel">✕</button>
        </div>
        <div class="lf-track"><div class="lf-fill" id="prog-fill"></div></div>
      </div>
      <div id="lf-card" class="lf-glass lf-card">
        <div id="lf-detail" class="lf-detail">
          <div class="lf-detail-inner">
            <div class="lf-detail-header">
              <span class="lf-detail-title" id="lf-title-settings">${t('settings')}</span>
              <button class="lf-clear-btn" id="btn-clear">${t('clearCache')}</button>
            </div>
            <div style="margin-bottom:8px;">
              <div style="font-size:10px;color:var(--lf-text-weak);margin-bottom:3px;">Language</div>
              <select id="lf-ui-lang" style="width:100%;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);border-radius:6px;padding:4px 6px;color:var(--lf-text);font-size:11px;font-family:inherit;outline:none;cursor:pointer;">
                <option value="zh-CN">🇨🇳 简体中文</option><option value="zh-TW">🇹🇼 繁體中文</option><option value="en">🇺🇸 English</option><option value="ja">🇯🇵 日本語</option><option value="ko">🇰🇷 한국어</option><option value="fr">🇫🇷 Français</option><option value="de">🇩🇪 Deutsch</option><option value="es">🇪🇸 Español</option><option value="pt">🇧🇷 Português</option><option value="ru">🇷🇺 Русский</option><option value="ar">🇸🇦 العربية</option><option value="hi">🇮🇳 हिन्दी</option><option value="th">🇹🇭 ไทย</option><option value="vi">🇻🇳 Tiếng Việt</option><option value="it">🇮🇹 Italiano</option><option value="nl">🇳🇱 Nederlands</option><option value="pl">🇵🇱 Polski</option><option value="tr">🇹🇷 Türkçe</option><option value="id">🇮🇩 Indonesia</option><option value="sv">🇸🇪 Svenska</option>
              </select>
            </div>
            <div style="display:flex;gap:6px;margin-bottom:12px;">
              <div style="flex:1;">
                <div style="font-size:10px;color:var(--lf-text-weak);margin-bottom:3px;" id="dl-source">${t('source')}</div>
                <select id="lf-lang-from" translate="no" style="width:100%;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);border-radius:6px;padding:4px 6px;color:var(--lf-text);font-size:11px;font-family:inherit;outline:none;cursor:pointer;">
                  <option value="auto" id="opt-auto">${t('autoDetect')}</option>
                  <option value="zh-CN">简体中文</option><option value="zh-TW">繁體中文</option><option value="en">English</option><option value="ja">日本語</option><option value="ko">한국어</option><option value="fr">Français</option><option value="de">Deutsch</option><option value="es">Español</option><option value="pt">Português</option><option value="ru">Русский</option><option value="ar">العربية</option><option value="hi">हिन्दी</option><option value="th">ไทย</option><option value="vi">Tiếng Việt</option><option value="it">Italiano</option><option value="nl">Nederlands</option><option value="pl">Polski</option><option value="tr">Türkçe</option><option value="id">Bahasa Indonesia</option><option value="sv">Svenska</option><option value="da">Dansk</option><option value="fi">Suomi</option><option value="no">Norsk</option><option value="cs">Čeština</option><option value="ro">Română</option><option value="hu">Magyar</option><option value="el">Ελληνικά</option><option value="he">עברית</option><option value="uk">Українська</option><option value="ms">Bahasa Melayu</option><option value="fil">Filipino</option><option value="bn">বাংলা</option><option value="ur">اردو</option><option value="fa">فارسی</option><option value="sw">Kiswahili</option><option value="ta">தமிழ்</option><option value="te">తెలుగు</option><option value="mr">मराठी</option><option value="gu">ગુજરાતી</option><option value="kn">ಕನ್ನಡ</option><option value="ml">മലയാളം</option><option value="pa">ਪੰਜਾਬੀ</option><option value="bg">Български</option><option value="sk">Slovenčina</option><option value="lt">Lietuvių</option><option value="lv">Latviešu</option><option value="et">Eesti</option><option value="sl">Slovenščina</option><option value="hr">Hrvatski</option><option value="sr">Српски</option>
                </select>
              </div>
              <div style="flex:1;">
                <div style="font-size:10px;color:var(--lf-text-weak);margin-bottom:3px;" id="dl-target">${t('target')}</div>
                <select id="lf-lang-to" translate="no" style="width:100%;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);border-radius:6px;padding:4px 6px;color:var(--lf-text);font-size:11px;font-family:inherit;outline:none;cursor:pointer;">
                  <option value="zh-CN">简体中文</option><option value="zh-TW">繁體中文</option><option value="en">English</option><option value="ja">日本語</option><option value="ko">한국어</option><option value="fr">Français</option><option value="de">Deutsch</option><option value="es">Español</option><option value="pt">Português</option><option value="ru">Русский</option><option value="ar">العربية</option><option value="hi">हिन्दी</option><option value="th">ไทย</option><option value="vi">Tiếng Việt</option><option value="it">Italiano</option><option value="nl">Nederlands</option><option value="pl">Polski</option><option value="tr">Türkçe</option><option value="id">Bahasa Indonesia</option><option value="sv">Svenska</option><option value="da">Dansk</option><option value="fi">Suomi</option><option value="no">Norsk</option><option value="cs">Čeština</option><option value="ro">Română</option><option value="hu">Magyar</option><option value="el">Ελληνικά</option><option value="he">עברית</option><option value="uk">Українська</option><option value="ms">Bahasa Melayu</option><option value="fil">Filipino</option><option value="bn">বাংলা</option><option value="ur">اردو</option><option value="fa">فارسی</option><option value="sw">Kiswahili</option><option value="ta">தமிழ்</option><option value="te">తెలుగు</option><option value="mr">मराठी</option><option value="gu">ગુજરાતી</option><option value="kn">ಕನ್ನಡ</option><option value="ml">മലയാളം</option><option value="pa">ਪੰਜਾਬੀ</option><option value="bg">Български</option><option value="sk">Slovenčina</option><option value="lt">Lietuvių</option><option value="lv">Latviešu</option><option value="et">Eesti</option><option value="sl">Slovenščina</option><option value="hr">Hrvatski</option><option value="sr">Српски</option>
                </select>
              </div>
            </div>
            <div style="height:1px;background:rgba(255,255,255,0.06);margin-bottom:12px;"></div>
            <div class="lf-detail-header" style="margin-bottom:10px;">
              <span class="lf-detail-title" id="lf-title-history">${t('history')}</span>
            </div>
            <div class="lf-detail-grid">
              <span class="lf-detail-label" id="dl-input">${t('input')}</span><span class="lf-detail-value" id="dv-input">0</span>
              <span class="lf-detail-label" id="dl-output">${t('output')}</span><span class="lf-detail-value" id="dv-output">0</span>
              <span class="lf-detail-label" id="dl-total">${t('total')}</span><span class="lf-detail-value" id="dv-total">0</span>
              <span class="lf-detail-label" id="dl-cost">${t('estCost')}</span><span class="lf-detail-value" id="dv-cost">--</span>
              <span class="lf-detail-label" id="dl-cache">${t('cacheEntries')}</span><span class="lf-detail-value" id="dv-cache">0</span>
            </div>
          </div>
        </div>
        <div id="lf-orb" class="lf-orb">
          <div class="lf-orb-left">
            <span class="lf-orb-label">${t('autoShort')}</span>
            <button class="lf-toggle" id="btn-toggle"></button>
          </div>
          <div class="lf-orb-center" style="display:flex;align-items:center;gap:3px;margin-left:4px;">
            <button class="lf-pill-btn" id="btn-translate">${t('translatePage')}</button>
            <span style="font-size:10px;color:rgba(255,255,255,0.35);white-space:nowrap;">Alt+T</span>
          </div>
          <div class="lf-orb-right" style="display:flex;align-items:center;gap:2px;">
            <button class="lf-fold-btn" id="btn-fold" title="收折">
              <svg viewBox="0 0 16 16" width="12" height="12" style="stroke:currentColor;stroke-width:2.5;fill:none;stroke-linecap:round;stroke-linejoin:round;">
                <polyline points="12 4 6 8 12 12"/>
              </svg>
            </button>
            <button class="lf-chevron" id="btn-chevron">
              <svg viewBox="0 0 24 24"><polyline points="6 15 12 9 18 15"/></svg>
            </button>
          </div>
        </div>
        <div class="lf-token-tail" id="btn-token">
          <span class="lf-token-text"><span id="txt-page-tokens">${t('pageTokens')}</span> <span class="lf-token-num" id="token-num">0</span></span>
          <span class="lf-token-hit" id="token-hit"><span id="txt-hit-rate">${t('hitRate')}</span> 0%</span>
        </div>
      </div>
    `;
    document.body.appendChild(widget);
    bindEvents(widget);
  }

  function bindEvents(widget) {
    const detail = document.getElementById('lf-detail');
    const progress = document.getElementById('lf-progress');
    const progFill = document.getElementById('prog-fill');
    const progCur = document.getElementById('prog-cur');
    const progTotal = document.getElementById('prog-total');
    const btnToggle = document.getElementById('btn-toggle');
    const btnTranslate = document.getElementById('btn-translate');
    const btnChevron = document.getElementById('btn-chevron');
    const btnToken = document.getElementById('btn-token');
    const btnCancel = document.getElementById('btn-cancel');
    const btnClear = document.getElementById('btn-clear');

    // 收折：隐藏详情+进度+标签+按钮+token，只保留 orb
    let folded = false;
    const btnFold = document.getElementById('btn-fold');
    btnFold.addEventListener('click', e => {
      e.stopPropagation();
      folded = !folded;
      btnFold.classList.toggle('folded', folded);
      const els = [document.getElementById('lf-detail'), document.getElementById('lf-progress'),
        document.querySelector('.lf-orb-left'), document.querySelector('.lf-orb-center'), document.querySelector('.lf-token-tail')];
      els.forEach(el => { if (el) el.style.display = folded ? 'none' : ''; });
      if (!folded) {
        const c = document.querySelector('.lf-orb-center');
        if (c) c.style.display = 'flex';
      }
    });

    // 展开/收起详情
    function toggleDetail() {
      expanded = !expanded;
      detail.classList.toggle('open', expanded);
      btnChevron.classList.toggle('open', expanded);
      if (expanded) {
        const lf = document.getElementById('lf-lang-from');
        const lt = document.getElementById('lf-lang-to');
        chrome.storage.sync.get({ sourceLang:'auto', targetLang:'zh-CN' }, s => {
          if (lf) lf.value = s.sourceLang;
          if (lt) { lt.value = s.targetLang; lastSavedTo = s.targetLang; }
        });
        updateDetailNumbers();
      }
    }
    btnChevron.addEventListener('click', e => { e.stopPropagation(); toggleDetail(); });
    btnToken.addEventListener('click', e => { if (!dragMoved) { e.stopPropagation(); toggleDetail(); } });

    // 开关
    btnToggle.addEventListener('click', async e => {
      e.stopPropagation();
      switchIntent = !switchIntent;
      btnToggle.classList.toggle('active', switchIntent);
      await saveTabMode(switchIntent);
      updateUsageBall();
      if (switchIntent && !isTranslated && !isTranslating) await loadAndTranslate({ continuous: true });
    });

    // 翻译按钮
    btnTranslate.addEventListener('click', async e => {
      e.stopPropagation();
      if (showTranslation) {
        restoreOriginal();
        if (mutationObserver) { mutationObserver.disconnect(); mutationObserver = null; }
        isTranslating = false;
        const prog = document.getElementById('lf-progress');
        if (prog) prog.classList.remove('show');
        showTranslation = false;
        updateUsageBall();
      } else {
        // 原文 → 翻译（翻译中也允许重新开始）
        if (abortController) abortController.abort();
        btnTranslate.classList.add('translating');
        btnTranslate.innerHTML = '<span class="lf-btn-spinner"></span>' + t('translating');
        await loadAndTranslate({ continuous: true });
        showTranslation = true;
        btnTranslate.classList.remove('translating');
        btnTranslate.classList.add('done');
        btnTranslate.textContent = t('translated');
      }
    });

    // 取消
    btnCancel.addEventListener('click', e => {
      e.stopPropagation();
      if (!isTranslating) return;
      if (abortController) abortController.abort();
      isTranslating = false;
      progress.classList.remove('show');
      const bt = document.getElementById('btn-translate');
      bt.classList.remove('translating'); bt.textContent = t('translatePage');
      showToast('warning', '⚠️ ' + t('canceled'));
    });

    // 防御 GitHub 中文化插件修改 option 文字
    const langOpts = {
      'zh-CN':'简体中文','zh-TW':'繁體中文','en':'English','ja':'日本語','ko':'한국어',
      'fr':'Français','de':'Deutsch','es':'Español','pt':'Português','ru':'Русский',
      'ar':'العربية','hi':'हिन्दी','th':'ไทย','vi':'Tiếng Việt','it':'Italiano',
      'nl':'Nederlands','pl':'Polski','tr':'Türkçe','id':'Bahasa Indonesia','sv':'Svenska',
      'da':'Dansk','fi':'Suomi','no':'Norsk','cs':'Čeština','ro':'Română','hu':'Magyar',
      'el':'Ελληνικά','he':'עברית','uk':'Українська','ms':'Bahasa Melayu','fil':'Filipino',
      'bn':'বাংলা','ur':'اردو','fa':'فارسی','sw':'Kiswahili','ta':'தமிழ்','te':'తెలుగు',
      'mr':'मराठी','gu':'ગુજરાતી','kn':'ಕನ್ನಡ','ml':'മലയാളം','pa':'ਪੰਜਾਬੀ',
      'bg':'Български','sk':'Slovenčina','lt':'Lietuvių','lv':'Latviešu','et':'Eesti',
      'sl':'Slovenščina','hr':'Hrvatski','sr':'Српски'
    };
    function restoreLangOptions() {
      [document.getElementById('lf-lang-from'), document.getElementById('lf-lang-to')].forEach(sel => {
        if (!sel) return;
        for (const opt of sel.options) {
          if (opt.value === 'auto') continue;
          const correct = langOpts[opt.value];
          if (correct && opt.textContent !== correct) opt.textContent = correct;
        }
      });
    }
    setInterval(restoreLangOptions, 2000); // 每 2 秒检查一次

    // 语言切换 — 自动保存 + 清除缓存
    const langFrom = document.getElementById('lf-lang-from');
    const langTo = document.getElementById('lf-lang-to');
    let lastSavedTo = null; // 打开详情面板时记录原始目标语言
    async function onLangChange() {
      if (!langFrom || !langTo) return;
      const newTo = langTo.value;
      // 目标语言变了（跟打开面板时不同）→ 清除缓存
      if (lastSavedTo !== null && lastSavedTo !== newTo) {
        translationCache.clear();
        chrome.storage.local.remove('translation_cache');
        chrome.storage.local.set({ last_target_lang: newTo });
        updateDetailNumbers();
        showToast('warning', t('langSwitch') + ' ' + newTo + t('cacheClearedSwitch'));
      }
      lastSavedTo = newTo;
      await chrome.storage.sync.set({ sourceLang: langFrom.value, targetLang: newTo });
      updateAllUIText();
    }
    langFrom.addEventListener('change', onLangChange);
    langTo.addEventListener('change', onLangChange);

    // UI 语言
    const uiLangSel = document.getElementById('lf-ui-lang');
    function syncUILangSelect() { if (uiLangSel) uiLangSel.value = uiLang; }
    syncUILangSelect();
    if (uiLangSel) {
      uiLangSel.addEventListener('change', async () => {
        uiLang = uiLangSel.value;
        await chrome.storage.sync.set({ uiLang });
        updateAllUIText();
        updateUsageBall();
        updateDetailNumbers();
        syncUILangSelect();
      });
    }

    // 清除缓存
    btnClear.addEventListener('click', e => {
      e.stopPropagation(); translationCache.clear(); chrome.storage.local.remove('translation_cache');
      updateDetailNumbers(); showToast('success', '✅ ' + t('cacheCleared'));
    });

    // 进度条
    window._lfSetProgress = (cur, total) => {
      if (!progress.classList.contains('show')) {
        progress.classList.add('show');
        const bt = document.getElementById('btn-translate');
        if (!bt.classList.contains('translating')) { bt.classList.add('translating'); bt.innerHTML = '<span class="lf-btn-spinner"></span>' + t('translating'); }
      }
      progCur.textContent = String(cur); progTotal.textContent = String(total);
      progFill.style.width = (total > 0 ? cur / total * 100 : 0) + '%';
      if (cur >= total) {
        setTimeout(() => progress.classList.remove('show'), 2000);
        const bt = document.getElementById('btn-translate');
        bt.classList.remove('translating'); bt.classList.add('done'); bt.textContent = t('translated');
      }
    };

    // 拖拽
    const orb = document.getElementById('lf-orb');
    orb.addEventListener('mousedown', startDrag);
    orb.addEventListener('touchstart', startDrag, { passive: false });

    function startDrag(e) {
      if (e.target.closest('.lf-toggle,.lf-pill-btn,.lf-chevron,.lf-collapse-btn')) return;
      e.preventDefault();
      const rect = widget.getBoundingClientRect();
      const cx = e.touches ? e.touches[0].clientX : e.clientX;
      const cy = e.touches ? e.touches[0].clientY : e.clientY;
      dragState = { startRight: window.innerWidth - rect.right, startBottom: window.innerHeight - rect.bottom, startX: cx, startY: cy };
      dragMoved = false;
      document.addEventListener('mousemove', onDrag); document.addEventListener('mouseup', stopDrag);
      document.addEventListener('touchmove', onDrag, { passive: false }); document.addEventListener('touchend', stopDrag);
    }
    function onDrag(e) {
      if (!dragState) return; e.preventDefault();
      const cx = e.touches ? e.touches[0].clientX : e.clientX, cy = e.touches ? e.touches[0].clientY : e.clientY;
      let r = dragState.startRight - (cx - dragState.startX), b = dragState.startBottom - (cy - dragState.startY);
      r = Math.max(0, Math.min(window.innerWidth - widget.offsetWidth, r));
      b = Math.max(0, Math.min(window.innerHeight - widget.offsetHeight, b));
      widget.style.left = 'auto'; widget.style.top = 'auto'; widget.style.right = r + 'px'; widget.style.bottom = b + 'px';
      dragMoved = true;
    }
    function stopDrag() {
      dragState = null;
      document.removeEventListener('mousemove', onDrag); document.removeEventListener('mouseup', stopDrag);
      document.removeEventListener('touchmove', onDrag); document.removeEventListener('touchend', stopDrag);
      setTimeout(() => { dragMoved = false; }, 60);
    }
  }

  // ===== UI 更新 =====
  function updateDetailNumbers() {
    // 刷新标签（ID→i18n key 映射）
    const labelMap = { 'dl-input':'input','dl-output':'output','dl-total':'total','dl-cost':'estCost','dl-cache':'cacheEntries' };
    Object.entries(labelMap).forEach(([id, key]) => { const el = document.getElementById(id); if (el) el.textContent = t(key); });
    ['dl-source','dl-target'].forEach(id => { const el = document.getElementById(id); if (el) el.textContent = t(id.replace('dl-','')); });
    const optA = document.getElementById('opt-auto'); if (optA) optA.textContent = t('autoDetect');
    chrome.storage.local.get(null, data => {
      let gi = 0, go = 0, gt = 0;
      for (const k of Object.keys(data)) if (k.startsWith('tokens_')) { gi += data[k].input || 0; go += data[k].output || 0; gt += data[k].total || 0; }
      const cost = estimateCost(gi, go), fmt = n => n >= 1000 ? `${(n / 1000).toFixed(1)}K` : String(n);
      const set = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = v; };
      set('dv-input', fmt(gi)); set('dv-output', fmt(go)); set('dv-total', fmt(gt));
      set('dv-cost', cost > 0 ? `¥${cost.toFixed(4)}` : '--'); set('dv-cache', String(translationCache.size));
    });
  }

  function updateUsageBall() {
    const bt = document.getElementById('btn-translate');
    const tg = document.getElementById('btn-toggle');
    if (tg) tg.classList.toggle('active', switchIntent);
    if (bt && !isTranslating) {
      if (showTranslation) { bt.textContent = t('translated'); bt.classList.add('done'); }
      else { bt.textContent = t('translatePage'); bt.classList.remove('done'); }
    }
    const num = document.getElementById('token-num'), hit = document.getElementById('token-hit');
    const pageLabel = document.getElementById('txt-page-tokens'), hitLabel = document.getElementById('txt-hit-rate');
    if (pageLabel) pageLabel.textContent = t('pageTokens');
    if (hitLabel) hitLabel.textContent = t('hitRate');
    if (!num || !hit) return;
    const fmt = n => n >= 1000 ? `${(n / 1000).toFixed(1)}K` : String(n);
    const hr = pageTokens.cacheHits + pageTokens.apiCalls > 0 ? Math.round(pageTokens.cacheHits / (pageTokens.cacheHits + pageTokens.apiCalls) * 100) : 0;
    num.textContent = fmt(pageTokens.total || 0);
    hit.textContent = `${t('hitRate')} ${hr}%`;
    hit.classList.toggle('zero', hr === 0);
  }

  function showToast(type, msg) {
    const stack = document.getElementById('lf-toast-stack'); if (!stack) return;
    const el = document.createElement('div'); el.className = 'lf-glass lf-toast ' + type;
    el.innerHTML = '<span>' + msg + '</span>'; stack.appendChild(el);
    void el.offsetWidth; el.classList.add('show');
    setTimeout(() => { el.classList.remove('show'); setTimeout(() => el.remove(), 260); }, 3000);
  }

  // ===== 文本收集（省略，同之前） =====
  function isVisible(el) {
    if (!el?.isConnected) return false;
    const s = window.getComputedStyle(el);
    if (s.display === 'none' || s.visibility === 'hidden') return false;
    return !(el.getBoundingClientRect().width === 0 && el.getBoundingClientRect().height === 0);
  }
  function isInViewport(el, m) {
    if (!el?.isConnected) return false; const r = el.getBoundingClientRect();
    if (r.width === 0 && r.height === 0) return false;
    const margin = m ?? window.innerHeight;
    return r.bottom >= -margin && r.top <= window.innerHeight + margin;
  }
  function shouldSkip(el) {
    if (EXCLUDE_TAGS.has(el.tagName)) return true;
    if (el.closest('[id^="lf-"],[id^="linguaflow"]')) return true;
    if (el.isContentEditable || el.closest('[contenteditable="true"]')) return true;
    return false;
  }
  function isTranslatable(text) {
    const t = text.trim(); if (!t || t.length < 3) return false;
    if (RE_SYMBOLS.test(t)) return false;
    if (RE_URL.test(t)) return false;
    // 跳过测试/调试文本（如 Amazon 的 "Test: amzn-xxx"）
    if (/^Test[: ]/i.test(t)) return false;
    if (/^[a-z]+-[a-z]+-[a-z]+$/.test(t) && t.length > 15) return false; // 长 CSS class 名
    // 目标语言 CJK → 检查是否已翻译（对纯英文文本短路跳过此检查）
    const targetLang = settings.targetLang || 'zh-CN';
    if (['zh-CN','zh-TW','ja','ko'].includes(targetLang) && /[一-鿿]/.test(t)) {
      let cjk = 0;
      for (const ch of t) { if (ch >= '一' && ch <= '鿿') cjk++; }
      if (cjk / t.length > 0.3) return false; // CJK 占比超 30% → 已翻译
      if (cjk > 0 && !/[a-zA-Z]{3,}/.test(t)) return false; // 有 CJK 但无英文词 → 目标语言
    }
    return RE_LETTER.test(t);
  }
  function collectTextNodes(root, opts = {}) {
    const { minLen = 3, viewportOnly = false, viewportMargin } = opts;
    const result = []; const w = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    const rectCache = new Map(), styleCache = new Map();
    while (w.nextNode()) {
      const node = w.currentNode, parent = node.parentElement;
      if (!parent) continue; if (shouldSkip(parent)) continue;
      // 跳过不可见元素（缓存 style 减少 getComputedStyle 调用）
      let vis = styleCache.get(parent);
      if (vis === undefined) { vis = isVisible(parent); styleCache.set(parent, vis); }
      if (!vis) continue;
      const text = node.textContent.trim();
      if (text.length < minLen) continue; if (!isTranslatable(text)) continue;
      if (translationMap.has(node) || inFlightNodes.has(node)) continue;
      // 缓存 rect：同父元素复用
      let rect = rectCache.get(parent);
      if (!rect) { rect = parent.getBoundingClientRect(); rectCache.set(parent, rect); }
      if (viewportOnly) {
        if (rect.width === 0 && rect.height === 0) continue;
        const m = viewportMargin ?? window.innerHeight;
        if (rect.bottom < -m || rect.top > window.innerHeight + m) continue;
      }
      result.push({ node, text, y: rect.top, parent });
    }
    result.sort((a, b) => a.y - b.y);

    const merged = [];
    for (let i = 0; i < result.length; i++) {
      const cur = result[i];
      const group = [cur];
      let j = i + 1;
      while (j < result.length && result[j].parent === cur.parent) {
        group.push(result[j]); j++;
      }
      if (group.length > 1) {
        const nodes = group.map(g => g.node);
        const text = group.map(g => g.text).join(' | ');
        merged.push({ node: nodes[0], text, y: cur.y, subNodes: nodes });
        i = j - 1;
      } else {
        merged.push({ node: cur.node, text: cur.text, y: cur.y });
      }
    }
    return merged;
  }
  function getTabId() {
    return new Promise(r => {
      if (tabId != null) { r(tabId); return; }
      chrome.runtime.sendMessage({ type: 'GET_TAB_ID' }, resp => { tabId = resp?.tabId ?? 'unknown'; r(tabId); });
    });
  }

  // ===== 日志系统 =====
  let logEntries = [];
  function log(level, msg, extra = {}) {
    const entry = { t: Date.now(), level, msg, ...extra };
    logEntries.push(entry);
    if (logEntries.length > 500) logEntries = logEntries.slice(-300); // 最多保留 500 条
    console.log(`[LF:${level}] ${msg}`, extra);
  }
  function flushLog() {
    if (!logEntries.length) return;
    chrome.storage.local.set({ lf_log: logEntries.slice(-200) }).catch(() => {});
  }
  setInterval(flushLog, 10000);
  window.addEventListener('pagehide', flushLog);
  window.addEventListener('beforeunload', flushLog);

  // ===== 翻译 =====
  async function startTranslation(transSettings, opts = {}) {
    const { continuous = true } = opts;
    if (isTranslated) restoreOriginal();
    settings = transSettings; abortController = new AbortController();
    pageTokens = { input: 0, output: 0, total: 0, cacheHits: 0, apiCalls: 0 };
    log('info', '翻译开始', { url: location.href.substring(0, 80), continuous });
    const textNodes = collectTextNodes(document.body, { viewportOnly: true, viewportMargin: 200 });
    log('info', `收集到 ${textNodes.length} 个文本节点`, { viewport: '200px' });
    const inputEls = document.body.querySelectorAll('input[type="submit"], input[type="button"], button:not(:empty), [role="button"]');
    for (const el of inputEls) {
      if (shouldSkip(el)) continue;
      const v = (el.value || '').trim();
      if (v.length < 3 || !isTranslatable(v)) continue;
      if (!isInViewport(el, 200)) continue;
      textNodes.push({ node: el, text: v, y: el.getBoundingClientRect().top, isInput: true });
    }
    textNodes.sort((a, b) => a.y - b.y);

    if (!textNodes.length) { showToast('warning', '⚠️ ' + t('noText')); return; }
    const stats = await translateAndApply(textNodes, textNodes.length);
    if (abortController.signal.aborted) return;
    isTranslated = true; isTranslating = false;
    if (continuous) { startScrollObserver(); startMutationObserver(); }
    updateUsageBall();
    log('info', `翻译完成: ${stats.completed} 段, API ${stats.apiTime.toFixed(0)}ms, 缓存命中 ${stats.cacheHits}, 失败 ${stats.failed}`, { pageTokens });
    if (!stats.allCached) {
      const ok = stats.completed - stats.failed;
      showToast('success', stats.failed ? `✅ ${ok}/${stats.completed} ${t('segments')} (${stats.failed} ${t('failed')})` : `✅ ${t('completed')} (${stats.completed} ${t('segments')})`);
    }
  }

  async function translateAndApply(textNodes, totalForProgress) {
    let apiTime = 0, cacheHits = 0, completed = 0, failed = 0;
    const CONCURRENCY = 3;
    if (!abortController || abortController.signal.aborted) abortController = new AbortController();
    for (const tn of textNodes) inFlightNodes.add(tn.node);
    isTranslating = true;
    try {
      const toTranslate = [];
      for (let i = 0; i < textNodes.length; i++) {
        const tn = textNodes[i];
        if (translationCache.has(tn.text)) { applyTranslation(tn.node, tn.text, translationCache.get(tn.text), tn.subNodes); cacheHits++; completed++; }
        else toTranslate.push({ ...tn, id: String(i) });
      }
      pageTokens.cacheHits += cacheHits;
      if (!toTranslate.length) { window._lfSetProgress?.(completed, textNodes.length); return { apiTime, cacheHits, completed, failed, allCached: true }; }
      const batches = []; let cur = { items: [], chars: 0 }, limit = 400;
      for (const tn of toTranslate) {
        if (cur.chars + tn.text.length > limit && cur.items.length) { batches.push(cur); cur = { items: [], chars: 0 }; if (batches.length >= 2) limit = 800; }
        cur.items.push(tn); cur.chars += tn.text.length;
      }
      if (cur.items.length) batches.push(cur);
      let nextIdx = 0;
      async function processBatch(batch) {
        if (abortController.signal.aborted) throw new DOMException('Aborted', 'AbortError');
        const reallyNeed = [];
        for (const item of batch.items) {
          if (translationCache.has(item.text)) { applyTranslation(item.node, item.text, translationCache.get(item.text), item.subNodes); cacheHits++; completed++; }
          else reallyNeed.push(item);
        }
        if (!reallyNeed.length) return;
        const t = performance.now();
        log('api', `API 请求: ${reallyNeed.length} 条, ${reallyNeed.reduce((s,i)=>s+i.text.length,0)} 字符`);
        const result = await translateBatch(reallyNeed); apiTime += performance.now() - t;
        if (result) {
          for (const item of reallyNeed) { const tr = result[item.id]; if (tr) {
            if (tr !== item.text) { applyTranslation(item.node, item.text, tr, item.subNodes); }
            else {
              // 原文返回：也要写入 translationMap（Ctrl+hover 需要）
              if (item.subNodes) { for (const sn of item.subNodes) translationMap.set(sn, { original: sn.textContent ? sn.textContent.trim() : (sn.value||'').trim() }); }
              else { translationMap.set(item.node, { original: item.text }); untranslatedNodes.add(item.node); }
            }
            translationCache.set(item.text, tr); markCacheDirty();
          } }
        } else { failed += reallyNeed.length; }
        completed += reallyNeed.length;
        window._lfSetProgress?.(completed, textNodes.length);
      }
      async function worker() {
        while (nextIdx < batches.length) { if (abortController.signal.aborted) return; const idx = nextIdx++; try { await processBatch(batches[idx]); } catch (e) { if (e.name === 'AbortError') return; failed += batches[idx].items.length; completed += batches[idx].items.length; } }
      }
      await Promise.all(Array.from({ length: Math.min(CONCURRENCY, batches.length) }, () => worker()));
    } finally {
      for (const tn of textNodes) inFlightNodes.delete(tn.node);
      isTranslating = false;
    }
    return { apiTime, cacheHits, completed, failed };
  }

  function translateBatch(items) {
    return new Promise((resolve, reject) => {
      try {
        chrome.runtime.sendMessage({
          type: 'BATCH_TRANSLATE', items: items.map(it => ({ id: it.id, text: it.text })),
          settings: { apiKey: settings.apiKey, apiUrl: settings.apiUrl, model: settings.model, sourceLang: settings.sourceLang, targetLang: settings.targetLang },
        }, resp => {
          if (chrome.runtime.lastError) {
            if (chrome.runtime.lastError.message?.includes('context invalidated')) {
              console.warn('[LinguaFlow] 扩展已更新，请刷新页面');
            }
            reject(new Error(chrome.runtime.lastError.message));
          }
          else if (resp?.success) { if (resp.usage) addPageTokens(resp.usage); resolve(resp.translations); }
          else reject(new Error(resp?.error || '翻译失败'));
        });
      } catch (e) { reject(e); }
    });
  }

  function applyTranslation(node, originalText, translatedText, subNodes) {
    if (subNodes && subNodes.length > 1) {
      const parts = translatedText.split(' | ');
      for (let i = 0; i < subNodes.length; i++) {
        const part = (parts[i] || '').trim();
        const orig = subNodes[i].textContent ? subNodes[i].textContent.trim() : (subNodes[i].value || '').trim();
        if (subNodes[i].nodeType === Node.ELEMENT_NODE) { subNodes[i].value = part || orig; }
        else { subNodes[i].textContent = part || orig; }
        translationMap.set(subNodes[i], { original: orig });
      }
      const p = node.parentElement || node;
      if (p && p.setAttribute) p.setAttribute('data-linguaflow-translated', 'true');
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      // input 元素：设置 value
      translationMap.set(node, { original: originalText });
      node.value = translatedText;
      if (node.setAttribute) node.setAttribute('data-linguaflow-translated', 'true');
    } else {
      translationMap.set(node, { original: originalText });
      node.textContent = translatedText;
      const p = node.parentElement;
      if (p) { p.setAttribute('data-linguaflow-translated', 'true'); }
    }
  }

  function restoreOriginal() {
    if (abortController) abortController.abort();
    for (const [node, data] of translationMap) {
      if (node.nodeType === Node.ELEMENT_NODE) node.value = data.original;
      else node.textContent = data.original;
    }
    translationMap.clear(); isTranslated = false; isTranslating = false;
  }

  // ===== 缓存持久化 =====
  let cacheDirty = false;
  function markCacheDirty() { cacheDirty = true; }
  async function flushCache() {
    if (!cacheDirty) return; cacheDirty = false;
    const entries = []; const now = Date.now();
    for (const [k, v] of translationCache) entries.push({ k, v, t: now });
    if (entries.length > 2000) { entries.sort((a, b) => b.t - a.t); entries.length = 2000; }
    await chrome.storage.local.set({ translation_cache: entries }).catch(() => {});
  }
  setInterval(flushCache, 30000);
  window.addEventListener('pagehide', flushCache); window.addEventListener('beforeunload', flushCache);
  async function loadPersistentCache() {
    // 检查语言是否切换——切换了则清除旧缓存
    const langKey = 'last_target_lang';
    const r = await chrome.storage.local.get([langKey, 'translation_cache']);
    const currentLang = (await chrome.storage.sync.get('targetLang')).targetLang || 'zh-CN';
    if (r[langKey] && r[langKey] !== currentLang) {
      console.log(`[LinguaFlow] 语言切换: ${r[langKey]} → ${currentLang}, 清除缓存`);
      translationCache.clear();
      await chrome.storage.local.remove('translation_cache');
    }
    await chrome.storage.local.set({ [langKey]: currentLang });

    if (r.translation_cache && Array.isArray(r.translation_cache)) { const now = Date.now(); let n = 0; for (const e of r.translation_cache) { if (!e.k || !e.v) continue; if (now - e.t > 3600000) continue; if (!translationCache.has(e.k)) { translationCache.set(e.k, e.v); n++; } } if (n) console.log('[LinguaFlow] 缓存加载:', n); }
  }

  // ===== 观察器 =====
  function startScrollObserver() {
    const scan = async () => {
      if (!isTranslated || isTranslating) return;
      const nodes = collectTextNodes(document.body, { viewportOnly: true, viewportMargin: window.innerHeight * 1.5 });
      if (!nodes.length) return;
      log('scan', `滚动扫描: ${nodes.length} 个新节点`);
      await translateAndApply(nodes, nodes.length);
    };
    // 滚动：200ms 防抖，快速响应
    window.addEventListener('scroll', () => { clearTimeout(scrollTimer); scrollTimer = setTimeout(scan, 200); }, { passive: true });

    // hover 菜单检测：攒够一批再发，避免单条请求
    let hoverQueue = [];
    let hoverFlushTimer = null;
    function checkHover(e) {
      if (!isTranslated || isTranslating) return;
      clearTimeout(hoverFlushTimer);
      hoverFlushTimer = setTimeout(() => {
        if (!hoverQueue.length || isTranslating) return;
        if (hoverQueue.length < 3) return; // 不够 3 条就等下批
        const batch = [...hoverQueue]; hoverQueue = [];
        const seen = new Set();
        const unique = batch.filter(n => { const k = n.node; if (seen.has(k)) return false; seen.add(k); return true; });
        if (unique.length) translateAndApply(unique, unique.length);
      }, 300);
      const el = document.elementFromPoint(e.clientX, e.clientY);
      if (!el || el.closest('[id^="lf-"]')) return;
      // 只看当前屏幕可见的（不翻译视野外内容）
      const nodes = collectTextNodes(el, { viewportOnly: true, viewportMargin: 0 });
      if (nodes.length) hoverQueue.push(...nodes);
    }
    document.addEventListener('mouseover', checkHover, { passive: true });
    document.addEventListener('mousemove', checkHover, { passive: true });
  }
  function startMutationObserver() {
    if (mutationObserver) return;
    let startedAt = Date.now();
    mutationObserver = new MutationObserver(mutations => {
      if (Date.now() - startedAt < 3000) return; // 前 3 秒冷却，忽略初始 DOM 震荡
      let hasNew = false;
      for (const m of mutations) for (const node of m.addedNodes) {
        if (node.nodeType === Node.ELEMENT_NODE) { const found = collectTextNodes(node, { viewportOnly: true, viewportMargin: window.innerHeight }); if (found.length) { pendingNodes.push(...found); hasNew = true; } }
      }
      if (hasNew) { clearTimeout(pendingTimer); pendingTimer = setTimeout(translatePending, 800); }
    });
    mutationObserver.observe(document.body, { childList: true, subtree: true });
  }
  async function translatePending() { if (!pendingNodes.length || !isTranslated || isTranslating) return; const nodes = [...pendingNodes]; pendingNodes = []; await translateAndApply(nodes, nodes.length); }

  // ===== 消息/Tab/启动 =====
  chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
    switch (msg.type) {
      case 'START_TRANSLATION': sendResponse({ success: true }); showTranslation = true; updateUsageBall(); startTranslation(msg.settings, { continuous: true }).catch(e => console.error(e)); break;
      case 'RESTORE_PAGE': restoreOriginal(); showTranslation = false; updateUsageBall(); showToast('warning', t('restored')); sendResponse({ success: true }); break;
      case 'GET_STATUS': sendResponse({ isTranslated, isTranslating }); break;
      case 'UI_LANG_CHANGED':
        if (msg.uiLang && msg.uiLang !== uiLang) {
          uiLang = msg.uiLang;
          updateAllUIText();
          updateUsageBall();
          updateDetailNumbers();
          const sel = document.getElementById('lf-ui-lang');
          if (sel) sel.value = uiLang;
        }
        break;
    }
  });
  async function saveTabMode(on) { const id = await getTabId(); await chrome.storage.local.set({ [`tmode_${id}`]: on }); }
  async function getTabMode() { const id = await getTabId(); const r = await chrome.storage.local.get(`tmode_${id}`); return r[`tmode_${id}`] || false; }
  async function loadAndTranslate(opts = {}) {
    const r = await chrome.storage.sync.get({ apiKey: '', apiUrl: 'https://api.deepseek.com/v1', model: 'deepseek-chat', sourceLang: 'auto', targetLang: 'zh-CN', hoverOriginal: true, showProgress: true });
    if (!r.apiKey) { showToast('error', '⚠️ ' + t('noKey')); return; }
    settings = r; abortController = new AbortController();
    try { await startTranslation(r, opts); } catch (e) { console.error(e); updateUsageBall(); }
  }
  function estimateCost(input, output) { const p = { 'deepseek-chat': [1, 2], 'deepseek-reasoner': [4, 16] }[settings.model] || [1, 2]; return (input / 1e6) * p[0] + (output / 1e6) * p[1]; }
  function addPageTokens(u) { if (!u) return; pageTokens.input += u.prompt_tokens || 0; pageTokens.output += u.completion_tokens || 0; pageTokens.total += u.total_tokens || 0; pageTokens.apiCalls++; updateUsageBall(); }

  buildUI();
  (async () => {
    // 加载 UI 语言
    const stored = await chrome.storage.sync.get('uiLang');
    if (stored.uiLang && stored.uiLang !== uiLang) {
      uiLang = stored.uiLang;
      updateAllUIText();
      const sel = document.getElementById('lf-ui-lang');
      if (sel) sel.value = uiLang;
    }
    await getTabId(); await loadPersistentCache();
    if (await getTabMode()) { switchIntent = true; showTranslation = true; updateUsageBall(); setTimeout(() => loadAndTranslate({ continuous: true }), 800); }
  })();
  // ===== Ctrl+解释：独立模块，不依赖翻译状态 =====
  let insertedExplanations = [];

  function handleExplainPoint(e) {
    if (!e.ctrlKey && !e.metaKey) return;
    const el = document.elementFromPoint(e.clientX, e.clientY);
    if (!el || el.closest('[id^="lf-"],.lf-inline-explain')) return;

    // 找到光标下的所有文本节点
    const tw = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    const candidates = [];
    while (tw.nextNode()) candidates.push(tw.currentNode);

    // 精确定位
    let node = candidates[0], offset = candidates[0]?.textContent.length >> 1 || 0;
    const range = document.caretRangeFromPoint(e.clientX, e.clientY);
    if (range && range.startContainer.nodeType === Node.TEXT_NODE && candidates.includes(range.startContainer)) {
      node = range.startContainer; offset = range.startOffset;
    }
    // 如果 caretRangeFromPoint 失败，向上追溯到有文本节点的父元素
    if (!candidates.length) {
      let p = el;
      while (p) {
        const w = document.createTreeWalker(p, NodeFilter.SHOW_TEXT);
        const n = w.nextNode();
        if (n) { node = n; offset = n.textContent.length >> 1; break; }
        p = p.parentElement;
      }
    }
    if (!node || node.parentElement?.closest('[id^="lf-"]')) return;

    const text = node.textContent;
    const pos = Math.min(offset, text.length - 1);

    // 提取词组：英文到 CJK 边界，中文到非 CJK 边界
    let s = pos, end = pos;
    const isCJK = /[一-鿿぀-ゟ가-힯]/.test(text[pos]);
    if (isCJK) {
      while (s > 0 && /[一-鿿぀-ゟ가-힯]/.test(text[s - 1])) s--;
      while (end < text.length && /[一-鿿぀-ゟ가-힯]/.test(text[end])) end++;
    } else {
      while (s > 0 && !/[一-鿿぀-ゟ가-힯\s]/.test(text[s - 1])) s--;
      while (end < text.length && !/[一-鿿぀-ゟ가-힯\s]/.test(text[end])) end++;
    }
    let phrase = text.substring(s, end).trim().replace(/^[,\s]+|[,\s]+$/g, '');
    if (!phrase || phrase.length < 2) return;

    // 去重
    if (insertedExplanations.some(el => el.dataset.lfWord === phrase)) return;

    // 占位插入
    const parent = node.parentElement;
    if (!parent || end <= 0 || end > text.length) return;
    let placeholder;
    try {
      placeholder = document.createElement('i');
      placeholder.style.cssText = 'color:#9061f9;font-size:0.9em;font-style:italic;';
      placeholder.textContent = '（…）';
      placeholder.dataset.lfWord = phrase;
      placeholder.className = 'lf-inline-explain';
      if (end < text.length) {
        const after = node.splitText(end);
        parent.insertBefore(placeholder, after);
      } else {
        parent.appendChild(placeholder);
      }
      insertedExplanations.push(placeholder);
    } catch { return; }

    // 异步解释（用 UI 语言，不依赖设置的目标语言）
    const domain = location.hostname.replace('www.','');
    const nearbyText = text.substring(Math.max(0, s - 30), Math.min(text.length, end + 50)).replace(/\s+/g,' ').trim();
    if (explainCache.has(phrase)) {
      placeholder.textContent = '（' + explainCache.get(phrase) + '）';
    } else {
      loadSettingsForExplain().then(cfg => {
        if (!cfg.apiKey) return;
        // 上下文排除已插入的解释标记
        const cleanText = text.replace(/（[^）]*）/g, '').replace(/\s+/g,' ').trim();
        // 取完整上下文（200-300 字符），让 AI 结合整段文字理解词义
        const ctx = cleanText.substring(Math.max(0, s - 100), Math.min(cleanText.length, end + 150));

        chrome.runtime.sendMessage({
          type: 'EXPLAIN_WORD', word: phrase, domain, nearbyText: ctx,
          settings: { apiKey: cfg.apiKey, apiUrl: cfg.apiUrl, model: cfg.model, targetLang: cfg.targetLang || 'zh-CN' },
        }, resp => {
          if (resp?.success && resp.explanation) {
            if (resp.usage) addPageTokens(resp.usage);
            const stripped = resp.explanation.trim().replace(/[，。！？、：；""'']/g, '').toLowerCase();
            const final = (stripped === phrase.toLowerCase()) ? '(无法解释)' : resp.explanation;
            explainCache.set(phrase, final);
            if (placeholder.isConnected) placeholder.textContent = '（' + final + '）';
          }
        });
      });
    }
  }

  async function loadSettingsForExplain() {
    if (settings.apiKey) return settings;
    return await chrome.storage.sync.get({ apiKey:'', apiUrl:'https://api.deepseek.com/v1', model:'deepseek-chat', targetLang:'zh-CN' });
  }

  // 三重检测：mousemove、mouseover、keydown（覆盖鼠标不动按 Ctrl 的场景）
  let lastMX = 0, lastMY = 0;
  document.addEventListener('mousemove', e => {
    lastMX = e.clientX; lastMY = e.clientY;
    if (e.ctrlKey || e.metaKey) handleExplainPoint(e);
  }, { passive: true });
  document.addEventListener('mouseover', e => {
    lastMX = e.clientX; lastMY = e.clientY;
    if (e.ctrlKey || e.metaKey) handleExplainPoint(e);
  }, { passive: true });
  document.addEventListener('keydown', e => {
    if (e.key === 'Control' || e.key === 'Meta') {
      handleExplainPoint({ clientX: lastMX, clientY: lastMY, ctrlKey: e.key === 'Control', metaKey: e.key === 'Meta' });
    }
  });

  // Ctrl 松开 → 不清除解释（解释是永久插入的）


  // Esc：翻译中取消翻译，否则清除所有解释
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') {
      if (isTranslating && abortController) { abortController.abort(); return; }
      for (const el of insertedExplanations) el.remove();
      insertedExplanations = [];
    }
  });
  console.log('🌐 LinguaFlow 已加载');
})();
