import type { QuizQuestion } from '../../types/quiz'

export const coordinateCompressionQuizzes: Record<string, QuizQuestion[]> = {
  'basic-compression': [
    {
      id: 'cc-basic-q1',
      type: 'complexity-match',
      question: '기본 좌표 압축의 시간복잡도는? (N개의 원소)',
      options: ['O(N)', 'O(N log N)', 'O(N^2)', 'O(N^2 log N)'],
      answer: 'O(N log N)',
      explanation:
        '정렬이 O(N log N)이고, 각 원소에 대해 bisect_left로 인덱스를 찾는 것이 O(N log N)이므로 전체 O(N log N)입니다.',
    },
    {
      id: 'cc-basic-q2',
      type: 'output-prediction',
      question:
        '배열 [1000, 50, 999999, 3, 50]을 좌표 압축하면 결과는? (0부터 시작)',
      options: ['[2, 1, 3, 0, 1]', '[3, 1, 4, 0, 1]', '[2, 1, 3, 0, 2]', '[1, 0, 2, 3, 0]'],
      answer: '[2, 1, 3, 0, 1]',
      explanation:
        'sorted(set([1000, 50, 999999, 3, 50])) = [3, 50, 1000, 999999]. 3→0, 50→1, 1000→2, 999999→3이므로 결과는 [2, 1, 3, 0, 1]입니다.',
    },
    {
      id: 'cc-basic-q3',
      type: 'fill-blank',
      question:
        '좌표 압축에서 sorted(set(arr))의 역할은 값을 ___하고 ___를 제거하는 것이다.',
      answer: '정렬, 중복',
      explanation:
        'set으로 중복을 제거하고 sorted로 정렬하면, 각 고유 값의 인덱스가 곧 압축된 좌표가 됩니다.',
    },
  ],
  'compression-with-segment-tree': [
    {
      id: 'cc-seg-q1',
      type: 'complexity-match',
      question:
        '좌표 압축 + BIT를 이용한 역전 수(inversion count) 구하기의 전체 시간복잡도는?',
      options: ['O(N)', 'O(N log N)', 'O(N^2)', 'O(N log^2 N)'],
      answer: 'O(N log N)',
      explanation:
        '좌표 압축에 O(N log N), N개 원소 각각에 대해 BIT 쿼리/업데이트가 O(log N)이므로 전체 O(N log N)입니다.',
    },
    {
      id: 'cc-seg-q2',
      type: 'output-prediction',
      question:
        '배열 [3, 1, 2]의 역전 수(inversion count)는? (역전: i < j이면서 arr[i] > arr[j]인 쌍의 수)',
      options: ['1', '2', '3', '0'],
      answer: '2',
      explanation:
        '역전 쌍은 (3,1)과 (3,2)로 총 2개입니다. 뒤에서부터 BIT에 삽입하며 자신보다 작은 수의 개수를 누적하면 구할 수 있습니다.',
    },
    {
      id: 'cc-seg-q3',
      type: 'fill-blank',
      question:
        '좌표 압축을 하면 값의 범위가 최대 ___이 되어 BIT/세그먼트 트리의 크기를 줄일 수 있다.',
      answer: 'N',
      explanation:
        'N개의 원소를 좌표 압축하면 고유 값이 최대 N개이므로, 값의 범위가 10^9이어도 크기 N의 BIT/세그먼트 트리로 충분합니다.',
    },
  ],
}
