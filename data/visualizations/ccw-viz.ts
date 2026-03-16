import type { VisualizationConfig, VisualizationStep } from '../../types/visualization'

function generateSteps(input: number[] | { adjacency: Record<string, string[]> }): VisualizationStep[] {
  const arr = input as number[]
  const steps: VisualizationStep[] = []

  const x1 = arr[0], y1 = arr[1]
  const x2 = arr[2], y2 = arr[3]
  const x3 = arr[4], y3 = arr[5]

  steps.push({
    type: 'array',
    array: arr,
    pointers: [
      { index: 0, label: 'P1x', color: '#6366f1' },
      { index: 1, label: 'P1y', color: '#6366f1' },
      { index: 2, label: 'P2x', color: '#ef4444' },
      { index: 3, label: 'P2y', color: '#ef4444' },
      { index: 4, label: 'P3x', color: '#10b981' },
      { index: 5, label: 'P3y', color: '#10b981' },
    ],
    message: `세 점 P1(${x1},${y1}), P2(${x2},${y2}), P3(${x3},${y3})의 방향을 판별합니다.`,
  })

  const vecAx = x2 - x1
  const vecAy = y2 - y1
  const vecBx = x3 - x1
  const vecBy = y3 - y1

  steps.push({
    type: 'array',
    array: [vecAx, vecAy, vecBx, vecBy],
    pointers: [
      { index: 0, label: 'Ax', color: '#ef4444' },
      { index: 1, label: 'Ay', color: '#ef4444' },
      { index: 2, label: 'Bx', color: '#10b981' },
      { index: 3, label: 'By', color: '#10b981' },
    ],
    message: `벡터 A = P1→P2 = (${vecAx}, ${vecAy}), 벡터 B = P1→P3 = (${vecBx}, ${vecBy})`,
  })

  const cross = vecAx * vecBy - vecAy * vecBx

  steps.push({
    type: 'array',
    array: [vecAx, vecBy, vecAy, vecBx],
    comparing: [0, 1],
    pointers: [
      { index: 0, label: 'Ax', color: '#ef4444' },
      { index: 1, label: 'By', color: '#10b981' },
      { index: 2, label: 'Ay', color: '#ef4444' },
      { index: 3, label: 'Bx', color: '#10b981' },
    ],
    message: `외적 = Ax*By - Ay*Bx = ${vecAx}*${vecBy} - ${vecAy}*${vecBx} = ${vecAx * vecBy} - ${vecAy * vecBx} = ${cross}`,
  })

  let direction: string
  if (cross > 0) {
    direction = '반시계 방향 (CCW)'
  } else if (cross < 0) {
    direction = '시계 방향 (CW)'
  } else {
    direction = '일직선 (Collinear)'
  }

  steps.push({
    type: 'array',
    array: [cross],
    sorted: [0],
    message: `외적 = ${cross} → ${direction}`,
  })

  return steps
}

export const ccwViz: VisualizationConfig = {
  name: 'CCW (Counter-Clockwise)',
  description: '세 점의 방향을 외적으로 판별합니다.',
  defaultInput: [0, 0, 4, 0, 2, 3],
  generateSteps,
}
