<div align="center">
  <img src="icons/logo.png" width="96" height="96" style="border-radius:18px">

  # 🌐 Faluber Translate

  ### AI 기반 웹페이지 번역

  <sub>AI 기반 Chrome 브라우저 번역 확장 프로그램. 텍스트 노드 수준 DOM 조작.<br>50개 대상 언어 · 20개 UI 언어 · OpenAI 호환 API · MIT 오픈소스.</sub>

  <br>

  ![version](https://img.shields.io/badge/v2.0.10-7c5cfc?style=flat-square)
  ![manifest](https://img.shields.io/badge/MV3-blue?style=flat-square)
  ![license](https://img.shields.io/badge/MIT-green?style=flat-square)

  <br><br>

  <a href="https://github.com/hywihq-boop/faluber-translate/releases"><img src="https://img.shields.io/badge/⬇_다운로드-7c5cfc?style=for-the-badge" alt="다운로드"></a>
  &nbsp;
  <a href="https://github.com/hywihq-boop/faluber-translate"><img src="https://img.shields.io/badge/⭐_Star_on_GitHub-222?style=for-the-badge" alt="Star"></a>

  <br><br>

  <table align="center"><tr>
  <td align="center"><b style="font-size:20px;color:#5ce0fc">50+</b><br><sub style="color:#888">언어</sub></td>
  <td align="center"><b style="font-size:20px;color:#5ce0fc">2</b><br><sub style="color:#888">모드</sub></td>
  <td align="center"><b style="font-size:20px;color:#5ce0fc">8</b><br><sub style="color:#888">동시 번역</sub></td>
  <td align="center"><b style="font-size:20px;color:#5ce0fc">10</b><br><sub style="color:#888">API</sub></td>
  <td align="center"><b style="font-size:20px;color:#5ce0fc">~1s</b><br><sub style="color:#888">단어 설명</sub></td>
  </tr></table>
</div>

---

## ✨ 주요 기능

<table>
<tr>
<td width="50%">

### 🚀 원클릭 전체 페이지 번역
플로팅 위젯 클릭 또는 <kbd>Alt+T</kbd>로 전체 페이지 번역. 텍스트 노드 수준 DOM 치환으로 페이지 구조 보존. 소스 언어 자동 감지.

</td>
<td width="50%">

### 🔍 Ctrl + 스마트 설명
단어에 호버 + <kbd>Ctrl</kbd> 탭으로 AI 설명 버블 표시. 텍스트 선택 + <kbd>Ctrl</kbd>으로 문단 설명. 2단계 폴백: NLP 프롬프트 → HTML 감지. DOM 오염 제로.

</td>
</tr>
<tr>
<td width="50%">

### ⚡ 듀얼 번역 모드
**표준** — 3 동시, 뷰포트 우선, 속도와 비용 균형.<br>
**터보** — 8 동시, 전체 페이지, 최대 속도. 설정 영구 저장.

</td>
<td width="50%">

### 🔑 다중 API 관리
10개 제공업체 프리셋 내장. 여러 API 설정 저장, 언제든 전환. 모델 자동 가져오기. 사용자 정의 엔드포인트 지원.

</td>
</tr>
<tr>
<td width="50%">

### 📋 번역 패널 <kbd>Alt+Q</kbd>
좌우 분할 플로팅 번역 패널. 입력 즉시 번역, 페이지 번역과 독립적. 모든 언어 쌍 지원.

</td>
<td width="50%">

### 💾 스마트 캐시
메모리 + 영구 이중 캐시. 최대 2,000개 항목, 1시간 TTL. 30초마다 + `beforeunload` 시 자동 플러시. 언어 변경 시 자동 삭제.

</td>
</tr>
</table>

---

## 🖥️ 데모

### 전체 페이지 번역 + 플로팅 위젯

오른쪽 하단 위젯을 클릭하거나 <kbd>Alt+T</kbd>를 누르면 전체 페이지가 즉시 번역됩니다.

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
      <mark style="background:rgba(124,92,252,0.2);color:#c0c0d0;padding:0 2px;border-radius:2px">인공지능</mark>(AI)은 기계가 보여주는 지능입니다. 주요 AI 교과서는 이 분야를 <mark style="background:rgba(124,92,252,0.2);color:#c0c0d0;padding:0 2px;border-radius:2px">"지능형 에이전트"</mark>의 연구로 정의합니다.
    </p>
    <p style="color:#8b949e;font-size:13px;margin-bottom:10px;line-height:1.7">
      AI 응용에는 <mark style="background:rgba(124,92,252,0.2);color:#c0c0d0;padding:0 2px;border-radius:2px">고급 검색 엔진</mark>, <mark style="background:rgba(124,92,252,0.2);color:#c0c0d0;padding:0 2px;border-radius:2px">추천 시스템</mark>, <mark style="background:rgba(124,92,252,0.2);color:#c0c0d0;padding:0 2px;border-radius:2px">음성 인식</mark>, <mark style="background:rgba(124,92,252,0.2);color:#c0c0d0;padding:0 2px;border-radius:2px">자율주행</mark>, <mark style="background:rgba(124,92,252,0.2);color:#c0c0d0;padding:0 2px;border-radius:2px">생성형 AI</mark>가 포함됩니다.
    </p>
  </div>
  <div style="margin:0 16px 16px;border-radius:18px;background:#0d1117;border:1px solid #30363d;overflow:hidden">
    <div style="display:flex;align-items:center;justify-content:space-between;padding:10px 13px">
      <span style="font-size:11px;color:#8b949e">자동</span>
      <span style="display:inline-block;width:32px;height:18px;border-radius:99px;background:#7c5cfc"><span style="display:inline-block;margin:2px 0 0 15px;width:14px;height:14px;border-radius:50%;background:#fff"></span></span>
      <span style="padding:5px 14px;border-radius:13px;background:rgba(74,222,128,0.1);color:#4ade80;border:1px solid rgba(74,222,128,0.2);font-size:11px;font-weight:600">번역됨</span>
    </div>
    <div style="padding:6px 13px;background:rgba(255,255,255,0.03);display:flex;justify-content:space-between;align-items:center;font-size:10px;color:#8b949e">
      <span>토큰 <b style="color:#7c5cfc">2.5K</b></span>
      <span style="color:#4ade80">캐시 적중 42%</span>
    </div>
  </div>
</div>

---

### Ctrl + 스마트 설명

단어에 마우스를 올리고 <kbd>Ctrl</kbd>을 누르면 AI가 즉시 설명 버블을 표시합니다.

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
        "Strix"는 라틴어로 "올빼미"를 의미하며, ASUS의 프리미엄 게이밍 브랜드 ROG Strix의 이름이기도 합니다. GitHub에서는 프로젝트명이나 조직명으로 자주 사용됩니다.
      </div>
    </div>
  </div>
</div>

---

### 번역 패널 — <kbd>Alt+Q</kbd>

<kbd>Alt+Q</kbd>를 누르면 좌우 분할 플로팅 번역 패널이 열립니다.

<div style="border-radius:12px;overflow:hidden;border:1px solid #30363d;background:#161b22;max-width:780px;margin:0 auto 20px">
  <div style="display:flex;align-items:center;gap:8px;padding:10px 14px;background:#21262d;border-bottom:1px solid #30363d">
    <span style="width:10px;height:10px;border-radius:50%;background:#f87171;display:inline-block"></span>
    <span style="width:10px;height:10px;border-radius:50%;background:#facc15;display:inline-block"></span>
    <span style="width:10px;height:10px;border-radius:50%;background:#4ade80;display:inline-block"></span>
    <span style="padding:4px 12px;border-radius:6px;background:rgba(255,255,255,0.05);font-size:11px;color:#8b949e;flex:1;margin-left:4px">Faluber Translate — 번역 패널</span>
  </div>
  <div style="padding:24px;display:flex;gap:12px;align-items:stretch">
    <div style="flex:1;display:flex;flex-direction:column">
      <span style="font-size:10px;color:#8b949e;margin-bottom:4px;text-transform:uppercase">입력 — English</span>
      <textarea readonly style="flex:1;background:#0d1117;border:1px solid #30363d;border-radius:8px;color:#c0c0d0;padding:12px;font-size:12px;resize:none;min-height:120px;width:100%;font-family:inherit;outline:none">Artificial intelligence is transforming how we interact with technology. From voice assistants to self-driving cars, AI applications are becoming ubiquitous.</textarea>
    </div>
    <div style="display:flex;align-items:center;color:#7c5cfc;font-size:20px">→</div>
    <div style="flex:1;display:flex;flex-direction:column">
      <span style="font-size:10px;color:#8b949e;margin-bottom:4px;text-transform:uppercase">출력 — 한국어</span>
      <textarea readonly style="flex:1;background:#0d1117;border:1px solid rgba(74,222,128,0.2);border-radius:8px;color:#4ade80;padding:12px;font-size:12px;resize:none;min-height:120px;width:100%;font-family:inherit;outline:none">인공지능은 우리가 기술과 상호작용하는 방식을 변화시키고 있습니다. 음성 비서부터 자율주행 자동차까지, AI 애플리케이션은 일상 생활에서 점점 더 보편화되고 있습니다.</textarea>
    </div>
  </div>
</div>

---

### API 설정 및 모드 전환

팝업 또는 플로팅 위젯에서 API 설정 관리, 제공업체 전환, 모델 가져오기, 모드 전환이 가능합니다.

<div style="display:flex;gap:20px;flex-wrap:wrap;justify-content:center;margin:20px auto">
  <div style="width:300px;background:#0d1117;border:1px solid #30363d;border-radius:14px;overflow:hidden">
    <div style="display:flex;align-items:center;gap:10px;padding:14px 16px;border-bottom:1px solid #21262d">
      <div style="width:28px;height:28px;border-radius:6px;background:linear-gradient(135deg,#7c5cfc,#5ce0fc)"></div>
      <b style="background:linear-gradient(135deg,#7c5cfc,#5ce0fc);-webkit-background-clip:text;-webkit-text-fill-color:transparent">Faluber Translate</b>
    </div>
    <div style="padding:14px 16px;border-bottom:1px solid #21262d">
      <span style="font-size:10px;color:#6e7681;text-transform:uppercase">API 설정</span>
      <div style="display:flex;gap:4px;margin:6px 0 8px">
        <select style="flex:1;padding:7px 10px;background:#161b22;border:1px solid #30363d;border-radius:8px;color:#c0c0d0;font-size:11px"><option>Default</option></select>
        <span style="padding:4px 8px;background:rgba(124,92,252,0.12);color:#7c5cfc;border-radius:4px;font-size:14px">＋</span>
      </div>
      <span style="font-size:10px;color:#6e7681;text-transform:uppercase">제공업체</span>
      <select style="width:100%;padding:7px 10px;background:#161b22;border:1px solid #30363d;border-radius:8px;color:#c0c0d0;font-size:11px;margin:4px 0 8px"><option>DeepSeek</option></select>
      <span style="font-size:10px;color:#6e7681;text-transform:uppercase">API 키</span>
      <input type="password" value="sk-••••••••••••••" readonly style="width:100%;padding:7px 10px;background:#161b22;border:1px solid #30363d;border-radius:8px;color:#c0c0d0;font-size:11px;margin:4px 0 8px;font-family:monospace;outline:none">
      <span style="font-size:10px;color:#6e7681;text-transform:uppercase">API URL</span>
      <input value="https://api.deepseek.com/v1" readonly style="width:100%;padding:7px 10px;background:#161b22;border:1px solid #30363d;border-radius:8px;color:#c0c0d0;font-size:11px;margin:4px 0 8px;font-family:monospace;outline:none">
      <div style="display:flex;gap:8px;margin-top:10px">
        <span style="padding:6px 12px;background:rgba(124,92,252,0.12);color:#7c5cfc;border-radius:8px;font-size:11px;font-weight:600">연결 테스트</span>
        <span style="padding:6px 12px;background:rgba(74,222,128,0.12);color:#4ade80;border-radius:8px;font-size:11px;font-weight:600">💾 저장</span>
        <span style="font-size:10px;color:#4ade80">✅ 연결 성공</span>
      </div>
    </div>
    <div style="display:flex;justify-content:space-between;padding:10px 16px;font-size:10px;color:#6e7681">
      <span>단축키 <kbd style="background:#161b22;border:1px solid #30363d;padding:1px 4px;border-radius:3px;font-size:9px">Alt+T</kbd></span>
      <span>🌐 한국어</span>
    </div>
  </div>

  <div style="width:260px;background:#0d1117;border:1px solid #30363d;border-radius:14px;padding:14px;font-size:11px">
    <div style="display:flex;justify-content:space-between;margin-bottom:12px">
      <b style="color:#e6edf3;font-size:13px">번역 설정</b>
      <span style="background:rgba(248,113,133,0.1);color:#f87171;border-radius:6px;padding:3px 8px;font-size:10px">캐시 삭제</span>
    </div>
    <div style="margin-bottom:10px">
      <span style="font-size:10px;color:#6e7681">언어</span>
      <div style="background:#161b22;border:1px solid #30363d;border-radius:6px;padding:6px 8px;color:#c0c0d0;font-size:11px;margin-top:3px">🇰🇷 한국어 ▾</div>
    </div>
    <div style="display:flex;gap:6px;margin-bottom:12px">
      <div style="flex:1"><span style="font-size:10px;color:#6e7681">소스</span><div style="background:#161b22;border:1px solid #30363d;border-radius:6px;padding:6px 8px;color:#c0c0d0;font-size:11px;margin-top:3px">자동 감지 ▾</div></div>
      <div style="flex:1"><span style="font-size:10px;color:#6e7681">타겟</span><div style="background:#161b22;border:1px solid #30363d;border-radius:6px;padding:6px 8px;color:#c0c0d0;font-size:11px;margin-top:3px">한국어 ▾</div></div>
    </div>
    <div style="margin-bottom:12px">
      <span style="font-size:10px;color:#6e7681">모드</span>
      <div style="margin-top:3px">
        <div style="display:flex;align-items:center;justify-content:space-between;background:#161b22;border:1px solid #30363d;border-radius:6px;padding:6px 8px;color:#c0c0d0;font-size:11px">⚡ 표준 <span style="color:#6e7681">▾</span></div>
        <div style="background:#161b22;border:1px solid #30363d;border-radius:0 0 6px 6px;margin-top:1px;overflow:hidden">
          <div style="padding:6px 8px;font-size:11px;color:#9061f9;font-weight:600;background:rgba(124,92,252,0.08)">⚡ 표준</div>
          <div style="padding:6px 8px;font-size:11px;color:#c0c0d0">🚀 터보</div>
        </div>
      </div>
    </div>
    <div style="height:1px;background:#21262d;margin:12px 0"></div>
    <table style="width:100%;font-size:10px;border:none">
      <tr><td style="color:#6e7681;border:none;padding:2px 0">입력</td><td style="color:#e6edf3;text-align:right;border:none;padding:2px 0">12.5K</td></tr>
      <tr><td style="color:#6e7681;border:none;padding:2px 0">출력</td><td style="color:#e6edf3;text-align:right;border:none;padding:2px 0">3.2K</td></tr>
      <tr><td style="color:#6e7681;border:none;padding:2px 0">합계</td><td style="color:#e6edf3;text-align:right;border:none;padding:2px 0">15.7K</td></tr>
      <tr><td style="color:#6e7681;border:none;padding:2px 0">예상 비용</td><td style="color:#e6edf3;text-align:right;border:none;padding:2px 0">¥0.0189</td></tr>
      <tr><td style="color:#6e7681;border:none;padding:2px 0">캐시</td><td style="color:#e6edf3;text-align:right;border:none;padding:2px 0">142개</td></tr>
    </table>
  </div>
</div>

<br>

---

## 📦 3단계로 시작

<table>
<tr>
<td align="center" width="33%"><b style="font-size:16px">1. 설치</b><br><sub><a href="https://github.com/hywihq-boop/faluber-translate/releases">Releases</a>에서 zip 다운로드,<br>압축 해제 후 <code>chrome://extensions</code>에서 로드</sub></td>
<td align="center" width="33%"><b style="font-size:16px">2. API 설정</b><br><sub>제공업체 선택, API 키 입력,<br>연결 테스트, 저장</sub></td>
<td align="center" width="33%"><b style="font-size:16px">3. 번역</b><br><sub>아무 페이지나 열고 위젯 클릭<br>또는 <kbd>Alt+T</kbd> 누르기</sub></td>
</tr>
</table>

---

## 🔧 10개 API 제공업체

| 제공업체 | API 기본 URL |
|---------|-------------|
| ⭐ DeepSeek | `https://api.deepseek.com/v1` |
| OpenAI | `https://api.openai.com/v1` |
| Groq | `https://api.groq.com/openai/v1` |
| Together AI | `https://api.together.xyz/v1` |
| OpenRouter | `https://openrouter.ai/api/v1` |
| SiliconFlow | `https://api.siliconflow.cn/v1` |
| Moonshot | `https://api.moonshot.cn/v1` |
| Zhipu | `https://open.bigmodel.cn/api/paas/v4` |
| DashScope | `https://dashscope.aliyuncs.com/compatible-mode/v1` |
| 사용자 정의 | 모든 OpenAI 호환 엔드포인트 |

---

## 🛠️ 작동 방식

```
사용자 번역 트리거
  → Content Script가 DOM 순회, 보이는 텍스트 노드 수집
  → 가시성 확인 → CJK 중복 제거 → 최소 길이 필터 → 캐시 중복 제거
  → Y 좌표 정렬, 인접 노드 병합
  → 배치 → Service Worker로 전송 (3–8 동시)
  → AI API 호출 (OpenAI 호환) → 결과 반환
  → DOM 텍스트 치환 → 실시간 진행률 표시줄
```

### 모드 비교

| 매개변수 | 표준 | 터보 |
|---------|------|------|
| 동시성 | 3 | 8 |
| 배치 크기 | 400자 | 250자 |
| 페이지 범위 | 뷰포트만 | 전체 페이지 |
| 스크롤 감지 | ✅ | — |
| 호버 감지 | ✅ | — |
| 동적 콘텐츠 | ✅ | ✅ |

### 캐시

| 계층 | 저장소 | 제한 | TTL | 플러시 |
|------|--------|------|-----|--------|
| 메모리 | `Map<원문, 번역>` | ∞ | 세션 | — |
| 영구 | `chrome.storage.local` | 2,000 | 1시간 | 30초 + `beforeunload` |

---

## 🌍 50개 대상 · 20개 UI 언어

<details>
<summary><b>펼쳐서 전체 50개 언어 보기</b></summary>
<br>

`简体中文` `繁體中文` `English` `日本語` `한국어` `Français` `Deutsch` `Español` `Português` `Русский` `العربية` `हिन्दी` `ไทย` `Tiếng Việt` `Italiano` `Nederlands` `Polski` `Türkçe` `Bahasa Indonesia` `Svenska` `Dansk` `Suomi` `Norsk` `Čeština` `Română` `Magyar` `Ελληνικά` `עברית` `Українська` `Melayu` `Filipino` `বাংলা` `اردو` `فارسی` `Kiswahili` `தமிழ்` `తెలుగు` `मराठी` `ગુજરાતી` `ಕನ್ನಡ` `മലയാളം` `ਪੰਜਾਬੀ` `Български` `Slovenčina` `Lietuvių` `Latviešu` `Eesti` `Slovenščina` `Hrvatski` `Српски`

</details>

---

## 📂 프로젝트 구조

```
faluber translate/
├── manifest.json
├── background/service-worker.js   # API 호출 및 메시지 라우팅
├── content/
│   ├── content.js                 # DOM 텍스트 추출 및 교체
│   └── content.css                # 위젯 스타일
├── popup/
│   ├── popup.html                 # 설정 팝업
│   ├── popup.js                   # 다중 API 관리
│   └── popup.css
├── icons/                         # 확장 프로그램 아이콘
├── docs/                          # 제품 웹사이트
└── generate-icons.js              # 아이콘 생성기 (개발 도구)
```

---

## 🔒 개인정보 보호

- API 키는 Chrome 동기화 저장소에 **로컬**로 저장
- 번역 요청은 브라우저에서 **직접** 구성된 API 제공업체로 전송
- **제3자 서버 없음** — 데이터는 사용자와 API 제공업체 간에만 유지

---

<div align="center">
  <br>
  <a href="https://github.com/hywihq-boop/faluber-translate">⭐ Star</a> ·
  <a href="https://github.com/hywihq-boop/faluber-translate/releases">📦 릴리스</a> ·
  <a href="https://github.com/hywihq-boop/faluber-translate/issues">🐛 버그 신고</a> ·
  <a href="LICENSE">📝 MIT</a>
  <br><br>
  <sub>❤️로 제작 · 사용자 데이터 수집 없음</sub>
</div>
