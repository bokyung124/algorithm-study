import type { VisualizationConfig, VisualizationStep } from '../../types/visualization'

const defaultGraph = {
  adjacency: {
    '1': ['2', '4'],
    '2': ['1', '3'],
    '3': ['2', '4'],
    '4': ['1', '3'],
  } as Record<string, string[]>,
}

function generateSteps(input: number[] | { adjacency: Record<string, string[]> }): VisualizationStep[] {
  const graph = input as { adjacency: Record<string, string[]> }
  const adj = graph.adjacency
  const steps: VisualizationStep[] = []
  const allEdges: [string, string][] = []
  for (const [n, nbrs] of Object.entries(adj)) {
    for (const nbr of nbrs) {
      allEdges.push([n, nbr])
    }
  }

  const nodes = Object.keys(adj)
  const color: Record<string, number> = {}
  const visited: string[] = []
  let isBipartite = true

  steps.push({
    type: 'graph',
    visited: [],
    current: null,
    queue: [],
    edges: allEdges,
    message: '이분 그래프 판별을 시작합니다. BFS로 인접한 정점에 번갈아 색을 칠합니다.',
  })

  for (const start of nodes) {
    if (color[start] !== undefined) continue

    color[start] = 1
    visited.push(start)
    const queue = [start]

    steps.push({
      type: 'graph',
      visited: [...visited],
      current: start,
      queue: [...queue],
      edges: allEdges,
      message: `노드 ${start}에서 BFS 시작. 그룹 A(색 1)로 지정합니다.`,
    })

    while (queue.length > 0) {
      const u = queue.shift()!

      for (const v of adj[u] ?? []) {
        if (color[v] === undefined) {
          color[v] = -color[u]
          visited.push(v)
          queue.push(v)
          const groupName = color[v] === 1 ? 'A' : 'B'

          steps.push({
            type: 'graph',
            visited: [...visited],
            current: v,
            queue: [...queue],
            edges: allEdges,
            message: `노드 ${v}를 그룹 ${groupName}(색 ${color[v]})으로 지정. (${u}의 반대 색)`,
          })
        } else if (color[v] === color[u]) {
          isBipartite = false

          steps.push({
            type: 'graph',
            visited: [...visited],
            current: v,
            queue: [...queue],
            edges: allEdges,
            message: `충돌! 노드 ${u}와 ${v}가 같은 색(${color[u]})입니다. 이분 그래프가 아닙니다!`,
          })
          break
        }
      }
      if (!isBipartite) break
    }
    if (!isBipartite) break
  }

  if (isBipartite) {
    const groupA = nodes.filter(n => color[n] === 1)
    const groupB = nodes.filter(n => color[n] === -1)

    steps.push({
      type: 'graph',
      visited: [...visited],
      current: null,
      queue: [],
      edges: allEdges,
      message: `이분 그래프입니다! 그룹 A: {${groupA.join(', ')}}, 그룹 B: {${groupB.join(', ')}}`,
    })
  } else {
    steps.push({
      type: 'graph',
      visited: [...visited],
      current: null,
      queue: [],
      edges: allEdges,
      message: '이분 그래프가 아닙니다. 같은 그룹에 속한 인접 정점이 존재합니다.',
    })
  }

  return steps
}

export const bipartiteViz: VisualizationConfig = {
  name: '이분 그래프 판별',
  description: 'BFS로 정점을 두 그룹으로 나누어 이분 그래프인지 판별하는 과정을 시각화합니다.',
  defaultInput: defaultGraph,
  generateSteps,
}
