import type { VisualizationConfig, VisualizationStep } from '../../types/visualization'

function generateSteps(_input: number[] | { adjacency: Record<string, string[]> }): VisualizationStep[] {
  // Problem: split array [7,2,5,10,8] into 3 groups, minimize max sum
  const arr = [7, 2, 5, 10, 8]
  const m = 3
  const steps: VisualizationStep[] = []

  steps.push({ type: 'array', array: arr, message: `답 이분 탐색: [${arr.join(',')}]를 ${m}그룹으로 나눌 때 그룹 합의 최대를 최소화` })

  const canSplit = (maxSum: number): boolean => {
    let groups = 1, sum = 0
    for (const v of arr) {
      if (sum + v > maxSum) { groups++; sum = v }
      else sum += v
    }
    return groups <= m
  }

  let lo = Math.max(...arr), hi = arr.reduce((a, b) => a + b)
  steps.push({ type: 'array', array: arr, pointers: [{ index: 0, label: `lo=${lo}`, color: '#6366f1' }, { index: arr.length - 1, label: `hi=${hi}`, color: '#ef4444' }], message: `탐색 범위: [${lo}, ${hi}]` })

  while (lo < hi) {
    const mid = Math.floor((lo + hi) / 2)
    const possible = canSplit(mid)

    steps.push({ type: 'array', array: arr, comparing: possible ? [0, 1] : [3, 4], message: `mid=${mid}: ${m}그룹 이하 분할 ${possible ? '가능 ✓ → hi=mid' : '불가능 ✗ → lo=mid+1'}` })

    if (possible) hi = mid
    else lo = mid + 1
  }

  steps.push({ type: 'array', array: arr, sorted: arr.map((_, i) => i), message: `최적 답: ${lo} (그룹 합의 최대를 ${lo} 이하로 만들 수 있음)` })
  return steps
}

export const answerBinarySearchViz: VisualizationConfig = {
  name: '답 이분 탐색',
  description: '답의 범위를 이분 탐색하여 최적값을 구합니다.',
  defaultInput: [7, 2, 5, 10, 8],
  generateSteps,
}
