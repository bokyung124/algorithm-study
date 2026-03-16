import type { QuizQuestion } from '../../types/quiz'

export const segmentTreeQuizzes: Record<string, QuizQuestion[]> = {
  'basic-segment-tree': [
    {
      id: 'seg-q1',
      type: 'complexity-match',
      question: '세그먼트 트리의 구간 쿼리 시간복잡도는?',
      options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
      answer: 'O(log n)',
      explanation: '트리 높이가 log n이므로 구간 쿼리와 업데이트 모두 O(log n)입니다.',
    },
  ],
  'lazy-propagation': [
    {
      id: 'lazy-q1',
      type: 'fill-blank',
      question: '레이지 프로파게이션은 구간 ___ 연산을 O(log n)에 처리하기 위한 기법이다.',
      answer: '업데이트',
      explanation: '구간 전체를 갱신할 때 즉시 처리하지 않고 나중에 필요할 때 전파합니다.',
    },
  ],
}
