import type { VisualizationConfig, VisualizationStep } from '../../types/visualization'

function generateSteps(_input: number[] | { adjacency: Record<string, string[]> }): VisualizationStep[] {
  const n = 5
  const steps: VisualizationStep[] = []
  const dx = [-1, 0, 1, 0]
  const dy = [0, 1, 0, -1]
  const dirNames = ['↑(상)', '→(우)', '↓(하)', '←(좌)']

  // 로봇 이동 시뮬레이션: 벽에 부딪히면 오른쪽으로 회전
  let r = 0, c = 0, d = 1 // 시작: (0,0), 방향: 우
  const path: [number, number][] = [[0, 0]]

  steps.push({
    type: 'grid',
    grid: Array.from({ length: n }, () => new Array(n).fill(0)),
    size: n,
    placed: [[0, 0]],
    current: [0, 0],
    message: `로봇 이동 시뮬레이션: (0,0)에서 시작, 방향: ${dirNames[d]}. 벽에 부딪히면 오른쪽으로 회전합니다.`,
  })

  for (let step = 0; step < 15; step++) {
    const nr = r + dx[d]
    const nc = c + dy[d]

    if (nr < 0 || nr >= n || nc < 0 || nc >= n) {
      // 벽에 부딪힘 → 오른쪽 회전
      const oldDir = d
      d = (d + 1) % 4

      steps.push({
        type: 'grid',
        grid: Array.from({ length: n }, () => new Array(n).fill(0)),
        size: n,
        placed: [...path],
        current: [r, c],
        message: `(${r},${c})에서 ${dirNames[oldDir]} 이동 불가 (벽). ${dirNames[d]}으로 회전합니다.`,
      })
    } else {
      r = nr
      c = nc
      path.push([r, c])

      steps.push({
        type: 'grid',
        grid: Array.from({ length: n }, () => new Array(n).fill(0)),
        size: n,
        placed: [...path],
        current: [r, c],
        message: `${dirNames[d]} 이동 → (${r},${c}). ${path.length}칸 방문.`,
      })
    }
  }

  steps.push({
    type: 'grid',
    grid: Array.from({ length: n }, () => new Array(n).fill(0)),
    size: n,
    placed: [...path],
    current: [r, c],
    message: `시뮬레이션 완료! 최종 위치: (${r},${c}), 총 ${path.length}칸 방문.`,
  })

  return steps
}

export const gridMovementViz: VisualizationConfig = {
  name: '격자 이동 시뮬레이션',
  description: '격자 위에서 로봇이 방향 전환하며 이동하는 과정을 보여줍니다.',
  defaultInput: [5],
  generateSteps,
}
