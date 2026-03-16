import type { VisualizationConfig, VisualizationStep } from '../../types/visualization'

function generateSteps(input: number[] | { adjacency: Record<string, string[]> }): VisualizationStep[] {
  const values = input as number[]
  const steps: VisualizationStep[] = []
  const heap: number[] = []

  steps.push({ type: 'array', array: [...values], message: `입력 배열: [${values.join(', ')}]을 최소 힙에 하나씩 삽입합니다.` })

  for (const val of values) {
    heap.push(val)
    let currentIdx = heap.length - 1

    steps.push({
      type: 'array',
      array: [...heap],
      pointers: [{ index: currentIdx, label: '삽입', color: '#22c55e' }],
      message: `${val}을(를) 힙의 끝에 삽입합니다.`,
    })

    // 위로 올라가면서 힙 속성 복원 (sift up)
    while (currentIdx > 0) {
      const parentIdx = Math.floor((currentIdx - 1) / 2)

      steps.push({
        type: 'array',
        array: [...heap],
        comparing: [currentIdx, parentIdx],
        pointers: [
          { index: currentIdx, label: '자식', color: '#3b82f6' },
          { index: parentIdx, label: '부모', color: '#f59e0b' },
        ],
        message: `부모(${heap[parentIdx]})와 자식(${heap[currentIdx]})을 비교합니다.`,
      })

      if (heap[currentIdx] < heap[parentIdx]) {
        const temp = heap[currentIdx]
        heap[currentIdx] = heap[parentIdx]
        heap[parentIdx] = temp

        steps.push({
          type: 'array',
          array: [...heap],
          swapped: [currentIdx, parentIdx],
          message: `${heap[parentIdx]}이(가) 부모(${heap[currentIdx]})보다 작으므로 교환합니다.`,
        })

        currentIdx = parentIdx
      } else {
        steps.push({
          type: 'array',
          array: [...heap],
          pointers: [{ index: currentIdx, label: '확정', color: '#22c55e' }],
          message: `${heap[currentIdx]} >= ${heap[parentIdx]}이므로 힙 속성을 만족합니다.`,
        })
        break
      }
    }

    if (currentIdx === 0 && heap.length > 1) {
      steps.push({
        type: 'array',
        array: [...heap],
        pointers: [{ index: 0, label: '루트', color: '#ef4444' }],
        message: `${heap[0]}이(가) 루트까지 올라갔습니다.`,
      })
    }
  }

  steps.push({
    type: 'array',
    array: [...heap],
    sorted: Array.from({ length: heap.length }, (_, i) => i),
    message: `최소 힙 구성 완료! 루트(${heap[0]})가 최솟값입니다.`,
  })

  return steps
}

export const heapBasicViz: VisualizationConfig = {
  name: '최소 힙 삽입',
  description: '배열의 원소를 하나씩 최소 힙에 삽입하며 힙 속성을 유지하는 과정을 시각화합니다.',
  defaultInput: [5, 3, 8, 1, 4, 2],
  generateSteps,
}
