import type { Category } from '../../types/algorithm'

export const networkFlowCategory: Category = {
  id: 'network-flow',
  name: '네트워크 플로우',
  icon: '🌊',
  description: '네트워크에서 최대 유량을 구하는 알고리즘과 이분 매칭 기법을 학습합니다. 유량 문제와 매칭 문제의 모델링 방법을 다룹니다.',
  patterns: [
    {
      id: 'max-flow',
      name: '최대 유량 (Ford-Fulkerson / Edmonds-Karp)',
      description: 'BFS를 이용하여 소스에서 싱크로의 증가 경로(augmenting path)를 반복적으로 찾아 유량을 보내는 Edmonds-Karp 알고리즘입니다.',
      timeComplexity: 'O(VE²)',
      spaceComplexity: 'O(V²)',
      keyInsight: 'BFS로 증가 경로를 찾고, 경로상 최소 잔여 용량만큼 유량을 보냅니다. 역방향 간선을 추가하여 유량 취소(되돌리기)를 가능하게 하는 것이 핵심입니다.',
      pythonTools: [
        {
          name: 'collections.deque',
          description: 'BFS에서 큐로 사용합니다. popleft()가 O(1)이므로 효율적입니다.',
          import: 'from collections import deque',
        },
        {
          name: 'collections.defaultdict',
          description: '인접 리스트와 용량/유량을 관리할 때 편리합니다.',
          import: 'from collections import defaultdict',
        },
      ],
      codeExamples: [
        {
          title: 'Edmonds-Karp (최대 유량)',
          code: `from collections import deque, defaultdict

def max_flow(n, edges, source, sink):
    """Edmonds-Karp 알고리즘으로 최대 유량 계산"""
    graph = defaultdict(list)
    capacity = defaultdict(int)

    for u, v, cap in edges:
        graph[u].append(v)
        graph[v].append(u)  # 역방향 간선
        capacity[(u, v)] += cap

    total_flow = 0

    while True:
        # BFS로 증가 경로 찾기
        parent = {source: None}
        queue = deque([source])
        while queue and sink not in parent:
            node = queue.popleft()
            for neighbor in graph[node]:
                if neighbor not in parent and capacity[(node, neighbor)] > 0:
                    parent[neighbor] = node
                    queue.append(neighbor)

        if sink not in parent:
            break  # 더 이상 증가 경로 없음

        # 경로상 최소 잔여 용량 찾기
        path_flow = float('inf')
        node = sink
        while node != source:
            prev = parent[node]
            path_flow = min(path_flow, capacity[(prev, node)])
            node = prev

        # 유량 갱신 (정방향 -, 역방향 +)
        node = sink
        while node != source:
            prev = parent[node]
            capacity[(prev, node)] -= path_flow
            capacity[(node, prev)] += path_flow
            node = prev

        total_flow += path_flow

    return total_flow

# 예시: S=0, T=5
edges = [
    (0, 1, 10), (0, 2, 10),
    (1, 3, 4), (1, 4, 8),
    (2, 4, 9),
    (3, 5, 10), (4, 5, 10),
]
print(max_flow(6, edges, 0, 5))  # 19`,
          explanation: 'BFS로 증가 경로를 찾고 최소 잔여 용량만큼 유량을 보냅니다. 역방향 간선의 용량을 늘려 나중에 유량을 재분배할 수 있게 합니다.',
        },
      ],
      commonProblems: [
        { name: '최대 유량', platform: 'boj', id: '6086' },
        { name: '축사 배정', platform: 'boj', id: '2188' },
        { name: 'Maximum Flow', platform: 'leetcode', id: '2242', slug: 'maximum-score-of-a-node-sequence', difficulty: 'Hard' },
      ],
      tips: [
        '역방향 간선을 반드시 추가해야 유량 재분배가 가능합니다.',
        '용량이 같은 간선이 여러 개 있을 수 있으므로 capacity를 += 로 누적하세요.',
        'Ford-Fulkerson은 DFS, Edmonds-Karp는 BFS를 사용합니다. BFS가 시간복잡도를 보장합니다.',
      ],
    },
    {
      id: 'bipartite-matching',
      name: '이분 매칭',
      description: '이분 그래프에서 최대 매칭을 찾는 알고리즘입니다. DFS를 이용한 증가 경로 탐색으로 매칭을 하나씩 늘려갑니다.',
      timeComplexity: 'O(VE)',
      spaceComplexity: 'O(V)',
      keyInsight: '각 왼쪽 노드에 대해 DFS로 매칭 가능한 오른쪽 노드를 찾습니다. 이미 매칭된 노드라도 상대방이 다른 노드로 옮길 수 있으면 매칭을 재조정합니다.',
      pythonTools: [
        {
          name: 'sys.setrecursionlimit',
          description: 'DFS 재귀 깊이를 늘려야 합니다.',
          import: 'import sys',
        },
      ],
      codeExamples: [
        {
          title: '이분 매칭 (DFS 기반)',
          code: `import sys
sys.setrecursionlimit(10001)

def bipartite_matching(n, m, adj):
    """
    n: 왼쪽 노드 수, m: 오른쪽 노드 수
    adj[i]: 왼쪽 노드 i와 연결된 오른쪽 노드 리스트
    """
    match_r = [-1] * (m + 1)  # 오른쪽 노드의 매칭 상대 (왼쪽 노드)

    def dfs(u, visited):
        for v in adj[u]:
            if visited[v]:
                continue
            visited[v] = True
            # v가 매칭되지 않았거나, v의 상대가 다른 노드로 갈 수 있으면
            if match_r[v] == -1 or dfs(match_r[v], visited):
                match_r[v] = u
                return True
        return False

    result = 0
    for u in range(1, n + 1):
        visited = [False] * (m + 1)
        if dfs(u, visited):
            result += 1

    return result

# 예시: 왼쪽 5명, 오른쪽 5개 작업
# adj[i] = i번 사람이 할 수 있는 작업 목록
adj = {
    1: [1, 2],
    2: [1, 3],
    3: [2, 3, 4],
    4: [4],
    5: [4, 5],
}
print(bipartite_matching(5, 5, adj))  # 5`,
          explanation: '각 왼쪽 노드마다 DFS로 매칭을 시도합니다. 이미 매칭된 오른쪽 노드를 만나면, 해당 매칭 상대가 다른 노드로 옮길 수 있는지 재귀적으로 확인합니다.',
        },
      ],
      commonProblems: [
        { name: '열혈강호', platform: 'boj', id: '11375' },
        { name: '축사 배정', platform: 'boj', id: '2188' },
        { name: '열혈강호 2', platform: 'boj', id: '11376' },
      ],
      tips: [
        '매 DFS마다 visited 배열을 새로 초기화해야 합니다.',
        '이분 매칭은 최대 유량 문제의 특수한 경우입니다 (용량이 모두 1).',
        '쾨닉의 정리: 이분 그래프에서 최대 매칭 = 최소 버텍스 커버입니다.',
      ],
    },
  ],
}
