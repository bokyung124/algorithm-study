import type { VisualizationConfig, VisualizationStep } from '../../types/visualization'

const defaultGraph = {
  adjacency: {
    'S': ['A', 'B'],
    'A': ['B', 'T'],
    'B': ['T'],
    'T': [],
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

  // 용량 정의: S→A:3, S→B:2, A→B:1, A→T:2, B→T:3
  const capacities: Record<string, number> = {
    'S-A': 3, 'S-B': 2, 'A-B': 1, 'A-T': 2, 'B-T': 3,
  }

  steps.push({
    type: 'graph',
    visited: [],
    current: null,
    queue: [],
    edges: allEdges,
    weights: capacities,
    message: '최대 유량을 구합니다. 소스: S, 싱크: T. 간선 위의 숫자는 용량입니다.',
  })

  // 1차 증가 경로: S → A → T (유량 2)
  steps.push({
    type: 'graph',
    visited: ['S'],
    current: 'S',
    queue: ['S'],
    edges: allEdges,
    weights: capacities,
    message: 'BFS로 증가 경로를 탐색합니다. S에서 시작합니다.',
  })

  steps.push({
    type: 'graph',
    visited: ['S', 'A'],
    current: 'A',
    queue: ['A', 'B'],
    edges: allEdges,
    weights: capacities,
    message: 'S의 인접 노드 A, B를 큐에 추가합니다.',
  })

  steps.push({
    type: 'graph',
    visited: ['S', 'A', 'T'],
    current: 'T',
    queue: ['B'],
    edges: allEdges,
    weights: capacities,
    message: 'A에서 T에 도달! 증가 경로: S → A → T',
  })

  steps.push({
    type: 'graph',
    visited: ['S', 'A', 'T'],
    current: null,
    queue: [],
    edges: allEdges,
    weights: { 'S-A': 1, 'S-B': 2, 'A-B': 1, 'A-T': 0, 'B-T': 3 },
    distances: { 'S': 0, 'A': null, 'B': null, 'T': 2 },
    message: '경로의 최소 잔여 용량 = min(3, 2) = 2. 유량 2를 보냅니다. 현재 총 유량: 2',
  })

  // 2차 증가 경로: S → B → T (유량 2)
  steps.push({
    type: 'graph',
    visited: ['S', 'B'],
    current: 'B',
    queue: ['A', 'B'],
    edges: allEdges,
    weights: { 'S-A': 1, 'S-B': 2, 'A-B': 1, 'A-T': 0, 'B-T': 3 },
    message: '2번째 BFS: 증가 경로를 탐색합니다.',
  })

  steps.push({
    type: 'graph',
    visited: ['S', 'B', 'T'],
    current: 'T',
    queue: [],
    edges: allEdges,
    weights: { 'S-A': 1, 'S-B': 2, 'A-B': 1, 'A-T': 0, 'B-T': 3 },
    message: 'B에서 T에 도달! 증가 경로: S → B → T',
  })

  steps.push({
    type: 'graph',
    visited: ['S', 'B', 'T'],
    current: null,
    queue: [],
    edges: allEdges,
    weights: { 'S-A': 1, 'S-B': 0, 'A-B': 1, 'A-T': 0, 'B-T': 1 },
    distances: { 'S': 0, 'A': null, 'B': null, 'T': 4 },
    message: '경로의 최소 잔여 용량 = min(2, 3) = 2. 유량 2를 보냅니다. 현재 총 유량: 4',
  })

  // 3차 증가 경로: S → A → B → T (유량 1)
  steps.push({
    type: 'graph',
    visited: ['S', 'A', 'B'],
    current: 'B',
    queue: ['B'],
    edges: allEdges,
    weights: { 'S-A': 1, 'S-B': 0, 'A-B': 1, 'A-T': 0, 'B-T': 1 },
    message: '3번째 BFS: S → A → B 경로를 탐색합니다.',
  })

  steps.push({
    type: 'graph',
    visited: ['S', 'A', 'B', 'T'],
    current: 'T',
    queue: [],
    edges: allEdges,
    weights: { 'S-A': 1, 'S-B': 0, 'A-B': 1, 'A-T': 0, 'B-T': 1 },
    message: 'B에서 T에 도달! 증가 경로: S → A → B → T',
  })

  steps.push({
    type: 'graph',
    visited: ['S', 'A', 'B', 'T'],
    current: null,
    queue: [],
    edges: allEdges,
    weights: { 'S-A': 0, 'S-B': 0, 'A-B': 0, 'A-T': 0, 'B-T': 0 },
    distances: { 'S': 0, 'A': null, 'B': null, 'T': 5 },
    message: '경로의 최소 잔여 용량 = min(1, 1, 1) = 1. 유량 1을 보냅니다. 현재 총 유량: 5',
  })

  // 완료
  steps.push({
    type: 'graph',
    visited: ['S', 'A', 'B', 'T'],
    current: null,
    queue: [],
    edges: allEdges,
    weights: { 'S-A': 0, 'S-B': 0, 'A-B': 0, 'A-T': 0, 'B-T': 0 },
    distances: { 'S': 0, 'A': null, 'B': null, 'T': 5 },
    message: '더 이상 증가 경로가 없습니다. 최대 유량 = 5',
  })

  return steps
}

export const maxFlowViz: VisualizationConfig = {
  name: '최대 유량 (Edmonds-Karp)',
  description: 'BFS 기반 증가 경로를 찾아 최대 유량을 구하는 과정을 시각화합니다.',
  defaultInput: defaultGraph,
  generateSteps,
}
