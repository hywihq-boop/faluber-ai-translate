<div align="center">
  <img src="icons/logo.png" width="96" height="96" style="border-radius:18px">

  # 🌐 Faluber Translate

  ### ترجمة صفحات الويب بالذكاء الاصطناعي

  <sub>إضافة Chrome تترجم صفحات الويب باستخدام الذكاء الاصطناعي. معالجة على مستوى عقد DOM.<br>50 لغة · 20 لغة واجهة · واجهة API متوافقة مع OpenAI · MIT مفتوحة المصدر.</sub>

  <br>

  ![version](https://img.shields.io/badge/v2.0.10-7c5cfc?style=flat-square)
  ![manifest](https://img.shields.io/badge/MV3-blue?style=flat-square)
  ![license](https://img.shields.io/badge/MIT-green?style=flat-square)

  <br><br>

  <a href="https://github.com/hywihq-boop/faluber-translate/releases"><img src="https://img.shields.io/badge/⬇_تحميل-7c5cfc?style=for-the-badge" alt="تحميل"></a>
  &nbsp;
  <a href="https://github.com/hywihq-boop/faluber-translate"><img src="https://img.shields.io/badge/⭐_Star_on_GitHub-222?style=for-the-badge" alt="Star"></a>

  <br><br>

  <table align="center"><tr>
  <td align="center"><b style="font-size:20px;color:#5ce0fc">50+</b><br><sub style="color:#888">لغة</sub></td>
  <td align="center"><b style="font-size:20px;color:#5ce0fc">2</b><br><sub style="color:#888">وضع</sub></td>
  <td align="center"><b style="font-size:20px;color:#5ce0fc">8</b><br><sub style="color:#888">متزامن</sub></td>
  <td align="center"><b style="font-size:20px;color:#5ce0fc">10</b><br><sub style="color:#888">مزود</sub></td>
  <td align="center"><b style="font-size:20px;color:#5ce0fc">~1s</b><br><sub style="color:#888">شرح كلمة</sub></td>
  </tr></table>
</div>

---

## ✨ الميزات الأساسية

<table>
<tr>
<td width="50%">

### 🚀 ترجمة الصفحة كاملة بنقرة
انقر الأداة العائمة أو اضغط <kbd>Alt+T</kbd> لترجمة الصفحة كاملة. استبدال على مستوى عقد النص يحافظ على هيكل الصفحة. اكتشاف تلقائي للغة المصدر.

</td>
<td width="50%">

### 🔍 Ctrl + شرح ذكي
مرر فوق أي كلمة + اضغط <kbd>Ctrl</kbd> لإظهار فقاعة شرح بالذكاء الاصطناعي. حدد نصاً + <kbd>Ctrl</kbd> لشرح فقرة. نظام احتياطي: موجه NLP → فحص HTML. بدون تلويث DOM.

</td>
</tr>
<tr>
<td width="50%">

### ⚡ وضعان للترجمة
**قياسي** — 3 متزامن، أولوية المنطقة المرئية، توازن السرعة والتكلفة.<br>
**توربو** — 8 متزامن، الصفحة كاملة، سرعة قصوى. الإعدادات محفوظة.

</td>
<td width="50%">

### 🔑 إدارة متعددة لواجهات API
10 إعدادات مسبقة لمزودين. احفظ عدة إعدادات API وبدّل بينها في أي وقت. جلب تلقائي للنماذج. دعم نقاط نهاية مخصصة.

</td>
</tr>
<tr>
<td width="50%">

### 📋 لوحة الترجمة <kbd>Alt+Q</kbd>
لوحة عائمة جنباً إلى جنب. ترجمة فورية للإدخال، مستقلة عن ترجمة الصفحة. تدعم أي زوج لغوي.

</td>
<td width="50%">

### 💾 تخزين مؤقت ذكي
ذاكرة + تخزين دائم. حتى 2,000 مدخلة، TTL ساعة واحدة. حفظ تلقائي كل 30 ثانية + عند `beforeunload`. مسح تلقائي عند تغيير اللغة.

</td>
</tr>
</table>

---

## 🖥️ عرض توضيحي

### ترجمة الصفحة كاملة + الأداة العائمة

انقر الأداة في الزاوية اليمنى السفلى أو اضغط <kbd>Alt+T</kbd>. تُترجم الصفحة بالكامل في مكانها.

<div style="border-radius:12px;overflow:hidden;border:1px solid #30363d;background:#161b22;max-width:780px;margin:0 auto 20px">
  <div style="display:flex;align-items:center;gap:8px;padding:10px 14px;background:#21262d;border-bottom:1px solid #30363d">
    <span style="width:10px;height:10px;border-radius:50%;background:#f87171;display:inline-block"></span>
    <span style="width:10px;height:10px;border-radius:50%;background:#facc15;display:inline-block"></span>
    <span style="width:10px;height:10px;border-radius:50%;background:#4ade80;display:inline-block"></span>
    <span style="padding:4px 12px;border-radius:6px;background:rgba(255,255,255,0.05);font-size:11px;color:#8b949e;flex:1;margin-left:4px">wikipedia.org — Artificial Intelligence</span>
  </div>
  <div style="padding:24px">
    <h3 style="color:#e6edf3;margin-bottom:12px;font-size:18px">Artificial Intelligence</h3>
    <p style="color:#8b949e;font-size:13px;margin-bottom:10px;line-height:1.7">
      <mark style="background:rgba(124,92,252,0.2);color:#c0c0d0;padding:0 2px;border-radius:2px">الذكاء الاصطناعي</mark> (AI) هو الذكاء الذي تظهره الآلات. تعرف الكتب الرائدة هذا المجال بأنه دراسة <mark style="background:rgba(124,92,252,0.2);color:#c0c0d0;padding:0 2px;border-radius:2px">"العميل الذكي"</mark>.
    </p>
    <p style="color:#8b949e;font-size:13px;margin-bottom:10px;line-height:1.7">
      تشمل تطبيقات الذكاء الاصطناعي <mark style="background:rgba(124,92,252,0.2);color:#c0c0d0;padding:0 2px;border-radius:2px">محركات البحث المتقدمة</mark> و<mark style="background:rgba(124,92,252,0.2);color:#c0c0d0;padding:0 2px;border-radius:2px">أنظمة التوصية</mark> و<mark style="background:rgba(124,92,252,0.2);color:#c0c0d0;padding:0 2px;border-radius:2px">التعرف على الكلام</mark> و<mark style="background:rgba(124,92,252,0.2);color:#c0c0d0;padding:0 2px;border-radius:2px">القيادة الذاتية</mark>.
    </p>
  </div>
  <div style="margin:0 16px 16px;border-radius:18px;background:#0d1117;border:1px solid #30363d;overflow:hidden">
    <div style="display:flex;align-items:center;justify-content:space-between;padding:10px 13px">
      <span style="font-size:11px;color:#8b949e">تلقائي</span>
      <span style="display:inline-block;width:32px;height:18px;border-radius:99px;background:#7c5cfc"><span style="display:inline-block;margin:2px 0 0 15px;width:14px;height:14px;border-radius:50%;background:#fff"></span></span>
      <span style="padding:5px 14px;border-radius:13px;background:rgba(74,222,128,0.1);color:#4ade80;border:1px solid rgba(74,222,128,0.2);font-size:11px;font-weight:600">تمت الترجمة</span>
    </div>
    <div style="padding:6px 13px;background:rgba(255,255,255,0.03);display:flex;justify-content:space-between;align-items:center;font-size:10px;color:#8b949e">
      <span>الرموز <b style="color:#7c5cfc">2.5K</b></span>
      <span style="color:#4ade80">إصابة 42%</span>
    </div>
  </div>
</div>

---

### Ctrl + شرح ذكي

مرر مؤشر الفأرة فوق كلمة واضغط <kbd>Ctrl</kbd>. تظهر فقاعة شرح بالذكاء الاصطناعي فوراً.

<div style="border-radius:12px;overflow:hidden;border:1px solid #30363d;background:#161b22;max-width:780px;margin:0 auto 20px">
  <div style="display:flex;align-items:center;gap:8px;padding:10px 14px;background:#21262d;border-bottom:1px solid #30363d">
    <span style="width:10px;height:10px;border-radius:50%;background:#f87171;display:inline-block"></span>
    <span style="width:10px;height:10px;border-radius:50%;background:#facc15;display:inline-block"></span>
    <span style="width:10px;height:10px;border-radius:50%;background:#4ade80;display:inline-block"></span>
    <span style="padding:4px 12px;border-radius:6px;background:rgba(255,255,255,0.05);font-size:11px;color:#8b949e;flex:1;margin-left:4px">github.com — Trending today</span>
  </div>
  <div style="padding:24px">
    <p style="margin-bottom:6px;font-size:14px"><span style="color:#58a6ff">usestrix</span> / <mark style="background:rgba(124,92,252,0.3);color:#e6edf3;padding:0 3px;border-radius:2px">strix</mark></p>
    <p style="font-size:11px;color:#8b949e;margin-bottom:16px">An agentic skills framework &amp; software development methodology.</p>
    <p style="margin-bottom:6px;font-size:14px"><span style="color:#58a6ff">actions</span> / checkout</p>
    <p style="font-size:11px;color:#8b949e;margin-bottom:16px">Action for checking out a repo</p>
    <p style="margin-bottom:6px;font-size:14px"><span style="color:#58a6ff">affaan-m</span> / ECC</p>
    <p style="font-size:11px;color:#8b949e;margin-bottom:20px">The agent harness performance optimization system.</p>

    <div style="border-radius:12px;background:#161b22;border:1px solid rgba(124,92,252,0.35);padding:10px 13px;font-size:12px;line-height:1.6;color:#c0c0d0;max-width:380px">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">
        <b style="color:#9061f9;font-size:13px">💬 strix</b>
        <span style="color:#8b949e">✕</span>
      </div>
      <div style="font-size:11px;color:#c0c0d0">
        "Strix" هي كلمة لاتينية تعني "البومة"، وهي أيضاً اسم العلامة التجارية الفاخرة للألعاب من ASUS. تُستخدم عادةً كاسم مشروع أو منظمة على GitHub.
      </div>
    </div>
  </div>
</div>

---

### لوحة الترجمة — <kbd>Alt+Q</kbd>

اضغط <kbd>Alt+Q</kbd> لفتح لوحة ترجمة عائمة جنباً إلى جنب.

<div style="border-radius:12px;overflow:hidden;border:1px solid #30363d;background:#161b22;max-width:780px;margin:0 auto 20px">
  <div style="display:flex;align-items:center;gap:8px;padding:10px 14px;background:#21262d;border-bottom:1px solid #30363d">
    <span style="width:10px;height:10px;border-radius:50%;background:#f87171;display:inline-block"></span>
    <span style="width:10px;height:10px;border-radius:50%;background:#facc15;display:inline-block"></span>
    <span style="width:10px;height:10px;border-radius:50%;background:#4ade80;display:inline-block"></span>
    <span style="padding:4px 12px;border-radius:6px;background:rgba(255,255,255,0.05);font-size:11px;color:#8b949e;flex:1;margin-left:4px">Faluber Translate — لوحة الترجمة</span>
  </div>
  <div style="padding:24px;display:flex;gap:12px;align-items:stretch">
    <div style="flex:1;display:flex;flex-direction:column">
      <span style="font-size:10px;color:#8b949e;margin-bottom:4px;text-transform:uppercase">إدخال — English</span>
      <textarea readonly style="flex:1;background:#0d1117;border:1px solid #30363d;border-radius:8px;color:#c0c0d0;padding:12px;font-size:12px;resize:none;min-height:120px;width:100%;font-family:inherit;outline:none">Artificial intelligence is transforming how we interact with technology. From voice assistants to self-driving cars, AI applications are becoming ubiquitous.</textarea>
    </div>
    <div style="display:flex;align-items:center;color:#7c5cfc;font-size:20px">→</div>
    <div style="flex:1;display:flex;flex-direction:column">
      <span style="font-size:10px;color:#8b949e;margin-bottom:4px;text-transform:uppercase">إخراج — العربية</span>
      <textarea readonly style="flex:1;background:#0d1117;border:1px solid rgba(74,222,128,0.2);border-radius:8px;color:#4ade80;padding:12px;font-size:12px;resize:none;min-height:120px;width:100%;font-family:inherit;outline:none">يغير الذكاء الاصطناعي طريقة تفاعلنا مع التكنولوجيا. من المساعدين الصوتيين إلى السيارات ذاتية القيادة، أصبحت تطبيقات الذكاء الاصطناعي منتشرة في كل مكان.</textarea>
    </div>
  </div>
</div>

---

### إعدادات API وتبديل الأوضاع

أدر إعدادات API، وبدّل بين المزودين، واجلب النماذج تلقائياً — كل ذلك من النافذة المنبثقة أو الأداة العائمة.

<div style="display:flex;gap:20px;flex-wrap:wrap;justify-content:center;margin:20px auto">
  <div style="width:300px;background:#0d1117;border:1px solid #30363d;border-radius:14px;overflow:hidden">
    <div style="display:flex;align-items:center;gap:10px;padding:14px 16px;border-bottom:1px solid #21262d">
      <div style="width:28px;height:28px;border-radius:6px;background:linear-gradient(135deg,#7c5cfc,#5ce0fc)"></div>
      <b style="background:linear-gradient(135deg,#7c5cfc,#5ce0fc);-webkit-background-clip:text;-webkit-text-fill-color:transparent">Faluber Translate</b>
    </div>
    <div style="padding:14px 16px;border-bottom:1px solid #21262d">
      <span style="font-size:10px;color:#6e7681;text-transform:uppercase">إعدادات API</span>
      <div style="display:flex;gap:4px;margin:6px 0 8px">
        <select style="flex:1;padding:7px 10px;background:#161b22;border:1px solid #30363d;border-radius:8px;color:#c0c0d0;font-size:11px"><option>Default</option></select>
        <span style="padding:4px 8px;background:rgba(124,92,252,0.12);color:#7c5cfc;border-radius:4px;font-size:14px">＋</span>
      </div>
      <span style="font-size:10px;color:#6e7681;text-transform:uppercase">المزود</span>
      <select style="width:100%;padding:7px 10px;background:#161b22;border:1px solid #30363d;border-radius:8px;color:#c0c0d0;font-size:11px;margin:4px 0 8px"><option>DeepSeek</option></select>
      <span style="font-size:10px;color:#6e7681;text-transform:uppercase">مفتاح API</span>
      <input type="password" value="sk-••••••••••••••" readonly style="width:100%;padding:7px 10px;background:#161b22;border:1px solid #30363d;border-radius:8px;color:#c0c0d0;font-size:11px;margin:4px 0 8px;font-family:monospace;outline:none">
      <span style="font-size:10px;color:#6e7681;text-transform:uppercase">عنوان API</span>
      <input value="https://api.deepseek.com/v1" readonly style="width:100%;padding:7px 10px;background:#161b22;border:1px solid #30363d;border-radius:8px;color:#c0c0d0;font-size:11px;margin:4px 0 8px;font-family:monospace;outline:none">
      <div style="display:flex;gap:8px;margin-top:10px">
        <span style="padding:6px 12px;background:rgba(124,92,252,0.12);color:#7c5cfc;border-radius:8px;font-size:11px;font-weight:600">اختبار الاتصال</span>
        <span style="padding:6px 12px;background:rgba(74,222,128,0.12);color:#4ade80;border-radius:8px;font-size:11px;font-weight:600">💾 حفظ</span>
        <span style="font-size:10px;color:#4ade80">✅ متصل</span>
      </div>
    </div>
    <div style="display:flex;justify-content:space-between;padding:10px 16px;font-size:10px;color:#6e7681">
      <span>اختصار <kbd style="background:#161b22;border:1px solid #30363d;padding:1px 4px;border-radius:3px;font-size:9px">Alt+T</kbd></span>
      <span>🌐 العربية</span>
    </div>
  </div>

  <div style="width:260px;background:#0d1117;border:1px solid #30363d;border-radius:14px;padding:14px;font-size:11px">
    <div style="display:flex;justify-content:space-between;margin-bottom:12px">
      <b style="color:#e6edf3;font-size:13px">الإعدادات</b>
      <span style="background:rgba(248,113,133,0.1);color:#f87171;border-radius:6px;padding:3px 8px;font-size:10px">مسح التخزين</span>
    </div>
    <div style="margin-bottom:10px">
      <span style="font-size:10px;color:#6e7681">اللغة</span>
      <div style="background:#161b22;border:1px solid #30363d;border-radius:6px;padding:6px 8px;color:#c0c0d0;font-size:11px;margin-top:3px">🇸🇦 العربية ▾</div>
    </div>
    <div style="display:flex;gap:6px;margin-bottom:12px">
      <div style="flex:1"><span style="font-size:10px;color:#6e7681">المصدر</span><div style="background:#161b22;border:1px solid #30363d;border-radius:6px;padding:6px 8px;color:#c0c0d0;font-size:11px;margin-top:3px">تلقائي ▾</div></div>
      <div style="flex:1"><span style="font-size:10px;color:#6e7681">الهدف</span><div style="background:#161b22;border:1px solid #30363d;border-radius:6px;padding:6px 8px;color:#c0c0d0;font-size:11px;margin-top:3px">العربية ▾</div></div>
    </div>
    <div style="margin-bottom:12px">
      <span style="font-size:10px;color:#6e7681">الوضع</span>
      <div style="margin-top:3px">
        <div style="display:flex;align-items:center;justify-content:space-between;background:#161b22;border:1px solid #30363d;border-radius:6px;padding:6px 8px;color:#c0c0d0;font-size:11px">⚡ قياسي <span style="color:#6e7681">▾</span></div>
        <div style="background:#161b22;border:1px solid #30363d;border-radius:0 0 6px 6px;margin-top:1px;overflow:hidden">
          <div style="padding:6px 8px;font-size:11px;color:#9061f9;font-weight:600;background:rgba(124,92,252,0.08)">⚡ قياسي</div>
          <div style="padding:6px 8px;font-size:11px;color:#c0c0d0">🚀 توربو</div>
        </div>
      </div>
    </div>
    <div style="height:1px;background:#21262d;margin:12px 0"></div>
    <table style="width:100%;font-size:10px;border:none">
      <tr><td style="color:#6e7681;border:none;padding:2px 0">إدخال</td><td style="color:#e6edf3;text-align:right;border:none;padding:2px 0">12.5K</td></tr>
      <tr><td style="color:#6e7681;border:none;padding:2px 0">إخراج</td><td style="color:#e6edf3;text-align:right;border:none;padding:2px 0">3.2K</td></tr>
      <tr><td style="color:#6e7681;border:none;padding:2px 0">المجموع</td><td style="color:#e6edf3;text-align:right;border:none;padding:2px 0">15.7K</td></tr>
      <tr><td style="color:#6e7681;border:none;padding:2px 0">التكلفة</td><td style="color:#e6edf3;text-align:right;border:none;padding:2px 0">¥0.0189</td></tr>
      <tr><td style="color:#6e7681;border:none;padding:2px 0">التخزين</td><td style="color:#e6edf3;text-align:right;border:none;padding:2px 0">142</td></tr>
    </table>
  </div>
</div>

<br>

---

## 📦 ابدأ في 3 خطوات

<table>
<tr>
<td align="center" width="33%"><b style="font-size:16px">1. تثبيت</b><br><sub>حمّل zip من <a href="https://github.com/hywihq-boop/faluber-translate/releases">Releases</a>،<br>فك الضغط وحمّل في <code>chrome://extensions</code></sub></td>
<td align="center" width="33%"><b style="font-size:16px">2. إعداد API</b><br><sub>اختر مزوداً، أدخل مفتاح API،<br>اختبر الاتصال، احفظ</sub></td>
<td align="center" width="33%"><b style="font-size:16px">3. ترجم</b><br><sub>افتح أي صفحة، انقر الأداة<br>أو اضغط <kbd>Alt+T</kbd></sub></td>
</tr>
</table>

---

## 🔧 10 مزودي API

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
  → ترتيب حسب المحور Y ودمج المتجاورة
  → تجميع → إرسال إلى Service Worker (3–8 عمال)
  → استدعاء AI API (متوافق مع OpenAI) → إرجاع النتائج
  → استبدال النص في DOM → شريط تقدم مباشر
```

### مقارنة الأوضاع

| المعامل | قياسي | توربو |
|---------|-------|-------|
| التوازي | 3 | 8 |
| حجم الدفعة | 400 حرف | 250 حرف |
| نطاق الصفحة | المنطقة المرئية | الصفحة كاملة |
| كشف التمرير | ✅ | — |
| كشف المرور | ✅ | — |
| المحتوى الديناميكي | ✅ | ✅ |

### التخزين المؤقت

| الطبقة | التخزين | الحد | TTL | حفظ تلقائي |
|--------|---------|------|-----|-----------|
| الذاكرة | `Map<أصل, ترجمة>` | ∞ | الجلسة | — |
| دائم | `chrome.storage.local` | 2,000 | ساعة | 30 ثانية + `beforeunload` |

---

## 🌍 50 لغة · 20 لغة واجهة

<details>
<summary><b>انقر لعرض جميع اللغات الـ 50</b></summary>
<br>

`简体中文` `繁體中文` `English` `日本語` `한국어` `Français` `Deutsch` `Español` `Português` `Русский` `العربية` `हिन्दी` `ไทย` `Tiếng Việt` `Italiano` `Nederlands` `Polski` `Türkçe` `Bahasa Indonesia` `Svenska` `Dansk` `Suomi` `Norsk` `Čeština` `Română` `Magyar` `Ελληνικά` `עברית` `Українська` `Melayu` `Filipino` `বাংলা` `اردو` `فارسی` `Kiswahili` `தமிழ்` `తెలుగు` `मराठी` `ગુજરાતી` `ಕನ್ನಡ` `മലയാളം` `ਪੰਜਾਬੀ` `Български` `Slovenčina` `Lietuvių` `Latviešu` `Eesti` `Slovenščina` `Hrvatski` `Српски`

</details>

---

## 📂 هيكل المشروع

```
faluber translate/
├── manifest.json
├── background/service-worker.js   # استدعاءات API وتوجيه الرسائل
├── content/
│   ├── content.js                 # استخراج نصوص DOM واستبدالها
│   └── content.css                # أنماط الأداة العائمة
├── popup/
│   ├── popup.html                 # نافذة الإعدادات
│   ├── popup.js                   # إدارة API المتعددة
│   └── popup.css
├── icons/                         # أيقونات الإضافة
├── docs/                          # الموقع الإلكتروني
└── generate-icons.js              # مولد الأيقونات (أداة تطوير)
```

---

## 🔒 الخصوصية

- مفتاح API مخزن **محلياً** في تخزين Chrome المتزامن
- الطلبات تذهب **مباشرة** من متصفحك إلى مزود API
- **لا توجد خوادم طرف ثالث** — بياناتك بينك وبين مزود API فقط

---

<div align="center">
  <br>
  <a href="https://github.com/hywihq-boop/faluber-translate">⭐ Star</a> ·
  <a href="https://github.com/hywihq-boop/faluber-translate/releases">📦 الإصدارات</a> ·
  <a href="https://github.com/hywihq-boop/faluber-translate/issues">🐛 بلاغ خطأ</a> ·
  <a href="LICENSE">📝 MIT</a>
  <br><br>
  <sub>مصنوع بـ ❤️ · لا يتم جمع بيانات المستخدم</sub>
</div>
