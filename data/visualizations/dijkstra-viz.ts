import type { VisualizationConfig, VisualizationStep } from '../../types/visualization'

const defaultGraph = {
  adjacency: {
    'A': ['B', 'C'],
    'B': ['D', 'E'],
    'C': ['B', 'E'],
    'D': ['F'],
    'E': ['D', 'F'],
    'F': [],
  } as Record<string, string[]>,
}

const edgeWeights: Record<string, number> = {
  'A-B': 4, 'A-C': 2,
  'B-D': 3, 'B-E': 1,
  'C-B': 1, 'C-E': 5,
  'D-F': 2,
  'E-D': 1, 'E-F': 3,
}

function generateSteps(input: number[] | { adjacency: Record<string, string[]> }): VisualizationStep[] {
  const graph = input as { adjacency: Record<string, string[]> }
  const adj = graph.adjacency
  const steps: VisualizationStep[] = []
  const nodes = Object.keys(adj)
  const start = nodes[0]

  const allEdges: [string, string][] = []
  for (const [node, neighbors] of Object.entries(adj)) {
    for (const neighbor of neighbors) {
      allEdges.push([node, neighbor])
    }
  }

  const dist: Record<string, number | null> = {}
  const visited: string[] = []
  for (const n of nodes) dist[n] = null
  dist[start] = 0

  steps.push({
    type: 'graph',
    visited: [],
    current: start,
    queue: nodes,
    edges: allEdges,
    weights: edgeWeights,
    distances: { ...dist },
    message: `Dijkstra 시작. 시작점: ${start}. 모든 거리를 ∞로 초기화, dist[${start}]=0`,
  })

  while (true) {
    let minNode: string | null = null
    let minDist = Infinity
    for (const n of nodes) {
      if (!visited.includes(n) && dist[n] !== null && dist[n]! < minDist) {
        minDist = dist[n]!
        minNode = n
      }
    }
    if (!minNode) break

    visited.push(minNode)
    const unvisited = nodes.filter((n) => !visited.includes(n))

    steps.push({
      type: 'graph',
      visited: [...visited],
      current: minNode,
      queue: unvisited,
      edges: allEdges,
      weights: edgeWeights,
      distances: { ...dist },
      message: `${minNode}을(를) 선택 (거리 ${dist[minNode]}). 인접 노드의 거리를 갱신합니다.`,
    })

    for (const neighbor of adj[minNode] ?? []) {
      const w = edgeWeights[`${minNode}-${neighbor}`] ?? 1
      const newDist = dist[minNode]! + w
      if (dist[neighbor] === null || newDist < dist[neighbor]!) {
        const old = dist[neighbor]
        dist[neighbor] = newDist
        steps.push({
          type: 'graph',
          visited: [...visited],
          current: minNode,
          queue: unvisited,
          edges: allEdges,
          weights: edgeWeights,
          distances: { ...dist },
          message: `dist[${neighbor}] = ${old === null ? '∞' : old} → ${newDist} (${minNode} 경유, 가중치 ${w})`,
        })
      }
    }
  }

  steps.push({
    type: 'graph',
    visited: [...visited],
    current: null,
    queue: [],
    edges: allEdges,
    weights: edgeWeights,
    distances: { ...dist },
    message: `완료! 최단 거리: ${nodes.map((n) => `${n}=${dist[n] ?? '∞'}`).join(', ')}`,
  })

  return steps
}

export const dijkstraViz: VisualizationConfig = {
  name: 'Dijkstra 최단 경로',
  description: '가중치 그래프에서 시작점부터 모든 노드까지의 최단 거리를 구합니다.',
  defaultInput: defaultGraph,
  generateSteps,
}
