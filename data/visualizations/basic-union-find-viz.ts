import type { VisualizationConfig, VisualizationStep } from '../../types/visualization'

function generateSteps(_input: number[] | { adjacency: Record<string, string[]> }): VisualizationStep[] {
  const n = 6
  const parent = Array.from({ length: n }, (_, i) => i)
  const steps: VisualizationStep[] = []
  const nodes = Array.from({ length: n }, (_, i) => String(i))

  function find(x: number): number {
    if (parent[x] !== x) parent[x] = find(parent[x])
    return parent[x]
  }

  function getEdges(): [string, string][] {
    const edges: [string, string][] = []
    for (let i = 0; i < n; i++) {
      if (parent[i] !== i) edges.push([String(parent[i]), String(i)])
    }
    return edges
  }

  steps.push({ type: 'graph', visited: [], current: null, queue: nodes, edges: getEdges(), message: `Union-Find: ${n}개 노드, 각자 자기 자신이 부모 (독립)` })

  const unions: [number, number][] = [[0, 1], [2, 3], [0, 2], [4, 5], [3, 5]]

  for (const [a, b] of unions) {
    const rootA = find(a), rootB = find(b)
    if (rootA !== rootB) {
      parent[rootB] = rootA
      steps.push({ type: 'graph', visited: nodes.filter((_, i) => find(i) === find(0)), current: String(a), queue: nodes, edges: getEdges(), message: `union(${a}, ${b}): root(${a})=${rootA}, root(${b})=${rootB} → ${rootB}의 부모를 ${rootA}로` })
    } else {
      steps.push({ type: 'graph', visited: nodes.filter((_, i) => find(i) === find(a)), current: String(a), queue: nodes, edges: getEdges(), message: `union(${a}, ${b}): 이미 같은 집합! (root=${rootA})` })
    }
  }

  // Show final groups
  const groups = new Map<number, number[]>()
  for (let i = 0; i < n; i++) {
    const r = find(i)
    if (!groups.has(r)) groups.set(r, [])
    groups.get(r)!.push(i)
  }

  steps.push({ type: 'graph', visited: nodes, current: null, queue: [], edges: getEdges(), message: `완료! ${groups.size}개 그룹: ${[...groups.values()].map(g => `{${g.join(',')}}`).join(', ')}` })
  return steps
}

export const basicUnionFindViz: VisualizationConfig = {
  name: 'Union-Find',
  description: 'Union과 Find 연산으로 집합을 합칩니다.',
  defaultInput: [6],
  generateSteps,
}
