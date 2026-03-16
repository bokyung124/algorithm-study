import type { VisualizationConfig, VisualizationStep } from '../../types/visualization'

function generateSteps(input: number[] | { adjacency: Record<string, string[]> }): VisualizationStep[] {
  const arr = [...(input as number[])]
  const steps: VisualizationStep[] = []

  steps.push({
    type: 'array',
    array: [...arr],
    message: '기본 시뮬레이션: 명령에 따라 배열의 원소를 이동시킵니다.',
  })

  // 시뮬레이션: 가장 작은 원소를 찾아 맨 앞으로 이동 (선택 정렬 방식)
  for (let i = 0; i < arr.length - 1; i++) {
    let minIdx = i
    for (let j = i + 1; j < arr.length; j++) {
      steps.push({
        type: 'array',
        array: [...arr],
        comparing: [minIdx, j],
        sorted: Array.from({ length: i }, (_, k) => k),
        message: `${i + 1}번째 위치에 올 원소 탐색: ${arr[minIdx]}와 ${arr[j]} 비교.`,
      })
      if (arr[j] < arr[minIdx]) {
        minIdx = j
      }
    }

    if (minIdx !== i) {
      steps.push({
        type: 'array',
        array: [...arr],
        comparing: [i, minIdx],
        sorted: Array.from({ length: i }, (_, k) => k),
        pointers: [
          { index: i, label: '목표', color: 'blue' },
          { index: minIdx, label: '최소', color: 'red' },
        ],
        message: `최솟값 ${arr[minIdx]}을 위치 ${i}로 이동합니다.`,
      })
      ;[arr[i], arr[minIdx]] = [arr[minIdx], arr[i]]
      steps.push({
        type: 'array',
        array: [...arr],
        swapped: [i, minIdx],
        sorted: Array.from({ length: i + 1 }, (_, k) => k),
        message: `교환 완료! ${arr[i]}이 ${i}번째 위치에 확정되었습니다.`,
      })
    } else {
      steps.push({
        type: 'array',
        array: [...arr],
        sorted: Array.from({ length: i + 1 }, (_, k) => k),
        message: `${arr[i]}은 이미 올바른 위치에 있습니다.`,
      })
    }
  }

  steps.push({
    type: 'array',
    array: [...arr],
    sorted: Array.from({ length: arr.length }, (_, k) => k),
    message: `시뮬레이션 완료! 결과: [${arr.join(', ')}]`,
  })

  return steps
}

export const simulationBasicViz: VisualizationConfig = {
  name: '기본 시뮬레이션',
  description: '명령에 따라 배열 원소를 조작하는 시뮬레이션 과정입니다.',
  defaultInput: [4, 2, 7, 1, 5, 3],
  generateSteps,
}
