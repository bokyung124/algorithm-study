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
}
