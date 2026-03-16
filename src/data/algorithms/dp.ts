import type { Category } from '../../types/algorithm'

export const dp: Category = {
  id: 'dp',
  name: '다이나믹 프로그래밍',
  icon: '🧩',
  description:
    '큰 문제를 작은 하위 문제로 나누어 풀고, 그 결과를 저장하여 재활용하는 알고리즘 설계 기법입니다. 코딩 테스트에서 가장 빈출되는 주제 중 하나입니다.',
  patterns: [
    {
      id: 'knapsack',
      name: '배낭 문제 (Knapsack)',
      description:
        '제한된 용량의 배낭에 최대 가치를 담는 문제입니다. 0/1 배낭과 무한 배낭 두 가지 변형이 있습니다.',
      timeComplexity: 'O(n * W) (n: 물건 수, W: 배낭 용량)',
      spaceComplexity: 'O(W) (1차원 최적화 시)',
      keyInsight:
        'dp[w] = 용량 w일 때의 최대 가치로 정의합니다. 각 물건에 대해 넣을지 말지를 결정하며, 0/1 배낭은 역순으로, 무한 배낭은 순방향으로 순회합니다.',
      pythonTools: [
        {
          name: 'list',
          description:
            '[0] * (capacity + 1)로 1차원 DP 테이블을 생성하거나, [[0]*W for _ in range(n)]으로 2차원 테이블을 만듭니다.',
          import: '내장 자료형',
        },
      ],
      codeExamples: [
        {
          title: '0/1 배낭 문제',
          code: `def knapsack_01(weights, values, capacity):
    n = len(weights)
    dp = [0] * (capacity + 1)

    for i in range(n):
        # 역순으로 순회하여 각 물건을 최대 1번만 사용
        for w in range(capacity, weights[i] - 1, -1):
            dp[w] = max(dp[w], dp[w - weights[i]] + values[i])

    return dp[capacity]

# 사용 예시
weights = [2, 3, 4, 5]
values = [3, 4, 5, 6]
capacity = 5
print(knapsack_01(weights, values, capacity))  # 7`,
          explanation:
            '1차원 배열로 최적화한 0/1 배낭입니다. 역순 순회가 핵심으로, 이전 단계의 값을 보존하여 같은 물건을 중복 선택하지 않도록 합니다.',
        },
        {
          title: '무한 배낭 문제 (동전 교환)',
          code: `def unbounded_knapsack(coins, amount):
    """금액 amount를 만드는 최소 동전 수"""
    INF = float('inf')
    dp = [INF] * (amount + 1)
    dp[0] = 0

    for coin in coins:
        # 순방향 순회: 같은 동전을 여러 번 사용 가능
        for w in range(coin, amount + 1):
            dp[w] = min(dp[w], dp[w - coin] + 1)

    return dp[amount] if dp[amount] != INF else -1

# 사용 예시
print(unbounded_knapsack([1, 5, 10], 27))  # 5 (10+10+5+1+1)`,
          explanation:
            '순방향 순회로 같은 동전을 여러 번 사용할 수 있도록 합니다. dp[w]는 금액 w를 만드는 데 필요한 최소 동전 수입니다.',
        },
      ],
      commonProblems: [
        { name: '평범한 배낭', platform: 'boj', id: '12865' },
        { name: '동전 1', platform: 'boj', id: '2293' },
        { name: 'LCS', platform: 'boj', id: '9251' },
        {
          name: 'Coin Change',
          platform: 'leetcode',
          id: '322',
          slug: 'coin-change',
          difficulty: 'Medium',
        },
        {
          name: 'House Robber',
          platform: 'leetcode',
          id: '198',
          slug: 'house-robber',
          difficulty: 'Medium',
        },
      ],
      tips: [
        '0/1 배낭은 역순, 무한 배낭은 순방향 순회를 기억하세요.',
        '2차원 DP를 먼저 떠올린 후 1차원으로 최적화하는 것이 안전합니다.',
        '물건의 수와 용량이 크면 다른 접근법(그리디, 이분 탐색 등)을 고려하세요.',
      ],
    },
    {
      id: 'lis',
      name: '최장 증가 부분 수열 (LIS)',
      description:
        '주어진 수열에서 순서를 유지하면서 값이 증가하는 가장 긴 부분 수열을 찾는 문제입니다.',
      timeComplexity: 'O(n log n) (이분 탐색 활용 시)',
      spaceComplexity: 'O(n)',
      keyInsight:
        'tails 배열을 유지하면서 이분 탐색으로 각 원소가 들어갈 위치를 찾습니다. tails[i]는 길이 i+1인 증가 부분 수열의 마지막 원소 중 최솟값입니다.',
      pythonTools: [
        {
          name: 'bisect',
          description:
            'bisect_left로 tails 배열에서 삽입 위치를 O(log n)에 찾아 LIS를 효율적으로 구합니다.',
          import: 'from bisect import bisect_left',
        },
        {
          name: 'list',
          description:
            'tails 배열을 append로 확장하고 인덱스로 갱신하여 현재까지의 최적 LIS 끝값을 관리합니다.',
          import: '내장 자료형',
        },
      ],
      codeExamples: [
        {
          title: 'LIS - O(n²) DP',
          code: `def lis_dp(arr):
    n = len(arr)
    dp = [1] * n  # dp[i]: arr[i]를 마지막으로 하는 LIS 길이

    for i in range(1, n):
        for j in range(i):
            if arr[j] < arr[i]:
                dp[i] = max(dp[i], dp[j] + 1)

    return max(dp)

# 사용 예시
print(lis_dp([10, 20, 10, 30, 20, 50]))  # 4 (10, 20, 30, 50)`,
          explanation:
            'dp[i]는 arr[i]로 끝나는 가장 긴 증가 부분 수열의 길이입니다. 모든 이전 원소를 확인하여 갱신합니다.',
        },
        {
          title: 'LIS - O(n log n) 이분 탐색',
          code: `from bisect import bisect_left

def lis_binary(arr):
    tails = []
    for num in arr:
        pos = bisect_left(tails, num)
        if pos == len(tails):
            tails.append(num)
        else:
            tails[pos] = num
    return len(tails)

# 사용 예시
print(lis_binary([10, 20, 10, 30, 20, 50]))  # 4

# 실제 LIS 수열 복원
def lis_with_sequence(arr):
    n = len(arr)
    tails = []
    indices = []       # tails에서의 위치 기록
    for num in arr:
        pos = bisect_left(tails, num)
        if pos == len(tails):
            tails.append(num)
        else:
            tails[pos] = num
        indices.append(pos)

    # 역추적으로 수열 복원
    lis_len = len(tails)
    result = [0] * lis_len
    target = lis_len - 1
    for i in range(n - 1, -1, -1):
        if indices[i] == target:
            result[target] = arr[i]
            target -= 1
    return result

print(lis_with_sequence([10, 20, 10, 30, 20, 50]))
# [10, 20, 30, 50]`,
          explanation:
            'tails 배열에서 bisect_left로 삽입 위치를 찾아 갱신합니다. tails의 길이가 LIS 길이이며, 실제 수열 복원도 가능합니다.',
        },
      ],
      commonProblems: [
        { name: '가장 긴 증가하는 부분 수열', platform: 'boj', id: '11053' },
        { name: '가장 긴 증가하는 부분 수열 2', platform: 'boj', id: '12015' },
        { name: '가장 긴 증가하는 부분 수열 5', platform: 'boj', id: '14003' },
        {
          name: 'Longest Increasing Subsequence',
          platform: 'leetcode',
          id: '300',
          slug: 'longest-increasing-subsequence',
          difficulty: 'Medium',
        },
      ],
      tips: [
        'n이 작으면(1000 이하) O(n²) DP로 충분합니다.',
        'n이 크면(10만 이상) 반드시 O(n log n) 풀이를 사용하세요.',
        '최장 감소 부분 수열은 배열을 뒤집어서 LIS를 구하면 됩니다.',
        '수열 복원이 필요한 경우 인덱스를 기록하여 역추적하세요.',
      ],
    },
    {
      id: 'fibonacci-memoization',
      name: '메모이제이션과 타뷸레이션',
      description:
        'DP의 두 가지 구현 방식입니다. 메모이제이션(Top-Down)은 재귀 + 캐싱, 타뷸레이션(Bottom-Up)은 반복문으로 테이블을 채웁니다.',
      timeComplexity: '문제에 따라 다름',
      spaceComplexity: '문제에 따라 다름',
      keyInsight:
        'Top-Down은 필요한 부분 문제만 계산하고, Bottom-Up은 모든 부분 문제를 순서대로 계산합니다. 상태 전이식을 세우는 것이 핵심입니다.',
      pythonTools: [
        {
          name: 'functools.lru_cache',
          description:
            '@lru_cache(maxsize=None) 데코레이터로 재귀 함수의 결과를 자동 캐싱하여 메모이제이션을 한 줄로 구현합니다.',
          import: 'from functools import lru_cache',
        },
        {
          name: 'sys',
          description:
            'sys.setrecursionlimit(10**6)으로 Python 기본 재귀 깊이 제한(1000)을 해제하여 깊은 재귀 호출을 허용합니다.',
          import: 'import sys',
        },
      ],
      codeExamples: [
        {
          title: '피보나치 - Top-Down (메모이제이션)',
          code: `import sys
sys.setrecursionlimit(10000)

def fib_memo(n, memo={}):
    if n <= 1:
        return n
    if n not in memo:
        memo[n] = fib_memo(n - 1) + fib_memo(n - 2)
    return memo[n]

# 또는 functools.lru_cache 활용
from functools import lru_cache

@lru_cache(maxsize=None)
def fib(n):
    if n <= 1:
        return n
    return fib(n - 1) + fib(n - 2)

print(fib(50))  # 12586269025`,
          explanation:
            '재귀적으로 호출하되, 이미 계산한 결과를 딕셔너리나 lru_cache에 저장하여 중복 계산을 방지합니다.',
        },
        {
          title: '계단 오르기 - Bottom-Up (타뷸레이션)',
          code: `def climb_stairs(n):
    """한 번에 1칸 또는 2칸 오를 수 있을 때 n칸을 오르는 방법의 수"""
    if n <= 2:
        return n
    dp = [0] * (n + 1)
    dp[1] = 1
    dp[2] = 2
    for i in range(3, n + 1):
        dp[i] = dp[i - 1] + dp[i - 2]
    return dp[n]

# 공간 최적화 버전
def climb_stairs_opt(n):
    if n <= 2:
        return n
    prev2, prev1 = 1, 2
    for _ in range(3, n + 1):
        prev2, prev1 = prev1, prev2 + prev1
    return prev1

print(climb_stairs(10))      # 89
print(climb_stairs_opt(10))  # 89`,
          explanation:
            'Bottom-Up 방식으로 작은 문제부터 순서대로 테이블을 채웁니다. 이전 두 값만 필요하므로 변수 두 개로 공간을 O(1)로 최적화할 수 있습니다.',
        },
      ],
      commonProblems: [
        { name: '피보나치 함수', platform: 'boj', id: '1003' },
        { name: '계단 오르기', platform: 'boj', id: '2579' },
        { name: 'RGB거리', platform: 'boj', id: '1149' },
        { name: '1, 2, 3 더하기', platform: 'boj', id: '9095' },
        {
          name: 'Climbing Stairs',
          platform: 'leetcode',
          id: '70',
          slug: 'climbing-stairs',
          difficulty: 'Easy',
        },
      ],
      tips: [
        'Python은 재귀 깊이 제한이 있으므로 sys.setrecursionlimit 설정이 필요합니다.',
        '재귀가 깊어질 수 있으면 Bottom-Up이 더 안전합니다.',
        '점화식을 세운 뒤 필요한 이전 상태만 저장하여 공간을 절약하세요.',
        '@lru_cache는 편리하지만 메모리 사용량에 주의하세요.',
      ],
    },
    {
      id: 'interval-dp',
      name: '구간 DP',
      description:
        '연속된 구간에 대한 최적해를 구하는 DP 유형입니다. 구간을 나누는 지점을 기준으로 부분 문제를 합칩니다.',
      timeComplexity: 'O(n³)',
      spaceComplexity: 'O(n²)',
      keyInsight:
        'dp[i][j]를 구간 [i, j]에 대한 최적값으로 정의하고, 구간의 길이를 늘려가며 테이블을 채웁니다. 분할 지점 k를 순회하여 dp[i][k]와 dp[k+1][j]를 합칩니다.',
      pythonTools: [
        {
          name: 'list',
          description:
            '[[0]*n for _ in range(n)]으로 2차원 DP 테이블을 생성합니다. 주의: [[0]*n]*n은 참조 복사이므로 사용 금지.',
          import: '내장 자료형',
        },
        {
          name: "float('inf')",
          description:
            '최솟값을 구하는 DP에서 초기값을 무한대로 설정할 때 사용합니다. INF = float("inf")로 선언합니다.',
          import: '내장 함수',
        },
      ],
      codeExamples: [
        {
          title: '행렬 곱셈 순서 최적화',
          code: `def matrix_chain(dims):
    """dims[i-1] x dims[i] 크기의 행렬들을 곱하는 최소 연산 횟수"""
    n = len(dims) - 1  # 행렬 개수
    INF = float('inf')
    dp = [[0] * n for _ in range(n)]

    # 길이가 2인 구간부터 n인 구간까지
    for length in range(2, n + 1):
        for i in range(n - length + 1):
            j = i + length - 1
            dp[i][j] = INF
            for k in range(i, j):
                cost = dp[i][k] + dp[k + 1][j] + dims[i] * dims[k + 1] * dims[j + 1]
                dp[i][j] = min(dp[i][j], cost)

    return dp[0][n - 1]

# 행렬 크기: 10x30, 30x5, 5x60
print(matrix_chain([10, 30, 5, 60]))  # 4500`,
          explanation:
            'dp[i][j]는 i번째부터 j번째 행렬까지 곱하는 최소 비용입니다. 분할점 k를 모든 가능한 위치에서 시도하여 최솟값을 구합니다.',
        },
        {
          title: '팰린드롬 만들기 (최소 삽입)',
          code: `def min_insertions_palindrome(s):
    """문자열을 팰린드롬으로 만들기 위한 최소 삽입 횟수"""
    n = len(s)
    # dp[i][j]: s[i..j]를 팰린드롬으로 만드는 최소 삽입 횟수
    dp = [[0] * n for _ in range(n)]

    for length in range(2, n + 1):
        for i in range(n - length + 1):
            j = i + length - 1
            if s[i] == s[j]:
                dp[i][j] = dp[i + 1][j - 1]
            else:
                dp[i][j] = min(dp[i + 1][j], dp[i][j - 1]) + 1

    return dp[0][n - 1]

print(min_insertions_palindrome("abcd"))  # 3 (dcbabcd)
print(min_insertions_palindrome("abcba"))  # 0`,
          explanation:
            '양 끝 문자가 같으면 안쪽 구간의 답과 동일하고, 다르면 한쪽을 추가하는 비용 중 최솟값 + 1입니다.',
        },
      ],
      commonProblems: [
        { name: '행렬 곱셈 순서', platform: 'boj', id: '11049' },
        { name: '팰린드롬?', platform: 'boj', id: '10942' },
        { name: '파일 합치기', platform: 'boj', id: '11066' },
        {
          name: 'Burst Balloons',
          platform: 'leetcode',
          id: '312',
          slug: 'burst-balloons',
          difficulty: 'Hard',
        },
      ],
      tips: [
        '구간의 길이를 작은 것부터 큰 것 순으로 채워야 합니다.',
        'dp[i][j]의 정의를 명확히 하는 것이 가장 중요합니다.',
        'O(n³)이므로 n이 500 이하인 문제에서 주로 사용됩니다.',
      ],
    },
  ],
}
