import type { QuizQuestion } from '../../types/quiz'

export const dpQuizzes: Record<string, QuizQuestion[]> = {
  'knapsack': [
    {
      id: 'knapsack-q1',
      type: 'complexity-match',
      question: '0/1 배낭 문제의 시간복잡도는? (n=물건 수, W=배낭 용량)',
      options: ['O(n)', 'O(nW)', 'O(n²)', 'O(2ⁿ)'],
      answer: 'O(nW)',
      explanation: 'n개의 물건에 대해 W가지 용량을 고려하므로 O(nW)입니다.',
    },
    {
      id: 'knapsack-q2',
      type: 'fill-blank',
      question: '0/1 배낭 문제에서 각 물건은 ___번만 선택할 수 있다.',
      answer: '1',
      explanation: '0/1 배낭은 각 물건을 넣거나(1) 넣지 않거나(0) 두 가지 선택만 가능합니다.',
    },
    {
      id: 'knapsack-q3',
      type: 'output-prediction',
      question: '물건 [(무게2, 가치3), (무게3, 가치4), (무게4, 가치5)], 배낭 용량 5일 때 최대 가치는?',
      options: ['5', '7', '8', '9'],
      answer: '7',
      explanation: '무게2+무게3=5 ≤ 용량, 가치3+4=7이 최대입니다.',
    },
  ],
  'lis': [
    {
      id: 'lis-q1',
      type: 'complexity-match',
      question: 'LIS(최장 증가 부분수열)의 최적 시간복잡도는?',
      options: ['O(n)', 'O(n log n)', 'O(n²)', 'O(2ⁿ)'],
      answer: 'O(n log n)',
      explanation: '이진 탐색(lower bound)을 활용하면 O(n log n)에 구할 수 있습니다.',
    },
    {
      id: 'lis-q2',
      type: 'output-prediction',
      question: '[10, 20, 10, 30, 20, 50]의 LIS 길이는?',
      options: ['3', '4', '5', '6'],
      answer: '4',
      explanation: 'LIS는 [10, 20, 30, 50]으로 길이 4입니다.',
    },
  ],
  'fibonacci-memoization': [
    {
      id: 'fib-q1',
      type: 'complexity-match',
      question: '메모이제이션을 적용한 피보나치 수열의 시간복잡도는?',
      options: ['O(n)', 'O(n²)', 'O(2ⁿ)', 'O(n log n)'],
      answer: 'O(n)',
      explanation: '각 부분 문제를 한 번만 계산하므로 O(n)입니다.',
    },
    {
      id: 'fib-q2',
      type: 'fill-blank',
      question: '메모이제이션은 ___-down 방식, 타뷸레이션은 ___-up 방식이라고 한다.',
      answer: 'top, bottom',
      explanation: '메모이제이션은 큰 문제에서 작은 문제로(top-down), 타뷸레이션은 작은 문제에서 큰 문제로(bottom-up) 풀어갑니다.',
    },
  ],
  'interval-dp': [
    {
      id: 'interval-q1',
      type: 'complexity-match',
      question: '구간 DP의 일반적인 시간복잡도는?',
      options: ['O(n²)', 'O(n³)', 'O(n log n)', 'O(2ⁿ)'],
      answer: 'O(n³)',
      explanation: '구간의 시작, 끝, 분할점 3중 루프로 O(n³)입니다.',
    },
  ],
}
