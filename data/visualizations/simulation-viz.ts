import type { VisualizationConfig, VisualizationStep } from '../../types/visualization'

function generateSteps(_input: number[] | { adjacency: Record<string, string[]> }): VisualizationStep[] {
  const n = 5
  const steps: VisualizationStep[] = []
  const dirs = [[0, 1], [1, 0], [0, -1], [-1, 0]]
  const dirNames = ['→', '↓', '←', '↑']
  const path = [[0, 0]]
  let r = 0, c = 0, d = 0
  const visited = new Set<string>()
  visited.add('0,0')

  steps.push({ type: 'grid', grid: Array.from({ length: n }, () => new Array(n).fill(0)), size: n, placed: [[0, 0]], current: [0, 0], message: '달팽이 순회: (0,0)에서 시작하여 시계방향으로 이동합니다.' })

  for (let step = 1; step < n * n; step++) {
    let nr = r + dirs[d][0], nc = c + dirs[d][1]
    if (nr < 0 || nr >= n || nc < 0 || nc >= n || visited.has(`${nr},${nc}`)) {
      d = (d + 1) % 4
      nr = r + dirs[d][0]
      nc = c + dirs[d][1]
    }
    r = nr
    c = nc
    visited.add(`${r},${c}`)
    path.push([r, c])

    if (step % 3 === 0 || step === n * n - 1) {
      steps.push({ type: 'grid', grid: Array.from({ length: n }, () => new Array(n).fill(0)), size: n, placed: path.map(([pr, pc]) => [pr, pc] as [number, number]), current: [r, c], message: `${dirNames[d]} 이동: (${r},${c}). ${step + 1}/${n * n} 칸 방문` })
    }
  }

  steps.push({ type: 'grid', grid: Array.from({ length: n }, () => new Array(n).fill(0)), size: n, placed: path.map(([pr, pc]) => [pr, pc] as [number, number]), message: `달팽이 순회 완료! ${n * n}칸 모두 방문` })
  return steps
}

export const simulationViz: VisualizationConfig = {
  name: '시뮬레이션 (달팽이 순회)',
  description: '격자 위에서 규칙에 따라 이동하는 시뮬레이션입니다.',
  defaultInput: [5],
  generateSteps,
}
