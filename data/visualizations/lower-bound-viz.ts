import type { VisualizationConfig, VisualizationStep } from '../../types/visualization'

function generateSteps(input: number[] | { adjacency: Record<string, string[]> }): VisualizationStep[] {
  const arr = (input as number[]).slice().sort((a, b) => a - b)
  const target = arr[Math.floor(arr.length / 3)]
  const steps: VisualizationStep[] = []

  steps.push({ type: 'array', array: arr, message: `Lower Bound: ${target} 이상인 첫 번째 위치를 찾습니다.` })

  let lo = 0, hi = arr.length
  while (lo < hi) {
    const mid = Math.floor((lo + hi) / 2)
    steps.push({ type: 'array', array: arr, comparing: [mid], pointers: [{ index: lo, label: 'lo', color: '#6366f1' }, { index: mid, label: 'mid', color: '#f59e0b' }, { index: Math.min(hi, arr.length - 1), label: 'hi', color: '#ef4444' }], message: `mid=${mid}, arr[${mid}]=${arr[mid]} ${arr[mid] >= target ? '≥' : '<'} ${target}` })

    if (arr[mid] >= target) hi = mid
    else lo = mid + 1
  }

  steps.push({ type: 'array', array: arr, sorted: [lo], pointers: [{ index: lo, label: '✓', color: '#10b981' }], message: `Lower Bound = ${lo} (arr[${lo}]=${arr[lo]})` })
  return steps
}

export const lowerBoundViz: VisualizationConfig = {
  name: 'Lower Bound',
  description: 'target 이상인 첫 번째 위치를 이분 탐색으로 찾습니다.',
  defaultInput: [1, 2, 3, 3, 3, 5, 7, 9],
  generateSteps,
}
