import type { VisualizationConfig, VisualizationStep } from '../../types/visualization'

function generateSteps(input: number[] | { adjacency: Record<string, string[]> }): VisualizationStep[] {
  const arr = input as number[]
  const steps: VisualizationStep[] = []

  // 1. 초기 배열 표시
  steps.push({
    type: 'array',
    array: [...arr],
    message: `원본 배열: [${arr.join(', ')}] — 값의 범위가 크므로 좌표 압축을 수행합니다.`,
  })

  // 2. 정렬 과정
  const sorted = [...arr].sort((a, b) => a - b)
  steps.push({
    type: 'array',
    array: [...sorted],
    sorted: sorted.map((_, i) => i),
    message: `정렬: [${sorted.join(', ')}]`,
  })

  // 3. 중복 제거 과정
  const unique: number[] = []
  const uniqueIndices: number[] = []
  for (let i = 0; i < sorted.length; i++) {
    if (i === 0 || sorted[i] !== sorted[i - 1]) {
      unique.push(sorted[i])
      uniqueIndices.push(i)
    } else {
      // 중복 발견 시 표시
      steps.push({
        type: 'array',
        array: [...sorted],
        comparing: [i, i - 1],
        sorted: uniqueIndices.map((_, k) => k),
        message: `중복 발견: sorted[${i - 1}]=${sorted[i - 1]}과 sorted[${i}]=${sorted[i]}이 같으므로 제거합니다.`,
      })
    }
  }

  // 중복 제거 결과 — 배열 표시를 위해 빈 자리를 0으로 채움
  steps.push({
    type: 'array',
    array: [...unique],
    sorted: unique.map((_, i) => i),
    message: `중복 제거 완료: [${unique.join(', ')}] (${unique.length}개의 고유 값)`,
  })

  // 4. 매핑 테이블 생성
  const compressMap = new Map<number, number>()
  for (let i = 0; i < unique.length; i++) {
    compressMap.set(unique[i], i)
  }

  steps.push({
    type: 'array',
    array: [...unique],
    pointers: unique.map((v, i) => ({
      index: i,
      label: `${v}→${i}`,
      color: '#3b82f6',
    })),
    message: `매핑 생성: ${unique.map((v, i) => `${v}→${i}`).join(', ')}`,
  })

  // 5. 원래 배열의 각 원소를 하나씩 압축
  const result: number[] = []
  for (let i = 0; i < arr.length; i++) {
    const compressed = compressMap.get(arr[i])!
    result.push(compressed)

    // 현재까지의 결과를 표시 (나머지는 원래 값 유지를 위해 빈칸 처리)
    const displayArr = [...result]
    for (let j = result.length; j < arr.length; j++) {
      displayArr.push(arr[j])
    }

    steps.push({
      type: 'array',
      array: displayArr,
      comparing: [i],
      sorted: Array.from({ length: result.length }, (_, k) => k),
      pointers: [
        { index: i, label: `${arr[i]}→${compressed}`, color: '#10b981' },
      ],
      message: `arr[${i}]: ${arr[i]} → 압축값 ${compressed} (고유 배열에서 인덱스 ${compressed})`,
    })
  }

  // 6. 최종 결과
  steps.push({
    type: 'array',
    array: [...result],
    sorted: result.map((_, i) => i),
    message: `좌표 압축 완료: [${arr.join(', ')}] → [${result.join(', ')}]`,
  })

  return steps
}

export const coordinateCompressionViz: VisualizationConfig = {
  name: '좌표 압축',
  description: '큰 값을 상대적 순서(랭크)로 변환하는 좌표 압축 과정을 시각화합니다.',
  defaultInput: [1000, 50, 999999, 3, 50],
  generateSteps,
}
