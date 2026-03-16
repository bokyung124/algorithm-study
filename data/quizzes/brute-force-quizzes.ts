import type { QuizQuestion } from '../../types/quiz'

export const bruteForceQuizzes: Record<string, QuizQuestion[]> = {
  'exhaustive-search': [
    {
      id: 'bf-exhaust-q1',
      type: 'complexity-match',
      question: 'N개의 원소에서 3개를 선택하는 모든 조합을 탐색하는 시간복잡도는?',
      options: ['O(N)', 'O(N²)', 'O(N³)', 'O(2^N)'],
      answer: 'O(N³)',
      explanation: '3중 반복문으로 C(N,3) = N(N-1)(N-2)/6가지를 탐색하므로 O(N³)입니다.',
    },
    {
      id: 'bf-exhaust-q2',
      type: 'output-prediction',
      question: 'N=20일 때 2^N의 값은 약?',
      options: ['약 100만', '약 1000만', '약 1억', '약 10억'],
      answer: '약 100만',
      explanation: '2^20 = 1,048,576으로 약 100만입니다. 따라서 N ≤ 20이면 부분집합 전탐색이 가능합니다.',
    },
    {
      id: 'bf-exhaust-q3',
      type: 'fill-blank',
      question: '완전 탐색을 시도하기 전에 먼저 ___를 계산하여 시간 내에 가능한지 판단해야 한다.',
      answer: '경우의 수',
      explanation: '경우의 수를 먼저 계산하여 약 10^8 이하인지 확인하면 완전 탐색의 가능 여부를 판단할 수 있습니다.',
    },
  ],
  'permutation-combination': [
    {
      id: 'bf-perm-q1',
      type: 'output-prediction',
      question: '{1, 2, 3, 4}에서 2개를 뽑는 순열의 수는?',
      options: ['6', '12', '16', '24'],
      answer: '12',
      explanation: 'P(4,2) = 4 × 3 = 12입니다. 순열은 순서를 고려하므로 (1,2)와 (2,1)을 다르게 셉니다.',
    },
    {
      id: 'bf-perm-q2',
      type: 'fill-blank',
      question: '조합에서 중복을 방지하기 위해 재귀 호출 시 ___ 인덱스를 증가시킨다.',
      answer: '시작',
      explanation: '조합은 start 매개변수를 i+1로 전달하여, 이전에 선택한 것보다 뒤의 원소만 선택하게 합니다.',
    },
    {
      id: 'bf-perm-q3',
      type: 'complexity-match',
      question: 'N=8일 때 모든 순열을 생성하는 경우의 수(8!)는?',
      options: ['256', '5,040', '40,320', '362,880'],
      answer: '40,320',
      explanation: '8! = 8×7×6×5×4×3×2×1 = 40,320입니다.',
    },
  ],
  'bit-subset': [
    {
      id: 'bf-bit-q1',
      type: 'output-prediction',
      question: '비트마스크 5(이진수 101)가 나타내는 부분집합은? (배열 [a, b, c]에서)',
      options: ['{a, c}', '{a, b}', '{b, c}', '{a, b, c}'],
      answer: '{a, c}',
      explanation: '101에서 0번째 비트(1)와 2번째 비트(1)가 켜져있으므로 a(0번)와 c(2번)를 포함합니다.',
    },
    {
      id: 'bf-bit-q2',
      type: 'fill-blank',
      question: 'i번째 원소가 부분집합에 포함되는지 확인하는 비트 연산은 mask & (1 << ___)이다.',
      answer: 'i',
      explanation: '1 << i로 i번째 비트만 1인 수를 만들고, mask와 AND 연산하여 해당 비트가 1인지 확인합니다.',
    },
    {
      id: 'bf-bit-q3',
      type: 'output-prediction',
      question: '원소가 4개인 집합의 모든 부분집합 수(공집합 포함)는?',
      options: ['8', '12', '16', '24'],
      answer: '16',
      explanation: '2^4 = 16개입니다. 0부터 15까지의 비트마스크가 각 부분집합에 대응됩니다.',
    },
  ],
}
