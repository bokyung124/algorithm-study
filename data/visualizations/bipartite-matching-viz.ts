import type { VisualizationConfig, VisualizationStep } from '../../types/visualization'

const defaultGraph = {
  adjacency: {
    'L1': ['R1', 'R2'],
    'L2': ['R1', 'R3'],
    'L3': ['R2', 'R3'],
    'R1': [],
    'R2': [],
    'R3': [],
  } as Record<string, string[]>,
}

function generateSteps(input: number[] | { adjacency: Record<string, string[]> }): VisualizationStep[] {
  const graph = input as { adjacency: Record<string, string[]> }
  const adj = graph.adjacency
  const steps: VisualizationStep[] = []

  const allEdges: [string, string][] = []
  for (const [node, neighbors] of Object.entries(adj)) {
    for (const neighbor of neighbors) {
      allEdges.push([node, neighbor])
    }
  }

  steps.push({
    type: 'graph',
    visited: [],
    current: null,
    queue: [],
    edges: allEdges,
    message: '이분 매칭을 시작합니다. 왼쪽: L1, L2, L3 / 오른쪽: R1, R2, R3',
  })

  // L1 매칭 시도
  steps.push({
    type: 'graph',
    visited: ['L1'],
    current: 'L1',
    queue: [],
    edges: allEdges,
    message: 'L1의 매칭을 시도합니다. L1은 R1, R2와 연결되어 있습니다.',
  })

  steps.push({
    type: 'graph',
    visited: ['L1', 'R1'],
    current: 'R1',
    queue: [],
    edges: allEdges,
    message: 'R1이 비어있으므로 L1 ↔ R1 매칭 성공! 현재 매칭 수: 1',
  })

  // L2 매칭 시도
  steps.push({
    type: 'graph',
    visited: ['L1', 'R1', 'L2'],
    current: 'L2',
    queue: [],
    edges: allEdges,
    message: 'L2의 매칭을 시도합니다. L2는 R1, R3와 연결되어 있습니다.',
  })

  steps.push({
    type: 'graph',
    visited: ['L1', 'R1', 'L2'],
    current: 'R1',
    queue: [],
    edges: allEdges,
    message: 'R1은 이미 L1과 매칭 중입니다. L1이 다른 노드로 옮길 수 있는지 확인합니다.',
  })

  steps.push({
    type: 'graph',
    visited: ['L1', 'R1', 'L2', 'R2'],
    current: 'L1',
    queue: ['L1'],
    edges: allEdges,
    message: 'L1이 R2로 옮길 수 있습니다! L1 ↔ R2로 재매칭합니다.',
  })

  steps.push({
    type: 'graph',
    visited: ['L1', 'R1', 'L2', 'R2'],
    current: 'L2',
    queue: [],
    edges: allEdges,
    message: 'L2 ↔ R1 매칭 성공! (L1은 R2로 이동) 현재 매칭 수: 2',
  })

  // L3 매칭 시도
  steps.push({
    type: 'graph',
    visited: ['L1', 'R1', 'L2', 'R2', 'L3'],
    current: 'L3',
    queue: [],
    edges: allEdges,
    message: 'L3의 매칭을 시도합니다. L3은 R2, R3와 연결되어 있습니다.',
  })

  steps.push({
    type: 'graph',
    visited: ['L1', 'R1', 'L2', 'R2', 'L3'],
    current: 'R2',
    queue: [],
    edges: allEdges,
    message: 'R2는 이미 L1과 매칭 중입니다. L1이 다른 노드로 옮길 수 있는지 확인합니다.',
  })

  steps.push({
    type: 'graph',
    visited: ['L1', 'R1', 'L2', 'R2', 'L3', 'R3'],
    current: 'R3',
    queue: [],
    edges: allEdges,
    message: 'R3이 비어있으므로 L3 ↔ R3로 매칭하지 않고, 먼저 R3을 확인합니다.',
  })

  steps.push({
    type: 'graph',
    visited: ['L1', 'R1', 'L2', 'R2', 'L3', 'R3'],
    current: 'L3',
    queue: [],
    edges: allEdges,
    message: 'L3 ↔ R3 매칭 성공! 현재 매칭 수: 3',
  })

  // 완료
  steps.push({
    type: 'graph',
    visited: ['L1', 'R1', 'L2', 'R2', 'L3', 'R3'],
    current: null,
    queue: [],
    edges: allEdges,
    message: '이분 매칭 완료! 최대 매칭 = 3 (L1↔R2, L2↔R1, L3↔R3)',
  })

  return steps
}

export const bipartiteMatchingViz: VisualizationConfig = {
  name: '이분 매칭',
  description: 'DFS 기반 이분 매칭 과정에서 매칭 재조정을 포함한 과정을 시각화합니다.',
  defaultInput: defaultGraph,
  generateSteps,
}
