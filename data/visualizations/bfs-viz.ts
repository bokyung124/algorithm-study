import type { VisualizationConfig, VisualizationStep } from '../../types/visualization'

const defaultGraph = {
  adjacency: {
    '1': ['2', '3'],
    '2': ['4', '5'],
    '3': ['6'],
    '4': [],
    '5': ['6'],
    '6': [],
  } as Record<string, string[]>,
}

function generateSteps(input: number[] | { adjacency: Record<string, string[]> }): VisualizationStep[] {
  const graph = input as { adjacency: Record<string, string[]> }
  const adj = graph.adjacency
  const steps: VisualizationStep[] = []
  const visited: string[] = []

  const allEdges: [string, string][] = []
  for (const [node, neighbors] of Object.entries(adj)) {
    for (const neighbor of neighbors) {
      allEdges.push([node, neighbor])
    }
  }

  const startNode = Object.keys(adj)[0]
  const queue: string[] = [startNode]
  visited.push(startNode)

  steps.push({ type: 'graph', visited: [...visited], current: startNode, queue: [...queue], edges: allEdges, message: `BFS를 시작합니다. 시작 노드: ${startNode}` })

  while (queue.length > 0) {
    const node = queue.shift()!
    steps.push({ type: 'graph', visited: [...visited], current: node, queue: [...queue], edges: allEdges, message: `노드 ${node}을 처리합니다. 큐: [${queue.join(', ')}]` })

    const neighbors = adj[node] ?? []
    for (const neighbor of neighbors) {
      if (!visited.includes(neighbor)) {
        visited.push(neighbor)
        queue.push(neighbor)
        steps.push({ type: 'graph', visited: [...visited], current: node, queue: [...queue], edges: allEdges, message: `노드 ${neighbor}을 발견하고 큐에 추가합니다.` })
      }
    }
  }

  steps.push({ type: 'graph', visited: [...visited], current: null, queue: [], edges: allEdges, message: `BFS 완료! 방문 순서: ${visited.join(' → ')}` })

  return steps
}

export const bfsViz: VisualizationConfig = {
  name: 'BFS (너비 우선 탐색)',
  description: '큐를 사용하여 너비 우선으로 그래프를 탐색합니다.',
  defaultInput: defaultGraph,
  generateSteps,
}
