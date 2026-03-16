import type { VisualizationConfig, VisualizationStep } from '../../types/visualization'

function generateSteps(input: number[] | { adjacency: Record<string, string[]> }): VisualizationStep[] {
  const arr = [...(input as number[])]
  const steps: VisualizationStep[] = []
  const sorted: number[] = []

  steps.push({ type: 'array', array: [...arr], sorted: [], message: '버블 정렬을 시작합니다.' })

  for (let i = 0; i < arr.length - 1; i++) {
    let swapped = false
    for (let j = 0; j < arr.length - 1 - i; j++) {
      steps.push({ type: 'array', array: [...arr], comparing: [j, j + 1], sorted: [...sorted], message: `${arr[j]}와 ${arr[j + 1]}을 비교합니다.` })
      if (arr[j] > arr[j + 1]) {
        ;[arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
        steps.push({ type: 'array', array: [...arr], swapped: [j, j + 1], sorted: [...sorted], message: `${arr[j + 1]}과 ${arr[j]}을 교환합니다.` })
        swapped = true
      }
    }
    sorted.unshift(arr.length - 1 - i)
    steps.push({ type: 'array', array: [...arr], sorted: [...sorted], message: `${i + 1}번째 패스 완료. ${arr[arr.length - 1 - i]}이 확정되었습니다.` })
    if (!swapped) {
      steps.push({ type: 'array', array: [...arr], sorted: Array.from({ length: arr.length }, (_, k) => k), message: '교환이 없으므로 조기 종료합니다.' })
      break
    }
  }

  if (sorted.length < arr.length) {
    steps.push({ type: 'array', array: [...arr], sorted: Array.from({ length: arr.length }, (_, k) => k), message: '정렬이 완료되었습니다!' })
  }

  return steps
}

export const bubbleSortViz: VisualizationConfig = {
  name: '버블 정렬',
  description: '인접한 두 원소를 비교·교환하며 정렬합니다.',
  defaultInput: [5, 3, 8, 1, 4, 2],
  generateSteps,
}
