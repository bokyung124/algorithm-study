import type { VisualizationConfig, VisualizationStep } from '../../types/visualization'

function generateSteps(_input: number[] | { adjacency: Record<string, string[]> }): VisualizationStep[] {
  const base = 2
  const exp = 13
  const mod = 1000
  const steps: VisualizationStep[] = []
  const headers = ['단계', '지수(n)', '결과(result)', '밑(base)', '연산']

  const rows: (string | number | null)[][] = []
  const filled: [number, number][] = []

  steps.push({
    type: 'table',
    headers,
    rows: [['초기', exp, 1, base, '-']],
    message: `빠른 거듭제곱: ${base}^${exp} mod ${mod}을 계산합니다.`,
  })

  let result = 1
  let b = base
  let n = exp
  let step = 1

  while (n > 0) {
    const operation = n % 2 === 1 ? `홀수: result × base = ${result} × ${b} = ${(result * b) % mod}` : `짝수: base² = ${b} × ${b} = ${(b * b) % mod}`

    if (n % 2 === 1) {
      result = (result * b) % mod
    }

    const row: (string | number | null)[] = [step, n, result, b, n % 2 === 1 ? `result × base (mod ${mod})` : '건너뜀']
    rows.push([...row])
    filled.push([rows.length - 1, 2])

    steps.push({
      type: 'table',
      headers,
      rows: [...rows],
      highlightCell: [rows.length - 1, 2],
      filledCells: [...filled],
      message: `n=${n} (${n % 2 === 1 ? '홀수' : '짝수'}): ${operation}`,
    })

    n = Math.floor(n / 2)
    b = (b * b) % mod

    if (n > 0) {
      const squareRow: (string | number | null)[] = [step, n, result, b, `base² (mod ${mod})`]
      rows.push([...squareRow])
      filled.push([rows.length - 1, 3])

      steps.push({
        type: 'table',
        headers,
        rows: [...rows],
        highlightCell: [rows.length - 1, 3],
        filledCells: [...filled],
        message: `n을 2로 나눔: n=${n}, base를 제곱: base=${b}`,
      })
    }

    step++
  }

  steps.push({
    type: 'table',
    headers,
    rows: [...rows],
    filledCells: [...filled],
    message: `완료! ${base}^${exp} mod ${mod} = ${result}. O(log ${exp}) = ${Math.ceil(Math.log2(exp + 1))}번의 연산으로 계산했습니다.`,
  })

  return steps
}

export const fastExponentiationViz: VisualizationConfig = {
  name: '빠른 거듭제곱',
  description: '지수를 절반씩 줄여가며 거듭제곱을 계산하는 과정을 보여줍니다.',
  defaultInput: [2, 13],
  generateSteps,
}
