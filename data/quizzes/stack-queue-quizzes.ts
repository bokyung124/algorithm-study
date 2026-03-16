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
}
