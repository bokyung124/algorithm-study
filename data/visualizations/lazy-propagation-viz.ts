import type { VisualizationConfig, VisualizationStep } from '../../types/visualization'

function generateSteps(_input: number[] | { adjacency: Record<string, string[]> }): VisualizationStep[] {
  const arr = [1, 3, 5, 7, 9]
  const steps: VisualizationStep[] = []
  const headers = ['인덱스', ...arr.map((_, i) => `[${i}]`)]

  steps.push({ type: 'table', headers, rows: [['값', ...arr], ['lazy', ...new Array(arr.length).fill(0)]], message: '지연 전파: 구간 업데이트를 지연시켜 효율적으로 처리합니다.' })

  // Simulate range update [1, 3] += 2
  const updateL = 1, updateR = 3, addVal = 2
  const lazy = new Array(arr.length).fill(0)
  for (let i = updateL; i <= updateR; i++) lazy[i] = addVal

  steps.push({ type: 'table', headers, rows: [['값', ...arr], ['lazy', ...lazy]], highlightCell: [1, updateL + 1], filledCells: Array.from({ length: updateR - updateL + 1 }, (_, i) => [1, updateL + 1 + i] as [number, number]), message: `구간 [${updateL},${updateR}]에 +${addVal} 업데이트. lazy 값 저장 (아직 반영 안 됨!)` })

  // Propagate
  for (let i = updateL; i <= updateR; i++) {
    arr[i] += lazy[i]
    lazy[i] = 0
    steps.push({ type: 'table', headers, rows: [['값', ...arr], ['lazy', ...lazy]], highlightCell: [0, i + 1], filledCells: [[0, i + 1]], message: `인덱스 ${i}: lazy 전파! 값 ${arr[i] - addVal} + ${addVal} = ${arr[i]}` })
  }

  // Another range update [0, 2] += 3
  const addVal2 = 3
  for (let i = 0; i <= 2; i++) lazy[i] = addVal2

  steps.push({ type: 'table', headers, rows: [['값', ...arr], ['lazy', ...lazy]], filledCells: [[1, 1], [1, 2], [1, 3]], message: `구간 [0,2]에 +${addVal2} 업데이트. lazy에 저장.` })

  for (let i = 0; i <= 2; i++) {
    arr[i] += lazy[i]
    lazy[i] = 0
  }

  steps.push({ type: 'table', headers, rows: [['값', ...arr], ['lazy', ...lazy]], filledCells: arr.map((_, i) => [0, i + 1] as [number, number]), message: `전파 완료! 최종 배열: [${arr.join(', ')}]` })
  return steps
}

export const lazyPropagationViz: VisualizationConfig = {
  name: '지연 전파',
  description: '세그먼트 트리에서 구간 업데이트를 지연시켜 처리합니다.',
  defaultInput: [1, 3, 5, 7, 9],
  generateSteps,
}
