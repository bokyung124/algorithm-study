import type { VisualizationConfig, VisualizationStep } from '../../types/visualization'

function generateSteps(_input: number[] | { adjacency: Record<string, string[]> }): VisualizationStep[] {
  const coins = [500, 100, 50, 10]
  const amount = 1260
  const steps: VisualizationStep[] = []
  const headers = ['동전', '사용 개수', '남은 금액']
  const rows: (string | number)[][] = coins.map(c => [c, 0, '-'])

  steps.push({ type: 'table', headers, rows: rows.map(r => [...r]), message: `거스름돈 ${amount}원을 최소 동전 수로 만듭니다. 동전: [${coins.join(', ')}]` })

  let remaining = amount
  const filled: [number, number][] = []

  for (let i = 0; i < coins.length; i++) {
    const count = Math.floor(remaining / coins[i])
    rows[i][1] = count
    remaining -= count * coins[i]
    rows[i][2] = remaining
    filled.push([i, 1])

    steps.push({ type: 'table', headers, rows: rows.map(r => [...r]), highlightCell: [i, 1], filledCells: [...filled], message: `${coins[i]}원 × ${count}개 = ${count * coins[i]}원. 남은 금액: ${remaining}원` })
  }

  const total = coins.reduce((s, _c, i) => s + (rows[i][1] as number), 0)
  steps.push({ type: 'table', headers, rows: rows.map(r => [...r]), filledCells: [...filled], message: `완료! 총 ${total}개의 동전 사용` })
  return steps
}

export const coinChangeGreedyViz: VisualizationConfig = {
  name: '거스름돈 (그리디)',
  description: '큰 동전부터 선택하여 최소 동전 수를 구합니다.',
  defaultInput: [500, 100, 50, 10],
  generateSteps,
}
