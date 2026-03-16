import type { VisualizationConfig, VisualizationStep } from '../../types/visualization'

function generateSteps(input: number[] | { adjacency: Record<string, string[]> }): VisualizationStep[] {
  const arr = [...(input as number[])]
  const steps: VisualizationStep[] = []

  steps.push({ type: 'array', array: [...arr], message: '머지 정렬을 시작합니다.' })

  function mergeSort(a: number[], start: number): number[] {
    if (a.length <= 1) return a

    const mid = Math.floor(a.length / 2)
    const left = mergeSort(a.slice(0, mid), start)
    const right = mergeSort(a.slice(mid), start + mid)

    const merged: number[] = []
    let i = 0, j = 0
    while (i < left.length && j < right.length) {
      const li = start + i
      const ri = start + mid + j
      steps.push({ type: 'array', array: [...arr], comparing: [li, ri], message: `${left[i]}와 ${right[j]}을 비교합니다.` })
      if (left[i] <= right[j]) {
        merged.push(left[i++])
      } else {
        merged.push(right[j++])
      }
    }
    while (i < left.length) merged.push(left[i++])
    while (j < right.length) merged.push(right[j++])

    for (let k = 0; k < merged.length; k++) {
      arr[start + k] = merged[k]
    }
    const indices = Array.from({ length: merged.length }, (_, k) => start + k)
    steps.push({ type: 'array', array: [...arr], swapped: indices, message: `[${merged.join(', ')}] 병합 완료` })

    return merged
  }

  mergeSort(arr, 0)
  steps.push({ type: 'array', array: [...arr], sorted: Array.from({ length: arr.length }, (_, k) => k), message: '정렬이 완료되었습니다!' })

  return steps
}

export const mergeSortViz: VisualizationConfig = {
  name: '머지 정렬',
  description: '배열을 반으로 나누어 정렬 후 병합합니다.',
  defaultInput: [5, 3, 8, 1, 4, 2],
  generateSteps,
}
