import type { VisualizationConfig, VisualizationStep } from '../../types/visualization'

function generateSteps(input: number[] | { adjacency: Record<string, string[]> }): VisualizationStep[] {
  const arr = input as number[]
  const k = 3
  const steps: VisualizationStep[] = []

  steps.push({
    type: 'array',
    array: [...arr],
    message: `배열에서 가장 큰 ${k}개의 원소를 크기 ${k}의 최소 힙으로 찾습니다.`,
  })

  // 초기 힙: 처음 K개 원소
  const heap = arr.slice(0, k)

  steps.push({
    type: 'array',
    array: [...arr],
    pointers: Array.from({ length: k }, (_, i) => ({ index: i, label: '힙', color: '#3b82f6' })),
    message: `처음 ${k}개 원소 [${heap.join(', ')}]로 초기 힙을 구성합니다.`,
  })

  // heapify
  for (let i = Math.floor(k / 2) - 1; i >= 0; i--) {
    siftDown(heap, i, k)
  }

  steps.push({
    type: 'array',
    array: [...heap, ...arr.slice(k)],
    pointers: Array.from({ length: k }, (_, i) => ({ index: i, label: `힙[${i}]`, color: '#3b82f6' })),
    message: `힙 구성 완료: [${heap.join(', ')}]. 루트(${heap[0]})가 최솟값입니다.`,
  })

  // 나머지 원소 처리
  for (let i = k; i < arr.length; i++) {
    const current = arr[i]
    const display = [...heap, ...arr.slice(k)]

    steps.push({
      type: 'array',
      array: display,
      comparing: [0, i],
      pointers: [
        { index: 0, label: `힙 루트(${heap[0]})`, color: '#f59e0b' },
        { index: i, label: `현재(${current})`, color: '#8b5cf6' },
      ],
      message: `현재 원소 ${current}와 힙 루트 ${heap[0]}을 비교합니다.`,
    })

    if (current > heap[0]) {
      const old = heap[0]
      heap[0] = current
      siftDown(heap, 0, k)

      const newDisplay = [...heap, ...arr.slice(k)]
      // Mark the replaced position
      steps.push({
        type: 'array',
        array: newDisplay,
        swapped: [0, i],
        pointers: Array.from({ length: k }, (_, j) => ({ index: j, label: `힙[${j}]`, color: '#22c55e' })),
        message: `${current} > ${old}이므로 힙 루트를 교체하고 힙을 재정렬합니다. 힙: [${heap.join(', ')}]`,
      })
    } else {
      steps.push({
        type: 'array',
        array: display,
        pointers: [{ index: i, label: '무시', color: '#ef4444' }],
        message: `${current} <= ${heap[0]}이므로 무시합니다.`,
      })
    }
  }

  const result = [...heap].sort((a, b) => b - a)
  steps.push({
    type: 'array',
    array: result,
    sorted: Array.from({ length: k }, (_, i) => i),
    message: `Top-${k} 완료! 가장 큰 ${k}개: [${result.join(', ')}]`,
  })

  return steps
}

function siftDown(heap: number[], idx: number, size: number): void {
  while (true) {
    let smallest = idx
    const left = 2 * idx + 1
    const right = 2 * idx + 2

    if (left < size && heap[left] < heap[smallest]) smallest = left
    if (right < size && heap[right] < heap[smallest]) smallest = right

    if (smallest === idx) break
    const temp = heap[idx]
    heap[idx] = heap[smallest]
    heap[smallest] = temp
    idx = smallest
  }
}

export const topKViz: VisualizationConfig = {
  name: 'Top-K 원소 찾기',
  description: '크기 K의 최소 힙을 유지하여 배열에서 가장 큰 K개 원소를 찾는 과정을 시각화합니다.',
  defaultInput: [4, 1, 7, 3, 8, 5, 2, 9, 6],
  generateSteps,
}
