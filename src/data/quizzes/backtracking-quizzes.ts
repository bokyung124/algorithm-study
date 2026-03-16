import type { QuizQuestion } from '../../types/quiz'

export const backtrackingQuizzes: Record<string, QuizQuestion[]> = {
  'n-queens': [
    {
      id: 'nqueens-q1',
      type: 'fill-blank',
      question: 'N-Queens에서 유망하지 않은 분기를 미리 잘라내는 기법을 ___라고 한다.',
      answer: '가지치기',
      explanation: '프루닝(pruning) 또는 가지치기는 불필요한 탐색을 줄여 효율성을 높입니다.',
    },
    {
      id: 'nqueens-q2',
      type: 'output-prediction',
      question: '4-Queens 문제의 해의 개수는?',
      options: ['1', '2', '4', '8'],
      answer: '2',
      explanation: '4×4 체스판에 4개의 퀸을 서로 공격하지 않게 놓는 방법은 2가지입니다.',
    },
  ],
  'permutation-combination': [
    {
      id: 'perm-q1',
      type: 'output-prediction',
      question: '{1, 2, 3}의 순열 개수는?',
      options: ['3', '6', '8', '9'],
      answer: '6',
      explanation: '3! = 3 × 2 × 1 = 6가지 순열이 있습니다.',
    },
    {
      id: 'perm-q2',
      type: 'output-prediction',
      question: '{1, 2, 3, 4}에서 2개를 뽑는 조합의 수는?',
      options: ['4', '6', '8', '12'],
      answer: '6',
      explanation: 'C(4,2) = 4!/(2!×2!) = 6입니다.',
    },
  ],
  'sudoku': [
    {
      id: 'sudoku-q1',
      type: 'fill-blank',
      question: '스도쿠 풀이에서 빈 칸에 숫자를 넣고 조건을 만족하지 않으면 되돌리는 방식을 ___라고 한다.',
      answer: '백트래킹',
      explanation: '제약 조건을 만족하지 않으면 이전 상태로 돌아가 다른 선택을 시도하는 것이 백트래킹입니다.',
    },
  ],
}
