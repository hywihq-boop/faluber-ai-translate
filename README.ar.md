<div align="center">
  <img src="icons/logo.png" width="96" height="96" style="border-radius:18px">

  # 🌐 Faluber AI翻译

  ### ترجمة صفحات الويب بالذكاء الاصطناعي — 50 لغة، 10 مزودي API

  ![version](https://img.shields.io/github/v/release/hywihq-boop/faluber-ai-translate?style=flat-square)
  ![manifest](https://img.shields.io/badge/MV3-blue?style=flat-square)
  ![license](https://img.shields.io/badge/MIT-green?style=flat-square)

  <br>

  <a href="https://github.com/hywihq-boop/faluber-ai-translate/releases"><img src="https://img.shields.io/badge/⬇_تحميل-7c5cfc?style=for-the-badge" alt="تحميل"></a>
  &nbsp;
  <a href="https://github.com/hywihq-boop/faluber-ai-translate"><img src="https://img.shields.io/badge/⭐_Star-222?style=for-the-badge" alt="Star"></a>
</div>

<br>

> **Faluber AI翻译** هي إضافة Chrome/Edge تترجم صفحات الويب باستخدام الذكاء الاصطناعي. استبدال مباشر لعقد النص في DOM — بدون iframe أو تراكبات. **50 لغة مستهدفة**، **10 مزودي API**، **وضعان للترجمة**.

---

## 📸 لقطات الشاشة

<div align="center">
  <p><em>🎬 ترجمة الصفحة — اضغط <kbd>Alt+T</kbd>، يتحول النص من الإنجليزية للصينية</em></p>
  <img src="assets/translate-demo.gif" alt="عرض الترجمة" width="780">
  <br><br>

  <p><em>🎬 Ctrl + شرح — مرر فوق كلمة، اضغط <kbd>Ctrl</kbd> للشرح</em></p>
  <img src="assets/explain-demo.gif" alt="عرض الشرح" width="780">
  <br><br>

  <p><em>🎬 لوحة الترجمة <kbd>Alt+Q</kbd> — أدخل نصاً، احصل على ترجمة فورية</em></p>
  <img src="assets/panel-demo.gif" alt="عرض اللوحة" width="780">
  <br><br>

  <p><em>🎬 طي الأداة / لوحة التفاصيل — رسوم متحركة</em></p>
  <img src="assets/collapse-expand.gif" alt="طي" width="360">
  &nbsp;
  <img src="assets/detail-panel.gif" alt="تفاصيل" width="360">
</div>

---

## ✨ الميزات

<table>
<tr>
<td width="50%">

### 🚀 ترجمة الصفحة كاملة بنقرة
انقر الأداة العائمة أو اضغط <kbd>Alt+T</kbd>. استبدال على مستوى عقد النص يحافظ على هيكل الصفحة.

</td>
<td width="50%">

### 🔍 Ctrl + شرح ذكي
مرر فوق أي كلمة + اضغط <kbd>Ctrl</kbd> لإظهار فقاعة شرح. حدد نصاً + <kbd>Ctrl</kbd> لشرح فقرة.

</td>
</tr>
<tr>
<td width="50%">

### ⚡ وضعان للترجمة
**قياسي** — 3 متزامن، أولوية المنطقة المرئية.<br>
**توربو** — 8 متزامن، الصفحة كاملة، سرعة قصوى.

</td>
<td width="50%">

### 🔑 إدارة متعددة لواجهات API
10 إعدادات مسبقة (DeepSeek، OpenAI، Groq، Qwen...). حفظ إعدادات متعددة، تبديل، جلب تلقائي للنماذج.

</td>
</tr>
<tr>
<td width="50%">

### 📋 لوحة الترجمة <kbd>Alt+Q</kbd>
لوحة عائمة جنباً إلى جنب. ترجمة فورية، مستقلة عن ترجمة الصفحة.

</td>
<td width="50%">

### 💾 تخزين مؤقت ذكي — توفير تكاليف API
ذاكرة + تخزين دائم. النص المتكرر يُستجاب فوراً، **بدون استهلاك رموز**. حتى 2,000 مدخلة، TTL ساعة. حفظ تلقائي كل 30 ثانية. مسح تلقائي عند تغيير اللغة. نسبة إصابة التخزين المؤقت معروضة مباشرة.

</td>
</tr>
</table>

---

## 📦 التثبيت

### الطريقة 1: تحميل Release (موصى بها)

1. افتح [Releases](https://github.com/hywihq-boop/faluber-ai-translate/releases)
2. حمّل أحدث إصدار `faluber-ai-translate-vX.X.X.zip`
3. افتح `chrome://extensions`، فعّل **وضع المطور**
4. **اسحب ملف zip مباشرة** إلى نافذة المتصفح
5. تم!

### الطريقة 2: تحميل الكود المصدري

1. انقر زر **Code** الأخضر → Download ZIP
2. اسحبه أيضاً إلى `chrome://extensions`

### الإعداد والاستخدام

| الخطوة | |
|------|---|
| **إعداد API** | انقر أيقونة الإضافة → اختر مزوداً → أدخل مفتاح API → اختبر الاتصال → احفظ |
| **ابدأ الترجمة** | افتح أي صفحة → انقر الأداة في الزاوية اليمنى أو اضغط <kbd>Alt+T</kbd> |

---

## 🔧 مزودو API

| المزود | عنوان API الأساسي |
|--------|------------------|
| ⭐ DeepSeek | `https://api.deepseek.com/v1` |
| OpenAI | `https://api.openai.com/v1` |
| Groq | `https://api.groq.com/openai/v1` |
| Together AI | `https://api.together.xyz/v1` |
| OpenRouter | `https://openrouter.ai/api/v1` |
| SiliconFlow | `https://api.siliconflow.cn/v1` |
| Moonshot | `https://api.moonshot.cn/v1` |
| Zhipu | `https://open.bigmodel.cn/api/paas/v4` |
| DashScope | `https://dashscope.aliyuncs.com/compatible-mode/v1` |
| مخصص | أي نقطة نهاية متوافقة مع OpenAI |

---

## 🛠️ آلية العمل

```
يقوم المستخدم بتشغيل الترجمة
  → يتصفح Content Script شجرة DOM ويجمع عقد النص المرئية
  → التحقق من الظهور → إزالة تكرار CJK → تصفية الطول → إزالة تكرار التخزين
  → ترتيب حسب Y، دمج → تجميع → Service Worker (3–8 عمال)
  → استدعاء AI API (متوافق مع OpenAI) → إرجاع → استبدال النص في DOM
  → شريط تقدم + إشعار
```

### مقارنة الأوضاع

| | قياسي | توربو |
|---|-------|-------|
| التوازي | 3 | 8 |
| حجم الدفعة | 400 حرف | 250 حرف |
| النطاق | المنطقة المرئية | الصفحة كاملة |
| كشف التمرير | ✅ | — |
| كشف المرور | ✅ | — |
| المحتوى الديناميكي | ✅ | ✅ |

---

## 🌍 50 لغة · 20 لغة واجهة

<details>
<summary><b>عرض جميع اللغات</b></summary>
<br>

`简体中文` `繁體中文` `English` `日本語` `한국어` `Français` `Deutsch` `Español` `Português` `Русский` `العربية` `हिन्दी` `ไทย` `Tiếng Việt` `Italiano` `Nederlands` `Polski` `Türkçe` `Bahasa Indonesia` `Svenska` `Dansk` `Suomi` `Norsk` `Čeština` `Română` `Magyar` `Ελληνικά` `עברית` `Українська` `Melayu` `Filipino` `বাংলা` `اردو` `فارسی` `Kiswahili` `தமிழ்` `తెలుగు` `मराठी` `ગુજરાતી` `ಕನ್ನಡ` `മലയാളം` `ਪੰਜਾਬੀ` `Български` `Slovenčina` `Lietuvių` `Latviešu` `Eesti` `Slovenščina` `Hrvatski` `Српски`

</details>

---

## 📂 الهيكل

```
faluber-ai-translate/
├── manifest.json
├── background/service-worker.js   # استدعاءات API والتوجيه
├── content/
│   ├── content.js                 # استخراج النصوص واستبدالها
│   └── content.css                # أنماط الأداة
├── popup/
│   ├── popup.html                 # نافذة الإعدادات
│   ├── popup.js                   # إدارة API
│   └── popup.css
├── icons/                         # الأيقونات
├── assets/                        # لقطات الشاشة
└── docs/                          # الموقع
```

---

## 🔒 الخصوصية

- مفتاح API مخزن **محلياً** في تخزين Chrome
- الطلبات تذهب **مباشرة** من متصفحك إلى مزود API
- **لا توجد خوادم طرف ثالث**

---

<div align="center">
  <br>
  <a href="https://github.com/hywihq-boop/faluber-ai-translate">⭐ Star</a> ·
  <a href="https://github.com/hywihq-boop/faluber-ai-translate/releases">📦 الإصدارات</a> ·
  <a href="https://github.com/hywihq-boop/faluber-ai-translate/issues">🐛 بلاغ خطأ</a> ·
  <a href="LICENSE">📝 MIT</a>
</div>
