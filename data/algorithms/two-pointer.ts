import type { Category } from '../../types/algorithm'

export const twoPointerCategory: Category = {
  id: 'two-pointer',
  name: '투포인터/슬라이딩윈도우',
  icon: '👆',
  description:
    '배열이나 문자열에서 두 개의 포인터를 사용하여 효율적으로 탐색하는 기법입니다. 정렬된 배열에서의 쌍 찾기, 부분 배열의 조건 만족 여부, 고정 또는 가변 크기 윈도우 내의 계산 등에 활용됩니다.',
  patterns: [
    {
      id: 'two-pointer-basic',
      name: '기본 투포인터',
      description:
        '배열의 양 끝 또는 시작점에서 두 포인터를 이동시키며 조건을 만족하는 쌍이나 구간을 찾습니다. 정렬된 배열에서 합이 특정 값인 쌍 찾기, 연속 부분 배열의 합 등에 사용합니다.',
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(1)',
      keyInsight:
        '두 포인터가 각각 최대 N번만 이동하므로 총 O(N)입니다. 핵심은 포인터를 뒤로 되돌리지 않아도 되는 조건(단조성)을 파악하는 것입니다.',
      pythonTools: [
        {
          name: 'list',
          description: '정렬된 배열에서 양쪽 포인터를 이동시키며 탐색합니다. list(map(int, ...))로 입력을 배열로 변환합니다.',
          import: '내장 자료형',
        },
        {
          name: 'sorted()',
          description: '양방향 투포인터 사용 전 배열을 정렬하는 전처리에 사용합니다. 정렬이 단조성을 보장하는 핵심 전제입니다.',
          import: '내장 함수',
        },
      ],
      codeExamples: [
        {
          title: '연속 부분 배열의 합이 S 이상인 최소 길이',
          code: `import sys
input = sys.stdin.readline

def min_length_subarray_sum(arr, s):
    n = len(arr)
    left = 0
    current_sum = 0
    min_len = float('inf')

    for right in range(n):
        current_sum += arr[right]
        while current_sum >= s:
            min_len = min(min_len, right - left + 1)
            current_sum -= arr[left]
            left += 1

    return min_len if min_len != float('inf') else 0

# BOJ 1806 - 부분합
n, s = map(int, input().split())
arr = list(map(int, input().split()))
result = min_length_subarray_sum(arr, s)
print(result)`,
          explanation:
            'right 포인터를 오른쪽으로 확장하며 합을 누적하고, 합이 S 이상이 되면 left 포인터를 줄여가며 최소 길이를 갱신합니다. 양수 배열이므로 left를 오른쪽으로 움직이면 합이 줄어드는 단조성이 보장됩니다.',
        },
        {
          title: '정렬된 배열에서 두 수의 합',
          code: `def two_sum_sorted(arr, target):
    left, right = 0, len(arr) - 1

    while left < right:
        s = arr[left] + arr[right]
        if s == target:
            return (left, right)
        elif s < target:
            left += 1  # 합이 작으므로 왼쪽 포인터를 증가
        else:
            right -= 1  # 합이 크므로 오른쪽 포인터를 감소

    return None  # 못 찾음

# 사용 예시
arr = [1, 2, 3, 5, 8, 11, 15]
result = two_sum_sorted(arr, 13)
# result = (2, 4) → arr[2] + arr[4] = 3 + 8 = 11? → 아님
# 실제: arr[1] + arr[5] = 2 + 11 = 13 → (1, 5)
print(result)  # (1, 5)`,
          explanation:
            '배열이 정렬되어 있으므로, 합이 목표보다 작으면 left를 올리고, 크면 right를 내립니다. 양쪽에서 좁혀가므로 모든 가능한 쌍을 O(N)에 확인할 수 있습니다.',
        },
      ],
      commonProblems: [
        { name: '부분합', platform: 'boj', id: '1806' },
        { name: '수들의 합 2', platform: 'boj', id: '2003' },
        { name: '소수의 연속합', platform: 'boj', id: '1644' },
        { name: '수 고르기', platform: 'boj', id: '2230' },
        { name: 'Two Sum II', platform: 'leetcode', id: '167', slug: 'two-sum-ii-input-array-is-sorted', difficulty: 'Medium' },
        { name: 'Container With Most Water', platform: 'leetcode', id: '11', slug: 'container-with-most-water', difficulty: 'Medium' },
        { name: 'Minimum Size Subarray Sum', platform: 'leetcode', id: '209', slug: 'minimum-size-subarray-sum', difficulty: 'Medium' },
      ],
      tips: [
        '투포인터는 배열이 정렬되어 있거나, 양수로만 이루어져 단조성이 보장될 때 사용 가능합니다.',
        'left가 right를 넘지 않도록 경계 조건을 확인하세요.',
        '음수가 포함된 배열에서는 투포인터 대신 해시맵이나 이분 탐색을 고려하세요.',
        '같은 방향 투포인터(둘 다 왼쪽에서 시작)와 양방향 투포인터(양 끝에서 시작)를 구분하세요.',
      ],
    },
    {
      id: 'sliding-window',
      name: '슬라이딩 윈도우',
      description:
        '고정 크기 또는 가변 크기의 윈도우를 배열 위에서 한 칸씩 밀면서 윈도우 내의 값을 효율적으로 갱신합니다. 매번 처음부터 다시 계산하지 않고 빠지는 값과 들어오는 값만 처리합니다.',
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(1) ~ O(K)',
      keyInsight:
        '윈도우가 한 칸 이동할 때 추가되는 원소와 제거되는 원소만 반영하면 됩니다. 전체를 다시 계산하는 O(NK)를 O(N)으로 줄이는 것이 핵심입니다.',
      pythonTools: [
        {
          name: 'collections.defaultdict',
          description: '윈도우 내 원소의 빈도를 관리합니다. 키가 없을 때 자동으로 기본값(int → 0)을 생성하여 빈도 증감이 간편합니다.',
          import: 'from collections import defaultdict',
        },
        {
          name: 'collections.Counter',
          description: '목표 윈도우와 현재 윈도우의 빈도를 비교할 때 사용합니다. 윈도우 초기화 및 비교 연산이 간결해집니다.',
          import: 'from collections import Counter',
        },
      ],
      codeExamples: [
        {
          title: '크기 K인 윈도우의 최대 합',
          code: `import sys
input = sys.stdin.readline

def max_sum_window(arr, k):
    n = len(arr)
    if n < k:
        return -1

    window_sum = sum(arr[:k])
    max_sum = window_sum

    for i in range(k, n):
        window_sum += arr[i] - arr[i - k]
        max_sum = max(max_sum, window_sum)

    return max_sum

# 사용 예시
n, k = map(int, input().split())
arr = list(map(int, input().split()))
print(max_sum_window(arr, k))`,
          explanation:
            '처음 K개의 합을 구한 뒤, 윈도우를 한 칸씩 밀 때 새로 들어오는 arr[i]를 더하고 빠지는 arr[i-k]를 빼서 O(1)에 갱신합니다.',
        },
        {
          title: '서로 다른 문자가 K개 이하인 가장 긴 부분 문자열',
          code: `from collections import defaultdict

def longest_substring_k_distinct(s, k):
    if k == 0:
        return 0

    count = defaultdict(int)
    left = 0
    max_len = 0

    for right in range(len(s)):
        count[s[right]] += 1

        while len(count) > k:
            count[s[left]] -= 1
            if count[s[left]] == 0:
                del count[s[left]]
            left += 1

        max_len = max(max_len, right - left + 1)

    return max_len

# 사용 예시
s = "eceba"
k = 2
print(longest_substring_k_distinct(s, k))  # 3 ("ece")`,
          explanation:
            'right를 확장하며 문자를 추가하고, 서로 다른 문자 수가 K를 초과하면 left를 줄여 윈도우를 축소합니다. 딕셔너리로 윈도우 내 문자 빈도를 관리하며, 빈도가 0이 되면 삭제합니다.',
        },
      ],
      commonProblems: [
        { name: '블로그', platform: 'boj', id: '21921' },
        { name: 'DNA 비밀번호', platform: 'boj', id: '12891' },
        { name: '회전 초밥', platform: 'boj', id: '15961' },
        { name: '회전 초밥', platform: 'boj', id: '2531' },
        { name: '3Sum', platform: 'leetcode', id: '15', slug: '3sum', difficulty: 'Medium' },
      ],
      tips: [
        '고정 크기 윈도우는 for문, 가변 크기 윈도우는 while문으로 left를 조절합니다.',
        '윈도우 내 상태를 딕셔너리, 카운터, 합 등으로 관리하세요.',
        '원형 배열의 슬라이딩 윈도우는 배열을 두 번 이어 붙이거나 모듈로 연산으로 처리합니다.',
        '최솟값/최댓값을 윈도우에서 빠르게 구하려면 deque(모노톤 큐)를 함께 사용하세요.',
      ],
    },
    {
      id: 'meet-in-the-middle',
      name: '중간에서 만나기 (Meet in the Middle)',
      description:
        '전체 탐색 공간을 반으로 나누어 각각 탐색한 뒤 결과를 합치는 기법입니다. O(2^N)을 O(2^(N/2))로 줄일 수 있어, N이 40 정도일 때 완전탐색 대신 사용합니다.',
      timeComplexity: 'O(2^(N/2) × log(2^(N/2))) = O(2^(N/2) × N)',
      spaceComplexity: 'O(2^(N/2))',
      keyInsight:
        '집합을 절반으로 나누고, 한쪽의 모든 부분집합 결과를 미리 구해 정렬한 뒤, 다른 쪽을 순회하며 이분 탐색으로 조건을 만족하는 조합을 찾습니다.',
      pythonTools: [
        {
          name: 'itertools.combinations',
          description: '부분집합의 합을 생성할 때 조합을 활용할 수 있습니다. 각 크기별 조합을 순회하여 부분집합 합 리스트를 만듭니다.',
          import: 'from itertools import combinations',
        },
        {
          name: 'bisect',
          description: '한쪽 부분집합 합을 정렬한 뒤 bisect_left/bisect_right로 목표 값의 개수를 O(log N)에 구합니다.',
          import: 'from bisect import bisect_left, bisect_right',
        },
      ],
      codeExamples: [
        {
          title: '부분집합의 합이 S인 경우의 수 (BOJ 1208)',
          code: `import sys
from bisect import bisect_left, bisect_right
input = sys.stdin.readline

def get_all_subset_sums(arr):
    """배열의 모든 부분집합 합을 반환"""
    sums = [0]
    for x in arr:
        sums += [s + x for s in sums]
    return sums

n, s = map(int, input().split())
arr = list(map(int, input().split()))

# 배열을 반으로 나눔
mid = n // 2
left_arr = arr[:mid]
right_arr = arr[mid:]

# 각각의 모든 부분집합 합 구하기
left_sums = get_all_subset_sums(left_arr)
right_sums = get_all_subset_sums(right_arr)

# 오른쪽을 정렬
right_sums.sort()

count = 0
for ls in left_sums:
    # right에서 s - ls인 값의 개수
    target = s - ls
    count += bisect_right(right_sums, target) - bisect_left(right_sums, target)

# 공집합 제외 (합이 0인 공집합+공집합 조합)
if s == 0:
    count -= 1

print(count)`,
          explanation:
            '배열을 절반으로 나누어 각각 모든 부분집합 합을 구합니다 (각 2^(N/2)개). 왼쪽의 각 합 ls에 대해 오른쪽에서 S - ls인 값의 개수를 이분 탐색으로 셉니다. 공집합(합=0)을 양쪽 모두 고른 경우를 S=0일 때 1 빼줍니다.',
        },
      ],
      commonProblems: [
        { name: '부분수열의 합 2', platform: 'boj', id: '1208' },
        { name: '합이 0인 네 정수', platform: 'boj', id: '7453' },
        { name: '냅색문제', platform: 'boj', id: '1450' },
        { name: 'Trapping Rain Water', platform: 'leetcode', id: '42', slug: 'trapping-rain-water', difficulty: 'Hard' },
      ],
      tips: [
        'N이 20 이하면 완전탐색, 40 이하면 Meet in the Middle을 고려하세요.',
        '부분집합 합을 구할 때 비트마스크 또는 재귀를 사용할 수 있습니다.',
        '한쪽을 정렬 후 이분 탐색하거나, Counter/딕셔너리로 O(1) 조회하는 방법도 있습니다.',
        '공집합 처리에 주의하세요. 문제에 따라 공집합을 포함/제외해야 할 수 있습니다.',
      ],
    },
  ],
}
