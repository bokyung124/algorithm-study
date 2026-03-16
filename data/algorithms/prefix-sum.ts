import type { Category } from '../../types/algorithm'

export const prefixSumCategory: Category = {
  id: 'prefix-sum',
  name: '누적 합',
  icon: '➕',
  description:
    '배열의 구간 합을 빠르게 구하기 위해 미리 누적 합 배열을 전처리하는 기법입니다. 코딩 테스트에서 구간 합 쿼리, 2차원 영역 합, 부분 배열의 합 조건 등 다양한 문제에 활용됩니다.',
  patterns: [
    {
      id: 'prefix-sum-1d',
      name: '1D 누적 합',
      description:
        '1차원 배열에서 누적 합 배열을 미리 구해두면 임의의 구간 [l, r]의 합을 O(1)에 구할 수 있습니다. 전처리 O(N), 쿼리 O(1)로 반복적인 구간 합 질의에 효율적입니다.',
      timeComplexity: 'O(N) 전처리 + O(1) 쿼리',
      spaceComplexity: 'O(N)',
      keyInsight:
        'prefix[i] = arr[0] + arr[1] + ... + arr[i-1]로 정의하면, 구간 합 arr[l..r] = prefix[r+1] - prefix[l]로 O(1)에 구할 수 있습니다. 누적 합 배열을 한 번만 만들면 여러 쿼리를 빠르게 처리합니다.',
      pythonTools: [
        {
          name: 'itertools.accumulate',
          description: '배열의 누적 합을 한 줄로 생성합니다. initial=0 옵션을 사용하면 prefix[0]=0인 누적 합 배열을 바로 만들 수 있습니다.',
          import: 'from itertools import accumulate',
        },
        {
          name: 'defaultdict',
          description: '누적 합과 해시맵을 결합하는 응용 문제에서 빈도를 관리할 때 사용합니다.',
          import: 'from collections import defaultdict',
        },
      ],
      codeExamples: [
        {
          title: '누적 합 배열 생성과 구간 합 쿼리',
          code: `import sys
from itertools import accumulate
input = sys.stdin.readline

def solve():
    n, m = map(int, input().split())
    arr = list(map(int, input().split()))

    # 누적 합 배열 생성 (prefix[0] = 0)
    prefix = [0] + list(accumulate(arr))

    for _ in range(m):
        i, j = map(int, input().split())
        # 구간 합: prefix[j] - prefix[i-1]
        print(prefix[j] - prefix[i - 1])

# BOJ 11659 - 구간 합 구하기 4
solve()`,
          explanation:
            'prefix 배열을 만들 때 맨 앞에 0을 추가하면 인덱스 처리가 편리합니다. 구간 [i, j]의 합은 prefix[j] - prefix[i-1]로 O(1)에 구합니다.',
        },
      ],
      commonProblems: [
        { name: '구간 합 구하기 4', platform: 'boj', id: '11659' },
        { name: 'Range Sum Query - Immutable', platform: 'leetcode', id: '303', slug: 'range-sum-query-immutable', difficulty: 'Easy' },
        { name: '수열', platform: 'boj', id: '2559' },
      ],
      tips: [
        'prefix 배열의 크기를 n+1로 잡고 prefix[0]=0으로 두면 경계 처리가 간단합니다.',
        'itertools.accumulate를 사용하면 누적 합 배열을 한 줄로 생성할 수 있습니다.',
        '구간 합 문제에서 쿼리 수가 많을 때 누적 합이 매우 효과적입니다.',
        '음수가 포함된 배열에서도 누적 합은 정상 동작합니다.',
      ],
    },
    {
      id: 'prefix-sum-2d',
      name: '2D 누적 합',
      description:
        '2차원 배열에서 부분 직사각형 영역의 합을 O(1)에 구하는 기법입니다. 포함-배제(Inclusion-Exclusion) 원리를 사용하여 2D 누적 합 테이블을 전처리합니다.',
      timeComplexity: 'O(NM) 전처리 + O(1) 쿼리',
      spaceComplexity: 'O(NM)',
      keyInsight:
        '2D 누적 합 테이블에서 (r1,c1)~(r2,c2) 영역의 합은 prefix[r2][c2] - prefix[r1-1][c2] - prefix[r2][c1-1] + prefix[r1-1][c1-1]로 구합니다. 포함-배제 원리로 겹치는 부분을 보정합니다.',
      pythonTools: [
        {
          name: 'itertools.accumulate',
          description: '각 행의 누적 합을 생성할 때 활용합니다. 2D 누적 합은 행 방향, 열 방향으로 두 번 누적합니다.',
          import: 'from itertools import accumulate',
        },
        {
          name: 'defaultdict',
          description: '2D 배열을 딕셔너리로 관리할 때 기본값 처리에 사용합니다.',
          import: 'from collections import defaultdict',
        },
      ],
      codeExamples: [
        {
          title: '2D 누적 합과 포함-배제 원리',
          code: `import sys
input = sys.stdin.readline

def solve():
    n, m = map(int, input().split())

    # 2D 누적 합 테이블 (1-indexed, 0행/0열은 0)
    prefix = [[0] * (n + 1) for _ in range(n + 1)]

    for i in range(1, n + 1):
        row = list(map(int, input().split()))
        for j in range(1, n + 1):
            prefix[i][j] = (row[j - 1]
                + prefix[i - 1][j]
                + prefix[i][j - 1]
                - prefix[i - 1][j - 1])

    for _ in range(m):
        x1, y1, x2, y2 = map(int, input().split())
        # 포함-배제로 영역 합 계산
        result = (prefix[x2][y2]
            - prefix[x1 - 1][y2]
            - prefix[x2][y1 - 1]
            + prefix[x1 - 1][y1 - 1])
        print(result)

# BOJ 11660 - 구간 합 구하기 5
solve()`,
          explanation:
            'prefix[i][j]는 (1,1)~(i,j) 영역의 합입니다. 전처리 시 위쪽, 왼쪽을 더하고 겹치는 왼쪽 위를 빼줍니다. 쿼리 시에도 포함-배제 원리를 적용하여 O(1)에 구합니다.',
        },
      ],
      commonProblems: [
        { name: '구간 합 구하기 5', platform: 'boj', id: '11660' },
        { name: 'Range Sum Query 2D - Immutable', platform: 'leetcode', id: '304', slug: 'range-sum-query-2d-immutable', difficulty: 'Medium' },
        { name: '2차원 배열의 합', platform: 'boj', id: '2167' },
      ],
      tips: [
        '2D 누적 합 테이블을 만들 때 0행, 0열을 0으로 패딩하면 경계 처리가 간단합니다.',
        '포함-배제 공식에서 부호를 헷갈리지 않도록 그림을 그려보세요.',
        '행 우선 또는 열 우선으로 누적하는 순서를 통일하세요.',
        '3D 이상으로 확장할 수 있지만, 코딩 테스트에서는 2D까지가 대부분입니다.',
      ],
    },
    {
      id: 'range-sum-query',
      name: '구간 합과 응용',
      description:
        '누적 합과 해시맵을 결합하여 "합이 K인 부분 배열의 개수"와 같은 응용 문제를 O(N)에 풀 수 있습니다. 누적 합의 차를 이용해 구간 합 조건을 변환하는 것이 핵심입니다.',
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(N)',
      keyInsight:
        'prefix[j] - prefix[i] = K가 되려면 prefix[i] = prefix[j] - K인 i가 존재하면 됩니다. 해시맵에 지금까지의 누적 합 빈도를 저장하며 순회하면 O(N)에 해결됩니다.',
      pythonTools: [
        {
          name: 'itertools.accumulate',
          description: '누적 합 배열을 생성합니다. 해시맵과 결합하여 조건을 만족하는 구간을 빠르게 찾습니다.',
          import: 'from itertools import accumulate',
        },
        {
          name: 'defaultdict',
          description: '누적 합의 등장 빈도를 관리합니다. 키가 없을 때 자동으로 0을 반환하여 코드가 간결해집니다.',
          import: 'from collections import defaultdict',
        },
      ],
      codeExamples: [
        {
          title: '합이 K인 부분 배열의 개수 (Subarray Sum Equals K)',
          code: `from collections import defaultdict

def subarray_sum(nums, k):
    count = 0
    prefix = 0
    prefix_count = defaultdict(int)
    prefix_count[0] = 1  # 빈 접두사 (합 0)

    for num in nums:
        prefix += num
        # prefix - k가 이전에 등장했다면 구간 합이 k
        count += prefix_count[prefix - k]
        prefix_count[prefix] += 1

    return count

# LeetCode 560 - Subarray Sum Equals K
nums = [1, 2, 3, -1, 1, 2]
k = 3
print(subarray_sum(nums, k))  # 4`,
          explanation:
            '누적 합을 순회하며, prefix - k가 이전에 몇 번 등장했는지를 해시맵에서 조회합니다. 등장 횟수만큼 합이 k인 구간이 존재합니다. 초기에 prefix_count[0]=1로 설정하여 처음부터 시작하는 구간을 처리합니다.',
        },
      ],
      commonProblems: [
        { name: 'Subarray Sum Equals K', platform: 'leetcode', id: '560', slug: 'subarray-sum-equals-k', difficulty: 'Medium' },
        { name: '나머지 합', platform: 'boj', id: '10986' },
        { name: 'Binary Subarrays With Sum', platform: 'leetcode', id: '930', slug: 'binary-subarrays-with-sum', difficulty: 'Medium' },
      ],
      tips: [
        'prefix_count[0] = 1 초기화를 잊지 마세요. 처음부터 시작하는 구간을 놓칩니다.',
        '나머지 합 문제에서는 prefix % M의 빈도를 저장하여 같은 나머지끼리 조합합니다.',
        '음수가 포함된 배열에서는 투포인터 대신 누적 합 + 해시맵을 사용하세요.',
        '누적 합 배열 자체를 저장하지 않고 변수 하나로 순회하면 공간을 절약할 수 있습니다.',
      ],
    },
  ],
}
