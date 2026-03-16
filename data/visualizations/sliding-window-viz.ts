import type { VisualizationConfig, VisualizationStep } from '../../types/visualization'

function generateSteps(input: number[] | { adjacency: Record<string, string[]> }): VisualizationStep[] {
  const arr = input as number[]
  const k = 3
  const steps: VisualizationStep[] = []

  steps.push({
    type: 'array',
    array: arr,
    message: `크기 ${k}인 윈도우의 최대 합을 구합니다.`,
  })

  let windowSum = 0
  for (let i = 0; i < k; i++) {
    windowSum += arr[i]
  }

  steps.push({
    type: 'array',
    array: arr,
    windowStart: 0,
    windowEnd: k - 1,
    comparing: Array.from({ length: k }, (_, i) => i),
    message: `초기 윈도우 합: ${arr.slice(0, k).join(' + ')} = ${windowSum}`,
  })

  let maxSum = windowSum
  let maxStart = 0

  for (let i = k; i < arr.length; i++) {
    windowSum = windowSum - arr[i - k] + arr[i]
    const start = i - k + 1

    steps.push({
      type: 'array',
      array: arr,
      windowStart: start,
      windowEnd: i,
      comparing: Array.from({ length: k }, (_, j) => start + j),
      swapped: [i - k],
      message: `-${arr[i - k]} +${arr[i]}. 윈도우 합: ${windowSum}${windowSum > maxSum ? ' (새 최대!)' : ''}`,
    })

    if (windowSum > maxSum) {
      maxSum = windowSum
      maxStart = start
    }
  }

  steps.push({
    type: 'array',
    array: arr,
    sorted: Array.from({ length: k }, (_, i) => maxStart + i),
    message: `최대 합: ${maxSum} (인덱스 ${maxStart}~${maxStart + k - 1})`,
  })

  return steps
}

export const slidingWindowViz: VisualizationConfig = {
  name: '슬라이딩 윈도우',
  description: '고정 크기 윈도우를 이동하며 최적 구간을 찾습니다.',
  defaultInput: [2, 1, 5, 1, 3, 2, 8, 4, 1],
  generateSteps,
}
