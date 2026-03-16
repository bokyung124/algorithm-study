import type { VisualizationConfig, VisualizationStep } from '../../types/visualization'

function generateSteps(_input: number[] | { adjacency: Record<string, string[]> }): VisualizationStep[] {
  const items = [{ w: 2, v: 3 }, { w: 3, v: 4 }, { w: 4, v: 5 }, { w: 5, v: 7 }]
  const W = 7
  const steps: VisualizationStep[] = []
  const n = items.length
  const dp: number[][] = Array.from({ length: n + 1 }, () => new Array(W + 1).fill(0))
  const headers = ['', ...Array.from({ length: W + 1 }, (_, i) => `w=${i}`)]
  const filled: [number, number][] = []

  steps.push({ type: 'table', headers, rows: dp.map((row, i) => [i === 0 ? '-' : `물${i}(w${items[i - 1].w},v${items[i - 1].v})`, ...row]), message: `0-1 배낭: 용량 ${W}, 물건 ${n}개` })

  for (let i = 1; i <= n; i++) {
    for (let w = 1; w <= W; w++) {
      if (items[i - 1].w <= w) {
        dp[i][w] = Math.max(dp[i - 1][w], dp[i - 1][w - items[i - 1].w] + items[i - 1].v)
      } else {
        dp[i][w] = dp[i - 1][w]
      }
      filled.push([i, w + 1])
      if (w === W || (w % 2 === 0)) {
        steps.push({ type: 'table', headers, rows: dp.map((row, ri) => [ri === 0 ? '-' : `물${ri}(w${items[ri - 1].w},v${items[ri - 1].v})`, ...row]), highlightCell: [i, w + 1], filledCells: [...filled], message: `dp[${i}][${w}] = ${dp[i][w]}${items[i - 1].w <= w ? ` (max(${dp[i - 1][w]}, ${dp[i - 1][w - items[i - 1].w]}+${items[i - 1].v}))` : ' (무게 초과)'}` })
      }
    }
  }

  steps.push({ type: 'table', headers, rows: dp.map((row, i) => [i === 0 ? '-' : `물${i}`, ...row]), filledCells: [...filled], message: `최대 가치: ${dp[n][W]}` })
  return steps
}

export const knapsackViz: VisualizationConfig = {
  name: '0-1 배낭 문제',
  description: 'DP 테이블을 채워 최대 가치를 구합니다.',
  defaultInput: [2, 3, 4, 5],
  generateSteps,
}
