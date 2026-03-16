import type { Category } from '../../types/algorithm'

export const segmentTreeCategory: Category = {
  id: 'segment-tree',
  name: '세그먼트 트리',
  icon: '🏗️',
  description:
    '배열의 구간 쿼리(합, 최솟값, 최댓값 등)를 O(log N)에 처리하고, 값 업데이트도 O(log N)에 수행할 수 있는 트리 자료구조입니다. 대량의 구간 쿼리와 업데이트가 반복되는 문제에서 필수적입니다.',
  patterns: [
    {
      id: 'basic-segment-tree',
      name: '기본 세그먼트 트리',
      description:
        '배열을 이진 트리 형태로 저장하여 구간 합, 구간 최솟값 등의 쿼리를 효율적으로 처리합니다. 리프 노드는 원래 배열의 값을 갖고, 내부 노드는 자식 노드들의 연산 결과를 저장합니다.',
      timeComplexity: '빌드 O(N), 쿼리 O(log N), 업데이트 O(log N)',
      spaceComplexity: 'O(N)',
      keyInsight:
        '배열을 완전 이진 트리로 표현하면 부모-자식 관계를 인덱스 연산(2*i, 2*i+1)으로 빠르게 접근할 수 있고, 구간을 절반씩 나누어 재귀적으로 처리합니다.',
      pythonTools: [
        {
          name: 'list',
          description: '세그먼트 트리 배열을 4*N 크기로 생성하여 노드 값을 저장하는 데 사용합니다. [0] * (4 * n)으로 초기화합니다.',
          import: '내장 자료형',
        },
        {
          name: 'sys.stdin.readline',
          description: '대량의 구간 쿼리와 업데이트 입출력 시 input() 대신 사용하여 속도를 크게 개선합니다.',
          import: 'import sys',
        },
      ],
      codeExamples: [
        {
          title: '구간 합 세그먼트 트리',
          code: `import sys
input = sys.stdin.readline

class SegmentTree:
    def __init__(self, data):
        self.n = len(data)
        self.tree = [0] * (4 * self.n)
        if self.n > 0:
            self._build(data, 1, 0, self.n - 1)

    def _build(self, data, node, start, end):
        if start == end:
            self.tree[node] = data[start]
        else:
            mid = (start + end) // 2
            self._build(data, 2 * node, start, mid)
            self._build(data, 2 * node + 1, mid + 1, end)
            self.tree[node] = self.tree[2 * node] + self.tree[2 * node + 1]

    def update(self, idx, val, node=1, start=0, end=None):
        if end is None:
            end = self.n - 1
        if start == end:
            self.tree[node] = val
        else:
            mid = (start + end) // 2
            if idx <= mid:
                self.update(idx, val, 2 * node, start, mid)
            else:
                self.update(idx, val, 2 * node + 1, mid + 1, end)
            self.tree[node] = self.tree[2 * node] + self.tree[2 * node + 1]

    def query(self, l, r, node=1, start=0, end=None):
        if end is None:
            end = self.n - 1
        if r < start or end < l:
            return 0
        if l <= start and end <= r:
            return self.tree[node]
        mid = (start + end) // 2
        left_sum = self.query(l, r, 2 * node, start, mid)
        right_sum = self.query(l, r, 2 * node + 1, mid + 1, end)
        return left_sum + right_sum

# 사용 예시
n, m, k = map(int, input().split())
arr = [int(input()) for _ in range(n)]
seg = SegmentTree(arr)

for _ in range(m + k):
    a, b, c = map(int, input().split())
    if a == 1:
        seg.update(b - 1, c)
    else:
        print(seg.query(b - 1, c - 1))`,
          explanation:
            'build로 초기 트리를 구성하고, update로 특정 인덱스 값을 변경하며, query로 구간 합을 구합니다. 노드 번호 규칙: 부모 i → 왼쪽 자식 2i, 오른쪽 자식 2i+1. 구간이 완전히 벗어나면 0을 반환하고, 완전히 포함되면 노드 값을 반환합니다.',
        },
        {
          title: '구간 최솟값 세그먼트 트리',
          code: `import sys
input = sys.stdin.readline
INF = float('inf')

class MinSegTree:
    def __init__(self, data):
        self.n = len(data)
        self.tree = [INF] * (4 * self.n)
        if self.n > 0:
            self._build(data, 1, 0, self.n - 1)

    def _build(self, data, node, start, end):
        if start == end:
            self.tree[node] = data[start]
        else:
            mid = (start + end) // 2
            self._build(data, 2 * node, start, mid)
            self._build(data, 2 * node + 1, mid + 1, end)
            self.tree[node] = min(self.tree[2 * node], self.tree[2 * node + 1])

    def update(self, idx, val, node=1, start=0, end=None):
        if end is None:
            end = self.n - 1
        if start == end:
            self.tree[node] = val
        else:
            mid = (start + end) // 2
            if idx <= mid:
                self.update(idx, val, 2 * node, start, mid)
            else:
                self.update(idx, val, 2 * node + 1, mid + 1, end)
            self.tree[node] = min(self.tree[2 * node], self.tree[2 * node + 1])

    def query(self, l, r, node=1, start=0, end=None):
        if end is None:
            end = self.n - 1
        if r < start or end < l:
            return INF
        if l <= start and end <= r:
            return self.tree[node]
        mid = (start + end) // 2
        return min(
            self.query(l, r, 2 * node, start, mid),
            self.query(l, r, 2 * node + 1, mid + 1, end)
        )

# 사용 예시
n, m = map(int, input().split())
arr = [int(input()) for _ in range(n)]
seg = MinSegTree(arr)
for _ in range(m):
    a, b = map(int, input().split())
    print(seg.query(a - 1, b - 1))`,
          explanation:
            '구간 합 대신 min 연산을 사용합니다. 범위를 벗어난 경우 항등원인 INF를 반환합니다. 연산 종류만 바꾸면 최댓값, GCD 등 다양한 구간 쿼리에 응용 가능합니다.',
        },
      ],
      commonProblems: [
        { name: '구간 합 구하기', platform: 'boj', id: '2042' },
        { name: '최솟값', platform: 'boj', id: '10868' },
        { name: '최솟값과 최댓값', platform: 'boj', id: '2357' },
        { name: '구간 곱 구하기', platform: 'boj', id: '11505' },
        { name: 'Range Sum Query - Mutable', platform: 'leetcode', id: '307', slug: 'range-sum-query-mutable', difficulty: 'Medium' },
        { name: 'Range Sum Query 2D - Mutable', platform: 'leetcode', id: '308', slug: 'range-sum-query-2d-mutable', difficulty: 'Hard' },
      ],
      tips: [
        '트리 배열 크기는 4*N으로 잡으면 안전합니다.',
        '구간이 완전히 포함되거나 완전히 벗어나는 두 가지 기저 조건을 항상 먼저 확인하세요.',
        '연산의 항등원을 올바르게 설정해야 합니다 (합: 0, 최솟값: INF, 최댓값: -INF, 곱: 1).',
        '인덱스를 0-based와 1-based 중 어떤 것을 쓸지 미리 정하고 일관성 있게 사용하세요.',
      ],
    },
    {
      id: 'lazy-propagation',
      name: '느리게 갱신되는 세그먼트 트리 (Lazy Propagation)',
      description:
        '구간 전체를 한 번에 업데이트해야 할 때 사용합니다. 업데이트를 즉시 전파하지 않고 필요할 때까지 지연시켜 구간 업데이트를 O(log N)에 처리합니다.',
      timeComplexity: '구간 업데이트 O(log N), 구간 쿼리 O(log N)',
      spaceComplexity: 'O(N)',
      keyInsight:
        '구간 업데이트 시 해당 노드에 lazy 값을 저장해 두고, 나중에 그 노드를 방문할 때 자식 노드로 전파합니다. 이렇게 하면 매번 리프까지 내려가지 않아도 됩니다.',
      pythonTools: [
        {
          name: 'list',
          description: 'lazy 배열과 트리 배열을 각각 4*N 크기로 생성합니다. lazy 배열은 지연된 업데이트 값을 저장합니다.',
          import: '내장 자료형',
        },
        {
          name: 'sys.stdin.readline',
          description: '대량의 구간 업데이트/쿼리 처리 시 빠른 입출력이 필수적입니다.',
          import: 'import sys',
        },
      ],
      codeExamples: [
        {
          title: '구간 덧셈 업데이트 + 구간 합 쿼리',
          code: `import sys
input = sys.stdin.readline

class LazySegTree:
    def __init__(self, data):
        self.n = len(data)
        self.tree = [0] * (4 * self.n)
        self.lazy = [0] * (4 * self.n)
        if self.n > 0:
            self._build(data, 1, 0, self.n - 1)

    def _build(self, data, node, start, end):
        if start == end:
            self.tree[node] = data[start]
        else:
            mid = (start + end) // 2
            self._build(data, 2 * node, start, mid)
            self._build(data, 2 * node + 1, mid + 1, end)
            self.tree[node] = self.tree[2 * node] + self.tree[2 * node + 1]

    def _propagate(self, node, start, end):
        if self.lazy[node] != 0:
            mid = (start + end) // 2
            self._apply(2 * node, start, mid, self.lazy[node])
            self._apply(2 * node + 1, mid + 1, end, self.lazy[node])
            self.lazy[node] = 0

    def _apply(self, node, start, end, val):
        self.tree[node] += val * (end - start + 1)
        if start != end:
            self.lazy[node] += val

    def update_range(self, l, r, val, node=1, start=0, end=None):
        if end is None:
            end = self.n - 1
        if r < start or end < l:
            return
        if l <= start and end <= r:
            self._apply(node, start, end, val)
            return
        self._propagate(node, start, end)
        mid = (start + end) // 2
        self.update_range(l, r, val, 2 * node, start, mid)
        self.update_range(l, r, val, 2 * node + 1, mid + 1, end)
        self.tree[node] = self.tree[2 * node] + self.tree[2 * node + 1]

    def query(self, l, r, node=1, start=0, end=None):
        if end is None:
            end = self.n - 1
        if r < start or end < l:
            return 0
        if l <= start and end <= r:
            return self.tree[node]
        self._propagate(node, start, end)
        mid = (start + end) // 2
        return (self.query(l, r, 2 * node, start, mid) +
                self.query(l, r, 2 * node + 1, mid + 1, end))

# 사용 예시: BOJ 10999 구간 합 구하기 2
n, m, k = map(int, input().split())
arr = [int(input()) for _ in range(n)]
seg = LazySegTree(arr)

for _ in range(m + k):
    line = list(map(int, input().split()))
    if line[0] == 1:
        b, c, d = line[1], line[2], line[3]
        seg.update_range(b - 1, c - 1, d)
    else:
        b, c = line[1], line[2]
        print(seg.query(b - 1, c - 1))`,
          explanation:
            '_apply는 노드에 lazy 값을 적용하고, _propagate는 자식에게 lazy를 전파합니다. update_range에서 구간이 완전히 포함되면 _apply로 한 번에 처리하고, query 시에도 propagate를 먼저 수행하여 정확한 값을 보장합니다.',
        },
      ],
      commonProblems: [
        { name: '구간 합 구하기 2', platform: 'boj', id: '10999' },
        { name: 'XOR', platform: 'boj', id: '12844' },
        { name: '스위치', platform: 'boj', id: '1395' },
        { name: '수열과 쿼리 21', platform: 'boj', id: '16975' },
        { name: 'Count of Smaller Numbers After Self', platform: 'leetcode', id: '315', slug: 'count-of-smaller-numbers-after-self', difficulty: 'Hard' },
      ],
      tips: [
        'propagate는 쿼리와 업데이트 모두에서 자식 노드로 내려가기 전에 호출해야 합니다.',
        'lazy 배열을 0으로 초기화하고, _apply에서 lazy 누적 방식이 연산과 맞는지 확인하세요.',
        '구간 대입(set) 연산이면 lazy 전파 시 덮어쓰기, 구간 덧셈이면 lazy를 누적하는 차이에 주의하세요.',
        '재귀 깊이 제한에 걸릴 수 있으니 sys.setrecursionlimit을 넉넉히 설정하세요.',
      ],
    },
  ],
}
