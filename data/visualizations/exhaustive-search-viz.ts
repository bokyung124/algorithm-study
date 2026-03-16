import type { VisualizationConfig, VisualizationStep } from '../../types/visualization'

function generateSteps(input: number[] | { adjacency: Record<string, string[]> }): VisualizationStep[] {
  const arr = [...(input as number[])]
  const target = 10
  const steps: VisualizationStep[] = []

  steps.push({
    type: 'array',
    array: [...arr],
    message: `완전 탐색: 배열에서 3개를 골라 합이 ${target}인 조합을 찾습니다.`,
  })

  let found = false

  for (let i = 0; i < arr.length && !found; i++) {
    for (let j = i + 1; j < arr.length && !found; j++) {
      for (let k = j + 1; k < arr.length && !found; k++) {
        const sum = arr[i] + arr[j] + arr[k]

        steps.push({
          type: 'array',
          array: [...arr],
          comparing: [i, j, k],
          pointers: [
            { index: i, label: `${arr[i]}`, color: 'blue' },
            { index: j, label: `${arr[j]}`, color: 'green' },
            { index: k, label: `${arr[k]}`, color: 'red' },
          ],
          message: `${arr[i]} + ${arr[j]} + ${arr[k]} = ${sum} ${sum === target ? '= ' + target + ' ✓ 정답!' : '≠ ' + target}`,
        })

        if (sum === target) {
          steps.push({
            type: 'array',
            array: [...arr],
            sorted: [i, j, k],
            pointers: [
              { index: i, label: `${arr[i]}`, color: 'blue' },
              { index: j, label: `${arr[j]}`, color: 'green' },
              { index: k, label: `${arr[k]}`, color: 'red' },
            ],
            message: `정답 발견! ${arr[i]} + ${arr[j]} + ${arr[k]} = ${target}`,
          })
          found = true
        }
      }
    }
  }

  if (!found) {
    steps.push({
      type: 'array',
      array: [...arr],
      message: `합이 ${target}인 3개 조합이 없습니다.`,
    })
  }

  return steps
}

export const exhaustiveSearchViz: VisualizationConfig = {
  name: '완전 탐색',
  description: '3개 원소의 모든 조합을 시도하여 목표 합을 찾는 과정을 보여줍니다.',
  defaultInput: [1, 2, 3, 4, 5, 6],
  generateSteps,
}
