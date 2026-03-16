import type { VisualizationConfig, VisualizationStep } from '../../types/visualization'

function generateSteps(input: number[] | { adjacency: Record<string, string[]> }): VisualizationStep[] {
  const arr = input as number[]
  const steps: VisualizationStep[] = []
  const stack: number[] = []
  const result = new Array(arr.length).fill(-1)

  steps.push({ type: 'array', array: arr, message: '단조 스택: 각 원소의 오른쪽에서 처음으로 큰 값(NGE)을 찾습니다.' })

  for (let i = 0; i < arr.length; i++) {
    while (stack.length > 0 && arr[stack[stack.length - 1]] < arr[i]) {
      const idx = stack.pop()!
      result[idx] = arr[i]
    }
    stack.push(i)

    steps.push({ type: 'array', array: arr, comparing: [i], sorted: result.map((v, j) => v !== -1 ? j : -1).filter(j => j >= 0), pointers: [{ index: i, label: `${arr[i]}`, color: '#6366f1' }, ...stack.map(s => ({ index: s, label: 'S', color: '#f59e0b' }))], message: `i=${i}, arr[${i}]=${arr[i]}. 스택: [${stack.map(s => arr[s]).join(', ')}]. NGE: [${result.join(', ')}]` })
  }

  steps.push({ type: 'array', array: arr, sorted: result.map((v, i) => v !== -1 ? i : -1).filter(i => i >= 0), message: `완료! NGE: [${result.join(', ')}]` })
  return steps
}

export const monotoneStackViz: VisualizationConfig = {
  name: '단조 스택',
  description: '단조 감소 스택으로 Next Greater Element를 구합니다.',
  defaultInput: [2, 1, 4, 3, 5, 1, 6],
  generateSteps,
}
