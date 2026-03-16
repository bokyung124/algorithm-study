import type { VisualizationConfig, VisualizationStep } from '../../types/visualization'

const defaultGraph = {
  adjacency: {
    '1': ['2'], '2': ['1', '3'], '3': ['2'],
    '4': ['5'], '5': ['4'],
    '6': [],
  } as Record<string, string[]>,
}

function generateSteps(input: number[] | { adjacency: Record<string, string[]> }): VisualizationStep[] {
  const graph = input as { adjacency: Record<string, string[]> }
  const adj = graph.adjacency
  const steps: VisualizationStep[] = []
  const visited: string[] = []
  const allEdges: [string, string][] = []
  for (const [n, nbrs] of Object.entries(adj)) for (const nbr of nbrs) allEdges.push([n, nbr])

  steps.push({ type: 'graph', visited: [], current: null, queue: [], edges: allEdges, message: '연결 요소를 찾습니다. 방문하지 않은 노드에서 BFS/DFS를 시작합니다.' })

  let compCount = 0
  for (const start of Object.keys(adj)) {
    if (visited.includes(start)) continue
    compCount++
    const queue = [start]
    visited.push(start)

    steps.push({ type: 'graph', visited: [...visited], current: start, queue: [...queue], edges: allEdges, message: `컴포넌트 #${compCount}: 노드 ${start}에서 탐색 시작` })

    while (queue.length > 0) {
      const node = queue.shift()!
      for (const nbr of adj[node] ?? []) {
        if (!visited.includes(nbr)) {
          visited.push(nbr)
          queue.push(nbr)
          steps.push({ type: 'graph', visited: [...visited], current: nbr, queue: [...queue], edges: allEdges, message: `컴포넌트 #${compCount}: 노드 ${nbr} 발견` })
        }
      }
    }
  }

  steps.push({ type: 'graph', visited: [...visited], current: null, queue: [], edges: allEdges, message: `총 ${compCount}개의 연결 요소를 찾았습니다.` })
  return steps
}

export const connectedComponentsViz: VisualizationConfig = {
  name: '연결 요소',
  description: '그래프에서 연결된 컴포넌트를 찾습니다.',
  defaultInput: defaultGraph,
  generateSteps,
}
