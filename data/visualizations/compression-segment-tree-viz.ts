import type { VisualizationConfig, VisualizationStep } from '../../types/visualization'

function generateSteps(input: number[] | { adjacency: Record<string, string[]> }): VisualizationStep[] {
  const arr = input as number[]
  const steps: VisualizationStep[] = []

  steps.push({
    type: 'array',
    array: [...arr],
    message: `원본 배열: [${arr.join(', ')}] — 좌표 압축 후 BIT로 역전 수를 구합니다.`,
  })

  // 좌표 압축
  const sorted = [...new Set(arr)].sort((a, b) => a - b)
  const compress = new Map<number, number>()
  sorted.forEach((v, i) => compress.set(v, i + 1))

  steps.push({
    type: 'array',
    array: [...sorted],
    sorted: sorted.map((_, i) => i),
    pointers: sorted.map((v, i) => ({
      index: i,
      label: `${v}→${i + 1}`,
      color: '#3b82f6',
    })),
    message: `좌표 압축: ${sorted.map((v, i) => `${v}→${i + 1}`).join(', ')}`,
  })

  const compressed = arr.map((x) => compress.get(x)!)
  steps.push({
    type: 'array',
    array: [...compressed],
    sorted: compressed.map((_, i) => i),
    message: `압축된 배열: [${compressed.join(', ')}] — 이제 BIT에서 사용할 수 있습니다.`,
  })

  // BIT로 역전 수 구하기
  const m = sorted.length
  const bit = new Array(m + 2).fill(0)

  function update(i: number) {
    while (i <= m) {
      bit[i] += 1
      i += i & -i
    }
  }

  function query(i: number): number {
    let s = 0
    while (i > 0) {
      s += bit[i]
      i -= i & -i
    }
    return s
  }

  let inversion = 0

  steps.push({
    type: 'array',
    array: [...compressed],
    message: `뒤에서부터 순회하며, 현재 값보다 작은 값이 이미 몇 개 삽입되었는지 BIT로 셉니다.`,
  })

  for (let i = compressed.length - 1; i >= 0; i--) {
    const c = compressed[i]
    const smaller = query(c - 1)
    inversion += smaller

    steps.push({
      type: 'array',
      array: [...compressed],
      comparing: [i],
      pointers: [
        { index: i, label: `query(${c - 1})=${smaller}`, color: '#ef4444' },
      ],
      message: `i=${i}, 값=${c}: 앞에 삽입된 더 작은 수 ${smaller}개 → 누적 역전 수 = ${inversion}`,
    })

    update(c)

    steps.push({
      type: 'array',
      array: [...compressed],
      comparing: [i],
      sorted: Array.from({ length: compressed.length - i }, (_, k) => compressed.length - 1 - k),
      pointers: [
        { index: i, label: `BIT에 ${c} 삽입`, color: '#10b981' },
      ],
      message: `BIT에 값 ${c}을 삽입했습니다.`,
    })
  }

  steps.push({
    type: 'array',
    array: [...compressed],
    sorted: compressed.map((_, i) => i),
    message: `완료! 총 역전 수(inversion count) = ${inversion}`,
  })

  return steps
}

export const compressionSegmentTreeViz: VisualizationConfig = {
  name: '좌표 압축 + BIT (역전 수)',
  description: '좌표 압축 후 BIT(펜윅 트리)를 사용하여 역전 수를 구하는 과정을 시각화합니다.',
  defaultInput: [5, 2, 8, 1, 3],
  generateSteps,
}
