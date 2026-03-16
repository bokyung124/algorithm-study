import type { VisualizationConfig, VisualizationStep } from '../../types/visualization'

function generateSteps(input: number[] | { adjacency: Record<string, string[]> }): VisualizationStep[] {
  const arr = input as number[]
  const n = arr.length
  const steps: VisualizationStep[] = []

  steps.push({
    type: 'array',
    array: arr,
    message: `배열 [${arr.join(', ')}]의 누적 합 배열을 구성합니다.`,
  })

  // 누적 합 배열 생성 과정
  const prefix: number[] = [0]

  steps.push({
    type: 'array',
    array: [0, ...arr.map(() => 0)],
    pointers: [
      { index: 0, label: 'P[0]=0', color: '#10b981' },
    ],
    message: 'prefix[0] = 0으로 초기화합니다.',
  })

  for (let i = 0; i < n; i++) {
    prefix.push(prefix[i] + arr[i])
    const display = [...prefix, ...new Array(n - i).fill(0)]

    steps.push({
      type: 'array',
      array: display,
      pointers: [
        { index: i + 1, label: `P[${i + 1}]`, color: '#6366f1' },
      ],
      sorted: Array.from({ length: i + 2 }, (_, k) => k),
      message: `prefix[${i + 1}] = prefix[${i}] + arr[${i}] = ${prefix[i]} + ${arr[i]} = ${prefix[i + 1]}`,
    })
  }

  steps.push({
    type: 'array',
    array: prefix,
    sorted: Array.from({ length: prefix.length }, (_, i) => i),
    message: `누적 합 배열 완성: [${prefix.join(', ')}]`,
  })

  // 구간 합 쿼리 시연
  const l = 1
  const r = 3
  if (r < n) {
    steps.push({
      type: 'array',
      array: prefix,
      pointers: [
        { index: l, label: `P[${l}]`, color: '#ef4444' },
        { index: r + 1, label: `P[${r + 1}]`, color: '#6366f1' },
      ],
      comparing: [l, r + 1],
      message: `구간 합 arr[${l}..${r}] = prefix[${r + 1}] - prefix[${l}] = ${prefix[r + 1]} - ${prefix[l]} = ${prefix[r + 1] - prefix[l]}`,
    })

    steps.push({
      type: 'array',
      array: arr,
      sorted: Array.from({ length: r - l + 1 }, (_, i) => l + i),
      message: `검증: arr[${l}] + ... + arr[${r}] = ${arr.slice(l, r + 1).join(' + ')} = ${arr.slice(l, r + 1).reduce((a, b) => a + b, 0)}. O(1)에 구간 합 완료!`,
    })
  }

  return steps
}

export const prefixSum1dViz: VisualizationConfig = {
  name: '1D 누적 합',
  description: '누적 합 배열을 단계별로 구성하고 구간 합 쿼리를 시연합니다.',
  defaultInput: [2, 4, 1, 3, 5, 7],
  generateSteps,
}
