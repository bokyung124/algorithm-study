import type { VisualizationConfig, VisualizationStep } from '../../types/visualization'

const defaultGraph = {
  adjacency: {
    'A': ['B', 'C', 'D'],
    'B': ['A', 'C', 'E'],
    'C': ['A', 'B', 'D', 'E'],
    'D': ['A', 'C', 'E'],
    'E': ['B', 'C', 'D'],
  } as Record<string, string[]>,
}

const edgeWeights: Record<string, number> = {
  'A-B': 4, 'B-A': 4,
  'A-C': 3, 'C-A': 3,
  'A-D': 5, 'D-A': 5,
  'B-C': 2, 'C-B': 2,
  'B-E': 6, 'E-B': 6,
  'C-D': 7, 'D-C': 7,
  'C-E': 1, 'E-C': 1,
  'D-E': 8, 'E-D': 8,
}

function generateSteps(input: number[] | { adjacency: Record<string, string[]> }): VisualizationStep[] {
  const graph = input as { adjacency: Record<string, string[]> }
  const adj = graph.adjacency
  const steps: VisualizationStep[] = []
  const nodes = Object.keys(adj)

  // 모든 간선 수집 (중복 제거)
  const allEdges: [string, string][] = []
  const edgeSet = new Set<string>()
  for (const [node, neighbors] of Object.entries(adj)) {
    for (const neighbor of neighbors) {
      const key = [node, neighbor].sort().join('-')
      if (!edgeSet.has(key)) {
        edgeSet.add(key)
        allEdges.push([node, neighbor])
      }
    }
  }

  // 간선을 가중치 기준 정렬
  const sortedEdges = allEdges
    .map(([u, v]) => ({ u, v, w: edgeWeights[`${u}-${v}`] ?? edgeWeights[`${v}-${u}`] ?? 1 }))
    .sort((a, b) => a.w - b.w)

  // Union-Find
  const parent: Record<string, string> = {}
  for (const n of nodes) parent[n] = n

  function find(x: string): string {
    if (parent[x] !== x) parent[x] = find(parent[x])
    return parent[x]
  }

  function union(a: string, b: string): boolean {
    const ra = find(a)
    const rb = find(b)
    if (ra === rb) return false
    parent[rb] = ra
    return true
  }

  const mstEdges: [string, string][] = []
  const visitedNodes: string[] = []

  steps.push({
    type: 'graph',
    visited: [],
    current: null,
    queue: sortedEdges.map(e => `${e.u}-${e.v}(${e.w})`),
    edges: allEdges,
    weights: edgeWeights,
    distances: {},
    message: `크루스칼 시작. 간선을 가중치 오름차순으로 정렬: ${sortedEdges.map(e => `${e.u}-${e.v}(${e.w})`).join(', ')}`,
  })

  for (const edge of sortedEdges) {
    const { u, v, w } = edge

    if (find(u) === find(v)) {
      steps.push({
        type: 'graph',
        visited: [...visitedNodes],
        current: `${u}-${v}`,
        queue: sortedEdges.filter(e => !mstEdges.some(m => (m[0] === e.u && m[1] === e.v) || (m[0] === e.v && m[1] === e.u))).map(e => `${e.u}-${e.v}(${e.w})`),
        edges: [...mstEdges],
        weights: edgeWeights,
        distances: {},
        message: `간선 ${u}-${v} (가중치 ${w}) 검사: ${u}와 ${v}가 이미 연결됨 → 사이클 발생, 건너뜀`,
      })
    } else {
      union(u, v)
      mstEdges.push([u, v])
      if (!visitedNodes.includes(u)) visitedNodes.push(u)
      if (!visitedNodes.includes(v)) visitedNodes.push(v)

      steps.push({
        type: 'graph',
        visited: [...visitedNodes],
        current: `${u}-${v}`,
        queue: sortedEdges.filter(e => !mstEdges.some(m => (m[0] === e.u && m[1] === e.v) || (m[0] === e.v && m[1] === e.u))).map(e => `${e.u}-${e.v}(${e.w})`),
        edges: [...mstEdges],
        weights: edgeWeights,
        distances: {},
        message: `간선 ${u}-${v} (가중치 ${w}) 추가! MST 간선 수: ${mstEdges.length}/${nodes.length - 1}`,
      })

      if (mstEdges.length === nodes.length - 1) break
    }
  }

  const totalWeight = mstEdges.reduce((sum, [u, v]) => sum + (edgeWeights[`${u}-${v}`] ?? edgeWeights[`${v}-${u}`] ?? 0), 0)

  steps.push({
    type: 'graph',
    visited: [...visitedNodes],
    current: null,
    queue: [],
    edges: [...mstEdges],
    weights: edgeWeights,
    distances: {},
    message: `MST 완성! 총 가중치: ${totalWeight}. 간선: ${mstEdges.map(([u, v]) => `${u}-${v}`).join(', ')}`,
  })

  return steps
}

export const kruskalViz: VisualizationConfig = {
  name: '크루스칼 최소 신장 트리',
  description: '간선을 가중치 순으로 정렬하고, Union-Find로 사이클을 피하며 MST를 구성합니다.',
  defaultInput: defaultGraph,
  generateSteps,
}
