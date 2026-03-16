import type { Category } from '../../types/algorithm'

export const mstCategory: Category = {
  id: 'mst',
  name: '최소 신장 트리',
  icon: '🌉',
  description:
    '그래프의 모든 정점을 최소 비용으로 연결하는 트리를 찾는 알고리즘입니다. 간선의 가중치 합이 최소인 신장 트리를 구하며, 네트워크 설계, 클러스터링 등에 활용됩니다.',
  patterns: [
    {
      id: 'kruskal',
      name: '크루스칼 (Kruskal)',
      description:
        '간선을 가중치 기준으로 오름차순 정렬한 뒤, 사이클을 만들지 않는 간선을 하나씩 추가하여 MST를 구성합니다. Union-Find를 사용하여 사이클 여부를 판별합니다.',
      timeComplexity: 'O(E log E)',
      spaceComplexity: 'O(V)',
      keyInsight:
        '가장 가벼운 간선부터 탐욕적으로 선택하되, 사이클이 생기는 간선은 건너뜁니다. Union-Find로 두 정점이 이미 같은 집합인지 O(α(N))에 확인하므로, 전체 시간은 간선 정렬에 의해 결정됩니다.',
      pythonTools: [
        {
          name: 'sorted / list.sort',
          description: '간선 리스트를 가중치 기준으로 정렬합니다. (가중치, 정점1, 정점2) 튜플로 저장하면 기본 정렬만으로 가중치 오름차순이 됩니다.',
          import: '내장 함수',
        },
        {
          name: 'Union-Find',
          description: 'find와 union 함수로 사이클 판별을 수행합니다. 경로 압축과 랭크 기반 합치기를 적용하면 거의 O(1)에 동작합니다.',
          import: '직접 구현',
        },
      ],
      codeExamples: [
        {
          title: '크루스칼 알고리즘 기본 구현 (BOJ 1197)',
          code: `import sys
input = sys.stdin.readline

def find(parent, x):
    if parent[x] != x:
        parent[x] = find(parent, parent[x])  # 경로 압축
    return parent[x]

def union(parent, rank, a, b):
    a = find(parent, a)
    b = find(parent, b)
    if a == b:
        return False  # 사이클 발생
    if rank[a] < rank[b]:
        a, b = b, a
    parent[b] = a
    if rank[a] == rank[b]:
        rank[a] += 1
    return True

V, E = map(int, input().split())
edges = []
for _ in range(E):
    u, v, w = map(int, input().split())
    edges.append((w, u, v))

edges.sort()  # 가중치 기준 오름차순 정렬

parent = list(range(V + 1))
rank = [0] * (V + 1)
total = 0
count = 0

for w, u, v in edges:
    if union(parent, rank, u, v):
        total += w
        count += 1
        if count == V - 1:
            break  # MST 완성

print(total)`,
          explanation:
            '간선을 (가중치, 정점1, 정점2) 형태로 저장하고 정렬합니다. 가장 가벼운 간선부터 순서대로 확인하며, Union-Find로 두 정점이 다른 집합이면 간선을 MST에 추가합니다. V-1개의 간선이 선택되면 MST가 완성됩니다.',
        },
      ],
      commonProblems: [
        { name: '최소 스패닝 트리', platform: 'boj', id: '1197' },
        { name: '네트워크 연결', platform: 'boj', id: '1922' },
        { name: 'Connecting Cities With Minimum Cost', platform: 'leetcode', id: '1135', slug: 'connecting-cities-with-minimum-cost', difficulty: 'Medium' },
      ],
      tips: [
        '간선을 (가중치, u, v) 형태로 저장하면 별도의 key 없이 기본 정렬로 가중치 오름차순이 됩니다.',
        'MST의 간선 수는 항상 V-1개이므로, V-1개가 선택되면 조기 종료할 수 있습니다.',
        '크루스칼은 간선이 적은 희소 그래프(sparse graph)에서 유리합니다.',
        'Union-Find의 경로 압축을 빼먹으면 최악 O(VE)로 느려질 수 있습니다.',
      ],
    },
    {
      id: 'prim',
      name: '프림 (Prim)',
      description:
        '하나의 시작 정점에서 출발하여, 현재 MST에 연결된 간선 중 가장 가벼운 간선을 선택하며 트리를 확장합니다. 우선순위 큐(최소 힙)를 사용하여 효율적으로 동작합니다.',
      timeComplexity: 'O(E log V)',
      spaceComplexity: 'O(V)',
      keyInsight:
        'MST에 포함된 정점 집합에서 나가는 간선 중 최소 가중치 간선을 선택합니다. 다익스트라와 유사하지만, 거리 갱신 대신 간선 가중치 자체를 비교한다는 점이 다릅니다.',
      pythonTools: [
        {
          name: 'heapq',
          description: '최소 힙으로 현재 MST에 연결된 간선 중 최소 가중치 간선을 O(log N)에 추출합니다.',
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
          title: '프림 알고리즘 기본 구현 (BOJ 1197)',
          code: `import sys
import heapq
input = sys.stdin.readline

V, E = map(int, input().split())
graph = [[] for _ in range(V + 1)]
for _ in range(E):
    u, v, w = map(int, input().split())
    graph[u].append((w, v))
    graph[v].append((w, u))

visited = [False] * (V + 1)
pq = [(0, 1)]  # (가중치, 노드), 시작점 1
total = 0
count = 0

while pq and count < V:
    w, u = heapq.heappop(pq)
    if visited[u]:
        continue
    visited[u] = True
    total += w
    count += 1
    for nw, v in graph[u]:
        if not visited[v]:
            heapq.heappush(pq, (nw, v))

print(total)`,
          explanation:
            '시작 정점을 가중치 0으로 힙에 넣고, 매번 최소 가중치 간선을 꺼냅니다. 아직 방문하지 않은 정점이면 MST에 추가하고, 해당 정점의 인접 간선들을 힙에 넣습니다. visited 체크로 이미 MST에 포함된 정점을 건너뜁니다.',
        },
      ],
      commonProblems: [
        { name: '최소 스패닝 트리', platform: 'boj', id: '1197' },
        { name: 'Min Cost to Connect All Points', platform: 'leetcode', id: '1584', slug: 'min-cost-to-connect-all-points', difficulty: 'Medium' },
        { name: '별자리 만들기', platform: 'boj', id: '4386' },
      ],
      tips: [
        '프림은 정점이 적고 간선이 많은 밀집 그래프(dense graph)에서 크루스칼보다 유리합니다.',
        '다익스트라와 구조가 거의 같지만, dist 배열 대신 visited만 사용한다는 점이 다릅니다.',
        '힙에서 꺼낸 정점이 이미 방문되었으면 continue로 건너뛰세요 (lazy deletion).',
        '양방향 간선이므로 graph[u]와 graph[v] 모두에 추가해야 합니다.',
      ],
    },
  ],
}
