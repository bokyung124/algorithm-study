import type { VisualizationConfig, VisualizationStep } from '../../types/visualization'

function generateSteps(_input: number[] | { adjacency: Record<string, string[]> }): VisualizationStep[] {
  const n = 30
  const steps: VisualizationStep[] = []
  const sieve = new Array(n + 1).fill(true)
  sieve[0] = sieve[1] = false
  const size = 6 // grid width

  const toGrid = (): number[][] => {
    const grid: number[][] = []
    for (let i = 0; i <= n; i += size) {
      grid.push(Array.from({ length: size }, (_, j) => i + j <= n ? (sieve[i + j] ? i + j : -(i + j)) : -999))
    }
    return grid
  }

  steps.push({ type: 'grid', grid: toGrid(), size, placed: Array.from({ length: n - 1 }, (_, i) => [Math.floor((i + 2) / size), (i + 2) % size] as [number, number]), message: `에라토스테네스의 체: 2부터 ${n}까지 소수를 찾습니다.` })

  for (let i = 2; i * i <= n; i++) {
    if (!sieve[i]) continue
    const removed: [number, number][] = []

    for (let j = i * i; j <= n; j += i) {
      if (sieve[j]) {
        sieve[j] = false
        removed.push([Math.floor(j / size), j % size])
      }
    }

    if (removed.length > 0) {
      steps.push({ type: 'grid', grid: toGrid(), size, placed: Array.from({ length: n + 1 }, (_, k) => sieve[k] && k >= 2 ? [Math.floor(k / size), k % size] as [number, number] : null).filter((x): x is [number, number] => x !== null), conflicts: removed, current: [Math.floor(i / size), i % size], message: `${i}의 배수 제거: ${removed.map(([r, c]) => r * size + c).filter(v => v <= n).join(', ')}` })
    }
  }

  const primes = Array.from({ length: n + 1 }, (_, i) => i).filter(i => sieve[i])
  steps.push({ type: 'grid', grid: toGrid(), size, placed: primes.map(p => [Math.floor(p / size), p % size] as [number, number]), message: `완료! 소수: ${primes.join(', ')} (${primes.length}개)` })
  return steps
}

export const primeSieveViz: VisualizationConfig = {
  name: '에라토스테네스의 체',
  description: '소수의 배수를 지워 소수를 찾습니다.',
  defaultInput: [30],
  generateSteps,
}
