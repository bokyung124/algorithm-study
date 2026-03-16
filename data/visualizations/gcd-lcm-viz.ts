import type { VisualizationConfig, VisualizationStep } from '../../types/visualization'

function generateSteps(_input: number[] | { adjacency: Record<string, string[]> }): VisualizationStep[] {
  let a = 48, b = 18
  const steps: VisualizationStep[] = []
  const headers = ['단계', 'a', 'b', 'a % b']
  const rows: (string | number)[][] = []

  steps.push({ type: 'table', headers, rows: [[0, a, b, '-']], message: `유클리드 알고리즘: gcd(${a}, ${b})를 구합니다.` })

  let step = 1
  const origA = a, origB = b
  while (b !== 0) {
    const r = a % b
    rows.push([step, a, b, r])
    steps.push({ type: 'table', headers, rows: rows.map(row => [...row]), highlightCell: [rows.length - 1, 3], filledCells: rows.map((_, i) => [i, 3] as [number, number]), message: `${a} % ${b} = ${r}${r === 0 ? '. b가 0이면 a가 GCD!' : ''}` })
    a = b
    b = r
    step++
  }

  const gcd = a
  const lcm = (origA * origB) / gcd
  steps.push({ type: 'table', headers, rows: rows.map(row => [...row]), filledCells: rows.map((_, i) => [i, 3] as [number, number]), message: `GCD(${origA}, ${origB}) = ${gcd}, LCM = ${origA}×${origB}/${gcd} = ${lcm}` })
  return steps
}

export const gcdLcmViz: VisualizationConfig = {
  name: 'GCD / LCM',
  description: '유클리드 알고리즘으로 최대공약수를 구합니다.',
  defaultInput: [48, 18],
  generateSteps,
}
