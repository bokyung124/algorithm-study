import type { QuizQuestion } from '../../types/quiz'
import { sortingQuizzes } from './sorting-quizzes'
import { dpQuizzes } from './dp-quizzes'
import { graphQuizzes } from './graph-quizzes'
import { shortestPathQuizzes } from './shortest-path-quizzes'
import { backtrackingQuizzes } from './backtracking-quizzes'
import { binarySearchQuizzes } from './binary-search-quizzes'
import { stackQueueQuizzes } from './stack-queue-quizzes'
import { twoPointerQuizzes } from './two-pointer-quizzes'
import { hashQuizzes } from './hash-quizzes'
import { treeQuizzes } from './tree-quizzes'
import { stringQuizzes } from './string-quizzes'
import { mathQuizzes } from './math-quizzes'
import { bitmaskQuizzes } from './bitmask-quizzes'
import { segmentTreeQuizzes } from './segment-tree-quizzes'
import { unionFindQuizzes } from './union-find-quizzes'
import { greedyQuizzes } from './greedy-quizzes'
import { topologicalSortQuizzes } from './topological-sort-quizzes'
import { implementationQuizzes } from './implementation-quizzes'
import { trieQuizzes } from './trie-quizzes'
import { mstQuizzes } from './mst-quizzes'
import { heapQuizzes } from './heap-quizzes'
import { prefixSumQuizzes } from './prefix-sum-quizzes'
import { divideAndConquerQuizzes } from './divide-and-conquer-quizzes'
import { simulationQuizzes } from './simulation-quizzes'
import { bruteForceQuizzes } from './brute-force-quizzes'
import { coordinateCompressionQuizzes } from './coordinate-compression-quizzes'
import { lcaQuizzes } from './lca-quizzes'
import { networkFlowQuizzes } from './network-flow-quizzes'
import { geometryQuizzes } from './geometry-quizzes'
import { sweepingQuizzes } from './sweeping-quizzes'
import { searchingQuizzes } from './searching-quizzes'
import { sqlCteQuizzes } from './sql-cte-quizzes'
import { sqlStringQuizzes } from './sql-string-quizzes'
import { sqlDatetimeQuizzes } from './sql-datetime-quizzes'
import { sqlConditionalQuizzes } from './sql-conditional-quizzes'
import { sqlSetOpsQuizzes } from './sql-set-ops-quizzes'
import { sqlSelectQuizzes } from './sql-select-quizzes'
import { sqlJoinQuizzes } from './sql-join-quizzes'
import { sqlAggregateQuizzes } from './sql-aggregate-quizzes'
import { sqlSubqueryQuizzes } from './sql-subquery-quizzes'
import { sqlWindowQuizzes } from './sql-window-quizzes'

const allQuizzes: Record<string, Record<string, QuizQuestion[]>> = {
  'sorting': sortingQuizzes,
  'dp': dpQuizzes,
  'graph': graphQuizzes,
  'shortest-path': shortestPathQuizzes,
  'backtracking': backtrackingQuizzes,
  'binary-search': binarySearchQuizzes,
  'stack-queue': stackQueueQuizzes,
  'two-pointer': twoPointerQuizzes,
  'hash': hashQuizzes,
  'tree': treeQuizzes,
  'string': stringQuizzes,
  'math': mathQuizzes,
  'bitmask': bitmaskQuizzes,
  'segment-tree': segmentTreeQuizzes,
  'union-find': unionFindQuizzes,
  'greedy': greedyQuizzes,
  'topological-sort': topologicalSortQuizzes,
  'implementation': implementationQuizzes,
  'trie': trieQuizzes,
  'mst': mstQuizzes,
  'heap': heapQuizzes,
  'prefix-sum': prefixSumQuizzes,
  'divide-and-conquer': divideAndConquerQuizzes,
  'simulation': simulationQuizzes,
  'brute-force': bruteForceQuizzes,
  'coordinate-compression': coordinateCompressionQuizzes,
  'lca': lcaQuizzes,
  'network-flow': networkFlowQuizzes,
  'geometry': geometryQuizzes,
  'sweeping': sweepingQuizzes,
  'searching': searchingQuizzes,
  'sql-cte': sqlCteQuizzes,
  'sql-string': sqlStringQuizzes,
  'sql-datetime': sqlDatetimeQuizzes,
  'sql-conditional': sqlConditionalQuizzes,
  'sql-set-ops': sqlSetOpsQuizzes,
  'sql-select': sqlSelectQuizzes,
  'sql-join': sqlJoinQuizzes,
  'sql-aggregate': sqlAggregateQuizzes,
  'sql-subquery': sqlSubqueryQuizzes,
  'sql-window': sqlWindowQuizzes,
}

export function getQuizzes(categoryId: string, patternId: string): QuizQuestion[] {
  return allQuizzes[categoryId]?.[patternId] ?? []
}
