import type { QuizQuestion } from '../../types/quiz'

export const simulationQuizzes: Record<string, QuizQuestion[]> = {
  'basic-simulation': [
    {
      id: 'sim-basic-q1',
      type: 'fill-blank',
      question: '시뮬레이션 문제에서 가장 중요한 능력은 복잡한 알고리즘이 아니라 정확한 ___이다.',
      answer: '구현력',
      explanation: '시뮬레이션은 문제에서 주어진 규칙을 그대로 코드로 옮기는 것이 핵심이므로, 정확한 구현력이 가장 중요합니다.',
    },
    {
      id: 'sim-basic-q2',
      type: 'output-prediction',
      question: '5×5 격자에서 (0,0)에서 시작하여 오른쪽으로 2칸, 아래로 3칸 이동하면 최종 좌표는?',
      options: ['(3, 2)', '(2, 3)', '(3, 3)', '(2, 2)'],
      answer: '(3, 2)',
      explanation: '행(row)이 아래로 증가하고 열(col)이 오른쪽으로 증가하므로, (0+3, 0+2) = (3, 2)입니다.',
    },
    {
      id: 'sim-basic-q3',
      type: 'complexity-match',
      question: 'N×M 격자를 모두 순회하는 시뮬레이션의 시간복잡도는?',
      options: ['O(N)', 'O(M)', 'O(N+M)', 'O(NM)'],
      answer: 'O(NM)',
      explanation: 'N행 M열의 모든 칸을 방문하므로 O(NM)입니다.',
    },
  ],
  'grid-movement': [
    {
      id: 'sim-grid-q1',
      type: 'output-prediction',
      question: 'dx = [-1, 0, 1, 0], dy = [0, 1, 0, -1]일 때, 인덱스 1은 어떤 방향인가?',
      options: ['상', '우', '하', '좌'],
      answer: '우',
      explanation: 'dx[1]=0, dy[1]=1이므로 행은 변하지 않고 열이 1 증가하는 오른쪽(우) 방향입니다.',
    },
    {
      id: 'sim-grid-q2',
      type: 'fill-blank',
      question: '현재 방향이 d일 때, 오른쪽으로 90도 회전한 방향은 (d + ___) % 4이다.',
      answer: '1',
      explanation: '방향이 상(0)→우(1)→하(2)→좌(3) 순서일 때, 오른쪽 회전은 d에 1을 더하고 4로 나눈 나머지입니다.',
    },
    {
      id: 'sim-grid-q3',
      type: 'output-prediction',
      question: '(2, 3) 위치에서 dx=[-1,0,1,0], dy=[0,1,0,-1]로 방향 2(하)로 이동하면?',
      options: ['(1, 3)', '(3, 3)', '(2, 4)', '(2, 2)'],
      answer: '(3, 3)',
      explanation: 'dx[2]=1, dy[2]=0이므로 (2+1, 3+0) = (3, 3)입니다.',
    },
  ],
  'gear-rotation': [
    {
      id: 'sim-gear-q1',
      type: 'fill-blank',
      question: '톱니바퀴 문제에서 연쇄 회전을 처리할 때, 먼저 모든 회전 ___을 결정한 후 한꺼번에 회전해야 한다.',
      answer: '방향',
      explanation: '회전하면서 판단하면 이미 회전한 상태가 다음 판단에 영향을 미치므로, 먼저 모든 회전 방향을 결정한 후 동시에 회전해야 합니다.',
    },
    {
      id: 'sim-gear-q2',
      type: 'output-prediction',
      question: 'Python deque에서 rotate(1)을 수행하면 어떤 방향으로 회전하는가?',
      options: ['시계방향 (오른쪽)', '반시계방향 (왼쪽)', '위쪽', '아래쪽'],
      answer: '시계방향 (오른쪽)',
      explanation: 'deque.rotate(1)은 마지막 원소가 처음으로 이동하는 오른쪽(시계방향) 회전입니다.',
    },
    {
      id: 'sim-gear-q3',
      type: 'output-prediction',
      question: '배열 [1, 2, 3, 4, 5]를 왼쪽으로 2칸 회전하면?',
      options: ['[3, 4, 5, 1, 2]', '[4, 5, 1, 2, 3]', '[2, 3, 4, 5, 1]', '[5, 1, 2, 3, 4]'],
      answer: '[3, 4, 5, 1, 2]',
      explanation: '왼쪽 2칸 회전은 arr[2:] + arr[:2] = [3, 4, 5] + [1, 2] = [3, 4, 5, 1, 2]입니다.',
    },
  ],
}
