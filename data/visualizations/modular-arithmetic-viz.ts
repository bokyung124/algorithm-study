import type { VisualizationConfig, VisualizationStep } from '../../types/visualization'

function generateSteps(_input: number[] | { adjacency: Record<string, string[]> }): VisualizationStep[] {
  const steps: VisualizationStep[] = []
  const base = 2, exp = 10, mod = 1000
  const headers = ['단계', '지수(비트)', '현재 결과', '연산']
  const rows: (string | number)[][] = []

  steps.push({ type: 'table', headers, rows: [], message: `거듭제곱 모듈러: ${base}^${exp} mod ${mod}을 빠른 거듭제곱으로 계산합니다.` })

  let result = 1, b = base, e = exp, step = 0
  const bits = exp.toString(2)

  while (e > 0) {
    if (e & 1) {
      result = (result * b) % mod
      rows.push([step, `${bits[bits.length - 1 - step]} (1)`, result, `result = ${result} × ${b} mod ${mod} = ${result}`])
    } else {
      rows.push([step, `${bits[bits.length - 1 - step] ?? 0} (0)`, result, `건너뜀`])
    }

    steps.push({ type: 'table', headers, rows: rows.map(r => [...r]), highlightCell: [rows.length - 1, 2], filledCells: rows.map((_, i) => [i, 2] as [number, number]), message: `비트 ${step}: e=${e}, base=${b}, result=${result}` })

    b = (b * b) % mod
    e >>= 1
    step++
  }

  steps.push({ type: 'table', headers, rows: rows.map(r => [...r]), filledCells: rows.map((_, i) => [i, 2] as [number, number]), message: `${base}^${exp} mod ${mod} = ${result}` })
  return steps
}

export const modularArithmeticViz: VisualizationConfig = {
  name: '모듈러 연산',
  description: '빠른 거듭제곱으로 모듈러 연산을 수행합니다.',
  defaultInput: [2, 10],
  generateSteps,
}
