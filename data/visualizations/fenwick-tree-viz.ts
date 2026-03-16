import type { VisualizationConfig, VisualizationStep } from '../../types/visualization'

function generateSteps(input: number[] | { adjacency: Record<string, string[]> }): VisualizationStep[] {
  const arr = Array.isArray(input) ? input : [1, 3, 5, 7, 9, 11]
  const n = arr.length
  const bit = new Array(n + 1).fill(0)
  const steps: VisualizationStep[] = []

  steps.push({
    type: 'array',
    array: [...arr],
    pointers: [],
    message: `배열 [${arr.join(', ')}]로 펜윅 트리(BIT)를 구성합니다. (1-indexed)`,
  })

  // Build: update each element
  for (let idx = 0; idx < n; idx++) {
    const val = arr[idx]
    let i = idx + 1 // 1-indexed
    const updatedIndices: number[] = []
    while (i <= n) {
      bit[i] += val
      updatedIndices.push(i - 1) // 0-indexed for display
      i += i & (-i)
    }

    steps.push({
      type: 'array',
      array: bit.slice(1), // show 1-indexed as 0-indexed display
      comparing: [idx],
      swapped: updatedIndices,
      pointers: [
        { index: idx, label: `arr[${idx + 1}]=${val}`, color: '#3b82f6' },
      ],
      message: `원소 arr[${idx + 1}] = ${val} 삽입 → BIT 인덱스 [${updatedIndices.map(x => x + 1).join(', ')}] 갱신 (lowbit를 더하며 올라감)`,
    })
  }

  steps.push({
    type: 'array',
    array: bit.slice(1),
    sorted: Array.from({ length: n }, (_, i) => i),
    message: `펜윅 트리 구성 완료: BIT = [${bit.slice(1).join(', ')}]`,
  })

  // Query example: prefix sum query(4)
  const queryIdx = Math.min(4, n)
  let sum = 0
  let qi = queryIdx
  const queryPath: number[] = []
  while (qi > 0) {
    sum += bit[qi]
    queryPath.push(qi - 1)
    qi -= qi & (-qi)
  }

  steps.push({
    type: 'array',
    array: bit.slice(1),
    comparing: queryPath,
    pointers: queryPath.map((idx, i) => ({
      index: idx,
      label: `+${bit[idx + 1]}`,
      color: i === 0 ? '#ef4444' : '#f97316',
    })),
    message: `쿼리 query(${queryIdx}): 인덱스 [${queryPath.map(x => x + 1).join(' → ')}]를 따라 합산 = ${sum} (lowbit를 빼며 내려감)`,
  })

  // Range query example
  const l = 2, r = Math.min(5, n)
  let sumR = 0, sumL = 0
  let ti = r
  while (ti > 0) { sumR += bit[ti]; ti -= ti & (-ti) }
  ti = l - 1
  while (ti > 0) { sumL += bit[ti]; ti -= ti & (-ti) }

  steps.push({
    type: 'array',
    array: bit.slice(1),
    comparing: Array.from({ length: r - l + 1 }, (_, i) => l - 1 + i),
    pointers: [
      { index: l - 1, label: `L=${l}`, color: '#22c55e' },
      { index: r - 1, label: `R=${r}`, color: '#22c55e' },
    ],
    message: `구간 합 range_query(${l}, ${r}) = query(${r}) - query(${l - 1}) = ${sumR} - ${sumL} = ${sumR - sumL}`,
  })

  return steps
}

export const fenwickTreeViz: VisualizationConfig = {
  name: '펜윅 트리 (BIT)',
  description: 'Binary Indexed Tree의 구성, 점 업데이트, 구간 합 쿼리 과정을 시각화합니다.',
  defaultInput: [1, 3, 5, 7, 9, 11],
  generateSteps,
}
