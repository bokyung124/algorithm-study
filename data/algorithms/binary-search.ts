import type { Category } from '../../types/algorithm'

export const binarySearchCategory: Category = {
  id: 'binary-search',
  name: '이진탐색',
  icon: '🎯',
  description: '정렬된 데이터에서 O(log n)에 원하는 값을 찾거나, 조건을 만족하는 최적의 답을 탐색하는 패턴을 학습합니다.',
  patterns: [
    {
      id: 'lower-bound',
      name: '하한 (Lower Bound)',
      description: '정렬된 배열에서 특정 값 이상인 첫 번째 위치를 찾습니다. bisect_left와 동일한 동작으로, 삽입 위치나 경계값을 구할 때 핵심이 됩니다.',
      timeComplexity: 'O(log n)',
      spaceComplexity: 'O(1)',
      keyInsight: 'lo는 항상 "조건 미달" 영역, hi는 항상 "조건 충족" 영역을 가리키도록 유지하면 반복문 종료 시 lo가 정확한 경계를 가리킵니다.',
      pythonTools: [
        {
          name: 'bisect.bisect_left',
          description: '정렬된 리스트에서 값이 삽입될 가장 왼쪽 위치를 O(log n)에 반환합니다. Lower Bound와 동일한 동작입니다.',
          import: 'from bisect import bisect_left',
        },
      ],
      codeExamples: [
        {
          title: 'Lower Bound 직접 구현',
          code: `def lower_bound(arr: list[int], target: int) -> int:
    """target 이상인 첫 번째 인덱스를 반환"""
    lo, hi = 0, len(arr)
    while lo < hi:
        mid = (lo + hi) // 2
        if arr[mid] < target:
            lo = mid + 1
        else:
            hi = mid
    return lo

# 예시
arr = [1, 2, 4, 4, 4, 7, 9]
print(lower_bound(arr, 4))   # 2 (첫 번째 4의 인덱스)
print(lower_bound(arr, 5))   # 5 (5 이상인 첫 번째 값 7의 인덱스)
print(lower_bound(arr, 10))  # 7 (배열 길이, 없음)`,
          explanation: 'arr[mid] < target이면 mid 이하는 모두 target 미만이므로 lo를 mid+1로 이동합니다. 그렇지 않으면 mid가 답이 될 수 있으므로 hi를 mid로 설정합니다.',
        },
        {
          title: 'bisect 모듈 활용',
          code: `from bisect import bisect_left, bisect_right

def count_occurrences(arr: list[int], target: int) -> int:
    """정렬된 배열에서 target의 개수를 O(log n)에 구함"""
    left = bisect_left(arr, target)
    right = bisect_right(arr, target)
    return right - left

def find_closest(arr: list[int], target: int) -> int:
    """정렬된 배열에서 target에 가장 가까운 값을 반환"""
    pos = bisect_left(arr, target)
    if pos == 0:
        return arr[0]
    if pos == len(arr):
        return arr[-1]
    before, after = arr[pos - 1], arr[pos]
    return before if target - before <= after - target else after

# 예시
arr = [1, 2, 4, 4, 4, 7, 9]
print(count_occurrences(arr, 4))  # 3
print(find_closest(arr, 5))       # 4`,
          explanation: 'bisect_left는 target 이상인 첫 인덱스, bisect_right는 target 초과인 첫 인덱스를 반환합니다. 차이가 곧 target의 개수입니다.',
        },
      ],
      commonProblems: [
        { name: 'Search Insert Position', platform: 'leetcode', id: '35', slug: 'search-insert-position', difficulty: 'Easy' },
        { name: 'Find First and Last Position', platform: 'leetcode', id: '34', slug: 'find-first-and-last-position-of-element-in-sorted-array', difficulty: 'Medium' },
        { name: '정렬된 배열에서 특정 값의 개수 세기', platform: 'boj', id: '10816' },
        { name: '가장 가까운 값 찾기', platform: 'boj', id: '2417' },
      ],
      tips: [
        'bisect_left(arr, x)는 x 이상인 첫 위치, bisect_right(arr, x)는 x 초과인 첫 위치입니다.',
        'lo, hi 범위를 [lo, hi) 반개구간으로 설정하면 경계 처리가 깔끔합니다.',
        'while lo < hi 조건에서 종료 시 lo == hi가 보장됩니다.',
      ],
    },
    {
      id: 'upper-bound',
      name: '상한 (Upper Bound)',
      description: '정렬된 배열에서 특정 값을 초과하는 첫 번째 위치를 찾습니다. Lower Bound와 함께 범위 쿼리의 기본이 됩니다.',
      timeComplexity: 'O(log n)',
      spaceComplexity: 'O(1)',
      keyInsight: 'Upper Bound는 target 이하인 마지막 원소 바로 다음 위치입니다. Lower Bound와 조합하면 특정 범위 [a, b]에 속하는 원소의 개수를 O(log n)에 구할 수 있습니다.',
      pythonTools: [
        {
          name: 'bisect.bisect_right',
          description: '정렬된 리스트에서 값이 삽입될 가장 오른쪽 위치를 O(log n)에 반환합니다. Upper Bound와 동일한 동작입니다.',
          import: 'from bisect import bisect_right',
        },
      ],
      codeExamples: [
        {
          title: 'Upper Bound 구현과 범위 쿼리',
          code: `def upper_bound(arr: list[int], target: int) -> int:
    """target 초과인 첫 번째 인덱스를 반환"""
    lo, hi = 0, len(arr)
    while lo < hi:
        mid = (lo + hi) // 2
        if arr[mid] <= target:
            lo = mid + 1
        else:
            hi = mid
    return lo

def count_in_range(arr: list[int], lo_val: int, hi_val: int) -> int:
    """정렬된 배열에서 [lo_val, hi_val] 범위에 속하는 원소의 개수"""
    from bisect import bisect_left, bisect_right
    return bisect_right(arr, hi_val) - bisect_left(arr, lo_val)

# 예시
arr = [1, 2, 4, 4, 4, 7, 9]
print(upper_bound(arr, 4))          # 5 (7의 인덱스)
print(count_in_range(arr, 2, 7))    # 5 (2,4,4,4,7)`,
          explanation: 'arr[mid] <= target이면 lo를 mid+1로 이동하여 target을 초과하는 첫 위치를 찾습니다. count_in_range는 상한과 하한의 차이로 구간 내 원소 수를 셉니다.',
        },
      ],
      commonProblems: [
        { name: '특정 범위 내 원소 개수 세기', platform: 'boj', id: '10816' },
        { name: '중복 원소가 있는 배열에서 경계 찾기', platform: 'boj', id: '1920' },
        { name: '좌표 압축', platform: 'boj', id: '18870' },
        { name: '구간에 속하는 데이터 쿼리', platform: 'boj', id: '2230' },
      ],
      tips: [
        'Lower Bound와 Upper Bound의 차이는 조건문에서 = 포함 여부뿐입니다.',
        '범위 [a, b]에 속하는 원소 수 = upper_bound(b) - lower_bound(a) 입니다.',
        'Python bisect 모듈의 bisect_right가 Upper Bound와 동일합니다.',
      ],
    },
    {
      id: 'answer-binary-search',
      name: '매개변수 탐색 (답 이진탐색)',
      description: '최적화 문제에서 "답을 미리 정하고 가능한지 확인"하는 방식으로 이진탐색을 적용합니다. 결정 문제로 변환하는 것이 핵심입니다.',
      timeComplexity: 'O(n log X) (X는 탐색 범위)',
      spaceComplexity: 'O(1)',
      keyInsight: '"최솟값의 최댓값" 또는 "최댓값의 최솟값" 형태의 문제는 답을 고정하고 조건 충족 여부를 판단하는 결정 함수를 만들어 이진탐색합니다.',
      pythonTools: [
        {
          name: 'bisect',
          description: '결정 함수와 조합하여 정렬된 탐색 공간에서 경계값을 찾는 패턴에 활용합니다. bisect_left/bisect_right로 커스텀 조건의 경계를 탐색할 수 있습니다.',
          import: 'from bisect import bisect_left, bisect_right',
        },
      ],
      codeExamples: [
        {
          title: '나무 자르기 (나무의 높이 결정)',
          code: `def cut_trees(trees: list[int], required: int) -> int:
    """절단기 높이를 최대화하면서 required 이상의 나무를 얻는 문제"""
    def can_get_enough(height: int) -> bool:
        total = sum(max(0, t - height) for t in trees)
        return total >= required

    lo, hi = 0, max(trees)
    result = 0
    while lo <= hi:
        mid = (lo + hi) // 2
        if can_get_enough(mid):
            result = mid   # 가능하면 높이를 더 올려봄
            lo = mid + 1
        else:
            hi = mid - 1   # 불가능하면 높이를 낮춤
    return result

# 예시: 나무 높이 [20, 15, 10, 17], 필요한 나무 7m
print(cut_trees([20, 15, 10, 17], 7))  # 15`,
          explanation: '절단기 높이(답)를 이진탐색합니다. 특정 높이로 잘랐을 때 충분한 나무를 얻을 수 있는지 판별하는 결정 함수를 만들고, 가능한 최대 높이를 찾습니다.',
        },
        {
          title: '랜선 자르기',
          code: `def cut_lan_cables(cables: list[int], n: int) -> int:
    """N개의 같은 길이 랜선을 만들 때 최대 길이를 구함"""
    def can_make(length: int) -> bool:
        count = sum(c // length for c in cables)
        return count >= n

    lo, hi = 1, max(cables)
    result = 0
    while lo <= hi:
        mid = (lo + hi) // 2
        if can_make(mid):
            result = mid
            lo = mid + 1
        else:
            hi = mid - 1
    return result

# 예시: 랜선 길이 [802, 743, 457, 539], 11개 필요
print(cut_lan_cables([802, 743, 457, 539], 11))  # 200`,
          explanation: '랜선 길이(답)를 이진탐색합니다. 특정 길이로 잘랐을 때 N개 이상 만들 수 있는지 판별하고, 가능한 최대 길이를 구합니다.',
        },
      ],
      commonProblems: [
        { name: 'Koko Eating Bananas', platform: 'leetcode', id: '875', slug: 'koko-eating-bananas', difficulty: 'Medium' },
        { name: 'Capacity To Ship Packages', platform: 'leetcode', id: '1011', slug: 'capacity-to-ship-packages-within-d-days', difficulty: 'Medium' },
        { name: '나무 자르기', platform: 'boj', id: '2805' },
        { name: '랜선 자르기', platform: 'boj', id: '1654' },
        { name: '공유기 설치', platform: 'boj', id: '2110' },
        { name: '예산 배정', platform: 'boj', id: '2512' },
        { name: '입국심사', platform: 'programmers', id: '43238' },
      ],
      tips: [
        '"최솟값의 최댓값", "최댓값의 최솟값" 키워드가 보이면 매개변수 탐색을 의심하세요.',
        '결정 함수(can_xxx)를 먼저 설계하고, 이진탐색 범위를 정하는 순서로 접근하세요.',
        '실수 범위 이진탐색은 while hi - lo > 1e-9 같은 조건이나 고정 횟수 반복(100회)을 사용합니다.',
      ],
    },
  ],
}
