import type { VisualizationConfig, VisualizationStep } from '../../types/visualization'

function generateSteps(_input: number[] | { adjacency: Record<string, string[]> }): VisualizationStep[] {
  const n = 5
  const steps: VisualizationStep[] = []
  const queens: [number, number][] = []

  steps.push({
    type: 'grid',
    grid: Array.from({ length: n }, () => new Array(n).fill(0)),
    size: n,
    placed: [],
    message: `${n}-Queens: ${n}x${n} 체스판에 ${n}개의 퀸을 서로 공격하지 않게 배치합니다.`,
  })

  function isValid(row: number, col: number): [boolean, [number, number][]] {
    const conflicts: [number, number][] = []
    for (const [qr, qc] of queens) {
      if (qc === col || Math.abs(qr - row) === Math.abs(qc - col)) {
        conflicts.push([qr, qc])
      }
    }
    return [conflicts.length === 0, conflicts]
  }

  function solve(row: number): boolean {
    if (row === n) return true

    for (let col = 0; col < n; col++) {
      const [valid, conflicts] = isValid(row, col)

      if (!valid) {
        steps.push({
          type: 'grid',
          grid: Array.from({ length: n }, () => new Array(n).fill(0)),
          size: n,
          placed: [...queens],
          current: [row, col],
          conflicts,
          message: `(${row}, ${col})에 퀸 배치 시도 → 충돌! (${conflicts.map(([r, c]) => `(${r},${c})`).join(', ')}과 충돌)`,
        })
        continue
      }

      queens.push([row, col])
      steps.push({
        type: 'grid',
        grid: Array.from({ length: n }, () => new Array(n).fill(0)),
        size: n,
        placed: [...queens],
        current: [row, col],
        message: `(${row}, ${col})에 퀸을 배치합니다. (${queens.length}/${n}개)`,
      })

      if (solve(row + 1)) return true

      queens.pop()
      steps.push({
        type: 'grid',
        grid: Array.from({ length: n }, () => new Array(n).fill(0)),
        size: n,
        placed: [...queens],
        message: `행 ${row + 1}에 퀸을 놓을 수 없음. (${row}, ${col})에서 백트래킹합니다.`,
      })
    }

    return false
  }

  solve(0)

  steps.push({
    type: 'grid',
    grid: Array.from({ length: n }, () => new Array(n).fill(0)),
    size: n,
    placed: [...queens],
    message: `${n}-Queens 해결! 배치: ${queens.map(([r, c]) => `(${r},${c})`).join(', ')}`,
  })

  return steps
}

export const nQueensViz: VisualizationConfig = {
  name: 'N-Queens',
  description: '백트래킹으로 퀸을 서로 공격하지 않게 배치합니다.',
  defaultInput: [5],
  generateSteps,
}
