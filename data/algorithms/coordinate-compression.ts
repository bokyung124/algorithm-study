import type { Category } from '../../types/algorithm'

export const coordinateCompressionCategory: Category = {
  id: 'coordinate-compression',
  name: '좌표 압축',
  icon: '📐',
  description:
    '값의 범위가 매우 클 때, 상대적인 순서(랭크)만 보존하면서 값을 0부터 시작하는 연속된 정수로 변환하는 기법입니다. 세그먼트 트리, BIT 등 인덱스 기반 자료구조와 함께 자주 사용됩니다.',
  patterns: [
    {
      id: 'basic-compression',
      name: '기본 좌표 압축',
      description:
        '주어진 좌표(값)들을 정렬하고 중복을 제거한 뒤, 각 원래 값이 정렬된 배열에서 몇 번째인지(랭크)를 구합니다. bisect_left를 사용하면 O(log N)에 각 값의 압축된 인덱스를 찾을 수 있습니다.',
      timeComplexity: 'O(N log N)',
      spaceComplexity: 'O(N)',
      keyInsight:
        '값의 절대적인 크기는 무시하고 상대적 순서만 보존하면 되므로, 정렬 후 중복 제거한 배열에서의 위치(인덱스)가 곧 압축된 좌표가 됩니다.',
      pythonTools: [
        {
          name: 'sorted / set',
          description: '좌표를 정렬하고 중복을 제거하여 고유한 좌표 목록을 만듭니다. sorted(set(arr))로 간단히 구현합니다.',
          import: '내장 함수',
        },
        {
          name: 'bisect_left',
          description: '정렬된 고유 좌표 배열에서 이진 탐색으로 각 값의 압축된 인덱스를 O(log N)에 찾습니다.',
          import: 'from bisect import bisect_left',
        },
        {
          name: 'dict (해시맵)',
          description: '고유 좌표 → 압축 인덱스 매핑을 딕셔너리로 저장하면 O(1)에 조회할 수 있습니다.',
          import: '내장 자료형',
        },
      ],
      codeExamples: [
        {
          title: 'bisect_left를 이용한 좌표 압축',
          code: `import sys
from bisect import bisect_left
input = sys.stdin.readline

n = int(input())
arr = list(map(int, input().split()))

# 정렬 + 중복 제거
sorted_unique = sorted(set(arr))

# 각 원래 값을 압축된 인덱스로 변환
result = [bisect_left(sorted_unique, x) for x in arr]

print(' '.join(map(str, result)))`,
          explanation:
            'sorted(set(arr))로 고유한 값을 정렬하고, bisect_left로 각 원소가 정렬된 배열에서 몇 번째인지 구합니다. 예: [1000, 50, 999999, 3, 50] → sorted_unique = [3, 50, 1000, 999999] → 결과 [2, 1, 3, 0, 1].',
        },
        {
          title: '딕셔너리를 이용한 좌표 압축',
          code: `import sys
input = sys.stdin.readline

n = int(input())
arr = list(map(int, input().split()))

# 정렬 + 중복 제거 후 딕셔너리 매핑
sorted_unique = sorted(set(arr))
compress = {v: i for i, v in enumerate(sorted_unique)}

# O(1)로 각 값 변환
result = [compress[x] for x in arr]

print(' '.join(map(str, result)))`,
          explanation:
            '딕셔너리로 미리 매핑을 만들면 변환 시 O(1)이므로 bisect_left의 O(log N)보다 빠릅니다. 다만 메모리를 조금 더 사용합니다. 값이 매우 많을 때는 딕셔너리 방식이 유리합니다.',
        },
      ],
      commonProblems: [
        { name: '좌표 압축', platform: 'boj', id: '18870' },
        { name: '선 긋기', platform: 'boj', id: '2170' },
        { name: '수열의 변화', platform: 'boj', id: '2848' },
      ],
      tips: [
        'sorted(set(arr))는 정렬과 중복 제거를 한 번에 처리하는 파이썬 관용 표현입니다.',
        'bisect_left 방식은 추가 메모리 없이 바로 인덱스를 찾지만, 조회가 많으면 딕셔너리가 더 효율적입니다.',
        '좌표 압축 후 인덱스는 0부터 시작하므로, 1-based 인덱스가 필요하면 +1을 해주세요.',
        '구간(선분) 문제에서는 시작점과 끝점을 모두 좌표 목록에 포함시켜야 합니다.',
      ],
    },
    {
      id: 'compression-with-segment-tree',
      name: '좌표 압축 + 세그먼트 트리',
      description:
        '값의 범위가 너무 커서 배열 인덱스로 직접 사용할 수 없을 때, 좌표 압축으로 값을 줄인 뒤 세그먼트 트리(또는 BIT)에서 구간 쿼리를 수행합니다. 역전 수 세기, 순위 쿼리 등에 활용됩니다.',
      timeComplexity: 'O(N log N)',
      spaceComplexity: 'O(N)',
      keyInsight:
        '좌표를 압축하면 값의 범위가 최대 N이 되므로, 크기 N의 세그먼트 트리나 BIT를 만들어 효율적으로 구간 쿼리를 처리할 수 있습니다.',
      pythonTools: [
        {
          name: 'sorted / set / bisect_left',
          description: '좌표 압축을 위해 정렬, 중복 제거, 이진 탐색을 사용합니다.',
          import: 'from bisect import bisect_left',
        },
        {
          name: 'BIT (Binary Indexed Tree)',
          description: '압축된 좌표를 인덱스로 사용하여 구간 합 쿼리와 포인트 업데이트를 O(log N)에 처리합니다.',
          import: '직접 구현',
        },
        {
          name: 'sys.stdin.readline',
          description: '대량 입력 처리 시 빠른 입출력을 위해 사용합니다.',
          import: 'import sys',
        },
      ],
      codeExamples: [
        {
          title: '좌표 압축 + BIT로 역전 수(inversion count) 구하기',
          code: `import sys
from bisect import bisect_left
input = sys.stdin.readline

def update(bit, i, n):
    while i <= n:
        bit[i] += 1
        i += i & (-i)

def query(bit, i):
    s = 0
    while i > 0:
        s += bit[i]
        i -= i & (-i)
    return s

n = int(input())
arr = list(map(int, input().split()))

# 좌표 압축 (1-based)
sorted_unique = sorted(set(arr))
compress = {v: i + 1 for i, v in enumerate(sorted_unique)}
compressed = [compress[x] for x in arr]

m = len(sorted_unique)
bit = [0] * (m + 1)
inversion = 0

# 뒤에서부터 순회하며 자신보다 작은 수의 개수를 셈
for i in range(n - 1, -1, -1):
    inversion += query(bit, compressed[i] - 1)
    update(bit, compressed[i], m)

print(inversion)`,
          explanation:
            '배열을 뒤에서부터 순회하면서, 현재 값보다 작은 값이 이미 몇 개 삽입되었는지 BIT로 구간 합 쿼리합니다. 좌표 압축으로 BIT 크기를 값의 범위가 아닌 고유 값의 개수로 줄입니다. BOJ 1517 버블 소트 풀이에 활용됩니다.',
        },
        {
          title: '좌표 압축 + BIT로 앞에 있는 자신보다 작은 수 세기',
          code: `import sys
from bisect import bisect_left
input = sys.stdin.readline

def update(bit, i, n):
    while i <= n:
        bit[i] += 1
        i += i & (-i)

def query(bit, i):
    s = 0
    while i > 0:
        s += bit[i]
        i -= i & (-i)
    return s

n = int(input())
arr = list(map(int, input().split()))

# 좌표 압축 (1-based)
sorted_unique = sorted(set(arr))
compress = {v: i + 1 for i, v in enumerate(sorted_unique)}

m = len(sorted_unique)
bit = [0] * (m + 1)
result = []

# 앞에서부터 순회: 자기보다 앞에 있고 자기보다 빠른 선수 수
for x in arr:
    c = compress[x]
    # c-1까지의 합 = 자신보다 작은 값의 개수
    rank = query(bit, c - 1) + 1  # 순위 = 자기보다 작은 수 + 1
    result.append(rank)
    update(bit, c, m)

print('\\n'.join(map(str, result)))`,
          explanation:
            'BOJ 2517 달리기 문제 풀이입니다. 앞에서부터 순회하며 현재 값보다 작은 값이 앞에 몇 개 있는지 BIT로 셉니다. 좌표 압축으로 큰 값도 BIT 인덱스로 사용 가능하게 만듭니다.',
        },
      ],
      commonProblems: [
        { name: '달리기', platform: 'boj', id: '2517' },
        { name: '버블 소트', platform: 'boj', id: '1517' },
        { name: 'Count of Smaller Numbers After Self', platform: 'leetcode', id: '315', slug: 'count-of-smaller-numbers-after-self', difficulty: 'Hard' },
        { name: '수열과 쿼리 1', platform: 'boj', id: '13537' },
      ],
      tips: [
        'BIT는 1-based 인덱스를 사용하므로 좌표 압축 시 +1을 해주세요.',
        '역전 수를 구할 때는 뒤에서부터, 순위를 구할 때는 앞에서부터 순회하는 방향에 주의하세요.',
        '좌표 압축 후 BIT 크기는 고유한 값의 개수(len(set(arr)))로 충분합니다.',
        '값이 최대 10^9여도 좌표 압축하면 최대 N이 되어 BIT/세그트리를 쓸 수 있습니다.',
      ],
    },
  ],
}
