# 현대오토에버 지원 포트폴리오 — 디자인 가이드 v1.0

> 2026.10 · 작성 하지연 · UX & UI Designer (생성형 AI 서비스 운영) 지원용 반응형 웹 포트폴리오
> 원본 캔버스: https://claude.ai/artifact/JMMtzouaudfyAn3GJ4VMPS
> 기존 포트폴리오(`index.html`, `portfolio-app.jsx`, `portfolio-data.js`, `portfolio.css`)를 기본 틀로 재구성한다.
> v1.1 (2026.10.12): AI 제안 섹션 삭제, 프로젝트 역할 확정, 파일 구조(§7) 반영
> v1.2 (2026.10.12): Design System 섹션 삭제 → 6섹션, 섹션 여백 축소, 히어로 'AI 서비스' 그라데이션 강조, 맨 위로 버튼 추가

---

## 0. 개요

### 확정된 결정
| 항목 | 결정 |
|---|---|
| 토큰 | 현대 CI 기반 **신규** 디자인 시스템 (기존 `_ds/` 토큰은 사용하지 않음) |
| 테마 | Light Sand 단일 (다크 모드 없음) |
| 서체 | Pretendard 단일 |
| 반응형 핵심 요소 | 유동 타이포 · 스크롤 연출 |
| 커서 반응 배경 | 히어로에만 적용 |
| 프로젝트 | 여기말GO(메인, 상세 페이지) · DIDIT · News-TODO |
| 구성 | UX 직무형 6섹션 (AI 서비스 제안 · Design System 섹션 제외) |
| 구현 | React 18 + Babel standalone CDN 구조 유지 (빌드 없음) |
| 히어로 | 프로필 사진 없음, 이력서 PDF 버튼 없음, 하단에 역량 해시태그 |

### 채용공고 → 포트폴리오 매핑
| 공고 항목 | 포트폴리오 구현 | 가이드 위치 |
|---|---|---|
| 서비스 아이덴티티 기반 화면 구성 | 현대 CI 9색을 Primitive → Semantic 토큰으로 변환해 전 화면 적용 | §1, §4 |
| 반응형 웹·앱 UI | clamp() 유동 타이포, 4·8·12 컬럼 그리드, 모바일 별도 설계 | §2, §3 |
| 디자인 시스템 · 컴포넌트 설계와 문서화 | 이 가이드 문서 + 토큰 파일(`tokens/`), Strength 02 · DIDIT 공통 컴포넌트 사례 | §4, §6 |
| 개발 협업용 디자인 가이드 | 이 문서 자체 + 모든 값에 CSS 변수명 병기 | 전체 |
| HTML/CSS/JS 이해 (우대) | 직접 퍼블리싱, 커서 반응 히어로, 스크롤 연출 | §5, §7 |
| 생성형 AI 서비스 경험 | 세 프로젝트 카드마다 'AI가 맡은 일 / 사람이 확인한 일'을 나눠 표기 | §6 |

### 디자인 원칙
1. **Calm Premium** — Light Sand 바탕과 넓은 여백. Hyundai Blue는 제목과 핵심 동작에만 절제해서 쓴다.
2. **근거가 먼저 보이는 화면** — 한 화면에 한 메시지. 결과물보다 문제 정의와 판단 근거를 먼저 배치한다.
3. **반응형은 축소가 아니라 재설계** — 모바일은 정보 순서와 상호작용을 기기별로 다시 정한다.

---

## 1. Color

출처: https://www.hyundai.com/kr/ko/info/ci/ci-color — 화면 코드에서는 원색 HEX를 직접 쓰지 않고 **Semantic 토큰만** 참조한다.

### 1-1. CI Primitive (원본 9색)
| 이름 | HEX | RGB | Pantone | 토큰 |
|---|---|---|---|---|
| Hyundai Blue | `#002C5F` | 0 44 95 | PMS 654C | `--ci-blue` |
| Sand | `#E4DCD3` | 228 220 211 | Warm Gray 1C | `--ci-sand` |
| Light Sand | `#F6F3F2` | 246 243 242 | Warm Gray 1C 30% | `--ci-light-sand` |
| Gold | `#A36B4F` | 163 107 79 | PMS 876C | `--ci-gold` |
| White | `#FFFFFF` | 255 255 255 | — | `--ci-white` |
| Black | `#000000` | 0 0 0 | — | `--ci-black` |
| Active Blue | `#00AAD2` | 0 170 210 | PMS 312C | `--ci-active-blue` |
| Sky Blue | `#AACAE6` | 170 202 230 | PMS 277C | `--ci-sky-blue` |
| Active Red | `#E63312` | 230 51 18 | PMS 2347C | `--ci-active-red` |

### 1-2. 확장 스케일 (● = CI 원본, 나머지는 UI용 파생 값)
```css
:root {
  /* Blue */
  --blue-50:  #EEF2F7;
  --blue-100: #D6E0EC;
  --blue-200: #AACAE6; /* ● Sky Blue */
  --blue-300: #6F94BF;
  --blue-500: #1F4E86;
  --blue-700: #002C5F; /* ● Hyundai Blue */
  --blue-900: #001B3B;

  /* Sand / Neutral */
  --sand-0:   #FFFFFF; /* ● */
  --sand-50:  #F6F3F2; /* ● Light Sand */
  --sand-100: #EEE8E3;
  --sand-200: #E4DCD3; /* ● Sand */
  --sand-300: #CFC5BA;
  --sand-500: #9A928A; /* 텍스트 금지 (대비 부족) */
  --sand-600: #6E6863;
  --sand-700: #4A4744;
  --sand-900: #1C1B1A;

  /* Accent */
  --active-50:  #E0F5FA;
  --active-500: #00AAD2; /* ● Active Blue — 텍스트 금지 */
  --active-ink: #00799A; /* 텍스트용 Active Blue */
  --gold-500:   #A36B4F; /* ● 24px 이상 텍스트만 */
  --gold-ink:   #8A5740; /* 텍스트용 Gold */
  --red-ink:    #C02A0E; /* 오류 텍스트용 */
}
```

### 1-3. Semantic 토큰
| 토큰 | 값 | 쓰임 |
|---|---|---|
| `--surface-page` | sand-50 | 페이지 바탕 |
| `--surface-card` | sand-0 | 카드, 모달, 입력창 |
| `--surface-sunken` | sand-100 | 교차 섹션 배경, 코드 블록 |
| `--surface-inverse` | blue-700 | 강조 섹션, 푸터, 주요 버튼 |
| `--text-strong` | blue-700 | 제목, 강조 텍스트 |
| `--text-body` | sand-700 | 본문 |
| `--text-muted` | sand-600 | 캡션, 메타 정보 |
| `--text-inverse` | sand-0 | 어두운 배경 위 텍스트 |
| `--text-inverse-muted` | blue-200 | 어두운 배경 위 보조 텍스트 |
| `--accent` | active-500 | 그래픽, 커서 빛, 진행 바 (**텍스트 금지**) |
| `--accent-ink` | active-ink | 링크, 오버라인, 작은 강조 텍스트 |
| `--highlight` | gold-ink | 성과, 수상, 'NEXT' 같은 1% 포인트 |
| `--border` | sand-200 | 기본 구분선, 카드 테두리 |
| `--border-strong` | sand-300 | hover 테두리, 입력창 |
| `--focus-ring` | active-500 | 키보드 포커스 2px + offset 2px |
| `--danger` | red-ink | 오류 (거의 안 씀) |

### 1-4. 사용 비율 (자체 제안 — CI 페이지에는 비율 규정 없음)
Light Sand · White **70** / Sand **12** / Hyundai Blue **12** / Active · Sky Blue **5** / Gold **1**

### 1-5. 대비 검사 (WCAG 2.2)
| 전경 / 배경 | 대비 | 판정 |
|---|---|---|
| Blue 700 / Light Sand | 12.4:1 | AA 통과 |
| Sand 700 / Light Sand | 8.4:1 | AA 통과 |
| Sand 600 / Light Sand | 5.0:1 | AA 통과 |
| Active Ink / Light Sand | 4.5:1 | AA 통과 (경계값) |
| Sky Blue / Blue 700 | 8.0:1 | AA 통과 |
| Gold 500 / Light Sand | 4.0:1 | 24px 이상만 |
| Active Blue / White | 2.7:1 | **텍스트 금지** |

---

## 2. Typography

```css
/* jsDelivr CDN, dynamic-subset */
@import url("https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css");

:root {
  --font-sans: 'Pretendard Variable', Pretendard, -apple-system, 'Apple SD Gothic Neo', 'Noto Sans KR', sans-serif;
  /* weight: 400 · 500 · 600 · 700 만 사용 */
}
```

### 2-1. 스케일
| 토큰 | 크기 (CSS) | weight | line-height | letter-spacing | 쓰임 |
|---|---|---|---|---|---|
| `--fs-display` | `clamp(2.5rem, 1.5rem + 4.444vw, 5.5rem)` | 700 | 1.15 | -0.03em | 히어로 헤드라인 |
| `--fs-h1` | `clamp(2rem, 1.5rem + 2.222vw, 3.5rem)` | 700 | 1.25 | -0.025em | 페이지 제목 |
| `--fs-h2` | `clamp(1.5rem, 1.167rem + 1.481vw, 2.5rem)` | 700 | 1.3 | -0.02em | 섹션 제목 |
| `--fs-h3` | `clamp(1.25rem, 1.167rem + 0.370vw, 1.5rem)` | 600 | 1.4 | -0.01em | 카드·소제목 |
| `--fs-body-l` | `clamp(1.0625rem, 1.042rem + 0.093vw, 1.125rem)` | 400 | 1.7 | 0 | 히어로 소개, 리드 문단 |
| `--fs-body` | `1rem` (고정) | 400 | 1.65 | 0 | 일반 본문 |
| `--fs-caption` | `0.875rem` | 500 | 1.5 | 0 | 메타 정보 |
| `--fs-overline` | `0.75rem` | 600 | 1.4 | 0.16em, 대문자 | `03 — PROJECTS` |

### 2-2. 화면 폭별 실제 크기 (px)
| 토큰 | 360 | 768 | 1280 | 1440+ |
|---|---|---|---|---|
| Display | 40 | 58 | 81 | 88 |
| H1 | 32 | 41 | 52 | 56 |
| H2 | 24 | 30 | 38 | 40 |
| H3 | 20 | 21.5 | 23.4 | 24 |
| Body L | 17 | 17.4 | 17.9 | 18 |
| Body / Caption / Overline | 16 / 14 / 12 고정 | | | |

### 2-3. 규칙
- **한글 줄바꿈**: 전역 `word-break: keep-all; overflow-wrap: break-word;` 제목은 `text-wrap: balance`.
- **본문 최대 폭**: 680px (국문 36–40자). 본문은 모바일에서도 16px 미만으로 줄이지 않는다.
- **숫자·기간**: `font-variant-numeric: tabular-nums`. 기간은 en dash(–), 항목 구분은 가운뎃점(·).
- **강조**: weight 600 + `--text-strong`. 기울임·밑줄 강조 금지(밑줄은 링크 전용).

---

## 3. Layout & Spacing

모바일 우선(`min-width`) 작성. 콘텐츠 최대 폭 1200px, 그보다 넓으면 여백만 증가.

### 3-1. 브레이크포인트
| 이름 | 범위 | 컬럼 | 거터 | 마진 | 대표 변화 |
|---|---|---|---|---|---|
| Mobile | 0 – 767 | 4 | 16 | 20 | GNB → 햄버거 시트, 카드 1열, 프로젝트 이미지 가로 스와이프 |
| Tablet (`--bp-md`) | 768 – 1199 | 8 | 24 | 40 | 카드 2열, 케이스 스터디 본문 단일 컬럼 |
| Desktop (`--bp-lg`) | 1200 + | 12 | 24 | 80 | GNB 가로 메뉴, 케이스 스터디 좌측 목차 sticky |
| Wide | 1440 + | 12 | 24 | auto | `--container: 1200px` 고정, 히어로만 전체 폭 |

```css
@media (min-width: 768px)  { /* tablet */ }
@media (min-width: 1200px) { /* desktop */ }
```

### 3-2. 프로젝트 섹션 재배치 예시
- **Desktop 12col**: 메인 케이스 이미지 7 + 텍스트 5, 보조 카드 6 + 6
- **Tablet 8col**: 메인 세로 적층(이미지 → 텍스트), 보조 4 + 4
- **Mobile 4col**: 전부 1열, 이미지 먼저

### 3-3. 배치 원칙
- 컨테이너는 `display: grid; grid-template-columns: repeat(N, minmax(0, 1fr));` 자식은 span으로 배치.
- 정렬은 grid, 컴포넌트 내부 간격은 flex `gap`. margin으로 간격 만들지 않기.
- 문제 → 해결 → 결과 순서는 모바일에서도 유지. `order`로 시각 순서만 바꾸지 않기.

### 3-4. 간격 (4px 기반)
| 토큰 | px |
|---|---|
| `--sp-1` | 4 |
| `--sp-2` | 8 |
| `--sp-3` | 12 |
| `--sp-4` | 16 |
| `--sp-6` | 24 |
| `--sp-8` | 32 |
| `--sp-12` | 48 |
| `--sp-16` | 64 |
| `--sp-24` | 96 |
| `--sp-32` | 128 |

섹션 상하 여백: `--sp-section: clamp(56px, 2.5rem + 3vw, 104px)` · 섹션 제목 아래 32px(Desktop 48px)

### 3-5. 모서리 반경
| 토큰 | 값 | 쓰임 |
|---|---|---|
| `--r-0` | 0 | 이미지, 섹션 |
| `--r-sm` | 4px | 버튼, 입력창 |
| `--r-md` | 8px | 카드, 패널 |
| `--r-full` | 999px | 태그, 칩, 해시태그 |

16px 이상의 둥근 카드는 쓰지 않는다 (CI의 단정한 인상 유지).

### 3-6. 깊이
| 토큰 | 값 | 쓰임 |
|---|---|---|
| `--elev-0` | `border: 1px solid var(--border)`, 그림자 없음 | 기본 카드 |
| `--elev-1` | `0 12px 32px rgb(0 44 95 / .10)` + border-strong | hover 카드, 드롭다운 |
| `--elev-glass` | `background: rgb(246 243 242 / .8); backdrop-filter: blur(16px); box-shadow: 0 1px 0 rgb(0 44 95 / .06)` | 스크롤 후 GNB |

---

## 4. Components

상태 기준: default · hover · pressed · focus-visible · disabled.

### 4-1. Button
공통: height 48 · padding 0 24 · 15px/600 · radius 4 · 터치 영역 ≥ 44 · 전환 `background 150ms, transform 150ms` · pressed `translateY(1px)` · 화살표 아이콘은 hover 시 4px 오른쪽 이동 · 문구는 동사형.

| 종류 | Default | Hover | Pressed | Focus-visible | Disabled |
|---|---|---|---|---|---|
| Primary | bg blue-700, 글자 white | bg blue-500 | bg blue-900 | + outline 2px active-500, offset 2px | bg sand-200, 글자 sand-500 |
| Secondary | 투명, 1.5px blue-700 테두리, 글자 blue-700 | bg blue-50 | bg blue-100 | 동일 outline | 글자 sand-500, 테두리 sand-300 |
| Text link | 글자 active-ink | blue-700 + 밑줄(offset 4px) | blue-900 | 동일 outline | sand-500 |

### 4-2. Tag · Chip · Hashtag
height 28 · padding 0 12 · radius full · 13px/500. 클릭 요소가 아니므로 hover 없음.
| 종류 | 스타일 |
|---|---|
| 역할 (기획, UX 리서치, UI 디자인) | bg sand-200, 글자 blue-700 |
| 툴 (Figma, React) | bg blue-50, 1px blue-100 테두리 |
| AI 관련 | bg active-50, 글자 `#00566E` |
| 상태 강조 (메인 케이스) | bg blue-700, 글자 white |
| 성과 (수상) | 투명, 1px gold-500 테두리, 글자 gold-ink |
| 히어로 해시태그 | bg `rgb(255 255 255 / .7)`, 1px sand-200 테두리, 15px/500, padding 8 16 (모바일 13px, 6 12). `<ul aria-label="역량 키워드">` 마크업 |

### 4-3. Section Header
오버라인(`번호 — 영문 이름`, active-ink) → H2 → Body L 리드(최대 560px, 2줄 이하). 간격 10 / 16.

### 4-4. GNB
- **Desktop**: 높이 64(히어로 시안 72). 처음엔 투명 → 스크롤 80px 이후 `--elev-glass`로 전환. 현재 섹션 링크에 2px blue-700 밑줄 (IntersectionObserver).
- **Mobile**: 높이 56, 햄버거 버튼 44×44(`aria-label="메뉴 열기"`). 메뉴는 Hyundai Blue 전체 화면 시트, 링크 18px/600 흰색. 열렸을 때 본문 스크롤 잠금, Esc로 닫기, 포커스 트랩.
- 메뉴 항목: Projects · Skills · Journey · Contact. 로고 텍스트 `HA JIYEON`(클릭 시 맨 위로).
- **맨 위로 버튼**: 우측 하단 고정 48×48, bg blue-700 + 흰 테두리 1.5px, 첫 화면 높이의 80%를 지나면 나타남. `aria-label="맨 위로 이동"`

### 4-5. Project Card
- 카드 전체가 하나의 `<a>`. 순서: 태그 → 이름 → 한 줄 설명 → 메타.
- 이미지 16:10 고정, `object-fit: cover`.
- hover: 테두리 sand-300 + elev-1 + 이미지 `scale(1.03)` (overflow hidden), 240ms.
- 메인 카드 이름 26px/700, 보조 카드 20px/700. 메타는 13px muted.

### 4-6. Token Chip (미사용 — DS 섹션 삭제)
- `<button>`: 색 미리보기(56px) + 이름 + `토큰명 · HEX`.
- 클릭하면 HEX를 클립보드에 복사, 1.5초간 '복사됨 ✓' 표시 (`aria-live="polite"`).
- 값은 하드코딩하지 않고 `getComputedStyle(document.documentElement).getPropertyValue('--ci-blue')`로 실제 변수를 읽는다.

### 4-7. Timeline Item
그리드 `64px 14px 1fr`: 연도(mono, 700) · 점 · 제목 + 메타.
점 모양으로 구분해 색에만 의존하지 않는다: **채움** = 프로젝트, **외곽선** = 교육, **Gold 채움** = NEXT(현대오토에버).

---

## 5. Motion & Interaction

움직임은 정보의 흐름을 보여줄 때만. 장식 모션은 히어로 커서 빛 하나로 제한.

### 5-1. 모션 토큰
| 토큰 | 값 | 쓰임 |
|---|---|---|
| `--dur-fast` | 150ms | 버튼, 링크, 태그 색 전환 |
| `--dur-base` | 240ms | 카드 hover, GNB glass 전환 |
| `--dur-slow` | 600ms | 섹션 등장, 모바일 메뉴 시트 |
| `--ease-out` | `cubic-bezier(.2,.7,.2,1)` | 등장, 확대 (기본) |
| `--ease-in-out` | `cubic-bezier(.65,0,.35,1)` | 시트 열고 닫기, 탭 전환 |

### 5-2. 커서 반응 히어로 (Cursor Aura)
두 개의 빛: Active Blue(커서를 빠르게 따라옴) + Sky Blue(느리게 뒤따름).

```css
.hero {
  --aura-size: clamp(320px, 40vw, 640px);
  --mx: 62%; --my: 46%; --lx: 62%; --ly: 46%;
  background:
    radial-gradient(var(--aura-size) circle at var(--mx) var(--my),
      rgb(0 170 210 / .26), transparent 62%),
    radial-gradient(calc(var(--aura-size) * 1.25) circle at var(--lx) var(--ly),
      rgb(170 202 230 / .45), transparent 66%),
    var(--surface-page);
}
```
```js
// pointermove → 목표 좌표 저장, rAF 루프에서 보간
// mx/my = lerp(prev, target, 0.35)  (즉각 반응)
// lx/ly = lerp(prev, target, 0.06)  (잔상처럼 뒤따름)
// hero.style.setProperty('--mx', x + '%')
```
| 파라미터 | 값 | 메모 |
|---|---|---|
| 빛 크기 | `clamp(320px, 40vw, 640px)` | 화면 폭에 비례 |
| 투명도 | .26 / .45 | 본문 대비를 해치지 않는 상한 |
| 범위 | `.hero` 내부만 | 벗어나면 1.2초에 걸쳐 중앙(62%, 46%)으로 복귀 |
| 성능 | 프레임당 rAF 1회 | CSS 변수만 갱신, 레이아웃 재계산 없음. 히어로가 화면 밖이면 루프 정지 |

**기기별 대체 동작**
| 조건 | 동작 |
|---|---|
| `pointer: fine` | 마우스 좌표 추적 (기본) |
| `pointer: coarse` | 터치 위치로 이동 후 천천히 복귀. 터치 없으면 두 빛이 12초 주기로 느리게 떠다님 |
| 스크롤 | 히어로가 화면에서 사라지는 비율만큼 빛 투명도 → 0 |
| `prefers-reduced-motion: reduce` | 모든 움직임 정지, 고정 위치(62%, 46%)의 정적 그라데이션 |

### 5-3. 스크롤 연출 3단계
1. **히어로 축소 (Hero → Strength)**: 첫 화면 높이(100svh)를 스크롤하는 동안 `scale 1 → 0.94`, radius `0 → 8px`, Display 제목 → H1 크기. CSS `animation-timeline: view()` 사용, 미지원 브라우저는 정적 표시(`@supports`).
2. **섹션 등장 (전 섹션)**: 화면 하단 12%에 진입 시 `opacity 0→1`, `translateY 24px→0`, 600ms. 형제 요소 80ms 순차(최대 5개). IntersectionObserver로 1회만 실행. (기존 `portfolio-app.jsx`의 `.in` 클래스 로직 재사용 가능)
3. ~~유동 타이포 실시간 표시~~ (DS 섹션 삭제로 미사용): 타입 견본 옆에 `현재 화면 폭 1280px → Display 81px`처럼 실제 계산값 표시. `ResizeObserver`로 갱신.

---

## 6. IA & Sections

원페이지 + 메인 케이스 상세 1페이지. 배경은 섹션마다 교차해 스크롤 리듬을 만든다.

| # | 섹션 · 앵커 | 내용 | 레이아웃 (Desktop → Mobile) | 배경 |
|---|---|---|---|---|
| 01 | Hero `#top` | 오버라인 `UX & UI DESIGNER · GENERATIVE AI` → Display 헤드라인 → 소개 2문장 → CTA 1개(프로젝트 보기) → 역량 해시태그 8개. 커서 빛. **사진 없음** | 텍스트 9col, 우측 3col은 빛 여백 → 1열, 해시태그 줄바꿈, CTA 전체 폭 | page + aura |
| 02 | Strength `#strength` | UX 역량 3가지(예: 문제 정의 · 디자인 시스템 · AI 활용), 각 카드에 근거 프로젝트명 | 3열 → 1열 | sunken |
| 03 | Projects `#projects` | 여기말GO 메인 카드(상세로 이동) + DIDIT · News-TODO 보조 카드. 각 카드에 'AI가 맡은 일 / 사람이 확인한 일' 한 줄 | 메인 7+5, 보조 6+6 → 1열, 이미지 먼저 | page |
| 04 | Skills & Tools `#skills` | 디자인 · 퍼블리싱 · 생성형 AI · 협업·문서(Jira 등) 4그룹 + 자격·수상 칩 | 4열 → 2열 → 1열 | sunken |
| 05 | Journey `#journey` | 기존 로드맵 데이터 재사용, 2021 → NEXT(현대오토에버). Timeline Item 사용 | 가로 연도 축 → 세로 타임라인 | page |
| 06 | Contact `#contact` | 마무리 한 줄 + 이메일 · 전화 · GitHub 버튼 | 가운데 정렬, 버튼 세로 적층 | inverse |

### 6-1. 히어로 확정 카피 (초안)
- 오버라인: `UX & UI DESIGNER · GENERATIVE AI` (모바일: `UX & UI DESIGNER · GEN AI`)
- 헤드라인: **사람이 쉽게 쓰는 / AI 서비스를 / 화면으로 설계합니다** — 'AI 서비스'만 weight 800 + 그라데이션(blue-500 → `#2F6BB0` → `#008CB0`, 끝 색 대비 3.5:1로 큰 글자 기준 통과)
- 소개: 서비스 기획부터 UI 디자인, 퍼블리싱까지. 생성형 AI가 맡을 일과 사람이 확인할 일을 나누고, 그 경계를 화면으로 보여주는 디자이너 하지연입니다.
- CTA: `프로젝트 보기 →` (Primary, 52px)
- 해시태그: `#사용자중심설계` `#서비스기획` `#Figma프로토타이핑` `#디자인시스템` `#반응형UI` `#HTML_CSS_JS` `#생성형AI_실사용자`(AI 스타일로 강조) `#기록하는디자이너`

### 6-2. 메인 케이스 상세 — 여기말GO (`work/yeogimalgo.html`)
Desktop: 좌측 3col sticky 목차 + 우측 9col 본문. Mobile: 상단 접이식 목차.
기존 자료(화면 캡처 · 기존 포트폴리오 문구) 안에서만 구성한다. 별도 리서치 자료가 없어 Research 항목은 두지 않는다.
1. **Overview** — 기간(2026.07–09) · 3인 팀 · 기획·디자인·풀스택 · 대표 화면
2. **AI 작업 과정** — 기획 → 디자인 → 화면 설계 → 개발 → 검수 순서로, 단계마다 AI로 무엇을 만들고 내가 무엇을 판단했는지 타임라인으로 정리 (케이스의 핵심이라 Overview 바로 아래에 둔다)
3. **Problem** — 사용자의 문제(혼잡해도 일정을 못 바꿈) + 팀의 문제(3명 · 1개월 · 20개+ 화면)
4. **IA · Flow** — 홈 화면의 3단계(등록 → 혼잡 확인 → 대안 변경)와 '원래 일정 유지' 분기
5. **UI 결정** — 화면 3장 + 대안 찾기 화면의 설계 결정 4가지
6. **결과 · 회고** — 약 1개월 · 20개+ 화면 · 리뷰 후 반영, 배운 점

기존 자산: `assets/nothere-home.png`, `assets/nothere-alternative.png`, `assets/nothere-guidebook.png`

### 6-3. 보조 프로젝트 (상세 페이지 없음, 카드 내 아코디언)
3단 요약: 문제 → 내 역할 → AI 활용 포인트 + 원본 PDF 링크(`assets/docs/didit.pdf`, `assets/docs/newstodo.pdf`). 카드 안에 버튼이 있으므로 보조 카드는 `<a>`가 아닌 `<article>`로 만든다.
| 프로젝트 | 설명 | 기간 | 비고 |
|---|---|---|---|
| DIDIT | GitHub 연동 화상회의 · AI 회의록 협업 워크스페이스 (React, Zustand, OpenVidu/WebRTC, SSE) | 2026.01.05 – 02.09 | FE · 기여도 50% (6인 팀). 캡처가 없어 레이아웃 구조도로 대체 |
| News-TODO | 뉴스를 할 일로 바꾸는 'News to Action' AI 서비스 (FastAPI) | 2026.02.24 – 03.20 | 매경미디어 × Anthropic AI 해커톤, AI(RAG · 프롬프트) · 기여도 50% |

---

## 7. 개발 협업 규칙

1. 토큰은 `tokens/primitive.css` → `tokens/semantic.css` 2단. 컴포넌트는 semantic만 참조.
   - 파일 구조: `index.html` · `work/yeogimalgo.html` / `components.jsx`(GNB · Button · Tag · Contact 등 공통) · `portfolio-app.jsx`(메인) · `case-app.jsx`(상세) / `portfolio.css` / `portfolio-data.js`
   - 이미지: `assets/*.webp` + `.png` 대체. 프로젝트 PDF: `assets/docs/`
2. 클래스는 BEM (`.card__title--featured`). 상태는 `is-active`, `aria-*` 속성으로 표현.
3. 콘텐츠는 기존처럼 `portfolio-data.js`에 분리. 화면 코드에 문구 직접 작성 금지.
4. 점검 기준: 360 / 768 / 1280 / 1440 폭 확인, 키보드만으로 전 기능 사용, Lighthouse 접근성 95 이상.
5. 이미지는 `<picture>` + WebP, `loading="lazy"`(히어로 제외), 모든 이미지에 의미 있는 alt.
6. 접근성: 실제 `<button>` / `<a href>` 사용, 아이콘 버튼에 `aria-label`, 장식 SVG `aria-hidden="true"`, 포커스 링 항상 표시(`:focus-visible`).

---

## 8. 개발 전 확정할 항목

- [x] **강점 3가지 문구** — 근거로 문제 정의 · 컴포넌트로 정리해서 넘기기 · AI와 사람의 경계 설계 (초안, 검토 필요)
- [x] **DIDIT · News-TODO 역할** — 소스 PDF 기준 DIDIT FE 50% · News-TODO AI 50%
- [ ] **프로젝트 이미지** — News-TODO는 PDF에서 추출. DIDIT는 캡처 없음(구조도로 대체). 캡처 확보 시 교체
- [x] **AI 제안 주제** — 섹션 삭제 (직무와 직접 관련이 적다고 판단)
- [x] **연락처** — 이메일 · 전화 · GitHub 공개
- [ ] **배포 주소** — GitHub Pages 등
- [x] 히어로: 사진 없음, 이력서 버튼 없음, 해시태그 사용
