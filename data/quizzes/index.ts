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
}

export function getQuizzes(categoryId: string, patternId: string): QuizQuestion[] {
  return allQuizzes[categoryId]?.[patternId] ?? []
}
