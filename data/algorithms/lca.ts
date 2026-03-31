import type { Category } from '../../types/algorithm'

export const lcaCategory: Category = {
  id: 'lca',
  name: '최소 공통 조상',
  icon: '👪',
  description: '트리에서 두 노드의 최소 공통 조상(LCA)을 효율적으로 찾는 알고리즘을 학습합니다. Naive 방식과 희소 테이블을 이용한 최적화 기법을 다룹니다.',
  patterns: [
    {
      id: 'naive-lca',
      name: 'Naive LCA',
      description: '두 노드의 깊이를 맞춘 뒤 함께 올라가며 공통 조상을 찾는 기본적인 방법입니다. 구현이 간단하지만 쿼리당 O(N)의 시간이 소요됩니다.',
      timeComplexity: 'O(N) per query',
      spaceComplexity: 'O(N)',
      keyInsight: '두 노드의 깊이를 먼저 동일하게 맞춘 후, 두 노드를 동시에 한 칸씩 올리면서 같은 노드에 도달할 때까지 반복합니다. 같아지는 순간이 LCA입니다.',
      tools: [
        {
          name: 'sys.setrecursionlimit',
          description: '깊은 트리에서 DFS로 깊이/부모 정보를 구할 때 재귀 제한을 늘려야 합니다.',
          import: 'import sys',
        },
        {
          name: 'collections.defaultdict',
          description: '인접 리스트를 간결하게 구성할 수 있습니다.',
          import: 'from collections import defaultdict',
        },
      ],
      codeExamples: [
        {
          title: 'Naive LCA 구현',
          code: `import sys
sys.setrecursionlimit(100001)

def solve():
    n = int(input())
    parent = [0] * (n + 1)
    depth = [0] * (n + 1)
    graph = [[] for _ in range(n + 1)]

    for _ in range(n - 1):
        a, b = map(int, input().split())
        graph[a].append(b)
        graph[b].append(a)

    # DFS로 깊이와 부모 정보 구하기
    def dfs(node, par, d):
        parent[node] = par
        depth[node] = d
        for child in graph[node]:
            if child != par:
                dfs(child, node, d + 1)

    dfs(1, 0, 0)

    def lca(u, v):
        # 1. 깊이 맞추기
        while depth[u] > depth[v]:
            u = parent[u]
        while depth[v] > depth[u]:
            v = parent[v]
        # 2. 동시에 올라가기
        while u != v:
            u = parent[u]
            v = parent[v]
        return u

    m = int(input())
    for _ in range(m):
        a, b = map(int, input().split())
        print(lca(a, b))

solve()`,
          explanation: 'DFS로 각 노드의 깊이와 부모를 전처리한 뒤, 쿼리마다 두 노드의 깊이를 맞추고 동시에 올라가서 LCA를 찾습니다.',
        },
      ],
      commonProblems: [
        { name: 'LCA', platform: 'boj', id: '11437' },
        { name: 'Lowest Common Ancestor of a Binary Tree', platform: 'leetcode', id: '236', slug: 'lowest-common-ancestor-of-a-binary-tree', difficulty: 'Medium' },
        { name: '정점들의 거리', platform: 'boj', id: '1761' },
      ],
      tips: [
        '깊이를 맞추는 과정을 빠뜨리면 잘못된 결과가 나올 수 있습니다.',
        '트리를 루트 기준으로 DFS 하여 부모와 깊이를 미리 구해두세요.',
        'N이 크고 쿼리가 많으면 희소 테이블 LCA를 사용해야 합니다.',
      ],
    },
    {
      id: 'sparse-table-lca',
      name: '희소 테이블 LCA',
      description: 'Binary Lifting 기법을 사용하여 2^k번째 조상을 미리 전처리합니다. 전처리 O(N log N), 쿼리 O(log N)으로 대량의 LCA 쿼리를 효율적으로 처리합니다.',
      timeComplexity: 'O(N log N) 전처리 + O(log N) 쿼리',
      spaceComplexity: 'O(N log N)',
      keyInsight: 'parent[k][v] = v의 2^k번째 조상을 저장하면, 깊이 차이를 이진수로 분해하여 빠르게 올라갈 수 있습니다. 깊이를 맞춘 후에도 이진 탐색처럼 큰 점프부터 시도하며 LCA를 찾습니다.',
      tools: [
        {
          name: 'math.log2',
          description: '최대 깊이에 대한 log 값을 계산하여 sparse table의 크기를 결정합니다.',
          import: 'import math',
        },
        {
          name: 'sys.setrecursionlimit',
          description: 'DFS 깊이 제한을 풀어줍니다.',
          import: 'import sys',
        },
      ],
      codeExamples: [
        {
          title: '희소 테이블 LCA (Binary Lifting)',
          code: `import sys
import math
sys.setrecursionlimit(100001)
input = sys.stdin.readline

def solve():
    n = int(input())
    LOG = int(math.log2(n)) + 1 if n > 1 else 1
    graph = [[] for _ in range(n + 1)]
    depth = [0] * (n + 1)
    parent = [[0] * (n + 1) for _ in range(LOG)]

    for _ in range(n - 1):
        a, b = map(int, input().split())
        graph[a].append(b)
        graph[b].append(a)

    # DFS로 깊이와 직계 부모 구하기
    def dfs(node, par, d):
        parent[0][node] = par
        depth[node] = d
        for child in graph[node]:
            if child != par:
                dfs(child, node, d + 1)

    dfs(1, 0, 0)

    # sparse table 채우기: parent[k][v] = v의 2^k번째 조상
    for k in range(1, LOG):
        for v in range(1, n + 1):
            parent[k][v] = parent[k - 1][parent[k - 1][v]]

    def lca(u, v):
        # 깊이 맞추기 (u가 더 깊도록)
        if depth[u] < depth[v]:
            u, v = v, u
        diff = depth[u] - depth[v]
        for k in range(LOG):
            if (diff >> k) & 1:
                u = parent[k][u]

        if u == v:
            return u

        # 동시에 올라가기
        for k in range(LOG - 1, -1, -1):
            if parent[k][u] != parent[k][v]:
                u = parent[k][u]
                v = parent[k][v]

        return parent[0][u]

    m = int(input())
    for _ in range(m):
        a, b = map(int, input().split())
        print(lca(a, b))

solve()`,
          explanation: 'parent[k][v]에 v의 2^k번째 조상을 저장합니다. 깊이 차이를 이진수로 분해하여 빠르게 올라가고, 이후 큰 점프부터 시도하며 LCA 직전까지 이동합니다.',
        },
      ],
      commonProblems: [
        { name: 'LCA 2', platform: 'boj', id: '11438' },
        { name: '가장 가까운 공통 조상', platform: 'boj', id: '3584' },
        { name: 'Kth Ancestor of a Tree Node', platform: 'leetcode', id: '1483', slug: 'kth-ancestor-of-a-tree-node', difficulty: 'Hard' },
      ],
      tips: [
        'LOG 값은 math.log2(n) + 1로 설정하면 충분합니다.',
        'parent[k][v] = parent[k-1][parent[k-1][v]]라는 점화식이 핵심입니다.',
        '깊이 차이를 비트 연산으로 분해하는 아이디어는 다른 문제에도 응용됩니다.',
      ],
    },
  ],
}
