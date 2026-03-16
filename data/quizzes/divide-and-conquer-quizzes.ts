import type { QuizQuestion } from '../../types/quiz'

export const divideAndConquerQuizzes: Record<string, QuizQuestion[]> = {
  'basic-divide-conquer': [
    {
      id: 'dc-basic-q1',
      type: 'complexity-match',
      question: '병합 정렬(Merge Sort)의 시간복잡도는?',
      options: ['O(n)', 'O(n log n)', 'O(n²)', 'O(log n)'],
      answer: 'O(n log n)',
      explanation: '배열을 절반으로 나누는 과정이 O(log n)번, 각 단계에서 합치는 과정이 O(n)이므로 전체 O(n log n)입니다.',
    },
    {
      id: 'dc-basic-q2',
      type: 'fill-blank',
      question: '분할 정복의 3단계는 분할(Divide), 정복(Conquer), ___이다.',
      answer: '합치기',
      explanation: '분할 정복은 문제를 나누고(Divide), 재귀적으로 해결하고(Conquer), 결과를 합치는(Combine) 3단계로 구성됩니다.',
    },
    {
      id: 'dc-basic-q3',
      type: 'output-prediction',
      question: '크기 8인 배열에 대해 병합 정렬을 수행할 때, 재귀 호출의 최대 깊이는?',
      options: ['2', '3', '4', '8'],
      answer: '3',
      explanation: '8 → 4 → 2 → 1로 3단계만에 크기 1이 됩니다. log₂(8) = 3입니다.',
    },
  ],
  'fast-exponentiation': [
    {
      id: 'dc-exp-q1',
      type: 'output-prediction',
      question: '빠른 거듭제곱으로 2^10을 계산할 때, 곱셈 연산 횟수는?',
      options: ['4', '5', '10', '3'],
      answer: '4',
      explanation: '2^10 = (2^5)^2, 2^5 = 2×(2^2)^2, 2^2 = (2^1)^2, 2^1 = 2. 제곱 3번 + 홀수 곱셈 1번 = 4번입니다.',
    },
    {
      id: 'dc-exp-q2',
      type: 'complexity-match',
      question: 'a^n을 빠른 거듭제곱으로 계산할 때의 시간복잡도는?',
      options: ['O(n)', 'O(log n)', 'O(n log n)', 'O(1)'],
      answer: 'O(log n)',
      explanation: '지수를 매번 절반으로 줄이므로 O(log n)번의 곱셈만 필요합니다.',
    },
    {
      id: 'dc-exp-q3',
      type: 'fill-blank',
      question: 'Python에서 a^b mod m을 빠르게 계산하는 내장 함수는 pow(a, b, ___)이다.',
      answer: 'm',
      explanation: 'pow(a, b, m)은 a^b mod m을 O(log b)에 계산하는 Python 내장 함수입니다.',
    },
  ],
  'closest-pair': [
    {
      id: 'dc-closest-q1',
      type: 'complexity-match',
      question: '가장 가까운 점 쌍 문제를 분할 정복으로 풀 때의 시간복잡도는?',
      options: ['O(n)', 'O(n log n)', 'O(n²)', 'O(n² log n)'],
      answer: 'O(n log n)',
      explanation: '점들을 절반으로 나누어 재귀하고, strip 내에서 O(n)에 확인하므로 전체 O(n log n)입니다.',
    },
    {
      id: 'dc-closest-q2',
      type: 'fill-blank',
      question: '가장 가까운 점 쌍 알고리즘에서 중앙선 근처의 후보 영역을 ___이라고 한다.',
      answer: 'strip',
      explanation: 'strip은 중앙선에서 최소 거리 d 이내에 있는 점들의 영역으로, 이 안에서만 교차 쌍을 확인하면 됩니다.',
    },
    {
      id: 'dc-closest-q3',
      type: 'output-prediction',
      question: 'strip 내에서 한 점에 대해 비교해야 하는 최대 점의 수는?',
      options: ['3', '5', '7', 'n'],
      answer: '7',
      explanation: 'strip 내에서 d×2d 영역에 최대 8개의 점이 들어갈 수 있으므로, 자기 자신을 제외하면 최대 7개를 비교합니다.',
    },
  ],
}
