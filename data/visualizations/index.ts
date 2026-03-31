import type { VisualizationConfig } from '../../types/visualization'

type VizLoader = () => Promise<VisualizationConfig>

const loaders: Record<string, VizLoader> = {
  // Sorting
  'sorting/bubble-sort': () => import('./bubble-sort-viz').then((m) => m.bubbleSortViz),
  'sorting/merge-sort': () => import('./merge-sort-viz').then((m) => m.mergeSortViz),
  'sorting/quick-sort': () => import('./quick-sort-viz').then((m) => m.quickSortViz),
  'sorting/counting-sort': () => import('./counting-sort-viz').then((m) => m.countingSortViz),
  'sorting/custom-sort': () => import('./custom-sort-viz').then((m) => m.customSortViz),

  // Searching
  'searching/linear-search': () => import('./linear-search-viz').then((m) => m.linearSearchViz),
  'searching/binary-search-basic': () => import('./binary-search-viz').then((m) => m.binarySearchViz),
  'searching/parametric-search': () => import('./parametric-search-viz').then((m) => m.parametricSearchViz),

  // DP
  'dp/fibonacci-memoization': () => import('./fibonacci-dp-viz').then((m) => m.fibonacciDpViz),
  'dp/knapsack': () => import('./knapsack-viz').then((m) => m.knapsackViz),
  'dp/lis': () => import('./lis-viz').then((m) => m.lisViz),
  'dp/interval-dp': () => import('./interval-dp-viz').then((m) => m.intervalDpViz),

  // Graph
  'graph/dfs': () => import('./dfs-viz').then((m) => m.dfsViz),
  'graph/bfs': () => import('./bfs-viz').then((m) => m.bfsViz),
  'graph/connected-components': () => import('./connected-components-viz').then((m) => m.connectedComponentsViz),
  'graph/scc': () => import('./scc-viz').then((m) => m.sccViz),
  'graph/bipartite-graph': () => import('./bipartite-viz').then((m) => m.bipartiteViz),

  // Greedy
  'greedy/activity-selection': () => import('./activity-selection-viz').then((m) => m.activitySelectionViz),
  'greedy/fractional-knapsack': () => import('./fractional-knapsack-viz').then((m) => m.fractionalKnapsackViz),
  'greedy/coin-change-greedy': () => import('./coin-change-greedy-viz').then((m) => m.coinChangeGreedyViz),

  // Implementation
  'implementation/simulation': () => import('./simulation-viz').then((m) => m.simulationViz),
  'implementation/string-parsing': () => import('./string-parsing-viz').then((m) => m.stringParsingViz),
  'implementation/matrix-rotation': () => import('./matrix-rotation-viz').then((m) => m.matrixRotationViz),

  // Stack & Queue
  'stack-queue/stack-basic': () => import('./stack-viz').then((m) => m.stackViz),
  'stack-queue/queue-basic': () => import('./queue-basic-viz').then((m) => m.queueBasicViz),
  'stack-queue/monotone-stack': () => import('./monotone-stack-viz').then((m) => m.monotoneStackViz),
  'stack-queue/deque-basic': () => import('./deque-viz').then((m) => m.dequeViz),
  'stack-queue/monotone-deque': () => import('./monotone-deque-viz').then((m) => m.monotoneDequeViz),

  // Hash
  'hash/hash-map': () => import('./hash-map-viz').then((m) => m.hashMapViz),
  'hash/hash-set': () => import('./hash-set-viz').then((m) => m.hashSetViz),
  'hash/counting': () => import('./counting-hash-viz').then((m) => m.countingHashViz),

  // Binary Search
  'binary-search/lower-bound': () => import('./lower-bound-viz').then((m) => m.lowerBoundViz),
  'binary-search/upper-bound': () => import('./upper-bound-viz').then((m) => m.upperBoundViz),
  'binary-search/answer-binary-search': () => import('./answer-binary-search-viz').then((m) => m.answerBinarySearchViz),

  // Tree
  'tree/binary-tree-traversal': () => import('./tree-traversal-viz').then((m) => m.treeTraversalViz),
  'tree/bst': () => import('./bst-viz').then((m) => m.bstViz),
  'tree/tree-dp': () => import('./tree-dp-viz').then((m) => m.treeDpViz),

  // String
  'string/kmp': () => import('./kmp-viz').then((m) => m.kmpViz),
  'string/rabin-karp': () => import('./rabin-karp-viz').then((m) => m.rabinKarpViz),
  'string/trie': () => import('./trie-viz').then((m) => m.trieViz),
  'string/string-hashing': () => import('./string-hashing-viz').then((m) => m.stringHashingViz),

  // Trie
  'trie/basic-trie': () => import('./trie-basic-viz').then((m) => m.trieBasicViz),
  'trie/autocomplete': () => import('./autocomplete-viz').then((m) => m.autocompleteViz),

  // Math
  'math/prime-sieve': () => import('./prime-sieve-viz').then((m) => m.primeSieveViz),
  'math/gcd-lcm': () => import('./gcd-lcm-viz').then((m) => m.gcdLcmViz),
  'math/modular-arithmetic': () => import('./modular-arithmetic-viz').then((m) => m.modularArithmeticViz),

  // Bitmask
  'bitmask/bit-operations': () => import('./bit-operations-viz').then((m) => m.bitOperationsViz),
  'bitmask/subset-enumeration': () => import('./subset-enumeration-viz').then((m) => m.subsetEnumerationViz),
  'bitmask/bitmask-dp': () => import('./bitmask-dp-viz').then((m) => m.bitmaskDpViz),

  // Segment Tree
  'segment-tree/basic-segment-tree': () => import('./basic-segment-tree-viz').then((m) => m.basicSegmentTreeViz),
  'segment-tree/lazy-propagation': () => import('./lazy-propagation-viz').then((m) => m.lazyPropagationViz),
  'segment-tree/fenwick-tree': () => import('./fenwick-tree-viz').then((m) => m.fenwickTreeViz),

  // Union-Find
  'union-find/basic-union-find': () => import('./basic-union-find-viz').then((m) => m.basicUnionFindViz),
  'union-find/weighted-union-find': () => import('./weighted-union-find-viz').then((m) => m.weightedUnionFindViz),

  // Two Pointer
  'two-pointer/two-pointer-basic': () => import('./two-pointer-viz').then((m) => m.twoPointerViz),
  'two-pointer/sliding-window': () => import('./sliding-window-viz').then((m) => m.slidingWindowViz),

  // Backtracking
  'backtracking/n-queens': () => import('./n-queens-viz').then((m) => m.nQueensViz),
  'backtracking/permutation-combination': () => import('./permutation-combination-viz').then((m) => m.permutationCombinationViz),
  'backtracking/sudoku': () => import('./sudoku-viz').then((m) => m.sudokuViz),

  // Shortest Path
  'shortest-path/dijkstra': () => import('./dijkstra-viz').then((m) => m.dijkstraViz),
  'shortest-path/bellman-ford': () => import('./bellman-ford-viz').then((m) => m.bellmanFordViz),
  'shortest-path/floyd-warshall': () => import('./floyd-warshall-viz').then((m) => m.floydWarshallViz),

  // Topological Sort
  'topological-sort/kahn-algorithm': () => import('./kahn-algorithm-viz').then((m) => m.kahnAlgorithmViz),
  'topological-sort/dfs-topological-sort': () => import('./dfs-topological-sort-viz').then((m) => m.dfsTopologicalSortViz),

  // MST
  'mst/kruskal': () => import('./kruskal-viz').then((m) => m.kruskalViz),
  'mst/prim': () => import('./prim-viz').then((m) => m.primViz),

  // Heap
  'heap/heap-basic': () => import('./heap-basic-viz').then((m) => m.heapBasicViz),
  'heap/top-k': () => import('./top-k-viz').then((m) => m.topKViz),

  // Prefix Sum
  'prefix-sum/prefix-sum-1d': () => import('./prefix-sum-1d-viz').then((m) => m.prefixSum1dViz),
  'prefix-sum/prefix-sum-2d': () => import('./prefix-sum-2d-viz').then((m) => m.prefixSum2dViz),

  // Divide and Conquer
  'divide-and-conquer/basic-divide-conquer': () => import('./divide-conquer-basic-viz').then((m) => m.divideConquerBasicViz),
  'divide-and-conquer/fast-exponentiation': () => import('./fast-exponentiation-viz').then((m) => m.fastExponentiationViz),
  'divide-and-conquer/meet-in-the-middle': () => import('./meet-in-the-middle-viz').then((m) => m.meetInTheMiddleViz),

  // Simulation
  'simulation/basic-simulation': () => import('./simulation-basic-viz').then((m) => m.simulationBasicViz),
  'simulation/grid-movement': () => import('./grid-movement-viz').then((m) => m.gridMovementViz),

  // Brute Force
  'brute-force/exhaustive-search': () => import('./exhaustive-search-viz').then((m) => m.exhaustiveSearchViz),
  'brute-force/permutation-combination': () => import('./permutation-viz').then((m) => m.permutationViz),

  // Coordinate Compression
  'coordinate-compression/basic-compression': () => import('./coordinate-compression-viz').then((m) => m.coordinateCompressionViz),
  'coordinate-compression/compression-with-segment-tree': () => import('./compression-segment-tree-viz').then((m) => m.compressionSegmentTreeViz),

  // LCA
  'lca/naive-lca': () => import('./lca-viz').then((m) => m.lcaViz),
  'lca/sparse-table-lca': () => import('./sparse-table-lca-viz').then((m) => m.sparseTableLcaViz),

  // Network Flow
  'network-flow/max-flow': () => import('./max-flow-viz').then((m) => m.maxFlowViz),
  'network-flow/bipartite-matching': () => import('./bipartite-matching-viz').then((m) => m.bipartiteMatchingViz),

  // Geometry
  'geometry/ccw': () => import('./ccw-viz').then((m) => m.ccwViz),
  'geometry/convex-hull': () => import('./convex-hull-viz').then((m) => m.convexHullViz),

  // Sweeping
  'sweeping/line-sweeping': () => import('./line-sweeping-viz').then((m) => m.lineeSweepingViz),
  'sweeping/event-sweeping': () => import('./event-sweeping-viz').then((m) => m.eventSweepingViz),
}

export async function getVisualization(categoryId: string, patternId: string): Promise<VisualizationConfig | null> {
  const key = `${categoryId}/${patternId}`
  const loader = loaders[key]
  if (!loader) return null
  return loader()
}
