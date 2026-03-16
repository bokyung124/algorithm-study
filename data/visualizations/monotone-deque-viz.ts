import type { VisualizationConfig, VisualizationStep } from '../../types/visualization'

function generateSteps(input: number[] | { adjacency: Record<string, string[]> }): VisualizationStep[] {
  const arr = input as number[]
  const k = 3
  const steps: VisualizationStep[] = []

  steps.push({
    type: 'array',
    array: arr,
    message: `모노톤 덱으로 크기 ${k}인 슬라이딩 윈도우의 최댓값을 구합니다.`,
  })

  const dq: number[] = [] // 인덱스 저장, 값은 단조 감소
  const result: number[] = []

  for (let i = 0; i < arr.length; i++) {
    // 1. 윈도우 밖 원소 제거
    if (dq.length > 0 && dq[0] <= i - k) {
      const removed = dq.shift()!
      steps.push({
        type: 'array',
        array: arr,
        windowStart: Math.max(0, i - k + 1),
        windowEnd: i,
        pointers: [
          { index: removed, label: '만료', color: 'red' },
          { index: i, label: '현재', color: 'blue' },
        ],
        message: `인덱스 ${removed}(값 ${arr[removed]})이 윈도우 밖으로 나갔으므로 덱 앞에서 제거합니다.`,
      })
    }

    // 2. 단조 감소 유지: 새 원소보다 작은 원소 뒤에서 제거
    const removedFromBack: number[] = []
    while (dq.length > 0 && arr[dq[dq.length - 1]] <= arr[i]) {
      removedFromBack.push(dq.pop()!)
    }

    if (removedFromBack.length > 0) {
      steps.push({
        type: 'array',
        array: arr,
        windowStart: Math.max(0, i - k + 1),
        windowEnd: i,
        comparing: [i, ...removedFromBack],
        pointers: [
          { index: i, label: `신규(${arr[i]})`, color: 'blue' },
          ...removedFromBack.map((idx) => ({
            index: idx,
            label: `제거(${arr[idx]})`,
            color: 'red' as string,
          })),
        ],
        message: `arr[${i}]=${arr[i]}보다 작거나 같은 원소 ${removedFromBack.map((idx) => `arr[${idx}]=${arr[idx]}`).join(', ')}를 덱 뒤에서 제거합니다.`,
      })
    }

    // 3. 새 원소 삽입
    dq.push(i)
    const dequeValues = dq.map((idx) => `${arr[idx]}(i${idx})`)

    steps.push({
      type: 'array',
      array: arr,
      windowStart: Math.max(0, i - k + 1),
      windowEnd: i,
      comparing: [...dq],
      pointers: [{ index: i, label: '삽입', color: 'green' }],
      message: `인덱스 ${i}(값 ${arr[i]})을 덱에 삽입. 덱: [${dequeValues.join(', ')}]`,
    })

    // 4. 윈도우가 k개 이상이면 최댓값 기록
    if (i >= k - 1) {
      result.push(arr[dq[0]])
      steps.push({
        type: 'array',
        array: arr,
        windowStart: i - k + 1,
        windowEnd: i,
        sorted: [dq[0]],
        pointers: [
          { index: dq[0], label: `최대=${arr[dq[0]]}`, color: 'green' },
        ],
        message: `윈도우 [${i - k + 1}..${i}]의 최댓값: ${arr[dq[0]]}. 결과: [${result.join(', ')}]`,
      })
    }
  }

  steps.push({
    type: 'array',
    array: arr,
    message: `완료! 슬라이딩 윈도우 최댓값: [${result.join(', ')}]. 전체 시간복잡도: O(N)`,
  })

  return steps
}

export const monotoneDequeViz: VisualizationConfig = {
  name: '모노톤 덱 (슬라이딩 윈도우 최댓값)',
  description: '단조 감소 덱을 유지하여 크기 K 윈도우의 최댓값을 O(N)에 구합니다.',
  defaultInput: [1, 3, -1, -3, 5, 3, 6, 7],
  generateSteps,
}
