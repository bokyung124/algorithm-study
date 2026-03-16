import type { VisualizationConfig, VisualizationStep } from '../../types/visualization'

function generateSteps(_input: number[] | { adjacency: Record<string, string[]> }): VisualizationStep[] {
  const activities = [
    { s: 1, e: 3 }, { s: 2, e: 5 }, { s: 4, e: 7 }, { s: 1, e: 8 },
    { s: 5, e: 9 }, { s: 8, e: 10 }, { s: 9, e: 11 }, { s: 11, e: 14 },
  ]
  activities.sort((a, b) => a.e - b.e)
  const steps: VisualizationStep[] = []

  const arr = activities.map(a => a.e)
  steps.push({ type: 'array', array: arr, message: `활동 선택: ${activities.length}개 활동을 종료 시간 기준 정렬. 겹치지 않는 최대 활동 수를 구합니다.` })

  const selected: number[] = []
  let lastEnd = 0

  for (let i = 0; i < activities.length; i++) {
    const a = activities[i]
    if (a.s >= lastEnd) {
      selected.push(i)
      lastEnd = a.e
      steps.push({ type: 'array', array: arr, sorted: [...selected], comparing: [i], message: `활동 [${a.s},${a.e}) 선택! (시작 ${a.s} ≥ 이전 종료 ${lastEnd - a.e + a.s}). 총 ${selected.length}개` })
    } else {
      steps.push({ type: 'array', array: arr, swapped: [i], comparing: [i], message: `활동 [${a.s},${a.e}) 제외 (시작 ${a.s} < 이전 종료 ${lastEnd})` })
    }
  }

  steps.push({ type: 'array', array: arr, sorted: selected, message: `최대 ${selected.length}개 활동 선택 완료!` })
  return steps
}

export const activitySelectionViz: VisualizationConfig = {
  name: '활동 선택 문제',
  description: '종료 시간 기준 그리디로 겹치지 않는 최대 활동을 선택합니다.',
  defaultInput: [3, 5, 7, 8, 9, 10, 11, 14],
  generateSteps,
}
