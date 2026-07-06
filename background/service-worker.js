/**
 * Faluber Translate Service Worker — API 调用 + 完整日志
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
  if (msg.type === 'FETCH_MODELS') { handleFetchModels(msg, sendResponse); return true; }
  if (msg.type === 'PANEL_TRANSLATE') { handlePanelTranslate(msg, sendResponse); return true; }
  return false;
});

// ===== 语言映射（全局）=====
const LANG_MAP={ 'zh-CN':'简体中文','zh-TW':'繁體中文',en:'English',ja:'日本語',ko:'한국어',fr:'Français',de:'Deutsch',es:'Español',pt:'Português',ru:'Русский',ar:'العربية',hi:'हिन्दी',th:'ไทย',vi:'Tiếng Việt',it:'Italiano',nl:'Nederlands',pl:'Polski',tr:'Türkçe',id:'Bahasa Indonesia',sv:'Svenska',da:'Dansk',fi:'Suomi',no:'Norsk',cs:'Čeština',ro:'Română',hu:'Magyar',el:'Ελληνικά',he:'עברית',uk:'Українська',ms:'Bahasa Melayu',fil:'Filipino',bn:'বাংলা',ur:'اردو',fa:'فارسی',sw:'Kiswahili',ta:'தமிழ்',te:'తెలుగు',mr:'मराठी',gu:'ગુજરાતી',kn:'ಕನ್ನಡ',ml:'മലയാളം',pa:'ਪੰਜਾਬੀ',bg:'Български',sk:'Slovenčina',lt:'Lietuvių',lv:'Latviešu',et:'Eesti',sl:'Slovenščina',hr:'Hrvatski',sr:'Српски' };

// 提示词模板（按目标语言本地化，避免跨语言 token 浪费）
// $d=domain, $t=context text, $w=cursor word, $h=html code
const PROMPT={
  'zh-CN':{main:'你是一个诚实的词典。我在$d看到"$t"，请解释其中$w。用简体中文回答，尽量精简。',word:'光标指向的词',html:'你是一个诚实的词典。我在$d看到这段网页代码"$h"，里面包含的词最可能是什么？用简体中文回答，尽量精简。'},
  'zh-TW':{main:'你是一個誠實的詞典。我在$d看到"$t"，請解釋其中$w。用繁體中文回答，盡量精簡。',word:'光標指向的詞',html:'你是一個誠實的詞典。我在$d看到這段網頁代碼"$h"，裡面包含的詞最可能是什麼？用繁體中文回答，盡量精簡。'},
  en:{main:'You are an honest dictionary. I saw "$t" on $d. Explain $w.',word:'the word at cursor',html:'You are an honest dictionary. I saw this webpage code on $d: "$h". What is the word inside most likely to be?'},
  ja:{main:'あなたは誠実な辞書です。$dで"$t"を見ました。$wを説明してください。日本語で簡潔に答えてください。',word:'カーソル位置の単語',html:'あなたは誠実な辞書です。$dでこのウェブページコードを見ました："$h"。中に含まれる単語は何ですか？日本語で簡潔に答えてください。'},
  ko:{main:'당신은 정직한 사전입니다. $d에서 "$t"를 보았습니다. $w을 설명해주세요. 한국어로 간결하게 답변해주세요.',word:'커서 위치의 단어',html:'당신은 정직한 사전입니다. $d에서 이 웹페이지 코드를 보았습니다: "$h". 안에 포함된 단어는 무엇인가요? 한국어로 간결하게 답변해주세요.'},
  fr:{main:'Tu es un dictionnaire honnête. J\'ai vu "$t" sur $d. Explique $w. Réponds en français, sois concis.',word:'le mot sous le curseur',html:'Tu es un dictionnaire honnête. J\'ai vu ce code sur $d : "$h". Quel est le mot le plus probable ? Réponds en français, sois concis.'},
  de:{main:'Du bist ein ehrliches Wörterbuch. Ich habe "$t" auf $d gesehen. Erkläre $w. Antworte auf Deutsch, sei kurz.',word:'das Wort am Cursor',html:'Du bist ein ehrliches Wörterbuch. Ich habe diesen Code auf $d gesehen: "$h". Was ist das wahrscheinlichste Wort? Antworte auf Deutsch, sei kurz.'},
  es:{main:'Eres un diccionario honesto. Vi "$t" en $d. Explica $w. Responde en español, sé conciso.',word:'la palabra bajo el cursor',html:'Eres un diccionario honesto. Vi este código en $d: "$h". ¿Cuál es la palabra más probable? Responde en español, sé conciso.'},
  pt:{main:'Você é um dicionário honesto. Eu vi "$t" no $d. Explique $w. Responda em português, seja conciso.',word:'a palavra sob o cursor',html:'Você é um dicionário honesto. Eu vi este código no $d: "$h". Qual é a palavra mais provável? Responda em português, seja conciso.'},
  ru:{main:'Ты честный словарь. Я увидел "$t" на $d. Объясни $w. Ответь на русском, будь краток.',word:'слово под курсором',html:'Ты честный словарь. Я увидел этот код на $d: "$h". Какое слово наиболее вероятно? Ответь на русском, будь краток.'},
  ar:{main:'أنت قاموس صادق. رأيت "$t" على $d. اشرح $w. أجب بالعربية، كن موجزًا.',word:'الكلمة تحت المؤشر',html:'أنت قاموس صادق. رأيت هذا الكود على $d: "$h". ما هي الكلمة الأكثر احتمالاً؟ أجب بالعربية، كن موجزًا.'},
  hi:{main:'आप एक ईमानदार शब्दकोश हैं। मैंने $d पर "$t" देखा। $w समझाएं। हिंदी में उत्तर दें, संक्षिप्त रहें।',word:'कर्सर पर शब्द',html:'आप एक ईमानदार शब्दकोश हैं। मैंने $d पर यह कोड देखा: "$h"। इसमें सबसे संभावित शब्द क्या है? हिंदी में उत्तर दें, संक्षिप्त रहें।'},
  th:{main:'คุณเป็นพจนานุกรมที่ซื่อสัตย์ ฉันเห็น "$t" บน $d อธิบาย $w ตอบเป็นภาษาไทย สั้นๆ',word:'คำที่เคอร์เซอร์',html:'คุณเป็นพจนานุกรมที่ซื่อสัตย์ ฉันเห็นโค้ดนี้บน $d: "$h" คำที่อยู่ในนั้นน่าจะเป็นอะไร? ตอบเป็นภาษาไทย สั้นๆ'},
  vi:{main:'Bạn là một từ điển trung thực. Tôi đã thấy "$t" trên $d. Giải thích $w. Trả lời bằng tiếng Việt, ngắn gọn.',word:'từ tại con trỏ',html:'Bạn là một từ điển trung thực. Tôi đã thấy mã này trên $d: "$h". Từ bên trong có khả năng là gì? Trả lời bằng tiếng Việt, ngắn gọn.'},
  it:{main:'Sei un dizionario onesto. Ho visto "$t" su $d. Spiega $w. Rispondi in italiano, sii conciso.',word:'la parola sotto il cursore',html:'Sei un dizionario onesto. Ho visto questo codice su $d: "$h". Qual è la parola più probabile? Rispondi in italiano, sii conciso.'},
  nl:{main:'Je bent een eerlijk woordenboek. Ik zag "$t" op $d. Leg $w uit. Antwoord in het Nederlands, wees bondig.',word:'het woord onder de cursor',html:'Je bent een eerlijk woordenboek. Ik zag deze code op $d: "$h". Wat is het meest waarschijnlijke woord? Antwoord in het Nederlands, wees bondig.'},
  pl:{main:'Jesteś uczciwym słownikiem. Zobaczyłem "$t" na $d. Wyjaśnij $w. Odpowiedz po polsku, bądź zwięzły.',word:'słowo pod kursorem',html:'Jesteś uczciwym słownikiem. Zobaczyłem ten kod na $d: "$h". Jakie słowo jest najbardziej prawdopodobne? Odpowiedz po polsku, bądź zwięzły.'},
  tr:{main:'Sen dürüst bir sözlüksün. $d sitesinde "$t" gördüm. $w açıkla. Türkçe yanıtla, kısa olsun.',word:'imleçteki kelime',html:'Sen dürüst bir sözlüksün. $d sitesinde bu kodu gördüm: "$h". İçindeki kelime büyük ihtimalle nedir? Türkçe yanıtla, kısa olsun.'},
  id:{main:'Kamu adalah kamus yang jujur. Saya melihat "$t" di $d. Jelaskan $w. Jawab dalam bahasa Indonesia, singkat saja.',word:'kata di kursor',html:'Kamu adalah kamus yang jujur. Saya melihat kode ini di $d: "$h". Kata apa yang paling mungkin? Jawab dalam bahasa Indonesia, singkat saja.'},
  sv:{main:'Du är en ärlig ordbok. Jag såg "$t" på $d. Förklara $w. Svara på svenska, var kortfattad.',word:'ordet vid markören',html:'Du är en ärlig ordbok. Jag såg denna kod på $d: "$h". Vilket ord är mest troligt? Svara på svenska, var kortfattad.'},
  da:{main:'Du er en ærlig ordbog. Jeg så "$t" på $d. Forklar $w. Svar på dansk, vær kortfattet.',word:'ordet ved markøren',html:'Du er en ærlig ordbog. Jeg så denne kode på $d: "$h". Hvilket ord er mest sandsynligt? Svar på dansk, vær kortfattet.'},
  fi:{main:'Olet rehellinen sanakirja. Näin "$t" sivustolla $d. Selitä $w. Vastaa suomeksi, ole ytimekäs.',word:'kohdistimen sana',html:'Olet rehellinen sanakirja. Näin tämän koodin sivustolla $d: "$h". Mikä sana on todennäköisin? Vastaa suomeksi, ole ytimekäs.'},
  no:{main:'Du er en ærlig ordbok. Jeg så "$t" på $d. Forklar $w. Svar på norsk, vær kortfattet.',word:'ordet ved markøren',html:'Du er en ærlig ordbok. Jeg så denne koden på $d: "$h". Hvilket ord er mest sannsynlig? Svar på norsk, vær kortfattet.'},
  cs:{main:'Jsi upřímný slovník. Viděl jsem "$t" na $d. Vysvětli $w. Odpověz česky, buď stručný.',word:'slovo pod kurzorem',html:'Jsi upřímný slovník. Viděl jsem tento kód na $d: "$h". Jaké slovo je nejpravděpodobnější? Odpověz česky, buď stručný.'},
  ro:{main:'Ești un dicționar cinstit. Am văzut "$t" pe $d. Explică $w. Răspunde în română, fii concis.',word:'cuvântul de sub cursor',html:'Ești un dicționar cinstit. Am văzut acest cod pe $d: "$h". Care este cel mai probabil cuvânt? Răspunde în română, fii concis.'},
  hu:{main:'Te egy őszinte szótár vagy. Láttam "$t" a $d oldalon. Magyarázd meg $w. Válaszolj magyarul, légy tömör.',word:'a kurzor alatti szó',html:'Te egy őszinte szótár vagy. Láttam ezt a kódot a $d oldalon: "$h". Mi a legvalószínűbb szó? Válaszolj magyarul, légy tömör.'},
  el:{main:'Είσαι ένα έντιμο λεξικό. Είδα "$t" στο $d. Εξήγησε το $w. Απάντησε στα ελληνικά, συνόψισε.',word:'η λέξη στον κέρσορα',html:'Είσαι ένα έντιμο λεξικό. Είδα αυτόν τον κώδικα στο $d: "$h". Ποια είναι η πιο πιθανή λέξη; Απάντησε στα ελληνικά, συνόψισε.'},
  he:{main:'אתה מילון כן. ראיתי "$t" ב-$d. הסבר את $w. ענה בעברית, היה תמציתי.',word:'המילה בסמן',html:'אתה מילון כן. ראיתי את הקוד הזה ב-$d: "$h". מה המילה הסבירה ביותר? ענה בעברית, היה תמציתי.'},
  uk:{main:'Ти чесний словник. Я побачив "$t" на $d. Поясни $w. Відповідай українською, будь стислим.',word:'слово під курсором',html:'Ти чесний словник. Я побачив цей код на $d: "$h". Яке слово найімовірніше? Відповідай українською, будь стислим.'},
  ms:{main:'Anda adalah kamus yang jujur. Saya lihat "$t" di $d. Jelaskan $w. Jawab dalam bahasa Melayu, ringkas.',word:'perkataan di kursor',html:'Anda adalah kamus yang jujur. Saya lihat kod ini di $d: "$h". Apakah perkataan yang paling mungkin? Jawab dalam bahasa Melayu, ringkas.'},
  fil:{main:'Ikaw ay isang matapat na diksyunaryo. Nakita ko "$t" sa $d. Ipaliwanag ang $w. Sumagot sa Filipino, maikli lang.',word:'salita sa cursor',html:'Ikaw ay isang matapat na diksyunaryo. Nakita ko ang code na ito sa $d: "$h". Ano ang pinaka-malamang na salita? Sumagot sa Filipino, maikli lang.'},
  bn:{main:'আপনি একটি সৎ অভিধান। আমি $d এ "$t" দেখেছি। $w ব্যাখ্যা করুন। বাংলায় উত্তর দিন, সংক্ষেপে।',word:'কার্সারের শব্দ',html:'আপনি একটি সৎ অভিধান। আমি $d এ এই কোড দেখেছি: "$h"। ভিতরের শব্দটি সম্ভবত কী? বাংলায় উত্তর দিন, সংক্ষেপে।'},
  ur:{main:'آپ ایک ایماندار لغت ہیں۔ میں نے $d پر "$t" دیکھا۔ $w کی وضاحت کریں۔ اردو میں جواب دیں، مختصر۔',word:'کرسر پر لفظ',html:'آپ ایک ایماندار لغت ہیں۔ میں نے $d پر یہ کوڈ دیکھا: "$h"۔ اندر کا لفظ غالباً کیا ہے؟ اردو میں جواب دیں، مختصر۔'},
  fa:{main:'تو یک فرهنگ لغت صادق هستی. من "$t" را در $d دیدم. $w را توضیح بده. به فارسی جواب بده، مختصر.',word:'کلمه زیر نشانگر',html:'تو یک فرهنگ لغت صادق هستی. من این کد را در $d دیدم: "$h". محتمل‌ترین کلمه چیست؟ به فارسی جواب بده، مختصر.'},
  sw:{main:'Wewe ni kamusi mwaminifu. Niliona "$t" kwenye $d. Eleza $w. Jibu kwa Kiswahili, kwa ufupi.',word:'neno kwenye kishale',html:'Wewe ni kamusi mwaminifu. Niliona msimbo huu kwenye $d: "$h". Neno la ndani linaweza kuwa nini? Jibu kwa Kiswahili, kwa ufupi.'},
  ta:{main:'நீங்கள் ஒரு நேர்மையான அகராதி. நான் $d இல் "$t" பார்த்தேன். $w விளக்கவும். தமிழில் பதிலளிக்கவும், சுருக்கமாக.',word:'கர்சரில் உள்ள சொல்',html:'நீங்கள் ஒரு நேர்மையான அகராதி. நான் $d இல் இந்த குறியீட்டைப் பார்த்தேன்: "$h". உள்ளே உள்ள சொல் என்னவாக இருக்கும்? தமிழில் பதிலளிக்கவும், சுருக்கமாக.'},
  te:{main:'మీరు నిజాయితీ గల నిఘంటువు. నేను $d లో "$t" చూశాను. $w వివరించండి. తెలుగులో సమాధానం ఇవ్వండి, సంక్షిప్తంగా.',word:'కర్సర్ వద్ద పదం',html:'మీరు నిజాయితీ గల నిఘంటువు. నేను $d లో ఈ కోడ్ చూశాను: "$h". లోపల ఉన్న పదం ఏమిటి? తెలుగులో సమాధానం ఇవ్వండి, సంక్షిప్తంగా.'},
  mr:{main:'तुम्ही एक प्रामाणिक शब्दकोश आहात. मी $d वर "$t" पाहिले. $w स्पष्ट करा. मराठीत उत्तर द्या, संक्षिप्त.',word:'कर्सरवरील शब्द',html:'तुम्ही एक प्रामाणिक शब्दकोश आहात. मी $d वर हा कोड पाहिला: "$h". आतील शब्द बहुधा काय आहे? मराठीत उत्तर द्या, संक्षिप्त.'},
  gu:{main:'તમે એક પ્રમાણિક શબ્દકોશ છો. મેં $d પર "$t" જોયું. $w સમજાવો. ગુજરાતીમાં જવાબ આપો, સંક્ષિપ્તમાં.',word:'કર્સર પરનો શબ્દ',html:'તમે એક પ્રમાણિક શબ્દકોશ છો. મેં $d પર આ કોડ જોયો: "$h". અંદરનો શબ્દ મોટે ભાગે શું છે? ગુજરાતીમાં જવાબ આપો, સંક્ષિપ્તમાં.'},
  kn:{main:'ನೀವು ಪ್ರಾಮಾಣಿಕ ನಿಘಂಟು. ನಾನು $d ನಲ್ಲಿ "$t" ನೋಡಿದೆ. $w ವಿವರಿಸಿ. ಕನ್ನಡದಲ್ಲಿ ಉತ್ತರಿಸಿ, ಸಂಕ್ಷಿಪ್ತವಾಗಿ.',word:'ಕರ್ಸರ್‌ನಲ್ಲಿರುವ ಪದ',html:'ನೀವು ಪ್ರಾಮಾಣಿಕ ನಿಘಂಟು. ನಾನು $d ನಲ್ಲಿ ಈ ಕೋಡ್ ನೋಡಿದೆ: "$h". ಒಳಗಿನ ಪದ ಹೆಚ್ಚಾಗಿ ಏನಿರಬಹುದು? ಕನ್ನಡದಲ್ಲಿ ಉತ್ತರಿಸಿ, ಸಂಕ್ಷಿಪ್ತವಾಗಿ.'},
  ml:{main:'നിങ്ങൾ സത്യസന്ധമായ നിഘണ്ടുവാണ്. ഞാൻ $d ൽ "$t" കണ്ടു. $w വിശദീകരിക്കുക. മലയാളത്തിൽ ഉത്തരം നൽകുക, സംക്ഷിപ്തമായി.',word:'കഴ്സറിലെ വാക്ക്',html:'നിങ്ങൾ സത്യസന്ധമായ നിഘണ്ടുവാണ്. ഞാൻ $d ൽ ഈ കോഡ് കണ്ടു: "$h". ഉള്ളിലെ വാക്ക് എന്തായിരിക്കാം? മലയാളത്തിൽ ഉത്തരം നൽകുക, സംക്ഷിപ്തമായി.'},
  pa:{main:'ਤੁਸੀਂ ਇੱਕ ਈਮਾਨਦਾਰ ਸ਼ਬਦਕੋਸ਼ ਹੋ। ਮੈਂ $d ਉੱਤੇ "$t" ਦੇਖਿਆ। $w ਸਮਝਾਓ। ਪੰਜਾਬੀ ਵਿੱਚ ਜਵਾਬ ਦਿਓ, ਸੰਖੇਪ।',word:'ਕਰਸਰ ਉੱਤੇ ਸ਼ਬਦ',html:'ਤੁਸੀਂ ਇੱਕ ਈਮਾਨਦਾਰ ਸ਼ਬਦਕੋਸ਼ ਹੋ। ਮੈਂ $d ਉੱਤੇ ਇਹ ਕੋਡ ਦੇਖਿਆ: "$h"। ਅੰਦਰਲਾ ਸ਼ਬਦ ਸੰਭਵ ਤੌਰ \'ਤੇ ਕੀ ਹੈ? ਪੰਜਾਬੀ ਵਿੱਚ ਜਵਾਬ ਦਿਓ, ਸੰਖੇਪ।'},
  bg:{main:'Ти си честен речник. Видях "$t" на $d. Обясни $w. Отговори на български, бъди кратък.',word:'думата под курсора',html:'Ти си честен речник. Видях този код на $d: "$h". Коя е най-вероятната дума? Отговори на български, бъди кратък.'},
  sk:{main:'Si úprimný slovník. Videl som "$t" na $d. Vysvetli $w. Odpovedz po slovensky, buď stručný.',word:'slovo pod kurzorom',html:'Si úprimný slovník. Videl som tento kód na $d: "$h". Aké slovo je najpravdepodobnejšie? Odpovedz po slovensky, buď stručný.'},
  lt:{main:'Tu esi sąžiningas žodynas. Mačiau "$t" svetainėje $d. Paaiškink $w. Atsakyk lietuviškai, būk trumpas.',word:'žodis po žymekliu',html:'Tu esi sąžiningas žodynas. Mačiau šį kodą svetainėje $d: "$h". Koks žodis labiausiai tikėtinas? Atsakyk lietuviškai, būk trumpas.'},
  lv:{main:'Tu esi godīga vārdnīca. Es redzēju "$t" vietnē $d. Izskaidro $w. Atbildi latviski, īsi.',word:'vārds zem kursora',html:'Tu esi godīga vārdnīca. Es redzēju šo kodu vietnē $d: "$h". Kāds vārds ir visticamākais? Atbildi latviski, īsi.'},
  et:{main:'Sa oled aus sõnaraamat. Nägin "$t" saidil $d. Selgita $w. Vasta eesti keeles, ole lühike.',word:'sõna kursori all',html:'Sa oled aus sõnaraamat. Nägin seda koodi saidil $d: "$h". Mis sõna on kõige tõenäolisem? Vasta eesti keeles, ole lühike.'},
  sl:{main:'Si iskren slovar. Videl sem "$t" na $d. Razloži $w. Odgovori v slovenščini, bodi kratek.',word:'beseda pod kazalcem',html:'Si iskren slovar. Videl sem to kodo na $d: "$h". Katera beseda je najbolj verjetna? Odgovori v slovenščini, bodi kratek.'},
  hr:{main:'Ti si iskren rječnik. Vidio sam "$t" na $d. Objasni $w. Odgovori na hrvatskom, budi kratak.',word:'riječ pod kursorom',html:'Ti si iskren rječnik. Vidio sam ovaj kod na $d: "$h". Koja je riječ najvjerojatnija? Odgovori na hrvatskom, budi kratak.'},
  sr:{main:'Ти си искрен речник. Видео сам "$t" на $d. Објасни $w. Одговори на српском, буди кратак.',word:'реч под курсором',html:'Ти си искрен речник. Видео сам овај код на $d: "$h". Која је реч највероватнија? Одговори на српском, буди кратак.'},
};

function buildPrompt(lang,key,domain,nearbyText,word,htmlContext){
  let tpl=PROMPT[lang];
  if(!tpl||!tpl[key]) tpl=PROMPT['en']; // 未适配的语言用英文模板
  let t=tpl[key]||tpl.main||PROMPT['en'].main;
  t=t.replace('$d',domain).replace('$t',nearbyText||'').replace('$w',word||tpl.word||'').replace('$h',htmlContext||'');
  // 已适配语言自带语言指令，未适配的追加语言指令
  if(!PROMPT[lang]) t+=' Answer in '+LANG_MAP[lang]+'. Be concise.';
  return t;
}

// ===== 批量翻译 =====
async function handleBatchTranslate(msg, sendResponse) {
  const startTime = Date.now();
  const { items, settings } = msg;
  const { apiKey, apiUrl, model, targetLang } = settings;
  const totalChars = items.reduce((s, it) => s + it.text.length, 0);

  const lines = items.map(it => `[${it.id}] ${it.text}`).join('\n');
  const targetName = LANG_MAP[targetLang] || targetLang;
  const systemPrompt = `Translate the following text to ${targetName}. The text is split into numbered segments for technical reasons, but you should translate it as one flowing document — maintain consistency across segments, keep proper nouns and terminology uniform. Output each [ID] on a new line, keep markers, no extra text.`;

  console.log(`[SW] 批量翻译: ${items.length} 项, ${totalChars} 字符`);

  let logEntry = { items: items.length, chars: totalChars, model, prompt: lines.substring(0, 500), systemPrompt };
  try {
    const body = JSON.stringify({
      model, messages: [{ role: 'system', content: systemPrompt }, { role: 'user', content: lines }],
      temperature: 0.3, max_tokens: 3000, reasoning_effort: 'low',
    });

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
  const { word, domain, nearbyText, htmlContext, settings } = msg;
  const { apiKey, apiUrl, model, targetLang } = settings;
  const langName = LANG_MAP[targetLang] || targetLang || '简体中文';
  try {
    async function callApi(p) {
      const r = await fetch(`${apiUrl}/chat/completions`, {
        method: 'POST',
        headers: { 'Content-Type':'application/json', 'Authorization':`Bearer ${apiKey}` },
        body: JSON.stringify({ model, messages: [{ role:'user', content: p }], max_tokens:1000, reasoning_effort:'low' }),
      });
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      const d = await r.json();
      return { data: d, text: d.choices?.[0]?.message?.content?.trim() };
    }

    // 拼接完整上下文（含光标标记）
    let result;
    if (word || nearbyText) {
      const prompt=buildPrompt(targetLang,'main',domain,nearbyText,word);
      console.log('[SW] 解释请求:', { domain, word, targetLang });
      console.log('[SW] 解释请求:', { domain, word, ctxLen: nearbyText.length });
      result = await callApi(prompt);
      if (result&&result.text&&/不知道|不认识|不确定|无法确定/i.test(result.text)) result.text='';
    }
    // 不认识 → HTML 兜底
    if ((!result||!result.text) && htmlContext) {
      console.log('[SW] HTML重试:', htmlContext.substring(0,80));
      result = await callApi(buildPrompt(targetLang,'html',domain,'','',htmlContext));
    }
    if (!result||!result.text) { sendResponse({ success: false, error: '无法识别' }); return; }

    const explanation = result.text;
    const data = result.data;
    console.log('[SW] 解释响应:', explanation);
    // 记录 token 用量
    if (data && data.usage) {
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
      const stored = await chrome.storage.sync.get({ apis: null, activeApiId: null, apiKey: '', apiUrl: 'https://api.deepseek.com/v1', model: 'deepseek-chat', sourceLang:'auto', targetLang:'zh-CN', hoverOriginal:true, showProgress:true });
      let apiSettings;
      if (stored.apis && stored.activeApiId) {
        const active = stored.apis.find(a => a.id === stored.activeApiId) || stored.apis[0];
        apiSettings = active ? { apiKey: active.apiKey, apiUrl: active.apiUrl, model: active.model } : { apiKey: stored.apiKey, apiUrl: stored.apiUrl, model: stored.model };
      } else {
        apiSettings = { apiKey: stored.apiKey, apiUrl: stored.apiUrl, model: stored.model };
      }
      if (!apiSettings.apiKey) { chrome.action.openPopup(); return; }
      await chrome.tabs.sendMessage(tab.id, { type:'START_TRANSLATION', settings: { ...apiSettings, sourceLang: stored.sourceLang, targetLang: stored.targetLang } });
    } catch {}
  }
  if (command === 'translate-panel') {
    try {
      const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
      if (!tab?.id) return;
      await chrome.tabs.sendMessage(tab.id, { type:'TOGGLE_PANEL' });
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
      body: JSON.stringify({ model, messages:[{ role:'system', content:'Reply with only "OK".' },{ role:'user', content:'Hi' }], max_tokens:5 }),
    });
    if (response.ok) sendResponse({ success:true });
    else {
      let errMsg = `HTTP ${response.status}`;
      try { const e = await response.json(); errMsg = e.error?.message || errMsg; } catch {}
      sendResponse({ success:false, error:errMsg });
    }
  } catch (err) { sendResponse({ success: false, error: err.message }); }
}

// ===== 面板翻译（单条，无[N]格式）=====
async function handlePanelTranslate(msg, sendResponse) {
  const { text, maxTokens, sourceLang, targetLang, settings } = msg;
  const { apiKey, apiUrl, model } = settings;
  const targetName = LANG_MAP[targetLang] || targetLang;
  try {
    const systemPrompt = `你是专业翻译员。将以下文字翻译成${targetName}，只输出译文，不要解释、不要注释、不要原文。`;
    const response = await fetch(`${apiUrl}/chat/completions`, {
      method: 'POST',
      headers: { 'Content-Type':'application/json', 'Authorization':`Bearer ${apiKey}` },
      body: JSON.stringify({ model, messages:[{ role:'system', content:systemPrompt },{ role:'user', content:text }], max_tokens:maxTokens||800, reasoning_effort:'low' }),
    });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    const translation = data.choices?.[0]?.message?.content?.trim() || '';
    if (data.usage) {
      const key = `tokens_${apiKey.substring(0, 8)}`;
      const stored = await chrome.storage.local.get(key);
      const prev = stored[key] || { input:0, output:0, total:0 };
      await chrome.storage.local.set({ [key]: { input:prev.input+(data.usage.prompt_tokens||0), output:prev.output+(data.usage.completion_tokens||0), total:prev.total+(data.usage.total_tokens||0), cacheHit:prev.cacheHit||0, cacheMiss:prev.cacheMiss||0, lastModel:model } });
      chrome.runtime.sendMessage({ type:'TOKEN_USAGE_UPDATED' }).catch(()=>{});
      sendResponse({ success:true, translation, usage:data.usage });
    } else {
      sendResponse({ success:true, translation });
    }
  } catch(err) { sendResponse({ success:false, error:err.message }); }
}

// ===== 获取模型列表 =====
async function handleFetchModels(msg, sendResponse) {
  const { apiKey, apiUrl } = msg;
  try {
    const base = apiUrl.replace(/\/+$/, '');
    const response = await fetch(`${base}/models`, {
      method: 'GET',
      headers: { 'Authorization': `Bearer ${apiKey}` },
    });
    if (!response.ok) {
      let errMsg = `HTTP ${response.status}`;
      try { const e = await response.json(); errMsg = e.error?.message || errMsg; } catch {}
      throw new Error(errMsg);
    }
    const data = await response.json();
    const models = (data.data || []).map(m => m.id).filter(id => id && typeof id === 'string');
    sendResponse({ success: true, models });
  } catch (err) {
    sendResponse({ success: false, error: err.message });
  }
}
