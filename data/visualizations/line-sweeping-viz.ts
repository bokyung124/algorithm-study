import type { VisualizationConfig, VisualizationStep } from '../../types/visualization'

function generateSteps(input: number[] | { adjacency: Record<string, string[]> }): VisualizationStep[] {
  const arr = input as number[]
  const steps: VisualizationStep[] = []

  // 구간 목록 생성 (start, end 쌍)
  const intervals: [number, number][] = []
  for (let i = 0; i < arr.length; i += 2) {
    intervals.push([arr[i], arr[i + 1]])
  }

  steps.push({
    type: 'array',
    array: arr,
    message: `${intervals.length}개의 구간: ${intervals.map(iv => `[${iv[0]}, ${iv[1]}]`).join(', ')}. 전체 길이를 구합니다.`,
  })

  // 시작점 기준 정렬
  const sorted = intervals.slice().sort((a, b) => a[0] - b[0] || a[1] - b[1])
  const sortedFlat = sorted.flatMap(iv => iv)

  steps.push({
    type: 'array',
    array: sortedFlat,
    sorted: Array.from({ length: sortedFlat.length }, (_, i) => i),
    message: `시작점 기준 정렬: ${sorted.map(iv => `[${iv[0]}, ${iv[1]}]`).join(', ')}`,
  })

  // 스위핑
  let currentStart = sorted[0][0]
  let currentEnd = sorted[0][1]
  let totalLength = 0

  steps.push({
    type: 'array',
    array: sortedFlat,
    pointers: [
      { index: 0, label: 'S', color: '#10b981' },
      { index: 1, label: 'E', color: '#ef4444' },
    ],
    message: `현재 구간: [${currentStart}, ${currentEnd}]. 스위핑 시작.`,
  })

  for (let i = 1; i < sorted.length; i++) {
    const [start, end] = sorted[i]
    const ptrIdx = i * 2

    if (start <= currentEnd) {
      const prevEnd = currentEnd
      currentEnd = Math.max(currentEnd, end)
      steps.push({
        type: 'array',
        array: sortedFlat,
        comparing: [ptrIdx, ptrIdx + 1],
        pointers: [
          { index: ptrIdx, label: 'S', color: '#6366f1' },
          { index: ptrIdx + 1, label: 'E', color: '#6366f1' },
        ],
        message: `[${start}, ${end}]은 현재 구간 [${currentStart}, ${prevEnd}]과 겹침 → 확장: [${currentStart}, ${currentEnd}]`,
      })
    } else {
      const segLen = currentEnd - currentStart
      totalLength += segLen
      steps.push({
        type: 'array',
        array: sortedFlat,
        pointers: [
          { index: ptrIdx, label: 'new', color: '#ef4444' },
        ],
        message: `[${start}, ${end}]은 겹치지 않음. 이전 구간 [${currentStart}, ${currentEnd}] 길이 ${segLen} 추가. 누적: ${totalLength}`,
      })
      currentStart = start
      currentEnd = end
    }
  }

  totalLength += currentEnd - currentStart

  steps.push({
    type: 'array',
    array: [totalLength],
    sorted: [0],
    message: `마지막 구간 [${currentStart}, ${currentEnd}] 길이 ${currentEnd - currentStart} 추가. 전체 길이: ${totalLength}`,
  })

  return steps
}

export const lineeSweepingViz: VisualizationConfig = {
  name: '라인 스위핑',
  description: '구간을 정렬하고 스위핑하여 전체 길이를 구합니다.',
  defaultInput: [1, 5, 3, 8, 6, 9, 2, 4],
  generateSteps,
}
