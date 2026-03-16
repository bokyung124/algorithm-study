import type { VisualizationConfig, VisualizationStep } from '../../types/visualization'

function generateSteps(input: number[] | { adjacency: Record<string, string[]> }): VisualizationStep[] {
  const arr = input as number[]
  const steps: VisualizationStep[] = []
  const MOD = 1000000007
  const BASE = 31
  const n = arr.length
  const charLabels = arr.map(v => String.fromCharCode(96 + v)) // 1->a, 2->b, 3->c

  // Step 0: 초기 상태
  steps.push({
    type: 'array',
    array: [...arr],
    message: `문자열 해싱: "${charLabels.join('')}" → 인코딩 [${arr.join(', ')}] 에 대해 접두사 해시를 구축합니다. (BASE=${BASE}, MOD=10^9+7)`,
  })

  // 접두사 해시 계산
  const h: number[] = [0]
  const pw: number[] = [1]

  for (let i = 0; i < n; i++) {
    const newHash = (h[i] * BASE + arr[i]) % MOD
    h.push(newHash)
    pw.push((pw[i] * BASE) % MOD)

    steps.push({
      type: 'array',
      array: [...arr],
      comparing: [i],
      pointers: [{ index: i, label: `h[${i + 1}]=${newHash}`, color: '#3b82f6' }],
      message: `hash[${i + 1}] = (hash[${i}] × ${BASE} + ${arr[i]}) % MOD = ${newHash}  ← "${charLabels[i]}" 추가`,
    })
  }

  // 전처리 완료
  steps.push({
    type: 'array',
    array: [...arr],
    sorted: Array.from({ length: n }, (_, i) => i),
    message: `접두사 해시 전처리 완료! h = [${h.join(', ')}]`,
  })

  // 부분 문자열 해시 쿼리 예시: s[0..2] vs s[3..5]
  if (n >= 6) {
    const hash1 = ((h[3] - h[0] * pw[3]) % MOD + MOD) % MOD
    steps.push({
      type: 'array',
      array: [...arr],
      comparing: [0, 1, 2],
      windowStart: 0,
      windowEnd: 2,
      pointers: [
        { index: 0, label: 'l=0', color: '#10b981' },
        { index: 2, label: 'r=2', color: '#ef4444' },
      ],
      message: `쿼리: s[0..2] = "${charLabels.slice(0, 3).join('')}" → hash = (h[3] - h[0]×pw[3]) % MOD = ${hash1}`,
    })

    const hash2 = ((h[6] - h[3] * pw[3]) % MOD + MOD) % MOD
    steps.push({
      type: 'array',
      array: [...arr],
      comparing: [3, 4, 5],
      windowStart: 3,
      windowEnd: 5,
      pointers: [
        { index: 3, label: 'l=3', color: '#10b981' },
        { index: 5, label: 'r=5', color: '#ef4444' },
      ],
      message: `쿼리: s[3..5] = "${charLabels.slice(3, 6).join('')}" → hash = (h[6] - h[3]×pw[3]) % MOD = ${hash2}`,
    })

    if (hash1 === hash2) {
      steps.push({
        type: 'array',
        array: [...arr],
        sorted: [0, 1, 2, 3, 4, 5],
        message: `해시 비교: ${hash1} == ${hash2} → "${charLabels.slice(0, 3).join('')}" 와 "${charLabels.slice(3, 6).join('')}" 는 같은 부분 문자열! O(1)에 비교 완료.`,
      })
    } else {
      steps.push({
        type: 'array',
        array: [...arr],
        swapped: [0, 1, 2, 3, 4, 5],
        message: `해시 비교: ${hash1} != ${hash2} → 다른 부분 문자열입니다.`,
      })
    }
  }

  // 다른 부분 문자열 쿼리: s[1..3]
  if (n >= 4) {
    const hash3 = ((h[4] - h[1] * pw[3]) % MOD + MOD) % MOD
    steps.push({
      type: 'array',
      array: [...arr],
      comparing: [1, 2, 3],
      windowStart: 1,
      windowEnd: 3,
      pointers: [
        { index: 1, label: 'l=1', color: '#10b981' },
        { index: 3, label: 'r=3', color: '#ef4444' },
      ],
      message: `쿼리: s[1..3] = "${charLabels.slice(1, 4).join('')}" → hash = ${hash3} (다른 해시값 → 다른 부분 문자열)`,
    })
  }

  steps.push({
    type: 'array',
    array: [...arr],
    sorted: Array.from({ length: n }, (_, i) => i),
    message: '문자열 해싱 완료! 전처리 O(N) 후, 임의 부분 문자열의 해시를 O(1)에 쿼리할 수 있습니다.',
  })

  return steps
}

export const stringHashingViz: VisualizationConfig = {
  name: '문자열 해싱',
  description: '접두사 해시 배열을 구축하고 부분 문자열 해시를 O(1)에 쿼리합니다.',
  defaultInput: [1, 2, 3, 1, 2, 3],
  generateSteps,
}
