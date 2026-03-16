import type { VisualizationConfig, VisualizationStep } from '../../types/visualization'

const defaultGraph = {
  adjacency: {
    '0': ['1', '2'],
    '1': ['3'],
    '2': ['3', '4'],
    '3': ['5'],
    '4': ['5'],
    '5': [],
  } as Record<string, string[]>,
}

function generateSteps(input: number[] | { adjacency: Record<string, string[]> }): VisualizationStep[] {
  const graph = input as { adjacency: Record<string, string[]> }
  const adj = graph.adjacency
  const steps: VisualizationStep[] = []
  const nodes = Object.keys(adj)
  const allEdges: [string, string][] = []
  for (const [n, nbrs] of Object.entries(adj)) for (const nbr of nbrs) allEdges.push([n, nbr])

  const inDegree: Record<string, number> = {}
  for (const n of nodes) inDegree[n] = 0
  for (const [, nbrs] of Object.entries(adj)) for (const nbr of nbrs) inDegree[nbr]++

  steps.push({ type: 'graph', visited: [], current: null, queue: nodes.filter(n => inDegree[n] === 0), edges: allEdges, message: `Kahn 알고리즘: 진입차수 = {${nodes.map(n => `${n}:${inDegree[n]}`).join(', ')}}` })

  const queue = nodes.filter(n => inDegree[n] === 0)
  const result: string[] = []

  while (queue.length > 0) {
    const node = queue.shift()!
    result.push(node)

    steps.push({ type: 'graph', visited: [...result], current: node, queue: [...queue], edges: allEdges, message: `진입차수 0인 ${node} 선택. 결과: [${result.join(', ')}]` })

    for (const nbr of adj[node] ?? []) {
      inDegree[nbr]--
      if (inDegree[nbr] === 0) {
        queue.push(nbr)
        steps.push({ type: 'graph', visited: [...result], current: node, queue: [...queue], edges: allEdges, message: `${nbr}의 진입차수 → ${inDegree[nbr]}${inDegree[nbr] === 0 ? ' (큐에 추가!)' : ''}` })
      }
    }
  }

  steps.push({ type: 'graph', visited: [...result], current: null, queue: [], edges: allEdges, message: `위상 정렬 완료: [${result.join(' → ')}]` })
  return steps
}

export const kahnAlgorithmViz: VisualizationConfig = {
  name: 'Kahn 알고리즘',
  description: '진입차수 0인 노드를 반복 제거하여 위상 정렬합니다.',
  defaultInput: defaultGraph,
  generateSteps,
}
