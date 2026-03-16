import type { VisualizationConfig, VisualizationStep } from '../../types/visualization'

function generateSteps(input: number[] | { adjacency: Record<string, string[]> }): VisualizationStep[] {
  const arr = [...(input as number[])]
  const n = Math.min(arr.length, 4) // 시각화를 위해 4개까지만
  const elements = arr.slice(0, n)
  const steps: VisualizationStep[] = []
  const used = new Array(n).fill(false)
  const path: number[] = []
  let permCount = 0

  steps.push({
    type: 'array',
    array: [...elements],
    message: `순열 생성: [${elements.join(', ')}]의 모든 순열을 백트래킹으로 생성합니다.`,
  })

  function backtrack() {
    if (path.length === n) {
      permCount++
      steps.push({
        type: 'array',
        array: [...path],
        sorted: Array.from({ length: n }, (_, i) => i),
        message: `순열 #${permCount}: [${path.join(', ')}] 완성!`,
      })
      return
    }

    for (let i = 0; i < n; i++) {
      if (used[i]) continue

      // 선택
      used[i] = true
      path.push(elements[i])

      const usedIndices: number[] = []
      for (let j = 0; j < n; j++) {
        if (used[j]) usedIndices.push(j)
      }

      steps.push({
        type: 'array',
        array: [...elements],
        comparing: [i],
        pointers: usedIndices.map((idx) => ({ index: idx, label: '선택', color: 'blue' })),
        message: `${elements[i]} 선택 → 현재 순열: [${path.join(', ')}]`,
      })

      backtrack()

      // 복원
      path.pop()
      used[i] = false

      if (path.length > 0) {
        steps.push({
          type: 'array',
          array: [...elements],
          comparing: [i],
          message: `${elements[i]} 선택 해제 (백트래킹). 현재: [${path.join(', ')}]`,
        })
      }
    }
  }

  backtrack()

  steps.push({
    type: 'array',
    array: [...elements],
    sorted: Array.from({ length: n }, (_, i) => i),
    message: `완료! 총 ${permCount}개의 순열을 생성했습니다. (${n}! = ${permCount})`,
  })

  return steps
}

export const permutationViz: VisualizationConfig = {
  name: '순열 생성',
  description: '백트래킹으로 모든 순열을 생성하는 과정을 보여줍니다.',
  defaultInput: [1, 2, 3],
  generateSteps,
}
