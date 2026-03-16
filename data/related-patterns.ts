import { getCategoryById } from '@/data/categories'

export interface RelatedPattern {
  categoryId: string
  patternId: string
  reason: string
}

const relatedPatternsMap: Record<string, RelatedPattern[]> = {
  // 정렬
  'sorting/bubble-sort': [
    { categoryId: 'sorting', patternId: 'counting-sort', reason: '비교 기반 vs 비비교 기반 정렬 비교' },
  ],
  'sorting/merge-sort': [
    { categoryId: 'sorting', patternId: 'quick-sort', reason: '분할 정복 기반 O(n log n) 정렬' },
    { categoryId: 'dp', patternId: 'interval-dp', reason: '분할 정복 사고방식 공유' },
  ],
  'sorting/quick-sort': [
    { categoryId: 'sorting', patternId: 'merge-sort', reason: '분할 정복 기반 O(n log n) 정렬' },
  ],
  'sorting/counting-sort': [
    { categoryId: 'hash', patternId: 'counting', reason: '빈도 세기 기반 접근' },
  ],

  // 탐색
  'searching/linear-search': [
    { categoryId: 'searching', patternId: 'binary-search-basic', reason: '순차 vs 이진 탐색 비교' },
  ],
  'searching/binary-search-basic': [
    { categoryId: 'binary-search', patternId: 'lower-bound', reason: '이진 탐색의 변형' },
    { categoryId: 'binary-search', patternId: 'answer-binary-search', reason: '결정 문제로의 이진 탐색 확장' },
  ],
  'searching/parametric-search': [
    { categoryId: 'binary-search', patternId: 'answer-binary-search', reason: '답을 이진 탐색으로 찾는 동일 패턴' },
  ],

  // DP
  'dp/knapsack': [
    { categoryId: 'greedy', patternId: 'fractional-knapsack', reason: '0/1 배낭 vs 분할 가능 배낭 비교' },
    { categoryId: 'bitmask', patternId: 'bitmask-dp', reason: '상태 압축을 통한 DP 최적화' },
  ],
  'dp/lis': [
    { categoryId: 'binary-search', patternId: 'lower-bound', reason: 'O(n log n) LIS에서 lower bound 활용' },
  ],
  'dp/fibonacci-memoization': [
    { categoryId: 'dp', patternId: 'knapsack', reason: '메모이제이션/타뷸레이션의 실전 적용' },
  ],
  'dp/interval-dp': [
    { categoryId: 'sorting', patternId: 'merge-sort', reason: '분할 정복 사고방식 공유' },
  ],

  // 그래프
  'graph/dfs': [
    { categoryId: 'graph', patternId: 'bfs', reason: '그래프 탐색의 두 가지 기본 방법' },
    { categoryId: 'backtracking', patternId: 'n-queens', reason: 'DFS에 가지치기를 추가한 것이 백트래킹' },
    { categoryId: 'topological-sort', patternId: 'dfs-topological-sort', reason: 'DFS 후위 순서가 위상 정렬' },
    { categoryId: 'tree', patternId: 'binary-tree-traversal', reason: '트리 순회는 DFS의 특수한 경우' },
    { categoryId: 'graph', patternId: 'connected-components', reason: 'DFS로 연결 요소 탐색' },
  ],
  'graph/bfs': [
    { categoryId: 'graph', patternId: 'dfs', reason: '그래프 탐색의 두 가지 기본 방법' },
    { categoryId: 'shortest-path', patternId: 'dijkstra', reason: '가중치 없는 BFS → 가중치 있는 Dijkstra' },
    { categoryId: 'topological-sort', patternId: 'kahn-algorithm', reason: 'Kahn 알고리즘은 BFS 기반 위상 정렬' },
  ],
  'graph/connected-components': [
    { categoryId: 'graph', patternId: 'dfs', reason: 'DFS/BFS로 연결 요소 탐색' },
    { categoryId: 'union-find', patternId: 'basic-union-find', reason: 'Union-Find로도 연결 요소 판별 가능' },
  ],

  // 탐욕
  'greedy/activity-selection': [
    { categoryId: 'dp', patternId: 'interval-dp', reason: '구간 문제의 탐욕 vs DP 접근' },
    { categoryId: 'sorting', patternId: 'merge-sort', reason: '정렬 후 탐욕 적용' },
  ],
  'greedy/fractional-knapsack': [
    { categoryId: 'dp', patternId: 'knapsack', reason: '분할 가능 배낭(탐욕) vs 0/1 배낭(DP)' },
  ],
  'greedy/coin-change-greedy': [
    { categoryId: 'dp', patternId: 'knapsack', reason: '동전 교환: 탐욕이 안 되면 DP로' },
  ],

  // 스택/큐
  'stack-queue/stack-basic': [
    { categoryId: 'stack-queue', patternId: 'monotone-stack', reason: '스택의 심화 활용' },
    { categoryId: 'graph', patternId: 'dfs', reason: 'DFS는 스택 기반 탐색' },
  ],
  'stack-queue/queue-basic': [
    { categoryId: 'graph', patternId: 'bfs', reason: 'BFS는 큐 기반 탐색' },
  ],
  'stack-queue/monotone-stack': [
    { categoryId: 'stack-queue', patternId: 'stack-basic', reason: '스택 기본기 필요' },
    { categoryId: 'two-pointer', patternId: 'sliding-window', reason: '구간 최적값을 효율적으로 관리' },
  ],

  // 해시
  'hash/hash-map': [
    { categoryId: 'hash', patternId: 'counting', reason: '해시맵으로 빈도 카운팅' },
    { categoryId: 'two-pointer', patternId: 'two-pointer-basic', reason: '두 수의 합: 해시 vs 투 포인터' },
  ],
  'hash/hash-set': [
    { categoryId: 'hash', patternId: 'hash-map', reason: '집합 연산의 기본 자료구조' },
  ],
  'hash/counting': [
    { categoryId: 'sorting', patternId: 'counting-sort', reason: '빈도 세기 기반 접근' },
    { categoryId: 'hash', patternId: 'hash-map', reason: '카운팅은 해시맵의 대표 활용' },
  ],

  // 이진탐색
  'binary-search/lower-bound': [
    { categoryId: 'binary-search', patternId: 'upper-bound', reason: 'lower/upper bound는 쌍으로 활용' },
    { categoryId: 'searching', patternId: 'binary-search-basic', reason: '이진 탐색의 기본에서 확장' },
    { categoryId: 'dp', patternId: 'lis', reason: 'O(n log n) LIS에서 활용' },
  ],
  'binary-search/upper-bound': [
    { categoryId: 'binary-search', patternId: 'lower-bound', reason: 'lower/upper bound는 쌍으로 활용' },
  ],
  'binary-search/answer-binary-search': [
    { categoryId: 'searching', patternId: 'parametric-search', reason: '결정 문제로의 이진 탐색 확장' },
    { categoryId: 'binary-search', patternId: 'lower-bound', reason: '이진 탐색의 변형' },
  ],

  // 트리
  'tree/binary-tree-traversal': [
    { categoryId: 'graph', patternId: 'dfs', reason: '트리 순회는 DFS의 특수한 경우' },
    { categoryId: 'tree', patternId: 'bst', reason: '중위 순회가 BST에서 정렬 순서' },
  ],
  'tree/bst': [
    { categoryId: 'binary-search', patternId: 'lower-bound', reason: 'BST 탐색은 이진 탐색과 동일 원리' },
    { categoryId: 'tree', patternId: 'binary-tree-traversal', reason: '순회 기반으로 BST 연산' },
  ],
  'tree/tree-dp': [
    { categoryId: 'dp', patternId: 'fibonacci-memoization', reason: 'DP를 트리 구조에 적용' },
    { categoryId: 'graph', patternId: 'dfs', reason: 'DFS로 트리를 순회하며 DP' },
  ],

  // 문자열
  'string/kmp': [
    { categoryId: 'string', patternId: 'rabin-karp', reason: '문자열 패턴 매칭의 두 가지 접근' },
  ],
  'string/rabin-karp': [
    { categoryId: 'string', patternId: 'kmp', reason: '문자열 패턴 매칭의 두 가지 접근' },
    { categoryId: 'hash', patternId: 'hash-map', reason: '해싱 기반 패턴 매칭' },
  ],
  'string/trie': [
    { categoryId: 'tree', patternId: 'bst', reason: '트라이는 트리 기반 자료구조' },
    { categoryId: 'string', patternId: 'kmp', reason: '문자열 검색의 다른 접근' },
  ],

  // 수학
  'math/prime-sieve': [
    { categoryId: 'math', patternId: 'gcd-lcm', reason: '소수와 최대공약수는 정수론의 기본' },
  ],
  'math/gcd-lcm': [
    { categoryId: 'math', patternId: 'prime-sieve', reason: '소수와 최대공약수는 정수론의 기본' },
    { categoryId: 'math', patternId: 'modular-arithmetic', reason: '정수론 기초 연산' },
  ],
  'math/modular-arithmetic': [
    { categoryId: 'math', patternId: 'gcd-lcm', reason: '정수론 기초 연산' },
    { categoryId: 'dp', patternId: 'knapsack', reason: 'DP에서 모듈러 연산 자주 사용' },
  ],

  // 비트마스크
  'bitmask/bit-operations': [
    { categoryId: 'bitmask', patternId: 'subset-enumeration', reason: '비트 연산으로 부분집합 표현' },
  ],
  'bitmask/subset-enumeration': [
    { categoryId: 'backtracking', patternId: 'permutation-combination', reason: '부분집합 열거의 두 가지 방법' },
    { categoryId: 'bitmask', patternId: 'bitmask-dp', reason: '부분집합을 상태로 활용하는 DP' },
  ],
  'bitmask/bitmask-dp': [
    { categoryId: 'dp', patternId: 'knapsack', reason: '상태 압축을 통한 DP 최적화' },
    { categoryId: 'bitmask', patternId: 'subset-enumeration', reason: '부분집합 열거가 기초' },
  ],

  // 세그먼트 트리
  'segment-tree/basic-segment-tree': [
    { categoryId: 'segment-tree', patternId: 'lazy-propagation', reason: '기본 세그먼트 트리의 확장' },
    { categoryId: 'tree', patternId: 'binary-tree-traversal', reason: '이진 트리 구조 기반' },
  ],
  'segment-tree/lazy-propagation': [
    { categoryId: 'segment-tree', patternId: 'basic-segment-tree', reason: '기본 세그먼트 트리에 지연 갱신 추가' },
  ],

  // 유니온파인드
  'union-find/basic-union-find': [
    { categoryId: 'graph', patternId: 'connected-components', reason: '연결 요소 판별의 다른 방법' },
    { categoryId: 'union-find', patternId: 'weighted-union-find', reason: '기본 Union-Find의 확장' },
  ],
  'union-find/weighted-union-find': [
    { categoryId: 'union-find', patternId: 'basic-union-find', reason: '기본 Union-Find에 가중치 추가' },
  ],

  // 투 포인터
  'two-pointer/two-pointer-basic': [
    { categoryId: 'two-pointer', patternId: 'sliding-window', reason: '투 포인터의 변형' },
    { categoryId: 'hash', patternId: 'hash-map', reason: '두 수의 합: 투 포인터 vs 해시' },
    { categoryId: 'sorting', patternId: 'merge-sort', reason: '정렬 후 투 포인터 적용' },
  ],
  'two-pointer/sliding-window': [
    { categoryId: 'two-pointer', patternId: 'two-pointer-basic', reason: '투 포인터의 변형' },
    { categoryId: 'stack-queue', patternId: 'monotone-stack', reason: '구간 최적값 관리' },
  ],
  'two-pointer/meet-in-the-middle': [
    { categoryId: 'bitmask', patternId: 'subset-enumeration', reason: '반씩 나누어 부분집합 열거' },
  ],

  // 백트래킹
  'backtracking/n-queens': [
    { categoryId: 'graph', patternId: 'dfs', reason: 'DFS에 가지치기를 추가한 것이 백트래킹' },
    { categoryId: 'backtracking', patternId: 'permutation-combination', reason: '백트래킹의 대표 유형들' },
  ],
  'backtracking/permutation-combination': [
    { categoryId: 'bitmask', patternId: 'subset-enumeration', reason: '순열/조합 열거의 다른 방법' },
    { categoryId: 'backtracking', patternId: 'n-queens', reason: '백트래킹의 대표 유형들' },
  ],
  'backtracking/sudoku': [
    { categoryId: 'backtracking', patternId: 'n-queens', reason: '제약 충족 문제의 백트래킹' },
    { categoryId: 'bitmask', patternId: 'bit-operations', reason: '비트마스크로 후보 관리 최적화' },
  ],

  // 최단경로
  'shortest-path/dijkstra': [
    { categoryId: 'graph', patternId: 'bfs', reason: '가중치 없는 BFS → 가중치 있는 Dijkstra' },
    { categoryId: 'shortest-path', patternId: 'bellman-ford', reason: '양수 가중치 Dijkstra vs 음수 허용 Bellman-Ford' },
  ],
  'shortest-path/bellman-ford': [
    { categoryId: 'shortest-path', patternId: 'dijkstra', reason: '양수 가중치 Dijkstra vs 음수 허용 Bellman-Ford' },
    { categoryId: 'shortest-path', patternId: 'floyd-warshall', reason: '단일 출발 vs 모든 쌍 최단경로' },
  ],
  'shortest-path/floyd-warshall': [
    { categoryId: 'shortest-path', patternId: 'bellman-ford', reason: '단일 출발 vs 모든 쌍 최단경로' },
    { categoryId: 'dp', patternId: 'knapsack', reason: 'Floyd-Warshall은 DP 기반 알고리즘' },
  ],

  // 위상정렬
  'topological-sort/kahn-algorithm': [
    { categoryId: 'graph', patternId: 'bfs', reason: 'Kahn 알고리즘은 BFS 기반 위상 정렬' },
    { categoryId: 'topological-sort', patternId: 'dfs-topological-sort', reason: '위상 정렬의 두 가지 구현' },
  ],
  'topological-sort/dfs-topological-sort': [
    { categoryId: 'graph', patternId: 'dfs', reason: 'DFS 후위 순서가 위상 정렬' },
    { categoryId: 'topological-sort', patternId: 'kahn-algorithm', reason: '위상 정렬의 두 가지 구현' },
  ],

  // 구현
  'implementation/simulation': [
    { categoryId: 'implementation', patternId: 'matrix-rotation', reason: '구현 문제의 대표 유형들' },
  ],
  'implementation/string-parsing': [
    { categoryId: 'stack-queue', patternId: 'stack-basic', reason: '괄호 파싱에 스택 활용' },
    { categoryId: 'string', patternId: 'kmp', reason: '문자열 처리의 다른 접근' },
  ],
  'implementation/matrix-rotation': [
    { categoryId: 'implementation', patternId: 'simulation', reason: '구현 문제의 대표 유형들' },
  ],
}

export function getRelatedPatterns(categoryId: string, patternId: string): RelatedPattern[] {
  return relatedPatternsMap[`${categoryId}/${patternId}`] ?? []
}

export function getRelatedPatternInfo(related: RelatedPattern) {
  const category = getCategoryById(related.categoryId)
  const pattern = category?.patterns.find((p) => p.id === related.patternId)
  if (!category || !pattern) return null
  return { category, pattern }
}
