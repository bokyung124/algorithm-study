import type { VisualizationConfig, VisualizationStep } from '../../types/visualization'

function generateSteps(_input: number[] | { adjacency: Record<string, string[]> }): VisualizationStep[] {
  const operations = ['enqueue 5', 'enqueue 3', 'enqueue 8', 'dequeue', 'enqueue 1', 'enqueue 7', 'dequeue', 'dequeue', 'enqueue 4']
  const queue: string[] = []
  const steps: VisualizationStep[] = []

  steps.push({ type: 'stack', items: [], message: '빈 큐에서 시작합니다. (FIFO: 선입선출)' })

  for (const op of operations) {
    if (op.startsWith('enqueue')) {
      const val = op.split(' ')[1]
      queue.push(val)
      steps.push({ type: 'stack', items: [...queue], action: 'push', highlight: queue.length - 1, message: `enqueue(${val}): ${val}을(를) 뒤에 추가. 큐: [${queue.join(' → ')}]` })
    } else {
      const val = queue.shift()
      steps.push({ type: 'stack', items: [...queue], action: 'pop', highlight: 0, message: `dequeue(): ${val}을(를) 앞에서 제거. 큐: [${queue.join(' → ')}]` })
    }
  }

  steps.push({ type: 'stack', items: [...queue], message: `최종 큐: [${queue.join(' → ')}] (크기: ${queue.length})` })
  return steps
}

export const queueBasicViz: VisualizationConfig = {
  name: '큐 기본 연산',
  description: 'enqueue/dequeue로 큐의 FIFO 동작을 보여줍니다.',
  defaultInput: [5, 3, 8, 1, 7, 4],
  generateSteps,
}
