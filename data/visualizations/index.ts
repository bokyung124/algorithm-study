import type { VisualizationConfig } from '../../types/visualization'
import { bubbleSortViz } from './bubble-sort-viz'
import { mergeSortViz } from './merge-sort-viz'
import { quickSortViz } from './quick-sort-viz'
import { dfsViz } from './dfs-viz'
import { bfsViz } from './bfs-viz'
import { binarySearchViz } from './binary-search-viz'
import { twoPointerViz } from './two-pointer-viz'
import { slidingWindowViz } from './sliding-window-viz'
import { stackViz } from './stack-viz'
import { fibonacciDpViz } from './fibonacci-dp-viz'
import { dijkstraViz } from './dijkstra-viz'
import { nQueensViz } from './n-queens-viz'
import { treeTraversalViz } from './tree-traversal-viz'

const visualizationMap: Record<string, VisualizationConfig> = {
  'sorting/bubble-sort': bubbleSortViz,
  'sorting/merge-sort': mergeSortViz,
  'sorting/quick-sort': quickSortViz,
  'graph/dfs': dfsViz,
  'graph/bfs': bfsViz,
  'binary-search/binary-search-basic': binarySearchViz,
  'two-pointer/two-pointer-basic': twoPointerViz,
  'two-pointer/sliding-window': slidingWindowViz,
  'stack-queue/stack-basic': stackViz,
  'dp/fibonacci-memoization': fibonacciDpViz,
  'shortest-path/dijkstra': dijkstraViz,
  'backtracking/n-queens': nQueensViz,
  'tree/binary-tree-traversal': treeTraversalViz,
}

export function getVisualization(categoryId: string, patternId: string): VisualizationConfig | null {
  return visualizationMap[`${categoryId}/${patternId}`] ?? null
}
