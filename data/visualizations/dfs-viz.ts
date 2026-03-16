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
  const stack: string[] = []

  const allEdges: [string, string][] = []
  for (const [node, neighbors] of Object.entries(adj)) {
    for (const neighbor of neighbors) {
      allEdges.push([node, neighbor])
    }
  }

  const startNode = Object.keys(adj)[0]
  steps.push({ type: 'graph', visited: [], current: null, queue: [], edges: allEdges, message: `DFS를 시작합니다. 시작 노드: ${startNode}` })

  function dfs(node: string) {
    visited.push(node)
    stack.push(node)
    steps.push({ type: 'graph', visited: [...visited], current: node, queue: [...stack], edges: allEdges, message: `노드 ${node}을 방문합니다. 스택: [${stack.join(', ')}]` })

    const neighbors = adj[node] ?? []
    for (const neighbor of neighbors) {
      if (!visited.includes(neighbor)) {
        steps.push({ type: 'graph', visited: [...visited], current: node, queue: [...stack], edges: allEdges, message: `노드 ${node}에서 ${neighbor}로 이동합니다.` })
        dfs(neighbor)
      }
    }

    stack.pop()
    steps.push({ type: 'graph', visited: [...visited], current: stack[stack.length - 1] ?? null, queue: [...stack], edges: allEdges, message: `노드 ${node}의 탐색 완료. 되돌아갑니다.` })
  }

  dfs(startNode)
  steps.push({ type: 'graph', visited: [...visited], current: null, queue: [], edges: allEdges, message: `DFS 완료! 방문 순서: ${visited.join(' → ')}` })

  return steps
}

export const dfsViz: VisualizationConfig = {
  name: 'DFS (깊이 우선 탐색)',
  description: '스택을 사용하여 깊이 우선으로 그래프를 탐색합니다.',
  defaultInput: defaultGraph,
  generateSteps,
}
