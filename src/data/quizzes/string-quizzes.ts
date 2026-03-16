import type { QuizQuestion } from '../../types/quiz'

export const stringQuizzes: Record<string, QuizQuestion[]> = {
  'kmp': [
    {
      id: 'kmp-q1',
      type: 'complexity-match',
      question: 'KMP 알고리즘의 시간복잡도는? (n=텍스트 길이, m=패턴 길이)',
      options: ['O(nm)', 'O(n + m)', 'O(n log m)', 'O(n²)'],
      answer: 'O(n + m)',
      explanation: '실패 함수 계산 O(m) + 매칭 O(n) = O(n + m)입니다.',
    },
    {
      id: 'kmp-q2',
      type: 'fill-blank',
      question: 'KMP의 핵심은 ___ 테이블을 미리 계산하여 불필요한 비교를 건너뛰는 것이다.',
      answer: '실패 함수(failure function)',
      explanation: '실패 함수는 접두사와 접미사가 일치하는 최장 길이를 저장합니다.',
    },
  ],
  'trie': [
    {
      id: 'trie-q1',
      type: 'complexity-match',
      question: '트라이에서 길이 m인 문자열을 검색하는 시간복잡도는?',
      options: ['O(1)', 'O(m)', 'O(n)', 'O(n log n)'],
      answer: 'O(m)',
      explanation: '문자열의 각 문자를 하나씩 따라가므로 문자열 길이에 비례하는 O(m)입니다.',
    },
  ],
}
