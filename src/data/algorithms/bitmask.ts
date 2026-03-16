import type { Category } from '../../types/algorithm'

export const bitmaskCategory: Category = {
  id: 'bitmask',
  name: '비트마스킹',
  icon: '💻',
  description: '비트 연산을 활용하여 집합을 정수로 표현하고, 부분집합 열거 및 DP 상태 압축에 활용하는 패턴을 학습합니다.',
  patterns: [
    {
      id: 'bit-operations',
      name: '비트 연산 기초',
      description: 'AND, OR, XOR, 시프트 등 기본 비트 연산을 활용하여 특정 비트 확인, 설정, 토글, 제거 등을 수행합니다.',
      timeComplexity: 'O(1) (단일 연산)',
      spaceComplexity: 'O(1)',
      keyInsight: '정수의 각 비트를 하나의 원소로 보면, 집합 연산을 비트 연산으로 O(1)에 수행할 수 있습니다. i번째 비트가 1이면 i번 원소가 집합에 포함된 것입니다.',
      pythonTools: [
        {
          name: '비트 연산자 (&, |, ^, ~, <<, >>)',
          description: 'AND(&), OR(|), XOR(^), NOT(~), 왼쪽 시프트(<<), 오른쪽 시프트(>>)로 비트 단위 집합 연산을 O(1)에 수행합니다.',
          import: '내장 연산자',
        },
        {
          name: 'bin()',
          description: '정수를 이진 문자열로 변환하여 비트 상태를 확인합니다. bin(10) -> "0b1010". 디버깅과 비트 패턴 검증에 유용합니다.',
          import: '내장 함수',
        },
      ],
      codeExamples: [
        {
          title: '비트 연산 기본 패턴',
          code: `# 기본 비트 연산
def bit_operations_demo():
    # i번째 비트 확인 (0-indexed)
    def has_bit(mask: int, i: int) -> bool:
        return (mask >> i) & 1 == 1

    # i번째 비트 설정 (켜기)
    def set_bit(mask: int, i: int) -> int:
        return mask | (1 << i)

    # i번째 비트 제거 (끄기)
    def clear_bit(mask: int, i: int) -> int:
        return mask & ~(1 << i)

    # i번째 비트 토글
    def toggle_bit(mask: int, i: int) -> int:
        return mask ^ (1 << i)

    # 켜진 비트 수 세기
    def count_bits(mask: int) -> int:
        return bin(mask).count('1')

    # 가장 낮은 켜진 비트
    def lowest_bit(mask: int) -> int:
        return mask & (-mask)

    # 가장 낮은 켜진 비트 제거
    def remove_lowest_bit(mask: int) -> int:
        return mask & (mask - 1)

    # 예시: mask = 0b10110 = 22 → {1, 2, 4} 집합
    mask = 0b10110  # 22
    print(f"mask = {mask} = {bin(mask)}")
    print(f"1번 비트 확인: {has_bit(mask, 1)}")    # True
    print(f"0번 비트 설정: {bin(set_bit(mask, 0))}")  # 0b10111
    print(f"2번 비트 제거: {bin(clear_bit(mask, 2))}")  # 0b10010
    print(f"켜진 비트 수: {count_bits(mask)}")       # 3
    print(f"가장 낮은 비트: {bin(lowest_bit(mask))}")  # 0b10

bit_operations_demo()`,
          explanation: '비트마스크에서 i번째 비트는 i번 원소의 포함 여부를 나타냅니다. 시프트(<<, >>)와 AND, OR, XOR, NOT 연산을 조합하여 집합 연산을 O(1)에 수행합니다.',
        },
        {
          title: '비트 연산으로 유일한 수 찾기',
          code: `def single_number(nums: list[int]) -> int:
    """모든 수가 2번 등장하고 하나만 1번 등장할 때 그 수를 찾음"""
    result = 0
    for num in nums:
        result ^= num  # XOR: 같은 수는 상쇄됨
    return result

def single_number_iii(nums: list[int]) -> list[int]:
    """두 수만 1번 등장하고 나머지는 2번 등장할 때"""
    xor_all = 0
    for num in nums:
        xor_all ^= num
    # xor_all = a ^ b, 둘이 다른 비트를 찾아 그룹 분리
    diff_bit = xor_all & (-xor_all)
    a = b = 0
    for num in nums:
        if num & diff_bit:
            a ^= num
        else:
            b ^= num
    return [a, b]

# 예시
print(single_number([2, 1, 4, 1, 2]))        # 4
print(single_number_iii([1, 2, 1, 3, 2, 5]))  # [3, 5] 또는 [5, 3]`,
          explanation: 'XOR의 핵심 성질: a ^ a = 0, a ^ 0 = a. 같은 수를 두 번 XOR하면 상쇄되어 유일한 수만 남습니다. 두 개의 유일한 수가 있을 때는 차이 비트로 그룹을 나눕니다.',
        },
      ],
      commonProblems: [
        { name: 'Single Number', platform: 'leetcode', id: '136', slug: 'single-number', difficulty: 'Easy' },
        { name: 'Number of 1 Bits', platform: 'leetcode', id: '191', slug: 'number-of-1-bits', difficulty: 'Easy' },
        { name: 'Counting Bits', platform: 'leetcode', id: '338', slug: 'counting-bits', difficulty: 'Easy' },
        { name: '2의 거듭제곱 판별', platform: 'boj', id: '11689' },
        { name: '두 정수 사이의 비트 AND', platform: 'boj', id: '17436' },
        { name: '비트 뒤집기', platform: 'boj', id: '1111' },
      ],
      tips: [
        'Python에서 정수는 크기 제한이 없으므로 비트 수에 제한이 없습니다.',
        'n & (n-1)은 가장 낮은 1비트를 제거합니다. n & (n-1) == 0이면 2의 거듭제곱입니다.',
        'XOR은 교환법칙과 결합법칙이 성립하며, 같은 값을 두 번 XOR하면 상쇄됩니다.',
      ],
    },
    {
      id: 'subset-enumeration',
      name: '부분집합 열거',
      description: 'N개 원소의 모든 부분집합을 비트마스크로 표현하여 2^N개의 부분집합을 체계적으로 열거합니다.',
      timeComplexity: 'O(2^n) 또는 O(3^n)',
      spaceComplexity: 'O(2^n)',
      keyInsight: '0부터 2^N-1까지의 정수 각각이 하나의 부분집합을 나타냅니다. 특정 마스크의 부분집합만 열거할 때는 submask = (submask - 1) & mask 패턴을 사용합니다.',
      pythonTools: [
        {
          name: 'range(1 << n)',
          description: '0부터 2^n-1까지 순회하며 모든 부분집합을 열거합니다. 1 << n은 2의 n제곱을 비트 시프트로 빠르게 계산합니다.',
          import: '내장 함수',
        },
        {
          name: '비트 연산자 (&, |, <<)',
          description: 'mask & (1 << i)로 원소 포함 여부 확인, (submask - 1) & mask로 부분마스크 열거 패턴을 구현합니다.',
          import: '내장 연산자',
        },
      ],
      codeExamples: [
        {
          title: '모든 부분집합 열거',
          code: `def enumerate_subsets(elements: list) -> list[list]:
    """모든 부분집합을 비트마스크로 열거"""
    n = len(elements)
    subsets = []
    for mask in range(1 << n):  # 0 ~ 2^n - 1
        subset = []
        for i in range(n):
            if mask & (1 << i):
                subset.append(elements[i])
        subsets.append(subset)
    return subsets

def enumerate_submasks(mask: int) -> list[int]:
    """주어진 mask의 모든 부분마스크를 열거 (공집합 포함)"""
    submasks = []
    submask = mask
    while submask > 0:
        submasks.append(submask)
        submask = (submask - 1) & mask
    submasks.append(0)  # 공집합
    return submasks

# 예시
print(enumerate_subsets(['a', 'b', 'c']))
# [[], ['a'], ['b'], ['a', 'b'], ['c'], ['a', 'c'], ['b', 'c'], ['a', 'b', 'c']]

# mask = 0b1010 (원소 1, 3 포함)의 부분마스크
print([bin(s) for s in enumerate_submasks(0b1010)])
# ['0b1010', '0b1000', '0b10', '0b0']`,
          explanation: '모든 부분집합: 0~2^n-1을 순회하며 각 비트를 확인합니다. 부분마스크 열거: (submask-1) & mask로 현재 마스크 내의 비트만 유지하면서 1씩 줄여갑니다.',
        },
        {
          title: '부분집합의 합 문제 (Meet in the Middle)',
          code: `from itertools import combinations

def subset_sum_count(arr: list[int], target: int) -> int:
    """배열에서 합이 target인 부분집합의 수 (N <= 40)"""
    n = len(arr)
    half = n // 2

    def get_all_sums(elements: list[int]) -> dict[int, int]:
        sums = {0: 1}
        for elem in elements:
            new_sums = {}
            for s, cnt in sums.items():
                new_sums[s] = new_sums.get(s, 0) + cnt
                new_sums[s + elem] = new_sums.get(s + elem, 0) + cnt
            sums = new_sums
        return sums

    left_sums = get_all_sums(arr[:half])
    right_sums = get_all_sums(arr[half:])

    count = 0
    for s, cnt in left_sums.items():
        need = target - s
        if need in right_sums:
            count += cnt * right_sums[need]
    return count

# 예시
arr = [1, 2, 3, 4, 5]
print(subset_sum_count(arr, 5))   # 3 ({5}, {2,3}, {1,4})
print(subset_sum_count(arr, 10))  # 3 ({1,4,5}, {2,3,5}, {1,2,3,4})`,
          explanation: '배열을 반으로 나누어 각각의 부분집합 합을 구한 뒤, 양쪽의 합이 target이 되는 조합을 찾습니다. O(2^n)을 O(2^(n/2))로 줄입니다.',
        },
      ],
      commonProblems: [
        { name: 'Subsets', platform: 'leetcode', id: '78', slug: 'subsets', difficulty: 'Medium' },
        { name: '부분집합의 합', platform: 'boj', id: '1182' },
        { name: '외판원 문제 (TSP)', platform: 'boj', id: '2098' },
        { name: '최소 버텍스 커버', platform: 'boj', id: '2533' },
        { name: 'Meet in the Middle', platform: 'boj', id: '1208' },
      ],
      tips: [
        'N이 20 이하면 2^N = 약 100만이므로 완전 탐색이 가능합니다.',
        'N이 40 이하면 Meet in the Middle (반으로 나누어 합치기)을 고려하세요.',
        '부분마스크 열거의 전체 시간복잡도는 O(3^n)입니다 (각 원소가 포함/부분마스크/미포함).',
      ],
    },
    {
      id: 'bitmask-dp',
      name: '비트마스크 DP',
      description: '방문한 집합의 상태를 비트마스크로 압축하여 DP 테이블의 인덱스로 사용합니다. 외판원 문제(TSP)가 대표적입니다.',
      timeComplexity: 'O(2^n * n^2) (TSP 기준)',
      spaceComplexity: 'O(2^n * n)',
      keyInsight: '현재 상태를 "어떤 원소들을 사용했는가"로 표현하면, 집합을 하나의 정수(비트마스크)로 압축하여 DP 테이블 인덱스로 활용할 수 있습니다.',
      pythonTools: [
        {
          name: 'list',
          description: 'DP 테이블을 2차원 리스트로 생성합니다. [[INF] * n for _ in range(1 << n)]으로 상태 공간 크기만큼 초기화합니다.',
          import: '내장 자료형',
        },
        {
          name: '1 << n',
          description: '비트 시프트로 상태 공간 크기 2^n을 계산합니다. (1 << n) - 1은 모든 원소가 포함된 전체 집합 마스크를 나타냅니다.',
          import: '내장 연산자',
        },
      ],
      codeExamples: [
        {
          title: '외판원 문제 (TSP)',
          code: `def tsp(dist: list[list[int]]) -> int:
    """모든 도시를 정확히 한 번 방문하고 출발점으로 돌아오는 최소 비용"""
    n = len(dist)
    INF = float('inf')
    # dp[mask][i] = mask에 포함된 도시들을 방문하고 현재 i에 있을 때의 최소 비용
    dp = [[INF] * n for _ in range(1 << n)]
    dp[1][0] = 0  # 0번 도시에서 출발

    for mask in range(1 << n):
        for u in range(n):
            if dp[mask][u] == INF:
                continue
            if not (mask & (1 << u)):
                continue
            for v in range(n):
                if mask & (1 << v):  # 이미 방문한 도시
                    continue
                next_mask = mask | (1 << v)
                cost = dp[mask][u] + dist[u][v]
                if cost < dp[next_mask][v]:
                    dp[next_mask][v] = cost

    # 모든 도시를 방문한 후 출발점으로 돌아가는 비용
    full_mask = (1 << n) - 1
    result = INF
    for u in range(n):
        if dp[full_mask][u] + dist[u][0] < result:
            result = dp[full_mask][u] + dist[u][0]
    return result

# 예시: 4개 도시의 거리 행렬
dist = [
    [0, 10, 15, 20],
    [10, 0, 35, 25],
    [15, 35, 0, 30],
    [20, 25, 30, 0],
]
print(tsp(dist))  # 80 (0->1->3->2->0: 10+25+30+15)`,
          explanation: '비트마스크 mask로 방문한 도시 집합을 표현합니다. dp[mask][u]는 mask의 도시들을 방문하고 u에 있을 때의 최소 비용입니다. 모든 상태를 순회하며 다음 도시로의 전이를 갱신합니다.',
        },
        {
          title: '배열을 K개 그룹으로 나누기',
          code: `def can_partition_k_subsets(nums: list[int], k: int) -> bool:
    """배열을 합이 같은 k개 부분집합으로 나눌 수 있는지"""
    total = sum(nums)
    if total % k != 0:
        return False
    target = total // k
    n = len(nums)
    nums.sort(reverse=True)  # 큰 수부터 (가지치기)

    if nums[0] > target:
        return False

    # dp[mask] = mask에 해당하는 원소들을 선택했을 때
    #            현재 그룹에서의 부분합 (target으로 나눈 나머지)
    dp = [-1] * (1 << n)
    dp[0] = 0

    for mask in range(1 << n):
        if dp[mask] == -1:
            continue
        for i in range(n):
            if mask & (1 << i):  # 이미 선택됨
                continue
            if dp[mask] + nums[i] > target:  # 현재 그룹 초과
                continue
            next_mask = mask | (1 << i)
            dp[next_mask] = (dp[mask] + nums[i]) % target

    return dp[(1 << n) - 1] == 0

# 예시
print(can_partition_k_subsets([4, 3, 2, 3, 5, 2, 1], 4))  # True
# [5], [1,4], [2,3], [2,3] → 각 합 = 5
print(can_partition_k_subsets([1, 2, 3, 4], 3))  # False`,
          explanation: 'dp[mask]에 현재 그룹의 부분합을 저장합니다. 부분합이 target에 도달하면 0으로 리셋(% target)되어 새 그룹이 시작됩니다. 최종적으로 모든 원소를 사용했을 때 부분합이 0이면 성공입니다.',
        },
      ],
      commonProblems: [
        { name: '외판원 문제 (TSP)', platform: 'boj', id: '2098' },
        { name: '배열을 K개 그룹으로 나누기', platform: 'boj', id: '12969' },
        { name: '최소 비용 해밀턴 경로', platform: 'boj', id: '2098' },
        { name: '집합의 할당 문제', platform: 'boj', id: '11723' },
        { name: '스티커 붙이기 (비트마스크로 행 상태 표현)', platform: 'boj', id: '9465' },
      ],
      tips: [
        'N이 20 이하일 때 비트마스크 DP를 고려하세요 (2^20 = 약 100만).',
        'DP 테이블 크기가 2^N * N이므로 메모리도 함께 확인하세요.',
        '비트마스크 DP에서 mask를 오름차순으로 순회하면 부분 문제가 먼저 처리됩니다.',
      ],
    },
  ],
}
