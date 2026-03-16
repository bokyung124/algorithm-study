import type { VisualizationConfig, VisualizationStep } from '../../types/visualization'

function generateSteps(_input: number[] | { adjacency: Record<string, string[]> }): VisualizationStep[] {
  // TSP-like: 4 cities, minimize travel cost
  const n = 4
  const dist = [[0, 10, 15, 20], [10, 0, 35, 25], [15, 35, 0, 30], [20, 25, 30, 0]]
  const steps: VisualizationStep[] = []
  const total = 1 << n
  const headers = ['상태(비트)', ...Array.from({ length: n }, (_, i) => `도시${i}`)]
  const dp: number[][] = Array.from({ length: total }, () => new Array(n).fill(Infinity))
  dp[1][0] = 0
  const filled: [number, number][] = [[1, 1]]

  steps.push({ type: 'table', headers, rows: dp.slice(0, 8).map((row, i) => [i.toString(2).padStart(n, '0'), ...row.map(v => v === Infinity ? '∞' : v)]), message: `비트마스크 DP (TSP): ${n}개 도시의 최단 경로. dp[방문상태][현재도시]` })

  for (let mask = 1; mask < total; mask++) {
    for (let u = 0; u < n; u++) {
      if (!(mask & (1 << u)) || dp[mask][u] === Infinity) continue
      for (let v = 0; v < n; v++) {
        if (mask & (1 << v)) continue
        const nmask = mask | (1 << v)
        const newCost = dp[mask][u] + dist[u][v]
        if (newCost < dp[nmask][v]) {
          dp[nmask][v] = newCost
          filled.push([nmask, v + 1])
          if (nmask === total - 1 || mask % 3 === 0) {
            steps.push({ type: 'table', headers, rows: dp.slice(0, Math.min(total, 16)).map((row, i) => [i.toString(2).padStart(n, '0'), ...row.map(val => val === Infinity ? '∞' : val)]), highlightCell: [nmask, v + 1], filledCells: filled.filter(([r]) => r < 16).map(f => [...f] as [number, number]), message: `dp[${nmask.toString(2).padStart(n, '0')}][${v}] = ${newCost} (도시${u}→${v}, 비용 ${dist[u][v]})` })
          }
        }
      }
    }
  }

  const allVisited = total - 1
  const minCost = Math.min(...dp[allVisited].map((c, i) => c + dist[i][0]))
  steps.push({ type: 'table', headers, rows: dp.slice(0, Math.min(total, 16)).map((row, i) => [i.toString(2).padStart(n, '0'), ...row.map(v => v === Infinity ? '∞' : v)]), filledCells: filled.filter(([r]) => r < 16).map(f => [...f] as [number, number]), message: `최소 비용: ${minCost} (모든 도시 방문 후 출발점 복귀)` })
  return steps
}

export const bitmaskDpViz: VisualizationConfig = {
  name: '비트마스크 DP',
  description: '비트마스크로 방문 상태를 관리하며 DP를 수행합니다.',
  defaultInput: [4],
  generateSteps,
}
