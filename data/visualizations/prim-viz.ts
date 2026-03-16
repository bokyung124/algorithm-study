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
  const start = nodes[0]

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

  const visited = new Set<string>()
  const mstEdges: [string, string][] = []
  // 우선순위 큐 시뮬레이션: [가중치, from, to]
  let pq: { w: number; from: string; to: string }[] = []

  steps.push({
    type: 'graph',
    visited: [],
    current: start,
    queue: [],
    edges: allEdges,
    weights: edgeWeights,
    distances: {},
    message: `프림 시작. 시작점: ${start}. 우선순위 큐에 ${start}의 인접 간선을 추가합니다.`,
  })

  visited.add(start)

  // 시작점의 인접 간선 추가
  for (const neighbor of adj[start] ?? []) {
    const w = edgeWeights[`${start}-${neighbor}`] ?? edgeWeights[`${neighbor}-${start}`] ?? 1
    pq.push({ w, from: start, to: neighbor })
  }
  pq.sort((a, b) => a.w - b.w)

  steps.push({
    type: 'graph',
    visited: [start],
    current: start,
    queue: pq.map(e => `${e.from}-${e.to}(${e.w})`),
    edges: [...mstEdges],
    weights: edgeWeights,
    distances: {},
    message: `${start} 방문. 힙: ${pq.map(e => `${e.from}-${e.to}(${e.w})`).join(', ')}`,
  })

  while (pq.length > 0 && visited.size < nodes.length) {
    // 최소 가중치 간선 꺼내기
    const min = pq.shift()!
    const { w, from, to } = min

    if (visited.has(to)) {
      steps.push({
        type: 'graph',
        visited: [...visited],
        current: to,
        queue: pq.map(e => `${e.from}-${e.to}(${e.w})`),
        edges: [...mstEdges],
        weights: edgeWeights,
        distances: {},
        message: `간선 ${from}-${to} (가중치 ${w}) 꺼냄: ${to}는 이미 방문 → 건너뜀`,
      })
      continue
    }

    visited.add(to)
    mstEdges.push([from, to])

    // 새 정점의 인접 간선 추가
    for (const neighbor of adj[to] ?? []) {
      if (!visited.has(neighbor)) {
        const nw = edgeWeights[`${to}-${neighbor}`] ?? edgeWeights[`${neighbor}-${to}`] ?? 1
        pq.push({ w: nw, from: to, to: neighbor })
      }
    }
    pq.sort((a, b) => a.w - b.w)

    steps.push({
      type: 'graph',
      visited: [...visited],
      current: to,
      queue: pq.map(e => `${e.from}-${e.to}(${e.w})`),
      edges: [...mstEdges],
      weights: edgeWeights,
      distances: {},
      message: `간선 ${from}-${to} (가중치 ${w}) 추가! ${to} 방문. MST 간선 수: ${mstEdges.length}/${nodes.length - 1}`,
    })
  }

  const totalWeight = mstEdges.reduce((sum, [u, v]) => sum + (edgeWeights[`${u}-${v}`] ?? edgeWeights[`${v}-${u}`] ?? 0), 0)

  steps.push({
    type: 'graph',
    visited: [...visited],
    current: null,
    queue: [],
    edges: [...mstEdges],
    weights: edgeWeights,
    distances: {},
    message: `MST 완성! 총 가중치: ${totalWeight}. 간선: ${mstEdges.map(([u, v]) => `${u}-${v}`).join(', ')}`,
  })

  return steps
}

export const primViz: VisualizationConfig = {
  name: '프림 최소 신장 트리',
  description: '시작 정점에서 출발하여 우선순위 큐로 최소 가중치 간선을 선택하며 MST를 확장합니다.',
  defaultInput: defaultGraph,
  generateSteps,
}
