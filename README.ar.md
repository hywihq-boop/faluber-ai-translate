<div align="center">
  <img src="icons/logo.png" width="96" height="96" style="border-radius:18px">

  # 🌐 Faluber Translate

  ### ترجمة صفحات الويب بالذكاء الاصطناعي — 50 لغة، 10 مزودي API

  ![version](https://img.shields.io/badge/v2.0.10-7c5cfc?style=flat-square)
  ![manifest](https://img.shields.io/badge/MV3-blue?style=flat-square)
  ![license](https://img.shields.io/badge/MIT-green?style=flat-square)

  <br>

  <a href="https://github.com/hywihq-boop/faluber-translate/releases"><img src="https://img.shields.io/badge/⬇_تحميل-7c5cfc?style=for-the-badge" alt="تحميل"></a>
  &nbsp;
  <a href="https://github.com/hywihq-boop/faluber-translate"><img src="https://img.shields.io/badge/⭐_Star-222?style=for-the-badge" alt="Star"></a>
</div>

<br>

> **Faluber Translate** هي إضافة Chrome تترجم صفحات الويب باستخدام الذكاء الاصطناعي. استبدال مباشر لعقد النص في DOM — بدون iframe أو تراكبات. **50 لغة مستهدفة**، **10 مزودي API**، **وضعان للترجمة**.

---

## 📸 لقطات الشاشة

<div align="center">
  <p><em>ترجمة الصفحة كاملة — انقر أو اضغط <kbd>Alt+T</kbd></em></p>
  <img src="assets/screenshot-translate.png" alt="ترجمة الصفحة" width="780">
  <br><br>

  <p><em>طي / توسيع الأداة — رسم متحرك</em></p>
  <img src="assets/collapse-expand.gif" alt="رسوم متحركة للطي" width="360">
  <br><br>

  <p><em>توسيع / طي لوحة التفاصيل — رسم متحرك</em></p>
  <img src="assets/detail-panel.gif" alt="رسوم متحركة للوحة" width="360">
  <br><br>

  <p><em>الإعدادات & تبديل الأوضاع</em></p>
  <img src="assets/screenshot-settings.png" alt="الإعدادات" width="400">
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

### 💾 تخزين مؤقت ذكي
ذاكرة + تخزين دائم. حتى 2,000 مدخلة، TTL ساعة. حفظ تلقائي + `beforeunload`.

</td>
</tr>
</table>

---

## 📦 ابدأ في 3 خطوات

| الخطوة | |
|------|---|
| **1. تثبيت** | حمّل zip من [Releases](https://github.com/hywihq-boop/faluber-translate/releases)، فك الضغط وحمّل في `chrome://extensions` |
| **2. إعداد API** | انقر أيقونة الإضافة → اختر مزوداً → أدخل مفتاح API → اختبر الاتصال → احفظ |
| **3. ترجم** | افتح أي صفحة → انقر الأداة أو اضغط <kbd>Alt+T</kbd> |

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
faluber translate/
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
  <a href="https://github.com/hywihq-boop/faluber-translate">⭐ Star</a> ·
  <a href="https://github.com/hywihq-boop/faluber-translate/releases">📦 الإصدارات</a> ·
  <a href="https://github.com/hywihq-boop/faluber-translate/issues">🐛 بلاغ خطأ</a> ·
  <a href="LICENSE">📝 MIT</a>
</div>
