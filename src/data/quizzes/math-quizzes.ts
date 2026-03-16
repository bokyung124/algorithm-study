import type { QuizQuestion } from '../../types/quiz'

export const mathQuizzes: Record<string, QuizQuestion[]> = {
  'prime-sieve': [
    {
      id: 'sieve-q1',
      type: 'complexity-match',
      question: '에라토스테네스의 체의 시간복잡도는?',
      options: ['O(n)', 'O(n log n)', 'O(n log log n)', 'O(n√n)'],
      answer: 'O(n log log n)',
      explanation: '각 소수의 배수를 지우는 과정의 합이 O(n log log n)입니다.',
    },
  ],
  'gcd-lcm': [
    {
      id: 'gcd-q1',
      type: 'output-prediction',
      question: 'gcd(12, 8)의 결과는?',
      options: ['2', '4', '6', '8'],
      answer: '4',
      explanation: '12와 8의 최대공약수는 4입니다. 유클리드 호제법: gcd(12,8)=gcd(8,4)=gcd(4,0)=4',
    },
    {
      id: 'gcd-q2',
      type: 'fill-blank',
      question: 'lcm(a, b) = a × b ÷ ___',
      answer: 'gcd(a, b)',
      explanation: '최소공배수 = 두 수의 곱 ÷ 최대공약수입니다.',
    },
  ],
  'modular-arithmetic': [
    {
      id: 'mod-q1',
      type: 'output-prediction',
      question: '(7 × 8) mod 10의 결과는?',
      options: ['6', '16', '56', '5'],
      answer: '6',
      explanation: '7 × 8 = 56, 56 mod 10 = 6입니다.',
    },
  ],
}
