import type { QuizQuestion } from '../../types/quiz'

export const shortestPathQuizzes: Record<string, QuizQuestion[]> = {
  'dijkstra': [
    {
      id: 'dijkstra-q1',
      type: 'complexity-match',
      question: '우선순위 큐를 사용한 Dijkstra의 시간복잡도는?',
      options: ['O(V²)', 'O(V + E)', 'O((V + E) log V)', 'O(VE)'],
      answer: 'O((V + E) log V)',
      explanation: '우선순위 큐에서 삽입/삭제가 O(log V)이고, 모든 간선을 처리하므로 O((V+E) log V)입니다.',
    },
    {
      id: 'dijkstra-q2',
      type: 'fill-blank',
      question: 'Dijkstra 알고리즘은 ___ 가중치 간선이 있으면 사용할 수 없다.',
      answer: '음수',
      explanation: 'Dijkstra는 탐욕적으로 최소 거리를 확정하므로 음수 가중치가 있으면 정확성이 보장되지 않습니다.',
    },
  ],
  'bellman-ford': [
    {
      id: 'bellman-q1',
      type: 'complexity-match',
      question: 'Bellman-Ford 알고리즘의 시간복잡도는?',
      options: ['O(V + E)', 'O(VE)', 'O(V²)', 'O(V² log V)'],
      answer: 'O(VE)',
      explanation: 'V-1번 모든 간선을 순회하므로 O(VE)입니다.',
    },
    {
      id: 'bellman-q2',
      type: 'fill-blank',
      question: 'Bellman-Ford는 V-1번 반복 후에도 갱신이 발생하면 ___ 사이클이 존재한다.',
      answer: '음수',
      explanation: 'V-1번이면 충분한데 추가 갱신이 있다면 음수 사이클이 존재한다는 의미입니다.',
    },
  ],
  'floyd-warshall': [
    {
      id: 'floyd-q1',
      type: 'complexity-match',
      question: 'Floyd-Warshall 알고리즘의 시간복잡도는?',
      options: ['O(V²)', 'O(V³)', 'O(VE)', 'O(V² log V)'],
      answer: 'O(V³)',
      explanation: '3중 루프(중간 정점, 출발, 도착)로 O(V³)입니다.',
    },
  ],
}
