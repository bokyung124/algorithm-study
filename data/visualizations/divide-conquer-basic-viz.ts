import type { VisualizationConfig, VisualizationStep } from '../../types/visualization'

function generateSteps(input: number[] | { adjacency: Record<string, string[]> }): VisualizationStep[] {
  const arr = [...(input as number[])]
  const steps: VisualizationStep[] = []

  steps.push({ type: 'array', array: [...arr], message: '분할 정복(병합 정렬)을 시작합니다. 배열을 반으로 나누어 정렬합니다.' })

  function mergeSort(a: number[], left: number, right: number): number[] {
    if (a.length <= 1) {
      steps.push({ type: 'array', array: [...arr], comparing: [left], message: `원소 [${a[0]}]은 크기 1이므로 이미 정렬되어 있습니다.` })
      return a
    }

    const mid = Math.floor(a.length / 2)
    const leftArr = a.slice(0, mid)
    const rightArr = a.slice(mid)

    steps.push({
      type: 'array',
      array: [...arr],
      comparing: Array.from({ length: a.length }, (_, i) => left + i),
      message: `[${a.join(', ')}]을 [${leftArr.join(', ')}]과 [${rightArr.join(', ')}]으로 분할합니다.`,
    })

    const sortedLeft = mergeSort(leftArr, left, left + mid - 1)
    const sortedRight = mergeSort(rightArr, left + mid, right)

    // 병합 과정
    const merged: number[] = []
    let i = 0, j = 0

    while (i < sortedLeft.length && j < sortedRight.length) {
      if (sortedLeft[i] <= sortedRight[j]) {
        merged.push(sortedLeft[i])
        i++
      } else {
        merged.push(sortedRight[j])
        j++
      }
    }
    while (i < sortedLeft.length) { merged.push(sortedLeft[i]); i++ }
    while (j < sortedRight.length) { merged.push(sortedRight[j]); j++ }

    // 결과를 원래 배열에 반영
    for (let k = 0; k < merged.length; k++) {
      arr[left + k] = merged[k]
    }

    steps.push({
      type: 'array',
      array: [...arr],
      sorted: Array.from({ length: merged.length }, (_, k) => left + k),
      message: `[${sortedLeft.join(', ')}]과 [${sortedRight.join(', ')}]을 합쳐 [${merged.join(', ')}]을 만듭니다.`,
    })

    return merged
  }

  mergeSort(arr, 0, arr.length - 1)

  steps.push({
    type: 'array',
    array: [...arr],
    sorted: Array.from({ length: arr.length }, (_, i) => i),
    message: `정렬 완료! [${arr.join(', ')}]`,
  })

  return steps
}

export const divideConquerBasicViz: VisualizationConfig = {
  name: '분할 정복 (병합 정렬)',
  description: '배열을 재귀적으로 반으로 나누고 합치며 정렬하는 과정을 보여줍니다.',
  defaultInput: [8, 3, 5, 1, 7, 2, 6, 4],
  generateSteps,
}
