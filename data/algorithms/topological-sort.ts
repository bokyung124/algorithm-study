import type { Category } from '../../types/algorithm'

export const topologicalSortCategory: Category = {
  id: 'topological-sort',
  name: '위상정렬',
  icon: '📐',
  description:
    'DAG(방향 비순환 그래프)에서 모든 간선 (u, v)에 대해 u가 v보다 앞에 오도록 정점을 일렬로 나열하는 알고리즘입니다. 작업 순서 결정, 선수과목 문제, 빌드 의존성 등에 활용됩니다.',
  patterns: [
    {
      id: 'kahn-algorithm',
      name: '칸 알고리즘 (BFS 위상정렬)',
      description:
        '진입차수(in-degree)가 0인 정점부터 큐에 넣고, 하나씩 꺼내며 연결된 정점의 진입차수를 줄여가는 BFS 기반 위상정렬입니다. 사이클 판별도 자연스럽게 가능합니다.',
      timeComplexity: 'O(V + E)',
      spaceComplexity: 'O(V + E)',
      keyInsight:
        '진입차수가 0인 정점은 선행 조건이 모두 완료된 정점입니다. 이를 처리하면 후속 정점의 진입차수가 줄어들어 새로운 0이 생깁니다. 모든 정점을 처리하지 못하면 사이클이 존재합니다.',
      tools: [
        {
          name: 'collections.deque',
          description: 'BFS 큐로 사용합니다. popleft()가 O(1)이므로 list.pop(0)의 O(N) 대비 훨씬 효율적입니다.',
          import: 'from collections import deque',
        },
        {
          name: 'collections.defaultdict',
          description: '인접 리스트와 진입차수를 관리합니다. defaultdict(list)로 인접 리스트를, defaultdict(int)로 진입차수를 간편하게 생성합니다.',
          import: 'from collections import defaultdict',
        },
      ],
      codeExamples: [
        {
          title: '기본 위상정렬 (BOJ 2252)',
          code: `import sys
from collections import deque
input = sys.stdin.readline

def topological_sort(n, graph, in_degree):
    queue = deque()
    result = []

    # 진입차수 0인 정점을 큐에 삽입
    for i in range(1, n + 1):
        if in_degree[i] == 0:
            queue.append(i)

    while queue:
        u = queue.popleft()
        result.append(u)

        for v in graph[u]:
            in_degree[v] -= 1
            if in_degree[v] == 0:
                queue.append(v)

    if len(result) != n:
        return None  # 사이클 존재
    return result

# BOJ 2252 - 줄 세우기
n, m = map(int, input().split())
graph = [[] for _ in range(n + 1)]
in_degree = [0] * (n + 1)

for _ in range(m):
    a, b = map(int, input().split())
    graph[a].append(b)
    in_degree[b] += 1

result = topological_sort(n, graph, in_degree)
print(' '.join(map(str, result)))`,
          explanation:
            '진입차수 배열을 관리하며, 0인 정점을 큐에 넣습니다. 큐에서 꺼낸 정점의 인접 정점 진입차수를 1 줄이고, 0이 되면 큐에 추가합니다. 결과 리스트의 크기가 N이 아니면 사이클이 있다는 뜻입니다.',
        },
        {
          title: '위상정렬 + 최소 시간 계산 (BOJ 2056)',
          code: `import sys
from collections import deque
input = sys.stdin.readline

def critical_path(n, graph, in_degree, time):
    """각 작업의 가장 빠른 완료 시간을 구함"""
    earliest = [0] * (n + 1)
    queue = deque()

    for i in range(1, n + 1):
        if in_degree[i] == 0:
            queue.append(i)
            earliest[i] = time[i]

    while queue:
        u = queue.popleft()
        for v in graph[u]:
            # v의 시작 시간은 모든 선행 작업 완료 후
            earliest[v] = max(earliest[v], earliest[u] + time[v])
            in_degree[v] -= 1
            if in_degree[v] == 0:
                queue.append(v)

    return max(earliest[1:n + 1])

# BOJ 2056 - 작업
n = int(input())
graph = [[] for _ in range(n + 1)]
in_degree = [0] * (n + 1)
time_cost = [0] * (n + 1)

for i in range(1, n + 1):
    line = list(map(int, input().split()))
    time_cost[i] = line[0]
    cnt = line[1]
    for j in range(2, 2 + cnt):
        prev = line[j]
        graph[prev].append(i)
        in_degree[i] += 1

print(critical_path(n, graph, in_degree, time_cost))`,
          explanation:
            '위상정렬 순서대로 처리하면서 각 작업의 earliest(가장 빠른 완료 시간)를 DP로 계산합니다. earliest[v] = max(earliest[선행 작업들]) + time[v]입니다. 전체 최소 시간은 모든 earliest의 최댓값입니다.',
        },
      ],
      commonProblems: [
        { name: '줄 세우기', platform: 'boj', id: '2252' },
        { name: '문제집', platform: 'boj', id: '1766' },
        { name: '작업', platform: 'boj', id: '2056' },
        { name: 'ACM Craft', platform: 'boj', id: '1005' },
        { name: 'Course Schedule', platform: 'leetcode', id: '207', slug: 'course-schedule', difficulty: 'Medium' },
        { name: 'Course Schedule II', platform: 'leetcode', id: '210', slug: 'course-schedule-ii', difficulty: 'Medium' },
      ],
      tips: [
        '사이클 판별: 결과 리스트 크기가 N보다 작으면 사이클이 존재합니다.',
        '사전순으로 가장 빠른 위상정렬이 필요하면 deque 대신 heapq(우선순위 큐)를 사용하세요.',
        '위상정렬 순서에서 DP를 함께 수행하면 DAG에서의 최장/최단 경로를 구할 수 있습니다.',
        '진입차수 배열을 그래프 입력 시 함께 계산하면 편리합니다.',
      ],
    },
    {
      id: 'dfs-topological-sort',
      name: 'DFS 기반 위상정렬',
      description:
        'DFS의 후위 순회(post-order) 역순이 위상정렬 결과가 되는 성질을 이용합니다. DFS 완료 시점에 스택에 넣고, 최종적으로 스택을 뒤집으면 위상정렬 순서입니다.',
      timeComplexity: 'O(V + E)',
      spaceComplexity: 'O(V + E)',
      keyInsight:
        'DFS에서 한 정점의 모든 후속 정점을 방문한 뒤(후위) 스택에 넣으면, 스택을 뒤집었을 때 선행 정점이 앞에 오게 됩니다. 방문 중인 노드를 다시 만나면 사이클입니다.',
      tools: [
        {
          name: 'sys',
          description: 'setrecursionlimit 설정이 필수입니다. DFS 재귀 깊이가 정점 수만큼 깊어질 수 있으므로 충분히 크게 설정합니다.',
          import: 'import sys',
        },
        {
          name: 'collections.defaultdict',
          description: '인접 리스트를 defaultdict(list)로 생성하여 그래프를 간편하게 구성합니다.',
          import: 'from collections import defaultdict',
        },
      ],
      codeExamples: [
        {
          title: 'DFS 위상정렬 구현',
          code: `import sys
sys.setrecursionlimit(200000)
input = sys.stdin.readline

def dfs_topological_sort(n, graph):
    # 0: 미방문, 1: 방문 중, 2: 완료
    state = [0] * (n + 1)
    order = []
    has_cycle = False

    def dfs(u):
        nonlocal has_cycle
        state[u] = 1  # 방문 중

        for v in graph[u]:
            if state[v] == 1:
                has_cycle = True  # 사이클 발견
                return
            if state[v] == 0:
                dfs(v)
                if has_cycle:
                    return

        state[u] = 2  # 완료
        order.append(u)

    for i in range(1, n + 1):
        if state[i] == 0:
            dfs(i)
            if has_cycle:
                return None

    order.reverse()
    return order

# 사용 예시
n, m = map(int, input().split())
graph = [[] for _ in range(n + 1)]
for _ in range(m):
    a, b = map(int, input().split())
    graph[a].append(b)

result = dfs_topological_sort(n, graph)
if result is None:
    print("사이클 존재")
else:
    print(' '.join(map(str, result)))`,
          explanation:
            'state 배열로 미방문(0), 방문 중(1), 완료(2) 상태를 관리합니다. 방문 중인 노드를 다시 만나면(state=1) 역방향 간선이므로 사이클입니다. DFS가 끝나는 시점에 order에 추가하고, 최종적으로 역순이 위상정렬 결과입니다.',
        },
        {
          title: 'SCC와 연계: 코사라주 알고리즘의 1단계',
          code: `import sys
sys.setrecursionlimit(300000)
input = sys.stdin.readline

def kosaraju_step1(n, graph):
    """DFS 후위 순서대로 정점을 스택에 저장 (위상정렬의 원리)"""
    visited = [False] * (n + 1)
    finish_order = []

    def dfs(u):
        visited[u] = True
        for v in graph[u]:
            if not visited[v]:
                dfs(v)
        finish_order.append(u)  # 후위 순서

    for i in range(1, n + 1):
        if not visited[i]:
            dfs(i)

    return finish_order  # 역순이 위상정렬 순서

def kosaraju_step2(n, reverse_graph, finish_order):
    """역그래프에서 finish_order의 역순으로 DFS → 각 SCC를 구함"""
    visited = [False] * (n + 1)
    sccs = []

    def dfs(u, component):
        visited[u] = True
        component.append(u)
        for v in reverse_graph[u]:
            if not visited[v]:
                dfs(v, component)

    for u in reversed(finish_order):
        if not visited[u]:
            component = []
            dfs(u, component)
            sccs.append(component)

    return sccs

# 사용 예시
n, m = map(int, input().split())
graph = [[] for _ in range(n + 1)]
reverse_graph = [[] for _ in range(n + 1)]

for _ in range(m):
    a, b = map(int, input().split())
    graph[a].append(b)
    reverse_graph[b].append(a)

finish_order = kosaraju_step1(n, graph)
sccs = kosaraju_step2(n, reverse_graph, finish_order)
print(f"SCC 개수: {len(sccs)}")
for scc in sccs:
    print(sorted(scc))`,
          explanation:
            '코사라주 알고리즘은 DFS 위상정렬의 응용입니다. 1단계에서 원래 그래프의 DFS 후위 순서를 구하고, 2단계에서 역그래프에서 그 역순으로 DFS하면 각 SCC가 분리됩니다. DFS 후위 순서가 위상정렬의 핵심 원리입니다.',
        },
      ],
      commonProblems: [
        { name: '줄 세우기', platform: 'boj', id: '2252' },
        { name: 'Strongly Connected Component', platform: 'boj', id: '2150' },
        { name: '도미노', platform: 'boj', id: '4196' },
        { name: '축구 전술', platform: 'boj', id: '3977' },
        { name: 'Alien Dictionary', platform: 'leetcode', id: '269', slug: 'alien-dictionary', difficulty: 'Hard' },
      ],
      tips: [
        'Python에서 재귀 깊이 제한에 주의하세요. sys.setrecursionlimit을 충분히 설정하세요.',
        '사이클 판별 시 "방문 중(1)" 상태를 따로 관리해야 합니다. visited만으로는 부족합니다.',
        'BFS(칸 알고리즘)가 구현이 더 직관적이고 재귀 제한 문제가 없어 일반적으로 더 선호됩니다.',
        'SCC를 구한 뒤 SCC 간의 DAG에서 위상정렬을 하면 다양한 문제를 풀 수 있습니다.',
      ],
    },
  ],
}
