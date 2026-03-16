import type { QuizQuestion } from '../../types/quiz'

export const binarySearchQuizzes: Record<string, QuizQuestion[]> = {
  'lower-bound': [
    {
      id: 'lb-q1',
      type: 'output-prediction',
      question: '정렬된 배열 [1, 2, 4, 4, 6]에서 lower_bound(4)의 인덱스는?',
      options: ['1', '2', '3', '4'],
      answer: '2',
      explanation: 'lower bound는 4 이상인 첫 번째 위치인 인덱스 2를 반환합니다.',
    },
    {
      id: 'lb-q2',
      type: 'fill-blank',
      question: 'lower bound는 target ___ 첫 번째 위치를 찾는다.',
      answer: '이상인',
      explanation: 'lower bound는 target 이상(≥)인 첫 번째 원소의 위치를 반환합니다.',
    },
  ],
  'upper-bound': [
    {
      id: 'ub-q1',
      type: 'output-prediction',
      question: '정렬된 배열 [1, 2, 4, 4, 6]에서 upper_bound(4)의 인덱스는?',
      options: ['2', '3', '4', '5'],
      answer: '4',
      explanation: 'upper bound는 4보다 큰 첫 번째 위치인 인덱스 4를 반환합니다.',
    },
  ],
  'answer-binary-search': [
    {
      id: 'abs-q1',
      type: 'fill-blank',
      question: '결정 문제 이진 탐색은 "답이 X일 때 조건을 만족하는가?"를 판별하는 ___ 함수가 필요하다.',
      answer: '결정',
      explanation: '주어진 값에서 조건의 충족 여부를 O(n) 이하로 판단하는 결정 함수가 핵심입니다.',
    },
  ],
}
