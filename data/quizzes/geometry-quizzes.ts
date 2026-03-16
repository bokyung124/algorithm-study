import type { QuizQuestion } from '../../types/quiz'

export const geometryQuizzes: Record<string, QuizQuestion[]> = {
  'ccw': [
    {
      id: 'ccw-q1',
      type: 'output-prediction',
      question: '세 점 (0,0), (4,0), (2,3)에 대해 CCW 값의 부호는?',
      options: ['양수 (반시계)', '음수 (시계)', '0 (일직선)'],
      answer: '양수 (반시계)',
      explanation: '외적 = (4-0)*(3-0) - (2-0)*(0-0) = 12 > 0이므로 반시계 방향입니다.',
    },
    {
      id: 'ccw-q2',
      type: 'complexity-match',
      question: 'CCW 알고리즘의 시간복잡도는?',
      options: ['O(1)', 'O(log N)', 'O(N)', 'O(N log N)'],
      answer: 'O(1)',
      explanation: 'CCW는 세 점의 좌표로 외적 한 번만 계산하면 되므로 O(1)입니다.',
    },
    {
      id: 'ccw-q3',
      type: 'fill-blank',
      question: 'CCW에서 외적 값이 0이면 세 점은 ___ 위에 있다.',
      answer: '일직선',
      explanation: '외적 값이 0이면 두 벡터가 평행하므로 세 점이 일직선 위에 있습니다.',
    },
  ],
  'convex-hull': [
    {
      id: 'convex-hull-q1',
      type: 'complexity-match',
      question: '볼록 껍질 알고리즘(Andrew/Graham Scan)의 시간복잡도는?',
      options: ['O(N)', 'O(N log N)', 'O(N^2)', 'O(N^2 log N)'],
      answer: 'O(N log N)',
      explanation: '점을 정렬하는 데 O(N log N)이 소요되며, 이후 스캔은 O(N)이므로 전체 시간복잡도는 O(N log N)입니다.',
    },
    {
      id: 'convex-hull-q2',
      type: 'output-prediction',
      question: 'Andrew 알고리즘에서 스택에 쌓은 점이 시계 방향으로 꺾이면 어떻게 처리하나요?',
      options: ['그대로 추가', '스택에서 pop 후 다시 확인', '건너뛰기', '역순으로 정렬'],
      answer: '스택에서 pop 후 다시 확인',
      explanation: '볼록성을 유지하기 위해 시계 방향(CW)으로 꺾이는 점은 제거하고, 반시계 방향이 될 때까지 반복합니다.',
    },
    {
      id: 'convex-hull-q3',
      type: 'fill-blank',
      question: 'Andrew의 Monotone Chain은 점들을 ___ 기준으로 정렬한다.',
      answer: 'x좌표',
      explanation: 'Andrew 알고리즘은 점들을 x좌표(같으면 y좌표) 기준으로 정렬하여 아래 껍질과 위 껍질을 각각 구합니다.',
    },
  ],
  'line-intersection': [
    {
      id: 'line-intersection-q1',
      type: 'output-prediction',
      question: '선분 AB와 CD의 교차 판정에 CCW를 몇 번 호출해야 하나요?',
      options: ['1번', '2번', '3번', '4번'],
      answer: '4번',
      explanation: 'CCW(A,B,C), CCW(A,B,D), CCW(C,D,A), CCW(C,D,B) 총 4번 호출합니다.',
    },
    {
      id: 'line-intersection-q2',
      type: 'complexity-match',
      question: '두 선분의 교차 판정 시간복잡도는?',
      options: ['O(1)', 'O(log N)', 'O(N)', 'O(N^2)'],
      answer: 'O(1)',
      explanation: 'CCW를 4번 호출하고 일직선 체크를 하므로 상수 시간 O(1)입니다.',
    },
    {
      id: 'line-intersection-q3',
      type: 'fill-blank',
      question: 'CCW(A,B,C) * CCW(A,B,D)가 음수이면 C와 D는 직선 AB의 ___ 있다.',
      answer: '양쪽에',
      explanation: 'CCW 값의 부호가 다르면 C와 D가 직선 AB를 기준으로 반대편에 있으므로, 선분 CD가 직선 AB를 관통합니다.',
    },
  ],
}
