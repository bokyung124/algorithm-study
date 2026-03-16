import type { Category } from '../../types/algorithm'

export const sorting: Category = {
  id: 'sorting',
  name: '정렬',
  icon: '📊',
  description:
    '데이터를 특정 기준에 따라 순서대로 나열하는 알고리즘입니다. 코딩 테스트에서 가장 기본이 되는 주제이며, 다른 알고리즘의 전처리 과정으로도 자주 사용됩니다.',
  patterns: [
    {
      id: 'bubble-sort',
      name: '버블 정렬',
      description:
        '인접한 두 원소를 비교하며 교환하는 가장 단순한 정렬 알고리즘입니다. 한 번의 순회마다 가장 큰 원소가 맨 뒤로 이동합니다.',
      timeComplexity: 'O(n²)',
      spaceComplexity: 'O(1)',
      keyInsight:
        '인접 원소를 반복적으로 비교·교환하여 매 라운드마다 정렬되지 않은 구간의 최댓값이 제자리를 찾아갑니다. 교환이 한 번도 일어나지 않으면 조기 종료할 수 있습니다.',
      pythonTools: [
        {
          name: 'list',
          description:
            'append, pop, 인덱스 스왑(arr[i], arr[j] = arr[j], arr[i])으로 버블 정렬의 교환 연산을 수행합니다.',
          import: '내장 자료형',
        },
        {
          name: 'sorted() / list.sort()',
          description:
            'Timsort 기반 내장 정렬로, 실전에서는 직접 버블 정렬 대신 사용합니다. key 매개변수로 커스텀 정렬이 가능합니다.',
          import: '내장 함수',
        },
      ],
      codeExamples: [
        {
          title: '버블 정렬 기본 구현',
          code: `def bubble_sort(arr):
    n = len(arr)
    for i in range(n - 1):
        swapped = False
        for j in range(n - 1 - i):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
                swapped = True
        if not swapped:
            break
    return arr

# 사용 예시
print(bubble_sort([5, 3, 8, 1, 2]))  # [1, 2, 3, 5, 8]`,
          explanation:
            '바깥 루프가 한 번 돌 때마다 가장 큰 값이 뒤로 밀려납니다. swapped 플래그를 사용하여 이미 정렬된 경우 조기 종료합니다.',
        },
      ],
      commonProblems: [
        {
          name: 'Sort Colors',
          platform: 'leetcode',
          id: '75',
          slug: 'sort-colors',
          difficulty: 'Medium',
        },
        {
          name: 'Sort an Array',
          platform: 'leetcode',
          id: '912',
          slug: 'sort-an-array',
          difficulty: 'Medium',
        },
      ],
      tips: [
        '시간 복잡도가 O(n²)이므로 n이 작을 때만 사용하세요.',
        'swapped 플래그로 최선의 경우 O(n)을 달성할 수 있습니다.',
        '안정 정렬(stable sort)이 필요한 경우에 활용할 수 있습니다.',
      ],
    },
    {
      id: 'merge-sort',
      name: '병합 정렬',
      description:
        '배열을 반으로 나누어 각각 정렬한 뒤 합치는 분할 정복 기반 정렬 알고리즘입니다. 항상 O(n log n)의 시간 복잡도를 보장합니다.',
      timeComplexity: 'O(n log n)',
      spaceComplexity: 'O(n)',
      keyInsight:
        '배열을 절반으로 분할하고, 각각 재귀적으로 정렬한 뒤, 두 정렬된 배열을 하나로 병합합니다. 병합 과정에서 두 포인터를 사용하여 작은 값부터 채워 넣습니다.',
      pythonTools: [
        {
          name: 'list',
          description:
            '슬라이싱(arr[:mid], arr[mid:])으로 분할하고, extend()로 병합 결과를 이어붙입니다.',
          import: '내장 자료형',
        },
        {
          name: 'sorted()',
          description:
            'Python 내장 정렬은 Timsort로 병합 정렬 기반입니다. 실전에서는 sorted()를 사용하되 원리를 이해해야 응용 가능합니다.',
          import: '내장 함수',
        },
      ],
      codeExamples: [
        {
          title: '병합 정렬 구현',
          code: `def merge_sort(arr):
    if len(arr) <= 1:
        return arr

    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    return merge(left, right)

def merge(left, right):
    result = []
    i = j = 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
    result.extend(left[i:])
    result.extend(right[j:])
    return result

# 사용 예시
print(merge_sort([38, 27, 43, 3, 9, 82, 10]))
# [3, 9, 10, 27, 38, 43, 82]`,
          explanation:
            '배열을 절반으로 나누어 재귀적으로 정렬하고, merge 함수에서 두 정렬된 리스트를 하나로 합칩니다. 안정 정렬이며 최악의 경우에도 O(n log n)입니다.',
        },
        {
          title: '역순 쌍(inversion) 개수 세기',
          code: `def count_inversions(arr):
    if len(arr) <= 1:
        return arr, 0
    mid = len(arr) // 2
    left, left_inv = count_inversions(arr[:mid])
    right, right_inv = count_inversions(arr[mid:])

    merged = []
    inversions = left_inv + right_inv
    i = j = 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            merged.append(left[i])
            i += 1
        else:
            merged.append(right[j])
            inversions += len(left) - i
            j += 1
    merged.extend(left[i:])
    merged.extend(right[j:])
    return merged, inversions

# 사용 예시
_, inv = count_inversions([2, 4, 1, 3, 5])
print(inv)  # 3`,
          explanation:
            '병합 정렬의 병합 단계에서 오른쪽 원소가 먼저 들어가면, 왼쪽에 남은 원소 수만큼 역순 쌍이 추가됩니다. 이를 이용하면 O(n log n)에 역순 쌍을 셀 수 있습니다.',
        },
      ],
      commonProblems: [
        { name: '수 정렬하기 2', platform: 'boj', id: '2751' },
        { name: '버블 소트', platform: 'boj', id: '1517' },
        {
          name: 'Merge Intervals',
          platform: 'leetcode',
          id: '56',
          slug: 'merge-intervals',
          difficulty: 'Medium',
        },
      ],
      tips: [
        '안정 정렬이 필요하면 병합 정렬을 사용하세요.',
        '역순 쌍 개수를 세는 문제는 병합 정렬의 대표적인 응용입니다.',
        'Python의 sorted()와 list.sort()는 Timsort로 병합 정렬 기반입니다.',
      ],
    },
    {
      id: 'quick-sort',
      name: '퀵 정렬',
      description:
        '피벗을 기준으로 작은 값과 큰 값을 분할하여 정렬하는 분할 정복 알고리즘입니다. 평균적으로 가장 빠른 정렬 알고리즘 중 하나입니다.',
      timeComplexity: '평균 O(n log n), 최악 O(n²)',
      spaceComplexity: 'O(log n) (재귀 스택)',
      keyInsight:
        '피벗을 선택한 뒤 피벗보다 작은 원소는 왼쪽, 큰 원소는 오른쪽으로 분할합니다. 분할 후 각 부분을 재귀적으로 정렬합니다. 피벗 선택 전략이 성능에 큰 영향을 줍니다.',
      pythonTools: [
        {
          name: 'random',
          description:
            'random.choice로 랜덤 피벗을 선택하고, random.randint로 인덱스 범위 내 랜덤 피벗을 골라 최악의 경우(O(n²))를 방지합니다.',
          import: 'import random',
        },
        {
          name: 'list',
          description:
            '리스트 컴프리헨션([x for x in arr if x < pivot])으로 파티션을 간결하게 구현합니다.',
          import: '내장 자료형',
        },
      ],
      codeExamples: [
        {
          title: '퀵 정렬 기본 구현',
          code: `import random

def quick_sort(arr):
    if len(arr) <= 1:
        return arr

    pivot = random.choice(arr)
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]

    return quick_sort(left) + middle + quick_sort(right)

# 사용 예시
print(quick_sort([3, 6, 8, 10, 1, 2, 1]))
# [1, 1, 2, 3, 6, 8, 10]`,
          explanation:
            '랜덤 피벗을 선택하여 최악의 경우를 방지합니다. 피벗보다 작은 값, 같은 값, 큰 값으로 나눈 뒤 재귀적으로 정렬합니다.',
        },
        {
          title: '제자리(in-place) 퀵 정렬',
          code: `import random

def quick_sort_inplace(arr, lo=0, hi=None):
    if hi is None:
        hi = len(arr) - 1
    if lo >= hi:
        return

    pivot_idx = random.randint(lo, hi)
    arr[pivot_idx], arr[hi] = arr[hi], arr[pivot_idx]
    pivot = arr[hi]

    i = lo
    for j in range(lo, hi):
        if arr[j] < pivot:
            arr[i], arr[j] = arr[j], arr[i]
            i += 1
    arr[i], arr[hi] = arr[hi], arr[i]

    quick_sort_inplace(arr, lo, i - 1)
    quick_sort_inplace(arr, i + 1, hi)

# 사용 예시
data = [10, 7, 8, 9, 1, 5]
quick_sort_inplace(data)
print(data)  # [1, 5, 7, 8, 9, 10]`,
          explanation:
            '추가 메모리를 사용하지 않는 제자리 퀵 정렬입니다. Lomuto 파티션 방식으로 피벗의 최종 위치를 찾습니다.',
        },
      ],
      commonProblems: [
        { name: 'K번째 수', platform: 'boj', id: '11004' },
        {
          name: 'Kth Largest Element in an Array',
          platform: 'leetcode',
          id: '215',
          slug: 'kth-largest-element-in-an-array',
          difficulty: 'Medium',
        },
      ],
      tips: [
        '랜덤 피벗 또는 중간값 피벗을 사용하여 최악의 경우를 회피하세요.',
        'K번째 원소를 찾는 문제에서는 Quick Select를 활용하면 평균 O(n)에 해결됩니다.',
        '코딩 테스트에서는 보통 내장 정렬을 사용하되, 원리를 이해해야 응용 문제를 풀 수 있습니다.',
      ],
    },
    {
      id: 'counting-sort',
      name: '카운팅 정렬',
      description:
        '원소의 등장 횟수를 세어 정렬하는 비교 기반이 아닌 정렬 알고리즘입니다. 원소의 범위가 제한적일 때 O(n + k) 시간에 정렬할 수 있습니다.',
      timeComplexity: 'O(n + k) (k: 값의 범위)',
      spaceComplexity: 'O(k)',
      keyInsight:
        '각 값이 몇 번 등장하는지 카운트 배열에 기록한 뒤, 카운트 배열을 순회하며 결과를 만듭니다. 값의 범위가 작을 때 매우 효율적입니다.',
      pythonTools: [
        {
          name: 'list',
          description:
            '[0] * (max_val - min_val + 1)로 카운트 배열을 생성하고, extend()로 결과 배열을 구성합니다.',
          import: '내장 자료형',
        },
        {
          name: 'collections.Counter',
          description:
            '빈도 세기를 한 줄로 간편하게 처리합니다. most_common()으로 빈도순 정렬도 가능합니다.',
          import: 'from collections import Counter',
        },
      ],
      codeExamples: [
        {
          title: '카운팅 정렬 기본 구현',
          code: `def counting_sort(arr):
    if not arr:
        return arr

    min_val, max_val = min(arr), max(arr)
    count = [0] * (max_val - min_val + 1)

    for num in arr:
        count[num - min_val] += 1

    result = []
    for i, cnt in enumerate(count):
        result.extend([i + min_val] * cnt)
    return result

# 사용 예시
print(counting_sort([4, 2, 2, 8, 3, 3, 1]))
# [1, 2, 2, 3, 3, 4, 8]`,
          explanation:
            '값의 최솟값과 최댓값을 구한 뒤, 각 값의 등장 횟수를 세고, 순서대로 결과 배열을 만듭니다. 비교 없이 정렬하므로 값의 범위가 좁을 때 매우 빠릅니다.',
        },
        {
          title: '문자열 빈도순 정렬 응용',
          code: `def frequency_sort(s):
    count = {}
    for ch in s:
        count[ch] = count.get(ch, 0) + 1

    # 빈도 기준 카운팅 정렬
    max_freq = max(count.values())
    buckets = [[] for _ in range(max_freq + 1)]
    for ch, freq in count.items():
        buckets[freq].append(ch)

    result = []
    for freq in range(max_freq, 0, -1):
        for ch in buckets[freq]:
            result.append(ch * freq)
    return ''.join(result)

# 사용 예시
print(frequency_sort("tree"))  # "eert" 또는 "eetr"`,
          explanation:
            '각 문자의 빈도를 세고, 빈도를 인덱스로 하는 버킷에 넣어 높은 빈도부터 결과를 구성합니다. 버킷 정렬의 원리와 동일합니다.',
        },
      ],
      commonProblems: [
        { name: '수 정렬하기 3', platform: 'boj', id: '10989' },
        {
          name: 'Sort Colors',
          platform: 'leetcode',
          id: '75',
          slug: 'sort-colors',
          difficulty: 'Medium',
        },
        {
          name: 'Sort an Array',
          platform: 'leetcode',
          id: '912',
          slug: 'sort-an-array',
          difficulty: 'Medium',
        },
      ],
      tips: [
        '값의 범위(k)가 n보다 훨씬 크면 오히려 비효율적이므로 주의하세요.',
        '음수가 포함된 경우 최솟값만큼 오프셋을 주어 처리합니다.',
        '안정 정렬이 필요하면 누적합을 이용한 방식을 사용하세요.',
      ],
    },
  ],
}
