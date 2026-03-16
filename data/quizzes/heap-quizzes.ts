import type { QuizQuestion } from '../../types/quiz'

export const heapQuizzes: Record<string, QuizQuestion[]> = {
  'heap-basic': [
    {
      id: 'hb-q1',
      type: 'complexity-match',
      question: 'heappush의 시간복잡도는?',
      options: ['O(1)', 'O(log N)', 'O(N)', 'O(N log N)'],
      answer: 'O(log N)',
      explanation: '힙에 원소를 삽입하면 트리 높이만큼 비교하므로 O(log N)입니다.',
    },
    {
      id: 'hb-q2',
      type: 'output-prediction',
      question: '다음 코드의 출력은?\nimport heapq\nh = [5, 3, 8, 1]\nheapq.heapify(h)\nprint(heapq.heappop(h))',
      options: ['5', '3', '8', '1'],
      answer: '1',
      explanation: 'heapify는 최소 힙을 만들므로 heappop은 최솟값인 1을 반환합니다.',
    },
    {
      id: 'hb-q3',
      type: 'fill-blank',
      question: 'Python heapq로 최대 힙을 구현하려면 값에 ___을(를) 곱하여 삽입한다.',
      answer: '-1',
      explanation: 'heapq는 최소 힙만 지원하므로 -1을 곱하면 최소 힙이 최대 힙처럼 동작합니다.',
    },
  ],
  'top-k': [
    {
      id: 'tk-q1',
      type: 'complexity-match',
      question: 'N개 원소에서 Top-K를 힙으로 찾을 때 시간복잡도는?',
      options: ['O(N)', 'O(K log N)', 'O(N log K)', 'O(N log N)'],
      answer: 'O(N log K)',
      explanation: 'N개 원소를 순회하며 크기 K의 힙에 삽입/삭제하므로 O(N log K)입니다.',
    },
    {
      id: 'tk-q2',
      type: 'output-prediction',
      question: '다음 코드의 출력은?\nimport heapq\nprint(heapq.nlargest(3, [4, 1, 7, 3, 8, 5]))',
      options: ['[8, 7, 5]', '[1, 3, 4]', '[7, 8, 5]', '[8, 5, 7]'],
      answer: '[8, 7, 5]',
      explanation: 'nlargest는 가장 큰 3개를 내림차순으로 반환하므로 [8, 7, 5]입니다.',
    },
    {
      id: 'tk-q3',
      type: 'fill-blank',
      question: '가장 큰 K개를 찾을 때 크기 K의 ___힙을 유지한다.',
      answer: '최소',
      explanation: '최소 힙의 루트가 K개 중 가장 작은 값이므로, 새 원소가 루트보다 크면 교체하여 상위 K개를 유지합니다.',
    },
  ],
  'dual-heap': [
    {
      id: 'dh-q1',
      type: 'complexity-match',
      question: '이중 힙으로 중앙값을 구할 때 삽입 연산의 시간복잡도는?',
      options: ['O(1)', 'O(log N)', 'O(N)', 'O(N log N)'],
      answer: 'O(log N)',
      explanation: '삽입 시 힙 push/pop 연산이 상수 횟수 수행되며 각각 O(log N)이므로 전체 O(log N)입니다.',
    },
    {
      id: 'dh-q2',
      type: 'output-prediction',
      question: '[5, 2, 8]을 순서대로 이중 힙에 삽입한 후 중앙값은?',
      options: ['2', '5', '8', '3.5'],
      answer: '5',
      explanation: '정렬하면 [2, 5, 8]이고 홀수 개이므로 중앙값은 5입니다.',
    },
    {
      id: 'dh-q3',
      type: 'fill-blank',
      question: '이중 힙에서 작은 절반은 ___힙, 큰 절반은 ___힙에 저장한다.',
      answer: '최대, 최소',
      explanation: '작은 절반의 최대 힙 루트와 큰 절반의 최소 힙 루트에서 중앙값을 O(1)에 구할 수 있습니다.',
    },
  ],
}
