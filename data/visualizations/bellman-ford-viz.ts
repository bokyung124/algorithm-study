import type { VisualizationConfig, VisualizationStep } from '../../types/visualization'

const defaultGraph = {
  adjacency: {
    'A': ['B', 'C'],
    'B': ['D'],
    'C': ['B', 'D', 'E'],
    'D': ['E'],
    'E': [],
  } as Record<string, string[]>,
}

const edgeWeights: Record<string, number> = {
  'A-B': 4, 'A-C': 2,
  'B-D': 3,
  'C-B': -1, 'C-D': 5, 'C-E': 7,
  'D-E': 1,
}

function generateSteps(input: number[] | { adjacency: Record<string, string[]> }): VisualizationStep[] {
  const graph = input as { adjacency: Record<string, string[]> }
  const adj = graph.adjacency
  const steps: VisualizationStep[] = []
  const nodes = Object.keys(adj)
  const allEdges: [string, string][] = []
  for (const [n, nbrs] of Object.entries(adj)) for (const nbr of nbrs) allEdges.push([n, nbr])

  const dist: Record<string, number | null> = {}
  for (const n of nodes) dist[n] = null
  dist[nodes[0]] = 0

  steps.push({ type: 'graph', visited: [], current: nodes[0], queue: nodes, edges: allEdges, weights: edgeWeights, distances: { ...dist }, message: `Bellman-Ford: 시작점 ${nodes[0]}. 음수 가중치도 처리 가능!` })

  for (let iter = 0; iter < nodes.length - 1; iter++) {
    let updated = false
    for (const [u, v] of allEdges) {
      if (dist[u] === null) continue
      const w = edgeWeights[`${u}-${v}`] ?? 1
      const newDist = dist[u] + w
      if (dist[v] === null || newDist < dist[v]) {
        dist[v] = newDist
        updated = true
        steps.push({ type: 'graph', visited: nodes.filter(n => dist[n] !== null), current: v, queue: nodes.filter(n => dist[n] === null), edges: allEdges, weights: edgeWeights, distances: { ...dist }, message: `반복 ${iter + 1}: dist[${v}] = ${newDist} (${u}→${v}, w=${w})` })
      }
    }
    if (!updated) {
      steps.push({ type: 'graph', visited: nodes, current: null, queue: [], edges: allEdges, weights: edgeWeights, distances: { ...dist }, message: `반복 ${iter + 1}: 갱신 없음. 조기 종료!` })
      break
    }
  }

  steps.push({ type: 'graph', visited: nodes, current: null, queue: [], edges: allEdges, weights: edgeWeights, distances: { ...dist }, message: `완료! 최단 거리: ${nodes.map(n => `${n}=${dist[n] ?? '∞'}`).join(', ')}` })
  return steps
}

export const bellmanFordViz: VisualizationConfig = {
  name: 'Bellman-Ford',
  description: '모든 간선을 반복 완화하여 최단 경로를 구합니다.',
  defaultInput: defaultGraph,
  generateSteps,
}
