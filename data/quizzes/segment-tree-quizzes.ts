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
  'fenwick-tree': [
    {
      id: 'fenwick-q1',
      type: 'complexity-match',
      question: '펜윅 트리(BIT)의 점 업데이트와 구간 합 쿼리의 시간복잡도는?',
      options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
      answer: 'O(log n)',
      explanation: 'lowbit 연산으로 트리를 올라가거나 내려가므로 최대 log n개의 노드를 방문합니다.',
    },
    {
      id: 'fenwick-q2',
      type: 'fill-blank',
      question: '펜윅 트리에서 인덱스 i의 최하위 비트를 구하는 식은 i & ___이다.',
      answer: '-i',
      explanation: '2의 보수 표현에서 -i는 i의 비트를 반전한 뒤 1을 더한 값이므로, i & (-i)는 최하위 비트만 남깁니다.',
    },
    {
      id: 'fenwick-q3',
      type: 'output-prediction',
      question: '배열 [1, 3, 5, 7]로 펜윅 트리를 구성한 후 query(3)의 결과는? (1-indexed prefix sum)',
      options: ['4', '8', '9', '16'],
      answer: '9',
      explanation: 'query(3)은 1~3번째 원소의 합이므로 1 + 3 + 5 = 9입니다.',
    },
  ],
}
