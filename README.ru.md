<div align="center">
  <img src="icons/logo.png" width="96" height="96" style="border-radius:18px">

  # 🌐 Faluber Translate

  ### ИИ-переводчик веб-страниц

  <sub>Расширение Chrome для перевода веб-страниц с помощью ИИ. Манипуляции DOM на уровне текстовых узлов.<br>50 языков · 20 языков интерфейса · OpenAI-совместимое API · MIT.</sub>

  <br>

  ![version](https://img.shields.io/badge/v2.0.10-7c5cfc?style=flat-square)
  ![manifest](https://img.shields.io/badge/MV3-blue?style=flat-square)
  ![license](https://img.shields.io/badge/MIT-green?style=flat-square)

  <br><br>

  <a href="https://github.com/hywihq-boop/faluber-translate/releases"><img src="https://img.shields.io/badge/⬇_Скачать-7c5cfc?style=for-the-badge" alt="Скачать"></a>
  &nbsp;
  <a href="https://github.com/hywihq-boop/faluber-translate"><img src="https://img.shields.io/badge/⭐_Star_on_GitHub-222?style=for-the-badge" alt="Star"></a>

  <br><br>

  <table align="center"><tr>
  <td align="center"><b style="font-size:20px;color:#5ce0fc">50+</b><br><sub style="color:#888">Языков</sub></td>
  <td align="center"><b style="font-size:20px;color:#5ce0fc">2</b><br><sub style="color:#888">Режима</sub></td>
  <td align="center"><b style="font-size:20px;color:#5ce0fc">8</b><br><sub style="color:#888">Потоков</sub></td>
  <td align="center"><b style="font-size:20px;color:#5ce0fc">10</b><br><sub style="color:#888">Провайдеров</sub></td>
  <td align="center"><b style="font-size:20px;color:#5ce0fc">~1с</b><br><sub style="color:#888">Объяснение</sub></td>
  </tr></table>
</div>

---

## ✨ Основные возможности

<table>
<tr>
<td width="50%">

### 🚀 Перевод страницы в один клик
Нажмите на виджет или <kbd>Alt+T</kbd> для перевода всей страницы. Замена на уровне текстовых узлов сохраняет структуру. Автоопределение языка.

</td>
<td width="50%">

### 🔍 Ctrl + Умное объяснение
Наведите на слово + нажмите <kbd>Ctrl</kbd> для ИИ-объяснения. Выделите текст + <kbd>Ctrl</kbd> для объяснения абзаца. Два уровня: NLP-промпт → анализ HTML. Без изменений DOM.

</td>
</tr>
<tr>
<td width="50%">

### ⚡ Два режима перевода
**Стандартный** — 3 потока, сначала видимая область, баланс скорости и затрат.<br>
**Турбо** — 8 потоков, вся страница, максимальная скорость. Настройки сохраняются.

</td>
<td width="50%">

### 🔑 Мульти-API управление
10 встроенных пресетов. Несколько конфигураций API, переключение в любое время. Автозагрузка моделей. Свои endpoint'ы.

</td>
</tr>
<tr>
<td width="50%">

### 📋 Панель перевода <kbd>Alt+Q</kbd>
Плавающая панель с двумя колонками. Мгновенный перевод ввода, независимо от перевода страницы. Любые языковые пары.

</td>
<td width="50%">

### 💾 Умный кэш
Двухуровневый: в памяти + постоянный. До 2 000 записей, TTL 1 час. Автосброс каждые 30 с + на `beforeunload`. Автоочистка при смене языка.

</td>
</tr>
</table>

---

## 🖥️ Демонстрация

### Перевод всей страницы + Виджет

Нажмите на виджет в правом нижнем углу или <kbd>Alt+T</kbd>. Вся страница переводится на месте.

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
      <mark style="background:rgba(124,92,252,0.2);color:#c0c0d0;padding:0 2px;border-radius:2px">Искусственный интеллект</mark> (ИИ) — это интеллект, демонстрируемый машинами. Ведущие учебники определяют эту область как исследование <mark style="background:rgba(124,92,252,0.2);color:#c0c0d0;padding:0 2px;border-radius:2px">«интеллектуальных агентов»</mark>.
    </p>
    <p style="color:#8b949e;font-size:13px;margin-bottom:10px;line-height:1.7">
      Применения ИИ включают <mark style="background:rgba(124,92,252,0.2);color:#c0c0d0;padding:0 2px;border-radius:2px">поисковые системы</mark>, <mark style="background:rgba(124,92,252,0.2);color:#c0c0d0;padding:0 2px;border-radius:2px">рекомендательные системы</mark>, <mark style="background:rgba(124,92,252,0.2);color:#c0c0d0;padding:0 2px;border-radius:2px">распознавание речи</mark>, <mark style="background:rgba(124,92,252,0.2);color:#c0c0d0;padding:0 2px;border-radius:2px">автопилоты</mark> и <mark style="background:rgba(124,92,252,0.2);color:#c0c0d0;padding:0 2px;border-radius:2px">генеративный ИИ</mark>.
    </p>
  </div>
  <div style="margin:0 16px 16px;border-radius:18px;background:#0d1117;border:1px solid #30363d;overflow:hidden">
    <div style="display:flex;align-items:center;justify-content:space-between;padding:10px 13px">
      <span style="font-size:11px;color:#8b949e">Авто</span>
      <span style="display:inline-block;width:32px;height:18px;border-radius:99px;background:#7c5cfc"><span style="display:inline-block;margin:2px 0 0 15px;width:14px;height:14px;border-radius:50%;background:#fff"></span></span>
      <span style="padding:5px 14px;border-radius:13px;background:rgba(74,222,128,0.1);color:#4ade80;border:1px solid rgba(74,222,128,0.2);font-size:11px;font-weight:600">Переведено</span>
    </div>
    <div style="padding:6px 13px;background:rgba(255,255,255,0.03);display:flex;justify-content:space-between;align-items:center;font-size:10px;color:#8b949e">
      <span>Токены <b style="color:#7c5cfc">2.5K</b></span>
      <span style="color:#4ade80">Кэш 42%</span>
    </div>
  </div>
</div>

---

### Ctrl + Умное объяснение

Наведите курсор на слово и нажмите <kbd>Ctrl</kbd>. Всплывающее окно с ИИ-объяснением появляется мгновенно.

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
        «Strix» — латинское слово «сова», также название премиальной игровой линейки ASUS ROG Strix. На GitHub часто используется как название проекта или организации.
      </div>
    </div>
  </div>
</div>

---

### Панель перевода — <kbd>Alt+Q</kbd>

Нажмите <kbd>Alt+Q</kbd>, чтобы открыть плавающую панель перевода с двумя колонками.

<div style="border-radius:12px;overflow:hidden;border:1px solid #30363d;background:#161b22;max-width:780px;margin:0 auto 20px">
  <div style="display:flex;align-items:center;gap:8px;padding:10px 14px;background:#21262d;border-bottom:1px solid #30363d">
    <span style="width:10px;height:10px;border-radius:50%;background:#f87171;display:inline-block"></span>
    <span style="width:10px;height:10px;border-radius:50%;background:#facc15;display:inline-block"></span>
    <span style="width:10px;height:10px;border-radius:50%;background:#4ade80;display:inline-block"></span>
    <span style="padding:4px 12px;border-radius:6px;background:rgba(255,255,255,0.05);font-size:11px;color:#8b949e;flex:1;margin-left:4px">Faluber Translate — Панель перевода</span>
  </div>
  <div style="padding:24px;display:flex;gap:12px;align-items:stretch">
    <div style="flex:1;display:flex;flex-direction:column">
      <span style="font-size:10px;color:#8b949e;margin-bottom:4px;text-transform:uppercase">Ввод — English</span>
      <textarea readonly style="flex:1;background:#0d1117;border:1px solid #30363d;border-radius:8px;color:#c0c0d0;padding:12px;font-size:12px;resize:none;min-height:120px;width:100%;font-family:inherit;outline:none">Artificial intelligence is transforming how we interact with technology. From voice assistants to self-driving cars, AI applications are becoming ubiquitous.</textarea>
    </div>
    <div style="display:flex;align-items:center;color:#7c5cfc;font-size:20px">→</div>
    <div style="flex:1;display:flex;flex-direction:column">
      <span style="font-size:10px;color:#8b949e;margin-bottom:4px;text-transform:uppercase">Вывод — Русский</span>
      <textarea readonly style="flex:1;background:#0d1117;border:1px solid rgba(74,222,128,0.2);border-radius:8px;color:#4ade80;padding:12px;font-size:12px;resize:none;min-height:120px;width:100%;font-family:inherit;outline:none">Искусственный интеллект меняет то, как мы взаимодействуем с технологиями. От голосовых помощников до беспилотных автомобилей — приложения ИИ становятся повсеместными.</textarea>
    </div>
  </div>
</div>

---

### Настройки API и переключение режимов

Управляйте API, переключайте провайдеров, загружайте модели и меняйте режимы — всё из всплывающего окна или виджета.

<div style="display:flex;gap:20px;flex-wrap:wrap;justify-content:center;margin:20px auto">
  <div style="width:300px;background:#0d1117;border:1px solid #30363d;border-radius:14px;overflow:hidden">
    <div style="display:flex;align-items:center;gap:10px;padding:14px 16px;border-bottom:1px solid #21262d">
      <div style="width:28px;height:28px;border-radius:6px;background:linear-gradient(135deg,#7c5cfc,#5ce0fc)"></div>
      <b style="background:linear-gradient(135deg,#7c5cfc,#5ce0fc);-webkit-background-clip:text;-webkit-text-fill-color:transparent">Faluber Translate</b>
    </div>
    <div style="padding:14px 16px;border-bottom:1px solid #21262d">
      <span style="font-size:10px;color:#6e7681;text-transform:uppercase">Настройки API</span>
      <div style="display:flex;gap:4px;margin:6px 0 8px">
        <select style="flex:1;padding:7px 10px;background:#161b22;border:1px solid #30363d;border-radius:8px;color:#c0c0d0;font-size:11px"><option>Default</option></select>
        <span style="padding:4px 8px;background:rgba(124,92,252,0.12);color:#7c5cfc;border-radius:4px;font-size:14px">＋</span>
      </div>
      <span style="font-size:10px;color:#6e7681;text-transform:uppercase">Провайдер</span>
      <select style="width:100%;padding:7px 10px;background:#161b22;border:1px solid #30363d;border-radius:8px;color:#c0c0d0;font-size:11px;margin:4px 0 8px"><option>DeepSeek</option></select>
      <span style="font-size:10px;color:#6e7681;text-transform:uppercase">API Ключ</span>
      <input type="password" value="sk-••••••••••••••" readonly style="width:100%;padding:7px 10px;background:#161b22;border:1px solid #30363d;border-radius:8px;color:#c0c0d0;font-size:11px;margin:4px 0 8px;font-family:monospace;outline:none">
      <span style="font-size:10px;color:#6e7681;text-transform:uppercase">API URL</span>
      <input value="https://api.deepseek.com/v1" readonly style="width:100%;padding:7px 10px;background:#161b22;border:1px solid #30363d;border-radius:8px;color:#c0c0d0;font-size:11px;margin:4px 0 8px;font-family:monospace;outline:none">
      <div style="display:flex;gap:8px;margin-top:10px">
        <span style="padding:6px 12px;background:rgba(124,92,252,0.12);color:#7c5cfc;border-radius:8px;font-size:11px;font-weight:600">Проверить</span>
        <span style="padding:6px 12px;background:rgba(74,222,128,0.12);color:#4ade80;border-radius:8px;font-size:11px;font-weight:600">💾 Сохранить</span>
        <span style="font-size:10px;color:#4ade80">✅ Связь есть</span>
      </div>
    </div>
    <div style="display:flex;justify-content:space-between;padding:10px 16px;font-size:10px;color:#6e7681">
      <span>Клавиши <kbd style="background:#161b22;border:1px solid #30363d;padding:1px 4px;border-radius:3px;font-size:9px">Alt+T</kbd></span>
      <span>🌐 Русский</span>
    </div>
  </div>

  <div style="width:260px;background:#0d1117;border:1px solid #30363d;border-radius:14px;padding:14px;font-size:11px">
    <div style="display:flex;justify-content:space-between;margin-bottom:12px">
      <b style="color:#e6edf3;font-size:13px">Настройки</b>
      <span style="background:rgba(248,113,133,0.1);color:#f87171;border-radius:6px;padding:3px 8px;font-size:10px">Очистить кэш</span>
    </div>
    <div style="margin-bottom:10px">
      <span style="font-size:10px;color:#6e7681">Язык</span>
      <div style="background:#161b22;border:1px solid #30363d;border-radius:6px;padding:6px 8px;color:#c0c0d0;font-size:11px;margin-top:3px">🇷🇺 Русский ▾</div>
    </div>
    <div style="display:flex;gap:6px;margin-bottom:12px">
      <div style="flex:1"><span style="font-size:10px;color:#6e7681">Источник</span><div style="background:#161b22;border:1px solid #30363d;border-radius:6px;padding:6px 8px;color:#c0c0d0;font-size:11px;margin-top:3px">Авто ▾</div></div>
      <div style="flex:1"><span style="font-size:10px;color:#6e7681">Цель</span><div style="background:#161b22;border:1px solid #30363d;border-radius:6px;padding:6px 8px;color:#c0c0d0;font-size:11px;margin-top:3px">Русский ▾</div></div>
    </div>
    <div style="margin-bottom:12px">
      <span style="font-size:10px;color:#6e7681">Режим</span>
      <div style="margin-top:3px">
        <div style="display:flex;align-items:center;justify-content:space-between;background:#161b22;border:1px solid #30363d;border-radius:6px;padding:6px 8px;color:#c0c0d0;font-size:11px">⚡ Стандарт <span style="color:#6e7681">▾</span></div>
        <div style="background:#161b22;border:1px solid #30363d;border-radius:0 0 6px 6px;margin-top:1px;overflow:hidden">
          <div style="padding:6px 8px;font-size:11px;color:#9061f9;font-weight:600;background:rgba(124,92,252,0.08)">⚡ Стандарт</div>
          <div style="padding:6px 8px;font-size:11px;color:#c0c0d0">🚀 Турбо</div>
        </div>
      </div>
    </div>
    <div style="height:1px;background:#21262d;margin:12px 0"></div>
    <table style="width:100%;font-size:10px;border:none">
      <tr><td style="color:#6e7681;border:none;padding:2px 0">Ввод</td><td style="color:#e6edf3;text-align:right;border:none;padding:2px 0">12.5K</td></tr>
      <tr><td style="color:#6e7681;border:none;padding:2px 0">Вывод</td><td style="color:#e6edf3;text-align:right;border:none;padding:2px 0">3.2K</td></tr>
      <tr><td style="color:#6e7681;border:none;padding:2px 0">Всего</td><td style="color:#e6edf3;text-align:right;border:none;padding:2px 0">15.7K</td></tr>
      <tr><td style="color:#6e7681;border:none;padding:2px 0">Стоимость</td><td style="color:#e6edf3;text-align:right;border:none;padding:2px 0">¥0.0189</td></tr>
      <tr><td style="color:#6e7681;border:none;padding:2px 0">Кэш</td><td style="color:#e6edf3;text-align:right;border:none;padding:2px 0">142</td></tr>
    </table>
  </div>
</div>

<br>

---

## 📦 Начало за 3 шага

<table>
<tr>
<td align="center" width="33%"><b style="font-size:16px">1. Установка</b><br><sub>Скачайте zip из <a href="https://github.com/hywihq-boop/faluber-translate/releases">Releases</a>,<br>распакуйте и загрузите в <code>chrome://extensions</code></sub></td>
<td align="center" width="33%"><b style="font-size:16px">2. Настройка</b><br><sub>Выберите провайдера, введите ключ,<br>проверьте соединение, сохраните</sub></td>
<td align="center" width="33%"><b style="font-size:16px">3. Перевод</b><br><sub>Откройте страницу, нажмите<br>виджет или <kbd>Alt+T</kbd></sub></td>
</tr>
</table>

---

## 🔧 10 API-провайдеров

| Провайдер | Базовый URL API |
|-----------|----------------|
| ⭐ DeepSeek | `https://api.deepseek.com/v1` |
| OpenAI | `https://api.openai.com/v1` |
| Groq | `https://api.groq.com/openai/v1` |
| Together AI | `https://api.together.xyz/v1` |
| OpenRouter | `https://openrouter.ai/api/v1` |
| SiliconFlow | `https://api.siliconflow.cn/v1` |
| Moonshot | `https://api.moonshot.cn/v1` |
| Zhipu | `https://open.bigmodel.cn/api/paas/v4` |
| DashScope | `https://dashscope.aliyuncs.com/compatible-mode/v1` |
| Свой | Любой OpenAI-совместимый endpoint |

---

## 🛠️ Принцип работы

```
Пользователь запускает перевод
  → Content Script обходит DOM, собирает видимые текстовые узлы
  → Проверка видимости → Дедупликация CJK → Фильтр длины → Дедупликация кэша
  → Сортировка по Y, слияние соседних
  → Пакет → Service Worker (3–8 потоков)
  → Вызов AI API (OpenAI-совместимое) → Возврат результата
  → Замена текста в DOM → Прогресс-бар
```

### Сравнение режимов

| Параметр | Стандарт | Турбо |
|----------|---------|-------|
| Потоков | 3 | 8 |
| Размер пакета | 400 симв. | 250 симв. |
| Охват | Только viewport | Вся страница |
| Отслеж. скролла | ✅ | — |
| Отслеж. наведения | ✅ | — |
| Дин. контент | ✅ | ✅ |

### Кэш

| Уровень | Хранилище | Лимит | TTL | Сброс |
|---------|-----------|-------|-----|-------|
| Память | `Map<ориг, перев>` | ∞ | Сессия | — |
| Постоянный | `chrome.storage.local` | 2 000 | 1 час | 30 с + `beforeunload` |

---

## 🌍 50 языков · 20 языков интерфейса

<details>
<summary><b>Показать все 50 языков</b></summary>
<br>

`简体中文` `繁體中文` `English` `日本語` `한국어` `Français` `Deutsch` `Español` `Português` `Русский` `العربية` `हिन्दी` `ไทย` `Tiếng Việt` `Italiano` `Nederlands` `Polski` `Türkçe` `Bahasa Indonesia` `Svenska` `Dansk` `Suomi` `Norsk` `Čeština` `Română` `Magyar` `Ελληνικά` `עברית` `Українська` `Melayu` `Filipino` `বাংলা` `اردو` `فارسی` `Kiswahili` `தமிழ்` `తెలుగు` `मराठी` `ગુજરાતી` `ಕನ್ನಡ` `മലയാളം` `ਪੰਜਾਬੀ` `Български` `Slovenčina` `Lietuvių` `Latviešu` `Eesti` `Slovenščina` `Hrvatski` `Српски`

</details>

---

## 📂 Структура

```
faluber translate/
├── manifest.json
├── background/service-worker.js   # Вызовы API и маршрутизация
├── content/
│   ├── content.js                 # Извлечение и замена текста DOM
│   └── content.css                # Стили виджета
├── popup/
│   ├── popup.html                 # Окно настроек
│   ├── popup.js                   # Управление API
│   └── popup.css
├── icons/                         # Иконки расширения
├── docs/                          # Веб-сайт
└── generate-icons.js              # Генератор иконок
```

---

## 🔒 Приватность

- API-ключ хранится **локально** в синхронизированном хранилище Chrome
- Запросы идут **напрямую** из браузера к вашему API-провайдеру
- **Без сторонних серверов** — данные только между вами и провайдером

---

<div align="center">
  <br>
  <a href="https://github.com/hywihq-boop/faluber-translate">⭐ Star</a> ·
  <a href="https://github.com/hywihq-boop/faluber-translate/releases">📦 Релизы</a> ·
  <a href="https://github.com/hywihq-boop/faluber-translate/issues">🐛 Баг-репорт</a> ·
  <a href="LICENSE">📝 MIT</a>
  <br><br>
  <sub>Сделано с ❤️ · Данные не собираются</sub>
</div>
