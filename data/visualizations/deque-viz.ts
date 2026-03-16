import type { VisualizationConfig, VisualizationStep } from '../../types/visualization'

function generateSteps(_input: number[] | { adjacency: Record<string, string[]> }): VisualizationStep[] {
  const steps: VisualizationStep[] = []
  const dq: string[] = []

  steps.push({
    type: 'stack',
    items: [],
    message: '빈 덱에서 시작합니다. 양쪽 끝에서 삽입/삭제가 가능합니다.',
  })

  // append(1) - 오른쪽 삽입
  dq.push('1')
  steps.push({
    type: 'stack',
    items: [...dq],
    action: 'push',
    highlight: dq.length - 1,
    message: 'append(1): 오른쪽 끝에 1을 삽입합니다. 덱: [1]',
  })

  // append(2) - 오른쪽 삽입
  dq.push('2')
  steps.push({
    type: 'stack',
    items: [...dq],
    action: 'push',
    highlight: dq.length - 1,
    message: 'append(2): 오른쪽 끝에 2를 삽입합니다. 덱: [1, 2]',
  })

  // appendleft(0) - 왼쪽 삽입
  dq.unshift('0')
  steps.push({
    type: 'stack',
    items: [...dq],
    action: 'push',
    highlight: 0,
    message: 'appendleft(0): 왼쪽 끝에 0을 삽입합니다. 덱: [0, 1, 2]',
  })

  // append(3) - 오른쪽 삽입
  dq.push('3')
  steps.push({
    type: 'stack',
    items: [...dq],
    action: 'push',
    highlight: dq.length - 1,
    message: 'append(3): 오른쪽 끝에 3을 삽입합니다. 덱: [0, 1, 2, 3]',
  })

  // appendleft(-1) - 왼쪽 삽입
  dq.unshift('-1')
  steps.push({
    type: 'stack',
    items: [...dq],
    action: 'push',
    highlight: 0,
    message: 'appendleft(-1): 왼쪽 끝에 -1을 삽입합니다. 덱: [-1, 0, 1, 2, 3]',
  })

  // popleft() - 왼쪽 삭제
  const leftVal = dq.shift()
  steps.push({
    type: 'stack',
    items: [...dq],
    action: 'pop',
    highlight: 0,
    message: `popleft(): 왼쪽 끝에서 ${leftVal}을 제거합니다. 덱: [${dq.join(', ')}]`,
  })

  // pop() - 오른쪽 삭제
  const rightVal = dq.pop()
  steps.push({
    type: 'stack',
    items: [...dq],
    action: 'pop',
    highlight: dq.length,
    message: `pop(): 오른쪽 끝에서 ${rightVal}을 제거합니다. 덱: [${dq.join(', ')}]`,
  })

  // appendleft(5) - 왼쪽 삽입
  dq.unshift('5')
  steps.push({
    type: 'stack',
    items: [...dq],
    action: 'push',
    highlight: 0,
    message: 'appendleft(5): 왼쪽 끝에 5를 삽입합니다. 덱: [5, 0, 1, 2]',
  })

  // popleft() - 왼쪽 삭제
  const leftVal2 = dq.shift()
  steps.push({
    type: 'stack',
    items: [...dq],
    action: 'pop',
    highlight: 0,
    message: `popleft(): 왼쪽 끝에서 ${leftVal2}을 제거합니다. 덱: [${dq.join(', ')}]`,
  })

  // pop() - 오른쪽 삭제
  const rightVal2 = dq.pop()
  steps.push({
    type: 'stack',
    items: [...dq],
    action: 'pop',
    highlight: dq.length,
    message: `pop(): 오른쪽 끝에서 ${rightVal2}를 제거합니다. 덱: [${dq.join(', ')}]`,
  })

  steps.push({
    type: 'stack',
    items: [...dq],
    message: `최종 덱: [${dq.join(', ')}] (크기: ${dq.length}). 양쪽 삽입/삭제 모두 O(1)입니다.`,
  })

  return steps
}

export const dequeViz: VisualizationConfig = {
  name: '덱 (Deque) 기본 연산',
  description: 'appendleft, popleft, append, pop 연산으로 덱의 양방향 동작을 보여줍니다.',
  defaultInput: [1, 2, 3, 4, 5],
  generateSteps,
}
