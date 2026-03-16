import type { VisualizationConfig, VisualizationStep } from '../../types/visualization'

function generateSteps(_input: number[] | { adjacency: Record<string, string[]> }): VisualizationStep[] {
  const text = 'ABRACADABRA'
  const pattern = 'ABRA'
  const steps: VisualizationStep[] = []
  const textArr = text.split('').map(c => c.charCodeAt(0))

  steps.push({ type: 'array', array: textArr, message: `Rabin-Karp: "${text}"에서 "${pattern}"을 해시로 찾습니다.` })

  const pHash = pattern.split('').reduce((s, c) => s + c.charCodeAt(0), 0)
  steps.push({ type: 'array', array: textArr, message: `패턴 해시: ${pHash}` })

  for (let i = 0; i <= text.length - pattern.length; i++) {
    const window = text.slice(i, i + pattern.length)
    const wHash = window.split('').reduce((s, c) => s + c.charCodeAt(0), 0)
    const indices = Array.from({ length: pattern.length }, (_, k) => i + k)

    if (wHash === pHash) {
      const match = window === pattern
      if (match) {
        steps.push({ type: 'array', array: textArr, sorted: indices, windowStart: i, windowEnd: i + pattern.length - 1, message: `위치 ${i}: 해시 일치(${wHash}), 문자열도 일치! "${window}" = "${pattern}"` })
      } else {
        steps.push({ type: 'array', array: textArr, swapped: indices, windowStart: i, windowEnd: i + pattern.length - 1, message: `위치 ${i}: 해시 일치(${wHash}), 하지만 문자열 불일치 (해시 충돌!)` })
      }
    } else {
      steps.push({ type: 'array', array: textArr, comparing: indices, windowStart: i, windowEnd: i + pattern.length - 1, message: `위치 ${i}: 해시 ${wHash} ≠ ${pHash}. 건너뜀.` })
    }
  }

  return steps
}

export const rabinKarpViz: VisualizationConfig = {
  name: 'Rabin-Karp',
  description: '롤링 해시로 패턴 매칭을 수행합니다.',
  defaultInput: [65, 66, 82, 65],
  generateSteps,
}
