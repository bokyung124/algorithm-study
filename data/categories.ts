import type { Category, Pattern } from '@/types/algorithm'

import { sorting } from '@/data/algorithms/sorting'
import { searching } from '@/data/algorithms/searching'
import { dp } from '@/data/algorithms/dp'
import { graph } from '@/data/algorithms/graph'
import { greedy } from '@/data/algorithms/greedy'
import { implementation } from '@/data/algorithms/implementation'
import { stackQueue } from '@/data/algorithms/stack-queue'
import { hashCategory } from '@/data/algorithms/hash'
import { binarySearchCategory } from '@/data/algorithms/binary-search'
import { treeCategory } from '@/data/algorithms/tree'
import { stringCategory } from '@/data/algorithms/string'
import { mathCategory } from '@/data/algorithms/math'
import { bitmaskCategory } from '@/data/algorithms/bitmask'
import { segmentTreeCategory } from '@/data/algorithms/segment-tree'
import { unionFindCategory } from '@/data/algorithms/union-find'
import { twoPointerCategory } from '@/data/algorithms/two-pointer'
import { backtrackingCategory } from '@/data/algorithms/backtracking'
import { shortestPathCategory } from '@/data/algorithms/shortest-path'
import { topologicalSortCategory } from '@/data/algorithms/topological-sort'
import { trieCategory } from '@/data/algorithms/trie'
import { mstCategory } from '@/data/algorithms/mst'
import { heapCategory } from '@/data/algorithms/heap'
import { prefixSumCategory } from '@/data/algorithms/prefix-sum'
import { divideAndConquerCategory } from '@/data/algorithms/divide-and-conquer'
import { simulationCategory } from '@/data/algorithms/simulation'
import { bruteForceCategory } from '@/data/algorithms/brute-force'
import { coordinateCompressionCategory } from '@/data/algorithms/coordinate-compression'
import { lcaCategory } from '@/data/algorithms/lca'
import { networkFlowCategory } from '@/data/algorithms/network-flow'
import { geometryCategory } from '@/data/algorithms/geometry'
import { sweepingCategory } from '@/data/algorithms/sweeping'

export const categories: Category[] = [
  sorting,
  searching,
  dp,
  graph,
  greedy,
  implementation,
  stackQueue,
  hashCategory,
  binarySearchCategory,
  treeCategory,
  stringCategory,
  mathCategory,
  bitmaskCategory,
  segmentTreeCategory,
  unionFindCategory,
  twoPointerCategory,
  backtrackingCategory,
  shortestPathCategory,
  topologicalSortCategory,
  trieCategory,
  mstCategory,
  heapCategory,
  prefixSumCategory,
  divideAndConquerCategory,
  simulationCategory,
  bruteForceCategory,
  coordinateCompressionCategory,
  lcaCategory,
  networkFlowCategory,
  geometryCategory,
  sweepingCategory,
]

export function getCategoryById(id: string): Category | undefined {
  return categories.find((c) => c.id === id)
}

export function getPatternById(categoryId: string, patternId: string): Pattern | undefined {
  const category = getCategoryById(categoryId)
  return category?.patterns.find((p) => p.id === patternId)
}
