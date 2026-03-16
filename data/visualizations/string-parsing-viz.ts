import type { VisualizationConfig, VisualizationStep } from '../../types/visualization'

function generateSteps(_input: number[] | { adjacency: Record<string, string[]> }): VisualizationStep[] {
  const str = '(3+(2*5))-1'
  const chars = str.split('').map(c => c.charCodeAt(0))
  const steps: VisualizationStep[] = []
  const tokens: string[] = []

  steps.push({ type: 'array', array: chars, message: `문자열 "${str}"을 파싱합니다. (ASCII 값으로 표시)` })

  for (let i = 0; i < str.length; i++) {
    const ch = str[i]
    let desc = ''
    if (ch >= '0' && ch <= '9') {
      tokens.push(ch)
      desc = `숫자 '${ch}' → 토큰에 추가`
    } else if ('+-*/'.includes(ch)) {
      tokens.push(ch)
      desc = `연산자 '${ch}'`
    } else if (ch === '(') {
      tokens.push(ch)
      desc = `여는 괄호`
    } else if (ch === ')') {
      tokens.push(ch)
      desc = `닫는 괄호`
    }

    steps.push({ type: 'array', array: chars, comparing: [i], pointers: [{ index: i, label: ch, color: '#6366f1' }], message: `위치 ${i}: '${ch}' → ${desc}. 토큰: [${tokens.join(', ')}]` })
  }

  steps.push({ type: 'array', array: chars, sorted: chars.map((_, i) => i), message: `파싱 완료! 토큰: [${tokens.join(', ')}]` })
  return steps
}

export const stringParsingViz: VisualizationConfig = {
  name: '문자열 파싱',
  description: '문자열을 순회하며 토큰을 추출합니다.',
  defaultInput: [40, 51, 43, 40, 50, 42, 53, 41, 41, 45, 49],
  generateSteps,
}
