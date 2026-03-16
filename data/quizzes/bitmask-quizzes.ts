import type { QuizQuestion } from '../../types/quiz'

export const bitmaskQuizzes: Record<string, QuizQuestion[]> = {
  'bit-operations': [
    {
      id: 'bit-q1',
      type: 'output-prediction',
      question: '5 & 3의 결과는? (5=101, 3=011)',
      options: ['1', '3', '5', '7'],
      answer: '1',
      explanation: '101 & 011 = 001 = 1입니다. AND 연산은 두 비트 모두 1일 때만 1입니다.',
    },
    {
      id: 'bit-q2',
      type: 'output-prediction',
      question: '5 | 3의 결과는? (5=101, 3=011)',
      options: ['1', '3', '5', '7'],
      answer: '7',
      explanation: '101 | 011 = 111 = 7입니다. OR 연산은 하나라도 1이면 1입니다.',
    },
  ],
  'subset-enumeration': [
    {
      id: 'subset-q1',
      type: 'output-prediction',
      question: '집합 {a, b, c}의 부분집합 개수는?',
      options: ['6', '7', '8', '9'],
      answer: '8',
      explanation: 'n개 원소의 부분집합은 2ⁿ개입니다. 2³ = 8 (공집합 포함)',
    },
  ],
  'bitmask-dp': [
    {
      id: 'bdp-q1',
      type: 'complexity-match',
      question: 'n개 원소의 비트마스크 DP에서 상태 수는?',
      options: ['O(n)', 'O(n²)', 'O(2ⁿ)', 'O(n!)'],
      answer: 'O(2ⁿ)',
      explanation: '모든 부분집합을 상태로 표현하므로 2ⁿ가지 상태가 있습니다.',
    },
  ],
}
