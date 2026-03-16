import type { VisualizationConfig, VisualizationStep } from '../../types/visualization'

const defaultNodes = [
  { id: '1', value: '1', left: '2', right: '3' },
  { id: '2', value: '2', left: '4', right: '5' },
  { id: '3', value: '3', left: '6', right: '7' },
  { id: '4', value: '4' },
  { id: '5', value: '5' },
  { id: '6', value: '6' },
  { id: '7', value: '7' },
]

function generateSteps(_input: number[] | { adjacency: Record<string, string[]> }): VisualizationStep[] {
  const nodes = defaultNodes
  const steps: VisualizationStep[] = []
  const visited: string[] = []

  steps.push({
    type: 'tree',
    nodes,
    visited: [],
    current: null,
    message: '이진 트리의 중위 순회(In-order)를 수행합니다: 왼쪽 → 루트 → 오른쪽',
  })

  const nodeMap = new Map(nodes.map((n) => [n.id, n]))

  function inorder(id: string | undefined) {
    if (!id) return
    const node = nodeMap.get(id)
    if (!node) return

    steps.push({
      type: 'tree',
      nodes,
      visited: [...visited],
      current: id,
      message: `노드 ${node.value}에 도달. ${node.left ? '왼쪽 자식으로 이동합니다.' : '왼쪽 자식이 없습니다.'}`,
    })

    inorder(node.left)

    visited.push(id)
    steps.push({
      type: 'tree',
      nodes,
      visited: [...visited],
      current: id,
      message: `노드 ${node.value}을(를) 방문합니다. 방문 순서: [${visited.map((v) => nodeMap.get(v)?.value).join(', ')}]`,
    })

    inorder(node.right)
  }

  inorder('1')

  steps.push({
    type: 'tree',
    nodes,
    visited: [...visited],
    current: null,
    message: `중위 순회 완료! 순서: ${visited.map((v) => nodeMap.get(v)?.value).join(' → ')}`,
  })

  return steps
}

export const treeTraversalViz: VisualizationConfig = {
  name: '이진 트리 순회',
  description: '이진 트리를 중위 순회(In-order)로 탐색합니다.',
  defaultInput: [1, 2, 3, 4, 5, 6, 7],
  generateSteps,
}
