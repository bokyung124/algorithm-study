import type { Category } from '../../types/algorithm'

export const stringCategory: Category = {
  id: 'string',
  name: '문자열',
  icon: '📝',
  description: '문자열 검색, 패턴 매칭, 접두사 트리 등 문자열 처리를 위한 고급 알고리즘 패턴을 학습합니다.',
  patterns: [
    {
      id: 'kmp',
      name: 'KMP 알고리즘',
      description: '실패 함수(접두사 함수)를 전처리하여 텍스트에서 패턴을 O(n+m)에 찾는 알고리즘입니다. 불일치 시 처음부터 다시 비교하지 않고 건너뜁니다.',
      timeComplexity: 'O(n + m)',
      spaceComplexity: 'O(m)',
      keyInsight: '실패 함수 pi[i]는 패턴의 0~i 부분 문자열에서 접두사와 접미사가 일치하는 최대 길이입니다. 불일치 시 이 값만큼 건너뛰어 불필요한 비교를 제거합니다.',
      pythonTools: [
        {
          name: 'list',
          description: '실패 함수(LPS) 테이블을 저장하는 배열로 사용합니다. [0] * m으로 초기화하여 패턴 길이만큼 생성합니다.',
          import: '내장 자료형',
        },
        {
          name: 'str',
          description: '문자열 인덱싱과 비교 연산을 활용합니다. str[i]로 개별 문자 접근, == 연산자로 부분 문자열 비교가 가능합니다.',
          import: '내장 자료형',
        },
      ],
      codeExamples: [
        {
          title: 'KMP 문자열 검색',
          code: `def compute_lps(pattern: str) -> list[int]:
    """실패 함수(LPS: Longest Proper Prefix which is also Suffix) 계산"""
    m = len(pattern)
    lps = [0] * m
    length = 0  # 이전 최장 접두사-접미사 길이
    i = 1

    while i < m:
        if pattern[i] == pattern[length]:
            length += 1
            lps[i] = length
            i += 1
        else:
            if length != 0:
                length = lps[length - 1]  # 건너뛰기
            else:
                lps[i] = 0
                i += 1
    return lps

def kmp_search(text: str, pattern: str) -> list[int]:
    """텍스트에서 패턴이 등장하는 모든 시작 인덱스를 반환"""
    n, m = len(text), len(pattern)
    if m == 0:
        return []

    lps = compute_lps(pattern)
    result = []
    j = 0  # 패턴 인덱스

    for i in range(n):
        while j > 0 and text[i] != pattern[j]:
            j = lps[j - 1]
        if text[i] == pattern[j]:
            j += 1
        if j == m:
            result.append(i - m + 1)
            j = lps[j - 1]

    return result

# 예시
text = "ABABDABACDABABCABAB"
pattern = "ABABCABAB"
print(kmp_search(text, pattern))  # [9]

text2 = "AAAAAA"
pattern2 = "AAA"
print(kmp_search(text2, pattern2))  # [0, 1, 2, 3]`,
          explanation: 'LPS 배열을 전처리한 뒤, 텍스트를 순회하며 불일치 시 LPS 값을 이용해 패턴 인덱스를 건너뜁니다. 각 문자는 최대 2번만 비교하므로 O(n+m)입니다.',
        },
      ],
      commonProblems: [
        { name: 'Find the Index of the First Occurrence in a String', platform: 'leetcode', id: '28', slug: 'find-the-index-of-the-first-occurrence-in-a-string', difficulty: 'Easy' },
        { name: 'Repeated DNA Sequences', platform: 'leetcode', id: '187', slug: 'repeated-dna-sequences', difficulty: 'Medium' },
        { name: '부분 문자열 검색', platform: 'boj', id: '1786' },
        { name: '문자열 주기 찾기', platform: 'boj', id: '1893' },
        { name: '접두사와 접미사가 같은 최대 길이', platform: 'boj', id: '4354' },
        { name: '반복되는 부분 문자열', platform: 'boj', id: '1701' },
      ],
      tips: [
        'LPS 배열 자체가 문제의 답이 되는 경우가 많습니다 (주기, 반복 패턴).',
        '문자열 길이가 10^6 이상이면 KMP를 고려하세요.',
        'Python에서 단순 검색은 in 연산자나 str.find()도 충분히 빠릅니다.',
      ],
    },
    {
      id: 'rabin-karp',
      name: '라빈-카프 알고리즘',
      description: '해시 값을 이용한 롤링 해시 기법으로 문자열 패턴 매칭을 수행합니다. 다중 패턴 검색에 특히 유용합니다.',
      timeComplexity: 'O(n + m) 평균, O(nm) 최악',
      spaceComplexity: 'O(1)',
      keyInsight: '슬라이딩 윈도우로 해시를 갱신하면 O(1)에 새로운 부분 문자열의 해시를 계산할 수 있습니다. 해시 충돌 시에만 실제 비교를 수행합니다.',
      pythonTools: [
        {
          name: 'hash()',
          description: '롤링 해시 개념의 기초가 되는 내장 해시 함수입니다. 실제 구현에서는 다항식 해시를 직접 계산하여 충돌을 제어합니다.',
          import: '내장 함수',
        },
        {
          name: 'pow()',
          description: 'pow(base, exp, mod)로 모듈러 거듭제곱을 O(log n)에 계산합니다. 롤링 해시에서 BASE^(m-1) % MOD 계산에 사용합니다.',
          import: '내장 함수',
        },
      ],
      codeExamples: [
        {
          title: '라빈-카프 문자열 검색',
          code: `def rabin_karp(text: str, pattern: str) -> list[int]:
    """롤링 해시를 이용한 패턴 검색"""
    n, m = len(text), len(pattern)
    if m > n:
        return []

    BASE = 31
    MOD = 10**9 + 7
    result = []

    # 패턴 해시 계산
    pattern_hash = 0
    text_hash = 0
    power = 1  # BASE^(m-1) % MOD

    for i in range(m):
        pattern_hash = (pattern_hash * BASE + ord(pattern[i])) % MOD
        text_hash = (text_hash * BASE + ord(text[i])) % MOD
        if i < m - 1:
            power = (power * BASE) % MOD

    # 슬라이딩 윈도우로 해시 갱신
    for i in range(n - m + 1):
        if text_hash == pattern_hash:
            # 해시 일치 시 실제 문자열 비교 (충돌 방지)
            if text[i:i + m] == pattern:
                result.append(i)

        if i < n - m:
            # 왼쪽 문자 제거, 오른쪽 문자 추가
            text_hash = (text_hash - ord(text[i]) * power) % MOD
            text_hash = (text_hash * BASE + ord(text[i + m])) % MOD
            text_hash = (text_hash + MOD) % MOD  # 음수 방지

    return result

# 예시
print(rabin_karp("abcabcabc", "abc"))  # [0, 3, 6]
print(rabin_karp("hello world", "world"))  # [6]`,
          explanation: '문자열을 다항식 해시로 변환하고, 윈도우를 한 칸 이동할 때마다 O(1)에 해시를 갱신합니다. 해시가 일치하면 실제 비교로 충돌을 검증합니다.',
        },
      ],
      commonProblems: [
        { name: 'Longest Common Prefix', platform: 'leetcode', id: '14', slug: 'longest-common-prefix', difficulty: 'Easy' },
        { name: '부분 문자열 검색', platform: 'boj', id: '1786' },
        { name: '다중 패턴 매칭', platform: 'boj', id: '10266' },
        { name: '가장 긴 공통 부분 문자열 (이진탐색 + 해시)', platform: 'boj', id: '9249' },
        { name: '반복되는 부분 문자열 찾기', platform: 'boj', id: '1701' },
      ],
      tips: [
        'MOD 값은 충분히 큰 소수를 사용하세요 (10^9+7 등).',
        '해시 충돌을 줄이려면 두 개의 다른 MOD를 사용하는 이중 해시를 적용하세요.',
        '음수 해시가 나올 수 있으므로 MOD를 더해준 뒤 다시 MOD를 취하세요.',
      ],
    },
    {
      id: 'trie',
      name: '트라이 (Trie)',
      description: '접두사 트리라고도 하며, 문자열 집합에서 접두사 기반 검색을 O(L)에 수행합니다. 자동완성, 사전 등에 활용됩니다.',
      timeComplexity: 'O(L) (L: 문자열 길이)',
      spaceComplexity: 'O(N * L) (N: 문자열 수)',
      keyInsight: '각 노드가 한 문자를 담당하며, 루트에서 특정 노드까지의 경로가 하나의 접두사를 나타냅니다. 딕셔너리로 자식을 관리하면 구현이 간결합니다.',
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
          title: '트라이 구현 및 활용',
          code: `class TrieNode:
    def __init__(self):
        self.children = {}
        self.is_end = False
        self.count = 0  # 이 접두사를 가진 단어 수

class Trie:
    def __init__(self):
        self.root = TrieNode()

    def insert(self, word: str) -> None:
        node = self.root
        for char in word:
            if char not in node.children:
                node.children[char] = TrieNode()
            node = node.children[char]
            node.count += 1
        node.is_end = True

    def search(self, word: str) -> bool:
        """정확히 일치하는 단어가 있는지 확인"""
        node = self.root
        for char in word:
            if char not in node.children:
                return False
            node = node.children[char]
        return node.is_end

    def starts_with(self, prefix: str) -> bool:
        """해당 접두사로 시작하는 단어가 있는지 확인"""
        node = self.root
        for char in prefix:
            if char not in node.children:
                return False
            node = node.children[char]
        return True

    def count_prefix(self, prefix: str) -> int:
        """해당 접두사를 가진 단어의 수"""
        node = self.root
        for char in prefix:
            if char not in node.children:
                return 0
            node = node.children[char]
        return node.count

# 예시
trie = Trie()
words = ["apple", "app", "application", "banana", "band"]
for w in words:
    trie.insert(w)

print(trie.search("app"))          # True
print(trie.search("ap"))           # False
print(trie.starts_with("app"))     # True
print(trie.count_prefix("app"))    # 3 (apple, app, application)
print(trie.count_prefix("ban"))    # 2 (banana, band)`,
          explanation: '각 문자를 노드로 하는 트리를 구성합니다. insert는 경로를 따라 노드를 생성하고, search/starts_with는 경로를 따라 내려가며 존재를 확인합니다. count는 접두사 기반 집계에 사용됩니다.',
        },
        {
          title: '트라이로 자동완성 구현',
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

    def _find_node(self, prefix: str) -> TrieNode | None:
        node = self.root
        for char in prefix:
            if char not in node.children:
                return None
            node = node.children[char]
        return node

    def _collect_words(self, node: TrieNode, prefix: str,
                       results: list[str], limit: int) -> None:
        if len(results) >= limit:
            return
        if node.is_end:
            results.append(prefix)
        for char in sorted(node.children):  # 사전순
            self._collect_words(
                node.children[char], prefix + char, results, limit
            )

    def suggest(self, prefix: str, limit: int = 5) -> list[str]:
        """접두사에 대한 자동완성 후보를 사전순으로 반환"""
        node = self._find_node(prefix)
        if not node:
            return []
        results = []
        self._collect_words(node, prefix, results, limit)
        return results

# 예시
ac = AutoComplete()
for word in ["python", "pygame", "pytorch", "panda", "pandas"]:
    ac.insert(word)

print(ac.suggest("py", 3))   # ["pygame", "python", "pytorch"]
print(ac.suggest("pan", 3))  # ["panda", "pandas"]
print(ac.suggest("xyz"))     # []`,
          explanation: '접두사에 해당하는 노드를 찾은 뒤, DFS로 하위 모든 완전한 단어를 수집합니다. sorted()로 자식을 순회하면 사전순 결과를 보장합니다.',
        },
      ],
      commonProblems: [
        { name: 'Implement Trie (Prefix Tree)', platform: 'leetcode', id: '208', slug: 'implement-trie-prefix-tree', difficulty: 'Medium' },
        { name: '트라이 구현', platform: 'programmers', id: '60057' },
        { name: '자동완성 시스템', platform: 'boj', id: '14725' },
        { name: '전화번호 목록 (접두사 검사)', platform: 'programmers', id: '42577' },
        { name: 'XOR 최대값 (비트 트라이)', platform: 'boj', id: '13505' },
        { name: '단어 검색 (와일드카드)', platform: 'boj', id: '2711' },
      ],
      tips: [
        '알파벳 소문자만 사용한다면 크기 26의 배열로 자식을 관리하면 더 빠릅니다.',
        '메모리가 제한적이면 딕셔너리 대신 배열 기반 트라이를 사용하세요.',
        'is_end 플래그 외에 count, depth 등 추가 정보를 저장하면 활용도가 높아집니다.',
      ],
    },
    {
      id: 'string-hashing',
      name: '문자열 해싱',
      description: '문자열을 해시값으로 변환하여 O(1)에 비교하는 기법입니다. 롤링 해시를 사용하면 부분 문자열의 해시를 O(1)에 계산할 수 있어 문자열 검색, 중복 부분 문자열 찾기 등에 활용됩니다.',
      timeComplexity: 'O(N) (전처리), O(1) (부분 문자열 해시 쿼리)',
      spaceComplexity: 'O(N)',
      keyInsight: '문자열을 다항식 해시로 변환합니다: hash = s[0]*p^(n-1) + s[1]*p^(n-2) + ... + s[n-1]. 접두사 해시 배열을 미리 구해두면 임의 부분 문자열의 해시를 O(1)에 구할 수 있습니다. 해시 충돌을 줄이려면 이중 해싱을 사용합니다.',
      pythonTools: [
        {
          name: 'pow()',
          description: 'pow(base, exp, mod)로 모듈러 거듭제곱을 O(log N)에 계산합니다.',
          import: '내장 함수',
        },
        {
          name: 'list',
          description: '접두사 해시 배열과 거듭제곱 배열을 미리 계산하여 저장합니다.',
          import: '내장 자료형',
        },
      ],
      codeExamples: [
        {
          title: '롤링 해시 기본 구현',
          code: `MOD = 10**9 + 7
BASE = 31

def build_hash(s: str) -> tuple[list[int], list[int]]:
    """접두사 해시 배열과 거듭제곱 배열을 구축"""
    n = len(s)
    h = [0] * (n + 1)      # h[i] = s[0..i-1]의 해시
    pw = [1] * (n + 1)     # pw[i] = BASE^i % MOD

    for i in range(n):
        h[i + 1] = (h[i] * BASE + ord(s[i])) % MOD
        pw[i + 1] = (pw[i] * BASE) % MOD

    return h, pw

def get_hash(h: list[int], pw: list[int], l: int, r: int) -> int:
    """s[l..r] 부분 문자열의 해시를 O(1)에 반환 (0-indexed, 양끝 포함)"""
    return (h[r + 1] - h[l] * pw[r - l + 1]) % MOD

# 예시
s = "abcabc"
h, pw = build_hash(s)

# s[0..2] = "abc"의 해시
hash1 = get_hash(h, pw, 0, 2)
# s[3..5] = "abc"의 해시
hash2 = get_hash(h, pw, 3, 5)
print(hash1 == hash2)  # True (같은 부분 문자열)

# s[1..3] = "bca"의 해시
hash3 = get_hash(h, pw, 1, 3)
print(hash1 == hash3)  # False (다른 부분 문자열)`,
          explanation: '접두사 해시 배열 h와 거듭제곱 배열 pw를 O(N)에 전처리한 뒤, 임의 부분 문자열 s[l..r]의 해시를 h[r+1] - h[l] * pw[r-l+1] 공식으로 O(1)에 계산합니다.',
        },
        {
          title: '이중 해싱으로 부분 문자열 중복 찾기',
          code: `def longest_duplicate_substring(s: str) -> str:
    """이진 탐색 + 롤링 해시로 가장 긴 중복 부분 문자열 찾기
    참고: BOJ 1786, LeetCode 1044"""
    MOD1 = 10**9 + 7
    MOD2 = 10**9 + 9
    BASE1, BASE2 = 31, 37
    n = len(s)

    def check(length: int) -> str:
        """길이 length인 중복 부분 문자열이 있으면 반환"""
        h1 = h2 = 0
        pw1 = pow(BASE1, length, MOD1)
        pw2 = pow(BASE2, length, MOD2)

        # 첫 윈도우 해시
        for i in range(length):
            h1 = (h1 * BASE1 + ord(s[i])) % MOD1
            h2 = (h2 * BASE2 + ord(s[i])) % MOD2

        seen = {(h1, h2)}

        for i in range(1, n - length + 1):
            h1 = (h1 * BASE1 - ord(s[i - 1]) * pw1 + ord(s[i + length - 1])) % MOD1
            h2 = (h2 * BASE2 - ord(s[i - 1]) * pw2 + ord(s[i + length - 1])) % MOD2
            if (h1, h2) in seen:
                return s[i:i + length]
            seen.add((h1, h2))
        return ""

    lo, hi = 0, n - 1
    result = ""
    while lo <= hi:
        mid = (lo + hi) // 2
        dup = check(mid)
        if dup:
            result = dup
            lo = mid + 1
        else:
            hi = mid - 1
    return result

# 예시
print(longest_duplicate_substring("banana"))  # "ana"`,
          explanation: '이진 탐색으로 중복 부분 문자열의 길이를 결정하고, 각 길이에 대해 롤링 해시로 중복 여부를 확인합니다. 이중 해싱(MOD1, MOD2)으로 해시 충돌을 방지합니다.',
        },
      ],
      commonProblems: [
        { name: '찾기', platform: 'boj', id: '1786' },
        { name: 'Longest Duplicate Substring', platform: 'leetcode', id: '1044', slug: 'longest-duplicate-substring', difficulty: 'Hard' },
        { name: '라면 먹고 싶다', platform: 'boj', id: '15893' },
        { name: 'Repeated DNA Sequences', platform: 'leetcode', id: '187', slug: 'repeated-dna-sequences', difficulty: 'Medium' },
      ],
      tips: [
        '해시 충돌을 방지하려면 이중 해싱(두 개의 다른 MOD 사용)을 권장합니다.',
        'BASE는 문자 종류 수보다 큰 소수를 사용합니다 (영소문자만이면 31, 대소문자+숫자면 131).',
        'Rabin-Karp 패턴 매칭은 롤링 해시의 대표적인 응용입니다.',
        'Python에서는 내장 hash()를 사용하지 말고 직접 구현하세요 (결과가 실행마다 달라짐).',
      ],
    },
  ],
}
