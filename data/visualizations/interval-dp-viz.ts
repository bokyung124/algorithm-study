import type { VisualizationConfig, VisualizationStep } from '../../types/visualization'

function generateSteps(_input: number[] | { adjacency: Record<string, string[]> }): VisualizationStep[] {
  const arr = [3, 1, 5, 2]
  const n = arr.length
  const steps: VisualizationStep[] = []
  const dp: number[][] = Array.from({ length: n }, () => new Array(n).fill(0))
  const headers = ['', ...arr.map((v, i) => `[${i}]=${v}`)]
  const filled: [number, number][] = []

  steps.push({ type: 'table', headers, rows: dp.map((row, i) => [`[${i}]=${arr[i]}`, ...row]), message: `구간 DP: 인접 원소를 합치는 최소 비용을 구합니다.` })

  const prefix = [0]
  for (const v of arr) prefix.push(prefix[prefix.length - 1] + v)
  const rangeSum = (l: number, r: number) => prefix[r + 1] - prefix[l]

  for (let len = 2; len <= n; len++) {
    for (let i = 0; i <= n - len; i++) {
      const j = i + len - 1
      dp[i][j] = Infinity
      for (let k = i; k < j; k++) {
        dp[i][j] = Math.min(dp[i][j], dp[i][k] + dp[k + 1][j] + rangeSum(i, j))
      }
      filled.push([i, j + 1])
      steps.push({ type: 'table', headers, rows: dp.map((row, ri) => [`[${ri}]=${arr[ri]}`, ...row.map(v => v === Infinity ? '∞' : v)]), highlightCell: [i, j + 1], filledCells: [...filled], message: `dp[${i}][${j}] = ${dp[i][j]} (구간 [${i}..${j}], 합=${rangeSum(i, j)})` })
    }
  }

  steps.push({ type: 'table', headers, rows: dp.map((row, i) => [`[${i}]`, ...row.map(v => v === Infinity ? '∞' : v)]), filledCells: [...filled], message: `최소 비용: ${dp[0][n - 1]}` })
  return steps
}

export const intervalDpViz: VisualizationConfig = {
  name: '구간 DP',
  description: '구간을 합치는 최소 비용을 대각선 방향으로 계산합니다.',
  defaultInput: [3, 1, 5, 2],
  generateSteps,
}
