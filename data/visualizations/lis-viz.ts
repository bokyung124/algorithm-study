import type { VisualizationConfig, VisualizationStep } from '../../types/visualization'

function generateSteps(input: number[] | { adjacency: Record<string, string[]> }): VisualizationStep[] {
  const arr = input as number[]
  const steps: VisualizationStep[] = []
  const n = arr.length
  const dp = new Array(n).fill(1)

  steps.push({ type: 'array', array: arr, message: `LIS(최장 증가 부분수열)를 구합니다. 배열 길이: ${n}` })

  for (let i = 1; i < n; i++) {
    for (let j = 0; j < i; j++) {
      if (arr[j] < arr[i]) {
        dp[i] = Math.max(dp[i], dp[j] + 1)
      }
    }
    steps.push({ type: 'array', array: arr, comparing: [i], pointers: [{ index: i, label: `dp=${dp[i]}`, color: '#6366f1' }], message: `dp[${i}]=${dp[i]} (arr[${i}]=${arr[i]}보다 작은 원소들의 dp 최대값 + 1)` })
  }

  const maxLen = Math.max(...dp)
  const lisIndices: number[] = []
  let target = maxLen
  for (let i = n - 1; i >= 0; i--) {
    if (dp[i] === target) {
      lisIndices.unshift(i)
      target--
    }
  }

  steps.push({ type: 'array', array: arr, sorted: lisIndices, message: `LIS 길이: ${maxLen}. 예: [${lisIndices.map(i => arr[i]).join(', ')}]` })
  return steps
}

export const lisViz: VisualizationConfig = {
  name: '최장 증가 부분수열 (LIS)',
  description: 'DP로 가장 긴 증가 부분수열을 찾습니다.',
  defaultInput: [10, 9, 2, 5, 3, 7, 101, 18],
  generateSteps,
}
