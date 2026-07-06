<div align="center">
  <img src="icons/logo.png" width="96" height="96" style="border-radius:18px">

  # 🌐 Faluber Translate

  ### ИИ-переводчик веб-страниц — 50 языков, 10 API-провайдеров

  ![version](https://img.shields.io/badge/v2.0.10-7c5cfc?style=flat-square)
  ![manifest](https://img.shields.io/badge/MV3-blue?style=flat-square)
  ![license](https://img.shields.io/badge/MIT-green?style=flat-square)

  <br>

  <a href="https://github.com/hywihq-boop/faluber-translate/releases"><img src="https://img.shields.io/badge/⬇_Скачать-7c5cfc?style=for-the-badge" alt="Скачать"></a>
  &nbsp;
  <a href="https://github.com/hywihq-boop/faluber-translate"><img src="https://img.shields.io/badge/⭐_Star-222?style=for-the-badge" alt="Star"></a>
</div>

<br>

> **Faluber Translate** — расширение Chrome для перевода веб-страниц с помощью ИИ. Замена текстовых узлов напрямую в DOM — без iframe и оверлеев. **50 языков**, **10 встроенных API-провайдеров**, **два режима перевода**.

---

## 📸 Скриншоты

<div align="center">
  <p><em>🎬 Перевод страницы — <kbd>Alt+T</kbd>, английский переводится на китайский</em></p>
  <img src="assets/translate-demo.gif" alt="Демо перевода" width="780">
  <br><br>

  <p><em>🎬 Ctrl + объяснение — наведите на слово, нажмите <kbd>Ctrl</kbd></em></p>
  <img src="assets/explain-demo.gif" alt="Демо объяснения" width="780">
  <br><br>

  <p><em>🎬 Панель перевода <kbd>Alt+Q</kbd> — ввод текста, мгновенный перевод</em></p>
  <img src="assets/panel-demo.gif" alt="Демо панели" width="780">
  <br><br>

  <p><em>🎬 Сворачивание виджета / панель настроек — анимация</em></p>
  <img src="assets/collapse-expand.gif" alt="Анимация сворачивания" width="360">
  &nbsp;
  <img src="assets/detail-panel.gif" alt="Анимация панели" width="360">
</div>

---

## ✨ Возможности

<table>
<tr>
<td width="50%">

### 🚀 Перевод в один клик
Нажмите на виджет или <kbd>Alt+T</kbd>. Замена на уровне текстовых узлов сохраняет структуру страницы.

</td>
<td width="50%">

### 🔍 Ctrl + Умное объяснение
Наведите на слово + <kbd>Ctrl</kbd> для ИИ-объяснения. Выделите текст + <kbd>Ctrl</kbd> для объяснения абзаца.

</td>
</tr>
<tr>
<td width="50%">

### ⚡ Два режима
**Стандартный** — 3 потока, сначала видимая область.<br>
**Турбо** — 8 потоков, вся страница, максимальная скорость.

</td>
<td width="50%">

### 🔑 Мульти-API
10 встроенных пресетов (DeepSeek, OpenAI, Groq, Qwen...). Несколько конфигураций, переключение, автозагрузка моделей.

</td>
</tr>
<tr>
<td width="50%">

### 📋 Панель перевода <kbd>Alt+Q</kbd>
Плавающая панель с двумя колонками. Мгновенный перевод, независимо от страницы.

</td>
<td width="50%">

### 💾 Умный кэш
Двухуровневый: в памяти + постоянный. До 2 000 записей, TTL 1 час. Автосброс + `beforeunload`.

</td>
</tr>
</table>

---

## 📦 Начало за 3 шага

| Шаг | |
|------|---|
| **1. Установка** | Скачайте zip из [Releases](https://github.com/hywihq-boop/faluber-translate/releases), распакуйте и загрузите в `chrome://extensions` |
| **2. Настройка** | Нажмите иконку → выберите провайдера → введите ключ → проверьте соединение → сохраните |
| **3. Перевод** | Откройте страницу → нажмите виджет или <kbd>Alt+T</kbd> |

---

## 🔧 API-провайдеры

| Провайдер | Базовый URL |
|-----------|------------|
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
  → Сортировка по Y, слияние → Пакет → Service Worker (3–8 потоков)
  → Вызов AI API (OpenAI-совместимое) → Возврат → Замена текста в DOM
  → Прогресс-бар + уведомление
```

### Сравнение режимов

| | Стандарт | Турбо |
|---|---------|-------|
| Потоков | 3 | 8 |
| Размер пакета | 400 симв. | 250 симв. |
| Охват | Viewport | Вся страница |
| Скролл | ✅ | — |
| Наведение | ✅ | — |
| Дин. контент | ✅ | ✅ |

---

## 🌍 50 языков · 20 языков интерфейса

<details>
<summary><b>Показать все языки</b></summary>
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
│   ├── content.js                 # Извлечение и замена текста
│   └── content.css                # Стили виджета
├── popup/
│   ├── popup.html                 # Окно настроек
│   ├── popup.js                   # Управление API
│   └── popup.css
├── icons/                         # Иконки
├── assets/                        # Скриншоты
└── docs/                          # Веб-сайт
```

---

## 🔒 Приватность

- API-ключ хранится **локально** в синхронизированном хранилище Chrome
- Запросы идут **напрямую** из браузера к вашему API-провайдеру
- **Без сторонних серверов**

---

<div align="center">
  <br>
  <a href="https://github.com/hywihq-boop/faluber-translate">⭐ Star</a> ·
  <a href="https://github.com/hywihq-boop/faluber-translate/releases">📦 Релизы</a> ·
  <a href="https://github.com/hywihq-boop/faluber-translate/issues">🐛 Баг-репорт</a> ·
  <a href="LICENSE">📝 MIT</a>
</div>
