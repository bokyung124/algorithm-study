import type { Category } from '../../types/algorithm'

export const divideAndConquerCategory: Category = {
  id: 'divide-and-conquer',
  name: '분할 정복',
  icon: '✂️',
  description:
    '문제를 더 작은 하위 문제로 분할하고, 각각을 재귀적으로 해결한 뒤, 결과를 합쳐 전체 문제를 해결하는 알고리즘 설계 기법입니다. 병합 정렬, 퀵 정렬, 거듭제곱 등 다양한 문제에 적용됩니다.',
  patterns: [
    {
      id: 'basic-divide-conquer',
      name: '기본 분할 정복',
      description:
        '문제를 절반으로 나누어 재귀적으로 해결하고, 결과를 합치는 기본 패턴입니다. 병합 정렬의 merge 과정처럼 분할 후 정복(합치기) 단계가 핵심입니다.',
      timeComplexity: 'O(n log n)',
      spaceComplexity: 'O(log n)',
      keyInsight:
        '문제를 절반으로 나누면 재귀 깊이가 O(log n)이 되고, 각 레벨에서 O(n) 작업을 하면 전체 O(n log n)이 됩니다. 분할은 쉽지만 합치는(merge) 과정을 잘 설계해야 합니다.',
      tools: [
        {
          name: 'list slicing',
          description: '배열을 절반으로 나눌 때 arr[:mid], arr[mid:]로 간결하게 분할할 수 있습니다.',
          import: '내장 자료형',
        },
        {
          name: 'sys.setrecursionlimit',
          description: '재귀 깊이가 깊어질 수 있으므로 재귀 제한을 늘려야 할 수 있습니다.',
          import: 'import sys',
        },
      ],
      codeExamples: [
        {
          title: '병합 정렬로 역전 쌍(inversion) 세기',
          code: `import sys
input = sys.stdin.readline

def merge_count(arr):
    if len(arr) <= 1:
        return arr, 0

    mid = len(arr) // 2
    left, left_inv = merge_count(arr[:mid])
    right, right_inv = merge_count(arr[mid:])

    merged = []
    inversions = left_inv + right_inv
    i = j = 0

    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            merged.append(left[i])
            i += 1
        else:
            merged.append(right[j])
            inversions += len(left) - i  # 왼쪽의 남은 원소 수만큼 역전
            j += 1

    merged.extend(left[i:])
    merged.extend(right[j:])
    return merged, inversions

n = int(input())
arr = list(map(int, input().split()))
_, result = merge_count(arr)
print(result)`,
          explanation:
            '병합 정렬의 merge 과정에서 오른쪽 원소가 먼저 들어갈 때, 왼쪽에 남은 원소 수만큼 역전 쌍이 발생합니다. 분할 정복으로 O(n log n)에 역전 쌍을 셀 수 있습니다.',
        },
      ],
      commonProblems: [
        { name: '쿼드트리', platform: 'boj', id: '1992' },
        { name: 'Sort an Array', platform: 'leetcode', id: '912', slug: 'sort-an-array', difficulty: 'Medium' },
        { name: '색종이 만들기', platform: 'boj', id: '2630' },
      ],
      tips: [
        '분할 정복의 3단계를 기억하세요: 분할(Divide) → 정복(Conquer) → 합치기(Combine).',
        '재귀 종료 조건(base case)을 반드시 먼저 작성하세요.',
        '병합 과정에서 추가 정보(역전 쌍 수 등)를 계산할 수 있습니다.',
        'Python에서는 리스트 슬라이싱이 O(n) 복사를 하므로 인덱스 기반 구현이 더 효율적일 수 있습니다.',
      ],
    },
    {
      id: 'fast-exponentiation',
      name: '빠른 거듭제곱',
      description:
        'a^n을 O(log N)에 계산하는 분할 정복 기법입니다. n이 짝수이면 a^(n/2)를 구해 제곱하고, 홀수이면 a를 한 번 더 곱합니다. 모듈러 연산과 함께 자주 사용됩니다.',
      timeComplexity: 'O(log N)',
      spaceComplexity: 'O(log N)',
      keyInsight:
        'a^n = (a^(n/2))^2 (n이 짝수), a^n = a × a^(n-1) (n이 홀수). 지수를 절반씩 줄이므로 O(log N)에 계산됩니다. 큰 수의 거듭제곱은 반드시 모듈러 연산과 함께 사용해야 합니다.',
      tools: [
        {
          name: 'pow(a, b, mod)',
          description: 'Python 내장 pow 함수는 세 번째 인자로 모듈러를 받아 빠른 거듭제곱을 수행합니다.',
          import: '내장 함수',
        },
        {
          name: '재귀 / 반복 구현',
          description: '직접 구현 시 재귀 또는 비트 연산을 활용한 반복 방식으로 작성할 수 있습니다.',
          import: '내장 자료형',
        },
      ],
      codeExamples: [
        {
          title: '빠른 거듭제곱 (모듈러 연산)',
          code: `import sys
input = sys.stdin.readline

def power(base, exp, mod):
    """a^b mod m을 O(log b)에 계산"""
    if exp == 0:
        return 1
    if exp == 1:
        return base % mod

    # 지수를 절반으로 나누어 재귀
    half = power(base, exp // 2, mod)
    result = (half * half) % mod

    if exp % 2 == 1:
        result = (result * base) % mod

    return result

# BOJ 1629: A를 B번 곱한 수를 C로 나눈 나머지
a, b, c = map(int, input().split())
print(power(a, b, c))

# Python 내장 함수 사용 시:
# print(pow(a, b, c))`,
          explanation:
            '지수를 절반으로 나누어 재귀 호출하고, 결과를 제곱합니다. 홀수 지수일 때 base를 한 번 더 곱합니다. 매 단계마다 mod 연산을 해서 오버플로우를 방지합니다.',
        },
      ],
      commonProblems: [
        { name: '곱셈', platform: 'boj', id: '1629' },
        { name: 'Pow(x, n)', platform: 'leetcode', id: '50', slug: 'powx-n', difficulty: 'Medium' },
        { name: '이항 계수 3', platform: 'boj', id: '11401' },
      ],
      tips: [
        'Python의 내장 pow(a, b, mod)는 이미 빠른 거듭제곱을 사용하므로, 직접 구현하지 않아도 됩니다.',
        '페르마 소정리를 활용하면 모듈러 역원을 구할 수 있습니다: a^(-1) ≡ a^(p-2) (mod p).',
        '행렬 거듭제곱에도 같은 원리를 적용할 수 있습니다 (피보나치, 점화식 등).',
        '반복문 버전은 비트 연산으로 구현하면 더 효율적입니다.',
      ],
    },
    {
      id: 'closest-pair',
      name: '가장 가까운 점 쌍',
      description:
        '2차원 평면 위의 점들 중 가장 가까운 두 점의 거리를 분할 정복으로 O(n log n)에 구하는 알고리즘입니다. 단순 완전탐색은 O(n²)이지만, 분할 정복으로 효율적으로 해결할 수 있습니다.',
      timeComplexity: 'O(n log n)',
      spaceComplexity: 'O(n)',
      keyInsight:
        '점들을 x좌표로 정렬 후 절반으로 나누어 각각의 최소 거리를 구하고, 경계 영역(strip)에서의 최소 거리를 확인합니다. strip 내에서 y좌표 차이가 d 미만인 점만 비교하면 최대 6~7개만 확인하면 됩니다.',
      tools: [
        {
          name: 'math.dist / math.sqrt',
          description: '두 점 사이의 유클리드 거리를 계산합니다.',
          import: 'import math',
        },
        {
          name: 'sorted / list.sort',
          description: '점들을 x좌표, y좌표 기준으로 정렬합니다.',
          import: '내장 함수',
        },
      ],
      codeExamples: [
        {
          title: '가장 가까운 두 점 (BOJ 2261)',
          code: `import sys
input = sys.stdin.readline

def dist(p1, p2):
    return (p1[0] - p2[0]) ** 2 + (p1[1] - p2[1]) ** 2

def closest_pair(points):
    n = len(points)
    if n <= 3:
        min_d = float('inf')
        for i in range(n):
            for j in range(i + 1, n):
                min_d = min(min_d, dist(points[i], points[j]))
        return min_d

    mid = n // 2
    mid_x = points[mid][0]

    d = min(
        closest_pair(points[:mid]),
        closest_pair(points[mid:])
    )

    # 경계 영역(strip)에서 확인
    strip = [p for p in points if (p[0] - mid_x) ** 2 < d]
    strip.sort(key=lambda p: p[1])

    for i in range(len(strip)):
        j = i + 1
        while j < len(strip) and (strip[j][1] - strip[i][1]) ** 2 < d:
            d = min(d, dist(strip[i], strip[j]))
            j += 1

    return d

n = int(input())
points = [tuple(map(int, input().split())) for _ in range(n)]
points.sort()
print(closest_pair(points))`,
          explanation:
            '점들을 x좌표로 정렬 후 절반으로 분할합니다. 양쪽의 최소 거리 d를 구한 후, 중앙선에서 d 이내의 점들(strip)만 y좌표 순으로 비교합니다. strip 내에서 각 점에 대해 최대 6~7개만 비교하므로 전체 O(n log n)입니다.',
        },
      ],
      commonProblems: [
        { name: '가장 가까운 두 점', platform: 'boj', id: '2261' },
        { name: '가장 가까운 두 점 (제곱)', platform: 'boj', id: '2261' },
      ],
      tips: [
        '거리 비교 시 제곱근을 생략하고 제곱 거리로 비교하면 오차를 줄일 수 있습니다.',
        'strip 내에서 y좌표 차이가 d 이상이면 즉시 루프를 종료하세요.',
        'base case를 n ≤ 3으로 설정하면 안정적입니다.',
        '정렬을 매번 하면 O(n log² n)이 되므로, y좌표 정렬을 미리 해두면 O(n log n)을 보장합니다.',
      ],
    },
    {
      id: 'meet-in-the-middle',
      name: '중간에서 만나기 (Meet in the Middle)',
      description:
        '전체 탐색 공간을 반으로 나누어 각각 탐색한 뒤 결과를 합치는 기법입니다. O(2^N)을 O(2^(N/2))로 줄일 수 있어, N이 40 정도일 때 완전탐색 대신 사용합니다.',
      timeComplexity: 'O(2^(N/2) × N)',
      spaceComplexity: 'O(2^(N/2))',
      keyInsight:
        '집합을 절반으로 나누고, 한쪽의 모든 부분집합 결과를 미리 구해 정렬한 뒤, 다른 쪽을 순회하며 이분 탐색으로 조건을 만족하는 조합을 찾습니다.',
      tools: [
        {
          name: 'bisect',
          description:
            '한쪽 부분집합 합을 정렬한 뒤 bisect_left/bisect_right로 목표 값의 개수를 O(log N)에 구합니다.',
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
      ],
      tips: [
        'N이 20 이하면 완전탐색, 40 이하면 Meet in the Middle을 고려하세요.',
        '한쪽을 정렬 후 이분 탐색하거나, Counter/딕셔너리로 O(1) 조회하는 방법도 있습니다.',
        '공집합 처리에 주의하세요. 문제에 따라 공집합을 포함/제외해야 할 수 있습니다.',
      ],
    },
  ],
}
