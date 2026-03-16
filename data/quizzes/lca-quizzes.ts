import type { QuizQuestion } from '../../types/quiz'

export const lcaQuizzes: Record<string, QuizQuestion[]> = {
  'naive-lca': [
    {
      id: 'naive-lca-q1',
      type: 'complexity-match',
      question: 'Naive LCA에서 쿼리 하나를 처리하는 시간복잡도는?',
      options: ['O(1)', 'O(log N)', 'O(N)', 'O(N log N)'],
      answer: 'O(N)',
      explanation: '최악의 경우 트리가 일직선(편향 트리)이면 루트까지 N번 올라가야 하므로 O(N)입니다.',
    },
    {
      id: 'naive-lca-q2',
      type: 'fill-blank',
      question: 'Naive LCA에서 두 노드의 LCA를 찾기 전에 먼저 두 노드의 ___를 동일하게 맞춰야 한다.',
      answer: '깊이',
      explanation: '깊이가 다른 상태에서 동시에 올라가면 서로 다른 높이에서 비교하게 되어 정확한 LCA를 찾을 수 없습니다.',
    },
    {
      id: 'naive-lca-q3',
      type: 'output-prediction',
      question: '트리가 1-2, 1-3, 2-4, 2-5, 3-6 (루트=1)일 때, 노드 4와 6의 LCA는?',
      options: ['1', '2', '3', '4'],
      answer: '1',
      explanation: '노드 4의 경로: 4→2→1, 노드 6의 경로: 6→3→1. 처음 만나는 공통 조상은 1입니다.',
    },
  ],
  'sparse-table-lca': [
    {
      id: 'sparse-lca-q1',
      type: 'complexity-match',
      question: '희소 테이블 LCA의 전처리 시간복잡도는?',
      options: ['O(N)', 'O(N log N)', 'O(N²)', 'O(N² log N)'],
      answer: 'O(N log N)',
      explanation: 'N개 노드에 대해 log N 단계의 조상을 계산하므로 O(N log N)입니다.',
    },
    {
      id: 'sparse-lca-q2',
      type: 'fill-blank',
      question: 'Binary Lifting에서 parent[k][v]는 노드 v의 ___번째 조상을 의미한다.',
      answer: '2^k',
      explanation: 'parent[k][v] = parent[k-1][parent[k-1][v]]로, 2^(k-1)번째 조상의 2^(k-1)번째 조상 = 2^k번째 조상입니다.',
    },
    {
      id: 'sparse-lca-q3',
      type: 'output-prediction',
      question: 'N=100,000일 때, 희소 테이블의 LOG 값(최대 점프 횟수)은 약 얼마인가?',
      options: ['10', '13', '17', '20'],
      answer: '17',
      explanation: 'log2(100,000) ≈ 16.6이므로 LOG = 17이면 충분합니다.',
    },
  ],
}
