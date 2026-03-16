import type { VisualizationConfig, VisualizationStep } from '../../types/visualization'

function generateSteps(input: number[] | { adjacency: Record<string, string[]> }): VisualizationStep[] {
  const arr = (input as number[]).slice().sort((a, b) => a - b)
  const target = arr[Math.floor(arr.length * 0.7)]
  const steps: VisualizationStep[] = []

  steps.push({
    type: 'array',
    array: arr,
    pointers: [
      { index: 0, label: 'L', color: '#6366f1' },
      { index: arr.length - 1, label: 'R', color: '#ef4444' },
    ],
    message: `정렬된 배열에서 ${target}을(를) 찾습니다. L=0, R=${arr.length - 1}`,
  })

  let low = 0
  let high = arr.length - 1

  while (low <= high) {
    const mid = Math.floor((low + high) / 2)

    steps.push({
      type: 'array',
      array: arr,
      comparing: [mid],
      pointers: [
        { index: low, label: 'L', color: '#6366f1' },
        { index: mid, label: 'M', color: '#f59e0b' },
        { index: high, label: 'R', color: '#ef4444' },
      ],
      message: `mid=${mid}, arr[${mid}]=${arr[mid]}. 타겟 ${target}과 비교합니다.`,
    })

    if (arr[mid] === target) {
      steps.push({
        type: 'array',
        array: arr,
        sorted: [mid],
        pointers: [{ index: mid, label: '✓', color: '#10b981' }],
        message: `arr[${mid}]=${arr[mid]} = ${target}. 찾았습니다!`,
      })
      break
    } else if (arr[mid] < target) {
      low = mid + 1
      steps.push({
        type: 'array',
        array: arr,
        pointers: [
          { index: low, label: 'L', color: '#6366f1' },
          { index: high, label: 'R', color: '#ef4444' },
        ],
        message: `arr[${mid}]=${arr[mid]} < ${target}. 오른쪽 절반을 탐색합니다. L=${low}`,
      })
    } else {
      high = mid - 1
      steps.push({
        type: 'array',
        array: arr,
        pointers: [
          { index: low, label: 'L', color: '#6366f1' },
          { index: high, label: 'R', color: '#ef4444' },
        ],
        message: `arr[${mid}]=${arr[mid]} > ${target}. 왼쪽 절반을 탐색합니다. R=${high}`,
      })
    }
  }

  return steps
}

export const binarySearchViz: VisualizationConfig = {
  name: '이분 탐색',
  description: '정렬된 배열에서 탐색 범위를 반씩 줄여가며 값을 찾습니다.',
  defaultInput: [2, 5, 8, 12, 16, 23, 38, 45, 56, 72],
  generateSteps,
}
