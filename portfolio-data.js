/* 화면에 나오는 문구는 모두 이 파일에서 관리한다 (DESIGN_GUIDE.md §7-3). */
window.PF_DATA = {
  name: "하지연",
  nameEn: "HA JIYEON",

  nav: [
    { id: "projects", label: "Projects" },
    { id: "skills", label: "Skills" },
    { id: "journey", label: "Journey" },
    { id: "contact", label: "Contact" }
  ],

  hero: {
    overline: "UX & UI DESIGNER · GENERATIVE AI",
    overlineShort: "UX & UI DESIGNER · GEN AI",
    headline: ["사람이 쉽게 쓰는", "AI 서비스를", "화면으로 설계합니다"],
    accent: "AI 서비스",
    body: "서비스 기획부터 UI 디자인, 퍼블리싱까지. 생성형 AI가 맡을 일과 사람이 확인할 일을 나누고, 그 경계를 화면으로 보여주는 디자이너 하지연입니다.",
    cta: { label: "프로젝트 보기", href: "#projects" },
    scrollHint: "아래로 스크롤",
    tags: [
      { t: "#사용자중심설계" },
      { t: "#서비스기획" },
      { t: "#Figma프로토타이핑" },
      { t: "#디자인시스템" },
      { t: "#반응형UI" },
      { t: "#HTML_CSS_JS" },
      { t: "#생성형AI_실사용자", ai: true },
      { t: "#기록하는디자이너" }
    ]
  },

  strength: {
    no: "02",
    label: "STRENGTH",
    title: "화면보다 먼저 이유를 설계합니다",
    lead: "UX & UI 디자이너로서 보여드릴 수 있는 세 가지 역량입니다. 모두 실제 프로젝트에서 한 일을 근거로 들었습니다.",
    items: [
      {
        no: "01",
        en: "PROBLEM FIRST",
        title: "근거로 문제를 정의합니다",
        body: "보기 좋은 화면보다 '왜 이 화면이 필요한가'를 먼저 정리합니다. 여기말GO에서는 와이어프레임 전에 기획 근거부터 세워 화면 흐름을 잡았고, ROMO에서는 설문으로 정산이 불편하다는 응답이 약 80%임을 확인한 뒤 경쟁 서비스가 채우지 못한 부분을 서비스 방향에 반영했습니다.",
        proof: ["여기말GO", "ROMO 사용자 설문", "Remote Internship 가설 재검토"]
      },
      {
        no: "02",
        en: "SYSTEM & HANDOFF",
        title: "기준을 잡아 통합시킵니다",
        body: "반복되는 UI는 규칙으로 묶어야 팀이 빨라진다고 생각합니다. DIDIT에서는 여러 화면에서 반복되던 모달·버튼·입력창을 서비스 컨셉에 맞춘 공통 컴포넌트 11종으로 통일했고, 백엔드 없이도 화면을 확인할 수 있는 Mock 모드를 두었습니다. 이 포트폴리오도 토큰 → 컴포넌트 → 가이드 문서 순서로 만들었습니다.",
        proof: ["DIDIT 공통 컴포넌트 11종", "이 포트폴리오의 디자인 시스템"]
      },
      {
        no: "03",
        en: "AI × HUMAN",
        title: "AI가 맡을 일과 사람이 확인할 일을 나눕니다",
        body: "생성형 AI를 기획·디자인·개발 전 과정에서 써 보며, AI가 빠르게 만드는 일과 사람이 판단해야 하는 일은 다르다는 것을 배웠습니다. 여기말GO는 AI가 만든 코드도 PR마다 리뷰를 거쳤고, ROMO는 영수증 인식 신뢰도가 낮으면 사용자에게 다시 확인을 요청하도록 설계했습니다.",
        proof: ["여기말GO PR 리뷰", "ROMO 재확인 단계", "News-TODO 출처 분리"]
      }
    ]
  },

  projects: {
    no: "03",
    label: "PROJECTS",
    title: "AI를 활용한 화면 디자인 및 개발",
    lead: "프로젝트에서 AI를 어떻게 활용했는지에 대해 정리했습니다.",
    aiLabel: "AI가 맡은 일",
    humanLabel: "사람이 확인한 일",
    featured: {
      id: "yeogimalgo",
      tags: [{ t: "메인 케이스", kind: "status" }, { t: "생성형 AI", kind: "ai" }, { t: "2026 관광데이터 활용 공모전", kind: "role" }],
      name: "여기말GO",
      sub: "혼잡한 관광지를 비슷한 경험의 가까운 대안으로 바꿔 주는 여행 일정 수정 서비스",
      meta: ["2026.07 – 09", "3인 팀", "기획 · 디자인 · 풀스택 개발"],
      ai: "와이어프레임 생성 · 나머지 화면 확장 · React 화면 코드 구현",
      human: "서비스 컨셉과 디자인 가이드 · 화면 디자인 검토 · PR마다 코드 검수",
      href: "work/yeogimalgo.html",
      cta: "케이스 스터디 보기",
      shots: [
        { src: "assets/Container.svg", alt: "여기말GO 홈 화면. 새 일정 등록하기 버튼과 등록한 여행 일정 목록" },
        { src: "assets/Container-1.svg", alt: "여기말GO 일정 점검 결과 화면. 혼잡이 예상되는 장소 3곳을 표시하고 장소마다 대안 보기 또는 유지를 고르게 한다" }
      ]
    },
    others: [
      {
        id: "didit",
        tags: [{ t: "프론트엔드", kind: "role" }, { t: "AI 회의록", kind: "ai" }],
        name: "DIDIT",
        sub: "GitHub 이슈 · 음성 회의 · AI 회의 요약을 한곳에 모은 개발팀 협업 워크스페이스",
        meta: ["2026.01 – 02", "6인 팀", "FE"],
        visual: "didit",
        video: { src: "assets/didit-landing", poster: "assets/didit-landing", label: "DIDIT 랜딩 페이지를 위에서 아래로 스크롤하는 화면 녹화. 히어로, 기능 소개, 3단계 시작 방법, 팀별 활용, 시작하기 버튼 순서로 이어진다" },
        ai: "디자인 컨셉 기반 화면 구성 · 주요 기능 개발",
        human: "디자인 가이드 프롬프트 작성 · 화면 및 코드 수정",
        detail: [
          { h: "문제", p: "이슈, 채팅, 회의, 회의록이 서로 다른 도구에 흩어져 있어 무엇이 결정됐는지 매번 다시 찾아야 했습니다." },
          { h: "내 역할", p: "화면 구조와 공통 UI를 맡았습니다. 사이드바와 채팅 패널은 그대로 두고 가운데 화면만 바뀌도록 레이아웃을 나눴고, 여러 화면에서 반복되던 Button · Modal · Toast 등 11종을 공통 컴포넌트로 통일했습니다." },
          { h: "AI 활용 포인트", p: "회의가 끝나면 AI가 회의록을 요약해 할 일을 빨리 파악하게 했습니다. 요약은 초안으로 두고, 회의록을 수정 · 삭제 · PDF로 내보낼 수 있어 최종본은 팀이 정합니다." }
        ],
        doc: { label: "프로젝트 문서 (PDF)", href: "assets/docs/didit.pdf" }
      },
      {
        id: "newstodo",
        tags: [{ t: "AI 개발", kind: "role" }, { t: "RAG", kind: "ai" }, { t: "해커톤", kind: "award" }],
        name: "News-TODO",
        sub: "가게 정보를 바탕으로 뉴스를 골라 요약하고 해야 할 일을 추천하는 소상공인용 AI 서비스",
        meta: ["2026.02 – 03", "매경미디어 × Anthropic 해커톤", "AI"],
        image: { src: "assets/newstodo-detail", alt: "News-TODO 알림 상세 화면. 상황 요약, 추천 행동, 원문 기사 보기 버튼이 차례로 놓여 있다" },
        ai: "뉴스 분야 분류 · 상황 요약 · 추천 행동",
        human: "AI가 뽑은 원재료 목록 추가·삭제 · 원문 기사로 사실 확인",
        detail: [
          { h: "문제", p: "가게 운영으로 바쁜 소상공인은 원재료 가격·정책·트렌드 뉴스를 제때 확인하기 어렵습니다. 뉴스가 많아도 내 가게와 상관있는지 판단하는 데 시간이 듭니다." },
          { h: "내 역할", p: "AI 파트를 맡아 뉴스 검색(RAG)과 추천 문장을 만드는 프롬프트를 설계했습니다. 원재료 · 정책 · 트렌드를 따로 저장해 관련 없는 뉴스가 섞이지 않게 했습니다." },
          { h: "AI 활용 포인트", p: "중요도가 높은 원재료 뉴스는 5건, 그다음은 2건만 넘겨 AI가 덜 중요한 뉴스에 끌려가지 않게 했습니다. 서비스 화면에는 요약 아래에 원문 기사 링크가 함께 있어 사용자가 직접 확인할 수 있습니다." }
        ],
        doc: { label: "프로젝트 문서 (PDF)", href: "assets/docs/newstodo.pdf" }
      }
    ],
    detailToggle: "문제 · 역할 · AI 활용 보기",
    detailToggleClose: "접기"
  },

  skills: {
    no: "04",
    label: "SKILLS & TOOLS",
    title: "할 수 있는 일",
    lead: "디자인에서 끝나지 않고 구현과 협업까지 이어 갈 수 있습니다.",
    groups: [
      { title: "디자인", en: "DESIGN", items: ["Figma 화면 설계", "Figma Make 시안 제작", "와이어프레임 · 사용자 흐름", "디자인 토큰 · 컴포넌트 정리", "Photoshop (GTQ 1급)"] },
      { title: "퍼블리싱", en: "PUBLISHING", items: ["HTML · CSS · JavaScript", "React · Zustand", "TailwindCSS · Vite", "반응형 레이아웃 (clamp · grid)", "Figma ↔ 개발 환경 MCP 연결"] },
      { title: "생성형 AI", en: "GENERATIVE AI", ai: true, items: ["Claude · Claude Design", "ChatGPT · Gemini", "프롬프트 설계 (역할 · 출력 형식)", "RAG · LangChain", "OCR · STT 결과 검증 흐름"] },
      { title: "협업 · 문서", en: "COLLABORATION", items: ["Jira 일정 · 이슈 관리", "Notion 요구사항 · 회의록 · QA 리스트", "GitHub PR 리뷰 · CodeRabbit", "Slack", "발표 자료 기획 · 발표"] }
    ],
    certTitle: "자격 · 수상",
    certs: [
      { t: "SQLD", note: "2026.09" },
      { t: "OPIc IH", note: "2026.02" },
      { t: "TOEIC 880", note: "2025.03" },
      { t: "MOS PowerPoint", note: "2025.05" },
      { t: "GTQ 1급", note: "2024.09" },
      { t: "이 주의 베스트 멤버", note: "SSAFY", award: true },
      { t: "Good Rider 우수 활동자", note: "2023.11", award: true }
    ]
  },

  journey: {
    no: "05",
    label: "JOURNEY",
    title: "기록으로 이어 온 길",
    lead: "인문학에서 출발해 AI 서비스를 기획하고, 디자인하고, 구현하기까지의 과정입니다.",
    legend: [
      { k: "project", v: "프로젝트" },
      { k: "edu", v: "교육" },
      { k: "next", v: "NEXT" }
    ],
    years: [
      { y: "2021", items: [{ t: "edu", name: "경북대학교 입학", note: "영어영문학 · 디지털인문사회과학융합" }] },
      { y: "2022", items: [{ t: "edu", name: "삼성 드림클래스 멘토", note: "2022.05 – 2024.02 · 학생별 맞춤 자료 제작" }] },
      { y: "2023", items: [{ t: "project", name: "Remote Internship Program", note: "5인 팀장 · Excel 데이터 분석 · 우수 활동자" }] },
      { y: "2025", items: [{ t: "edu", name: "삼성 청년 SW·AI 아카데미", note: "2025.07 – 2026.06" }, { t: "project", name: "소크라테스 챗봇", note: "RAG 기반 대화형 AI · 2025.10 – 12" }] },
      { y: "2026", items: [{ t: "project", name: "DIDIT", note: "FE · 01 – 02" }, { t: "project", name: "News-TODO", note: "AI 해커톤 · 02 – 03" }, { t: "project", name: "ROMO", note: "PM · Jira · 04 – 05" }, { t: "project", name: "여기말GO", note: "기획 · 디자인 · 풀스택 · 07 – 09" }] },
      { y: "NEXT", next: true, items: [{ t: "next", name: "현대오토에버", note: "UX & UI Designer · 생성형 AI 서비스 운영" }] }
    ]
  },

  contact: {
    no: "06",
    label: "CONTACT",
    title: "함께 쓰기 쉬운 AI 서비스를 만들고 싶습니다",
    body: "포트폴리오에 담지 못한 과정과 고민을 직접 말씀드리겠습니다. 읽어 주셔서 감사합니다.",
    links: [
      { k: "EMAIL", v: "wldus021128@naver.com", href: "mailto:wldus021128@naver.com", primary: true },      { k: "GITHUB", v: "github.com/iamp00r", href: "https://github.com/iamp00r", external: true }
    ],
    footer: "© 2026 HA JIYEON · Designed & built with HTML · CSS · React"
  },

  ui: {
    menuOpen: "메뉴 열기",
    menuClose: "메뉴 닫기",
    skip: "본문으로 건너뛰기",
    backHome: "포트폴리오 홈",
    toc: "목차",
    next: "다음 프로젝트",
    toTop: "맨 위로 이동"
  },

  /* ---------------- 여기말GO 케이스 스터디 ---------------- */
  caseStudy: {
    overline: "CASE STUDY · 2026 관광데이터 활용 공모전",
    title: "여기말GO",
    sub: "이미 만든 여행 일정을 처음부터 다시 짜지 않도록, 혼잡한 장소만 비슷한 경험의 가까운 대안으로 바꿔 주는 서비스",
    facts: [
      { k: "기간", v: "2026.07 – 09" },
      { k: "팀", v: "3인" },
      { k: "역할", v: "기획 · 디자인 · 풀스택 개발" },
      { k: "도구", v: "Claude Code · Claude Design · Figma" }
    ],
    hero: { src: "../assets/Container.svg", alt: "여기말GO 홈 화면" },
    sections: [
      { id: "overview", label: "Overview" },
      { id: "process", label: "AI 작업 과정" },
      { id: "problem", label: "Problem" },
      { id: "flow", label: "IA · Flow" },
      { id: "ui", label: "UI 결정" },
      { id: "result", label: "결과 · 회고" }
    ],
    overview: {
      title: "일정 전체가 아니라 혼잡한 한 곳만 바꿉니다",
      body: "여기말GO는 등록한 일정에서 혼잡이 예상되는 장소를 한국관광콘텐츠랩 OpenAPI를 통해 예측하고, 비슷한 경험을 할 수 있는 가까운 장소를 대안으로 제시합니다. 사용자는 대안을 비교한 뒤 바꿀지, 원래대로 갈지를 직접 고를 수 있습니다."
    },
    problem: {
      title: "두 가지 문제가 동시에 있었습니다",
      items: [
        { k: "사용자의 문제", h: "혼잡해도 일정을 바꾸기 어렵다", p: "대체 장소를 찾으려면 거리, 분위기, 앞뒤 일정과의 동선을 모두 다시 따져야 합니다. 그래서 혼잡을 알면서도 원래 일정대로 가게 됩니다." },
        { k: "팀의 문제", h: "짧은 기간과 많은 기능", p: "한 달 안에 화면 디자인부터 MVP 개발, QA, 추가 기능 개발까지 해야 할 과제가 많아 3명이 하기에는 빠듯한 상황이었습니다." }
      ]
    },
    flow: {
      title: "사용자가 하는 일은 세 단계로 줄였습니다",
      lead: "홈 화면에 사용 방법을 세 단계로 그대로 적어, 처음 온 사용자도 무엇을 하면 되는지 바로 알 수 있게 했습니다.",
      steps: [
        { no: "01", h: "가려던 일정을 등록한다", p: "날짜 · 장소 · 동행 조건 입력" },
        { no: "02", h: "혼잡 예상 장소를 찾는다", p: "관광 데이터 API로 집중률 분석" },
        { no: "03", h: "가까운 대안으로 바꾼다", p: "3km 이내 비슷한 경험 추천 → 변경 또는 유지" }
      ],
      branch: "어느 단계에서든 '원래 일정 유지하기'로 빠져나갈 수 있습니다. 추천은 제안일 뿐이고, 결정은 사용자가 하도록 두었습니다."
    },
    ui: {
      title: "비교하고 고르기 쉽게 만든 화면 결정",
      lead: "대안 찾기 화면은 이 서비스의 핵심입니다. 화면 하나에서 '왜 이 장소인지'와 '바꾸면 무엇이 달라지는지'가 함께 보이도록 구성했습니다.",
      shots: [
        { src: "../assets/Container-2.svg", alt: "여행 조건 입력 화면", cap: "여행 조건 — 동행과 여행 스타일 고르기" },
        { src: "../assets/Container-1.svg", alt: "일정 점검 결과 화면", cap: "점검 결과 — 혼잡한 곳만 바꾸거나 유지" },
        { src: "../assets/Container-3.svg", alt: "가이드북 둘러보기 화면", cap: "가이드북 — 다른 사용자의 코스를 둘러보기" }
      ],
      decisions: [
        { h: "바꾸기 전에 비교할 기준 세 가지를 한 줄에", p: "예상 집중도 · 추가 이동 시간 · 앞뒤 일정과의 거리를 나란히 두어, 사용자가 지도를 따로 열지 않고도 비교할 수 있게 했습니다." },
        { h: "추천 이유를 문장과 태그로", p: "'기존 방문 목적과 유사해요'처럼 이유를 문장으로 쓰고, 유사도 · 거리 · 쾌적함을 태그로 붙였습니다. AI의 추천이 왜 나왔는지 보여야 믿고 고를 수 있습니다." },
        { h: "사용자와 연관 있는 곳만", p: "추천 개수를 3개로 고정하면 관련 없는 장소까지 채워 넣는 문제가 있었습니다. 그래서 '최대 3개'로 바꾸고, 관련도가 높은 곳이 없으면 억지로 결과를 채우지 않도록 했습니다." },
        { h: "'원래 일정 유지하기'를 항상 아래에", p: "대안을 비교하는 중에도 언제든 원래 일정으로 돌아갈 수 있도록, '원래 일정 유지하기' 버튼을 화면 아래에 항상 두었습니다." }
      ]
    },
    process: {
      title: "AI로 기획부터 화면 개발까지 한 달 만에",
      lead: "3명이 한 달 안에 기획 · 디자인 · 개발 · QA를 모두 끝내야 했습니다. 그래서 '빈 화면에서 시작하지 않는다'는 원칙을 세웠습니다. 단계마다 AI에게 초안을 먼저 받고, 저는 그 초안을 덜어 내고 · 고치고 · 확인하는 일에 시간을 썼습니다. 한 단계에서 확정한 결과물은 다음 단계 AI의 입력이 되어, 기획이 화면 설계로, 화면 설계가 코드로 끊기지 않고 이어졌습니다.",
      aiLabel: "AI가 맡은 일",
      humanLabel: "내가 판단한 일",
      outLabel: "결과물",
      steps: [
        {
          phase: "기획",
          tool: "Claude Design",
          h: "와이어프레임을 그리기 전에 기획을 말로 설명해 화면 흐름부터 확인했습니다",
          p: "누가 · 언제 · 무엇을 바꾸는 서비스인지 기획 내용과 디자인 컨셉을 Claude Design에 프롬프트로 설명하고, 디자인 가이드와 화면 구성 초안을 받았습니다. 초안을 보며 '이 화면이 꼭 필요한가'를 기준으로 화면을 덜어 냈고, 사용자가 하는 일을 '일정 등록 → 혼잡 장소 확인 → 대안으로 변경' 세 단계로 확정했습니다.",
          ai: "기획 설명을 바탕으로 화면 구성 · 흐름 초안 생성",
          human: "필요 없는 화면 덜어 내기 · 3단계 흐름 확정",
          out: "화면 흐름 · 와이어프레임"
        },
        {
          phase: "디자인",
          tool: "Figma Make",
          h: "AI를 활용해 빠르게 시안을 받았습니다",
          p: "Claude Design 초안은 흐름을 잡기에는 좋았지만 화면 구현에는 Figma가 더 맞다고 판단해 도구를 바꿨습니다. Figma Make로 대표 화면 시안을 빠르게 받아 비교 후 결정했습니다.",
          ai: "대표 화면 시안 빠르게 생성",
          human: "도구 전환 판단 · 컨셉 · 로고 · 톤 결정",
          out: "디자인 컨셉 · 로고 · 대표 화면"
        },
        {
          phase: "화면 설계",
          tool: "Figma Make",
          h: "확정한 대표 화면을 기준으로 나머지 20여 개 화면을 채웠습니다",
          p: "대표 화면에서 정한 컨셉을 기준 삼아, 와이어프레임으로만 있던 나머지 화면을 AI로 실제 화면으로 확장했습니다. 화면이 늘어날수록 톤이 흐트러지기 쉬워서, 화면마다 컨셉과 맞는지 직접 점검하고 어긋난 부분을 고쳤습니다.",
          ai: "와이어프레임을 실제 화면으로 확장",
          human: "화면별로 컨셉과 맞는지 점검 · 수정",
          out: "20개+ 화면 디자인"
        },
        {
          phase: "개발",
          tool: "Figma MCP · Claude Code",
          h: "디자인 파일을 MCP로 연결해 화면을 바로 코드로 옮겼습니다",
          p: "디자인을 개발자에게 넘기고 다시 맞추는 시간을 줄이려고 Figma와 개발 환경을 MCP로 연결했습니다. Claude Code가 Figma 디자인을 직접 읽어 React 화면을 구현하면, 저는 실행된 화면을 디자인과 나란히 놓고 대조하며 다른 부분을 찾아 수정했습니다. 디자인을 직접 만든 사람이 구현까지 확인하니 의도가 중간에 빠지지 않았습니다.",
          ai: "Figma 디자인을 읽어 React 화면 코드 구현",
          human: "구현된 화면을 디자인과 대조 · 문제 수정",
          out: "React 화면 구현"
        },
        {
          phase: "검수",
          tool: "GitHub · CodeRabbit",
          h: "빠르게 만든 코드일수록, 리뷰를 거친 뒤에만 합쳤습니다",
          p: "AI가 빠르게 코드를 만든 만큼 확인은 더 꼼꼼히 했습니다. PR마다 CodeRabbit이 자동 코드 리뷰를 남기고, 팀원 리뷰까지 거친 뒤에만 반영했습니다.",
          ai: "PR마다 자동 코드 리뷰",
          human: "팀원 리뷰를 거친 뒤에만 반영",
          out: "리뷰를 거친 MVP"
        }
      ]
    },
    result: {
      title: "결과",
      items: [
        { big: "약 1개월", small: "기획부터 MVP 개발, QA까지" },
        { big: "20개+", small: "직접 만든 화면 · 컨셉 · 로고를 구현까지 연결" },
        { big: "리뷰 후 반영", small: "AI가 만든 코드도 PR마다 팀원 · 자동 리뷰로 검수" }
      ],
      retroTitle: "회고",
      retro: [
        { h: "배운 점", p: "AI는 짧은 시간에 결과물을 만드는 데 강하지만, 방향을 정하고 결과를 검수하는 일은 사람이 해야 한다는 것을 배웠습니다." },
        { h: "다음에 한다면", p: "화면을 빨리 만들 수 있게 된 만큼, 남는 시간을 실제 사용자에게 대안 추천이 믿을 만한지 확인하는 테스트에 쓰겠습니다." }
      ]
    },
    nextProject: { label: "다른 프로젝트 보기", href: "../index.html#projects" }
  }
};
