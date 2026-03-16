import type { VisualizationConfig, VisualizationStep } from '../../types/visualization'

function generateSteps(_input: number[] | { adjacency: Record<string, string[]> }): VisualizationStep[] {
  const arr = [1, 3, 5, 7, 9, 11]
  const n = arr.length
  const tree = new Array(4 * n).fill(0)
  const steps: VisualizationStep[] = []

  const nodes: { id: string; value: string; left?: string; right?: string }[] = []
  let nodeId = 1

  function build(node: number, start: number, end: number): string {
    const id = String(nodeId++)
    if (start === end) {
      tree[node] = arr[start]
      nodes.push({ id, value: `${arr[start]}` })
      return id
    }
    const mid = Math.floor((start + end) / 2)
    const leftId = build(2 * node, start, mid)
    const rightId = build(2 * node + 1, mid + 1, end)
    tree[node] = tree[2 * node] + tree[2 * node + 1]
    nodes.push({ id, value: `${tree[node]}`, left: leftId, right: rightId })
    return id
  }

  steps.push({ type: 'tree', nodes: [], visited: [], current: null, message: `배열 [${arr.join(', ')}]로 구간 합 세그먼트 트리를 빌드합니다.` })

  build(1, 0, n - 1)
  const visited: string[] = []

  // Show build step by step
  for (let i = 0; i < nodes.length; i++) {
    visited.push(nodes[i].id)
    if (i % 2 === 1 || i === nodes.length - 1) {
      steps.push({ type: 'tree', nodes: nodes.map(nd => ({ ...nd })), visited: [...visited], current: nodes[i].id, message: `노드 ${nodes[i].id}: 값 = ${nodes[i].value}` })
    }
  }

  // Query example: sum of [1, 4]
  const queryL = 1, queryR = 4
  const result = arr.slice(queryL, queryR + 1).reduce((a, b) => a + b, 0)
  steps.push({ type: 'tree', nodes: nodes.map(nd => ({ ...nd })), visited: nodes.map(n => n.id), current: nodes[nodes.length - 1].id, message: `쿼리: sum(${queryL}..${queryR}) = ${result}. O(log n) 시간!` })

  return steps
}

export const basicSegmentTreeViz: VisualizationConfig = {
  name: '세그먼트 트리',
  description: '구간 합을 효율적으로 계산하는 세그먼트 트리를 빌드합니다.',
  defaultInput: [1, 3, 5, 7, 9, 11],
  generateSteps,
}
