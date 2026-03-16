import type { QuizQuestion } from '../../types/quiz'

export const greedyQuizzes: Record<string, QuizQuestion[]> = {
  'activity-selection': [
    {
      id: 'activity-q1',
      type: 'fill-blank',
      question: '활동 선택 문제에서 탐욕적 선택은 ___ 시간이 가장 빠른 활동을 선택하는 것이다.',
      answer: '종료',
      explanation: '종료 시간이 빠른 활동을 선택하면 남은 시간에 더 많은 활동을 배치할 수 있습니다.',
    },
  ],
  'fractional-knapsack': [
    {
      id: 'fknap-q1',
      type: 'fill-blank',
      question: '분할 가능 배낭 문제에서 단위 무게당 ___가 높은 물건부터 담는다.',
      answer: '가치',
      explanation: '가치/무게 비율이 높은 물건부터 탐욕적으로 담으면 최적해를 얻습니다.',
    },
  ],
  'coin-change-greedy': [
    {
      id: 'coin-q1',
      type: 'output-prediction',
      question: '동전 [500, 100, 50, 10]으로 730원을 만들 때 최소 동전 수는?',
      options: ['4', '5', '6', '7'],
      answer: '6',
      explanation: '500×1 + 100×2 + 10×3 = 730원, 총 1+2+3 = 6개입니다.',
    },
  ],
}
