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

  const visited: string[] = []
  const finished: string[] = []

  steps.push({ type: 'graph', visited: [], current: null, queue: [], edges: allEdges, message: 'DFS 위상 정렬: DFS 완료 순서의 역순이 위상 정렬 결과입니다.' })

  function dfs(node: string) {
    visited.push(node)
    steps.push({ type: 'graph', visited: [...visited], current: node, queue: [...finished], edges: allEdges, message: `DFS: 노드 ${node} 방문` })

    for (const nbr of adj[node] ?? []) {
      if (!visited.includes(nbr)) {
        dfs(nbr)
      }
    }

    finished.push(node)
    steps.push({ type: 'graph', visited: [...visited], current: node, queue: [...finished], edges: allEdges, message: `노드 ${node} 완료. 완료 스택: [${[...finished].reverse().join(', ')}]` })
  }

  for (const node of nodes) {
    if (!visited.includes(node)) {
      dfs(node)
    }
  }

  const result = [...finished].reverse()
  steps.push({ type: 'graph', visited: [...visited], current: null, queue: [], edges: allEdges, message: `DFS 위상 정렬 완료: [${result.join(' → ')}]` })
  return steps
}

export const dfsTopologicalSortViz: VisualizationConfig = {
  name: 'DFS 위상 정렬',
  description: 'DFS 후위 순서의 역순으로 위상 정렬합니다.',
  defaultInput: defaultGraph,
  generateSteps,
}
