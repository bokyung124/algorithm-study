import type { QuizQuestion } from '../../types/quiz'

export const twoPointerQuizzes: Record<string, QuizQuestion[]> = {
  'two-pointer-basic': [
    {
      id: 'tp-q1',
      type: 'complexity-match',
      question: '정렬된 배열에서 투 포인터로 두 수의 합을 찾는 시간복잡도는?',
      options: ['O(n²)', 'O(n log n)', 'O(n)', 'O(log n)'],
      answer: 'O(n)',
      explanation: '양쪽 끝에서 시작해 한 번씩만 이동하므로 O(n)입니다.',
    },
  ],
  'sliding-window': [
    {
      id: 'sw-q1',
      type: 'fill-blank',
      question: '슬라이딩 윈도우는 고정/가변 크기의 ___를 이동시키며 부분 배열의 특성을 효율적으로 계산한다.',
      answer: '윈도우(구간)',
      explanation: '구간을 오른쪽으로 한 칸씩 이동하며 추가/제거를 반복합니다.',
    },
    {
      id: 'sw-q2',
      type: 'complexity-match',
      question: '크기 k인 슬라이딩 윈도우로 배열의 모든 부분합을 구하는 시간복잡도는?',
      options: ['O(nk)', 'O(n)', 'O(n log n)', 'O(n²)'],
      answer: 'O(n)',
      explanation: '윈도우를 한 칸 이동할 때마다 O(1)로 합을 갱신하므로 전체 O(n)입니다.',
    },
  ],
}
