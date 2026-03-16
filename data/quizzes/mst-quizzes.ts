import type { QuizQuestion } from '../../types/quiz'

export const mstQuizzes: Record<string, QuizQuestion[]> = {
  'kruskal': [
    {
      id: 'kruskal-q1',
      type: 'complexity-match',
      question: '크루스칼 알고리즘의 시간복잡도는?',
      options: ['O(V²)', 'O(E log E)', 'O(V + E)', 'O(E log V)'],
      answer: 'O(E log E)',
      explanation: '간선을 정렬하는 데 O(E log E)이 걸리고, Union-Find 연산은 거의 O(1)이므로 전체 시간복잡도는 O(E log E)입니다.',
    },
    {
      id: 'kruskal-q2',
      type: 'fill-blank',
      question: '크루스칼 알고리즘은 간선을 ___ 기준으로 정렬한 뒤 선택한다.',
      answer: '가중치 오름차순',
      explanation: '가장 가벼운 간선부터 탐욕적으로 선택하여 MST를 구성합니다.',
    },
    {
      id: 'kruskal-q3',
      type: 'fill-blank',
      question: '크루스칼 알고리즘에서 사이클 판별에 사용하는 자료구조는 ___이다.',
      answer: 'Union-Find',
      explanation: 'Union-Find(서로소 집합)를 사용하여 두 정점이 이미 같은 집합에 속하는지 확인합니다. 같은 집합이면 해당 간선을 추가하면 사이클이 생기므로 건너뜁니다.',
    },
  ],
  'prim': [
    {
      id: 'prim-q1',
      type: 'complexity-match',
      question: '우선순위 큐를 사용한 프림 알고리즘의 시간복잡도는?',
      options: ['O(V²)', 'O(E log V)', 'O(E log E)', 'O(VE)'],
      answer: 'O(E log V)',
      explanation: '각 간선을 최대 한 번 힙에 삽입/삭제하며, 힙의 크기는 최대 V이므로 O(E log V)입니다.',
    },
    {
      id: 'prim-q2',
      type: 'fill-blank',
      question: '프림 알고리즘은 ___ 알고리즘과 구조가 유사하지만, 거리 갱신 대신 간선 가중치 자체를 비교한다.',
      answer: '다익스트라',
      explanation: '프림과 다익스트라 모두 우선순위 큐에서 최솟값을 꺼내 확장하는 구조입니다. 다익스트라는 시작점으로부터의 누적 거리를, 프림은 간선 가중치 자체를 기준으로 합니다.',
    },
    {
      id: 'prim-q3',
      type: 'fill-blank',
      question: '최소 신장 트리의 간선 수는 항상 ___개이다.',
      answer: 'V-1',
      explanation: '신장 트리는 V개의 정점을 모두 포함하는 트리이므로, 간선의 수는 항상 V-1개입니다.',
    },
  ],
}
