import type { Category, Pattern } from '../types/algorithm'

import { sorting } from './algorithms/sorting'
import { searching } from './algorithms/searching'
import { dp } from './algorithms/dp'
import { graph } from './algorithms/graph'
import { greedy } from './algorithms/greedy'
import { implementation } from './algorithms/implementation'
import { stackQueue } from './algorithms/stack-queue'
import { hashCategory } from './algorithms/hash'
import { binarySearchCategory } from './algorithms/binary-search'
import { treeCategory } from './algorithms/tree'
import { stringCategory } from './algorithms/string'
import { mathCategory } from './algorithms/math'
import { bitmaskCategory } from './algorithms/bitmask'
import { segmentTreeCategory } from './algorithms/segment-tree'
import { unionFindCategory } from './algorithms/union-find'
import { twoPointerCategory } from './algorithms/two-pointer'
import { backtrackingCategory } from './algorithms/backtracking'
import { shortestPathCategory } from './algorithms/shortest-path'
import { topologicalSortCategory } from './algorithms/topological-sort'

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
]

export function getCategoryById(id: string): Category | undefined {
  return categories.find((c) => c.id === id)
}

export function getPatternById(categoryId: string, patternId: string): Pattern | undefined {
  const category = getCategoryById(categoryId)
  return category?.patterns.find((p) => p.id === patternId)
}
