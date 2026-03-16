import type { Category } from '../../types/algorithm'

export const searching: Category = {
  id: 'searching',
  name: '탐색',
  icon: '🔍',
  description:
    '데이터 집합에서 원하는 값을 찾는 알고리즘입니다. 선형 탐색부터 이분 탐색, 매개변수 탐색까지 코딩 테스트에서 핵심적으로 출제됩니다.',
  patterns: [
    {
      id: 'linear-search',
      name: '선형 탐색',
      description:
        '배열의 처음부터 끝까지 순서대로 확인하며 원하는 값을 찾는 가장 기본적인 탐색 알고리즘입니다.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
      keyInsight:
        '정렬되지 않은 데이터에서 사용할 수 있는 가장 기본적인 탐색입니다. 특별한 전처리 없이 바로 적용할 수 있지만, 데이터가 크면 비효율적입니다.',
      pythonTools: [
        {
          name: 'list',
          description:
            'in 연산자로 존재 여부를 확인하고, enumerate()로 인덱스와 값을 동시에 순회합니다.',
          import: '내장 자료형',
        },
        {
          name: 'filter() / 리스트 컴프리헨션',
          description:
            '조건을 만족하는 원소를 걸러낼 때 사용합니다. [x for x in arr if condition(x)] 패턴이 Pythonic합니다.',
          import: '내장 함수',
        },
      ],
      codeExamples: [
        {
          title: '선형 탐색 기본 구현',
          code: `def linear_search(arr, target):
    for i, val in enumerate(arr):
        if val == target:
            return i
    return -1

# 사용 예시
arr = [4, 2, 7, 1, 9, 3]
print(linear_search(arr, 7))   # 2
print(linear_search(arr, 10))  # -1`,
          explanation:
            '배열을 처음부터 순회하면서 target과 일치하는 원소를 찾으면 인덱스를 반환합니다. 찾지 못하면 -1을 반환합니다.',
        },
        {
          title: '조건을 만족하는 모든 원소 찾기',
          code: `def find_all(arr, condition):
    return [x for x in arr if condition(x)]

# 짝수만 찾기
numbers = [1, 2, 3, 4, 5, 6, 7, 8]
evens = find_all(numbers, lambda x: x % 2 == 0)
print(evens)  # [2, 4, 6, 8]

# 특정 범위의 값 찾기
in_range = find_all(numbers, lambda x: 3 <= x <= 6)
print(in_range)  # [3, 4, 5, 6]`,
          explanation:
            '리스트 컴프리헨션을 활용하여 조건을 만족하는 모든 원소를 O(n)에 찾습니다. 코딩 테스트에서 전처리 단계로 자주 사용됩니다.',
        },
      ],
      commonProblems: [
        {
          name: 'Binary Search',
          platform: 'leetcode',
          id: '704',
          slug: 'binary-search',
          difficulty: 'Easy',
        },
      ],
      tips: [
        '정렬되지 않은 데이터에서는 선형 탐색이 유일한 방법입니다.',
        'Python의 in 연산자도 내부적으로 선형 탐색을 수행합니다.',
        'n이 크다면 정렬 후 이분 탐색 또는 해시를 고려하세요.',
      ],
    },
    {
      id: 'binary-search-basic',
      name: '이분 탐색',
      description:
        '정렬된 배열에서 탐색 범위를 절반씩 줄여가며 원하는 값을 찾는 알고리즘입니다. O(log n)의 뛰어난 시간 복잡도를 가집니다.',
      timeComplexity: 'O(log n)',
      spaceComplexity: 'O(1)',
      keyInsight:
        '정렬된 배열의 중간 값과 목표 값을 비교하여 탐색 범위를 절반으로 줄입니다. 매 단계마다 탐색 공간이 반으로 줄어 매우 효율적입니다.',
      pythonTools: [
        {
          name: 'bisect',
          description:
            'bisect_left(lower bound)와 bisect_right(upper bound)로 O(log n) 이진 탐색을 수행합니다. 직접 구현보다 실수가 적습니다.',
          import: 'from bisect import bisect_left, bisect_right',
        },
      ],
      codeExamples: [
        {
          title: '이분 탐색 기본 구현',
          code: `def binary_search(arr, target):
    lo, hi = 0, len(arr) - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            lo = mid + 1
        else:
            hi = mid - 1
    return -1

# 사용 예시
arr = [1, 3, 5, 7, 9, 11, 13]
print(binary_search(arr, 7))   # 3
print(binary_search(arr, 6))   # -1`,
          explanation:
            'lo와 hi로 탐색 범위를 관리합니다. 중간값이 target보다 작으면 오른쪽 절반, 크면 왼쪽 절반을 탐색합니다.',
        },
        {
          title: 'bisect 모듈을 활용한 이분 탐색',
          code: `from bisect import bisect_left, bisect_right

def count_in_range(arr, lo_val, hi_val):
    """정렬된 배열에서 [lo_val, hi_val] 범위의 원소 개수"""
    left = bisect_left(arr, lo_val)
    right = bisect_right(arr, hi_val)
    return right - left

# 사용 예시
arr = [1, 2, 3, 3, 3, 4, 5, 6]
print(count_in_range(arr, 3, 5))  # 4 (3, 3, 3, 4 -- 아니라 3,3,3,4,5 = 5)

# lower bound / upper bound
print(bisect_left(arr, 3))   # 2 (3이 처음 나타나는 위치)
print(bisect_right(arr, 3))  # 5 (3 다음 위치)`,
          explanation:
            'bisect_left는 값이 삽입될 가장 왼쪽 위치(lower bound), bisect_right는 가장 오른쪽 위치(upper bound)를 반환합니다. 범위 내 원소 개수를 O(log n)에 구할 수 있습니다.',
        },
      ],
      commonProblems: [
        { name: '수 찾기', platform: 'boj', id: '1920' },
        { name: '숫자 카드 2', platform: 'boj', id: '10816' },
        { name: '나무 자르기', platform: 'boj', id: '2805' },
        {
          name: 'Binary Search',
          platform: 'leetcode',
          id: '704',
          slug: 'binary-search',
          difficulty: 'Easy',
        },
        {
          name: 'Search in Rotated Sorted Array',
          platform: 'leetcode',
          id: '33',
          slug: 'search-in-rotated-sorted-array',
          difficulty: 'Medium',
        },
      ],
      tips: [
        '반드시 배열이 정렬되어 있어야 합니다.',
        'lo <= hi 조건과 lo < hi 조건의 차이를 정확히 이해하세요.',
        'Python의 bisect 모듈을 활용하면 실수를 줄일 수 있습니다.',
        'off-by-one 에러에 주의하세요.',
      ],
    },
    {
      id: 'parametric-search',
      name: '매개변수 탐색 (파라메트릭 서치)',
      description:
        '최적화 문제를 결정 문제로 바꿔서 이분 탐색으로 해결하는 기법입니다. "최솟값의 최댓값" 또는 "최댓값의 최솟값" 유형에 자주 사용됩니다.',
      timeComplexity: 'O(n log X) (X: 탐색 범위)',
      spaceComplexity: 'O(1)',
      keyInsight:
        '"정답이 x일 때 조건을 만족하는가?"라는 결정 함수를 만들고, 이분 탐색으로 조건을 만족하는 최적의 x를 찾습니다. 결정 함수의 결과가 단조적(monotonic)이어야 합니다.',
      pythonTools: [
        {
          name: 'bisect',
          description:
            '정렬된 데이터에서 이진 탐색 위치를 찾을 때 활용합니다. 결정 함수와 while lo <= hi 패턴을 조합하여 최적값을 탐색합니다.',
          import: 'from bisect import bisect_left, bisect_right',
        },
      ],
      codeExamples: [
        {
          title: '나무 자르기 (BOJ 2805)',
          code: `def solve():
    n, m = 4, 7  # 나무 수, 필요한 나무 길이
    trees = [20, 15, 10, 17]

    def can_get(h):
        """높이 h로 자를 때 m 이상의 나무를 얻을 수 있는가?"""
        total = sum(max(0, t - h) for t in trees)
        return total >= m

    lo, hi = 0, max(trees)
    result = 0
    while lo <= hi:
        mid = (lo + hi) // 2
        if can_get(mid):
            result = mid  # 가능하면 더 높이 잘라보기
            lo = mid + 1
        else:
            hi = mid - 1

    print(result)  # 15

solve()`,
          explanation:
            '절단 높이를 이분 탐색합니다. 특정 높이로 잘랐을 때 필요한 양 이상을 얻을 수 있는지 판단하는 결정 함수를 만들고, 조건을 만족하는 최대 높이를 찾습니다.',
        },
        {
          title: '랜선 자르기 (BOJ 1654)',
          code: `def solve():
    k, n = 4, 11  # 보유한 랜선 수, 필요한 랜선 수
    cables = [802, 743, 457, 539]

    def can_make(length):
        """길이 length로 자를 때 n개 이상 만들 수 있는가?"""
        return sum(c // length for c in cables) >= n

    lo, hi = 1, max(cables)
    result = 0
    while lo <= hi:
        mid = (lo + hi) // 2
        if can_make(mid):
            result = mid
            lo = mid + 1
        else:
            hi = mid - 1

    print(result)  # 200

solve()`,
          explanation:
            '랜선의 길이를 이분 탐색합니다. 특정 길이로 잘랐을 때 n개 이상을 만들 수 있으면 더 긴 길이를 시도하고, 아니면 더 짧은 길이를 시도합니다.',
        },
      ],
      commonProblems: [
        { name: '나무 자르기', platform: 'boj', id: '2805' },
        { name: '랜선 자르기', platform: 'boj', id: '1654' },
        { name: '공유기 설치', platform: 'boj', id: '2110' },
        { name: 'K번째 수', platform: 'boj', id: '1300' },
        {
          name: 'Find Minimum in Rotated Sorted Array',
          platform: 'leetcode',
          id: '153',
          slug: 'find-minimum-in-rotated-sorted-array',
          difficulty: 'Medium',
        },
      ],
      tips: [
        '"최솟값의 최댓값" 또는 "최댓값의 최솟값" 문구가 나오면 매개변수 탐색을 의심하세요.',
        '결정 함수가 단조적(한쪽은 True, 다른 쪽은 False)인지 반드시 확인하세요.',
        '탐색 범위의 시작과 끝을 정확히 설정하는 것이 중요합니다.',
        'lo와 hi의 초기값, 종료 조건, result 갱신 시점에 주의하세요.',
      ],
    },
  ],
}
