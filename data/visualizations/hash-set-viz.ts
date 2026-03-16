import type { VisualizationConfig, VisualizationStep } from '../../types/visualization'

function generateSteps(input: number[] | { adjacency: Record<string, string[]> }): VisualizationStep[] {
  const arr = input as number[]
  const steps: VisualizationStep[] = []
  const seen = new Set<number>()
  const unique: number[] = []

  steps.push({ type: 'array', array: arr, message: `해시 셋으로 중복을 제거합니다.` })

  for (let i = 0; i < arr.length; i++) {
    if (seen.has(arr[i])) {
      steps.push({ type: 'array', array: arr, swapped: [i], comparing: [i], pointers: [{ index: i, label: '중복', color: '#ef4444' }], message: `arr[${i}]=${arr[i]} → 이미 셋에 존재! 건너뜁니다.` })
    } else {
      seen.add(arr[i])
      unique.push(i)
      steps.push({ type: 'array', array: arr, sorted: [...unique], comparing: [i], pointers: [{ index: i, label: '추가', color: '#10b981' }], message: `arr[${i}]=${arr[i]} → 셋에 추가. 셋 크기: ${seen.size}` })
    }
  }

  steps.push({ type: 'array', array: arr, sorted: unique, message: `중복 제거 완료! ${arr.length}개 → ${seen.size}개 고유값` })
  return steps
}

export const hashSetViz: VisualizationConfig = {
  name: '해시 셋',
  description: '해시 셋으로 중복을 O(1)에 판별합니다.',
  defaultInput: [3, 1, 4, 1, 5, 9, 2, 6, 5, 3],
  generateSteps,
}
