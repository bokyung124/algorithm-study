import type { VisualizationConfig, VisualizationStep } from '../../types/visualization'

function generateSteps(_input: number[] | { adjacency: Record<string, string[]> }): VisualizationStep[] {
  const n = 7
  const parent = Array.from({ length: n }, (_, i) => i)
  const rank = new Array(n).fill(0)
  const steps: VisualizationStep[] = []
  const nodes = Array.from({ length: n }, (_, i) => String(i))

  function find(x: number): number {
    if (parent[x] !== x) parent[x] = find(parent[x])
    return parent[x]
  }

  function union(a: number, b: number): boolean {
    const ra = find(a), rb = find(b)
    if (ra === rb) return false
    if (rank[ra] < rank[rb]) parent[ra] = rb
    else if (rank[ra] > rank[rb]) parent[rb] = ra
    else { parent[rb] = ra; rank[ra]++ }
    return true
  }

  function getEdges(): [string, string][] {
    const edges: [string, string][] = []
    for (let i = 0; i < n; i++) {
      if (parent[i] !== i) edges.push([String(parent[i]), String(i)])
    }
    return edges
  }

  steps.push({ type: 'graph', visited: [], current: null, queue: nodes, edges: [], message: `가중치 Union-Find: ${n}개 노드. 랭크 기반 합치기 + 경로 압축` })

  const unions: [number, number][] = [[0, 1], [2, 3], [4, 5], [0, 2], [4, 6], [3, 5]]

  for (const [a, b] of unions) {
    const raBefore = find(a), rbBefore = find(b)
    const merged = union(a, b)

    if (merged) {
      steps.push({ type: 'graph', visited: nodes.filter((_, i) => find(i) === find(a)), current: String(a), queue: nodes, edges: getEdges(), message: `union(${a},${b}): rank[${raBefore}]=${rank[raBefore]}, rank[${rbBefore}]=${rank[rbBefore]} → 랭크가 큰 쪽이 루트` })
    } else {
      steps.push({ type: 'graph', visited: nodes.filter((_, i) => find(i) === find(a)), current: String(a), queue: nodes, edges: getEdges(), message: `union(${a},${b}): 이미 같은 집합!` })
    }
  }

  // Show path compression
  find(5)
  steps.push({ type: 'graph', visited: nodes, current: '5', queue: nodes, edges: getEdges(), message: `find(5) 후 경로 압축: 5의 부모가 직접 루트를 가리킴` })

  const groups = new Map<number, number[]>()
  for (let i = 0; i < n; i++) {
    const r = find(i)
    if (!groups.has(r)) groups.set(r, [])
    groups.get(r)!.push(i)
  }

  steps.push({ type: 'graph', visited: nodes, current: null, queue: [], edges: getEdges(), message: `완료! ${groups.size}개 그룹: ${[...groups.values()].map(g => `{${g.join(',')}}`).join(', ')}` })
  return steps
}

export const weightedUnionFindViz: VisualizationConfig = {
  name: '가중치 Union-Find',
  description: '랭크 기반 합치기와 경로 압축을 적용합니다.',
  defaultInput: [7],
  generateSteps,
}
