import type { QuizQuestion } from '../../types/quiz'

export const trieQuizzes: Record<string, QuizQuestion[]> = {
  'basic-trie': [
    {
      id: 'basic-trie-q1',
      type: 'complexity-match',
      question: '트라이에서 길이 L인 문자열을 삽입하는 시간복잡도는?',
      options: ['O(1)', 'O(L)', 'O(N)', 'O(N * L)'],
      answer: 'O(L)',
      explanation: '문자열의 각 문자를 하나씩 따라가며 노드를 생성하므로, 문자열 길이 L에 비례하는 O(L)입니다.',
    },
    {
      id: 'basic-trie-q2',
      type: 'output-prediction',
      question: `다음 코드의 출력은?\n\ntrie = Trie()\ntrie.insert("apple")\ntrie.insert("app")\nprint(trie.search("app"), trie.search("ap"), trie.startsWith("ap"))`,
      options: ['True True True', 'True False True', 'False False True', 'True False False'],
      answer: 'True False True',
      explanation: '"app"은 삽입되어 is_end=True이므로 search("app")=True. "ap"는 삽입되지 않아 is_end=False이므로 search("ap")=False. "ap"는 접두사로 존재하므로 startsWith("ap")=True.',
    },
    {
      id: 'basic-trie-q3',
      type: 'fill-blank',
      question: '트라이에서 단어의 끝을 표시하기 위해 각 노드에 ___ 플래그를 사용한다.',
      answer: 'is_end',
      explanation: 'is_end(또는 is_word) 플래그가 True인 노드는 루트부터 해당 노드까지의 경로가 완전한 단어임을 나타냅니다. 이것이 없으면 search와 startsWith를 구분할 수 없습니다.',
    },
  ],
  'autocomplete': [
    {
      id: 'autocomplete-q1',
      type: 'complexity-match',
      question: '트라이에서 길이 L인 접두사로 시작하는 K개의 결과를 찾는 시간복잡도는?',
      options: ['O(L)', 'O(K)', 'O(L + K)', 'O(N * L)'],
      answer: 'O(L + K)',
      explanation: '접두사 노드까지 이동하는 데 O(L), 하위 트리에서 K개의 결과를 수집하는 데 O(K)가 소요되어 총 O(L + K)입니다.',
    },
    {
      id: 'autocomplete-q2',
      type: 'output-prediction',
      question: `다음 코드의 출력은?\n\nac = AutoComplete()\nfor w in ["cat", "car", "card", "care", "bat"]:\n    ac.insert(w)\nprint(ac.suggest("car", 3))`,
      options: ['["car"]', '["car", "card", "care"]', '["card", "care", "car"]', '["car", "care", "card"]'],
      answer: '["car", "card", "care"]',
      explanation: '"car" 노드까지 이동한 뒤 DFS로 탐색합니다. "car" 자체가 is_end이므로 먼저 추가되고, sorted()로 자식을 순회하여 "card", "care" 순으로 사전순 결과를 반환합니다.',
    },
    {
      id: 'autocomplete-q3',
      type: 'fill-blank',
      question: '자동완성에서 사전순 결과를 보장하려면 자식 노드를 탐색할 때 ___ 함수를 사용해 키를 정렬한다.',
      answer: 'sorted()',
      explanation: 'sorted(node.children)으로 자식 키를 알파벳 순으로 정렬하여 DFS를 수행하면, 결과가 자동으로 사전순이 됩니다.',
    },
  ],
}
