import type { Category } from '../../types/algorithm'

export const hashCategory: Category = {
  id: 'hash',
  name: '해시',
  icon: '#️⃣',
  description: '해시 테이블을 활용한 빠른 탐색과 집계 패턴을 학습합니다. O(1) 평균 시간복잡도로 데이터를 저장하고 조회할 수 있습니다.',
  patterns: [
    {
      id: 'hash-map',
      name: '해시맵 (딕셔너리)',
      description: '키-값 쌍으로 데이터를 저장하여 O(1)에 조회, 삽입, 삭제를 수행합니다. 두 수의 합, 아나그램 판별 등 다양한 문제에 활용됩니다.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(n)',
      keyInsight: '배열을 순회하면서 "이전에 본 값"을 해시맵에 저장하면 이중 반복문 없이 O(n)에 원하는 쌍을 찾을 수 있습니다.',
      tools: [
        {
          name: 'dict',
          description: '해시맵 자료형으로 O(1) 평균 시간에 조회/삽입/삭제를 수행합니다. get(), setdefault(), items() 메서드를 자주 사용합니다.',
          import: '내장 자료형',
        },
        {
          name: 'collections.defaultdict',
          description: '존재하지 않는 키 접근 시 기본값을 자동 생성하여 KeyError를 방지합니다. defaultdict(list), defaultdict(int) 등으로 초기화합니다.',
          import: 'from collections import defaultdict',
        },
      ],
      codeExamples: [
        {
          title: '두 수의 합 (Two Sum)',
          code: `def two_sum(nums: list[int], target: int) -> list[int]:
    seen = {}  # 값 -> 인덱스 매핑
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []

# 예시
print(two_sum([2, 7, 11, 15], 9))  # [0, 1]
print(two_sum([3, 2, 4], 6))       # [1, 2]`,
          explanation: '배열을 한 번 순회하면서 각 원소의 보수(target - num)가 해시맵에 있는지 확인합니다. 없으면 현재 값과 인덱스를 저장하고, 있으면 두 인덱스를 반환합니다.',
        },
        {
          title: '아나그램 그룹화',
          code: `from collections import defaultdict

def group_anagrams(strs: list[str]) -> list[list[str]]:
    groups = defaultdict(list)
    for s in strs:
        key = tuple(sorted(s))  # 정렬된 문자열을 키로 사용
        groups[key].append(s)
    return list(groups.values())

# 예시
words = ["eat", "tea", "tan", "ate", "nat", "bat"]
print(group_anagrams(words))
# [["eat", "tea", "ate"], ["tan", "nat"], ["bat"]]`,
          explanation: '각 문자열을 정렬한 결과를 해시맵의 키로 사용하면, 같은 문자 구성을 가진 단어들이 자연스럽게 그룹화됩니다.',
        },
      ],
      commonProblems: [
        { name: 'Two Sum', platform: 'leetcode', id: '1', slug: 'two-sum', difficulty: 'Easy' },
        { name: 'Group Anagrams', platform: 'leetcode', id: '49', slug: 'group-anagrams', difficulty: 'Medium' },
        { name: 'Contains Duplicate', platform: 'leetcode', id: '217', slug: 'contains-duplicate', difficulty: 'Easy' },
        { name: '서로 다른 부분 문자열의 개수', platform: 'boj', id: '11478' },
        { name: '가장 긴 연속 수열', platform: 'boj', id: '1753' },
        { name: '부분 배열의 합이 K인 경우의 수', platform: 'boj', id: '2015' },
      ],
      tips: [
        'defaultdict를 사용하면 키 존재 여부를 확인하지 않아도 됩니다.',
        '해시맵의 키로 리스트는 사용할 수 없으므로 tuple로 변환하세요.',
        '값을 찾는 문제에서 이중 반복문이 보이면 해시맵으로 O(n)에 해결할 수 있는지 확인하세요.',
      ],
    },
    {
      id: 'hash-set',
      name: '해시셋',
      description: '중복 없는 값의 집합을 O(1)에 조회합니다. 존재 여부 확인, 중복 제거, 교집합/합집합 연산에 효과적입니다.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(n)',
      keyInsight: '리스트에서 특정 값의 존재 여부를 반복적으로 확인해야 할 때, set으로 변환하면 O(n)에서 O(1)로 조회 시간을 줄일 수 있습니다.',
      tools: [
        {
          name: 'set',
          description: 'O(1) 평균 시간에 in 연산과 중복 제거를 수행합니다. add(), discard(), union(), intersection() 등 집합 연산을 지원합니다.',
          import: '내장 자료형',
        },
        {
          name: 'frozenset',
          description: '불변(immutable) 집합으로 딕셔너리 키나 다른 set의 원소로 사용할 수 있습니다. 해시 가능한 집합이 필요할 때 활용합니다.',
          import: '내장 자료형',
        },
      ],
      codeExamples: [
        {
          title: '가장 긴 연속 수열',
          code: `def longest_consecutive(nums: list[int]) -> int:
    num_set = set(nums)
    max_length = 0

    for num in num_set:
        # 수열의 시작점인 경우만 탐색 (num-1이 없을 때)
        if num - 1 not in num_set:
            current = num
            length = 1
            while current + 1 in num_set:
                current += 1
                length += 1
            max_length = max(max_length, length)

    return max_length

# 예시
print(longest_consecutive([100, 4, 200, 1, 3, 2]))  # 4 (1,2,3,4)
print(longest_consecutive([0, 3, 7, 2, 5, 8, 4, 6, 0, 1]))  # 9`,
          explanation: 'set에서 수열의 시작점(num-1이 없는 수)만 찾아 연속 수열을 확장합니다. 각 원소는 최대 한 번만 방문하므로 전체 O(n)입니다.',
        },
      ],
      commonProblems: [
        { name: 'Contains Duplicate', platform: 'leetcode', id: '217', slug: 'contains-duplicate', difficulty: 'Easy' },
        { name: '가장 긴 연속 수열', platform: 'boj', id: '1753' },
        { name: '배열에서 중복 찾기', platform: 'boj', id: '10815' },
        { name: '두 배열의 교집합', platform: 'boj', id: '2Remove' },
        { name: '행복한 수 판별', platform: 'boj', id: '10872' },
      ],
      tips: [
        'in 연산자는 list에서 O(n), set에서 O(1)입니다.',
        'set은 순서를 보장하지 않으므로 순서가 필요하면 별도로 관리하세요.',
        'frozenset을 사용하면 set을 딕셔너리 키나 다른 set의 원소로 사용할 수 있습니다.',
      ],
    },
    {
      id: 'counting',
      name: '카운팅 (빈도수 계산)',
      description: '원소의 등장 횟수를 해시맵으로 세어 빈도 기반 문제를 해결합니다. Counter 클래스를 활용하면 간결하게 구현할 수 있습니다.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(n)',
      keyInsight: 'Counter를 활용하면 빈도수 기반 정렬, 상위 K개 추출, 빈도수 비교 등을 간결하게 처리할 수 있습니다.',
      tools: [
        {
          name: 'collections.Counter',
          description: '이터러블의 원소 빈도수를 자동으로 세어줍니다. most_common(k)로 상위 k개 추출, Counter끼리 +/- 연산이 가능합니다.',
          import: 'from collections import Counter',
        },
        {
          name: 'collections.defaultdict(int)',
          description: '수동 카운팅 시 기본값 0을 자동 제공하여 키 존재 여부 확인 없이 바로 += 연산이 가능합니다.',
          import: 'from collections import defaultdict',
        },
      ],
      codeExamples: [
        {
          title: '상위 K개 빈출 원소',
          code: `from collections import Counter

def top_k_frequent(nums: list[int], k: int) -> list[int]:
    count = Counter(nums)
    return [num for num, _ in count.most_common(k)]

# 예시
print(top_k_frequent([1, 1, 1, 2, 2, 3], 2))  # [1, 2]
print(top_k_frequent([1], 1))                   # [1]`,
          explanation: 'Counter로 빈도수를 센 뒤 most_common(k)로 가장 많이 등장한 k개의 원소를 추출합니다.',
        },
        {
          title: '버킷 정렬을 이용한 빈도수 정렬',
          code: `from collections import Counter

def frequency_sort(s: str) -> str:
    count = Counter(s)
    # 빈도수를 인덱스로 하는 버킷 생성
    buckets = [[] for _ in range(len(s) + 1)]
    for char, freq in count.items():
        buckets[freq].append(char)

    result = []
    for freq in range(len(s), 0, -1):
        for char in buckets[freq]:
            result.append(char * freq)
    return ''.join(result)

# 예시
print(frequency_sort("tree"))    # "eert" 또는 "eetr"
print(frequency_sort("cccaaa"))  # "cccaaa" 또는 "aaaccc"`,
          explanation: '빈도수를 인덱스로 사용하는 버킷 배열을 만들어 O(n) 시간에 빈도수 기준 내림차순 정렬을 수행합니다.',
        },
      ],
      commonProblems: [
        { name: 'Top K Frequent Elements', platform: 'leetcode', id: '347', slug: 'top-k-frequent-elements', difficulty: 'Medium' },
        { name: 'Valid Anagram', platform: 'leetcode', id: '242', slug: 'valid-anagram', difficulty: 'Easy' },
        { name: '빈도수 기준 문자열 정렬', platform: 'boj', id: '1181' },
        { name: '과반수 원소 찾기', platform: 'boj', id: '2108' },
        { name: '문자열에서 첫 번째 고유 문자 찾기', platform: 'boj', id: '9012' },
      ],
      tips: [
        'Counter는 딕셔너리의 서브클래스이므로 모든 딕셔너리 메서드를 사용할 수 있습니다.',
        'Counter끼리 +, - 연산이 가능하여 빈도수를 합치거나 차이를 구할 수 있습니다.',
        'most_common()에 인자를 주지 않으면 전체를 빈도순으로 반환합니다.',
      ],
    },
  ],
}
