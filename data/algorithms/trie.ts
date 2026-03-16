import type { Category } from '../../types/algorithm'

export const trieCategory: Category = {
  id: 'trie',
  name: '트라이',
  icon: '🔠',
  description: '접두사 트리(Trie)를 활용한 문자열 저장, 검색, 자동완성 등의 패턴을 학습합니다.',
  patterns: [
    {
      id: 'basic-trie',
      name: '기본 트라이',
      description: '문자열 집합을 트리 구조로 저장하여 삽입, 검색, 접두사 확인을 문자열 길이에 비례하는 시간에 수행합니다. 각 노드가 한 문자를 담당하며, 루트에서 특정 노드까지의 경로가 하나의 접두사를 나타냅니다.',
      timeComplexity: 'O(L) per operation (L=문자열 길이)',
      spaceComplexity: 'O(총 문자 수)',
      keyInsight: '딕셔너리로 자식 노드를 관리하면 각 연산(insert, search, startsWith)이 문자열 길이 L에만 비례합니다. is_end 플래그로 완전한 단어의 끝을 표시합니다.',
      pythonTools: [
        {
          name: 'dict',
          description: '각 트라이 노드의 자식을 딕셔너리로 표현합니다. children[char]로 자식 노드에 접근하며, in 연산자로 자식 존재 여부를 O(1)에 확인합니다.',
          import: '내장 자료형',
        },
        {
          name: 'collections.defaultdict',
          description: 'defaultdict(TrieNode)로 자식 노드를 자동 초기화하여 존재 여부 확인 없이 바로 접근할 수 있습니다.',
          import: 'from collections import defaultdict',
        },
      ],
      codeExamples: [
        {
          title: '트라이 클래스 구현 (insert, search, startsWith)',
          code: `class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_end = False

class Trie:
    def __init__(self):
        self.root = TrieNode()

    def insert(self, word: str) -> None:
        """단어를 트라이에 삽입"""
        node = self.root
        for char in word:
            if char not in node.children:
                node.children[char] = TrieNode()
            node = node.children[char]
        node.is_end = True

    def search(self, word: str) -> bool:
        """정확히 일치하는 단어가 있는지 확인"""
        node = self.root
        for char in word:
            if char not in node.children:
                return False
            node = node.children[char]
        return node.is_end

    def startsWith(self, prefix: str) -> bool:
        """해당 접두사로 시작하는 단어가 있는지 확인"""
        node = self.root
        for char in prefix:
            if char not in node.children:
                return False
            node = node.children[char]
        return True

# 예시
trie = Trie()
trie.insert("apple")
trie.insert("app")
print(trie.search("apple"))      # True
print(trie.search("app"))        # True
print(trie.search("ap"))         # False
print(trie.startsWith("app"))    # True
print(trie.startsWith("ban"))    # False`,
          explanation: 'insert는 문자를 하나씩 따라가며 없는 노드를 생성하고, 마지막에 is_end를 True로 설정합니다. search는 경로를 따라간 뒤 is_end를 확인하고, startsWith는 경로 존재 여부만 확인합니다.',
        },
      ],
      commonProblems: [
        { name: 'Implement Trie (Prefix Tree)', platform: 'leetcode', id: '208', slug: 'implement-trie-prefix-tree', difficulty: 'Medium' },
        { name: '전화번호 목록', platform: 'boj', id: '5052' },
        { name: 'Longest Common Prefix', platform: 'leetcode', id: '14', slug: 'longest-common-prefix', difficulty: 'Easy' },
      ],
      tips: [
        '알파벳 소문자만 사용한다면 크기 26의 배열로 자식을 관리하면 더 빠릅니다.',
        'is_end 플래그 외에 count 등 추가 정보를 저장하면 활용도가 높아집니다.',
        '메모리가 제한적이면 딕셔너리 대신 배열 기반 트라이를 사용하세요.',
      ],
    },
    {
      id: 'autocomplete',
      name: '자동완성/접두사 검색',
      description: '트라이에서 주어진 접두사로 시작하는 모든 단어를 효율적으로 찾아 자동완성 후보를 제공합니다. 접두사 노드까지 이동한 뒤 DFS로 하위 단어를 수집합니다.',
      timeComplexity: 'O(L + K) (L=접두사 길이, K=결과 수)',
      spaceComplexity: 'O(총 문자 수)',
      keyInsight: '접두사에 해당하는 노드를 O(L)에 찾은 뒤, 그 하위 트리를 DFS로 탐색하여 is_end인 노드까지의 경로를 모두 수집합니다. sorted()로 자식을 순회하면 사전순 결과를 보장합니다.',
      pythonTools: [
        {
          name: 'dict',
          description: '트라이 노드의 자식을 저장합니다. sorted(node.children)으로 사전순 탐색이 가능합니다.',
          import: '내장 자료형',
        },
        {
          name: 'sorted()',
          description: '자식 키를 정렬하여 사전순으로 자동완성 후보를 생성합니다.',
          import: '내장 함수',
        },
      ],
      codeExamples: [
        {
          title: '트라이 기반 자동완성 구현',
          code: `class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_end = False

class AutoComplete:
    def __init__(self):
        self.root = TrieNode()

    def insert(self, word: str) -> None:
        node = self.root
        for char in word:
            if char not in node.children:
                node.children[char] = TrieNode()
            node = node.children[char]
        node.is_end = True

    def _find_node(self, prefix: str):
        """접두사에 해당하는 노드를 찾아 반환"""
        node = self.root
        for char in prefix:
            if char not in node.children:
                return None
            node = node.children[char]
        return node

    def _collect_words(self, node, prefix: str,
                       results: list, limit: int) -> None:
        """DFS로 하위의 모든 완전한 단어를 수집"""
        if len(results) >= limit:
            return
        if node.is_end:
            results.append(prefix)
        for char in sorted(node.children):
            self._collect_words(
                node.children[char], prefix + char, results, limit
            )

    def suggest(self, prefix: str, limit: int = 5) -> list:
        """접두사에 대한 자동완성 후보를 사전순으로 반환"""
        node = self._find_node(prefix)
        if not node:
            return []
        results = []
        self._collect_words(node, prefix, results, limit)
        return results

# 예시
ac = AutoComplete()
for word in ["apple", "app", "application", "banana", "band"]:
    ac.insert(word)

print(ac.suggest("app", 3))   # ["app", "apple", "application"]
print(ac.suggest("ban", 3))   # ["banana", "band"]
print(ac.suggest("xyz"))      # []`,
          explanation: '접두사 노드를 찾은 뒤 DFS로 하위 모든 완전한 단어를 수집합니다. limit 파라미터로 결과 수를 제한하고, sorted()로 사전순 결과를 보장합니다.',
        },
      ],
      commonProblems: [
        { name: 'Search Suggestions System', platform: 'leetcode', id: '1268', slug: 'search-suggestions-system', difficulty: 'Medium' },
        { name: '개미굴', platform: 'boj', id: '14725' },
        { name: '자동완성', platform: 'programmers', id: '17685' },
      ],
      tips: [
        'limit을 설정하면 불필요한 탐색을 조기에 종료할 수 있습니다.',
        '빈번한 자동완성 요청이 있다면 각 노드에 상위 K개 추천 단어를 캐싱하는 방법도 있습니다.',
        '사전순이 아닌 빈도순 정렬이 필요하면 노드에 빈도 정보를 추가하세요.',
      ],
    },
  ],
}
