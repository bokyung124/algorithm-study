import type { QuizQuestion } from '../../types/quiz'

export const topologicalSortQuizzes: Record<string, QuizQuestion[]> = {
  'kahn-algorithm': [
    {
      id: 'kahn-q1',
      type: 'fill-blank',
      question: 'Kahn 알고리즘은 진입 차수가 ___인 정점부터 처리한다.',
      answer: '0',
      explanation: '진입 차수가 0인 정점은 선행 조건이 없으므로 먼저 처리할 수 있습니다.',
    },
    {
      id: 'kahn-q2',
      type: 'fill-blank',
      question: '위상 정렬이 가능하려면 그래프에 ___가 없어야 한다.',
      answer: '사이클',
      explanation: '사이클이 있으면 순서를 정할 수 없으므로 DAG(유향 비순환 그래프)에서만 가능합니다.',
    },
  ],
  'dfs-topological-sort': [
    {
      id: 'dfs-topo-q1',
      type: 'fill-blank',
      question: 'DFS 기반 위상 정렬은 DFS의 ___ 순서의 역순이다.',
      answer: '후위',
      explanation: 'DFS 완료 시점(후위 순서)의 역순이 위상 정렬 순서가 됩니다.',
    },
  ],
}
