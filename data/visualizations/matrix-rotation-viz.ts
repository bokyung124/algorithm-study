import type { VisualizationConfig, VisualizationStep } from '../../types/visualization'

function generateSteps(_input: number[] | { adjacency: Record<string, string[]> }): VisualizationStep[] {
  const n = 4
  const matrix: number[][] = Array.from({ length: n }, (_, r) => Array.from({ length: n }, (_, c) => r * n + c + 1))
  const steps: VisualizationStep[] = []

  steps.push({ type: 'grid', grid: matrix.map(r => [...r]), size: n, placed: [], message: `${n}×${n} 행렬을 90도 시계방향 회전합니다.` })

  // Step 1: Transpose
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      const tmp = matrix[i][j]
      matrix[i][j] = matrix[j][i]
      matrix[j][i] = tmp
    }
  }
  steps.push({ type: 'grid', grid: matrix.map(r => [...r]), size: n, placed: Array.from({ length: n }, (_, i) => [i, i] as [number, number]), message: '1단계: 전치(Transpose) - 대각선 기준 뒤집기' })

  // Step 2: Reverse each row
  for (let i = 0; i < n; i++) {
    matrix[i].reverse()
    steps.push({ type: 'grid', grid: matrix.map(r => [...r]), size: n, highlights: matrix[i].map((_, c) => [i, c] as [number, number]), message: `2단계: 행 ${i} 좌우 반전` })
  }

  steps.push({ type: 'grid', grid: matrix.map(r => [...r]), size: n, placed: Array.from({ length: n * n }, (_, k) => [Math.floor(k / n), k % n] as [number, number]), message: '90도 시계방향 회전 완료!' })
  return steps
}

export const matrixRotationViz: VisualizationConfig = {
  name: '행렬 회전',
  description: '전치 + 좌우 반전으로 90도 회전합니다.',
  defaultInput: [4],
  generateSteps,
}
