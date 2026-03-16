import type { Category } from '../../types/algorithm'

export const graph: Category = {
  id: 'graph',
  name: '그래프',
  icon: '🕸️',
  description:
    '정점(노드)과 간선으로 이루어진 자료구조를 탐색하고 분석하는 알고리즘입니다. BFS, DFS는 거의 모든 그래프 문제의 기본이 됩니다.',
  patterns: [
    {
      id: 'dfs',
      name: '깊이 우선 탐색 (DFS)',
      description:
        '한 방향으로 끝까지 탐색한 뒤 되돌아와서 다른 방향을 탐색하는 방식입니다. 스택 또는 재귀로 구현합니다.',
      timeComplexity: 'O(V + E)',
      spaceComplexity: 'O(V)',
      keyInsight:
        '현재 정점에서 갈 수 있는 정점으로 계속 깊이 들어가다가 막히면 되돌아옵니다. 경로 탐색, 사이클 감지, 위상 정렬 등에 활용됩니다.',
      pythonTools: [
        {
          name: 'sys',
          description:
            'sys.setrecursionlimit(10**6)으로 재귀 깊이 제한을 해제합니다. Python 기본 1000으로는 대부분의 DFS 문제에서 런타임 에러가 발생합니다.',
          import: 'import sys',
        },
        {
          name: 'collections.defaultdict',
          description:
            'defaultdict(list)로 인접 리스트를 생성하면 키 존재 여부를 확인하지 않고 바로 append할 수 있습니다.',
          import: 'from collections import defaultdict',
        },
      ],
      codeExamples: [
        {
          title: 'DFS 재귀 구현 (인접 리스트)',
          code: `import sys
sys.setrecursionlimit(10**6)
input = sys.stdin.readline

def dfs(graph, start, visited=None):
    if visited is None:
        visited = set()
    visited.add(start)
    print(start, end=' ')

    for neighbor in graph[start]:
        if neighbor not in visited:
            dfs(graph, neighbor, visited)
    return visited

# 인접 리스트 생성
graph = {
    1: [2, 3],
    2: [1, 4, 5],
    3: [1, 6],
    4: [2],
    5: [2, 6],
    6: [3, 5],
}
dfs(graph, 1)  # 1 2 4 5 6 3`,
          explanation:
            '방문한 정점을 visited에 기록하고, 인접 정점 중 미방문 정점을 재귀적으로 탐색합니다.',
        },
        {
          title: 'DFS 스택 구현 (2차원 격자)',
          code: `def dfs_grid(grid, sr, sc):
    """2차원 격자에서 DFS로 연결된 영역 탐색"""
    rows, cols = len(grid), len(grid[0])
    visited = [[False] * cols for _ in range(rows)]
    stack = [(sr, sc)]
    visited[sr][sc] = True
    count = 0
    dx = [-1, 1, 0, 0]
    dy = [0, 0, -1, 1]

    while stack:
        x, y = stack.pop()
        count += 1
        for d in range(4):
            nx, ny = x + dx[d], y + dy[d]
            if 0 <= nx < rows and 0 <= ny < cols and not visited[nx][ny] and grid[nx][ny] == 1:
                visited[nx][ny] = True
                stack.append((nx, ny))
    return count

# 사용 예시
grid = [
    [1, 1, 0, 0],
    [1, 1, 0, 1],
    [0, 0, 0, 1],
    [0, 0, 1, 1],
]
print(dfs_grid(grid, 0, 0))  # 4`,
          explanation:
            '명시적 스택을 사용한 DFS입니다. 4방향(상하좌우)으로 이동하며 값이 1인 연결된 셀의 개수를 셉니다.',
        },
      ],
      commonProblems: [
        { name: '바이러스', platform: 'boj', id: '2606' },
        { name: '유기농 배추', platform: 'boj', id: '1012' },
        { name: '단지번호붙이기', platform: 'boj', id: '2667' },
        { name: '알파벳', platform: 'boj', id: '1987' },
        {
          name: 'Number of Islands',
          platform: 'leetcode',
          id: '200',
          slug: 'number-of-islands',
          difficulty: 'Medium',
        },
        {
          name: 'Max Area of Island',
          platform: 'leetcode',
          id: '695',
          slug: 'max-area-of-island',
          difficulty: 'Medium',
        },
      ],
      tips: [
        'Python 재귀는 기본 깊이 제한이 1000이므로 sys.setrecursionlimit 설정이 필수입니다.',
        '재귀가 너무 깊어지면 스택 오버플로가 발생하므로 반복문 DFS를 고려하세요.',
        '방문 체크를 스택에 넣을 때 하면 중복 방문을 방지할 수 있습니다.',
      ],
    },
    {
      id: 'bfs',
      name: '너비 우선 탐색 (BFS)',
      description:
        '시작 정점에서 가까운 정점부터 순서대로 탐색하는 방식입니다. 큐를 사용하여 구현하며, 최단 거리를 보장합니다.',
      timeComplexity: 'O(V + E)',
      spaceComplexity: 'O(V)',
      keyInsight:
        '큐에 시작 정점을 넣고, 인접 정점을 차례로 큐에 추가하며 탐색합니다. 간선 가중치가 모두 같을 때 최단 거리를 구할 수 있습니다.',
      pythonTools: [
        {
          name: 'collections.deque',
          description:
            'BFS의 필수 도구입니다. popleft()가 O(1)이므로 list.pop(0)의 O(n) 대비 성능이 압도적입니다.',
          import: 'from collections import deque',
        },
        {
          name: 'collections.defaultdict',
          description:
            'defaultdict(list)로 인접 리스트를 깔끔하게 생성합니다. graph[u].append(v)를 바로 사용할 수 있습니다.',
          import: 'from collections import defaultdict',
        },
      ],
      codeExamples: [
        {
          title: 'BFS 최단 거리 (2차원 격자)',
          code: `from collections import deque

def bfs_shortest(grid, start, end):
    """격자에서 start부터 end까지의 최단 거리"""
    rows, cols = len(grid), len(grid[0])
    dist = [[-1] * cols for _ in range(rows)]
    sr, sc = start
    er, ec = end
    dist[sr][sc] = 0
    queue = deque([(sr, sc)])
    dx = [-1, 1, 0, 0]
    dy = [0, 0, -1, 1]

    while queue:
        x, y = queue.popleft()
        if x == er and y == ec:
            return dist[x][y]
        for d in range(4):
            nx, ny = x + dx[d], y + dy[d]
            if 0 <= nx < rows and 0 <= ny < cols and dist[nx][ny] == -1 and grid[nx][ny] == 0:
                dist[nx][ny] = dist[x][y] + 1
                queue.append((nx, ny))
    return -1  # 도달 불가

# 0: 이동 가능, 1: 벽
grid = [
    [0, 0, 1, 0],
    [1, 0, 1, 0],
    [0, 0, 0, 0],
    [0, 1, 1, 0],
]
print(bfs_shortest(grid, (0, 0), (3, 3)))  # 6`,
          explanation:
            '시작점에서 BFS로 탐색하며 각 칸까지의 최단 거리를 dist 배열에 기록합니다. 목표 지점에 도달하면 해당 거리를 반환합니다.',
        },
        {
          title: 'BFS 레벨 탐색',
          code: `from collections import deque

def bfs_level(graph, start):
    """각 정점까지의 최단 거리(레벨)를 반환"""
    visited = {start: 0}
    queue = deque([start])

    while queue:
        node = queue.popleft()
        for neighbor in graph[node]:
            if neighbor not in visited:
                visited[neighbor] = visited[node] + 1
                queue.append(neighbor)
    return visited

# 사용 예시
graph = {
    1: [2, 3],
    2: [1, 4, 5],
    3: [1, 6],
    4: [2],
    5: [2, 6],
    6: [3, 5],
}
distances = bfs_level(graph, 1)
print(distances)  # {1: 0, 2: 1, 3: 1, 4: 2, 5: 2, 6: 2}`,
          explanation:
            '각 정점에 도달하는 최단 거리를 딕셔너리에 기록합니다. BFS의 특성상 먼저 방문한 정점이 항상 최단 거리입니다.',
        },
      ],
      commonProblems: [
        { name: '미로 탐색', platform: 'boj', id: '2178' },
        { name: '토마토', platform: 'boj', id: '7576' },
        { name: '숨바꼭질', platform: 'boj', id: '1697' },
        { name: '토마토 (3차원)', platform: 'boj', id: '7569' },
        {
          name: 'Clone Graph',
          platform: 'leetcode',
          id: '133',
          slug: 'clone-graph',
          difficulty: 'Medium',
        },
      ],
      tips: [
        '최단 거리 문제에서 간선 가중치가 동일하면 BFS를 사용하세요.',
        'collections.deque를 사용해야 O(1) popleft가 가능합니다. list.pop(0)은 O(n)입니다.',
        '방문 체크를 큐에 넣을 때 수행해야 중복 방문과 메모리 낭비를 방지합니다.',
        '다중 시작점 BFS: 여러 시작점을 동시에 큐에 넣으면 됩니다.',
      ],
    },
    {
      id: 'connected-components',
      name: '연결 요소',
      description:
        '그래프에서 서로 연결된 정점들의 그룹을 찾는 문제입니다. DFS 또는 BFS, Union-Find로 해결합니다.',
      timeComplexity: 'O(V + E)',
      spaceComplexity: 'O(V)',
      keyInsight:
        '모든 정점을 순회하면서 아직 방문하지 않은 정점에서 DFS/BFS를 시작합니다. 한 번의 탐색으로 도달하는 모든 정점이 하나의 연결 요소입니다.',
      pythonTools: [
        {
          name: 'collections.deque',
          description:
            'BFS로 연결 요소를 탐색할 때 큐로 사용합니다. popleft() O(1)로 효율적인 탐색이 가능합니다.',
          import: 'from collections import deque',
        },
        {
          name: 'sys',
          description:
            '재귀 DFS로 구현할 경우 sys.setrecursionlimit으로 깊이 제한을 늘려야 합니다.',
          import: 'import sys',
        },
      ],
      codeExamples: [
        {
          title: '연결 요소 개수 세기',
          code: `import sys
from collections import deque
input = sys.stdin.readline

def count_components(n, edges):
    graph = [[] for _ in range(n + 1)]
    for u, v in edges:
        graph[u].append(v)
        graph[v].append(u)

    visited = [False] * (n + 1)
    count = 0

    for i in range(1, n + 1):
        if not visited[i]:
            count += 1
            # BFS로 연결 요소 탐색
            queue = deque([i])
            visited[i] = True
            while queue:
                node = queue.popleft()
                for neighbor in graph[node]:
                    if not visited[neighbor]:
                        visited[neighbor] = True
                        queue.append(neighbor)
    return count

# 사용 예시
edges = [(1, 2), (2, 5), (3, 4), (4, 6)]
print(count_components(6, edges))  # 2`,
          explanation:
            '각 정점에서 BFS를 시작할 때마다 연결 요소 수를 1 증가시킵니다. 이미 방문한 정점은 건너뛰어 각 연결 요소를 정확히 한 번만 셉니다.',
        },
        {
          title: 'Union-Find로 연결 요소',
          code: `class UnionFind:
    def __init__(self, n):
        self.parent = list(range(n))
        self.rank = [0] * n

    def find(self, x):
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x])  # 경로 압축
        return self.parent[x]

    def union(self, x, y):
        rx, ry = self.find(x), self.find(y)
        if rx == ry:
            return False
        # rank 기반 합치기
        if self.rank[rx] < self.rank[ry]:
            rx, ry = ry, rx
        self.parent[ry] = rx
        if self.rank[rx] == self.rank[ry]:
            self.rank[rx] += 1
        return True

# 사용 예시
uf = UnionFind(7)  # 0~6 정점
edges = [(1, 2), (2, 5), (3, 4), (4, 6)]
for u, v in edges:
    uf.union(u, v)

# 연결 요소 수 세기
components = len(set(uf.find(i) for i in range(1, 7)))
print(components)  # 2`,
          explanation:
            'Union-Find는 경로 압축과 랭크 최적화로 거의 O(1)에 합치기와 찾기 연산을 수행합니다. 간선을 순서대로 처리하며 연결 요소를 관리할 때 유용합니다.',
        },
      ],
      commonProblems: [
        { name: '연결 요소의 개수', platform: 'boj', id: '11724' },
        { name: '집합의 표현', platform: 'boj', id: '1717' },
        { name: '섬의 개수', platform: 'boj', id: '4963' },
        { name: '여행 가자', platform: 'boj', id: '1976' },
        {
          name: 'Number of Connected Components in an Undirected Graph',
          platform: 'leetcode',
          id: '323',
          slug: 'number-of-connected-components-in-an-undirected-graph',
          difficulty: 'Medium',
        },
      ],
      tips: [
        'Union-Find는 간선이 동적으로 추가될 때 특히 유용합니다.',
        '2차원 격자의 연결 요소는 DFS/BFS로 간단하게 구할 수 있습니다.',
        '경로 압축과 랭크 최적화를 반드시 같이 사용하세요.',
        '연결 요소 내 정점 목록이 필요하면 딕셔너리로 그룹을 관리하세요.',
      ],
    },
    {
      id: 'scc',
      name: '강한 연결 요소 (SCC)',
      description:
        '방향 그래프에서 모든 정점 쌍이 서로 도달 가능한 최대 부분 그래프.',
      timeComplexity: 'O(V + E)',
      spaceComplexity: 'O(V)',
      keyInsight:
        'Tarjan 알고리즘은 DFS 순회 중 스택과 방문 순서(dfn), 도달 가능한 최소 순서(low)를 관리합니다. low[u] == dfn[u]이면 u가 SCC의 루트입니다.',
      pythonTools: [
        {
          name: 'sys',
          description:
            'sys.setrecursionlimit(10**6)으로 재귀 깊이 제한을 해제합니다. Tarjan 알고리즘은 DFS 기반이므로 필수입니다.',
          import: 'import sys',
        },
        {
          name: 'collections.defaultdict',
          description:
            'defaultdict(list)로 인접 리스트를 깔끔하게 생성합니다.',
          import: 'from collections import defaultdict',
        },
      ],
      codeExamples: [
        {
          title: "Tarjan's SCC",
          code: `import sys
sys.setrecursionlimit(10**6)

def tarjan_scc(n, graph):
    dfn = [0] * (n + 1)
    low = [0] * (n + 1)
    on_stack = [False] * (n + 1)
    stack = []
    timer = [0]
    sccs = []

    def dfs(u):
        timer[0] += 1
        dfn[u] = low[u] = timer[0]
        stack.append(u)
        on_stack[u] = True

        for v in graph[u]:
            if dfn[v] == 0:
                dfs(v)
                low[u] = min(low[u], low[v])
            elif on_stack[v]:
                low[u] = min(low[u], dfn[v])

        if low[u] == dfn[u]:
            scc = []
            while True:
                v = stack.pop()
                on_stack[v] = False
                scc.append(v)
                if v == u:
                    break
            sccs.append(sorted(scc))

    for i in range(1, n + 1):
        if dfn[i] == 0:
            dfs(i)
    return sccs

# 사용 예시
from collections import defaultdict
graph = defaultdict(list)
edges = [(1,2),(2,3),(3,1),(3,4),(4,5),(5,6),(6,4)]
for u, v in edges:
    graph[u].append(v)

result = tarjan_scc(6, graph)
print(result)  # [[4, 5, 6], [1, 2, 3]]`,
          explanation:
            'DFS 순회 중 dfn(방문 순서)과 low(도달 가능한 최소 순서)를 관리합니다. low[u] == dfn[u]이면 스택에서 u까지의 모든 정점이 하나의 SCC를 구성합니다.',
        },
        {
          title: "Kosaraju's SCC",
          code: `import sys
from collections import defaultdict
sys.setrecursionlimit(10**6)

def kosaraju_scc(n, graph):
    # 1단계: 정방향 DFS로 종료 순서 기록
    visited = [False] * (n + 1)
    order = []

    def dfs1(u):
        visited[u] = True
        for v in graph[u]:
            if not visited[v]:
                dfs1(v)
        order.append(u)

    for i in range(1, n + 1):
        if not visited[i]:
            dfs1(i)

    # 2단계: 역방향 그래프 생성
    rev_graph = defaultdict(list)
    for u in graph:
        for v in graph[u]:
            rev_graph[v].append(u)

    # 3단계: 역순으로 역방향 DFS
    visited = [False] * (n + 1)
    sccs = []

    def dfs2(u, scc):
        visited[u] = True
        scc.append(u)
        for v in rev_graph[u]:
            if not visited[v]:
                dfs2(v, scc)

    for u in reversed(order):
        if not visited[u]:
            scc = []
            dfs2(u, scc)
            sccs.append(sorted(scc))

    return sccs

# 사용 예시
graph = defaultdict(list)
edges = [(1,2),(2,3),(3,1),(3,4),(4,5),(5,6),(6,4)]
for u, v in edges:
    graph[u].append(v)

print(kosaraju_scc(6, graph))  # [[1, 2, 3], [4, 5, 6]]`,
          explanation:
            'Kosaraju 알고리즘은 3단계로 동작합니다: (1) 정방향 DFS로 종료 순서 기록, (2) 역방향 그래프 생성, (3) 종료 순서의 역순으로 역방향 DFS하여 SCC를 찾습니다.',
        },
      ],
      commonProblems: [
        { name: 'Strongly Connected Component', platform: 'boj', id: '2150' },
        { name: '도미노', platform: 'boj', id: '4196' },
        { name: 'Critical Connections in a Network', platform: 'leetcode', id: '1192', slug: 'critical-connections-in-a-network', difficulty: 'Hard' },
      ],
      tips: [
        'Python에서는 재귀 깊이 제한에 주의하세요. sys.setrecursionlimit을 충분히 크게 설정해야 합니다.',
        'SCC를 축약하면 DAG(방향 비순환 그래프)가 되어 위상 정렬 등을 적용할 수 있습니다.',
        '2-SAT 문제는 SCC로 해결할 수 있습니다. 변수와 부정을 노드로 만들어 함의 그래프를 구성합니다.',
      ],
    },
    {
      id: 'bipartite-graph',
      name: '이분 그래프',
      description:
        '그래프의 정점을 두 그룹으로 나누어 같은 그룹 내에는 간선이 없도록 할 수 있는지 판별.',
      timeComplexity: 'O(V + E)',
      spaceComplexity: 'O(V)',
      keyInsight:
        'BFS/DFS로 인접한 정점에 번갈아 색을 칠합니다. 인접한 정점이 같은 색이면 이분 그래프가 아닙니다. 홀수 길이 사이클이 존재하면 이분 그래프가 아닙니다.',
      pythonTools: [
        {
          name: 'collections.deque',
          description:
            'BFS로 이분 그래프 판별 시 큐로 사용합니다. popleft() O(1)로 효율적인 탐색이 가능합니다.',
          import: 'from collections import deque',
        },
        {
          name: 'collections.defaultdict',
          description:
            'defaultdict(list)로 인접 리스트를 깔끔하게 생성합니다.',
          import: 'from collections import defaultdict',
        },
      ],
      codeExamples: [
        {
          title: 'BFS 기반 이분 그래프 판별 (BOJ 1707)',
          code: `import sys
from collections import deque
input = sys.stdin.readline

def is_bipartite(n, graph):
    color = [0] * (n + 1)  # 0: 미방문, 1: 그룹A, -1: 그룹B

    for start in range(1, n + 1):
        if color[start] != 0:
            continue
        # BFS로 색칠
        queue = deque([start])
        color[start] = 1

        while queue:
            u = queue.popleft()
            for v in graph[u]:
                if color[v] == 0:
                    color[v] = -color[u]  # 반대 색
                    queue.append(v)
                elif color[v] == color[u]:
                    return False  # 같은 색 → 이분 그래프 아님
    return True

# BOJ 1707 풀이
T = int(input())
for _ in range(T):
    V, E = map(int, input().split())
    graph = [[] for _ in range(V + 1)]
    for _ in range(E):
        u, v = map(int, input().split())
        graph[u].append(v)
        graph[v].append(u)

    print("YES" if is_bipartite(V, graph) else "NO")`,
          explanation:
            '각 정점에 1 또는 -1의 색을 칠합니다. 인접한 정점에 반대 색을 칠하고, 이미 같은 색이 칠해져 있으면 이분 그래프가 아닙니다. 연결 요소가 여러 개일 수 있으므로 모든 정점에서 시작합니다.',
        },
      ],
      commonProblems: [
        { name: '이분 그래프', platform: 'boj', id: '1707' },
        { name: 'Is Graph Bipartite?', platform: 'leetcode', id: '785', slug: 'is-graph-bipartite', difficulty: 'Medium' },
        { name: '작업', platform: 'boj', id: '2056' },
      ],
      tips: [
        '연결 요소가 여러 개일 수 있으므로 모든 정점에서 시작해야 합니다.',
        '이분 그래프는 홀수 길이 사이클이 없는 것과 동치입니다.',
        '이분 매칭, 최소 정점 커버 등 고급 알고리즘의 기반이 됩니다.',
      ],
    },
  ],
}
