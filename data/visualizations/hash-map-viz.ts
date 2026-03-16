import type { VisualizationConfig, VisualizationStep } from '../../types/visualization'

function generateSteps(_input: number[] | { adjacency: Record<string, string[]> }): VisualizationStep[] {
  const keys = ['apple', 'banana', 'cherry', 'date', 'elderberry', 'fig']
  const bucketSize = 5
  const steps: VisualizationStep[] = []
  const headers = ['버킷', '저장된 키']
  const buckets: string[][] = Array.from({ length: bucketSize }, () => [])
  const filled: [number, number][] = []

  steps.push({ type: 'table', headers, rows: buckets.map((_, i) => [i, '-']), message: `해시맵: ${bucketSize}개 버킷에 ${keys.length}개 키를 저장합니다.` })

  for (const key of keys) {
    const hash = key.split('').reduce((s, c) => s + c.charCodeAt(0), 0) % bucketSize
    buckets[hash].push(key)
    filled.push([hash, 1])

    steps.push({ type: 'table', headers, rows: buckets.map((b, i) => [i, b.length > 0 ? b.join(', ') : '-']), highlightCell: [hash, 1], filledCells: [...new Set(filled.map(f => JSON.stringify(f)))].map(s => JSON.parse(s)), message: `hash("${key}") = ${hash}. 버킷 ${hash}에 저장${buckets[hash].length > 1 ? ' (충돌! 체이닝)' : ''}` })
  }

  steps.push({ type: 'table', headers, rows: buckets.map((b, i) => [i, b.length > 0 ? b.join(', ') : '-']), filledCells: [...new Set(filled.map(f => JSON.stringify(f)))].map(s => JSON.parse(s)), message: `해시맵 구성 완료! ${keys.length}개 키 저장` })
  return steps
}

export const hashMapViz: VisualizationConfig = {
  name: '해시 맵',
  description: '해시 함수로 키를 버킷에 매핑하고 충돌을 처리합니다.',
  defaultInput: [5],
  generateSteps,
}
