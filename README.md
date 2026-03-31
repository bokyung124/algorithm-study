# Algorithm Study

코딩 테스트 대비를 위한 알고리즘 & SQL 학습 플랫폼입니다. 41개 카테고리(알고리즘 31 + SQL 10)에 대한 개념 설명, 단계별 시각화, 퀴즈, AI 채팅 기능을 제공합니다.

## 주요 기능

- **알고리즘 학습**: 31개 카테고리, 각 패턴별 개념 설명 / Python 코드 예시 / 시간·공간 복잡도
- **SQL 학습**: 10개 카테고리 (SELECT, JOIN, 집계, 서브쿼리, 윈도우 함수, CTE, 문자열, 날짜, 조건, 집합 연산)
- **단계별 시각화**: 배열, 그래프, 트리, 스택, DP 테이블, 격자 등 85개 시각화
- **퀴즈**: 30개 카테고리별 이해도 확인 퀴즈
- **AI 채팅**: Google Gemini 기반 AI 튜터 (한국어 응답, Python 코드 예시, 스트리밍 지원)
- **학습 기록 & 복습**: 학습 이력 저장 및 간격 반복(Spaced Repetition) 기반 복습 일정 관리
- **메모**: 패턴별 개인 메모 작성 및 모아보기
- **복잡도 참고**: 알고리즘별 시간/공간 복잡도 및 핵심 팁 정리
- **관련 패턴**: 패턴 간 연관 관계 탐색

## 기술 스택

| 분류 | 기술 |
|------|------|
| Framework | Next.js 16, React 19 |
| Language | TypeScript |
| Styling | Tailwind CSS 4 |
| Auth & DB | Supabase (SSR + Client) |
| AI | Google Gemini API (스트리밍) |
| 코드 하이라이팅 | react-syntax-highlighter (PrismLight, Python) |
| 마크다운 | react-markdown |

## 알고리즘 카테고리 (31개)

| | | |
|---|---|---|
| 정렬 (Sorting) | 탐색 (Searching) | 동적 계획법 (DP) |
| 그래프 (Graph) | 탐욕법 (Greedy) | 구현 (Implementation) |
| 스택 & 큐 (Stack & Queue) | 해시 (Hash) | 이진 탐색 (Binary Search) |
| 트리 (Tree) | 문자열 (String) | 수학 (Math) |
| 비트마스크 (Bitmask) | 세그먼트 트리 | 유니온 파인드 (Union-Find) |
| 투 포인터 (Two Pointer) | 백트래킹 (Backtracking) | 최단 경로 (Shortest Path) |
| 위상 정렬 (Topological Sort) | 트라이 (Trie) | 최소 신장 트리 (MST) |
| 힙 (Heap) | 누적 합 (Prefix Sum) | 분할 정복 (Divide & Conquer) |
| 시뮬레이션 (Simulation) | 완전 탐색 (Brute Force) | 좌표 압축 |
| LCA | 네트워크 플로우 | 기하학 (Geometry) |
| 스위핑 (Sweeping) | | |

## SQL 카테고리 (10개)

| | | |
|---|---|---|
| SELECT & WHERE | JOIN | 집계 함수 (Aggregate) |
| 서브쿼리 (Subquery) | 윈도우 함수 (Window) | CTE |
| 문자열 함수 (String) | 날짜 함수 (DateTime) | 조건식 (Conditional) |
| 집합 연산 (Set Operations) | | |

## 페이지 구성

| 페이지 | 경로 | 설명 |
|--------|------|------|
| 대시보드 | `/` | 카테고리 브라우저 (알고리즘/SQL 탭), 오늘의 복습 요약 |
| 카테고리 | `/category/[id]` | 패턴 목록, 복잡도 뱃지 |
| 패턴 상세 | `/category/[catId]/[patternId]` | 코드 예시, 시각화, 퀴즈, 메모, AI 채팅 |
| 복습 | `/review` | 간격 반복 기반 오늘의 복습 목록 |
| 메모 | `/memos` | 패턴별 메모 모아보기 |
| 참고 | `/reference` | 시간복잡도 표, 입력 크기 가이드라인, 코딩 팁 |

## 시작하기

### 환경 변수 설정

프로젝트 루트에 `.env.local` 파일을 생성하고 아래 값을 입력합니다.

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
GEMINI_API_KEY=your_gemini_api_key
```

### 설치 및 실행

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build
npm start
```

개발 서버는 기본적으로 `http://localhost:3000`에서 실행됩니다.

## 프로젝트 구조

```
algorithm-study/
├── app/                      # Next.js App Router
│   ├── (auth)/               # 로그인, 회원가입 (공개)
│   ├── (protected)/          # 학습 페이지 (인증 필요)
│   │   ├── category/         # 카테고리 & 패턴 상세
│   │   ├── review/           # 복습 페이지
│   │   ├── memos/            # 메모 모아보기
│   │   └── reference/        # 복잡도 참고
│   ├── api/chat/             # Gemini AI 채팅 API
│   └── layout.tsx            # 루트 레이아웃
├── components/               # React 컴포넌트
│   ├── algorithm/            # 코드 블록, 복잡도 뱃지, 관련 패턴
│   ├── visualization/        # 단계별 시각화 (배열, 그래프, 트리 등)
│   ├── quiz/                 # 퀴즈
│   ├── chat/                 # AI 채팅 패널
│   ├── memo/                 # 메모 에디터
│   ├── layout/               # 앱 셸, 헤더, 사이드바
│   └── auth/                 # 로그인/회원가입 폼
├── data/                     # 정적 데이터
│   ├── algorithms/           # 31개 알고리즘 카테고리 데이터
│   ├── sql/                  # 10개 SQL 카테고리 데이터
│   ├── visualizations/       # 85개 시각화 데이터
│   └── quizzes/              # 30개 퀴즈 데이터
├── types/                    # TypeScript 타입 정의
├── contexts/                 # AuthContext (인증 상태 관리)
├── hooks/                    # useStudyRecords (간격 반복 훅)
├── lib/
│   ├── supabase/             # Supabase 클라이언트 (서버/클라이언트)
│   └── spaced-repetition.ts  # 간격 반복 알고리즘
└── middleware.ts              # 인증 미들웨어
```

## 보안

- API 라우트 인증 (Supabase 서버사이드 검증)
- 미들웨어 + 레이아웃 이중 인증 (Defense in Depth)
- 보안 헤더 (X-Frame-Options, X-Content-Type-Options, Referrer-Policy, Permissions-Policy)
