import type { VisualizationConfig, VisualizationStep } from '../../types/visualization'

function generateSteps(_input: number[] | { adjacency: Record<string, string[]> }): VisualizationStep[] {
  const nodes = [
    { id: '1', value: '3', left: '2', right: '3' },
    { id: '2', value: '4', left: '4', right: '5' },
    { id: '3', value: '5', left: '6', right: undefined },
    { id: '4', value: '1' },
    { id: '5', value: '2' },
    { id: '6', value: '6' },
  ]
  const steps: VisualizationStep[] = []
  const visited: string[] = []
  const dp: Record<string, number> = {}
  const nodeMap = new Map(nodes.map(n => [n.id, n]))

  steps.push({ type: 'tree', nodes, visited: [], current: null, message: '트리 DP: 각 서브트리의 합을 리프부터 루트까지 계산합니다.' })

  function solve(id: string | undefined): number {
    if (!id) return 0
    const node = nodeMap.get(id)!

    steps.push({ type: 'tree', nodes, visited: [...visited], current: id, message: `노드 ${id} (값: ${node.value}) 방문` })

    const leftSum = solve(node.left)
    const rightSum = solve(node.right)
    const total = Number(node.value) + leftSum + rightSum
    dp[id] = total
    visited.push(id)

    steps.push({ type: 'tree', nodes: nodes.map(n => ({ ...n, value: dp[n.id] !== undefined ? `${n.value}(${dp[n.id]})` : n.value })), visited: [...visited], current: id, message: `dp[${id}] = ${node.value} + ${leftSum} + ${rightSum} = ${total}` })

    return total
  }

  solve('1')

  steps.push({ type: 'tree', nodes: nodes.map(n => ({ ...n, value: `${n.value}(${dp[n.id]})` })), visited: [...visited], current: null, message: `완료! 전체 트리의 합: ${dp['1']}` })
  return steps
}

export const treeDpViz: VisualizationConfig = {
  name: '트리 DP',
  description: '리프에서 루트로 DP 값을 계산합니다.',
  defaultInput: [3, 4, 5, 1, 2, 6],
  generateSteps,
}
