import type { Category } from '../../types/algorithm'

export const unionFindCategory: Category = {
  id: 'union-find',
  name: '유니온파인드',
  icon: '🔗',
  description:
    '서로소 집합(Disjoint Set)을 효율적으로 관리하는 자료구조입니다. 두 원소가 같은 집합에 속하는지 확인(Find)하고, 두 집합을 합치는(Union) 연산을 거의 O(1)에 수행합니다. 그래프의 연결 요소, 사이클 판별, 크루스칼 알고리즘 등에 핵심적으로 사용됩니다.',
  patterns: [
    {
      id: 'basic-union-find',
      name: '기본 유니온파인드',
      description:
        '경로 압축(Path Compression)과 랭크 기반 합치기(Union by Rank)를 적용한 기본 유니온파인드입니다. 경로 압축은 Find 시 루트까지의 모든 노드를 직접 루트에 연결하고, 랭크 기반 합치기는 트리 높이가 낮은 쪽을 높은 쪽에 붙입니다.',
      timeComplexity: 'Find/Union 거의 O(1) (아커만 역함수 α(N))',
      spaceComplexity: 'O(N)',
      keyInsight:
        '경로 압축만으로도 매우 빠르지만, 랭크 기반 합치기를 함께 사용하면 트리가 극도로 납작해져서 사실상 상수 시간에 동작합니다.',
      tools: [
        {
          name: 'list',
          description: 'parent와 rank 배열을 생성합니다. list(range(n+1))로 parent를 자기 자신으로 초기화합니다.',
          import: '내장 자료형',
        },
        {
          name: 'sys',
          description: 'setrecursionlimit 설정에 사용합니다. 재귀 find에서 깊은 트리 탐색 시 기본 재귀 제한(1000)을 초과할 수 있습니다.',
          import: 'import sys',
        },
      ],
      codeExamples: [
        {
          title: '기본 유니온파인드 구현',
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
        return False  # 이미 같은 집합
    # 랭크 기반 합치기
    if rank[a] < rank[b]:
        a, b = b, a
    parent[b] = a
    if rank[a] == rank[b]:
        rank[a] += 1
    return True

# BOJ 1717 - 집합의 표현
n, m = map(int, input().split())
parent = list(range(n + 1))
rank = [0] * (n + 1)

for _ in range(m):
    op, a, b = map(int, input().split())
    if op == 0:
        union(parent, rank, a, b)
    else:
        if find(parent, a) == find(parent, b):
            print("YES")
        else:
            print("NO")`,
          explanation:
            'find 함수에서 경로 압축: parent[x]를 재귀적으로 루트까지 찾아가며 모든 중간 노드를 루트에 직접 연결합니다. union 함수에서 랭크 비교: 높이가 낮은 트리를 높은 트리 아래에 붙여 트리 높이 증가를 최소화합니다.',
        },
        {
          title: '그래프 사이클 판별',
          code: `import sys
input = sys.stdin.readline

def find(parent, x):
    if parent[x] != x:
        parent[x] = find(parent, parent[x])
    return parent[x]

def union(parent, rank, a, b):
    a = find(parent, a)
    b = find(parent, b)
    if a == b:
        return False  # 사이클 발생!
    if rank[a] < rank[b]:
        a, b = b, a
    parent[b] = a
    if rank[a] == rank[b]:
        rank[a] += 1
    return True

# 간선 리스트로 주어진 무방향 그래프의 사이클 판별
n, m = map(int, input().split())
parent = list(range(n + 1))
rank = [0] * (n + 1)

has_cycle = False
for _ in range(m):
    u, v = map(int, input().split())
    if not union(parent, rank, u, v):
        has_cycle = True
        break

print("사이클 있음" if has_cycle else "사이클 없음")`,
          explanation:
            '두 노드를 Union할 때 이미 같은 집합이면 (find 결과가 동일) 그 간선은 사이클을 만듭니다. 크루스칼 알고리즘에서도 같은 원리로 사이클을 피하며 MST를 구성합니다.',
        },
      ],
      commonProblems: [
        { name: '집합의 표현', platform: 'boj', id: '1717' },
        { name: '여행 가자', platform: 'boj', id: '1976' },
        { name: '친구 네트워크', platform: 'boj', id: '4195' },
        { name: '사이클 게임', platform: 'boj', id: '20040' },
        { name: 'Number of Provinces', platform: 'leetcode', id: '547', slug: 'number-of-provinces', difficulty: 'Medium' },
        { name: 'Redundant Connection', platform: 'leetcode', id: '684', slug: 'redundant-connection', difficulty: 'Medium' },
      ],
      tips: [
        '경로 압축은 반드시 적용하세요. 없으면 최악 O(N)이 됩니다.',
        '재귀 깊이가 깊어질 수 있으니 sys.setrecursionlimit 설정 또는 반복문 버전을 사용하세요.',
        'union 함수가 False를 반환하면 이미 같은 집합이므로 사이클 판별에 활용할 수 있습니다.',
        '노드 번호가 1부터 시작하는지 0부터 시작하는지 문제를 잘 확인하세요.',
      ],
    },
    {
      id: 'weighted-union-find',
      name: '가중치 유니온파인드',
      description:
        '각 노드에 루트까지의 가중치(거리, 차이 등)를 함께 관리하는 유니온파인드입니다. "A와 B의 차이가 w이다" 같은 관계형 정보를 집합으로 관리할 수 있습니다.',
      timeComplexity: 'Find/Union 거의 O(1)',
      spaceComplexity: 'O(N)',
      keyInsight:
        '각 노드에서 부모까지의 가중치를 저장하고, 경로 압축 시 가중치도 함께 누적하여 루트까지의 총 가중치를 관리합니다. 두 노드의 차이는 각각의 루트까지 가중치 차이로 구할 수 있습니다.',
      tools: [
        {
          name: 'list',
          description: 'parent, rank, weight 세 개의 배열을 관리합니다. weight[x]는 x에서 부모까지의 가중치를 저장합니다.',
          import: '내장 자료형',
        },
      ],
      codeExamples: [
        {
          title: '가중치 유니온파인드 (BOJ 3830 교수님은 기다리지 않는다)',
          code: `import sys
input = sys.stdin.readline
sys.setrecursionlimit(200000)

def find(parent, weight, x):
    if parent[x] != x:
        root = find(parent, weight, parent[x])
        weight[x] += weight[parent[x]]  # 가중치 누적
        parent[x] = root
    return parent[x]

def union(parent, weight, rank, a, b, w):
    """b - a = w 관계를 설정"""
    ra = find(parent, weight, a)
    rb = find(parent, weight, b)
    if ra == rb:
        return  # 이미 같은 집합
    # w_b - w_a = w이므로
    # weight[rb] 기준으로 new_weight 계산
    # rb를 ra 아래에 붙일 때: weight[rb] = weight[a] + w - weight[b]
    diff = weight[a] + w - weight[b]
    if rank[ra] < rank[rb]:
        parent[ra] = rb
        weight[ra] = -diff
    else:
        parent[rb] = ra
        weight[rb] = diff
        if rank[ra] == rank[rb]:
            rank[ra] += 1

def query(parent, weight, a, b):
    """b - a의 값을 반환. 같은 집합이 아니면 None"""
    if find(parent, weight, a) != find(parent, weight, b):
        return None
    return weight[b] - weight[a]

while True:
    n, m = map(int, input().split())
    if n == 0 and m == 0:
        break
    parent = list(range(n + 1))
    weight = [0] * (n + 1)  # 루트까지의 가중치
    rank = [0] * (n + 1)

    for _ in range(m):
        line = input().split()
        if line[0] == '!':
            a, b, w = int(line[1]), int(line[2]), int(line[3])
            union(parent, weight, rank, a, b, w)
        else:
            a, b = int(line[1]), int(line[2])
            result = query(parent, weight, a, b)
            if result is None:
                print("UNKNOWN")
            else:
                print(result)`,
          explanation:
            'weight[x]는 x에서 루트까지의 가중치 합입니다. find에서 경로 압축 시 weight를 누적하고, union에서 두 트리를 합칠 때 관계식(b - a = w)이 유지되도록 가중치를 계산합니다. query에서는 두 노드의 weight 차이로 답을 구합니다.',
        },
      ],
      commonProblems: [
        { name: '교수님은 기다리지 않는다', platform: 'boj', id: '3830' },
        { name: '잠금장치', platform: 'boj', id: '1839' },
        { name: '마블', platform: 'boj', id: '2843' },
        { name: 'Accounts Merge', platform: 'leetcode', id: '721', slug: 'accounts-merge', difficulty: 'Medium' },
        { name: 'Most Stones Removed', platform: 'leetcode', id: '947', slug: 'most-stones-removed-with-at-least-one-same-row-or-column', difficulty: 'Medium' },
      ],
      tips: [
        'find에서 경로 압축 시 weight 누적 순서에 주의하세요. 부모의 find를 먼저 호출한 뒤 weight를 더해야 합니다.',
        'union에서 관계식이 올바르게 유지되는지 수식으로 검증하세요.',
        '가중치가 XOR, 합, 차이 등 다양한 연산이 될 수 있으니 문제에 맞게 조정하세요.',
        '같은 집합인지 먼저 확인한 뒤 가중치 차이를 구해야 합니다.',
      ],
    },
  ],
}
