import type { VisualizationConfig, VisualizationStep } from '../../types/visualization'

const defaultGraph = {
  adjacency: {
    'A': ['B'],
    'B': ['C'],
    'C': ['A', 'D'],
    'D': ['E'],
    'E': ['F'],
    'F': ['D'],
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
  const dfn: Record<string, number> = {}
  const low: Record<string, number> = {}
  const onStack: Record<string, boolean> = {}
  const stack: string[] = []
  const visited: string[] = []
  let timer = 0
  const sccs: string[][] = []

  steps.push({
    type: 'graph',
    visited: [],
    current: null,
    queue: [],
    edges: allEdges,
    message: 'Tarjan SCC 알고리즘을 시작합니다. DFS로 순회하며 dfn과 low를 관리합니다.',
  })

  function dfs(u: string) {
    timer++
    dfn[u] = low[u] = timer
    stack.push(u)
    onStack[u] = true
    visited.push(u)

    steps.push({
      type: 'graph',
      visited: [...visited],
      current: u,
      queue: [...stack],
      edges: allEdges,
      message: `DFS 방문: ${u} (dfn=${dfn[u]}, low=${low[u]}) → 스택: [${stack.join(', ')}]`,
    })

    for (const v of adj[u] ?? []) {
      if (!dfn[v]) {
        dfs(v)
        low[u] = Math.min(low[u], low[v])

        steps.push({
          type: 'graph',
          visited: [...visited],
          current: u,
          queue: [...stack],
          edges: allEdges,
          message: `${u}로 복귀: low[${u}] = min(low[${u}], low[${v}]) = ${low[u]}`,
        })
      } else if (onStack[v]) {
        low[u] = Math.min(low[u], dfn[v])

        steps.push({
          type: 'graph',
          visited: [...visited],
          current: u,
          queue: [...stack],
          edges: allEdges,
          message: `역방향 간선 ${u}→${v} 발견: low[${u}] = min(low[${u}], dfn[${v}]) = ${low[u]}`,
        })
      }
    }

    if (low[u] === dfn[u]) {
      const scc: string[] = []
      let v: string
      do {
        v = stack.pop()!
        onStack[v] = false
        scc.push(v)
      } while (v !== u)
      sccs.push(scc)

      steps.push({
        type: 'graph',
        visited: [...visited],
        current: u,
        queue: [...stack],
        edges: allEdges,
        message: `SCC 발견! low[${u}] == dfn[${u}] = ${dfn[u]} → SCC: {${scc.join(', ')}}`,
      })
    }
  }

  for (const node of nodes) {
    if (!dfn[node]) {
      dfs(node)
    }
  }

  steps.push({
    type: 'graph',
    visited: [...visited],
    current: null,
    queue: [],
    edges: allEdges,
    message: `Tarjan 알고리즘 완료! 총 ${sccs.length}개의 SCC: ${sccs.map(s => `{${s.join(', ')}}`).join(', ')}`,
  })

  return steps
}

export const sccViz: VisualizationConfig = {
  name: '강한 연결 요소 (SCC)',
  description: 'Tarjan 알고리즘으로 방향 그래프의 SCC를 찾는 과정을 시각화합니다.',
  defaultInput: defaultGraph,
  generateSteps,
}
