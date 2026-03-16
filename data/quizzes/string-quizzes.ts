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
  'string-hashing': [
    {
      id: 'string-hashing-q1',
      type: 'complexity-match',
      question: '롤링 해시로 길이 M인 부분 문자열의 해시를 구하는 시간복잡도는? (전처리 후)',
      options: ['O(1)', 'O(M)', 'O(N)', 'O(N log N)'],
      answer: 'O(1)',
      explanation: '접두사 해시 배열을 전처리해두면, 임의 부분 문자열의 해시를 h[r+1] - h[l] * pw[r-l+1] 공식으로 O(1)에 계산할 수 있습니다.',
    },
    {
      id: 'string-hashing-q2',
      type: 'fill-blank',
      question: '해시 충돌을 줄이기 위해 두 개의 다른 MOD를 사용하는 기법을 ___이라 한다.',
      answer: '이중 해싱',
      explanation: '이중 해싱은 두 개의 서로 다른 MOD 값을 사용하여 해시 충돌 확률을 크게 줄이는 기법입니다.',
    },
    {
      id: 'string-hashing-q3',
      type: 'fill-blank',
      question: '문자열 해시에서 접두사 해시 배열을 이용하면 임의 부분 문자열의 해시를 ___에 구할 수 있다.',
      answer: 'O(1)',
      explanation: '접두사 해시 배열과 거듭제곱 배열을 전처리하면, 부분 문자열 s[l..r]의 해시를 상수 시간 O(1)에 계산할 수 있습니다.',
    },
  ],
}
