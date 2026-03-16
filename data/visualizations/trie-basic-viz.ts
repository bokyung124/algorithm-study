import type { VisualizationConfig, VisualizationStep } from '../../types/visualization'

function generateSteps(_input: number[] | { adjacency: Record<string, string[]> }): VisualizationStep[] {
  const word = 'apple'
  const charCodes = word.split('').map(c => c.charCodeAt(0))
  const steps: VisualizationStep[] = []

  // 초기 상태
  steps.push({
    type: 'array',
    array: charCodes,
    message: `트라이에 "${word}"을 삽입합니다. 배열은 각 문자의 ASCII 코드입니다: [${charCodes.map((c, i) => `${word[i]}(${c})`).join(', ')}]`,
  })

  // 문자 하나씩 처리
  for (let i = 0; i < word.length; i++) {
    const sorted = Array.from({ length: i }, (_, k) => k)
    steps.push({
      type: 'array',
      array: charCodes,
      comparing: [i],
      sorted,
      pointers: [
        { index: i, label: `'${word[i]}'`, color: '#6366f1' },
      ],
      message: `문자 '${word[i]}' (위치 ${i}) 처리: 트라이에 노드를 추가하고 자식으로 이동합니다.`,
    })
  }

  // 삽입 완료
  steps.push({
    type: 'array',
    array: charCodes,
    sorted: Array.from({ length: word.length }, (_, k) => k),
    message: `"${word}" 삽입 완료! is_end = True로 설정합니다. 총 ${word.length}개 노드가 생성되었습니다.`,
  })

  // 두 번째 단어: "app"
  const word2 = 'app'
  const charCodes2 = word2.split('').map(c => c.charCodeAt(0))

  steps.push({
    type: 'array',
    array: charCodes2,
    message: `트라이에 "${word2}"을 삽입합니다: [${charCodes2.map((c, i) => `${word2[i]}(${c})`).join(', ')}]`,
  })

  for (let i = 0; i < word2.length; i++) {
    const sorted = Array.from({ length: i }, (_, k) => k)
    steps.push({
      type: 'array',
      array: charCodes2,
      comparing: [i],
      sorted,
      pointers: [
        { index: i, label: `'${word2[i]}'`, color: '#10b981' },
      ],
      message: `문자 '${word2[i]}' (위치 ${i}) 처리: 이미 존재하는 노드이므로 자식으로 이동만 합니다.`,
    })
  }

  steps.push({
    type: 'array',
    array: charCodes2,
    sorted: Array.from({ length: word2.length }, (_, k) => k),
    message: `"${word2}" 삽입 완료! 기존 경로를 재사용하고 is_end = True만 설정합니다.`,
  })

  // 검색 시연: "app" 검색
  steps.push({
    type: 'array',
    array: charCodes2,
    pointers: [
      { index: 0, label: 'a', color: '#6366f1' },
      { index: 1, label: 'p', color: '#6366f1' },
      { index: 2, label: 'p', color: '#6366f1' },
    ],
    sorted: [0, 1, 2],
    message: `search("app"): 'a' → 'p' → 'p' 순서로 탐색, is_end=True → 검색 성공!`,
  })

  return steps
}

export const trieBasicViz: VisualizationConfig = {
  name: '기본 트라이 삽입',
  description: '문자열을 트라이에 삽입하는 과정을 문자 단위로 시각화합니다.',
  defaultInput: [97, 112, 112, 108, 101],  // "apple"의 ASCII 코드
  generateSteps,
}
