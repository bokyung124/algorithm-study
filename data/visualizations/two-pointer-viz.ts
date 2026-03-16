import type { VisualizationConfig, VisualizationStep } from '../../types/visualization'

function generateSteps(input: number[] | { adjacency: Record<string, string[]> }): VisualizationStep[] {
  const arr = (input as number[]).slice().sort((a, b) => a - b)
  const target = arr[1] + arr[arr.length - 2]
  const steps: VisualizationStep[] = []

  steps.push({
    type: 'array',
    array: arr,
    message: `정렬된 배열에서 합이 ${target}인 두 수를 찾습니다.`,
  })

  let left = 0
  let right = arr.length - 1

  while (left < right) {
    const sum = arr[left] + arr[right]

    steps.push({
      type: 'array',
      array: arr,
      comparing: [left, right],
      pointers: [
        { index: left, label: 'L', color: '#6366f1' },
        { index: right, label: 'R', color: '#ef4444' },
      ],
      message: `arr[${left}] + arr[${right}] = ${arr[left]} + ${arr[right]} = ${sum}. 타겟: ${target}`,
    })

    if (sum === target) {
      steps.push({
        type: 'array',
        array: arr,
        sorted: [left, right],
        pointers: [
          { index: left, label: '✓', color: '#10b981' },
          { index: right, label: '✓', color: '#10b981' },
        ],
        message: `합이 ${target}인 쌍을 찾았습니다: (${arr[left]}, ${arr[right]})`,
      })
      break
    } else if (sum < target) {
      left++
      steps.push({
        type: 'array',
        array: arr,
        pointers: [
          { index: left, label: 'L', color: '#6366f1' },
          { index: right, label: 'R', color: '#ef4444' },
        ],
        message: `합 ${sum} < ${target}. L을 오른쪽으로 이동합니다.`,
      })
    } else {
      right--
      steps.push({
        type: 'array',
        array: arr,
        pointers: [
          { index: left, label: 'L', color: '#6366f1' },
          { index: right, label: 'R', color: '#ef4444' },
        ],
        message: `합 ${sum} > ${target}. R을 왼쪽으로 이동합니다.`,
      })
    }
  }

  return steps
}

export const twoPointerViz: VisualizationConfig = {
  name: '투 포인터',
  description: '양쪽 끝에서 포인터를 이동하며 조건을 만족하는 쌍을 찾습니다.',
  defaultInput: [1, 3, 5, 7, 9, 11, 15, 20],
  generateSteps,
}
