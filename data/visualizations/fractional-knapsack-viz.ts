import type { VisualizationConfig, VisualizationStep } from '../../types/visualization'

function generateSteps(_input: number[] | { adjacency: Record<string, string[]> }): VisualizationStep[] {
  const items = [{ w: 10, v: 60 }, { w: 20, v: 100 }, { w: 30, v: 120 }]
  items.sort((a, b) => b.v / b.w - a.v / a.w)
  const W = 50
  const steps: VisualizationStep[] = []
  const headers = ['물건', '무게', '가치', '가치/무게', '선택량']
  const rows: (string | number)[][] = items.map((it, i) => [`#${i + 1}`, it.w, it.v, (it.v / it.w).toFixed(1), '-'])

  steps.push({ type: 'table', headers, rows: rows.map(r => [...r]), message: `분할 배낭: 용량 ${W}, 가치/무게 비율 기준 정렬` })

  let remaining = W
  let totalValue = 0

  for (let i = 0; i < items.length; i++) {
    const take = Math.min(items[i].w, remaining)
    const fraction = take / items[i].w
    const gained = fraction * items[i].v
    totalValue += gained
    remaining -= take
    rows[i][4] = take === items[i].w ? '전부' : `${take}/${items[i].w}`

    steps.push({ type: 'table', headers, rows: rows.map(r => [...r]), highlightCell: [i, 4], filledCells: Array.from({ length: i + 1 }, (_, k) => [k, 4] as [number, number]), message: `물건 #${i + 1}: ${take}/${items[i].w} 선택 (가치 +${gained.toFixed(0)}). 총 가치: ${totalValue.toFixed(0)}, 남은 용량: ${remaining}` })

    if (remaining === 0) break
  }

  steps.push({ type: 'table', headers, rows: rows.map(r => [...r]), filledCells: items.map((_, i) => [i, 4] as [number, number]), message: `최대 가치: ${totalValue.toFixed(0)}` })
  return steps
}

export const fractionalKnapsackViz: VisualizationConfig = {
  name: '분할 배낭 문제',
  description: '가치/무게 비율 순으로 물건을 넣습니다.',
  defaultInput: [10, 20, 30],
  generateSteps,
}
