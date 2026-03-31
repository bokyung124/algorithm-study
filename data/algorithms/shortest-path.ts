import type { Category } from '../../types/algorithm'

export const shortestPathCategory: Category = {
  id: 'shortest-path',
  name: '최단경로',
  icon: '🛤️',
  description:
    '그래프에서 두 정점 사이의 최단 경로를 찾는 알고리즘들입니다. 간선의 가중치 특성(양수/음수)과 쿼리 유형(단일 출발/모든 쌍)에 따라 적합한 알고리즘이 다릅니다.',
  patterns: [
    {
      id: 'dijkstra',
      name: '다익스트라 (Dijkstra)',
      description:
        '하나의 시작 정점에서 다른 모든 정점까지의 최단 거리를 구합니다. 음의 가중치가 없는 그래프에서만 사용할 수 있으며, 우선순위 큐를 사용하여 효율적으로 동작합니다.',
      timeComplexity: 'O((V + E) log V) (우선순위 큐 사용)',
      spaceComplexity: 'O(V + E)',
      keyInsight:
        '아직 확정되지 않은 정점 중 최소 거리인 정점을 선택하고, 그 정점을 통해 인접 정점의 거리를 갱신합니다. 그리디하게 최소부터 확정하므로 음의 가중치가 있으면 동작하지 않습니다.',
      tools: [
        {
          name: 'heapq',
          description: '최소 힙 기반 우선순위 큐로 다익스트라의 핵심입니다. heappush로 (거리, 노드)를 삽입하고 heappop으로 최소 거리 노드를 O(log N)에 추출합니다.',
          import: 'import heapq',
        },
        {
          name: 'collections.defaultdict',
          description: '인접 리스트를 defaultdict(list)로 생성하면 키 존재 여부를 확인하지 않고 바로 append할 수 있습니다.',
          import: 'from collections import defaultdict',
        },
      ],
      codeExamples: [
        {
          title: '다익스트라 기본 구현 (BOJ 1753)',
          code: `import sys
import heapq
input = sys.stdin.readline
INF = float('inf')

def dijkstra(graph, start, n):
    dist = [INF] * (n + 1)
    dist[start] = 0
    pq = [(0, start)]  # (거리, 노드)

    while pq:
        d, u = heapq.heappop(pq)
        if d > dist[u]:
            continue  # 이미 더 짧은 경로로 확정됨
        for v, w in graph[u]:
            if dist[u] + w < dist[v]:
                dist[v] = dist[u] + w
                heapq.heappush(pq, (dist[v], v))

    return dist

V, E = map(int, input().split())
K = int(input())
graph = [[] for _ in range(V + 1)]
for _ in range(E):
    u, v, w = map(int, input().split())
    graph[u].append((v, w))

dist = dijkstra(graph, K, V)
for i in range(1, V + 1):
    print("INF" if dist[i] == INF else dist[i])`,
          explanation:
            '우선순위 큐에서 최소 거리 노드를 꺼내고, 이미 확정된 거리보다 크면 건너뜁니다(lazy deletion). 인접 노드의 거리를 갱신할 수 있으면 갱신하고 큐에 넣습니다. 이 "d > dist[u] continue" 패턴이 핵심 최적화입니다.',
        },
        {
          title: '경로 역추적이 포함된 다익스트라',
          code: `import sys
import heapq
input = sys.stdin.readline
INF = float('inf')

def dijkstra_with_path(graph, start, end, n):
    dist = [INF] * (n + 1)
    prev_node = [-1] * (n + 1)
    dist[start] = 0
    pq = [(0, start)]

    while pq:
        d, u = heapq.heappop(pq)
        if d > dist[u]:
            continue
        if u == end:
            break
        for v, w in graph[u]:
            if dist[u] + w < dist[v]:
                dist[v] = dist[u] + w
                prev_node[v] = u
                heapq.heappush(pq, (dist[v], v))

    # 경로 역추적
    path = []
    node = end
    while node != -1:
        path.append(node)
        node = prev_node[node]
    path.reverse()

    return dist[end], path

# BOJ 11779 - 최소비용 구하기 2
n = int(input())
m = int(input())
graph = [[] for _ in range(n + 1)]
for _ in range(m):
    u, v, w = map(int, input().split())
    graph[u].append((v, w))

start, end = map(int, input().split())
cost, path = dijkstra_with_path(graph, start, end, n)
print(cost)
print(len(path))
print(' '.join(map(str, path)))`,
          explanation:
            'prev_node 배열에 각 노드의 최단 경로상 이전 노드를 기록합니다. 도착 후 end에서 start까지 prev_node를 따라가며 경로를 역추적합니다.',
        },
      ],
      commonProblems: [
        { name: '최단경로', platform: 'boj', id: '1753' },
        { name: '최소비용 구하기', platform: 'boj', id: '1916' },
        { name: '최소비용 구하기 2', platform: 'boj', id: '11779' },
        { name: '특정한 최단 경로', platform: 'boj', id: '1504' },
        { name: 'Network Delay Time', platform: 'leetcode', id: '743', slug: 'network-delay-time', difficulty: 'Medium' },
        { name: 'Cheapest Flights Within K Stops', platform: 'leetcode', id: '787', slug: 'cheapest-flights-within-k-stops', difficulty: 'Medium' },
      ],
      tips: [
        '"d > dist[u]: continue" 패턴을 반드시 사용하세요. 없으면 같은 노드를 여러 번 처리합니다.',
        'Python에서는 heapq가 최소 힙이므로 (거리, 노드) 순서로 넣어야 합니다.',
        '음의 가중치가 있으면 다익스트라는 오답을 줄 수 있으니 벨만-포드를 사용하세요.',
        '간선이 양방향이면 graph[u].append와 graph[v].append를 모두 해야 합니다.',
      ],
    },
    {
      id: 'bellman-ford',
      name: '벨만-포드 (Bellman-Ford)',
      description:
        '음의 가중치가 있는 그래프에서도 최단 경로를 구할 수 있으며, 음의 사이클 존재 여부도 판별합니다. 모든 간선을 V-1번 반복하여 거리를 갱신합니다.',
      timeComplexity: 'O(VE)',
      spaceComplexity: 'O(V)',
      keyInsight:
        '최단 경로는 최대 V-1개의 간선을 사용하므로, V-1번 반복하면 모든 최단 거리가 확정됩니다. V번째 반복에서도 갱신이 발생하면 음의 사이클이 존재합니다.',
      tools: [
        {
          name: 'list',
          description: '거리 배열을 [INF] * (n+1)로 초기화하고, 간선 리스트를 (u, v, w) 튜플의 리스트로 저장합니다.',
          import: '내장 자료형',
        },
        {
          name: "float('inf')",
          description: '초기 거리값을 무한대로 설정합니다. dist[u] != INF 조건으로 아직 도달하지 못한 정점에서의 잘못된 갱신을 방지합니다.',
          import: '내장 함수',
        },
      ],
      codeExamples: [
        {
          title: '벨만-포드 기본 구현 (BOJ 11657)',
          code: `import sys
input = sys.stdin.readline
INF = float('inf')

def bellman_ford(n, edges, start):
    dist = [INF] * (n + 1)
    dist[start] = 0

    # V-1번 반복
    for i in range(n - 1):
        for u, v, w in edges:
            if dist[u] != INF and dist[u] + w < dist[v]:
                dist[v] = dist[u] + w

    # 음의 사이클 판별: V번째에 갱신이 발생하면 음의 사이클
    has_negative_cycle = False
    for u, v, w in edges:
        if dist[u] != INF and dist[u] + w < dist[v]:
            has_negative_cycle = True
            break

    return dist, has_negative_cycle

# BOJ 11657 - 타임머신
n, m = map(int, input().split())
edges = []
for _ in range(m):
    a, b, c = map(int, input().split())
    edges.append((a, b, c))

dist, has_neg_cycle = bellman_ford(n, edges, 1)

if has_neg_cycle:
    print(-1)
else:
    for i in range(2, n + 1):
        print(-1 if dist[i] == INF else dist[i])`,
          explanation:
            '모든 간선을 V-1번 순회하며, 출발 노드의 거리가 INF가 아닌 경우에만 갱신합니다 (dist[u] != INF 조건). V번째 반복에서 갱신이 발생하면 음의 사이클이 존재한다는 의미입니다.',
        },
      ],
      commonProblems: [
        { name: '타임머신', platform: 'boj', id: '11657' },
        { name: '웜홀', platform: 'boj', id: '1865' },
        { name: '오민식의 고민', platform: 'boj', id: '1219' },
        { name: 'Path With Minimum Effort', platform: 'leetcode', id: '1631', slug: 'path-with-minimum-effort', difficulty: 'Medium' },
      ],
      tips: [
        'dist[u] != INF 조건을 빼먹으면 INF에서 음수를 빼는 경우가 생겨 오답이 납니다.',
        '음의 사이클이 시작 정점에서 도달 불가능한 곳에 있을 수 있으므로, 문제 조건을 잘 확인하세요.',
        '다익스트라보다 느리므로 (O(VE) vs O((V+E)logV)), 음수 가중치가 없으면 다익스트라를 사용하세요.',
        'SPFA(큐 기반 벨만-포드)는 평균적으로 더 빠르지만 최악은 동일합니다.',
      ],
    },
    {
      id: 'floyd-warshall',
      name: '플로이드-워셜 (Floyd-Warshall)',
      description:
        '모든 정점 쌍 간의 최단 거리를 구하는 알고리즘입니다. 3중 반복문으로 구현이 간단하며, 음의 가중치도 처리할 수 있습니다 (음의 사이클은 불가).',
      timeComplexity: 'O(V³)',
      spaceComplexity: 'O(V²)',
      keyInsight:
        '"정점 k를 경유하는 것이 더 짧은가?"를 모든 (i, j) 쌍에 대해 검사합니다. k를 1부터 V까지 순서대로 추가하면 최종적으로 모든 경유 가능성이 반영됩니다.',
      tools: [
        {
          name: 'list',
          description: '2차원 거리 행렬을 [[INF] * (n+1) for _ in range(n+1)]로 생성합니다. dist[i][j]가 i에서 j까지의 최단 거리입니다.',
          import: '내장 자료형',
        },
        {
          name: "float('inf')",
          description: '거리 행렬의 초기값으로 사용합니다. 경로가 없는 쌍을 INF로 유지하여 출력 시 구분합니다.',
          import: '내장 함수',
        },
      ],
      codeExamples: [
        {
          title: '플로이드-워셜 기본 구현 (BOJ 11404)',
          code: `import sys
input = sys.stdin.readline
INF = float('inf')

n = int(input())
m = int(input())

# 거리 테이블 초기화
dist = [[INF] * (n + 1) for _ in range(n + 1)]
for i in range(n + 1):
    dist[i][i] = 0

for _ in range(m):
    a, b, c = map(int, input().split())
    dist[a][b] = min(dist[a][b], c)  # 중복 간선 처리

# 플로이드-워셜
for k in range(1, n + 1):       # 경유 정점
    for i in range(1, n + 1):   # 출발 정점
        for j in range(1, n + 1):  # 도착 정점
            if dist[i][k] + dist[k][j] < dist[i][j]:
                dist[i][j] = dist[i][k] + dist[k][j]

# 출력
for i in range(1, n + 1):
    row = []
    for j in range(1, n + 1):
        row.append(0 if dist[i][j] == INF else dist[i][j])
    print(' '.join(map(str, row)))`,
          explanation:
            'k-i-j 순서의 3중 반복문이 핵심입니다. k(경유 정점)가 가장 바깥 반복이어야 합니다. dist[i][j] = min(dist[i][j], dist[i][k] + dist[k][j])로 경유하는 것이 더 짧으면 갱신합니다.',
        },
        {
          title: '경유 정점 역추적',
          code: `INF = float('inf')

def floyd_with_path(n, dist):
    # nxt[i][j] = i에서 j로 갈 때 다음에 방문할 정점
    nxt = [[0] * (n + 1) for _ in range(n + 1)]

    for i in range(1, n + 1):
        for j in range(1, n + 1):
            if dist[i][j] != INF and i != j:
                nxt[i][j] = j

    for k in range(1, n + 1):
        for i in range(1, n + 1):
            for j in range(1, n + 1):
                if dist[i][k] + dist[k][j] < dist[i][j]:
                    dist[i][j] = dist[i][k] + dist[k][j]
                    nxt[i][j] = nxt[i][k]

    return nxt

def get_path(nxt, start, end):
    if nxt[start][end] == 0:
        return []  # 경로 없음
    path = [start]
    while start != end:
        start = nxt[start][end]
        path.append(start)
    return path

# 사용 예시
# nxt = floyd_with_path(n, dist)
# path = get_path(nxt, 1, 5)  # 1에서 5까지의 최단 경로`,
          explanation:
            'nxt[i][j]에 i에서 j로 가는 최단 경로의 다음 노드를 저장합니다. 거리가 갱신될 때 nxt[i][j] = nxt[i][k]로 경유지 정보를 함께 갱신합니다. 경로 복원 시 nxt를 따라가면 됩니다.',
        },
      ],
      commonProblems: [
        { name: '플로이드', platform: 'boj', id: '11404' },
        { name: '플로이드 2', platform: 'boj', id: '11780' },
        { name: '운동', platform: 'boj', id: '1956' },
        { name: '키 순서', platform: 'boj', id: '2458' },
        { name: 'Find the City', platform: 'leetcode', id: '1334', slug: 'find-the-city-with-the-smallest-number-of-neighbors-at-a-threshold-distance', difficulty: 'Medium' },
      ],
      tips: [
        '반드시 k가 가장 바깥 반복문이어야 합니다. 순서가 바뀌면 틀립니다.',
        'V가 500 이하일 때만 사용하세요. V=1000이면 10^9 연산으로 시간 초과됩니다.',
        '중복 간선이 있을 수 있으므로 입력 시 min으로 처리하세요.',
        '자기 자신으로의 거리는 0으로 초기화하되, 음의 사이클이 있으면 dist[i][i] < 0이 됩니다.',
      ],
    },
  ],
}
