import type { VisualizationConfig } from '../../types/visualization'
import { bubbleSortViz } from './bubble-sort-viz'
import { mergeSortViz } from './merge-sort-viz'
import { quickSortViz } from './quick-sort-viz'
import { dfsViz } from './dfs-viz'
import { bfsViz } from './bfs-viz'

const visualizationMap: Record<string, VisualizationConfig> = {
  'sorting/bubble-sort': bubbleSortViz,
  'sorting/merge-sort': mergeSortViz,
  'sorting/quick-sort': quickSortViz,
  'graph/dfs': dfsViz,
  'graph/bfs': bfsViz,
}

export function getVisualization(categoryId: string, patternId: string): VisualizationConfig | null {
  return visualizationMap[`${categoryId}/${patternId}`] ?? null
}
