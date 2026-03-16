import type { QuizQuestion } from '../../types/quiz'

export const graphQuizzes: Record<string, QuizQuestion[]> = {
  'dfs': [
    {
      id: 'dfs-q1',
      type: 'complexity-match',
      question: 'DFS의 시간복잡도는? (V=정점, E=간선)',
      options: ['O(V)', 'O(E)', 'O(V + E)', 'O(VE)'],
      answer: 'O(V + E)',
      explanation: '모든 정점과 간선을 한 번씩 방문하므로 O(V + E)입니다.',
    },
    {
      id: 'dfs-q2',
      type: 'fill-blank',
      question: 'DFS는 ___를 사용하여 구현하며, 재귀 호출도 같은 원리이다.',
      answer: '스택',
      explanation: 'DFS는 스택(또는 재귀 콜스택)을 사용하여 깊이 우선으로 탐색합니다.',
    },
    {
      id: 'dfs-q3',
      type: 'output-prediction',
      question: '그래프 {1:[2,3], 2:[4], 3:[4], 4:[]}에서 1부터 DFS 시 방문 순서는? (작은 번호 우선)',
      options: ['1→2→4→3', '1→2→3→4', '1→3→4→2', '1→3→2→4'],
      answer: '1→2→4→3',
      explanation: '1에서 작은 번호 2를 먼저 방문, 2에서 4 방문, 돌아와서 3 방문합니다.',
    },
  ],
  'bfs': [
    {
      id: 'bfs-q1',
      type: 'complexity-match',
      question: 'BFS의 시간복잡도는? (V=정점, E=간선)',
      options: ['O(V)', 'O(E)', 'O(V + E)', 'O(V²)'],
      answer: 'O(V + E)',
      explanation: '모든 정점과 간선을 한 번씩 방문하므로 O(V + E)입니다.',
    },
    {
      id: 'bfs-q2',
      type: 'fill-blank',
      question: 'BFS는 ___를 사용하여 구현하며, 가중치 없는 그래프의 ___를 구할 수 있다.',
      answer: '큐, 최단거리',
      explanation: 'BFS는 큐를 사용하며, 모든 간선의 가중치가 같을 때 최단거리를 보장합니다.',
    },
  ],
  'connected-components': [
    {
      id: 'cc-q1',
      type: 'output-prediction',
      question: '정점 {1,2,3,4,5}, 간선 {(1,2),(2,3),(4,5)}인 그래프의 연결 요소 수는?',
      options: ['1', '2', '3', '4'],
      answer: '2',
      explanation: '{1,2,3}과 {4,5} 두 개의 연결 요소가 있습니다.',
    },
  ],
  'scc': [
    {
      id: 'scc-q1',
      type: 'complexity-match',
      question: 'Tarjan SCC 알고리즘의 시간복잡도는? (V=정점, E=간선)',
      options: ['O(V)', 'O(V + E)', 'O(V * E)', 'O(V²)'],
      answer: 'O(V + E)',
      explanation: 'DFS를 한 번 수행하므로 모든 정점과 간선을 한 번씩 방문하여 O(V + E)입니다.',
    },
    {
      id: 'scc-q2',
      type: 'fill-blank',
      question: 'Tarjan 알고리즘에서 low[u] == ___[u]이면 u는 SCC의 루트이다.',
      answer: 'dfn',
      explanation: 'dfn은 DFS 방문 순서이고, low는 도달 가능한 최소 순서입니다. 둘이 같으면 u 위로는 올라갈 수 없으므로 SCC의 루트입니다.',
    },
    {
      id: 'scc-q3',
      type: 'output-prediction',
      question: '방향 그래프 1→2, 2→3, 3→1, 3→4, 4→5, 5→4에서 SCC의 개수는?',
      options: ['1', '2', '3', '5'],
      answer: '2',
      explanation: '{1,2,3}이 서로 도달 가능하여 하나의 SCC, {4,5}가 서로 도달 가능하여 하나의 SCC로 총 2개입니다.',
    },
  ],
  'bipartite-graph': [
    {
      id: 'bip-q1',
      type: 'complexity-match',
      question: '이분 그래프 판별의 시간복잡도는? (V=정점, E=간선)',
      options: ['O(V)', 'O(V + E)', 'O(V²)', 'O(V * E)'],
      answer: 'O(V + E)',
      explanation: 'BFS/DFS로 모든 정점과 간선을 한 번씩 방문하므로 O(V + E)입니다.',
    },
    {
      id: 'bip-q2',
      type: 'fill-blank',
      question: '그래프에 ___ 길이 사이클이 존재하면 이분 그래프가 아니다.',
      answer: '홀수',
      explanation: '홀수 길이 사이클이 있으면 인접한 정점에 번갈아 색을 칠할 수 없어 이분 그래프가 불가능합니다.',
    },
    {
      id: 'bip-q3',
      type: 'output-prediction',
      question: '정점 {1,2,3}, 간선 {(1,2),(2,3),(1,3)}인 그래프는 이분 그래프인가?',
      options: ['YES', 'NO'],
      answer: 'NO',
      explanation: '길이 3의 사이클(홀수)이 존재하므로 이분 그래프가 아닙니다. 1→2→3→1에서 모든 정점이 서로 인접합니다.',
    },
  ],
}
