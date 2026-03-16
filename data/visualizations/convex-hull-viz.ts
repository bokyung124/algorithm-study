import type { VisualizationConfig, VisualizationStep } from '../../types/visualization'

function generateSteps(input: number[] | { adjacency: Record<string, string[]> }): VisualizationStep[] {
  const arr = input as number[]
  const steps: VisualizationStep[] = []

  // 좌표 배열을 점 목록으로 변환
  const points: [number, number][] = []
  for (let i = 0; i < arr.length; i += 2) {
    points.push([arr[i], arr[i + 1]])
  }

  // 점을 flat array로 표현
  const flatPoints = arr.slice()

  steps.push({
    type: 'array',
    array: flatPoints,
    message: `${points.length}개의 점: ${points.map((p, i) => `P${i}(${p[0]},${p[1]})`).join(', ')}. 볼록 껍질을 구합니다.`,
  })

  // x좌표 기준 정렬
  const sorted = points.slice().sort((a, b) => a[0] - b[0] || a[1] - b[1])
  const sortedFlat = sorted.flatMap(p => p)

  steps.push({
    type: 'array',
    array: sortedFlat,
    sorted: Array.from({ length: sortedFlat.length }, (_, i) => i),
    message: `x좌표 기준 정렬: ${sorted.map(p => `(${p[0]},${p[1]})`).join(', ')}`,
  })

  function cross(o: [number, number], a: [number, number], b: [number, number]): number {
    return (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0])
  }

  // 아래쪽 껍질
  const lower: [number, number][] = []
  for (let i = 0; i < sorted.length; i++) {
    const p = sorted[i]
    while (lower.length >= 2 && cross(lower[lower.length - 2], lower[lower.length - 1], p) <= 0) {
      const removed = lower.pop()!
      steps.push({
        type: 'array',
        array: sortedFlat,
        comparing: [i * 2, i * 2 + 1],
        pointers: [
          { index: i * 2, label: 'cur', color: '#ef4444' },
        ],
        message: `아래 껍질: (${removed[0]},${removed[1]})은 시계 방향이므로 제거. 스택: [${lower.map(pt => `(${pt[0]},${pt[1]})`).join(', ')}]`,
      })
    }
    lower.push(p)

    steps.push({
      type: 'array',
      array: sortedFlat,
      pointers: [
        { index: i * 2, label: 'add', color: '#10b981' },
      ],
      message: `아래 껍질에 (${p[0]},${p[1]}) 추가. 스택: [${lower.map(pt => `(${pt[0]},${pt[1]})`).join(', ')}]`,
    })
  }

  steps.push({
    type: 'array',
    array: lower.flatMap(p => p),
    sorted: Array.from({ length: lower.length * 2 }, (_, i) => i),
    message: `아래 껍질 완성: [${lower.map(p => `(${p[0]},${p[1]})`).join(', ')}]`,
  })

  // 위쪽 껍질
  const upper: [number, number][] = []
  for (let i = sorted.length - 1; i >= 0; i--) {
    const p = sorted[i]
    while (upper.length >= 2 && cross(upper[upper.length - 2], upper[upper.length - 1], p) <= 0) {
      const removed = upper.pop()!
      steps.push({
        type: 'array',
        array: sortedFlat,
        comparing: [i * 2, i * 2 + 1],
        pointers: [
          { index: i * 2, label: 'cur', color: '#ef4444' },
        ],
        message: `위 껍질: (${removed[0]},${removed[1]})은 시계 방향이므로 제거. 스택: [${upper.map(pt => `(${pt[0]},${pt[1]})`).join(', ')}]`,
      })
    }
    upper.push(p)

    steps.push({
      type: 'array',
      array: sortedFlat,
      pointers: [
        { index: i * 2, label: 'add', color: '#6366f1' },
      ],
      message: `위 껍질에 (${p[0]},${p[1]}) 추가. 스택: [${upper.map(pt => `(${pt[0]},${pt[1]})`).join(', ')}]`,
    })
  }

  // 최종 결과
  const hull = lower.slice(0, -1).concat(upper.slice(0, -1))
  const hullFlat = hull.flatMap(p => p)

  steps.push({
    type: 'array',
    array: hullFlat,
    sorted: Array.from({ length: hullFlat.length }, (_, i) => i),
    message: `볼록 껍질 완성! ${hull.length}개의 점: [${hull.map(p => `(${p[0]},${p[1]})`).join(', ')}]`,
  })

  return steps
}

export const convexHullViz: VisualizationConfig = {
  name: '볼록 껍질 (Convex Hull)',
  description: 'Andrew의 Monotone Chain으로 볼록 껍질을 구합니다.',
  defaultInput: [1, 1, 3, 2, 5, 1, 4, 4, 2, 5, 0, 3],
  generateSteps,
}
