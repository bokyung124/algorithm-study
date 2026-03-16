import type { VisualizationConfig, VisualizationStep } from '../../types/visualization'

function generateSteps(_input: number[] | { adjacency: Record<string, string[]> }): VisualizationStep[] {
  const a = 13, b = 10 // 1101, 1010
  const steps: VisualizationStep[] = []
  const headers = ['연산', 'A (이진)', 'B (이진)', '결과 (이진)', '결과 (십진)']
  const rows: (string | number)[][] = []
  const filled: [number, number][] = []

  const bin = (n: number) => n.toString(2).padStart(4, '0')

  steps.push({ type: 'table', headers, rows: [['', bin(a), bin(b), '-', '-']], message: `비트 연산: A=${a}(${bin(a)}), B=${b}(${bin(b)})` })

  const ops: [string, number][] = [
    [`A & B`, a & b],
    [`A | B`, a | b],
    [`A ^ B`, a ^ b],
    [`~A`, (~a) & 0xF],
    [`A << 1`, (a << 1) & 0xFF],
    [`A >> 1`, a >> 1],
  ]

  for (const [op, result] of ops) {
    rows.push([op, bin(a), bin(b), bin(result), result])
    filled.push([rows.length - 1, 3])
    steps.push({ type: 'table', headers, rows: rows.map(r => [...r]), highlightCell: [rows.length - 1, 3], filledCells: [...filled], message: `${op} = ${bin(result)} (${result})` })
  }

  steps.push({ type: 'table', headers, rows: rows.map(r => [...r]), filledCells: [...filled], message: '비트 연산 완료!' })
  return steps
}

export const bitOperationsViz: VisualizationConfig = {
  name: '비트 연산',
  description: 'AND, OR, XOR, NOT, SHIFT 연산을 보여줍니다.',
  defaultInput: [13, 10],
  generateSteps,
}
