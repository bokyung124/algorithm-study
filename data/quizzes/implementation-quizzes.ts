import type { QuizQuestion } from '../../types/quiz'

export const implementationQuizzes: Record<string, QuizQuestion[]> = {
  'simulation': [
    {
      id: 'sim-q1',
      type: 'fill-blank',
      question: '시뮬레이션 문제의 핵심은 문제에서 주어진 ___을 정확히 코드로 옮기는 것이다.',
      answer: '조건(규칙)',
      explanation: '시뮬레이션은 알고리즘적 기법보다 문제 조건을 빠짐없이 구현하는 것이 중요합니다.',
    },
  ],
  'matrix-rotation': [
    {
      id: 'mat-q1',
      type: 'output-prediction',
      question: '2×2 행렬 [[1,2],[3,4]]를 시계 방향 90도 회전하면?',
      options: ['[[3,1],[4,2]]', '[[2,4],[1,3]]', '[[4,3],[2,1]]', '[[1,3],[2,4]]'],
      answer: '[[3,1],[4,2]]',
      explanation: '시계 90도 회전: 전치(transpose) 후 좌우 반전, 또는 (i,j)→(j,n-1-i) 변환입니다.',
    },
  ],
}
