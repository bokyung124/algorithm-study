import type { VisualizationConfig, VisualizationStep } from '../../types/visualization'

function generateSteps(input: number[] | { adjacency: Record<string, string[]> }): VisualizationStep[] {
  const values = input as number[]
  const steps: VisualizationStep[] = []

  interface BSTNode { id: string; value: string; left?: string; right?: string }
  const nodes: BSTNode[] = []
  let nextId = 1

  function insert(rootId: string | undefined, val: number): string {
    if (!rootId) {
      const id = String(nextId++)
      nodes.push({ id, value: String(val) })
      return id
    }
    const node = nodes.find(n => n.id === rootId)!
    if (val < Number(node.value)) {
      node.left = insert(node.left, val)
    } else {
      node.right = insert(node.right, val)
    }
    return rootId
  }

  steps.push({ type: 'tree', nodes: [], visited: [], current: null, message: `BST에 [${values.join(', ')}]를 순서대로 삽입합니다.` })

  let root: string | undefined
  for (const val of values) {
    root = insert(root, val)
    steps.push({ type: 'tree', nodes: nodes.map(n => ({ ...n })), visited: nodes.map(n => n.id), current: nodes[nodes.length - 1].id, message: `${val} 삽입 완료. 노드 수: ${nodes.length}` })
  }

  // Search
  const target = values[Math.floor(values.length / 2)]
  const searchPath: string[] = []
  let curr = root
  while (curr) {
    const node = nodes.find(n => n.id === curr)!
    searchPath.push(curr)
    steps.push({ type: 'tree', nodes: nodes.map(n => ({ ...n })), visited: searchPath.slice(0, -1), current: curr, message: `탐색: ${target} ${Number(node.value) === target ? '= ' : Number(node.value) > target ? '< ' : '> '}${node.value}${Number(node.value) === target ? ' → 찾음!' : Number(node.value) > target ? ' → 왼쪽' : ' → 오른쪽'}` })
    if (Number(node.value) === target) break
    curr = Number(node.value) > target ? node.left : node.right
  }

  return steps
}

export const bstViz: VisualizationConfig = {
  name: '이진 탐색 트리',
  description: 'BST에 값을 삽입하고 탐색하는 과정입니다.',
  defaultInput: [5, 3, 7, 1, 4, 6, 8],
  generateSteps,
}
