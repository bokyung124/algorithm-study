import type { VisualizationConfig, VisualizationStep } from '../../types/visualization'

function generateSteps(_input: number[] | { adjacency: Record<string, string[]> }): VisualizationStep[] {
  const n = 8
  const steps: VisualizationStep[] = []
  const dp: (number | null)[] = new Array(n + 1).fill(null)
  const headers = Array.from({ length: n + 1 }, (_, i) => `F(${i})`)

  steps.push({
    type: 'table',
    headers,
    rows: [dp.map((v) => v ?? '-')],
    message: `피보나치 수열을 메모이제이션으로 계산합니다. F(0)부터 F(${n})까지.`,
  })

  dp[0] = 0
  steps.push({
    type: 'table',
    headers,
    rows: [dp.map((v) => v ?? '-')],
    highlightCell: [0, 0],
    filledCells: [[0, 0]],
    message: 'F(0) = 0 (기저 조건)',
  })

  dp[1] = 1
  steps.push({
    type: 'table',
    headers,
    rows: [dp.map((v) => v ?? '-')],
    highlightCell: [0, 1],
    filledCells: [[0, 0], [0, 1]],
    message: 'F(1) = 1 (기저 조건)',
  })

  const filled: [number, number][] = [[0, 0], [0, 1]]

  for (let i = 2; i <= n; i++) {
    steps.push({
      type: 'table',
      headers,
      rows: [dp.map((v) => v ?? '-')],
      highlightCell: [0, i],
      filledCells: [...filled],
      message: `F(${i}) = F(${i - 1}) + F(${i - 2}) = ${dp[i - 1]} + ${dp[i - 2]} = ?`,
    })

    dp[i] = (dp[i - 1] ?? 0) + (dp[i - 2] ?? 0)
    filled.push([0, i])

    steps.push({
      type: 'table',
      headers,
      rows: [dp.map((v) => v ?? '-')],
      highlightCell: [0, i],
      filledCells: [...filled],
      message: `F(${i}) = ${dp[i]}`,
    })
  }

  steps.push({
    type: 'table',
    headers,
    rows: [dp.map((v) => v ?? '-')],
    filledCells: [...filled],
    message: `완료! F(${n}) = ${dp[n]}. 시간복잡도 O(n), 공간복잡도 O(n).`,
  })

  return steps
}

export const fibonacciDpViz: VisualizationConfig = {
  name: '피보나치 메모이제이션',
  description: 'DP 테이블을 채워가며 피보나치 수열을 계산합니다.',
  defaultInput: [8],
  generateSteps,
}
