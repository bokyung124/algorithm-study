import type { QuizQuestion } from '../../types/quiz'

export const hashQuizzes: Record<string, QuizQuestion[]> = {
  'hash-map': [
    {
      id: 'hm-q1',
      type: 'complexity-match',
      question: '해시맵의 평균 탐색 시간복잡도는?',
      options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
      answer: 'O(1)',
      explanation: '해시 함수로 바로 위치를 계산하므로 평균 O(1)입니다.',
    },
    {
      id: 'hm-q2',
      type: 'fill-blank',
      question: '해시맵에서 서로 다른 키가 같은 인덱스에 매핑되는 것을 ___라고 한다.',
      answer: '충돌',
      explanation: '해시 충돌(collision)은 체이닝이나 개방 주소법으로 해결합니다.',
    },
  ],
  'hash-set': [
    {
      id: 'hs-q1',
      type: 'fill-blank',
      question: 'Python에서 집합의 원소 존재 확인(in 연산)의 평균 시간복잡도는 ___이다.',
      answer: 'O(1)',
      explanation: 'set은 내부적으로 해시 테이블을 사용하므로 평균 O(1)입니다.',
    },
  ],
  'counting': [
    {
      id: 'count-q1',
      type: 'output-prediction',
      question: "Counter('aabbbc')에서 most_common(1)의 결과는?",
      options: ["[('a', 2)]", "[('b', 3)]", "[('c', 1)]", "[('a', 3)]"],
      answer: "[('b', 3)]",
      explanation: "b가 3번으로 가장 많이 등장하므로 [('b', 3)]입니다.",
    },
  ],
}
