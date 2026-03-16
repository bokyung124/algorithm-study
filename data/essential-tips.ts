export const essentialTips = [
  {
    title: 'Python 입출력 최적화',
    items: [
      'sys.stdin.readline()으로 입력 받기 — input()보다 훨씬 빠름',
      'sys.setrecursionlimit(10**6) — 재귀 깊이 제한 늘리기 (DFS 등)',
      'print() 대신 sys.stdout.write()로 출력 — 대량 출력 시 유리',
      '"\\n".join(results) 한 번에 출력하기 — 반복 print보다 빠름',
    ],
  },
  {
    title: 'Python 자료구조 시간복잡도',
    items: [
      'list: append O(1), pop(0) O(N) → 큐로 쓰려면 deque 사용',
      'dict: 조회/삽입/삭제 평균 O(1)',
      'set: in 연산 O(1), list의 in은 O(N)',
      'heapq: push/pop O(log N) — 최솟값 우선순위 큐',
      'collections.Counter: 빈도수 세기에 최적',
      'collections.defaultdict: KeyError 방지, 그래프 인접 리스트에 유용',
    ],
  },
  {
    title: '자주 쓰는 Python 내장 함수/모듈',
    items: [
      'sorted(key=lambda x: ...) — 커스텀 정렬',
      'itertools.permutations, combinations — 순열/조합',
      'bisect.bisect_left, bisect_right — 이진 탐색 위치 찾기',
      'math.gcd, math.lcm — 최대공약수, 최소공배수 (Python 3.9+)',
      'functools.lru_cache — 메모이제이션 데코레이터 (DP에 유용)',
    ],
  },
  {
    title: '문제 접근 전략',
    items: [
      '제한 조건(N의 범위)을 먼저 확인하고 허용 가능한 시간복잡도를 판단',
      '완전 탐색으로 풀 수 있는지 먼저 검토 → 안 되면 최적화',
      '예제를 손으로 직접 따라가며 패턴 파악',
      '엣지 케이스 확인: 빈 입력, 최솟값, 최댓값, 중복',
      '유형을 모르겠으면: 정렬 → 그리디 → DP → 그래프 순으로 접근',
    ],
  },
  {
    title: '디버깅 팁',
    items: [
      'Off-by-one 에러 주의: range(n)은 0~n-1, range(1, n+1)은 1~n',
      '정수 나눗셈: //는 음수에서 내림, int()는 0 방향 절삭',
      '깊은 복사: copy.deepcopy() 또는 리스트 슬라이싱 [:]',
      '무한루프 의심 시: while문의 종료 조건과 변수 갱신 확인',
      '재귀 시 방문 체크를 재귀 호출 전에 하기 (중복 호출 방지)',
    ],
  },
]
