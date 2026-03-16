import type { VisualizationConfig, VisualizationStep } from '../../types/visualization'

function generateSteps(input: number[] | { adjacency: Record<string, string[]> }): VisualizationStep[] {
  const arr = input as number[]
  const steps: VisualizationStep[] = []
  const max = Math.max(...arr)
  const count = new Array(max + 1).fill(0)

  steps.push({ type: 'array', array: [...arr], message: `카운팅 정렬: 최대값 ${max}, 카운트 배열 크기 ${max + 1}` })

  for (let i = 0; i < arr.length; i++) {
    count[arr[i]]++
    steps.push({ type: 'array', array: [...arr], comparing: [i], message: `arr[${i}]=${arr[i]} → count[${arr[i]}]=${count[arr[i]]}` })
  }

  const result: number[] = []
  for (let i = 0; i <= max; i++) {
    for (let j = 0; j < count[i]; j++) {
      result.push(i)
      steps.push({ type: 'array', array: [...result, ...new Array(arr.length - result.length).fill(0)], sorted: Array.from({ length: result.length }, (_, k) => k), message: `값 ${i}을(를) ${count[i]}번 출력 (${j + 1}/${count[i]})` })
    }
  }

  steps.push({ type: 'array', array: result, sorted: result.map((_, i) => i), message: `정렬 완료: [${result.join(', ')}]` })
  return steps
}

export const countingSortViz: VisualizationConfig = {
  name: '카운팅 정렬',
  description: '각 값의 빈도를 세어 정렬합니다.',
  defaultInput: [4, 2, 2, 8, 3, 3, 1, 7, 5],
  generateSteps,
}
