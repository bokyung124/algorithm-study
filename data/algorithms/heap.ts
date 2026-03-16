import type { Category } from '../../types/algorithm'

export const heapCategory: Category = {
  id: 'heap',
  name: '힙 / 우선순위 큐',
  icon: '🏔️',
  description: '힙 자료구조와 우선순위 큐를 활용한 알고리즘 패턴을 학습합니다. 최솟값/최댓값을 O(log N)에 추출하여 코딩 테스트에서 자주 출제되는 Top-K, 중앙값 문제를 효율적으로 해결할 수 있습니다.',
  patterns: [
    {
      id: 'heap-basic',
      name: '기본 힙 연산',
      description: 'heappush, heappop, heapify 등 힙의 기본 연산을 활용합니다. Python의 heapq 모듈은 최소 힙을 제공하며, 최대 힙은 부호를 반전하여 구현합니다.',
      timeComplexity: 'O(log N)',
      spaceComplexity: 'O(N)',
      keyInsight: 'heapq는 최소 힙만 지원하므로 최대 힙이 필요할 때는 값에 -1을 곱하여 삽입하고 꺼낼 때 다시 -1을 곱합니다.',
      pythonTools: [
        {
          name: 'heapq',
          description: '최소 힙을 제공하는 모듈입니다. heappush(), heappop(), heapify(), nsmallest(), nlargest() 함수를 제공합니다.',
          import: 'import heapq',
        },
        {
          name: 'heapq.heapify',
          description: '리스트를 O(N) 시간에 힙으로 변환합니다. 원본 리스트를 제자리에서 변환합니다.',
          import: 'import heapq',
        },
      ],
      codeExamples: [
        {
          title: '최소 힙 기본 연산',
          code: `import heapq

# 빈 리스트에 원소 삽입
heap = []
heapq.heappush(heap, 5)
heapq.heappush(heap, 3)
heapq.heappush(heap, 7)
heapq.heappush(heap, 1)
print(heap)  # [1, 3, 7, 5]

# 최솟값 추출
print(heapq.heappop(heap))  # 1
print(heapq.heappop(heap))  # 3

# 리스트를 힙으로 변환
arr = [5, 3, 8, 1, 4, 2]
heapq.heapify(arr)
print(arr)  # [1, 3, 2, 5, 4, 8]`,
          explanation: 'heappush로 원소를 삽입하면 힙 속성이 유지됩니다. heappop은 항상 최솟값을 반환합니다. heapify는 기존 리스트를 O(N)에 힙으로 변환합니다.',
        },
        {
          title: '최대 힙 구현',
          code: `import heapq

# 최대 힙: 부호 반전을 이용
max_heap = []
for val in [5, 3, 8, 1, 4]:
    heapq.heappush(max_heap, -val)

# 최댓값 추출 (부호 다시 반전)
print(-heapq.heappop(max_heap))  # 8
print(-heapq.heappop(max_heap))  # 5`,
          explanation: '값에 -1을 곱하여 삽입하면 최소 힙이 최대 힙처럼 동작합니다. 꺼낼 때 다시 -1을 곱하면 원래 값을 얻습니다.',
        },
      ],
      commonProblems: [
        { name: '최소 힙', platform: 'boj', id: '1927' },
        { name: '최대 힙', platform: 'boj', id: '11279' },
        { name: 'Kth Largest Element in a Stream', platform: 'leetcode', id: '703', slug: 'kth-largest-element-in-a-stream', difficulty: 'Easy' },
      ],
      tips: [
        'heapq는 최소 힙만 지원합니다. 최대 힙은 -값을 넣어 구현하세요.',
        'heapify()는 O(N)이지만 heappush를 N번 하면 O(N log N)입니다.',
        '힙에서 최솟값 확인만 하려면 heap[0]을 사용하세요 (O(1)).',
      ],
    },
    {
      id: 'top-k',
      name: 'Top-K 문제',
      description: 'N개의 원소에서 가장 크거나 작은 K개의 원소를 효율적으로 찾습니다. 크기 K의 힙을 유지하면 O(N log K)에 해결할 수 있습니다.',
      timeComplexity: 'O(N log K)',
      spaceComplexity: 'O(K)',
      keyInsight: '가장 큰 K개를 찾을 때는 크기 K의 최소 힙을 유지합니다. 새 원소가 힙의 최솟값보다 크면 교체하여 항상 상위 K개만 남깁니다.',
      pythonTools: [
        {
          name: 'heapq.nlargest',
          description: '이터러블에서 가장 큰 N개의 원소를 반환합니다. key 함수를 지정할 수 있습니다.',
          import: 'import heapq',
        },
        {
          name: 'heapq.nsmallest',
          description: '이터러블에서 가장 작은 N개의 원소를 반환합니다. key 함수를 지정할 수 있습니다.',
          import: 'import heapq',
        },
      ],
      codeExamples: [
        {
          title: 'K번째로 큰 원소 찾기',
          code: `import heapq

def find_kth_largest(nums: list[int], k: int) -> int:
    # 크기 K의 최소 힙 유지
    min_heap = nums[:k]
    heapq.heapify(min_heap)

    for num in nums[k:]:
        if num > min_heap[0]:
            heapq.heapreplace(min_heap, num)

    return min_heap[0]  # 힙의 루트가 K번째로 큰 값

# 예시
print(find_kth_largest([3, 2, 1, 5, 6, 4], 2))  # 5
print(find_kth_largest([3, 2, 3, 1, 2, 4, 5, 5, 6], 4))  # 4`,
          explanation: '크기 K의 최소 힙을 유지하면 힙의 루트가 항상 K번째로 큰 값이 됩니다. heapreplace는 pop과 push를 한 번에 수행하여 효율적입니다.',
        },
        {
          title: '빈도수 상위 K개 원소',
          code: `import heapq
from collections import Counter

def top_k_frequent(nums: list[int], k: int) -> list[int]:
    count = Counter(nums)
    # nlargest로 빈도수 상위 K개 추출
    return heapq.nlargest(k, count.keys(), key=count.get)

# 예시
print(top_k_frequent([1, 1, 1, 2, 2, 3], 2))  # [1, 2]
print(top_k_frequent([1], 1))  # [1]`,
          explanation: 'Counter로 빈도수를 구한 뒤 heapq.nlargest로 빈도수 기준 상위 K개를 추출합니다.',
        },
      ],
      commonProblems: [
        { name: 'Top K Frequent Elements', platform: 'leetcode', id: '347', slug: 'top-k-frequent-elements', difficulty: 'Medium' },
        { name: 'Kth Largest Element in an Array', platform: 'leetcode', id: '215', slug: 'kth-largest-element-in-an-array', difficulty: 'Medium' },
        { name: 'K번째 수', platform: 'boj', id: '11004' },
      ],
      tips: [
        'K가 작을 때는 크기 K의 힙이 전체 정렬보다 효율적입니다.',
        'heapq.nlargest와 nsmallest는 내부적으로 힙을 사용합니다.',
        'heapreplace(heap, item)은 heappop + heappush보다 효율적입니다.',
      ],
    },
    {
      id: 'dual-heap',
      name: '이중 힙 (중앙값 찾기)',
      description: '최대 힙과 최소 힙을 함께 사용하여 실시간으로 중앙값을 O(log N)에 구합니다. 데이터 스트림에서 중앙값을 유지해야 하는 문제에 핵심 패턴입니다.',
      timeComplexity: 'O(log N) per operation',
      spaceComplexity: 'O(N)',
      keyInsight: '작은 절반은 최대 힙, 큰 절반은 최소 힙에 저장하면 두 힙의 루트에서 중앙값을 O(1)에 구할 수 있습니다.',
      pythonTools: [
        {
          name: 'heapq (이중 힙)',
          description: '최대 힙(부호 반전)과 최소 힙을 조합하여 중앙값, 이중 우선순위 큐 등을 구현합니다.',
          import: 'import heapq',
        },
      ],
      codeExamples: [
        {
          title: '데이터 스트림의 중앙값',
          code: `import heapq

class MedianFinder:
    def __init__(self):
        self.max_heap = []  # 작은 절반 (부호 반전)
        self.min_heap = []  # 큰 절반

    def add_num(self, num: int):
        # 1. 최대 힙에 삽입
        heapq.heappush(self.max_heap, -num)
        # 2. 최대 힙의 루트를 최소 힙으로 이동
        heapq.heappush(self.min_heap, -heapq.heappop(self.max_heap))
        # 3. 최소 힙이 더 크면 균형 맞추기
        if len(self.min_heap) > len(self.max_heap):
            heapq.heappush(self.max_heap, -heapq.heappop(self.min_heap))

    def find_median(self) -> float:
        if len(self.max_heap) > len(self.min_heap):
            return -self.max_heap[0]
        return (-self.max_heap[0] + self.min_heap[0]) / 2

# 예시
mf = MedianFinder()
for num in [5, 2, 8, 1, 9]:
    mf.add_num(num)
    print(f"{num} 추가 → 중앙값: {mf.find_median()}")
# 5 추가 → 중앙값: 5
# 2 추가 → 중앙값: 3.5
# 8 추가 → 중앙값: 5
# 1 추가 → 중앙값: 3.5
# 9 추가 → 중앙값: 5`,
          explanation: '작은 절반을 최대 힙, 큰 절반을 최소 힙에 저장합니다. 최대 힙의 크기가 같거나 1 크게 유지하면 중앙값은 항상 최대 힙의 루트 또는 두 루트의 평균입니다.',
        },
      ],
      commonProblems: [
        { name: 'Find Median from Data Stream', platform: 'leetcode', id: '295', slug: 'find-median-from-data-stream', difficulty: 'Hard' },
        { name: '가운데를 말해요', platform: 'boj', id: '1655' },
        { name: '이중우선순위큐', platform: 'programmers', id: '42628' },
      ],
      tips: [
        '두 힙의 크기 차이를 항상 0 또는 1로 유지해야 합니다.',
        '삽입 순서: 최대 힙 → 최소 힙으로 이동 → 균형 맞추기 순서를 지키세요.',
        '이 패턴은 슬라이딩 윈도우 중앙값 문제에도 확장할 수 있습니다.',
      ],
    },
  ],
}
