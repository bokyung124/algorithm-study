import type { VisualizationConfig, VisualizationStep } from '../../types/visualization'

function generateSteps(input: number[] | { adjacency: Record<string, string[]> }): VisualizationStep[] {
  const arr = input as number[]
  const target = arr.reduce((a, b) => a + b) / 2
  const steps: VisualizationStep[] = []
  const mid = Math.floor(arr.length / 2)

  steps.push({ type: 'array', array: arr, message: `Meet in the Middle: 배열을 반으로 나눠 부분합이 ${Math.round(target)}에 가장 가까운 조합을 찾습니다.` })

  // Left half sums
  const leftSums: number[] = []
  for (let mask = 0; mask < (1 << mid); mask++) {
    let sum = 0
    for (let i = 0; i < mid; i++) {
      if (mask & (1 << i)) sum += arr[i]
    }
    leftSums.push(sum)
  }

  steps.push({ type: 'array', array: arr, comparing: Array.from({ length: mid }, (_, i) => i), pointers: [{ index: 0, label: '왼쪽', color: '#6366f1' }, { index: mid - 1, label: '', color: '#6366f1' }], message: `왼쪽 절반 [${arr.slice(0, mid).join(',')}]: ${leftSums.length}개 부분합 생성` })

  // Right half sums
  const rightSums: number[] = []
  for (let mask = 0; mask < (1 << (arr.length - mid)); mask++) {
    let sum = 0
    for (let i = 0; i < arr.length - mid; i++) {
      if (mask & (1 << i)) sum += arr[mid + i]
    }
    rightSums.push(sum)
  }
  rightSums.sort((a, b) => a - b)

  steps.push({ type: 'array', array: arr, comparing: Array.from({ length: arr.length - mid }, (_, i) => mid + i), pointers: [{ index: mid, label: '오른쪽', color: '#ef4444' }, { index: arr.length - 1, label: '', color: '#ef4444' }], message: `오른쪽 절반 [${arr.slice(mid).join(',')}]: ${rightSums.length}개 부분합 (정렬)` })

  // Combine
  let best = Infinity, bestL = 0, bestR = 0
  for (const ls of leftSums) {
    const need = Math.round(target) - ls
    // Binary search in rightSums
    let lo = 0, hi = rightSums.length - 1
    while (lo <= hi) {
      const m = Math.floor((lo + hi) / 2)
      const diff = Math.abs(ls + rightSums[m] - target)
      if (diff < best) { best = diff; bestL = ls; bestR = rightSums[m] }
      if (rightSums[m] < need) lo = m + 1
      else hi = m - 1
    }
  }

  steps.push({ type: 'array', array: arr, sorted: arr.map((_, i) => i), message: `최적 조합: 왼쪽 합=${bestL}, 오른쪽 합=${bestR}, 총합=${bestL + bestR} (목표: ${Math.round(target)})` })
  return steps
}

export const meetInTheMiddleViz: VisualizationConfig = {
  name: 'Meet in the Middle',
  description: '배열을 반으로 나눠 각각의 부분합을 결합합니다.',
  defaultInput: [3, 7, 2, 5, 8, 1],
  generateSteps,
}
