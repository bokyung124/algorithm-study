import type { VisualizationConfig, VisualizationStep } from '../../types/visualization'

function generateSteps(_input: number[] | { adjacency: Record<string, string[]> }): VisualizationStep[] {
  const items = [1, 2, 3]
  const steps: VisualizationStep[] = []
  const nodes: { id: string; value: string; left?: string; right?: string }[] = []
  let nid = 1

  steps.push({ type: 'tree', nodes: [], visited: [], current: null, message: `{${items.join(', ')}}의 순열을 백트래킹으로 생성합니다.` })

  const rootId = String(nid++)
  nodes.push({ id: rootId, value: '시작' })
  const visited: string[] = [rootId]

  function permute(curr: number[], remaining: number[], parentId: string) {
    if (remaining.length === 0) {
      const id = String(nid++)
      nodes.push({ id, value: `[${curr.join(',')}]` })
      // Connect to parent
      const parent = nodes.find(n => n.id === parentId)!
      if (!parent.left) parent.left = id
      else parent.right = id
      visited.push(id)

      steps.push({ type: 'tree', nodes: nodes.map(n => ({ ...n })), visited: [...visited], current: id, message: `순열 발견: [${curr.join(', ')}]` })
      return
    }

    for (let i = 0; i < remaining.length; i++) {
      const id = String(nid++)
      nodes.push({ id, value: String(remaining[i]) })
      const parent = nodes.find(n => n.id === parentId)!
      if (!parent.left) parent.left = id
      else parent.right = id
      visited.push(id)

      permute([...curr, remaining[i]], [...remaining.slice(0, i), ...remaining.slice(i + 1)], id)
    }
  }

  permute([], items, rootId)

  steps.push({ type: 'tree', nodes: nodes.map(n => ({ ...n })), visited: [...visited], current: null, message: `총 ${items.length}! = ${[1, 2, 3, 4, 5, 6].slice(0, items.length).reduce((a, b) => a * b)}개 순열 생성 완료!` })
  return steps
}

export const permutationCombinationViz: VisualizationConfig = {
  name: '순열/조합',
  description: '백트래킹으로 순열을 생성합니다.',
  defaultInput: [1, 2, 3],
  generateSteps,
}
