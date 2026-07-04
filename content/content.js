/**
 * LinguaFlow — Open Design v2
 * 收折：wrapper 容器 + 迷你球 + 发光 + 绝对定位进度条
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
  let mode = 'medium'; // medium | high
  const MODES = { medium:{ concurrency:3, viewportMargin:200, fullPage:false, scroll:true, hover:true, mutation:true, batchLimit:400 }, high:{ concurrency:8, viewportMargin:0, fullPage:true, scroll:false, hover:false, mutation:true, batchLimit:250 } };
  let tabId = null;
  let expanded = false, dragState = null, dragMoved = false;
  let uiLang = 'zh-CN';
  let untranslatedNodes = new Set();
  let explainCache = new Map();
  let inFlightWords = new Set();
  let explainBubble = null;

  // ===== 多语言 =====
  function T(z,t,e,j,k,f,d,s,p,r,a,h,T,v,i,n,l,u,b,c){return{'zh-CN':z,'zh-TW':t||z,en:e,ja:j,ko:k,fr:f||e,de:d||e,es:s||e,pt:p||e,ru:r||e,ar:a||e,hi:h||e,th:T||e,vi:v||e,it:i||e,nl:n||e,pl:l||e,tr:u||e,id:b||e,sv:c||e}}
  const I18N={autoTranslate:T('自动翻译','自動翻譯','Auto Translate','自動翻訳','자동 번역','Auto Traduire','Auto-Übersetzung','Auto Traducir','Auto Traduzir','Автоперевод','ترجمة تلقائية','स्वतः अनुवाद','แปลอัตโนมัติ','Tự động dịch','Auto Traduci','Auto Vertalen','Auto tłumacz','Otomatik Çeviri','Terjemahan Otomatis','Autoöversätt'),translatePage:T('翻译本页','翻譯本頁','Translate','翻訳','번역','Traduire','Übersetzen','Traducir','Traduzir','Перевести','ترجمة','अनुवाद','แปล','Dịch','Traduci','Vertalen','Tłumacz','Çevir','Terjemahkan','Översätt'),translated:T('已翻译','已翻譯','Translated','翻訳済','번역됨','Traduit','Übersetzt','Traducido','Traduzido','Переведено','مترجم','अनुवादित','แปลแล้ว','Đã dịch','Tradotto','Vertaald','Przetłumaczono','Çevrildi','Diterjemahkan','Översatt'),translating:T('翻译中…','翻譯中…','Translating…','翻訳中…','번역 중…','Traduction…','Übersetze…','Traduciendo…','Traduzindo…','Перевод…','جارٍ الترجمة…','अनुवाद हो रहा…','กำลังแปล…','Đang dịch…','Traduzione…','Bezig met vertalen…','Tłumaczenie…','Çevriliyor…','Menerjemahkan…','Översätter…'),canceled:T('翻译已取消','翻譯已取消','Translation canceled','翻訳キャンセル','번역 취소됨','Traduction annulée','Übersetzung abgebrochen','Traducción cancelada','Tradução cancelada','Перевод отменен','تم إلغاء الترجمة','अनुवाद रद्द','ยกเลิกการแปล','Đã hủy dịch','Traduzione annullata','Vertaling geannuleerd','Anulowano tłum.','Çeviri iptal edildi','Terjemahan dibatalkan','Översättning avbruten'),noText:T('未找到可翻译文本','未找到可翻譯文本','No translatable text','翻訳可能なテキストなし','번역 가능한 텍스트 없음','Aucun texte traduisible','Kein übersetzbarer Text','Sin texto traducible','Sem texto traduzível','Нет текста','لا يوجد نص قابل للترجمة','अनुवाद योग्य पाठ नहीं','ไม่มีข้อความที่แปลได้','Không có văn bản','Nessun testo traducibile','Geen vertaalbare tekst','Brak tekstu','Çevrilecek metin yok','Tidak ada teks','Ingen översättbar text'),noKey:T('请先配置 API Key','請先配置 API Key','Configure API Key','APIキーを設定してください','API 키 설정 필요','Configurer clé API','API-Schlüssel konfigurieren','Configurar API Key','Configurar Chave API','Настроить API','تكوين مفتاح API','API कुंजी कॉन्फ़िगर करें','ตั้งค่า API Key','Cấu hình API Key','Configura chiave API','API-sleutel configureren','Skonfiguruj klucz API','API Anahtarını Yapılandır','Konfigurasi API Key','Konfigurera API-nyckel'),completed:T('翻译完成','翻譯完成','Translation complete','翻訳完了','번역 완료','Traduction terminée','Übersetzung abgeschlossen','Traducción completa','Tradução concluída','Перевод завершен','اكتملت الترجمة','अनुवाद पूर्ण','แปลเสร็จ','Dịch xong','Traduzione completata','Vertaling voltooid','Tłumaczenie gotowe','Çeviri tamamlandı','Terjemahan selesai','Översättning klar'),failed:T('失败','失敗','failed','失敗','실패','échec','fehlgeschlagen','falló','falhou','Ошибка','فشل','विफल','ล้มเหลว','thất bại','fallito','mislukt','niepowodzenie','başarısız','gagal','misslyckades'),segments:T('段','段','segments','件','개','segments','Segmente','segmentos','segmentos','сегментов','مقاطع','खंड','ส่วน','đoạn','segmenti','segmenten','segmenty','bölüm','segmen','segment'),settings:T('翻译设置','翻譯設定','Settings','設定','설정','Paramètres','Einstellungen','Ajustes','Configurações','Настройки','الإعدادات','सेटिंग्स','ตั้งค่า','Cài đặt','Impostazioni','Instellingen','Ustawienia','Ayarlar','Pengaturan','Inställningar'),history:T('历史token用量','歷史token用量','Token History','トークン履歴','토큰 기록','Historique des jetons','Token-Verlauf','Historial de Tokens','Histórico de Tokens','История токенов','سجل الرموز','टोकन इतिहास','ประวัติโทเค็น','Lịch sử Token','Cronologia token','Token Geschiedenis','Historia tokenów','Token Geçmişi','Riwayat Token','Tokenhistorik'),clearCache:T('清除缓存','清除快取','Clear Cache','キャッシュ削除','캐시 삭제','Vider le cache','Cache leeren','Limpiar Caché','Limpar Cache','Очистить кэш','مسح الذاكرة المؤقتة','कैश साफ़ करें','ล้างแคช','Xóa Cache','Cancella cache','Cache wissen','Wyczyść pamięć','Önbelleği Temizle','Hapus Cache','Rensa cache'),cacheCleared:T('缓存已清除','快取已清除','Cache cleared','キャッシュ削除済','캐시 삭제됨','Cache vidé','Cache geleert','Caché limpiada','Cache limpo','Кэш очищен','تم المسح','कैश साफ़ हुआ','ล้างแคชแล้ว','Đã xóa Cache','Cache cancellata','Cache gewist','Pamięć wyczyszczona','Önbellek temizlendi','Cache dihapus','Cache rensad'),pageTokens:T('本页token消耗','本頁token消耗','Page tokens','ページトークン','페이지 토큰','Jetons de page','Seiten-Token','Tokens de página','Tokens da página','Токены страницы','رموز الصفحة','पृष्ठ टोकन','โทเค็นหน้า','Token trang','Token pagina','Paginatokens','Tokeny strony','Sayfa tokenları','Token halaman','Sidtoken'),hitRate:T('缓存命中率','快取命中率','Cache hit rate','キャッシュヒット率','캐시 적중률','Taux de succès du cache','Cache-Trefferquote','Tasa de aciertos','Taxa de acerto do cache','Попадания в кэш','معدل الوصول للذاكرة','कैश हिट दर','อัตราแคชฮิต','Tỉ lệ cache','Tasso di hit cache','Cache hitratio','Trafność pamięci','Önbellek isabet oranı','Rasio cache','Cacheträffar'),langSwitch:T('语言切换至','語言切換至','Language:','言語変更:','언어 변경:','Langue :','Sprache:','Idioma:','Idioma:','Язык:','اللغة:','भाषा:','ภาษา:','Ngôn ngữ:','Lingua:','Taal:','Język:','Dil:','Bahasa:','Språk:'),cacheClearedSwitch:T('，缓存已清除','，快取已清除',', cache cleared','、キャッシュ削除済',', 캐시 삭제됨','cache vidé','Cache geleert','caché limpiada','cache limpo','кэш очищен','تم مسح الذاكرة المؤقتة','कैश साफ़ हुआ','ล้างแคชแล้ว','đã xóa cache','cache cancellata','cache gewist','pamięć wyczyszczona','önbellek temizlendi','cache dihapus','cache rensad'),input:T('输入','輸入','Input','入力','입력','Entrée','Eingabe','Entrada','Entrada','Ввод','الإدخال','इनपुट','อินพุต','Đầu vào','Input','Invoer','Wejście','Giriş','Masukan','Indata'),output:T('输出','輸出','Output','出力','출력','Sortie','Ausgabe','Salida','Saída','Вывод','الإخراج','आउटपुट','เอาต์พุต','Đầu ra','Output','Uitvoer','Wyjście','Çıkış','Keluaran','Utdata'),total:T('总计','總計','Total','合計','합계','Total','Gesamt','Total','Total','Всего','المجموع','कुल','รวม','Tổng','Totale','Totaal','Razem','Toplam','Total','Totalt'),estCost:T('预估费用','預估費用','Est. cost','推定費用','예상 비용','Coût estimé','Geschätzte Kosten','Costo est.','Custo estimado','Ориент. стоимость','التكلفة التقريبية','अनुमानित लागत','ค่าใช้จ่ายโดยประมาณ','Chi phí ước tính','Costo stimato','Geschatte kosten','Szac. koszt','Tah. maliyet','Perkiraan biaya','Beräknad kostnad'),cacheEntries:T('缓存条目','快取條目','Cache entries','キャッシュ項目','캐시 항목','Entrées du cache','Cache-Einträge','Entradas de caché','Entradas de cache','Записей в кэше','إدخالات الذاكرة','कैश प्रविष्टियाँ','รายการแคช','Mục cache','Voci cache','Cache-items','Wpisy pamięci','Önbellek girişleri','Entri cache','Cacheposter'),restored:T('已还原原文','已還原原文','Original restored','原文に戻した','원문 복원됨','Original restauré','Original wiederhergestellt','Original restaurado','Original restaurado','Оригинал восстановлен','تمت استعادة الأصل','मूल पुनर्स्थापित','คืนค่าต้นฉบับแล้ว','Đã khôi phục gốc','Originale ripristinato','Origineel hersteld','Przywrócono oryginał','Orijinal geri yüklendi','Asli dipulihkan','Original återställt'),autoDetect:T('自动检测','自動檢測','Auto Detect','自動検出','자동 감지','Détection auto','Automatisch erkennen','Detectar auto.','Detecção Automática','Автоопределение','كشف تلقائي','स्वतः पहचान','ตรวจจับอัตโนมัติ','Tự động phát hiện','Rilevamento automatico','Automatisch detecteren','Auto wykrywanie','Otomatik Algıla','Deteksi Otomatis','Autodetektera'),source:T('源语种','源語種','Source','ソース','소스','Source','Quelle','Origen','Origem','Исходный','المصدر','स्रोत','ต้นทาง','Nguồn','Sorgente','Bron','Źródło','Kaynak','Sumber','Källa'),target:T('目标语种','目標語種','Target','ターゲット','타겟','Cible','Ziel','Destino','Destino','Целевой','الهدف','लक्ष्य','ปลายทาง','Đích','Destinazione','Doel','Cel','Hedef','Target','Mål'),autoShort:T('自动','自動','Auto','自動','자동','Auto','Auto','Auto','Auto','Авто','تلقائي','स्वतः','อัตโนมัติ','Tự động','Auto','Auto','Auto','Otomatik','Otomatis','Auto'),apiError:T('⚠️ API 错误','⚠️ API 錯誤','⚠️ API Error','⚠️ APIエラー','⚠️ API 오류','⚠️ Erreur API','⚠️ API-Fehler','⚠️ Error de API','⚠️ Erro da API','⚠️ Ошибка API','⚠️ خطأ API','⚠️ API त्रुटि','⚠️ ข้อผิดพลาด API','⚠️ Lỗi API','⚠️ Errore API','⚠️ API-fout','⚠️ Błąd API','⚠️ API Hatası','⚠️ Kesalahan API','⚠️ API-fel'),modeLabel:T('翻译模式','翻譯模式','Mode','翻訳モード','번역 모드','Mode','Modus','Modo','Modo','Режим','الوضع','मोड','โหมด','Chế độ','Modalità','Modus','Tryb','Mod','Mode','Läge'),modeLow:T('🛡️ 低并发（省 token）','🛡️ 低並發（省 token）','🛡️ Eco (save tokens)','🛡️ エコ（トークン節約）','🛡️ 절약 (토큰 절약)','🛡️ Éco (économiser)','🛡️ Sparsam (Token sparen)','🛡️ Eco (ahorrar)','🛡️ Eco (poupar)','🛡️ Эконом','🛡️ اقتصاد','🛡️ इको','🛡️ ประหยัด','🛡️ Tiết kiệm','🛡️ Eco','🛡️ Zuinig','🛡️ Oszczędny','🛡️ Tasarruf','🛡️ Hemat','🛡️ Snål'),modeMedium:T('⚡ 标准模式','⚡ 標準模式','⚡ Standard','⚡ 標準','⚡ 표준','⚡ Standard','⚡ Standard','⚡ Estándar','⚡ Padrão','⚡ Стандарт','⚡ قياسي','⚡ मानक','⚡ มาตรฐาน','⚡ Tiêu chuẩn','⚡ Standard','⚡ Standaard','⚡ Standardowy','⚡ Standart','⚡ Standar','⚡ Standard'),modeHigh:T('🚀 极速模式','🚀 極速模式','🚀 Turbo','🚀 高速','🚀 터보','🚀 Turbo','🚀 Turbo','🚀 Turbo','🚀 Turbo','🚀 Турбо','🚀 توربو','🚀 टर्बो','🚀 เทอร์โบ','🚀 Turbo','🚀 Turbo','🚀 Turbo','🚀 Turbo','🚀 Turbo','🚀 Turbo','🚀 Turbo'),modeLowDesc:T('单线程全页翻译，不监听滚动悬停，适合API限制严格','單線程全頁翻譯，不監聽滾動懸停，適合API限制嚴格','1 worker, full page. No scroll/hover detection. For strict API rate limits','シングルスレッド全ページ翻訳。スクロール/ホバー検出なし。API制限が厳しい場合に','단일 스레드 전체 페이지 번역. 스크롤/호버 감지 없음. API 제한이 엄격한 경우','1 thread, page entière. Sans détection scroll/survol. Pour limites API strictes','1 Thread, ganze Seite. Keine Scroll/Hover-Erkennung. Für strikte API-Limits','1 hilo, página completa. Sin detección scroll/hover. Para límites de API estrictos','1 thread, página inteira. Sem detecção scroll/hover. Para limites de API rígidos','1 поток, вся страница. Без отслеживания прокрутки/наведения. Для строгих лимитов API','مؤشر واحد، صفحة كاملة. لا كشف تمرير/تحويم. لقيود API الصارمة','1 वर्कर, पूरा पेज। कोई स्क्रॉल/होवर नहीं। सख्त API सीमाओं के लिए','1 เทรด ทั้งหน้า ไม่ตรวจจับการเลื่อน/ชี้ สำหรับข้อจำกัด API ที่เข้มงวด','1 luồng, toàn trang. Không phát hiện cuộn/di chuột. Cho giới hạn API nghiêm ngặt','1 thread, pagina intera. Nessun rilevamento scroll/hover. Per limiti API rigidi','1 thread, hele pagina. Geen scroll/hover detectie. Voor strikte API limieten','1 wątek, cała strona. Bez wykrywania przewijania/najechania. Dla ścisłych limitów API','1 iş parçacığı, tam sayfa. Kaydırma/gezinme algılama yok. Katı API sınırları için','1 thread, seluruh halaman. Tanpa deteksi scroll/hover. Untuk batasan API ketat','1 tråd, hel sida. Ingen scroll/hover-detektering. För strikta API-gränser'),modeMediumDesc:T('3路并发+视野优先，滚动悬停自动翻译，平衡速度与消耗','3路並發+視野優先，滾動懸停自動翻譯，平衡速度與消耗','3 workers, viewport-first. Auto-translate on scroll/hover. Balanced speed & cost','3スレッド、ビューポート優先。スクロール/ホバーで自動翻訳。速度とコストのバランス','3스레드, 뷰포트 우선. 스크롤/호버 시 자동 번역. 속도와 비용 균형','3 threads, priorité viewport. Traduction auto au scroll/survol. Vitesse/coût équilibrés','3 Threads, Viewport-Priorität. Auto-Translate bei Scroll/Hover. Ausgewogen','3 hilos, prioridad viewport. Auto al desplazar/sobrevolar. Velocidad/coste equilibrados','3 threads, prioridade viewport. Auto ao rolar/sobrevoar. Velocidade/custo equilibrados','3 потока, приоритет области просмотра. Автоперевод при прокрутке/наведении. Баланс','3 مؤشرات، أولوية العرض. ترجمة تلقائية بالتمرير/التحويم. توازن السرعة والتكلفة','3 वर्कर, व्यूपोर्ट प्राथमिकता। स्क्रॉल/होवर पर ऑटो अनुवाद। गति और लागत संतुलित','3 เทรด แปลตามวิวพอร์ตก่อน แปลอัตโนมัติเมื่อเลื่อน/ชี้ สมดุลความเร็วและค่าใช้จ่าย','3 luồng, ưu tiên viewport. Tự động dịch khi cuộn/di chuột. Cân bằng tốc độ & chi phí','3 thread, priorità viewport. Auto traduzione su scroll/hover. Velocità/costo bilanciati','3 threads, viewport-prioriteit. Auto-vertalen bij scroll/hover. Gebalanceerd','3 wątki, priorytet viewport. Auto-tłumaczenie przy scroll/hover. Zrównoważona prędkość/koszt','3 iş parçacığı, görünüm öncelikli. Kaydırma/gezinmede otomatik çeviri. Dengeli','3 thread, prioritas viewport. Terjemahan otomatis saat scroll/hover. Seimbang','3 trådar, viewport-först. Auto-översätt vid scroll/hover. Balanserat'),modeHighDesc:T('8路并发+极速全页翻译，首批秒出，不在意token消耗','8路並發+極速全頁翻譯，首批秒出，不在意token消耗','8 workers, full page turbo. Near-instant first results. Max token usage','8スレッド、全ページ高速翻訳。最初の結果が即表示。最大トークン消費','8스레드, 전체 페이지 터보. 첫 결과 즉시 표시. 최대 토큰 소비','8 threads, turbo pleine page. Premiers résultats quasi instantanés. Usage max de jetons','8 Threads, Turbo ganze Seite. Erste Ergebnisse fast sofort. Maximaler Token-Verbrauch','8 hilos, turbo página completa. Primeros resultados casi instantáneos. Máximo uso de tokens','8 threads, turbo página inteira. Primeiros resultados quase instantâneos. Uso máximo de tokens','8 потоков, турбо вся страница. Первые результаты мгновенно. Макс. расход токенов','8 مؤشرات، توربو الصفحة الكاملة. نتائج فورية تقريبًا. أقصى استخدام للرموز','8 वर्कर, फुल पेज टर्बो। पहला परिणाम लगभग तुरंत। अधिकतम टोकन','8 เทรด เทอร์โบทั้งหน้า แสดงผลแรกแทบจะทันที ใช้โทเค็นสูงสุด','8 luồng, turbo toàn trang. Kết quả đầu gần như ngay lập tức. Dùng token tối đa','8 thread, turbo pagina intera. Primi risultati quasi immediati. Massimo uso token','8 threads, turbo hele pagina. Eerste resultaten bijna direct. Maximaal token gebruik','8 wątków, turbo cała strona. Pierwsze wyniki niemal natychmiast. Maks. zużycie tokenów','8 iş parçacığı, tam sayfa turbo. İlk sonuçlar neredeyse anında. Maks. token kullanımı','8 thread, turbo seluruh halaman. Hasil pertama hampir instan. Penggunaan token maksimal','8 trådar, helsida turbo. Första resultat nästan direkt. Max token')};

  function t(key) { const e = I18N[key]; return e ? (e[uiLang] || e['en'] || e['zh-CN'] || key) : key; }

  const EXCLUDE_TAGS = new Set(['SCRIPT','STYLE','NOSCRIPT','CODE','PRE','KBD','VAR','SAMP','TEXTAREA','INPUT','SELECT','OPTION','SVG','MATH','CANVAS','IFRAME','OBJECT','EMBED','AUDIO','VIDEO','IMG','AREA','MAP','TEMPLATE','SLOT']);
  const RE_SYMBOLS = /^[\d\s.,;:!?()\[\]{}<>+\-*/=@#$%^&~`|\\/_"'«»„"''‹›·•…]+$/;
  const RE_URL = /^https?:\/\/\S+$/;
  const RE_LETTER = /\p{L}/u;

  function injectStyles() {
    if (document.getElementById('lf-styles')) return;
    const s = document.createElement('style'); s.id = 'lf-styles';
    s.textContent = `:root{--lf-purple:#7c5cfc;--lf-purple-soft:#9061f9;--lf-cyan:#5ce0fc;--lf-green:#4ade80;--lf-red:#f87171;--lf-yellow:#facc15;--lf-bg:rgba(15,15,26,0.94);--lf-border:rgba(255,255,255,0.08);--lf-text:#c0c0d0;--lf-text-strong:#e0e0e0;--lf-text-weak:#7a7a8e}
#lf-wrapper{position:fixed;right:16px;bottom:16px;z-index:2147483646;width:260px;font-family:system-ui;user-select:none;pointer-events:none;transition:width 0.45s cubic-bezier(0.22,0,0,1);overflow:visible}
#lf-wrapper.collapsed{width:56px}
#lf-wrapper>#lf-widget,#lf-wrapper>.lf-collapse-btn-wrap{pointer-events:auto}
#lf-widget{position:relative;display:flex;flex-direction:column;align-items:stretch;width:260px;gap:6px;margin-left:auto;transform-origin:center right;transition:opacity 0.28s ease,transform 0.45s cubic-bezier(0.22,0,0,1)}
#lf-wrapper.collapsed #lf-widget{opacity:0;transform:scale(0.7) translateX(28px);pointer-events:none!important}
.lf-glass{background:var(--lf-bg);backdrop-filter:blur(16px) saturate(1.2);-webkit-backdrop-filter:blur(16px) saturate(1.2);border:1px solid var(--lf-border);border-top-color:rgba(255,255,255,0.12);box-shadow:inset 0 1px 0 rgba(255,255,255,0.04),0 8px 32px rgba(0,0,0,0.45),0 2px 6px rgba(0,0,0,0.35)}
.lf-progress{position:absolute;top:0;left:0;right:0;z-index:2;border-radius:12px;padding:0 12px;max-height:0;opacity:0;overflow:hidden;transition:max-height 0.3s cubic-bezier(0.4,0,0.2,1),opacity 0.25s ease,padding 0.3s ease}
.lf-progress.show{max-height:68px;opacity:1;padding:12px;animation:none}
.lf-progress-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:8px}
.lf-progress-text{font-size:11px;color:var(--lf-text-strong);font-weight:500}
.lf-progress-cancel{width:24px;height:24px;display:grid;place-items:center;background:transparent;border:none;color:var(--lf-text-weak);font-size:12px;cursor:pointer;border-radius:5px;transition:all 0.15s}
.lf-progress-cancel:hover{color:var(--lf-text);background:rgba(255,255,255,0.05)}
.lf-track{height:3px;background:rgba(255,255,255,0.05);border-radius:999px;overflow:hidden}
.lf-fill{height:100%;width:0%;background:linear-gradient(90deg,var(--lf-purple),var(--lf-cyan));border-radius:999px;transition:width 0.25s ease}
.lf-card{border-radius:18px;overflow:hidden;display:flex;flex-direction:column;transition:margin-top 0.3s cubic-bezier(0.4,0,0.2,1)}
#lf-widget:has(#lf-progress.show) #lf-card{margin-top:80px}
.lf-detail{max-height:0;opacity:0;overflow:hidden;transition:max-height 0.35s ease,opacity 0.25s ease}
.lf-detail.open{max-height:400px;opacity:1}
.lf-detail-inner{padding:14px;min-width:0}
.lf-detail-header{display:flex;justify-content:space-between;align-items:center;margin-bottom:12px}
.lf-detail-title{font-size:12px;font-weight:600;color:var(--lf-text-strong)}
.lf-detail-grid{display:grid;grid-template-columns:1fr auto;gap:7px 20px;min-width:0}
.lf-detail-label{font-size:11px;color:var(--lf-text-weak);overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.lf-detail-value{font-size:11px;font-weight:500;color:var(--lf-text-strong);text-align:right;font-variant-numeric:tabular-nums;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:100px}
.lf-clear-btn{background:rgba(248,113,133,0.10);color:var(--lf-red);border:none;border-radius:6px;padding:3px 8px;font-size:10px;font-weight:500;cursor:pointer;font-family:inherit;transition:background 0.2s}
.lf-clear-btn:hover{background:rgba(248,113,133,0.18)}
.lf-orb{display:flex;align-items:center;justify-content:space-between;padding:10px 13px;cursor:grab;min-height:48px}
.lf-orb:active{cursor:grabbing}
.lf-orb-left{display:flex;align-items:center;gap:8px;flex-shrink:0}
.lf-orb-center{display:flex;align-items:center;gap:3px;margin:0 auto}
.lf-orb-right{display:flex;align-items:center;flex-shrink:0}
.lf-orb-label{font-size:11px;color:var(--lf-text-weak);font-weight:500;white-space:nowrap}
.lf-toggle{width:32px;height:18px;border-radius:999px;background:rgba(255,255,255,0.1);border:none;position:relative;cursor:pointer;padding:0;flex-shrink:0;transition:background 0.3s ease}
.lf-toggle::after{content:"";position:absolute;top:2.5px;left:2.5px;width:13px;height:13px;border-radius:50%;background:#fff;box-shadow:0 1px 4px rgba(0,0,0,0.3);transition:transform 0.3s ease}
.lf-toggle.active{background:var(--lf-purple)}
.lf-toggle.active::after{transform:translateX(14px)}
.lf-pill-btn{height:26px;padding:0 14px;border-radius:13px;background:rgba(124,92,252,0.08);color:var(--lf-purple-soft);border:1px solid rgba(124,92,252,0.18);font-family:inherit;font-size:11px;font-weight:600;cursor:pointer;white-space:nowrap;transition:all 0.2s ease;display:flex;align-items:center;gap:4px}
.lf-pill-btn:hover{background:rgba(124,92,252,0.14);border-color:rgba(124,92,252,0.3)}
.lf-pill-btn.translating{background:rgba(124,92,252,0.05);color:#8b5cf6;border-color:rgba(124,92,252,0.1);cursor:default}
.lf-pill-btn.done{background:rgba(74,222,128,0.1);color:var(--lf-green);border-color:rgba(74,222,128,0.2)}
.lf-btn-spinner{width:10px;height:10px;border:2px solid rgba(124,92,252,0.2);border-top-color:var(--lf-purple-soft);border-radius:50%;animation:lf-spin 0.8s linear infinite;display:inline-block}
@keyframes lf-spin{to{transform:rotate(360deg)}}
.lf-chevron{position:relative;z-index:5;width:36px;height:36px;display:inline-flex;align-items:center;justify-content:center;background:transparent;border:none;color:var(--lf-text-weak);cursor:pointer;border-radius:8px;transition:all 0.3s ease;padding:0}
.lf-chevron:hover{color:var(--lf-text);background:rgba(255,255,255,0.06)}
.lf-chevron.open{transform:rotate(180deg)}
.lf-chevron svg{width:22px;height:22px;stroke:currentColor;stroke-width:2.2;fill:none;stroke-linecap:round;stroke-linejoin:round}
.lf-collapse-btn-wrap{position:absolute;left:-18px;bottom:33px;top:auto;transform:none;z-index:1;transition:bottom 0.35s ease}
.lf-collapse-btn{display:inline-flex;align-items:center;justify-content:center;width:28px;height:28px;background:linear-gradient(135deg,rgba(35,30,55,0.94),rgba(18,16,36,0.96));backdrop-filter:blur(10px) saturate(1.4);-webkit-backdrop-filter:blur(10px) saturate(1.4);border:1px solid rgba(124,92,252,0.35);box-shadow:0 2px 14px rgba(0,0,0,0.45),0 0 0 1px rgba(0,0,0,0.3),0 0 20px rgba(124,92,252,0.12),inset 0 1px 0 rgba(255,255,255,0.06);border-radius:50%;color:rgba(255,255,255,0.6);cursor:pointer;padding:0;transition:color 0.2s,background 0.2s,border-color 0.2s;animation:lf-bob-x 2.4s ease-in-out infinite}
.lf-collapse-btn:hover{color:rgba(255,255,255,0.95);background:linear-gradient(135deg,rgba(50,42,78,0.96),rgba(28,24,52,0.97));border-color:rgba(124,92,252,0.55);box-shadow:0 2px 16px rgba(0,0,0,0.5),0 0 0 1px rgba(0,0,0,0.35),0 0 28px rgba(124,92,252,0.2),inset 0 1px 0 rgba(255,255,255,0.08)}
#lf-wrapper.collapsed .lf-collapse-btn-wrap{top:auto;bottom:34px;transform:none}
.lf-collapse-btn.collapsed svg{transform:rotate(180deg)}
.lf-collapse-btn svg{transition:transform 0.35s ease;display:block}
@keyframes lf-bob-x{0%,100%{transform:translateX(0)}50%{transform:translateX(-6px)}}
.lf-mini{position:absolute;right:0;bottom:20px;width:56px;height:56px;border-radius:50%;background:rgba(15,15,26,0.82);backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);border:1px solid rgba(124,92,252,0.3);display:flex;align-items:center;justify-content:center;cursor:pointer;opacity:0;transform:scale(0.7);transition:opacity 0.28s ease,transform 0.45s cubic-bezier(0.22,0,0,1),border-color 0.3s,box-shadow 0.4s ease;pointer-events:none;box-shadow:0 4px 20px rgba(0,0,0,0.45)}
.lf-mini.visible{opacity:1;transform:scale(1);pointer-events:auto}
.lf-mini.translating{border-color:rgba(74,222,128,0.5);box-shadow:0 0 28px rgba(74,222,128,0.22),0 0 56px rgba(74,222,128,0.1),0 0 84px rgba(74,222,128,0.04),0 4px 20px rgba(0,0,0,0.45)}
.lf-mini span{font-size:24px;font-weight:700;color:#9061f9;line-height:1;transition:color 0.3s,text-shadow 0.3s;position:relative;z-index:2}
.lf-mini.translated span{color:#4ade80;text-shadow:0 0 10px rgba(74,222,128,0.6),0 0 22px rgba(74,222,128,0.3)}
.lf-mini-glow{position:absolute;inset:-4px;border-radius:50%;pointer-events:none;opacity:0;transition:opacity 0.4s ease;z-index:1;border:4px solid transparent;border-top-color:rgba(168,255,200,1);border-right-color:rgba(74,222,128,0.55);border-bottom-color:rgba(74,222,128,0.12);box-shadow:0 -6px 18px rgba(74,222,128,0.55),0 0 30px rgba(74,222,128,0.25),inset 0 0 8px rgba(74,222,128,0.1);will-change:transform;animation:lf-spin 2s linear infinite}
.lf-mini-glow::before{content:'';display:block;position:absolute;inset:5px;border-radius:50%;border:2.5px solid transparent;border-bottom-color:rgba(74,222,128,0.75);border-left-color:rgba(74,222,128,0.25);box-shadow:0 5px 12px rgba(74,222,128,0.4);animation:lf-spin 3.2s linear infinite reverse}
.lf-mini.translating .lf-mini-glow{opacity:1}
.lf-token-tail{padding:4px 13px 5px;background:rgba(0,0,0,0.12);cursor:pointer;display:flex;justify-content:space-between;align-items:center;transition:background 0.2s}
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
.lf-custom-select{position:relative;user-select:none}
.lf-custom-select-trigger{display:flex;align-items:center;justify-content:space-between;width:100%;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);border-radius:6px;padding:4px 6px;color:var(--lf-text);font-size:11px;font-family:inherit;cursor:pointer;gap:4px}
.lf-custom-select-trigger span{flex:1;text-align:left;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.lf-custom-select-trigger svg{flex-shrink:0;width:10px;height:10px;transition:transform 0.2s ease;opacity:0.5}
.lf-custom-select.open .lf-custom-select-trigger svg{transform:rotate(180deg);opacity:0.8}
.lf-custom-select-dropdown{position:absolute;top:calc(100% + 2px);left:0;right:0;background:rgba(20,20,38,0.97);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);border:1px solid rgba(255,255,255,0.1);border-radius:6px;overflow:hidden;z-index:100;display:none;box-shadow:0 8px 24px rgba(0,0,0,0.5)}
.lf-custom-select.open .lf-custom-select-dropdown{display:block}
.lf-custom-select-option{padding:6px 8px;font-size:11px;color:var(--lf-text);cursor:pointer;transition:background 0.12s}
.lf-custom-select-option:hover{background:rgba(124,92,252,0.15);color:var(--lf-text-strong)}
.lf-custom-select-option.selected{color:var(--lf-purple-soft);font-weight:600}
.lf-error-bar{position:absolute;top:0;left:0;right:0;z-index:3;border-radius:12px;padding:0 12px;max-height:0;opacity:0;overflow:hidden;transition:max-height 0.3s ease,opacity 0.25s ease,padding 0.3s ease;display:flex;justify-content:space-between;align-items:center;gap:8px;border-color:rgba(248,113,133,0.25)}
.lf-error-bar.show{max-height:64px;opacity:1;padding:10px 12px}
.lf-error-bar span{font-size:11px;color:var(--lf-red);flex:1;line-height:1.4}
.lf-error-dismiss{width:22px;height:22px;display:grid;place-items:center;background:transparent;border:none;color:var(--lf-text-weak);font-size:12px;cursor:pointer;border-radius:4px;flex-shrink:0;padding:0}
.lf-error-dismiss:hover{color:var(--lf-text);background:rgba(255,255,255,0.06)}
#lf-explain-bubble{position:fixed;z-index:2147483646;max-width:300px;background:rgba(18,16,36,0.96);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(124,92,252,0.22);border-radius:12px;padding:10px 13px;font-family:system-ui;font-size:12px;line-height:1.6;color:#c0c0d0;box-shadow:0 8px 32px rgba(0,0,0,0.5),0 0 20px rgba(124,92,252,0.08);pointer-events:auto;opacity:0;transform:translateY(6px);transition:opacity 0.2s ease,transform 0.2s ease}
#lf-explain-bubble.show{opacity:1;transform:translateY(0)}
.lf-explain-header{display:flex;justify-content:space-between;align-items:flex-start;gap:6px;margin-bottom:5px}
.lf-explain-word{font-weight:600;color:var(--lf-purple-soft);font-size:13px;word-break:break-all}
.lf-explain-close{width:20px;height:20px;display:grid;place-items:center;background:transparent;border:none;color:var(--lf-text-weak);cursor:pointer;border-radius:4px;font-size:13px;flex-shrink:0;padding:0;line-height:1}
.lf-explain-close:hover{color:var(--lf-text);background:rgba(255,255,255,0.06)}
.lf-explain-body{word-break:break-word}
.lf-explain-loading{color:var(--lf-text-weak);font-style:italic}
#lf-panel{position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);z-index:2147483645;width:960px;background:rgba(15,15,26,0.96);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);border:1px solid rgba(124,92,252,0.2);border-radius:14px;box-shadow:0 12px 40px rgba(0,0,0,0.55);font-family:system-ui;display:none;user-select:none;overflow:hidden}
#lf-panel.show{display:block}
#lf-panel.mini{width:200px}
#lf-panel.mini .lf-panel-body,#lf-panel.mini .lf-panel-foot{display:none}
.lf-panel-head{display:flex;justify-content:space-between;align-items:center;padding:10px 16px;cursor:move;border-bottom:1px solid rgba(255,255,255,0.05)}
.lf-panel-title{font-size:14px;font-weight:600;color:var(--lf-text-strong);display:flex;align-items:center;gap:8px}
.lf-panel-actions{display:flex;gap:4px}
.lf-panel-btn{width:28px;height:28px;display:grid;place-items:center;background:transparent;border:none;color:var(--lf-text-weak);cursor:pointer;border-radius:6px;font-size:14px}
.lf-panel-btn:hover{color:var(--lf-text);background:rgba(255,255,255,0.06)}
.lf-panel-body{display:flex;gap:0;min-height:400px}
.lf-panel-col{flex:1;display:flex;flex-direction:column}
.lf-panel-col:first-child{border-right:1px solid rgba(255,255,255,0.1)}
.lf-panel-lang{display:flex;align-items:center;padding:8px 12px;gap:8px;border-bottom:1px solid rgba(255,255,255,0.04)}
.lf-panel-lang span{font-size:11px!important;color:var(--lf-text-weak);flex-shrink:0}
.lf-panel-lang select{background:transparent;border:1px solid rgba(255,255,255,0.1);border-radius:6px;color:var(--lf-text);font-size:11px;padding:4px 6px;outline:none;cursor:pointer;font-family:inherit;appearance:none;-webkit-appearance:none;background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8' viewBox='0 0 8 8'%3E%3Cpath d='M1 2l3 3 3-3' stroke='%239090a8' stroke-width='1.2' fill='none'/%3E%3C/svg%3E");background-repeat:no-repeat;background-position:right 6px center;padding-right:20px}
.lf-panel-text{flex:1;padding:16px;font-size:15px;font-family:inherit;color:var(--lf-text);background:transparent;border:none;outline:none;resize:none;line-height:1.7;min-height:340px}
.lf-panel-text:read-only{color:var(--lf-text-weak)}
.lf-panel-text::placeholder{color:var(--lf-text-weak);opacity:0.4}
.lf-panel-foot{display:flex;justify-content:space-between;align-items:center;padding:10px 16px;border-top:1px solid rgba(255,255,255,0.05);gap:10px}
.lf-panel-foot .lf-panel-btn{width:auto;padding:6px 14px;font-size:12px;gap:4px;border-radius:6px}
.lf-panel-swap{display:flex;align-items:center;justify-content:center;align-self:center;width:36px;height:36px;border-radius:50%;background:rgba(124,92,252,0.12);border:1px solid rgba(124,92,252,0.2);color:var(--lf-purple-soft);cursor:pointer;font-size:18px;flex-shrink:0;margin:0 -18px;z-index:2;transition:all 0.2s}
.lf-panel-swap:hover{background:rgba(124,92,252,0.2);border-color:rgba(124,92,252,0.35);transform:rotate(180deg)}
.lf-panel-char-count{font-size:11px;color:var(--lf-text-weak)}
@media(max-width:980px){#lf-panel{width:calc(100vw-20px);transform:none;top:20px;left:10px;right:auto}.lf-panel-body{min-height:260px}.lf-panel-text{min-height:200px}}`;
    document.head.appendChild(s);
  }

  // ===== buildUI, bindEvents, 翻译逻辑等 (同之前，省略重复) =====
  // 因篇幅限制，此处保持原有 buildUI / bindEvents / 翻译 / 缓存 / 观察器 / Ctrl解释 逻辑不变
  // 仅更新 wrapper + collapse + mini ball 部分

  function buildUI() {
    injectStyles();
    const wrapper = document.createElement('div'); wrapper.id = 'lf-wrapper';
    wrapper.innerHTML = `
      <span class="lf-collapse-btn-wrap">
        <button class="lf-collapse-btn" id="btn-collapse" title="收起悬浮球">
          <svg viewBox="0 0 24 24" width="12" height="12" style="stroke:currentColor;stroke-width:2.5;fill:none;stroke-linecap:round;stroke-linejoin:round;"><polyline points="9 6 15 12 9 18"></polyline></svg>
        </button>
      </span>
      <div id="lf-widget">
        <div id="lf-toast-stack"></div>
        <div id="lf-error-bar" class="lf-glass lf-error-bar"><span id="lf-error-text"></span><button class="lf-error-dismiss" id="lf-error-dismiss">✕</button></div>
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
              <div class="lf-detail-header"><span class="lf-detail-title" id="lf-title-settings">${t('settings')}</span><button class="lf-clear-btn" id="btn-clear">${t('clearCache')}</button></div>
              <div style="margin-bottom:8px;"><div style="font-size:10px;color:var(--lf-text-weak);margin-bottom:3px;">Language</div>
                <select id="lf-ui-lang" style="width:100%;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);border-radius:6px;padding:4px 6px;color:var(--lf-text);font-size:11px;font-family:inherit;outline:none;cursor:pointer;">
                  <option value="zh-CN">🇨🇳 简体中文</option><option value="zh-TW">🇹🇼 繁體中文</option><option value="en">🇺🇸 English</option><option value="ja">🇯🇵 日本語</option><option value="ko">🇰🇷 한국어</option><option value="fr">🇫🇷 Français</option><option value="de">🇩🇪 Deutsch</option><option value="es">🇪🇸 Español</option><option value="pt">🇧🇷 Português</option><option value="ru">🇷🇺 Русский</option><option value="ar">🇸🇦 العربية</option><option value="hi">🇮🇳 हिन्दी</option><option value="th">🇹🇭 ไทย</option><option value="vi">🇻🇳 Tiếng Việt</option><option value="it">🇮🇹 Italiano</option><option value="nl">🇳🇱 Nederlands</option><option value="pl">🇵🇱 Polski</option><option value="tr">🇹🇷 Türkçe</option><option value="id">🇮🇩 Indonesia</option><option value="sv">🇸🇪 Svenska</option>
                </select>
              </div>
              <div style="display:flex;gap:6px;margin-bottom:12px;">
                <div style="flex:1;"><div style="font-size:10px;color:var(--lf-text-weak);margin-bottom:3px;" id="dl-source">${t('source')}</div>
                  <select id="lf-lang-from" translate="no" style="width:100%;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);border-radius:6px;padding:4px 6px;color:var(--lf-text);font-size:11px;font-family:inherit;outline:none;cursor:pointer;">
                    <option value="auto" id="opt-auto">${t('autoDetect')}</option>
                    <option value="zh-CN">简体中文</option><option value="zh-TW">繁體中文</option><option value="en">English</option><option value="ja">日本語</option><option value="ko">한국어</option><option value="fr">Français</option><option value="de">Deutsch</option><option value="es">Español</option><option value="pt">Português</option><option value="ru">Русский</option><option value="ar">العربية</option><option value="hi">हिन्दी</option><option value="th">ไทย</option><option value="vi">Tiếng Việt</option><option value="it">Italiano</option><option value="nl">Nederlands</option><option value="pl">Polski</option><option value="tr">Türkçe</option><option value="id">Bahasa Indonesia</option><option value="sv">Svenska</option><option value="da">Dansk</option><option value="fi">Suomi</option><option value="no">Norsk</option><option value="cs">Čeština</option><option value="ro">Română</option><option value="hu">Magyar</option><option value="el">Ελληνικά</option><option value="he">עברית</option><option value="uk">Українська</option><option value="ms">Bahasa Melayu</option><option value="fil">Filipino</option><option value="bn">বাংলা</option><option value="ur">اردو</option><option value="fa">فارسی</option><option value="sw">Kiswahili</option><option value="ta">தமிழ்</option><option value="te">తెలుగు</option><option value="mr">मराठी</option><option value="gu">ગુજરાતી</option><option value="kn">ಕನ್ನಡ</option><option value="ml">മലയാളം</option><option value="pa">ਪੰਜਾਬੀ</option><option value="bg">Български</option><option value="sk">Slovenčina</option><option value="lt">Lietuvių</option><option value="lv">Latviešu</option><option value="et">Eesti</option><option value="sl">Slovenščina</option><option value="hr">Hrvatski</option><option value="sr">Српски</option>
                  </select>
                </div>
                <div style="flex:1;"><div style="font-size:10px;color:var(--lf-text-weak);margin-bottom:3px;" id="dl-target">${t('target')}</div>
                  <select id="lf-lang-to" translate="no" style="width:100%;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);border-radius:6px;padding:4px 6px;color:var(--lf-text);font-size:11px;font-family:inherit;outline:none;cursor:pointer;">
                    <option value="zh-CN">简体中文</option><option value="zh-TW">繁體中文</option><option value="en">English</option><option value="ja">日本語</option><option value="ko">한국어</option><option value="fr">Français</option><option value="de">Deutsch</option><option value="es">Español</option><option value="pt">Português</option><option value="ru">Русский</option><option value="ar">العربية</option><option value="hi">हिन्दी</option><option value="th">ไทย</option><option value="vi">Tiếng Việt</option><option value="it">Italiano</option><option value="nl">Nederlands</option><option value="pl">Polski</option><option value="tr">Türkçe</option><option value="id">Bahasa Indonesia</option><option value="sv">Svenska</option><option value="da">Dansk</option><option value="fi">Suomi</option><option value="no">Norsk</option><option value="cs">Čeština</option><option value="ro">Română</option><option value="hu">Magyar</option><option value="el">Ελληνικά</option><option value="he">עברית</option><option value="uk">Українська</option><option value="ms">Bahasa Melayu</option><option value="fil">Filipino</option><option value="bn">বাংলা</option><option value="ur">اردو</option><option value="fa">فارسی</option><option value="sw">Kiswahili</option><option value="ta">தமிழ்</option><option value="te">తెలుగు</option><option value="mr">मराठी</option><option value="gu">ગુજરાતી</option><option value="kn">ಕನ್ನಡ</option><option value="ml">മലയാളം</option><option value="pa">ਪੰਜਾਬੀ</option><option value="bg">Български</option><option value="sk">Slovenčina</option><option value="lt">Lietuvių</option><option value="lv">Latviešu</option><option value="et">Eesti</option><option value="sl">Slovenščina</option><option value="hr">Hrvatski</option><option value="sr">Српски</option>
                  </select>
                </div>
              </div>
              <div style="margin-bottom:10px;">
                <div style="font-size:10px;color:var(--lf-text-weak);margin-bottom:3px;" id="lf-mode-label">${t('modeLabel')}</div>
                <div class="lf-custom-select" id="lf-mode-wrap">
                  <div class="lf-custom-select-trigger" id="lf-mode-trigger">
                    <span id="lf-mode-text">${t('modeMedium')}</span>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><polyline points="6 9 12 15 18 9"/></svg>
                  </div>
                  <div class="lf-custom-select-dropdown" id="lf-mode-dropdown">
                    <div class="lf-custom-select-option selected" data-value="medium" title="${t('modeMediumDesc')}">${t('modeMedium')}</div>
                    <div class="lf-custom-select-option" data-value="high" title="${t('modeHighDesc')}">${t('modeHigh')}</div>
                  </div>
                </div>
              </div>
              <div style="margin-bottom:4px"><button style="width:100%;background:rgba(124,92,252,0.08);border:1px solid rgba(124,92,252,0.15);border-radius:6px;padding:5px 8px;color:var(--lf-purple-soft);font-size:10px;font-family:inherit;cursor:pointer;display:flex;justify-content:space-between;align-items:center" id="btn-open-panel"><span>🌐 翻译面板</span><span style="color:var(--lf-text-weak);font-size:9px">Alt+Q</span></button></div>
              <div style="height:1px;background:rgba(255,255,255,0.06);margin-bottom:12px;"></div>
              <div class="lf-detail-header" style="margin-bottom:10px;"><span class="lf-detail-title" id="lf-title-history">${t('history')}</span></div>
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
            <div class="lf-orb-left"><span class="lf-orb-label">${t('autoShort')}</span><button class="lf-toggle" id="btn-toggle"></button></div>
            <div class="lf-orb-center"><button class="lf-pill-btn" id="btn-translate">${t('translatePage')}</button><span style="font-size:10px;color:rgba(255,255,255,0.35);white-space:nowrap;">Alt+T</span></div>
            <div class="lf-orb-right"><button class="lf-chevron" id="btn-chevron"><svg viewBox="0 0 24 24"><polyline points="6 15 12 9 18 15"/></svg></button></div>
          </div>
          <div class="lf-token-tail" id="btn-token">
            <span class="lf-token-text"><span id="txt-page-tokens">${t('pageTokens')}</span> <span class="lf-token-num" id="token-num">0</span></span>
            <span class="lf-token-hit" id="token-hit"><span id="txt-hit-rate">${t('hitRate')}</span> 0%</span>
          </div>
        </div>
      </div>
      <div id="lf-mini" class="lf-mini"><span>译</span><div class="lf-mini-glow"></div></div>
    `;
    document.body.appendChild(wrapper);
    bindEvents(wrapper);
  }

  function bindEvents(wrapper) {
    const widget = document.getElementById('lf-widget');
    const detail = document.getElementById('lf-detail');
    const progress = document.getElementById('lf-progress');
    const progFill = document.getElementById('prog-fill'), progCur = document.getElementById('prog-cur'), progTotal = document.getElementById('prog-total');
    const btnToggle = document.getElementById('btn-toggle');
    const btnTranslate = document.getElementById('btn-translate');
    const btnChevron = document.getElementById('btn-chevron');
    const btnToken = document.getElementById('btn-token');
    const btnCancel = document.getElementById('btn-cancel');
    const btnClear = document.getElementById('btn-clear');
    const mini = document.getElementById('lf-mini');

    // 收折
    let collapsed = false;
    const btnCollapse = document.getElementById('btn-collapse');
    btnCollapse.addEventListener('click', e => {
      e.stopPropagation();
      collapsed = !collapsed;
      btnCollapse.classList.toggle('collapsed', collapsed);
      wrapper.classList.toggle('collapsed', collapsed);
      mini.classList.toggle('visible', collapsed);
      btnCollapse.title = collapsed ? '展开悬浮球' : '收起悬浮球';
      chrome.storage.local.set({ lf_collapsed: collapsed });
    });

    updateMiniText();
    mini.addEventListener('click', e => { e.stopPropagation(); mini.classList.add('translating'); mini.classList.add('translated'); btnTranslate.click(); });

    // 详情
    function toggleDetail() {
      expanded = !expanded;
      detail.classList.toggle('open', expanded);
      btnChevron.classList.toggle('open', expanded);
      if (expanded) {
        chrome.storage.sync.get({ sourceLang:'auto', targetLang:'zh-CN' }, s => {
          const lf = document.getElementById('lf-lang-from'), lt = document.getElementById('lf-lang-to');
          if (lf) lf.value = s.sourceLang; if (lt) { lt.value = s.targetLang; }
        });
        updateDetailNumbers();
      }
    }
    btnChevron.addEventListener('click', e => { e.stopPropagation(); toggleDetail(); });
    btnToken.addEventListener('click', e => { if (!dragMoved) { e.stopPropagation(); toggleDetail(); } });

    // 开关
    btnToggle.addEventListener('click', async e => { e.stopPropagation(); switchIntent = !switchIntent; btnToggle.classList.toggle('active', switchIntent); await saveTabMode(switchIntent); updateUsageBall(); if (switchIntent && !isTranslated && !isTranslating) await loadAndTranslate({ continuous: true }); });
    // 翻译按钮
    btnTranslate.addEventListener('click', async e => {
      e.stopPropagation();
      if (isTranslating) {
        // 翻译中点击 → 立即停止并还原
        if (abortController) abortController.abort();
        restoreOriginal();
        if (mutationObserver) { mutationObserver.disconnect(); mutationObserver = null; }
        isTranslating = false; showTranslation = false;
        progress.classList.remove('show');
        btnTranslate.classList.remove('translating');
        btnTranslate.textContent = t('translatePage');
        mini.classList.remove('translating','translated');
        updateUsageBall();
        showToast('warning', '⚠️ ' + t('canceled'));
      } else if (showTranslation) {
        restoreOriginal();
        if (mutationObserver) { mutationObserver.disconnect(); mutationObserver = null; }
        isTranslating = false; progress.classList.remove('show'); showTranslation = false; updateUsageBall();
      } else {
        if (abortController) abortController.abort();
        btnTranslate.classList.add('translating'); btnTranslate.innerHTML = '<span class="lf-btn-spinner"></span>' + t('translating'); mini.classList.add('translating','translated');
        await loadAndTranslate({ continuous: true });
        if (abortController && abortController.signal.aborted) { updateUsageBall(); return; }
        showTranslation = true;
        btnTranslate.classList.remove('translating'); btnTranslate.classList.add('done'); btnTranslate.textContent = t('translated');
      }
    });
    // 取消
    btnCancel.addEventListener('click', e => { e.stopPropagation(); if (!isTranslating) return; if (abortController) abortController.abort(); isTranslating = false; progress.classList.remove('show'); btnTranslate.classList.remove('translating'); btnTranslate.textContent = t('translatePage'); showToast('warning', '⚠️ ' + t('canceled')); });
    // 语言
    const langFrom = document.getElementById('lf-lang-from'), langTo = document.getElementById('lf-lang-to');
    let lastSavedTo = null;
    async function onLangChange() {
      if (!langFrom || !langTo) return; const newTo = langTo.value;
      if (lastSavedTo !== null && lastSavedTo !== newTo) { translationCache.clear(); chrome.storage.local.remove('translation_cache'); chrome.storage.local.set({ last_target_lang: newTo }); updateDetailNumbers(); showToast('warning', t('langSwitch') + ' ' + newTo + t('cacheClearedSwitch')); }
      lastSavedTo = newTo; await chrome.storage.sync.set({ sourceLang: langFrom.value, targetLang: newTo }); updateAllUIText();
    }
    langFrom.addEventListener('change', onLangChange); langTo.addEventListener('change', onLangChange);
    // 翻译模式 — 自定义下拉
    const modeWrap = document.getElementById('lf-mode-wrap');
    const modeTrigger = document.getElementById('lf-mode-trigger');
    const modeDropdown = document.getElementById('lf-mode-dropdown');
    const modeText = document.getElementById('lf-mode-text');
    chrome.storage.sync.get('mode', s => { if (s.mode) { mode = s.mode; updateModeUI(); } });
    modeTrigger.addEventListener('click', e => { e.stopPropagation(); modeWrap.classList.toggle('open'); });
    modeDropdown.querySelectorAll('.lf-custom-select-option').forEach(opt => {
      opt.addEventListener('click', e => {
        e.stopPropagation();
        mode = opt.dataset.value;
        updateModeUI();
        chrome.storage.sync.set({ mode });
        modeWrap.classList.remove('open');
      });
    });
    document.addEventListener('click', e => {
      modeWrap.classList.remove('open');
      if (explainBubble && !e.target.closest('#lf-explain-bubble') && !e.ctrlKey && !e.metaKey) hideBubble();
    });

    // 错误条
    document.getElementById('lf-error-dismiss').addEventListener('click', () => document.getElementById('lf-error-bar').classList.remove('show'));

    // UI 语言
    const uiLangSel = document.getElementById('lf-ui-lang');
    function syncUILangSelect() { if (uiLangSel) uiLangSel.value = uiLang; }
    syncUILangSelect();
    if (uiLangSel) { uiLangSel.addEventListener('change', async () => { uiLang = uiLangSel.value; await chrome.storage.sync.set({ uiLang }); updateAllUIText(); updateUsageBall(); updateDetailNumbers(); syncUILangSelect(); }); }
    // 清除缓存
    document.getElementById('btn-open-panel').addEventListener('click', e => { e.stopPropagation(); togglePanel(); });
    btnClear.addEventListener('click', e => { e.stopPropagation(); translationCache.clear(); chrome.storage.local.remove('translation_cache'); updateDetailNumbers(); showToast('success', '✅ ' + t('cacheCleared')); });
    // 进度条
    window._lfSetProgress = (cur, total) => {
      if (!progress.classList.contains('show')) { progress.classList.add('show'); if (!btnTranslate.classList.contains('translating')) { btnTranslate.classList.add('translating'); btnTranslate.innerHTML = '<span class="lf-btn-spinner"></span>' + t('translating'); } }
      progCur.textContent = String(cur); progTotal.textContent = String(total); progFill.style.width = (total > 0 ? cur / total * 100 : 0) + '%';
      mini.classList.toggle('translating', cur < total);
      if (cur >= total) { setTimeout(() => { progress.classList.remove('show'); mini.classList.remove('translating'); }, 2000); btnTranslate.classList.remove('translating'); btnTranslate.classList.add('done'); btnTranslate.textContent = t('translated'); }
    };
    // 拖拽
    const orb = document.getElementById('lf-orb');
    orb.addEventListener('mousedown', startDrag); orb.addEventListener('touchstart', startDrag, { passive: false });
    function startDrag(e) { if (e.target.closest('.lf-toggle,.lf-pill-btn,.lf-chevron,.lf-collapse-btn')) return; e.preventDefault(); const rect = wrapper.getBoundingClientRect(); const cx = e.touches ? e.touches[0].clientX : e.clientX, cy = e.touches ? e.touches[0].clientY : e.clientY; dragState = { startRight: window.innerWidth - rect.right, startBottom: window.innerHeight - rect.bottom, startX: cx, startY: cy }; dragMoved = false; document.addEventListener('mousemove', onDrag); document.addEventListener('mouseup', stopDrag); document.addEventListener('touchmove', onDrag, { passive: false }); document.addEventListener('touchend', stopDrag); }
    function onDrag(e) { if (!dragState) return; e.preventDefault(); const cx = e.touches ? e.touches[0].clientX : e.clientX, cy = e.touches ? e.touches[0].clientY : e.clientY; let r = dragState.startRight - (cx - dragState.startX), b = dragState.startBottom - (cy - dragState.startY); r = Math.max(0, Math.min(window.innerWidth - wrapper.offsetWidth, r)); b = Math.max(0, Math.min(window.innerHeight - wrapper.offsetHeight, b)); wrapper.style.right = r + 'px'; wrapper.style.bottom = b + 'px'; dragMoved = true; }
    function stopDrag() { dragState = null; document.removeEventListener('mousemove', onDrag); document.removeEventListener('mouseup', stopDrag); document.removeEventListener('touchmove', onDrag); document.removeEventListener('touchend', stopDrag); setTimeout(() => { dragMoved = false; }, 60); }
  }

  function updateMiniText() { const mt = document.querySelector('#lf-mini span'); if (mt) mt.textContent = (uiLang==='zh-CN'||uiLang==='zh-TW')?'译':'T'; }
  function updateModeUI() {
    const label=document.getElementById('lf-mode-label'); if (label) label.textContent=t('modeLabel');
    const text=document.getElementById('lf-mode-text');
    const labelKey={ medium:'modeMedium', high:'modeHigh' }[mode];
    if (text&&labelKey) text.textContent=t(labelKey);
    const dd=document.getElementById('lf-mode-dropdown'); if (dd) {
      dd.querySelectorAll('.lf-custom-select-option').forEach(opt=>{
        opt.classList.toggle('selected', opt.dataset.value===mode);
        const optKey={ medium:'modeMedium', high:'modeHigh' }[opt.dataset.value];
        if (optKey) opt.textContent=t(optKey);
        const descKey={ medium:'modeMediumDesc', high:'modeHighDesc' }[opt.dataset.value];
        if (descKey) opt.title=t(descKey);
      });
    }
  }
  function updateAllUIText() {
    const orbLabel = document.querySelector('.lf-orb-label'); if (orbLabel) orbLabel.textContent = t('autoShort');
    const btnT = document.getElementById('btn-translate'); if (btnT && !isTranslating) btnT.textContent = showTranslation ? t('translated') : t('translatePage');
    const btnC = document.getElementById('btn-clear'); if (btnC) btnC.textContent = t('clearCache');
    const t0 = document.getElementById('lf-title-settings'); if (t0) t0.textContent = t('settings');
    const t1 = document.getElementById('lf-title-history'); if (t1) t1.textContent = t('history');
    const s = document.getElementById('dl-source'); if (s) s.textContent = t('source');
    const tg = document.getElementById('dl-target'); if (tg) tg.textContent = t('target');
    const oa = document.getElementById('opt-auto'); if (oa) oa.textContent = t('autoDetect');
    const pt = document.getElementById('txt-page-tokens'); if (pt) pt.textContent = t('pageTokens');
    const hr = document.getElementById('txt-hit-rate'); if (hr) hr.textContent = t('hitRate');
    const pl = document.getElementById('prog-label'); if (pl) pl.textContent = t('translating');
    updateDetailNumbers();
    updateModeUI();
    updateMiniText();
  }

  function updateDetailNumbers() {
    const labelMap = { 'dl-input':'input','dl-output':'output','dl-total':'total','dl-cost':'estCost','dl-cache':'cacheEntries' };
    Object.entries(labelMap).forEach(([id, key]) => { const el = document.getElementById(id); if (el) el.textContent = t(key); });
    ['dl-source','dl-target'].forEach(id => { const el = document.getElementById(id); if (el) el.textContent = t(id.replace('dl-','')); });
    const optA = document.getElementById('opt-auto'); if (optA) optA.textContent = t('autoDetect');
    chrome.storage.local.get(null, data => { let gi=0,go=0,gt=0; for (const k of Object.keys(data)) if (k.startsWith('tokens_')) { gi+=data[k].input||0; go+=data[k].output||0; gt+=data[k].total||0; } const cost=estimateCost(gi,go), fmt=n=>n>=1000?`${(n/1000).toFixed(1)}K`:String(n); const set=(id,v)=>{const el=document.getElementById(id);if(el)el.textContent=v;}; set('dv-input',fmt(gi)); set('dv-output',fmt(go)); set('dv-total',fmt(gt)); set('dv-cost',cost>0?`¥${cost.toFixed(4)}`:'--'); set('dv-cache',String(translationCache.size)); });
  }

  function updateUsageBall() {
    const bt = document.getElementById('btn-translate'), tg = document.getElementById('btn-toggle');
    if (tg) tg.classList.toggle('active', switchIntent);
    if (bt && !isTranslating) { if (showTranslation) { bt.textContent = t('translated'); bt.classList.add('done'); } else { bt.textContent = t('translatePage'); bt.classList.remove('done'); } }
    const num = document.getElementById('token-num'), hit = document.getElementById('token-hit');
    const pageLabel = document.getElementById('txt-page-tokens'), hitLabel = document.getElementById('txt-hit-rate');
    if (pageLabel) pageLabel.textContent = t('pageTokens'); if (hitLabel) hitLabel.textContent = t('hitRate');
    if (!num || !hit) return;
    const fmt = n => n >= 1000 ? `${(n / 1000).toFixed(1)}K` : String(n);
    const hr = pageTokens.cacheHits + pageTokens.apiCalls > 0 ? Math.round(pageTokens.cacheHits / (pageTokens.cacheHits + pageTokens.apiCalls) * 100) : 0;
    num.textContent = fmt(pageTokens.total || 0); hit.textContent = `${t('hitRate')} ${hr}%`; hit.classList.toggle('zero', hr === 0);
    if (expanded) updateDetailNumbers();
  }

  function showToast(type, msg) { const stack = document.getElementById('lf-toast-stack'); if (!stack) return; const el = document.createElement('div'); el.className = 'lf-glass lf-toast ' + type; el.innerHTML = '<span>' + msg + '</span>'; stack.appendChild(el); void el.offsetWidth; el.classList.add('show'); setTimeout(() => { el.classList.remove('show'); setTimeout(() => el.remove(), 260); }, 3000); }
  function showApiError(msg) { const bar=document.getElementById('lf-error-bar'); const text=document.getElementById('lf-error-text'); if (!bar||!text) return; text.textContent=msg; bar.classList.add('show'); }
  async function readApiSettings() { const s=await chrome.storage.sync.get({ apis:null, activeApiId:null, apiKey:'', apiUrl:'https://api.deepseek.com/v1', model:'deepseek-chat', targetLang:'zh-CN' }); if (s.apis&&s.activeApiId) { const active=s.apis.find(a=>a.id===s.activeApiId)||s.apis[0]; if (active) return { apiKey:active.apiKey, apiUrl:active.apiUrl, model:active.model, targetLang:s.targetLang, supportsConcurrency:active.supportsConcurrency!==false }; } return { apiKey:s.apiKey, apiUrl:s.apiUrl, model:s.model, targetLang:s.targetLang, supportsConcurrency:true }; }

  // ===== 文本收集/翻译/缓存/观察器/Ctrl解释（保持原有逻辑，省略） =====
  function isVisible(el) { if (!el?.isConnected) return false; const s = window.getComputedStyle(el); if (s.display==='none'||s.visibility==='hidden') return false; return !(el.getBoundingClientRect().width===0&&el.getBoundingClientRect().height===0); }
  function isInViewport(el, m) { if (!el?.isConnected) return false; const r = el.getBoundingClientRect(); if (r.width===0&&r.height===0) return false; const margin = m ?? window.innerHeight; return r.bottom >= -margin && r.top <= window.innerHeight + margin; }
  function shouldSkip(el) { if (EXCLUDE_TAGS.has(el.tagName)) return true; if (el.closest('[id^="lf-"],[id^="linguaflow"]')) return true; if (el.isContentEditable||el.closest('[contenteditable="true"]')) return true; return false; }
  function isTranslatable(text) { const t = text.trim(); if (!t||t.length<3) return false; if (RE_SYMBOLS.test(t)) return false; if (RE_URL.test(t)) return false; if (/^Test[: ]/i.test(t)) return false; if (/^[a-z]+-[a-z]+-[a-z]+$/.test(t)&&t.length>15) return false; const targetLang = settings.targetLang||'zh-CN'; if (['zh-CN','zh-TW','ja','ko'].includes(targetLang)&&/[一-鿿]/.test(t)) { let cjk=0; for (const ch of t) { if (ch>='一'&&ch<='鿿') cjk++; } if (cjk/t.length>0.3) return false; if (cjk>0&&!/[a-zA-Z]{3,}/.test(t)) return false; } return RE_LETTER.test(t); }
  function collectTextNodes(root, opts={}) { const { minLen=3, viewportOnly=false, viewportMargin } = opts; const result=[]; const w=document.createTreeWalker(root, NodeFilter.SHOW_TEXT); const rectCache=new Map(), styleCache=new Map(); while (w.nextNode()) { const node=w.currentNode, parent=node.parentElement; if (!parent) continue; if (shouldSkip(parent)) continue; let vis=styleCache.get(parent); if (vis===undefined) { vis=isVisible(parent); styleCache.set(parent,vis); } if (!vis) continue; const text=node.textContent.trim(); if (text.length<minLen) continue; if (!isTranslatable(text)) continue; if (translationMap.has(node)||inFlightNodes.has(node)) continue; let rect=rectCache.get(parent); if (!rect) { rect=parent.getBoundingClientRect(); rectCache.set(parent,rect); } if (viewportOnly) { if (rect.width===0&&rect.height===0) continue; const m=viewportMargin??window.innerHeight; if (rect.bottom<-m||rect.top>window.innerHeight+m) continue; } result.push({ node, text, y:rect.top, parent }); } result.sort((a,b)=>a.y-b.y); const merged=[]; for(let i=0;i<result.length;i++){ const cur=result[i]; let txt=cur.text, nodes=[cur.node], j=i+1; while(j<result.length){ const nxt=result[j]; const sameParent=nxt.parent===cur.parent; const siblingParents=nxt.parent&&cur.parent&&nxt.parent.parentElement===cur.parent.parentElement&&cur.parent.nextElementSibling===nxt.parent; if(sameParent||siblingParents){ txt+=' '+nxt.text; nodes.push(nxt.node); j++; } else break; } merged.push({node:nodes[0],text:txt,y:cur.y,subNodes:nodes.length>1?nodes:null}); i=j-1; } return merged; }
  function getTabId() { return new Promise(r => { if (tabId!=null) { r(tabId); return; } chrome.runtime.sendMessage({ type:'GET_TAB_ID' }, resp => { tabId = resp?.tabId ?? 'unknown'; r(tabId); }); }); }

  // ===== 翻译 =====
  async function startTranslation(transSettings, opts={}) { const { continuous=true } = opts; if (isTranslated) restoreOriginal(); settings=transSettings; abortController=new AbortController(); pageTokens={ input:0,output:0,total:0,cacheHits:0,apiCalls:0 }; const cfg=MODES[mode]||MODES.medium;const textNodes=collectTextNodes(document.body,{ viewportOnly:!cfg.fullPage, viewportMargin:cfg.viewportMargin }); const inputEls=document.body.querySelectorAll('input[type="submit"],input[type="button"],button:not(:empty),[role="button"]'); for (const el of inputEls) { if (shouldSkip(el)) continue; const v=(el.value||'').trim(); if (v.length<3||!isTranslatable(v)) continue; if (!isInViewport(el,200)) continue; textNodes.push({ node:el, text:v, y:el.getBoundingClientRect().top, isInput:true }); } textNodes.sort((a,b)=>a.y-b.y); if (!textNodes.length) { showToast('warning','⚠️ '+t('noText')); return; } const stats=await translateAndApply(textNodes, textNodes.length); if (abortController.signal.aborted) return; isTranslated=true; isTranslating=false; if (continuous) { if (cfg.scroll) startScrollObserver(); if (cfg.mutation) startMutationObserver(); } updateUsageBall(); if (!stats.allCached) { const ok=stats.completed-stats.failed; showToast('success',stats.failed?`✅ ${ok}/${stats.completed} ${t('segments')} (${stats.failed} ${t('failed')})`:`✅ ${t('completed')} (${stats.completed} ${t('segments')})`); } }
  async function translateAndApply(textNodes, totalForProgress) { let apiTime=0,cacheHits=0,completed=0,failed=0; const apiErrors=[]; const CONCURRENCY=(MODES[mode]||MODES.medium).concurrency; if (!abortController||abortController.signal.aborted) abortController=new AbortController(); for (const tn of textNodes) inFlightNodes.add(tn.node); isTranslating=true; try { const toTranslate=[]; for (let i=0;i<textNodes.length;i++) { const tn=textNodes[i]; if (translationCache.has(tn.text)) { applyTranslation(tn.node,tn.text,translationCache.get(tn.text),tn.subNodes); cacheHits++; completed++; } else toTranslate.push({ ...tn, id:String(i) }); } pageTokens.cacheHits+=cacheHits; if (!toTranslate.length) { window._lfSetProgress?.(completed,textNodes.length); return { apiTime,cacheHits,completed,failed,allCached:true }; } const batches=[]; let cur={ items:[],chars:0 },limit=(MODES[mode]||MODES.medium).batchLimit; for (const tn of toTranslate) { if (cur.chars+tn.text.length>limit&&cur.items.length) { batches.push(cur); cur={ items:[],chars:0 }; } cur.items.push(tn); cur.chars+=tn.text.length; } if (cur.items.length) batches.push(cur); let nextIdx=0; async function processBatch(batch) { if (abortController.signal.aborted) throw new DOMException('Aborted','AbortError'); const reallyNeed=[]; for (const item of batch.items) { if (translationCache.has(item.text)) { applyTranslation(item.node,item.text,translationCache.get(item.text),item.subNodes); cacheHits++; completed++; } else reallyNeed.push(item); } if (!reallyNeed.length) return; const t=performance.now(); const result=await translateBatch(reallyNeed); if (abortController.signal.aborted) throw new DOMException('Aborted','AbortError'); apiTime+=performance.now()-t; if (result) { for (const item of reallyNeed) { const tr=result[item.id]; if (tr) { if (tr!==item.text) { applyTranslation(item.node,item.text,tr,item.subNodes); } else { if (item.subNodes) { for (const sn of item.subNodes) translationMap.set(sn,{ original:sn.textContent?sn.textContent.trim():(sn.value||'').trim() }); } else { translationMap.set(item.node,{ original:item.text }); untranslatedNodes.add(item.node); } } translationCache.set(item.text,tr); markCacheDirty(); } } } else { failed+=reallyNeed.length; } completed+=reallyNeed.length; window._lfSetProgress?.(completed,textNodes.length); } async function worker() { while (nextIdx<batches.length) { if (abortController.signal.aborted) return; const idx=nextIdx++; try { await processBatch(batches[idx]); } catch(e) { if (e.name==='AbortError') return; apiErrors.push(e.message||String(e)); failed+=batches[idx].items.length; completed+=batches[idx].items.length; } } } await Promise.all(Array.from({ length:Math.min(CONCURRENCY,batches.length) },()=>worker())); if (apiErrors.length) showApiError(apiErrors[0]); } finally { for (const tn of textNodes) inFlightNodes.delete(tn.node); isTranslating=false; } return { apiTime,cacheHits,completed,failed }; }
  function translateBatch(items) { return new Promise((resolve,reject)=>{ try { chrome.runtime.sendMessage({ type:'BATCH_TRANSLATE', items:items.map(it=>({ id:it.id, text:it.text })), settings:{ apiKey:settings.apiKey,apiUrl:settings.apiUrl,model:settings.model,sourceLang:settings.sourceLang,targetLang:settings.targetLang } }, resp=>{ if (chrome.runtime.lastError) { if (chrome.runtime.lastError.message?.includes('context invalidated')) console.warn('[LinguaFlow] 扩展已更新，请刷新页面'); reject(new Error(chrome.runtime.lastError.message)); } else if (resp?.success) { if (resp.usage) addPageTokens(resp.usage); resolve(resp.translations); } else reject(new Error(resp?.error||'翻译失败')); }); } catch(e) { reject(e); } }); }
  function applyTranslation(node, originalText, translatedText, subNodes) { if (subNodes&&subNodes.length>1) { for (let i=0;i<subNodes.length;i++) { const orig=subNodes[i].textContent?subNodes[i].textContent.trim():(subNodes[i].value||'').trim(); if (subNodes[i].nodeType===Node.ELEMENT_NODE) { subNodes[i].value=i===0?translatedText:''; } else { subNodes[i].textContent=i===0?translatedText:''; } translationMap.set(subNodes[i],{ original:orig }); } const p=node.parentElement||node; if (p&&p.setAttribute) p.setAttribute('data-linguaflow-translated','true'); } else if (node.nodeType===Node.ELEMENT_NODE) { translationMap.set(node,{ original:originalText }); node.value=translatedText; if (node.setAttribute) node.setAttribute('data-linguaflow-translated','true'); } else { translationMap.set(node,{ original:originalText }); node.textContent=translatedText; const p=node.parentElement; if (p) { p.setAttribute('data-linguaflow-translated','true'); } } }
  function restoreOriginal() { if (abortController) abortController.abort(); for (const [node,data] of translationMap) { if (node.nodeType===Node.ELEMENT_NODE) node.value=data.original; else node.textContent=data.original; } translationMap.clear(); isTranslated=false; isTranslating=false; const mini=document.getElementById('lf-mini'); if (mini) { mini.classList.remove('translating','translated'); } }

  // ===== 缓存 =====
  let cacheDirty=false; function markCacheDirty() { cacheDirty=true; }
  async function flushCache() { if (!cacheDirty) return; cacheDirty=false; const entries=[]; const now=Date.now(); for (const [k,v] of translationCache) entries.push({ k,v,t:now }); if (entries.length>2000) { entries.sort((a,b)=>b.t-a.t); entries.length=2000; } await chrome.storage.local.set({ translation_cache:entries }).catch(()=>{}); }
  setInterval(flushCache,30000); window.addEventListener('pagehide',flushCache); window.addEventListener('beforeunload',flushCache);
  async function loadPersistentCache() { const langKey='last_target_lang'; const r=await chrome.storage.local.get([langKey,'translation_cache']); const currentLang=(await chrome.storage.sync.get('targetLang')).targetLang||'zh-CN'; if (r[langKey]&&r[langKey]!==currentLang) { console.log(`[LinguaFlow] 语言切换: ${r[langKey]} → ${currentLang}, 清除缓存`); translationCache.clear(); await chrome.storage.local.remove('translation_cache'); } await chrome.storage.local.set({ [langKey]:currentLang }); if (r.translation_cache&&Array.isArray(r.translation_cache)) { const now=Date.now(); let n=0; for (const e of r.translation_cache) { if (!e.k||!e.v) continue; if (now-e.t>3600000) continue; if (!translationCache.has(e.k)) { translationCache.set(e.k,e.v); n++; } } if (n) console.log('[LinguaFlow] 缓存加载:',n); } }

  // ===== 观察器 =====
  function startScrollObserver() { const cfg=MODES[mode]||MODES.medium; if (cfg.scroll) { const scan=async()=>{ if (!isTranslated||isTranslating) return; const nodes=collectTextNodes(document.body,{ viewportOnly:true, viewportMargin:window.innerHeight*1.5 }); if (!nodes.length) return; await translateAndApply(nodes,nodes.length); }; window.addEventListener('scroll',()=>{ clearTimeout(scrollTimer); scrollTimer=setTimeout(scan,200); },{ passive:true }); setTimeout(()=>{ if (!isTranslated||isTranslating) return; const nodes=collectTextNodes(document.body,{ viewportOnly:true, viewportMargin:0 }); if (nodes.length) translateAndApply(nodes,nodes.length); },4000); } if (cfg.hover) { let hoverQueue=[],hoverFlushTimer=null; function checkHover(e) { if (!isTranslated||isTranslating) return; clearTimeout(hoverFlushTimer); hoverFlushTimer=setTimeout(()=>{ if (!hoverQueue.length||isTranslating) return; if (hoverQueue.length<3) return; const batch=[...hoverQueue]; hoverQueue=[]; const seen=new Set(); const unique=batch.filter(n=>{ const k=n.node; if (seen.has(k)) return false; seen.add(k); return true; }); if (unique.length) translateAndApply(unique,unique.length); },300); const el=document.elementFromPoint(e.clientX,e.clientY); if (!el||el.closest('[id^="lf-"]')) return; const nodes=collectTextNodes(el,{ viewportOnly:true, viewportMargin:0 }); if (nodes.length) hoverQueue.push(...nodes); } document.addEventListener('mouseover',checkHover,{ passive:true }); document.addEventListener('mousemove',checkHover,{ passive:true }); } }
  function startMutationObserver() { const cfg=MODES[mode]||MODES.medium; if (!cfg.mutation) return; if (mutationObserver) return; let startedAt=Date.now(); mutationObserver=new MutationObserver(mutations=>{ if (Date.now()-startedAt<3000) return; let hasNew=false; for (const m of mutations) for (const node of m.addedNodes) { if (node.nodeType===Node.ELEMENT_NODE) { const found=collectTextNodes(node,{ viewportOnly:true, viewportMargin:window.innerHeight }); if (found.length) { pendingNodes.push(...found); hasNew=true; } } } if (hasNew) { clearTimeout(pendingTimer); pendingTimer=setTimeout(translatePending,800); } }); mutationObserver.observe(document.body,{ childList:true, subtree:true }); }
  async function translatePending() { if (!pendingNodes.length||!isTranslated||isTranslating) return; const nodes=[...pendingNodes]; pendingNodes=[]; await translateAndApply(nodes,nodes.length); }

  // ===== 消息 =====
  chrome.runtime.onMessage.addListener((msg,sender,sendResponse)=>{ switch(msg.type) { case 'START_TRANSLATION':sendResponse({ success:true });showTranslation=true;updateUsageBall();startTranslation(msg.settings,{ continuous:true }).catch(e=>console.error(e));break; case 'RESTORE_PAGE':restoreOriginal();showTranslation=false;updateUsageBall();showToast('warning',t('restored'));sendResponse({ success:true });break; case 'GET_STATUS':sendResponse({ isTranslated,isTranslating });break; case 'UI_LANG_CHANGED':if(msg.uiLang&&msg.uiLang!==uiLang){uiLang=msg.uiLang;updateAllUIText();updateUsageBall();updateDetailNumbers();const sel=document.getElementById('lf-ui-lang');if(sel)sel.value=uiLang;}break; case 'TOGGLE_PANEL':togglePanel();break; } });
  async function saveTabMode(on) { const id=await getTabId(); await chrome.storage.local.set({ [`tmode_${id}`]:on }); }
  async function getTabMode() { const id=await getTabId(); const r=await chrome.storage.local.get(`tmode_${id}`); return r[`tmode_${id}`]||false; }
  async function loadAndTranslate(opts={}) { const apiSettings=await readApiSettings(); if (!apiSettings.apiKey) { showToast('error','⚠️ '+t('noKey')); return; } if (apiSettings.supportsConcurrency===false) { showApiError('此 API 不支持并发，请在 Popup 中更换 API 或开启"支持并发"选项'); return; } const s=await chrome.storage.sync.get({ sourceLang:'auto',targetLang:'zh-CN',hoverOriginal:true,showProgress:true,mode:null }); if (s.mode) { mode=s.mode; } settings={ ...apiSettings, ...s }; abortController=new AbortController(); try { await startTranslation(settings,opts); } catch(e) { console.error(e); updateUsageBall(); } }
  function estimateCost(input,output) { const p={ 'deepseek-chat':[1,2],'deepseek-reasoner':[4,16] }[settings.model]||[1,2]; return (input/1e6)*p[0]+(output/1e6)*p[1]; }
  function addPageTokens(u) { if (!u) return; pageTokens.input+=u.prompt_tokens||0; pageTokens.output+=u.completion_tokens||0; pageTokens.total+=u.total_tokens||0; pageTokens.apiCalls++; updateUsageBall(); }

  // ===== Ctrl解释 — 气泡弹窗 =====
  function getBubble() {
    if (explainBubble) return explainBubble;
    const b = document.createElement('div'); b.id = 'lf-explain-bubble';
    b.innerHTML = `<div class="lf-explain-header"><span class="lf-explain-word" id="lf-explain-word"></span><button class="lf-explain-close" id="lf-explain-close">✕</button></div><div class="lf-explain-body" id="lf-explain-body"></div>`;
    document.body.appendChild(b);
    b.querySelector('#lf-explain-close').addEventListener('click', hideBubble);
    explainBubble = b;
    return b;
  }
  function showBubble(x, y, word) {
    const b = getBubble();
    document.getElementById('lf-explain-word').textContent = word;
    document.getElementById('lf-explain-body').innerHTML = '<span class="lf-explain-loading">…</span>';
    // 智能定位：优先在光标下方，空间不够则上方
    const bw = b.offsetWidth || 300, bh = 120;
    let left = x + 10, top = y + 14;
    if (left + bw > window.innerWidth - 10) left = window.innerWidth - bw - 10;
    if (left < 10) left = 10;
    if (top + bh > window.innerHeight - 10) top = y - bh - 6;
    if (top < 10) top = 10;
    b.style.left = left + 'px'; b.style.top = top + 'px';
    b.classList.add('show');
  }
  function updateBubble(text) {
    const body = document.getElementById('lf-explain-body');
    if (body) body.textContent = text;
    // 内容更新后重新定位，防止长文本超出屏幕
    if (explainBubble) {
      const r = explainBubble.getBoundingClientRect();
      if (r.bottom > window.innerHeight - 10) explainBubble.style.top = Math.max(10, window.innerHeight - r.height - 10) + 'px';
    }
  }
  function hideBubble() {
    if (explainBubble) { explainBubble.classList.remove('show'); explainBubble = null; setTimeout(() => { const b = document.getElementById('lf-explain-bubble'); if (b && !b.classList.contains('show')) b.remove(); }, 250); }
  }

  function handleExplainPoint(e) {
    if (!e.ctrlKey&&!e.metaKey) return;
    try {
    // 优先处理划词：用户选中了文字 → 直接解释选中内容
    const sel=window.getSelection(); const selText=(sel&&!sel.isCollapsed)?sel.toString().trim():'';
    if(selText&&selText.length>=1){
      if(inFlightWords.has(selText)) return;
      inFlightWords.add(selText);
      showBubble(e.clientX,e.clientY,selText);
      loadSettingsForExplain().then(cfg=>{ if(!cfg.apiKey){ inFlightWords.delete(selText); updateBubble('⚠️ '+t('noKey')); return; } chrome.runtime.sendMessage({ type:'EXPLAIN_WORD',word:selText,domain:location.hostname.replace('www.',''),nearbyText:'',htmlContext:'',settings:{ apiKey:cfg.apiKey,apiUrl:cfg.apiUrl,model:cfg.model,targetLang:cfg.targetLang||'zh-CN' } },resp=>{ inFlightWords.delete(selText); if(resp?.success&&resp.explanation){ if(resp.usage) addPageTokens(resp.usage); updateBubble(resp.explanation); } else { updateBubble('⚠️ '+(resp?.error||'请求失败')); } }); });
      return;
    }
    // 光标指向模式
    const el=document.elementFromPoint(e.clientX,e.clientY); if (!el||el.closest('[id^="lf-"],.lf-inline-explain')) return;
    const caret=document.caretRangeFromPoint(e.clientX,e.clientY);
    if (!caret) return;
    const cursorNode=caret.startContainer, cursorOffset=caret.startOffset;
    // 合集所有可见文本节点，同时精确定位光标
    const container=el.closest('p,div,span,li,td,th,h1,h2,h3,h4,h5,h6,a,article,section,main')||el;
    const walker=document.createTreeWalker(container,NodeFilter.SHOW_TEXT);
    const rawParts=[]; let cursorPos=-1, charCount=0; let tn;
    while(tn=walker.nextNode()) {
      if(tn.parentElement?.closest('[id^="lf-"],script,style,noscript')) continue;
      const t=tn.textContent; if(!t.trim()) continue;
      rawParts.push({node:tn,text:t});
      charCount+=t.length;
      if(charCount>200) break;
    }
    // 精确计算光标在整个文本中的位置
    let fullText='', posInFull=-1;
    for(const p of rawParts){
      const start=fullText.length;
      fullText+=p.text;
      if(p.node===cursorNode){
        posInFull=start+cursorOffset;
      }
    }
    // 如果没有精确匹配到光标节点，用光标在元素中的近似位置
    if(posInFull<0&&cursorNode){
      const allText=container.textContent||'';
      const nodeText=cursorNode.textContent||'';
      const idx=allText.indexOf(nodeText);
      if(idx>=0) posInFull=idx+cursorOffset;
    }
    if(!fullText||fullText.length<2) return;
    // 提取光标处单词
    let cursorWord='';
    if(posInFull>=0&&posInFull<fullText.length){
      const D=/[\s/\\.,;:!?()\[\]{}@#$%^&*+=<>|~`"' -​]/;
      let s=posInFull,e=posInFull;
      while(s>0&&!D.test(fullText[s-1])) s--;
      while(e<fullText.length&&!D.test(fullText[e])) e++;
      cursorWord=fullText.substring(s,e).trim();
    }
    // 取光标周围文本
    const ctxStart=Math.max(0,(posInFull>=0?posInFull:fullText.length/2)-40);
    const ctxEnd=Math.min(fullText.length,ctxStart+80);
    const nearbyText=fullText.substring(ctxStart,ctxEnd).replace(/\s+/g,' ').trim();
    // 收集 HTML 结构（兜底：代码判断）
    let htmlContext='';
    try { const p=el.closest('a,button,h1,h2,h3,h4,h5,h6,code,pre,[class*="user"],[class*="brand"],[class*="product"],[class*="title"]')||el.parentElement; if(p) htmlContext=p.outerHTML.substring(0,400); } catch {}
    const phrase=cursorWord||nearbyText.substring(0,40);
    if (inFlightWords.has(phrase)) return;
    inFlightWords.add(phrase);
    showBubble(e.clientX, e.clientY, cursorWord||'…');
    loadSettingsForExplain().then(cfg=>{ if (!cfg.apiKey) { inFlightWords.delete(phrase); updateBubble('⚠️ '+t('noKey')); return; } chrome.runtime.sendMessage({ type:'EXPLAIN_WORD',word:cursorWord,domain:location.hostname.replace('www.',''),nearbyText,htmlContext,settings:{ apiKey:cfg.apiKey,apiUrl:cfg.apiUrl,model:cfg.model,targetLang:cfg.targetLang||'zh-CN' } },resp=>{ inFlightWords.delete(phrase); if (resp?.success&&resp.explanation) { if (resp.usage) addPageTokens(resp.usage); updateBubble(resp.explanation); } else { updateBubble('⚠️ '+(resp?.error||'请求失败')); } }); });
    } catch(err) { console.error('[LF] 解释出错:', err); }
  }
  async function loadSettingsForExplain() { if (settings.apiKey) return settings; return await readApiSettings(); }
  let lastMX=0,lastMY=0,ctrlPressTimer=null; document.addEventListener('mousemove',e=>{ lastMX=e.clientX;lastMY=e.clientY; },{ passive:true }); document.addEventListener('keydown',e=>{ if(e.key==='Control'||e.key==='Meta'){ clearTimeout(ctrlPressTimer); ctrlPressTimer=setTimeout(()=>{ const el=document.elementFromPoint(lastMX,lastMY); if(!el||el.closest('[id^="lf-"]')) return; const sel=window.getSelection(); const selText=(sel&&!sel.isCollapsed)?sel.toString().trim():''; if(selText){ handleExplainPoint({ clientX:lastMX||window.innerWidth/2,clientY:lastMY||window.innerHeight/2,ctrlKey:true,metaKey:e.key==='Meta' }); } else { const caret=document.caretRangeFromPoint(lastMX,lastMY); if(caret&&caret.startContainer.nodeType===Node.TEXT_NODE&&caret.startContainer.textContent.trim()){ handleExplainPoint({ clientX:lastMX,clientY:lastMY,ctrlKey:e.key==='Control',metaKey:e.key==='Meta' }); } } },250); } if(e.key!=='Control'&&e.key!=='Meta'){ clearTimeout(ctrlPressTimer); } });

  // Esc
  document.addEventListener('keydown',e=>{ if(e.key==='Escape'){ if(isTranslating&&abortController){ abortController.abort(); return; } hideBubble(); inFlightWords.clear(); } });

  // 防御 GitHub 中文化插件
  const langOpts={'zh-CN':'简体中文','zh-TW':'繁體中文',en:'English',ja:'日本語',ko:'한국어',fr:'Français',de:'Deutsch',es:'Español',pt:'Português',ru:'Русский',ar:'العربية',hi:'हिन्दी',th:'ไทย',vi:'Tiếng Việt',it:'Italiano',nl:'Nederlands',pl:'Polski',tr:'Türkçe',id:'Bahasa Indonesia',sv:'Svenska',da:'Dansk',fi:'Suomi',no:'Norsk',cs:'Čeština',ro:'Română',hu:'Magyar',el:'Ελληνικά',he:'עברית',uk:'Українська',ms:'Bahasa Melayu',fil:'Filipino',bn:'বাংলা',ur:'اردو',fa:'فارسی',sw:'Kiswahili',ta:'தமிழ்',te:'తెలుగు',mr:'मराठी',gu:'ગુજરાતી',kn:'ಕನ್ನಡ',ml:'മലയാളം',pa:'ਪੰਜਾਬੀ',bg:'Български',sk:'Slovenčina',lt:'Lietuvių',lv:'Latviešu',et:'Eesti',sl:'Slovenščina',hr:'Hrvatski',sr:'Српски'};
  function restoreLangOptions() { [document.getElementById('lf-lang-from'),document.getElementById('lf-lang-to')].forEach(sel=>{ if(!sel) return; for(const opt of sel.options) { if(opt.value==='auto') continue; const correct=langOpts[opt.value]; if(correct&&opt.textContent!==correct) opt.textContent=correct; } }); }
  setInterval(restoreLangOptions,2000);

  // ===== 翻译面板 (Alt+F) =====
  function createPanel(){
    if(document.getElementById('lf-panel')) return;
    const p=document.createElement('div'); p.id='lf-panel';
    p.innerHTML=`<div class="lf-panel-head" id="lf-panel-head">
      <span class="lf-panel-title">🌐 ${t('translatePage')}</span>
      <span class="lf-panel-actions">
        <button class="lf-panel-btn" id="lf-panel-mini" title="收折">—</button>
        <button class="lf-panel-btn" id="lf-panel-close" title="关闭">✕</button>
      </span>
    </div>
    <div class="lf-panel-body">
      <div class="lf-panel-col">
        <div class="lf-panel-lang"><span>源语言</span><select id="lf-panel-src"></select></div>
        <textarea class="lf-panel-text" id="lf-panel-input" placeholder="输入文字…"></textarea>
      </div>
      <button class="lf-panel-swap" id="lf-panel-swap" title="交换语言">↔</button>
      <div class="lf-panel-col">
        <div class="lf-panel-lang"><span>目标语言</span><select id="lf-panel-tgt"></select></div>
        <textarea class="lf-panel-text" id="lf-panel-output" placeholder="翻译结果…" readonly></textarea>
      </div>
    </div>
    <div class="lf-panel-foot">
      <span class="lf-panel-char-count" id="lf-panel-count">0 字符</span>
      <span style="display:flex;gap:6px">
        <button class="lf-panel-btn" id="lf-panel-copy" title="复制译文">📋 复制</button>
        <button class="lf-panel-btn" id="lf-panel-translate" style="background:rgba(124,92,252,0.12);color:var(--lf-purple-soft)">🔄 翻译</button>
      </span>
    </div>`;
    document.body.appendChild(p);
    // 填充语言列表
    const langs=[{v:'auto',t:'自动检测'},{v:'zh-CN',t:'简体中文'},{v:'zh-TW',t:'繁體中文'},{v:'en',t:'English'},{v:'ja',t:'日本語'},{v:'ko',t:'한국어'},{v:'fr',t:'Français'},{v:'de',t:'Deutsch'},{v:'es',t:'Español'},{v:'pt',t:'Português'},{v:'ru',t:'Русский'},{v:'ar',t:'العربية'},{v:'hi',t:'हिन्दी'},{v:'th',t:'ไทย'},{v:'vi',t:'Tiếng Việt'},{v:'it',t:'Italiano'},{v:'nl',t:'Nederlands'},{v:'pl',t:'Polski'},{v:'tr',t:'Türkçe'},{v:'id',t:'Indonesia'},{v:'sv',t:'Svenska'}];
    const srcSel=document.getElementById('lf-panel-src'), tgtSel=document.getElementById('lf-panel-tgt');
    langs.forEach(l=>{ srcSel.appendChild(new Option(l.t,l.v)); tgtSel.appendChild(new Option(l.t,l.v)); });
    chrome.storage.sync.get('targetLang',s=>{ if(s.targetLang) tgtSel.value=s.targetLang; });
    // 事件
    let panelDrag=false,px=0,py=0;
    document.getElementById('lf-panel-head').addEventListener('mousedown',e=>{ if(e.target.closest('button'))return; panelDrag=true; const r=p.getBoundingClientRect(); px=e.clientX-r.left; py=e.clientY-r.top; p.style.transform='none'; p.style.left=r.left+'px'; p.style.top=r.top+'px'; });
    document.addEventListener('mousemove',e=>{ if(!panelDrag)return; p.style.left=(e.clientX-px)+'px'; p.style.top=(e.clientY-py)+'px'; });
    document.addEventListener('mouseup',()=>{ panelDrag=false; });
    document.getElementById('lf-panel-close').addEventListener('click',()=>p.classList.remove('show'));
    document.getElementById('lf-panel-mini').addEventListener('click',()=>p.classList.toggle('mini'));
    document.getElementById('lf-panel-swap').addEventListener('click',()=>{ const sv=srcSel.value,tv=tgtSel.value; srcSel.value=tv; tgtSel.value=sv; const inp=document.getElementById('lf-panel-input'); const out=document.getElementById('lf-panel-output'); if(out.value){ inp.value=out.value; out.value=''; } });
    document.getElementById('lf-panel-copy').addEventListener('click',()=>{ const v=document.getElementById('lf-panel-output').value; if(v){ navigator.clipboard.writeText(v).then(()=>showToast('success','✅ 已复制')); } });
    document.getElementById('lf-panel-input').addEventListener('input',()=>{ document.getElementById('lf-panel-count').textContent=(document.getElementById('lf-panel-input').value.length||0)+' 字符'; });
    let panelTimer=null;
    const doPanelTranslate=async()=>{
      const inp=document.getElementById('lf-panel-input'); const txt=inp.value.trim(); if(!txt) return;
      const out=document.getElementById('lf-panel-output');
      const btn=document.getElementById('lf-panel-translate'); btn.textContent='⏳'; btn.disabled=true;
      const cfg=await readApiSettings(); if(!cfg.apiKey){ out.value='⚠️ '+t('noKey'); btn.textContent='🔄 翻译'; btn.disabled=false; return; }
      chrome.runtime.sendMessage({ type:'PANEL_TRANSLATE', text:txt, sourceLang:srcSel.value, targetLang:tgtSel.value, settings:{ apiKey:cfg.apiKey, apiUrl:cfg.apiUrl, model:cfg.model } }, resp=>{
        btn.textContent='🔄 翻译'; btn.disabled=false;
        if(resp?.success){ out.value=resp.translation; if(resp.usage) addPageTokens(resp.usage); }
        else out.value='⚠️ '+(resp?.error||'翻译失败');
      });
    };
    document.getElementById('lf-panel-translate').addEventListener('click',doPanelTranslate);
    document.getElementById('lf-panel-input').addEventListener('input',()=>{ clearTimeout(panelTimer); panelTimer=setTimeout(doPanelTranslate,500); });
  }
  function togglePanel(){ createPanel(); const p=document.getElementById('lf-panel'); p.classList.toggle('show'); if(p.classList.contains('show')){ chrome.storage.sync.get('targetLang',s=>{ if(s.targetLang) document.getElementById('lf-panel-tgt').value=s.targetLang; }); document.getElementById('lf-panel-input').focus(); } }
  document.addEventListener('keydown',e=>{ if(e.key==='Escape'&&document.getElementById('lf-panel')?.classList.contains('show')){ const inp=document.activeElement; if(inp&&inp.id==='lf-panel-input') return; document.getElementById('lf-panel').classList.remove('show'); } });

  // 先读折叠状态，再构建 UI（防止异步导致闪烁）
  (async()=>{
    const r = await chrome.storage.local.get('lf_collapsed');
    buildUI();
    if (r.lf_collapsed) {
      document.getElementById('lf-wrapper').classList.add('collapsed');
      document.getElementById('lf-mini').classList.add('visible');
      document.getElementById('btn-collapse').classList.add('collapsed');
    }
    updateMiniText(); const stored=await chrome.storage.sync.get('uiLang'); if(stored.uiLang&&stored.uiLang!==uiLang){ uiLang=stored.uiLang; updateAllUIText(); const sel=document.getElementById('lf-ui-lang'); if(sel) sel.value=uiLang; } await getTabId(); await loadPersistentCache(); if(await getTabMode()){ switchIntent=true; showTranslation=true; updateUsageBall(); setTimeout(()=>loadAndTranslate({ continuous:true }),800); } })();
  console.log('🌐 Faluber Translate 已加载');
})();
