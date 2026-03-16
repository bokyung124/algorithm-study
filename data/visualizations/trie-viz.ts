import type { VisualizationConfig, VisualizationStep } from '../../types/visualization'

function generateSteps(_input: number[] | { adjacency: Record<string, string[]> }): VisualizationStep[] {
  const words = ['app', 'apple', 'api', 'bat', 'ball']
  const steps: VisualizationStep[] = []

  interface TrieNode { id: string; value: string; children: Map<string, string> }
  const nodes: TrieNode[] = [{ id: 'root', value: 'root', children: new Map() }]
  let nextId = 1

  function toTreeNodes() {
    return nodes.map(n => {
      const children = [...n.children.values()]
      return { id: n.id, value: n.value, left: children[0], right: children[1] }
    })
  }

  steps.push({ type: 'tree', nodes: toTreeNodes(), visited: [], current: null, message: `트라이에 [${words.join(', ')}]를 삽입합니다.` })

  for (const word of words) {
    let curr = nodes[0]
    const visited: string[] = ['root']

    for (let i = 0; i < word.length; i++) {
      const ch = word[i]
      if (!curr.children.has(ch)) {
        const id = `n${nextId++}`
        nodes.push({ id, value: ch, children: new Map() })
        curr.children.set(ch, id)
      }
      const childId = curr.children.get(ch)!
      curr = nodes.find(n => n.id === childId)!
      visited.push(curr.id)
    }

    steps.push({ type: 'tree', nodes: toTreeNodes(), visited, current: curr.id, message: `"${word}" 삽입 완료. 노드 수: ${nodes.length}` })
  }

  steps.push({ type: 'tree', nodes: toTreeNodes(), visited: nodes.map(n => n.id), current: null, message: `트라이 구축 완료! ${words.length}개 단어, ${nodes.length}개 노드` })
  return steps
}

export const trieViz: VisualizationConfig = {
  name: '트라이',
  description: '문자열을 트라이에 삽입하는 과정입니다.',
  defaultInput: [1],
  generateSteps,
}
