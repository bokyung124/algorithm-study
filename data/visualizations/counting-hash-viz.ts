import type { VisualizationConfig, VisualizationStep } from '../../types/visualization'

function generateSteps(input: number[] | { adjacency: Record<string, string[]> }): VisualizationStep[] {
  const arr = input as number[]
  const steps: VisualizationStep[] = []
  const count = new Map<number, number>()

  steps.push({ type: 'array', array: arr, message: '각 원소의 빈도수를 카운팅합니다.' })

  for (let i = 0; i < arr.length; i++) {
    count.set(arr[i], (count.get(arr[i]) ?? 0) + 1)
    steps.push({ type: 'array', array: arr, comparing: [i], pointers: [{ index: i, label: `×${count.get(arr[i])}`, color: '#6366f1' }], message: `arr[${i}]=${arr[i]} → 빈도 ${count.get(arr[i])}` })
  }

  const maxCount = Math.max(...count.values())
  const mostFrequent = [...count.entries()].filter(([, v]) => v === maxCount).map(([k]) => k)
  const indices = arr.map((v, i) => mostFrequent.includes(v) ? i : -1).filter(i => i >= 0)

  steps.push({ type: 'array', array: arr, sorted: indices, message: `최빈값: ${mostFrequent.join(', ')} (${maxCount}회). 빈도: {${[...count.entries()].map(([k, v]) => `${k}:${v}`).join(', ')}}` })
  return steps
}

export const countingHashViz: VisualizationConfig = {
  name: '빈도수 카운팅',
  description: '해시맵으로 각 원소의 출현 빈도를 셉니다.',
  defaultInput: [1, 3, 2, 1, 4, 3, 1, 2, 5, 3],
  generateSteps,
}
