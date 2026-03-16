import type { VisualizationConfig, VisualizationStep } from '../../types/visualization'

function generateSteps(input: number[] | { adjacency: Record<string, string[]> }): VisualizationStep[] {
  const arr = (input as number[]).slice().sort((a, b) => a - b)
  const steps: VisualizationStep[] = []
  const target = arr[Math.floor(arr.length / 2)]

  steps.push({ type: 'array', array: arr, message: `파라메트릭 서치: 조건 f(x) ≥ ${target}을 만족하는 최소 x를 찾습니다.` })

  let lo = 0, hi = arr.length - 1, answer = -1

  while (lo <= hi) {
    const mid = Math.floor((lo + hi) / 2)
    const satisfies = arr[mid] >= target

    steps.push({ type: 'array', array: arr, comparing: [mid], pointers: [{ index: lo, label: 'lo', color: '#6366f1' }, { index: mid, label: 'mid', color: '#f59e0b' }, { index: hi, label: 'hi', color: '#ef4444' }], message: `mid=${mid}, arr[${mid}]=${arr[mid]} ${satisfies ? '≥' : '<'} ${target} → ${satisfies ? '조건 만족! 왼쪽 탐색' : '조건 불만족. 오른쪽 탐색'}` })

    if (satisfies) {
      answer = mid
      hi = mid - 1
    } else {
      lo = mid + 1
    }
  }

  if (answer >= 0) {
    steps.push({ type: 'array', array: arr, sorted: [answer], pointers: [{ index: answer, label: '✓', color: '#10b981' }], message: `최소 x = ${answer}, arr[${answer}]=${arr[answer]}` })
  }

  return steps
}

export const parametricSearchViz: VisualizationConfig = {
  name: '파라메트릭 서치',
  description: '결정 함수를 이분 탐색으로 최적값을 찾습니다.',
  defaultInput: [1, 3, 5, 7, 9, 11, 13, 15],
  generateSteps,
}
