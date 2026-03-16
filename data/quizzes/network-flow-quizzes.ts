import type { QuizQuestion } from '../../types/quiz'

export const networkFlowQuizzes: Record<string, QuizQuestion[]> = {
  'max-flow': [
    {
      id: 'max-flow-q1',
      type: 'complexity-match',
      question: 'Edmonds-Karp 알고리즘의 시간복잡도는?',
      options: ['O(VE)', 'O(V²E)', 'O(VE²)', 'O(V²E²)'],
      answer: 'O(VE²)',
      explanation: 'BFS로 최단 증가 경로를 찾으므로 최대 O(VE)번의 증가가 발생하고, 각 BFS는 O(E)이므로 전체 O(VE²)입니다.',
    },
    {
      id: 'max-flow-q2',
      type: 'fill-blank',
      question: '최대 유량 알고리즘에서 유량의 재분배를 가능하게 하기 위해 ___간선을 추가해야 한다.',
      answer: '역방향',
      explanation: '역방향 간선에 유량을 보내는 것은 기존 유량을 취소하는 효과가 있어, 더 나은 유량 분배를 찾을 수 있습니다.',
    },
    {
      id: 'max-flow-q3',
      type: 'output-prediction',
      question: 'S→A(용량 3), S→B(용량 2), A→T(용량 2), B→T(용량 3), A→B(용량 1)일 때 최대 유량은?',
      options: ['3', '4', '5', '6'],
      answer: '5',
      explanation: 'S→A→T로 2, S→A→B→T로 1, S→B→T로 2를 보내면 총 5의 유량이 흐릅니다.',
    },
  ],
  'bipartite-matching': [
    {
      id: 'bm-q1',
      type: 'complexity-match',
      question: 'DFS 기반 이분 매칭 알고리즘의 시간복잡도는?',
      options: ['O(V)', 'O(E)', 'O(VE)', 'O(V²E)'],
      answer: 'O(VE)',
      explanation: '왼쪽 V개 노드 각각에 대해 DFS를 수행하고, 각 DFS는 최대 O(E)이므로 O(VE)입니다.',
    },
    {
      id: 'bm-q2',
      type: 'fill-blank',
      question: '이분 매칭에서 이미 매칭된 노드를 만나면, 해당 매칭 상대가 ___으로 옮길 수 있는지 재귀적으로 확인한다.',
      answer: '다른 노드',
      explanation: '매칭 상대가 다른 노드로 매칭을 옮길 수 있으면, 현재 노드가 해당 자리를 차지하여 전체 매칭 수를 늘립니다.',
    },
    {
      id: 'bm-q3',
      type: 'output-prediction',
      question: '쾨닉의 정리에 따르면, 이분 그래프에서 최대 매칭의 크기는 무엇과 같은가?',
      options: ['최대 독립 집합', '최소 버텍스 커버', '최소 간선 커버', '최대 클리크'],
      answer: '최소 버텍스 커버',
      explanation: '쾨닉의 정리: 이분 그래프에서 최대 매칭의 크기 = 최소 버텍스 커버의 크기입니다.',
    },
  ],
}
