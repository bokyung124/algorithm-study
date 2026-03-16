import type { VisualizationConfig, VisualizationStep } from '../../types/visualization'

function generateSteps(_input: number[] | { adjacency: Record<string, string[]> }): VisualizationStep[] {
  const INF = 999
  const n = 4
  const nodes = ['A', 'B', 'C', 'D']
  const dist: number[][] = [
    [0, 3, INF, 7],
    [8, 0, 2, INF],
    [5, INF, 0, 1],
    [2, INF, INF, 0],
  ]
  const steps: VisualizationStep[] = []
  const headers = ['', ...nodes]
  const filled: [number, number][] = []

  steps.push({ type: 'table', headers, rows: dist.map((row, i) => [nodes[i], ...row.map(v => v >= INF ? '∞' : v)]), message: `Floyd-Warshall: ${n}개 노드 간 모든 쌍 최단 거리. 경유 노드를 하나씩 추가합니다.` })

  for (let k = 0; k < n; k++) {
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (dist[i][k] + dist[k][j] < dist[i][j]) {
          dist[i][j] = dist[i][k] + dist[k][j]
          filled.push([i, j + 1])
        }
      }
    }
    steps.push({ type: 'table', headers, rows: dist.map((row, i) => [nodes[i], ...row.map(v => v >= INF ? '∞' : v)]), highlightCell: [k, k + 1], filledCells: [...filled], message: `경유 노드 ${nodes[k]} 추가 후 거리 행렬 갱신` })
  }

  steps.push({ type: 'table', headers, rows: dist.map((row, i) => [nodes[i], ...row.map(v => v >= INF ? '∞' : v)]), filledCells: [...filled], message: `완료! 모든 쌍 최단 거리 계산됨` })
  return steps
}

export const floydWarshallViz: VisualizationConfig = {
  name: 'Floyd-Warshall',
  description: '경유 노드를 추가하며 모든 쌍 최단 거리를 구합니다.',
  defaultInput: [4],
  generateSteps,
}
