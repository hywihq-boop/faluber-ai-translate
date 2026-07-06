# 🌐 Faluber Translate — AI 기반 웹페이지 번역

AI(DeepSeek, OpenAI, Qwen 등 OpenAI 호환 API)를 사용하는 Chrome 브라우저 번역 확장 프로그램입니다. Manifest V3로 구축되었으며, 텍스트 노드 수준의 DOM 조작을 통해 50개 대상 언어와 20개 UI 언어로 원활한 번역을 제공합니다.

![version](https://img.shields.io/badge/version-2.0.10-7c5cfc)
![manifest](https://img.shields.io/badge/manifest-v3-blue)
![license](https://img.shields.io/badge/license-MIT-green)

## ✨ 기능

- 🚀 **원클릭 전체 페이지 번역** — 아이콘 클릭 또는 `Alt+T`
- 🌍 **50개 대상 언어** — AI 구동, 모든 언어 쌍 지원
- ⚡ **듀얼 번역 모드** — 표준(균형) 및 고속(최대 속도)
- 🔑 **다중 API 지원** — 10개 제공업체 프리셋 내장 (DeepSeek, OpenAI, Groq, Qwen 등)
- 💬 **Ctrl+설명 버블** — 단어에 마우스 오버 + Ctrl 키로 AI 설명
- 📋 **번역 패널** — `Alt+Q`로 좌우 분할 입출력 번역 패널
- 👆 **원문 호버 보기** — 번역된 텍스트에 마우스를 올리면 원문 표시
- ↩️ **원클릭 복원** — 언제든지 원래 페이지로 복원
- 📊 **실시간 진행률** — 번역 중 시각적 진행률 표시줄
- 💾 **스마트 캐싱** — 메모리 + 영구 캐시, 1시간 TTL
- 🎨 **깔끔한 다크 UI** — 접이식 플로팅 위젯

## 📦 설치

### 1. 확장 프로그램 로드

1. Chrome/Edge에서 `chrome://extensions/`로 이동
2. 우측 상단 **개발자 모드** 활성화
3. **압축 해제된 확장 프로그램 로드** 클릭
4. `faluber translate` 폴더 선택
5. 완료!

### 2. API 구성

1. 도구 모음에서 Faluber Translate 아이콘 클릭
2. 드롭다운에서 제공업체 선택 (DeepSeek, OpenAI 등)
3. **API 키** 입력
4. **연결 테스트** 클릭하여 확인
5. **저장** 클릭

### 3. 번역 시작

- 아무 웹페이지에서 아이콘 클릭 → **페이지 번역**
- 또는 **`Alt+T`** 누르기

## 🎮 사용법

| 동작 | 방법 |
|------|------|
| 페이지 번역 | 아이콘 → "번역" 또는 `Alt+T` |
| 선택 텍스트 번역 | 텍스트 선택 → `Ctrl` |
| 번역 패널 | `Alt+Q` |
| 단어 설명 | 단어에 호버 → `Ctrl` |
| 원본 복원 | 아이콘 → "복원" |
| 번역 취소 | `Esc` |
| 원문 보기 | 번역된 텍스트에 호버 |
| 언어 전환 | 팝업 언어 선택기 사용 |

## 🔧 지원 API

10개 제공업체 프리셋 내장. 모든 OpenAI 호환 API 사용 가능:

| 제공업체 | API 기본 URL | 모델 |
|---------|-------------|-------|
| DeepSeek | `https://api.deepseek.com/v1` | `deepseek-chat` |
| OpenAI | `https://api.openai.com/v1` | `gpt-4o-mini` |
| Groq | `https://api.groq.com/openai/v1` | `llama-3.3-70b` |
| Together AI | `https://api.together.xyz/v1` | `meta-llama/...` |
| OpenRouter | `https://openrouter.ai/api/v1` | `openai/gpt-4o` |
| SiliconFlow | `https://api.siliconflow.cn/v1` | `deepseek-ai/...` |
| Moonshot | `https://api.moonshot.cn/v1` | `moonshot-v1-8k` |
| Zhipu | `https://open.bigmodel.cn/api/paas/v4` | `glm-4` |
| DashScope | `https://dashscope.aliyuncs.com/compatible-mode/v1` | `qwen-plus` |
| 사용자 정의 | 모든 OpenAI 호환 엔드포인트 | 모든 모델 |

## 📂 프로젝트 구조

```
faluber translate/
├── manifest.json                 # 확장 프로그램 구성 (Manifest V3)
├── popup/
│   ├── popup.html                # 설정 팝업
│   ├── popup.js                  # 다중 API 관리 로직
│   └── popup.css                 # 팝업 스타일
├── content/
│   ├── content.js                # DOM 텍스트 추출 및 교체
│   └── content.css               # 위젯 스타일
├── background/
│   └── service-worker.js         # API 호출 및 메시지 라우팅
├── icons/                        # 확장 프로그램 아이콘
├── generate-icons.js             # 아이콘 생성 스크립트 (개발 도구)
├── LICENSE
└── README.md
```

## 🛠️ 작동 방식

### 번역 흐름

```
사용자 번역 트리거
  → Content Script가 DOM 순회, 보이는 텍스트 노드 수집
  → 필터: 가시성 확인, CJK 중복 제거, 최소 길이, 캐시 중복 제거
  → Y 좌표 정렬, 인접 노드 병합
  → 배치로 Service Worker에 전송 (3–8 병렬 워커)
  → Service Worker가 AI API 호출 (OpenAI 호환 형식)
  → 결과를 Content Script로 반환하여 DOM 교체
  → 실시간 진행률 표시줄 + 완료 알림
```

### 스마트 텍스트 처리

- `<script>`, `<style>`, `<code>` 등 비콘텐츠 태그 건너뛰기
- 순수 숫자, URL, 이모지 등 번역 불필요 콘텐츠 필터링
- `display:none`, `visibility:hidden` 등 비가시 상태 감지
- HTML 엔티티 및 특수 문자 보존
- 인접 텍스트 노드(동일 부모 또는 형제 부모) 병합 후 전송

### 번역 모드

| 매개변수 | 표준 | 고속 (터보) |
|---------|------|------------|
| 동시성 | 3 | 8 |
| 배치 크기 | 400자 | 250자 |
| 전체 페이지 | 아니오 (뷰포트만) | 예 |
| 스크롤 감지 | 예 | 아니오 |
| 호버 감지 | 예 | 아니오 |
| MutationObserver | 예 | 예 |

### 캐시 시스템

- **메모리**: `Map<원문, 번역문>` 즉시 조회
- **영구**: `chrome.storage.local`, 최대 2,000개 항목, 1시간 TTL
- **자동 플러시**: 30초마다 + `beforeunload` 시
- **자동 삭제**: 대상 언어 변경 시

### Ctrl+설명 (플로팅 버블)

- 단어에 호버 + `Ctrl` 탭 (길게 누르기 아님)
- 또는 텍스트 선택 + `Ctrl`
- 2단계 폴백: 자연어 프롬프트 → HTML 검사
- ✕, `Esc` 또는 다른 곳 클릭으로 닫기

## 🔒 개인정보 보호

- API 키는 Chrome 동기화 저장소에 로컬로 저장
- 모든 번역 요청은 브라우저에서 직접 구성된 API 제공업체로 전송
- 제3자 서버 개입 없음 — 데이터는 사용자와 API 제공업체 간에만 유지

## 📝 라이선스

MIT — 자세한 내용은 [LICENSE](LICENSE) 참조.
