import type { VisualizationConfig, VisualizationStep } from '../../types/visualization'

function generateSteps(input: number[] | { adjacency: Record<string, string[]> }): VisualizationStep[] {
  const arr = [...(input as number[])]
  const steps: VisualizationStep[] = []
  const strs = arr.map(String)

  steps.push({
    type: 'array',
    array: [...arr],
    message: `가장 큰 수 만들기: [${strs.join(', ')}]을 이어붙여 가장 큰 수를 만듭니다.`,
  })

  // Bubble sort with custom comparator for visualization
  const n = strs.length
  const currentArr = [...strs]

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - 1 - i; j++) {
      const ab = currentArr[j] + currentArr[j + 1]
      const ba = currentArr[j + 1] + currentArr[j]

      steps.push({
        type: 'array',
        array: currentArr.map(Number),
        comparing: [j, j + 1],
        message: `"${currentArr[j]}${currentArr[j + 1]}" vs "${currentArr[j + 1]}${currentArr[j]}" → ${ab >= ba ? ab + ' ≥ ' + ba + ' (유지)' : ba + ' > ' + ab + ' (교환)'}`,
      })

      if (ab < ba) {
        ;[currentArr[j], currentArr[j + 1]] = [currentArr[j + 1], currentArr[j]]
        steps.push({
          type: 'array',
          array: currentArr.map(Number),
          swapped: [j, j + 1],
          message: `${currentArr[j]}와 ${currentArr[j + 1]}을 교환합니다.`,
        })
      }
    }
  }

  steps.push({
    type: 'array',
    array: currentArr.map(Number),
    sorted: Array.from({ length: n }, (_, k) => k),
    message: `결과: "${currentArr.join('')}"`,
  })

  return steps
}

export const customSortViz: VisualizationConfig = {
  name: '커스텀 정렬 - 가장 큰 수',
  description: '두 수를 이어붙여 비교하는 커스텀 비교 기준으로 정렬합니다.',
  defaultInput: [3, 30, 34, 5, 9],
  generateSteps,
}
