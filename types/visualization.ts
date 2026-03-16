export interface ArrayVisualizationStep {
  type: 'array'
  array: number[]
  comparing?: number[]
  swapped?: number[]
  sorted?: number[]
  pointers?: { index: number; label: string; color: string }[]
  windowStart?: number
  windowEnd?: number
  message: string
}

export interface GraphVisualizationStep {
  type: 'graph'
  visited: string[]
  current: string | null
  queue: string[]
  edges: [string, string][]
  weights?: Record<string, number>
  distances?: Record<string, number | null>
  message: string
}

export interface StackVisualizationStep {
  type: 'stack'
  items: string[]
  action?: 'push' | 'pop' | null
  highlight?: number
  message: string
}

export interface TableVisualizationStep {
  type: 'table'
  headers: string[]
  rows: (string | number | null)[][]
  highlightCell?: [number, number]
  filledCells?: [number, number][]
  message: string
}

export interface GridVisualizationStep {
  type: 'grid'
  grid: number[][]
  size: number
  highlights?: [number, number][]
  conflicts?: [number, number][]
  placed?: [number, number][]
  current?: [number, number]
  message: string
}

export interface TreeVisualizationStep {
  type: 'tree'
  nodes: { id: string; value: string; left?: string; right?: string }[]
  visited: string[]
  current: string | null
  message: string
}

export type VisualizationStep =
  | ArrayVisualizationStep
  | GraphVisualizationStep
  | StackVisualizationStep
  | TableVisualizationStep
  | GridVisualizationStep
  | TreeVisualizationStep

export interface VisualizationConfig {
  name: string
  description: string
  defaultInput: number[] | { adjacency: Record<string, string[]> }
  generateSteps: (input: number[] | { adjacency: Record<string, string[]> }) => VisualizationStep[]
}
