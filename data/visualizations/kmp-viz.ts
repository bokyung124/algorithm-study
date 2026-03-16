import type { VisualizationConfig, VisualizationStep } from '../../types/visualization'

function generateSteps(_input: number[] | { adjacency: Record<string, string[]> }): VisualizationStep[] {
  const text = 'ABABDABACDABABCABAB'
  const pattern = 'ABABC'
  const steps: VisualizationStep[] = []
  const textArr = text.split('').map(c => c.charCodeAt(0))

  steps.push({ type: 'array', array: textArr, message: `KMP: 텍스트 "${text}"에서 패턴 "${pattern}"을 찾습니다.` })

  // Build failure function
  const fail = new Array(pattern.length).fill(0)
  let j = 0
  for (let i = 1; i < pattern.length; i++) {
    while (j > 0 && pattern[i] !== pattern[j]) j = fail[j - 1]
    if (pattern[i] === pattern[j]) j++
    fail[i] = j
  }

  steps.push({ type: 'array', array: fail, message: `실패 함수: [${fail.join(', ')}] (패턴 "${pattern}")` })

  // Search
  j = 0
  for (let i = 0; i < text.length; i++) {
    while (j > 0 && text[i] !== pattern[j]) j = fail[j - 1]
    if (text[i] === pattern[j]) {
      if (j === pattern.length - 1) {
        const matchStart = i - pattern.length + 1
        steps.push({ type: 'array', array: textArr, sorted: Array.from({ length: pattern.length }, (_, k) => matchStart + k), message: `패턴 발견! 위치 ${matchStart}~${i}` })
        j = fail[j]
      } else {
        j++
        steps.push({ type: 'array', array: textArr, comparing: [i], pointers: [{ index: i, label: `t[${i}]`, color: '#6366f1' }, { index: i - j + 1, label: `p[0]`, color: '#f59e0b' }], message: `text[${i}]='${text[i]}' = pattern[${j - 1}]='${pattern[j - 1]}'. 매칭 ${j}/${pattern.length}` })
      }
    } else {
      steps.push({ type: 'array', array: textArr, swapped: [i], pointers: [{ index: i, label: '✗', color: '#ef4444' }], message: `text[${i}]='${text[i]}' ≠ pattern[${j}]='${pattern[j]}'. 불일치.` })
    }
  }

  return steps
}

export const kmpViz: VisualizationConfig = {
  name: 'KMP 문자열 매칭',
  description: '실패 함수를 이용해 효율적으로 패턴을 찾습니다.',
  defaultInput: [65, 66, 65, 66, 68],
  generateSteps,
}
