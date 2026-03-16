import type { VisualizationConfig, VisualizationStep } from '../../types/visualization'

function generateSteps(_input: number[] | { adjacency: Record<string, string[]> }): VisualizationStep[] {
  const grid = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ]
  const n = grid.length
  const m = grid[0].length
  const steps: VisualizationStep[] = []

  const colHeaders = ['', ...Array.from({ length: m + 1 }, (_, j) => `${j}`)]

  // 초기 원본 배열 표시
  const origHeaders = ['', ...Array.from({ length: m }, (_, j) => `col${j}`)]
  const origRows = grid.map((row, i) => [`row${i}`, ...row] as (string | number | null)[])

  steps.push({
    type: 'table',
    headers: origHeaders,
    rows: origRows,
    message: '원본 2D 배열입니다. 이 배열의 2D 누적 합 테이블을 구성합니다.',
  })

  // prefix 테이블 초기화 (n+1) x (m+1), 0행/0열은 0
  const prefix: number[][] = Array.from({ length: n + 1 }, () => new Array(m + 1).fill(0))
  const filled: [number, number][] = []

  // 0행 전체를 filled로 표시
  for (let j = 0; j <= m; j++) {
    filled.push([0, j + 1])
  }
  // 0열 전체를 filled로 표시
  for (let i = 1; i <= n; i++) {
    filled.push([i, 1])
  }

  const toRows = (): (string | number | null)[][] =>
    prefix.map((row, i) => [`${i}`, ...row] as (string | number | null)[])

  steps.push({
    type: 'table',
    headers: colHeaders,
    rows: toRows(),
    filledCells: [...filled],
    message: 'prefix 테이블을 (N+1)x(M+1) 크기로 초기화합니다. 0행과 0열은 모두 0입니다.',
  })

  // 누적 합 계산
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= m; j++) {
      const val = grid[i - 1][j - 1]
      const top = prefix[i - 1][j]
      const left = prefix[i][j - 1]
      const topLeft = prefix[i - 1][j - 1]

      steps.push({
        type: 'table',
        headers: colHeaders,
        rows: toRows(),
        highlightCell: [i, j + 1],
        filledCells: [...filled],
        message: `P[${i}][${j}] = arr[${i - 1}][${j - 1}] + P[${i - 1}][${j}] + P[${i}][${j - 1}] - P[${i - 1}][${j - 1}] = ${val} + ${top} + ${left} - ${topLeft} = ?`,
      })

      prefix[i][j] = val + top + left - topLeft
      filled.push([i, j + 1])

      steps.push({
        type: 'table',
        headers: colHeaders,
        rows: toRows(),
        highlightCell: [i, j + 1],
        filledCells: [...filled],
        message: `P[${i}][${j}] = ${prefix[i][j]}`,
      })
    }
  }

  steps.push({
    type: 'table',
    headers: colHeaders,
    rows: toRows(),
    filledCells: [...filled],
    message: '2D 누적 합 테이블이 완성되었습니다!',
  })

  // 구간 합 쿼리 시연: (1,1) ~ (2,2) 영역
  const r1 = 1, c1 = 1, r2 = 2, c2 = 2
  const queryResult = prefix[r2][c2] - prefix[r1 - 1][c2] - prefix[r2][c1 - 1] + prefix[r1 - 1][c1 - 1]

  steps.push({
    type: 'table',
    headers: colHeaders,
    rows: toRows(),
    highlightCell: [r2, c2 + 1],
    filledCells: [...filled],
    message: `쿼리: (${r1},${c1})~(${r2},${c2}) 영역의 합 = P[${r2}][${c2}] - P[${r1 - 1}][${c2}] - P[${r2}][${c1 - 1}] + P[${r1 - 1}][${c1 - 1}] = ${prefix[r2][c2]} - ${prefix[r1 - 1][c2]} - ${prefix[r2][c1 - 1]} + ${prefix[r1 - 1][c1 - 1]} = ${queryResult}`,
  })

  steps.push({
    type: 'table',
    headers: origHeaders,
    rows: origRows,
    highlightCell: [r1, c1 + 1],
    filledCells: Array.from({ length: (r2 - r1 + 1) * (c2 - c1 + 1) }, (_, idx) => {
      const ri = r1 + Math.floor(idx / (c2 - c1 + 1))
      const ci = c1 + (idx % (c2 - c1 + 1))
      return [ri, ci + 1] as [number, number]
    }),
    message: `검증: ${grid.slice(r1 - 1, r2).map(row => row.slice(c1 - 1, c2).join('+')).join(' + ')} = ${queryResult}. 포함-배제로 O(1) 쿼리 완료!`,
  })

  return steps
}

export const prefixSum2dViz: VisualizationConfig = {
  name: '2D 누적 합',
  description: '포함-배제 원리로 2D 누적 합 테이블을 구성하고 영역 합 쿼리를 시연합니다.',
  defaultInput: [1, 2, 3, 4, 5, 6, 7, 8, 9],
  generateSteps,
}
