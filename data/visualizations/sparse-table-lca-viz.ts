import type { VisualizationConfig, VisualizationStep } from '../../types/visualization'

function generateSteps(_input: number[] | { adjacency: Record<string, string[]> }): VisualizationStep[] {
  const nodes = [
    { id: '1', value: '1', left: '2', right: '3' },
    { id: '2', value: '2', left: '4', right: '5' },
    { id: '3', value: '3', left: '6', right: '7' },
    { id: '4', value: '4' },
    { id: '5', value: '5' },
    { id: '6', value: '6' },
    { id: '7', value: '7' },
  ]

  const steps: VisualizationStep[] = []

  // 희소 테이블 전처리 과정 시각화
  steps.push({
    type: 'tree',
    nodes,
    visited: [],
    current: null,
    message: '희소 테이블 LCA: parent[k][v] = v의 2^k번째 조상을 전처리합니다.',
  })

  // parent[0] 계산 (직계 부모)
  steps.push({
    type: 'table',
    headers: ['노드', '1', '2', '3', '4', '5', '6', '7'],
    rows: [
      ['parent[0] (2⁰=1번째 조상)', '-', '1', '1', '2', '2', '3', '3'],
    ],
    message: 'k=0: 직계 부모를 저장합니다. parent[0][v] = v의 부모.',
  })

  // parent[1] 계산 (2번째 조상)
  steps.push({
    type: 'table',
    headers: ['노드', '1', '2', '3', '4', '5', '6', '7'],
    rows: [
      ['parent[0] (2⁰=1번째)', '-', '1', '1', '2', '2', '3', '3'],
      ['parent[1] (2¹=2번째)', '-', '-', '-', '1', '1', '1', '1'],
    ],
    highlightCell: [1, 0],
    message: 'k=1: parent[1][v] = parent[0][parent[0][v]] — 2번째 조상 = 부모의 부모.',
  })

  // parent[2] 계산 (4번째 조상)
  steps.push({
    type: 'table',
    headers: ['노드', '1', '2', '3', '4', '5', '6', '7'],
    rows: [
      ['parent[0] (2⁰=1번째)', '-', '1', '1', '2', '2', '3', '3'],
      ['parent[1] (2¹=2번째)', '-', '-', '-', '1', '1', '1', '1'],
      ['parent[2] (2²=4번째)', '-', '-', '-', '-', '-', '-', '-'],
    ],
    highlightCell: [2, 0],
    message: 'k=2: 깊이가 3이므로 4번째 조상은 존재하지 않습니다 (-). 전처리 완료!',
  })

  // LCA 쿼리: 노드 4와 노드 6
  const nodeU = '4'
  const nodeV = '6'

  steps.push({
    type: 'tree',
    nodes,
    visited: [nodeU, nodeV],
    current: null,
    message: `쿼리: LCA(${nodeU}, ${nodeV})를 구합니다. 깊이: ${nodeU}=2, ${nodeV}=2 (동일).`,
  })

  steps.push({
    type: 'tree',
    nodes,
    visited: [nodeU, nodeV],
    current: null,
    message: `깊이가 같으므로 바로 동시에 올라갑니다. k=1(2칸 점프)부터 시도합니다.`,
  })

  // k=1: parent[1][4]=1, parent[1][6]=1 → 같으므로 skip (LCA 위로 넘어감)
  steps.push({
    type: 'tree',
    nodes,
    visited: [nodeU, nodeV, '1'],
    current: '1',
    message: `k=1: parent[1][4]=1, parent[1][6]=1 → 같으므로 점프하지 않습니다 (LCA 위로 넘어갈 수 있음).`,
  })

  // k=0: parent[0][4]=2, parent[0][6]=3 → 다르므로 점프!
  steps.push({
    type: 'tree',
    nodes,
    visited: [nodeU, nodeV, '2', '3'],
    current: '2',
    message: `k=0: parent[0][4]=2, parent[0][6]=3 → 다르므로 점프합니다! u=2, v=3으로 이동.`,
  })

  // LCA = parent[0][u] = parent[0][2] = 1
  steps.push({
    type: 'tree',
    nodes,
    visited: [nodeU, nodeV, '2', '3', '1'],
    current: '1',
    message: `u≠v이므로 LCA = parent[0][u] = parent[0][2] = 1. LCA(4, 6) = 1`,
  })

  steps.push({
    type: 'tree',
    nodes,
    visited: [nodeU, nodeV, '2', '3', '1'],
    current: '1',
    message: `완료! Binary Lifting으로 O(log N)에 LCA를 구했습니다. 전처리 O(N log N), 쿼리 O(log N).`,
  })

  return steps
}

export const sparseTableLcaViz: VisualizationConfig = {
  name: '희소 테이블 LCA (Binary Lifting)',
  description: '2^k번째 조상을 전처리하여 LCA를 효율적으로 찾는 과정을 시각화합니다.',
  defaultInput: [1, 2, 3, 4, 5, 6, 7],
  generateSteps,
}
