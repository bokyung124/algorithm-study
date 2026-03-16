export interface ArrayVisualizationStep {
  type: 'array'
  array: number[]
  comparing?: number[]
  swapped?: number[]
  sorted?: number[]
  message: string
}

export interface GraphVisualizationStep {
  type: 'graph'
  visited: string[]
  current: string | null
  queue: string[]
  edges: [string, string][]
  message: string
}

export type VisualizationStep = ArrayVisualizationStep | GraphVisualizationStep

export interface VisualizationConfig {
  name: string
  description: string
  defaultInput: number[] | { adjacency: Record<string, string[]> }
  generateSteps: (input: number[] | { adjacency: Record<string, string[]> }) => VisualizationStep[]
}
