import type { QuizQuestion } from '../../types/quiz'

export const unionFindQuizzes: Record<string, QuizQuestion[]> = {
  'basic-union-find': [
    {
      id: 'uf-q1',
      type: 'fill-blank',
      question: 'Union-Find에서 find 연산의 최적화 기법인 ___는 루트까지의 경로를 압축한다.',
      answer: '경로 압축',
      explanation: 'Path compression은 find 시 모든 노드를 직접 루트에 연결하여 이후 탐색을 O(1)에 가깝게 만듭니다.',
    },
    {
      id: 'uf-q2',
      type: 'complexity-match',
      question: '경로 압축 + 랭크 기반 합치기를 적용한 Union-Find의 연산 시간복잡도는?',
      options: ['O(1)', 'O(log n)', 'O(α(n))', 'O(n)'],
      answer: 'O(α(n))',
      explanation: 'α(n)은 역 아커만 함수로, 사실상 상수 시간에 가깝습니다.',
    },
  ],
}
