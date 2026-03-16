import type { VisualizationConfig, VisualizationStep } from '../../types/visualization'

function generateSteps(input: number[] | { adjacency: Record<string, string[]> }): VisualizationStep[] {
  const arr = input as number[]
  const steps: VisualizationStep[] = []

  // 구간 목록 생성
  const intervals: [number, number][] = []
  for (let i = 0; i < arr.length; i += 2) {
    intervals.push([arr[i], arr[i + 1]])
  }

  steps.push({
    type: 'array',
    array: arr,
    message: `${intervals.length}개의 회의: ${intervals.map(iv => `[${iv[0]}, ${iv[1]}]`).join(', ')}. 최소 회의실 수를 구합니다.`,
  })

  // 이벤트 생성: (시간, +1/-1)
  const events: [number, number][] = []
  for (const [start, end] of intervals) {
    events.push([start, 1])
    events.push([end, -1])
  }
  events.sort((a, b) => a[0] - b[0] || a[1] - b[1])

  const eventFlat = events.flatMap(e => e)
  steps.push({
    type: 'array',
    array: eventFlat,
    sorted: Array.from({ length: eventFlat.length }, (_, i) => i),
    message: `이벤트 생성 및 정렬: ${events.map(e => `(${e[0]}, ${e[1] > 0 ? '+1' : '-1'})`).join(', ')}`,
  })

  // 스위핑
  let currentRooms = 0
  let maxRooms = 0

  for (let i = 0; i < events.length; i++) {
    const [time, delta] = events[i]
    currentRooms += delta

    const ptrIdx = i * 2
    const eventType = delta > 0 ? '시작' : '종료'
    const color = delta > 0 ? '#ef4444' : '#10b981'

    if (currentRooms > maxRooms) {
      maxRooms = currentRooms
      steps.push({
        type: 'array',
        array: eventFlat,
        pointers: [
          { index: ptrIdx, label: 't', color },
          { index: ptrIdx + 1, label: eventType, color },
        ],
        comparing: [ptrIdx, ptrIdx + 1],
        message: `시간 ${time}: 회의 ${eventType} → 현재 ${currentRooms}개 (최대 갱신! ${maxRooms}개)`,
      })
    } else {
      steps.push({
        type: 'array',
        array: eventFlat,
        pointers: [
          { index: ptrIdx, label: 't', color },
          { index: ptrIdx + 1, label: eventType, color },
        ],
        message: `시간 ${time}: 회의 ${eventType} → 현재 ${currentRooms}개 (최대: ${maxRooms}개)`,
      })
    }
  }

  steps.push({
    type: 'array',
    array: [maxRooms],
    sorted: [0],
    message: `완료! 동시에 필요한 최소 회의실 수: ${maxRooms}개`,
  })

  return steps
}

export const eventSweepingViz: VisualizationConfig = {
  name: '이벤트 스위핑',
  description: '시작/종료 이벤트를 처리하여 최소 회의실 수를 구합니다.',
  defaultInput: [1, 3, 2, 5, 4, 7, 6, 8],
  generateSteps,
}
