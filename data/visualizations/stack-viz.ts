import type { VisualizationConfig, VisualizationStep } from '../../types/visualization'

function generateSteps(_input: number[] | { adjacency: Record<string, string[]> }): VisualizationStep[] {
  const operations = ['push 3', 'push 7', 'push 1', 'pop', 'push 5', 'push 2', 'pop', 'pop', 'push 9']
  const stack: string[] = []
  const steps: VisualizationStep[] = []

  steps.push({
    type: 'stack',
    items: [],
    message: '빈 스택에서 시작합니다.',
  })

  for (const op of operations) {
    if (op.startsWith('push')) {
      const val = op.split(' ')[1]
      stack.push(val)
      steps.push({
        type: 'stack',
        items: [...stack],
        action: 'push',
        highlight: stack.length - 1,
        message: `push(${val}): ${val}을(를) 스택에 넣습니다. 스택 크기: ${stack.length}`,
      })
    } else {
      const val = stack.pop()
      steps.push({
        type: 'stack',
        items: [...stack],
        action: 'pop',
        highlight: stack.length,
        message: `pop(): ${val}을(를) 꺼냅니다. 스택 크기: ${stack.length}`,
      })
    }
  }

  steps.push({
    type: 'stack',
    items: [...stack],
    message: `최종 스택: [${stack.join(', ')}] (크기: ${stack.length})`,
  })

  return steps
}

export const stackViz: VisualizationConfig = {
  name: '스택 기본 연산',
  description: 'push/pop 연산으로 스택의 LIFO(후입선출) 동작을 보여줍니다.',
  defaultInput: [3, 7, 1, 5, 2, 9],
  generateSteps,
}
