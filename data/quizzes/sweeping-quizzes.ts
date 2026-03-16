import type { QuizQuestion } from '../../types/quiz'

export const sweepingQuizzes: Record<string, QuizQuestion[]> = {
  'line-sweeping': [
    {
      id: 'line-sweeping-q1',
      type: 'complexity-match',
      question: '라인 스위핑 알고리즘의 시간복잡도는?',
      options: ['O(N)', 'O(N log N)', 'O(N^2)', 'O(N^2 log N)'],
      answer: 'O(N log N)',
      explanation: '이벤트를 정렬하는 데 O(N log N)이 소요되고, 순회는 O(N)이므로 정렬이 지배적입니다.',
    },
    {
      id: 'line-sweeping-q2',
      type: 'output-prediction',
      question: '구간 [(1,5), (3,8), (6,9)]을 합치면 전체 길이는?',
      options: ['8', '9', '13', '15'],
      answer: '8',
      explanation: '구간이 모두 겹쳐 (1,9)로 합쳐지므로 전체 길이는 9-1=8입니다.',
    },
    {
      id: 'line-sweeping-q3',
      type: 'fill-blank',
      question: '라인 스위핑의 첫 단계는 이벤트를 ___ 것이다.',
      answer: '정렬하는',
      explanation: '스위핑은 이벤트를 좌표 기준으로 정렬한 뒤 순서대로 처리하는 것이 핵심입니다.',
    },
  ],
  'event-sweeping': [
    {
      id: 'event-sweeping-q1',
      type: 'output-prediction',
      question: '회의 시간이 [1,3], [2,5], [4,7]일 때 동시에 필요한 최소 회의실 수는?',
      options: ['1', '2', '3'],
      answer: '2',
      explanation: '시간 2~3에 회의 [1,3]과 [2,5]가 겹치므로 최소 2개의 회의실이 필요합니다.',
    },
    {
      id: 'event-sweeping-q2',
      type: 'complexity-match',
      question: '이벤트 스위핑에서 N개의 구간을 처리하는 시간복잡도는?',
      options: ['O(N)', 'O(N log N)', 'O(N^2)', 'O(2^N)'],
      answer: 'O(N log N)',
      explanation: '2N개의 이벤트를 정렬(O(N log N))한 뒤 한 번 순회(O(N))하므로 O(N log N)입니다.',
    },
    {
      id: 'event-sweeping-q3',
      type: 'fill-blank',
      question: '이벤트 스위핑에서 구간 시작 시 카운터를 +1, 구간 종료 시 ___한다.',
      answer: '-1',
      explanation: '시작 이벤트에서 +1, 종료 이벤트에서 -1하여 현재 활성 구간의 수를 추적합니다.',
    },
  ],
}
