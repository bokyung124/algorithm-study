import type { VisualizationConfig, VisualizationStep } from '../../types/visualization'

function generateSteps(input: number[] | { adjacency: Record<string, string[]> }): VisualizationStep[] {
  const arr = input as number[]
  const target = arr[Math.floor(arr.length * 0.7)]
  const steps: VisualizationStep[] = []

  steps.push({ type: 'array', array: arr, message: `배열에서 ${target}을(를) 순차 탐색합니다.` })

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) {
      steps.push({ type: 'array', array: arr, sorted: [i], pointers: [{ index: i, label: '✓', color: '#10b981' }], message: `arr[${i}]=${arr[i]} = ${target}. 찾았습니다!` })
      break
    }
    steps.push({ type: 'array', array: arr, comparing: [i], pointers: [{ index: i, label: 'i', color: '#6366f1' }], message: `arr[${i}]=${arr[i]} ≠ ${target}. 다음으로 이동.` })
  }

  return steps
}

export const linearSearchViz: VisualizationConfig = {
  name: '순차 탐색',
  description: '배열을 처음부터 끝까지 순서대로 탐색합니다.',
  defaultInput: [5, 3, 8, 1, 9, 2, 7, 4, 6],
  generateSteps,
}
