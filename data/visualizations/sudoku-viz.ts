import type { VisualizationConfig, VisualizationStep } from '../../types/visualization'

function generateSteps(_input: number[] | { adjacency: Record<string, string[]> }): VisualizationStep[] {
  const n = 4 // 4x4 mini sudoku
  const grid: number[][] = [
    [1, 0, 0, 4],
    [0, 0, 1, 0],
    [0, 1, 0, 0],
    [4, 0, 0, 1],
  ]
  const steps: VisualizationStep[] = []
  const initial = grid.map(r => [...r])

  steps.push({ type: 'grid', grid: grid.map(r => [...r]), size: n, placed: grid.flatMap((r, ri) => r.map((v, ci) => v > 0 ? [ri, ci] as [number, number] : null)).filter((x): x is [number, number] => x !== null), message: `4×4 미니 스도쿠: 빈 칸(0)을 1~4로 채웁니다.` })

  function isValid(r: number, c: number, num: number): boolean {
    for (let i = 0; i < n; i++) {
      if (grid[r][i] === num || grid[i][c] === num) return false
    }
    const br = Math.floor(r / 2) * 2, bc = Math.floor(c / 2) * 2
    for (let i = br; i < br + 2; i++) {
      for (let j = bc; j < bc + 2; j++) {
        if (grid[i][j] === num) return false
      }
    }
    return true
  }

  function solve(): boolean {
    for (let r = 0; r < n; r++) {
      for (let c = 0; c < n; c++) {
        if (grid[r][c] !== 0) continue
        for (let num = 1; num <= n; num++) {
          if (isValid(r, c, num)) {
            grid[r][c] = num
            steps.push({ type: 'grid', grid: grid.map(row => [...row]), size: n, placed: grid.flatMap((row, ri) => row.map((v, ci) => v > 0 ? [ri, ci] as [number, number] : null)).filter((x): x is [number, number] => x !== null), current: [r, c], message: `(${r},${c})에 ${num} 배치 시도 → 유효!` })

            if (solve()) return true

            grid[r][c] = 0
            steps.push({ type: 'grid', grid: grid.map(row => [...row]), size: n, placed: grid.flatMap((row, ri) => row.map((v, ci) => v > 0 && initial[ri][ci] > 0 ? [ri, ci] as [number, number] : null)).filter((x): x is [number, number] => x !== null), conflicts: [[r, c]], message: `(${r},${c})=${num} 실패. 백트래킹!` })
          }
        }
        return false
      }
    }
    return true
  }

  solve()

  steps.push({ type: 'grid', grid: grid.map(r => [...r]), size: n, placed: grid.flatMap((r, ri) => r.map((_, ci) => [ri, ci] as [number, number])), message: '스도쿠 풀이 완료!' })
  return steps
}

export const sudokuViz: VisualizationConfig = {
  name: '스도쿠',
  description: '백트래킹으로 스도쿠를 풉니다.',
  defaultInput: [4],
  generateSteps,
}
