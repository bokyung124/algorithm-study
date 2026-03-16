import type { VisualizationConfig, VisualizationStep } from '../../types/visualization'

function generateSteps(input: number[] | { adjacency: Record<string, string[]> }): VisualizationStep[] {
  const arr = [...(input as number[])]
  const steps: VisualizationStep[] = []
  const sortedIndices: number[] = []

  steps.push({ type: 'array', array: [...arr], message: '퀵 정렬을 시작합니다.' })

  function quickSort(lo: number, hi: number) {
    if (lo >= hi) {
      if (lo === hi) sortedIndices.push(lo)
      return
    }

    const pivot = arr[hi]
    steps.push({ type: 'array', array: [...arr], comparing: [hi], sorted: [...sortedIndices], message: `피벗 ${pivot}을 선택합니다 (인덱스 ${hi}).` })

    let i = lo
    for (let j = lo; j < hi; j++) {
      steps.push({ type: 'array', array: [...arr], comparing: [j, hi], sorted: [...sortedIndices], message: `${arr[j]}와 피벗 ${pivot}을 비교합니다.` })
      if (arr[j] < pivot) {
        if (i !== j) {
          ;[arr[i], arr[j]] = [arr[j], arr[i]]
          steps.push({ type: 'array', array: [...arr], swapped: [i, j], sorted: [...sortedIndices], message: `${arr[j]}와 ${arr[i]}을 교환합니다.` })
        }
        i++
      }
    }

    ;[arr[i], arr[hi]] = [arr[hi], arr[i]]
    sortedIndices.push(i)
    steps.push({ type: 'array', array: [...arr], swapped: [i, hi], sorted: [...sortedIndices], message: `피벗 ${pivot}이 인덱스 ${i}에 확정되었습니다.` })

    quickSort(lo, i - 1)
    quickSort(i + 1, hi)
  }

  quickSort(0, arr.length - 1)
  steps.push({ type: 'array', array: [...arr], sorted: Array.from({ length: arr.length }, (_, k) => k), message: '정렬이 완료되었습니다!' })

  return steps
}

export const quickSortViz: VisualizationConfig = {
  name: '퀵 정렬',
  description: '피벗을 기준으로 분할하여 정렬합니다.',
  defaultInput: [5, 3, 8, 1, 4, 2],
  generateSteps,
}
