import type { QuizQuestion } from '../../types/quiz'

export const stackQueueQuizzes: Record<string, QuizQuestion[]> = {
  'stack-basic': [
    {
      id: 'stack-q1',
      type: 'output-prediction',
      question: 'push(1), push(2), pop(), push(3), pop() 수행 후 스택 상태는?',
      options: ['[1]', '[1, 3]', '[1, 2]', '[3]'],
      answer: '[1]',
      explanation: 'push(1)→[1], push(2)→[1,2], pop()→[1], push(3)→[1,3], pop()→[1]',
    },
    {
      id: 'stack-q2',
      type: 'fill-blank',
      question: '스택은 ___ (Last In First Out) 구조이다.',
      answer: 'LIFO',
      explanation: '가장 마지막에 들어온 요소가 가장 먼저 나가는 LIFO 구조입니다.',
    },
  ],
  'queue-basic': [
    {
      id: 'queue-q1',
      type: 'fill-blank',
      question: '큐는 ___ (First In First Out) 구조이다.',
      answer: 'FIFO',
      explanation: '가장 먼저 들어온 요소가 가장 먼저 나가는 FIFO 구조입니다.',
    },
  ],
  'monotone-stack': [
    {
      id: 'mono-q1',
      type: 'fill-blank',
      question: '단조 스택은 스택 내부의 원소가 항상 ___ 순서를 유지한다.',
      answer: '단조 증가 또는 단조 감소',
      explanation: '새 원소를 넣을 때 순서가 깨지는 기존 원소를 제거하여 단조성을 유지합니다.',
    },
  ],
  'deque-basic': [
    {
      id: 'deque-q1',
      type: 'complexity-match',
      question: 'collections.deque의 appendleft() 연산의 시간복잡도는?',
      options: ['O(1)', 'O(N)', 'O(log N)', 'O(N log N)'],
      answer: 'O(1)',
      explanation: 'deque는 이중 연결 리스트 기반으로 양쪽 끝 삽입/삭제가 모두 O(1)입니다. 반면 list.insert(0, x)는 O(N)입니다.',
    },
    {
      id: 'deque-q2',
      type: 'output-prediction',
      question: 'deque([1, 2, 3])에서 rotate(1) 수행 후 결과는?',
      options: ['deque([2, 3, 1])', 'deque([3, 1, 2])', 'deque([1, 2, 3])', 'deque([3, 2, 1])'],
      answer: 'deque([3, 1, 2])',
      explanation: 'rotate(1)은 오른쪽 끝 원소를 왼쪽 끝으로 이동합니다. 3이 오른쪽 끝에서 왼쪽 끝으로 이동하여 [3, 1, 2]가 됩니다.',
    },
    {
      id: 'deque-q3',
      type: 'fill-blank',
      question: 'list.pop(0)의 시간복잡도는 O(N)이지만, deque.___()는 O(1)이다.',
      answer: 'popleft',
      explanation: 'deque.popleft()는 O(1)에 왼쪽 원소를 제거합니다. list.pop(0)은 나머지 원소를 모두 한 칸씩 이동해야 하므로 O(N)입니다.',
    },
  ],
  'monotone-deque': [
    {
      id: 'mono-dq-q1',
      type: 'complexity-match',
      question: '모노톤 덱을 사용한 슬라이딩 윈도우 최댓값의 전체 시간복잡도는?',
      options: ['O(N)', 'O(N log N)', 'O(NK)', 'O(N^2)'],
      answer: 'O(N)',
      explanation: '각 원소가 덱에 최대 1번 삽입되고 1번 삭제되므로 전체 시간복잡도는 O(N)입니다.',
    },
    {
      id: 'mono-dq-q2',
      type: 'output-prediction',
      question: '배열 [1, 3, -1, -3, 5]에서 k=3 슬라이딩 윈도우 최댓값은?',
      options: ['[3, 3, 5]', '[1, 3, 5]', '[3, 3, -1]', '[3, -1, 5]'],
      answer: '[3, 3, 5]',
      explanation: '윈도우 [1,3,-1]→최대 3, [3,-1,-3]→최대 3, [-1,-3,5]→최대 5. 결과: [3, 3, 5]',
    },
    {
      id: 'mono-dq-q3',
      type: 'fill-blank',
      question: '슬라이딩 윈도우 최댓값을 구할 때, 덱에는 값이 아닌 ___를 저장하여 윈도우 범위를 판단한다.',
      answer: '인덱스',
      explanation: '인덱스를 저장하면 현재 윈도우 범위 밖의 원소인지 판단할 수 있어, 만료된 원소를 덱의 앞에서 제거할 수 있습니다.',
    },
  ],
}
