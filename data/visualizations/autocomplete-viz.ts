import type { VisualizationConfig, VisualizationStep } from '../../types/visualization'

function generateSteps(_input: number[] | { adjacency: Record<string, string[]> }): VisualizationStep[] {
  const prefix = 'app'
  const words = ['app', 'apple', 'application']
  const prefixCodes = prefix.split('').map(c => c.charCodeAt(0))
  const steps: VisualizationStep[] = []

  // 초기 상태: 접두사 표시
  steps.push({
    type: 'array',
    array: prefixCodes,
    message: `자동완성: 접두사 "${prefix}"로 시작하는 단어를 검색합니다. 트라이에는 ["app", "apple", "application"]이 저장되어 있습니다.`,
  })

  // 접두사 노드 찾기
  for (let i = 0; i < prefix.length; i++) {
    const sorted = Array.from({ length: i }, (_, k) => k)
    steps.push({
      type: 'array',
      array: prefixCodes,
      comparing: [i],
      sorted,
      pointers: [
        { index: i, label: `'${prefix[i]}'`, color: '#f59e0b' },
      ],
      message: `접두사 탐색: '${prefix[i]}' (위치 ${i}) → 트라이에서 해당 자식 노드로 이동합니다.`,
    })
  }

  steps.push({
    type: 'array',
    array: prefixCodes,
    sorted: Array.from({ length: prefix.length }, (_, k) => k),
    message: `접두사 "${prefix}" 노드 도달! 이제 하위 트리를 DFS로 탐색하여 자동완성 후보를 수집합니다.`,
  })

  // 결과 수집 과정 시각화
  for (let wi = 0; wi < words.length; wi++) {
    const word = words[wi]
    const wordCodes = word.split('').map(c => c.charCodeAt(0))
    const pointers = [
      { index: prefix.length - 1, label: '접두사 끝', color: '#f59e0b' },
    ]
    if (word.length > prefix.length) {
      pointers.push({
        index: word.length - 1,
        label: `'${word[word.length - 1]}'`,
        color: '#10b981',
      })
    }
    steps.push({
      type: 'array',
      array: wordCodes,
      sorted: Array.from({ length: word.length }, (_, k) => k),
      pointers,
      message: `후보 ${wi + 1}: "${word}" 발견 (is_end=True). 결과 목록에 추가합니다.`,
    })
  }

  // 최종 결과
  const resultCodes = words.join(',').split('').map(c => c.charCodeAt(0))
  steps.push({
    type: 'array',
    array: resultCodes,
    sorted: Array.from({ length: resultCodes.length }, (_, k) => k),
    message: `자동완성 완료! suggest("${prefix}") → [${words.map(w => `"${w}"`).join(', ')}]. 사전순으로 ${words.length}개 결과를 반환합니다.`,
  })

  return steps
}

export const autocompleteViz: VisualizationConfig = {
  name: '자동완성 (접두사 검색)',
  description: '트라이에서 접두사로 시작하는 단어를 찾는 자동완성 과정을 시각화합니다.',
  defaultInput: [97, 112, 112],  // "app"의 ASCII 코드
  generateSteps,
}
