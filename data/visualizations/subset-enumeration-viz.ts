import type { VisualizationConfig, VisualizationStep } from '../../types/visualization'

function generateSteps(_input: number[] | { adjacency: Record<string, string[]> }): VisualizationStep[] {
  const items = ['A', 'B', 'C']
  const n = items.length
  const total = 1 << n
  const steps: VisualizationStep[] = []
  const headers = ['비트마스크', '이진', ...items, '부분집합']
  const rows: (string | number)[][] = []
  const filled: [number, number][] = []

  steps.push({ type: 'table', headers, rows: [], message: `${n}개 원소 {${items.join(', ')}}의 모든 부분집합을 비트마스크로 열거합니다. (총 ${total}개)` })

  for (let mask = 0; mask < total; mask++) {
    const bits = mask.toString(2).padStart(n, '0')
    const selected = items.filter((_, i) => mask & (1 << (n - 1 - i)))
    const row: (string | number)[] = [mask, bits, ...items.map((_, i) => mask & (1 << (n - 1 - i)) ? '✓' : '·'), selected.length > 0 ? `{${selected.join(',')}}` : '∅']
    rows.push(row)
    filled.push([rows.length - 1, n + 3])

    steps.push({ type: 'table', headers, rows: rows.map(r => [...r]), highlightCell: [rows.length - 1, n + 3], filledCells: [...filled], message: `마스크 ${mask} (${bits}): ${selected.length > 0 ? `{${selected.join(', ')}}` : '공집합'}` })
  }

  steps.push({ type: 'table', headers, rows: rows.map(r => [...r]), filledCells: [...filled], message: `총 ${total}개의 부분집합 열거 완료!` })
  return steps
}

export const subsetEnumerationViz: VisualizationConfig = {
  name: '부분집합 열거',
  description: '비트마스크로 모든 부분집합을 열거합니다.',
  defaultInput: [3],
  generateSteps,
}
