import type { VisualizationConfig, VisualizationStep } from '../../types/visualization'

const defaultNodes = [
  { id: '1', value: '1', left: '2', right: '3' },
  { id: '2', value: '2', left: '4', right: '5' },
  { id: '3', value: '3', left: '6', right: '7' },
  { id: '4', value: '4' },
  { id: '5', value: '5' },
  { id: '6', value: '6' },
  { id: '7', value: '7' },
]

function generateSteps(_input: number[] | { adjacency: Record<string, string[]> }): VisualizationStep[] {
  const nodes = defaultNodes
  const steps: VisualizationStep[] = []

  // 노드 5와 노드 6의 LCA를 찾는 과정을 시각화
  const nodeU = '5'
  const nodeV = '6'

  // 각 노드의 부모 정보
  const parentMap: Record<string, string> = {
    '2': '1', '3': '1', '4': '2', '5': '2', '6': '3', '7': '3',
  }
  const depthMap: Record<string, number> = {
    '1': 0, '2': 1, '3': 1, '4': 2, '5': 2, '6': 2, '7': 2,
  }

  steps.push({
    type: 'tree',
    nodes,
    visited: [],
    current: null,
    message: `노드 ${nodeU}와 노드 ${nodeV}의 LCA(최소 공통 조상)를 찾습니다.`,
  })

  // 두 노드 표시
  steps.push({
    type: 'tree',
    nodes,
    visited: [nodeU, nodeV],
    current: null,
    message: `대상 노드: ${nodeU} (깊이 ${depthMap[nodeU]}), ${nodeV} (깊이 ${depthMap[nodeV]})`,
  })

  let u = nodeU
  let v = nodeV

  // 깊이 확인
  steps.push({
    type: 'tree',
    nodes,
    visited: [u, v],
    current: null,
    message: `두 노드의 깊이가 ${depthMap[u]}로 동일합니다. 바로 동시에 올라갑니다.`,
  })

  // 동시에 올라가기
  steps.push({
    type: 'tree',
    nodes,
    visited: [u, v],
    current: u,
    message: `노드 ${u}의 부모: ${parentMap[u]}, 노드 ${v}의 부모: ${parentMap[v]}`,
  })

  u = parentMap[u]
  v = parentMap[v]

  steps.push({
    type: 'tree',
    nodes,
    visited: [nodeU, nodeV, u, v],
    current: u,
    message: `노드 ${u}와 노드 ${v}로 올라왔습니다. 아직 다른 노드입니다.`,
  })

  steps.push({
    type: 'tree',
    nodes,
    visited: [nodeU, nodeV, u, v],
    current: u,
    message: `노드 ${u}의 부모: ${parentMap[u]}, 노드 ${v}의 부모: ${parentMap[v]}`,
  })

  u = parentMap[u]
  v = parentMap[v]

  steps.push({
    type: 'tree',
    nodes,
    visited: [nodeU, nodeV, '2', '3', u],
    current: u,
    message: `두 노드 모두 노드 ${u}에 도달했습니다! LCA = ${u}`,
  })

  steps.push({
    type: 'tree',
    nodes,
    visited: [nodeU, nodeV, '2', '3', u],
    current: u,
    message: `완료! 노드 ${nodeU}와 노드 ${nodeV}의 최소 공통 조상(LCA)은 노드 ${u}입니다.`,
  })

  return steps
}

export const lcaViz: VisualizationConfig = {
  name: 'LCA (최소 공통 조상)',
  description: '트리에서 두 노드의 최소 공통 조상을 찾는 과정을 시각화합니다.',
  defaultInput: [1, 2, 3, 4, 5, 6, 7],
  generateSteps,
}
