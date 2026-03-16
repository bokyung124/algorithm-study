import type { VisualizationConfig } from '../../types/visualization'

// Sorting
import { bubbleSortViz } from './bubble-sort-viz'
import { mergeSortViz } from './merge-sort-viz'
import { quickSortViz } from './quick-sort-viz'
import { countingSortViz } from './counting-sort-viz'
import { customSortViz } from './custom-sort-viz'

// Searching
import { linearSearchViz } from './linear-search-viz'
import { binarySearchViz } from './binary-search-viz'
import { parametricSearchViz } from './parametric-search-viz'

// DP
import { fibonacciDpViz } from './fibonacci-dp-viz'
import { knapsackViz } from './knapsack-viz'
import { lisViz } from './lis-viz'
import { intervalDpViz } from './interval-dp-viz'

// Graph
import { dfsViz } from './dfs-viz'
import { bfsViz } from './bfs-viz'
import { connectedComponentsViz } from './connected-components-viz'
import { sccViz } from './scc-viz'
import { bipartiteViz } from './bipartite-viz'

// Greedy
import { activitySelectionViz } from './activity-selection-viz'
import { fractionalKnapsackViz } from './fractional-knapsack-viz'
import { coinChangeGreedyViz } from './coin-change-greedy-viz'

// Implementation
import { simulationViz } from './simulation-viz'
import { stringParsingViz } from './string-parsing-viz'
import { matrixRotationViz } from './matrix-rotation-viz'

// Stack & Queue
import { stackViz } from './stack-viz'
import { queueBasicViz } from './queue-basic-viz'
import { monotoneStackViz } from './monotone-stack-viz'
import { dequeViz } from './deque-viz'
import { monotoneDequeViz } from './monotone-deque-viz'

// Hash
import { hashMapViz } from './hash-map-viz'
import { hashSetViz } from './hash-set-viz'
import { countingHashViz } from './counting-hash-viz'

// Binary Search
import { lowerBoundViz } from './lower-bound-viz'
import { upperBoundViz } from './upper-bound-viz'
import { answerBinarySearchViz } from './answer-binary-search-viz'

// Tree
import { treeTraversalViz } from './tree-traversal-viz'
import { bstViz } from './bst-viz'
import { treeDpViz } from './tree-dp-viz'

// String
import { kmpViz } from './kmp-viz'
import { rabinKarpViz } from './rabin-karp-viz'
import { trieViz } from './trie-viz'
import { stringHashingViz } from './string-hashing-viz'

// Trie
import { trieBasicViz } from './trie-basic-viz'
import { autocompleteViz } from './autocomplete-viz'

// Math
import { primeSieveViz } from './prime-sieve-viz'
import { gcdLcmViz } from './gcd-lcm-viz'
import { modularArithmeticViz } from './modular-arithmetic-viz'

// Bitmask
import { bitOperationsViz } from './bit-operations-viz'
import { subsetEnumerationViz } from './subset-enumeration-viz'
import { bitmaskDpViz } from './bitmask-dp-viz'

// Segment Tree
import { basicSegmentTreeViz } from './basic-segment-tree-viz'
import { lazyPropagationViz } from './lazy-propagation-viz'
import { fenwickTreeViz } from './fenwick-tree-viz'

// Union-Find
import { basicUnionFindViz } from './basic-union-find-viz'
import { weightedUnionFindViz } from './weighted-union-find-viz'

// Two Pointer
import { twoPointerViz } from './two-pointer-viz'
import { slidingWindowViz } from './sliding-window-viz'
import { meetInTheMiddleViz } from './meet-in-the-middle-viz'

// Backtracking
import { nQueensViz } from './n-queens-viz'
import { permutationCombinationViz } from './permutation-combination-viz'
import { sudokuViz } from './sudoku-viz'

// Shortest Path
import { dijkstraViz } from './dijkstra-viz'
import { bellmanFordViz } from './bellman-ford-viz'
import { floydWarshallViz } from './floyd-warshall-viz'

// Topological Sort
import { kahnAlgorithmViz } from './kahn-algorithm-viz'
import { dfsTopologicalSortViz } from './dfs-topological-sort-viz'

// MST
import { kruskalViz } from './kruskal-viz'
import { primViz } from './prim-viz'

// Heap
import { heapBasicViz } from './heap-basic-viz'
import { topKViz } from './top-k-viz'

// Prefix Sum
import { prefixSum1dViz } from './prefix-sum-1d-viz'
import { prefixSum2dViz } from './prefix-sum-2d-viz'

// Divide and Conquer
import { divideConquerBasicViz } from './divide-conquer-basic-viz'
import { fastExponentiationViz } from './fast-exponentiation-viz'

// Simulation
import { simulationBasicViz } from './simulation-basic-viz'
import { gridMovementViz } from './grid-movement-viz'

// Brute Force
import { exhaustiveSearchViz } from './exhaustive-search-viz'
import { permutationViz } from './permutation-viz'

// Coordinate Compression
import { coordinateCompressionViz } from './coordinate-compression-viz'

// LCA
import { lcaViz } from './lca-viz'

// Network Flow
import { maxFlowViz } from './max-flow-viz'
import { bipartiteMatchingViz } from './bipartite-matching-viz'

// Geometry
import { ccwViz } from './ccw-viz'
import { convexHullViz } from './convex-hull-viz'

// Sweeping
import { lineeSweepingViz } from './line-sweeping-viz'
import { eventSweepingViz } from './event-sweeping-viz'

const visualizationMap: Record<string, VisualizationConfig> = {
  // Sorting
  'sorting/bubble-sort': bubbleSortViz,
  'sorting/merge-sort': mergeSortViz,
  'sorting/quick-sort': quickSortViz,
  'sorting/counting-sort': countingSortViz,
  'sorting/custom-sort': customSortViz,

  // Searching
  'searching/linear-search': linearSearchViz,
  'searching/binary-search-basic': binarySearchViz,
  'searching/parametric-search': parametricSearchViz,

  // DP
  'dp/fibonacci-memoization': fibonacciDpViz,
  'dp/knapsack': knapsackViz,
  'dp/lis': lisViz,
  'dp/interval-dp': intervalDpViz,

  // Graph
  'graph/dfs': dfsViz,
  'graph/bfs': bfsViz,
  'graph/connected-components': connectedComponentsViz,
  'graph/scc': sccViz,
  'graph/bipartite-graph': bipartiteViz,

  // Greedy
  'greedy/activity-selection': activitySelectionViz,
  'greedy/fractional-knapsack': fractionalKnapsackViz,
  'greedy/coin-change-greedy': coinChangeGreedyViz,

  // Implementation
  'implementation/simulation': simulationViz,
  'implementation/string-parsing': stringParsingViz,
  'implementation/matrix-rotation': matrixRotationViz,

  // Stack & Queue
  'stack-queue/stack-basic': stackViz,
  'stack-queue/queue-basic': queueBasicViz,
  'stack-queue/monotone-stack': monotoneStackViz,
  'stack-queue/deque-basic': dequeViz,
  'stack-queue/monotone-deque': monotoneDequeViz,

  // Hash
  'hash/hash-map': hashMapViz,
  'hash/hash-set': hashSetViz,
  'hash/counting': countingHashViz,

  // Binary Search
  'binary-search/lower-bound': lowerBoundViz,
  'binary-search/upper-bound': upperBoundViz,
  'binary-search/answer-binary-search': answerBinarySearchViz,

  // Tree
  'tree/binary-tree-traversal': treeTraversalViz,
  'tree/bst': bstViz,
  'tree/tree-dp': treeDpViz,

  // String
  'string/kmp': kmpViz,
  'string/rabin-karp': rabinKarpViz,
  'string/trie': trieViz,
  'string/string-hashing': stringHashingViz,

  // Math
  'math/prime-sieve': primeSieveViz,
  'math/gcd-lcm': gcdLcmViz,
  'math/modular-arithmetic': modularArithmeticViz,

  // Bitmask
  'bitmask/bit-operations': bitOperationsViz,
  'bitmask/subset-enumeration': subsetEnumerationViz,
  'bitmask/bitmask-dp': bitmaskDpViz,

  // Segment Tree
  'segment-tree/basic-segment-tree': basicSegmentTreeViz,
  'segment-tree/lazy-propagation': lazyPropagationViz,
  'segment-tree/fenwick-tree': fenwickTreeViz,

  // Union-Find
  'union-find/basic-union-find': basicUnionFindViz,
  'union-find/weighted-union-find': weightedUnionFindViz,

  // Two Pointer
  'two-pointer/two-pointer-basic': twoPointerViz,
  'two-pointer/sliding-window': slidingWindowViz,
  'two-pointer/meet-in-the-middle': meetInTheMiddleViz,

  // Backtracking
  'backtracking/n-queens': nQueensViz,
  'backtracking/permutation-combination': permutationCombinationViz,
  'backtracking/sudoku': sudokuViz,

  // Shortest Path
  'shortest-path/dijkstra': dijkstraViz,
  'shortest-path/bellman-ford': bellmanFordViz,
  'shortest-path/floyd-warshall': floydWarshallViz,

  // Topological Sort
  'topological-sort/kahn-algorithm': kahnAlgorithmViz,
  'topological-sort/dfs-topological-sort': dfsTopologicalSortViz,

  // Trie
  'trie/basic-trie': trieBasicViz,
  'trie/autocomplete': autocompleteViz,

  // MST
  'mst/kruskal': kruskalViz,
  'mst/prim': primViz,

  // Heap
  'heap/heap-basic': heapBasicViz,
  'heap/top-k': topKViz,

  // Prefix Sum
  'prefix-sum/prefix-sum-1d': prefixSum1dViz,
  'prefix-sum/prefix-sum-2d': prefixSum2dViz,

  // Divide and Conquer
  'divide-and-conquer/basic-divide-conquer': divideConquerBasicViz,
  'divide-and-conquer/fast-exponentiation': fastExponentiationViz,

  // Simulation
  'simulation/basic-simulation': simulationBasicViz,
  'simulation/grid-movement': gridMovementViz,

  // Brute Force
  'brute-force/exhaustive-search': exhaustiveSearchViz,
  'brute-force/permutation-combination': permutationViz,

  // Coordinate Compression
  'coordinate-compression/basic-compression': coordinateCompressionViz,

  // LCA
  'lca/naive-lca': lcaViz,

  // Network Flow
  'network-flow/max-flow': maxFlowViz,
  'network-flow/bipartite-matching': bipartiteMatchingViz,

  // Geometry
  'geometry/ccw': ccwViz,
  'geometry/convex-hull': convexHullViz,

  // Sweeping
  'sweeping/line-sweeping': lineeSweepingViz,
  'sweeping/event-sweeping': eventSweepingViz,
}

export function getVisualization(categoryId: string, patternId: string): VisualizationConfig | null {
  return visualizationMap[`${categoryId}/${patternId}`] ?? null
}
