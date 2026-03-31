import type { Category } from '../../types/algorithm'

export const treeCategory: Category = {
  id: 'tree',
  name: '트리',
  icon: '🌳',
  description: '트리 자료구조의 순회, 이진 탐색 트리, 트리 DP 등 트리 기반 문제 해결 패턴을 학습합니다.',
  patterns: [
    {
      id: 'binary-tree-traversal',
      name: '이진 트리 순회',
      description: '전위(Preorder), 중위(Inorder), 후위(Postorder), 레벨 순회(BFS) 등 트리를 체계적으로 탐색하는 방법입니다.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(n) (재귀 스택 또는 큐)',
      keyInsight: '전위는 루트를 먼저, 중위는 중간에, 후위는 마지막에 처리합니다. 후위 순회는 자식 결과를 합산할 때, 레벨 순회는 깊이별 처리가 필요할 때 사용합니다.',
      tools: [
        {
          name: 'collections.deque',
          description: '레벨 순회(BFS)에서 큐로 사용합니다. popleft()가 O(1)이므로 list의 pop(0) O(n)보다 훨씬 효율적입니다.',
          import: 'from collections import deque',
        },
        {
          name: 'sys.setrecursionlimit',
          description: 'Python 기본 재귀 제한(1000)을 늘려 깊은 트리의 재귀 순회 시 RecursionError를 방지합니다.',
          import: 'import sys',
        },
      ],
      codeExamples: [
        {
          title: '트리 순회 (재귀 및 BFS)',
          code: `from collections import deque

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def preorder(root: TreeNode | None) -> list[int]:
    """전위 순회: 루트 -> 왼쪽 -> 오른쪽"""
    if not root:
        return []
    return [root.val] + preorder(root.left) + preorder(root.right)

def inorder(root: TreeNode | None) -> list[int]:
    """중위 순회: 왼쪽 -> 루트 -> 오른쪽"""
    if not root:
        return []
    return inorder(root.left) + [root.val] + inorder(root.right)

def level_order(root: TreeNode | None) -> list[list[int]]:
    """레벨 순회 (BFS): 깊이별로 노드를 그룹화"""
    if not root:
        return []
    result = []
    queue = deque([root])
    while queue:
        level = []
        for _ in range(len(queue)):
            node = queue.popleft()
            level.append(node.val)
            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)
        result.append(level)
    return result

# 예시:     1
#          / \\
#         2   3
#        / \\
#       4   5
root = TreeNode(1, TreeNode(2, TreeNode(4), TreeNode(5)), TreeNode(3))
print(preorder(root))     # [1, 2, 4, 5, 3]
print(inorder(root))      # [4, 2, 5, 1, 3]
print(level_order(root))  # [[1], [2, 3], [4, 5]]`,
          explanation: '재귀를 이용한 전위/중위 순회와 큐를 이용한 레벨 순회를 구현합니다. 레벨 순회에서 한 레벨의 크기를 미리 구해 반복하는 것이 핵심입니다.',
        },
        {
          title: '트리의 최대 깊이',
          code: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def max_depth(root: TreeNode | None) -> int:
    if not root:
        return 0
    return 1 + max(max_depth(root.left), max_depth(root.right))

# 예시
root = TreeNode(1, TreeNode(2, TreeNode(4), TreeNode(5)), TreeNode(3))
print(max_depth(root))  # 3`,
          explanation: '후위 순회 방식으로 왼쪽/오른쪽 서브트리의 깊이를 먼저 구한 뒤, 더 큰 값에 1을 더합니다.',
        },
      ],
      commonProblems: [
        { name: 'Maximum Depth of Binary Tree', platform: 'leetcode', id: '104', slug: 'maximum-depth-of-binary-tree', difficulty: 'Easy' },
        { name: 'Binary Tree Level Order Traversal', platform: 'leetcode', id: '102', slug: 'binary-tree-level-order-traversal', difficulty: 'Medium' },
        { name: 'Diameter of Binary Tree', platform: 'leetcode', id: '543', slug: 'diameter-of-binary-tree', difficulty: 'Easy' },
        { name: '대칭 트리 판별', platform: 'boj', id: '1991' },
        { name: '경로 합 구하기', platform: 'boj', id: '1967' },
        { name: '이진 트리 반전', platform: 'boj', id: '1991' },
      ],
      tips: [
        '트리 문제는 대부분 재귀로 접근하면 자연스럽습니다.',
        '레벨 순회에서 deque를 사용하면 popleft()가 O(1)입니다.',
        '재귀 깊이가 깊을 수 있으므로 sys.setrecursionlimit 설정을 고려하세요.',
      ],
    },
    {
      id: 'bst',
      name: '이진 탐색 트리 (BST)',
      description: '왼쪽 서브트리의 모든 값 < 루트 < 오른쪽 서브트리의 모든 값이라는 성질을 이용하여 O(log n) 탐색이 가능한 트리입니다.',
      timeComplexity: 'O(log n) 평균, O(n) 최악',
      spaceComplexity: 'O(n)',
      keyInsight: 'BST의 중위 순회 결과는 항상 오름차순으로 정렬되어 있습니다. 이 성질을 이용하면 유효성 검증, k번째 원소 찾기 등을 효율적으로 풀 수 있습니다.',
      tools: [
        {
          name: 'bisect',
          description: '정렬된 리스트로 BST를 시뮬레이션할 때 삽입 위치를 O(log n)에 찾습니다. insort()로 정렬 유지하며 삽입할 수 있습니다.',
          import: 'from bisect import bisect_left, insort',
        },
        {
          name: 'None 기반 노드 클래스',
          description: 'TreeNode의 left/right를 None으로 초기화하여 BST 노드를 표현합니다. Python에서 트리 구현의 기본 패턴입니다.',
          import: '내장 자료형',
        },
      ],
      codeExamples: [
        {
          title: 'BST 유효성 검증',
          code: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def is_valid_bst(root: TreeNode | None) -> bool:
    def validate(node, min_val, max_val):
        if not node:
            return True
        if node.val <= min_val or node.val >= max_val:
            return False
        return (validate(node.left, min_val, node.val) and
                validate(node.right, node.val, max_val))

    return validate(root, float('-inf'), float('inf'))

# 유효한 BST:  2
#             / \\
#            1   3
valid = TreeNode(2, TreeNode(1), TreeNode(3))
print(is_valid_bst(valid))  # True

# 유효하지 않은 BST:  5
#                    / \\
#                   1   4
#                      / \\
#                     3   6
invalid = TreeNode(5, TreeNode(1), TreeNode(4, TreeNode(3), TreeNode(6)))
print(is_valid_bst(invalid))  # False`,
          explanation: '각 노드가 허용 범위(min_val, max_val) 내에 있는지 재귀적으로 검증합니다. 왼쪽으로 갈 때는 max를, 오른쪽으로 갈 때는 min을 현재 값으로 갱신합니다.',
        },
        {
          title: 'BST에서 K번째 최솟값 찾기',
          code: `class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def kth_smallest(root: TreeNode, k: int) -> int:
    """중위 순회로 k번째 작은 값을 찾음"""
    stack = []
    current = root
    count = 0

    while stack or current:
        while current:
            stack.append(current)
            current = current.left
        current = stack.pop()
        count += 1
        if count == k:
            return current.val
        current = current.right

    return -1  # k가 노드 수보다 큰 경우

# 예시:    3
#        / \\
#       1   4
#        \\
#         2
root = TreeNode(3, TreeNode(1, None, TreeNode(2)), TreeNode(4))
print(kth_smallest(root, 1))  # 1
print(kth_smallest(root, 3))  # 3`,
          explanation: '반복적 중위 순회로 작은 값부터 방문하며 k번째에 해당하는 값을 반환합니다. 재귀 대신 스택을 사용하여 메모리를 효율적으로 관리합니다.',
        },
      ],
      commonProblems: [
        { name: 'Validate Binary Search Tree', platform: 'leetcode', id: '98', slug: 'validate-binary-search-tree', difficulty: 'Medium' },
        { name: 'BST에서 K번째 최솟값', platform: 'boj', id: '1620' },
        { name: 'BST에서 최소 공통 조상 (LCA)', platform: 'boj', id: '11437' },
        { name: '정렬된 배열로 BST 만들기', platform: 'boj', id: '1539' },
        { name: 'BST에서 삽입/삭제', platform: 'boj', id: '5639' },
      ],
      tips: [
        'BST 문제에서 중위 순회를 떠올리면 많은 문제가 풀립니다.',
        '범위 검증은 단순히 부모와 비교하는 것이 아니라 전체 허용 범위를 전달해야 합니다.',
        'Python에서는 SortedList(from sortedcontainers)를 사용하면 균형 BST를 쉽게 구현할 수 있습니다.',
      ],
    },
    {
      id: 'tree-dp',
      name: '트리 DP',
      description: '트리 구조에서 후위 순회를 이용해 자식 노드의 결과를 합산하여 동적 프로그래밍을 수행하는 패턴입니다.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(n)',
      keyInsight: '트리 DP는 리프 노드에서 시작하여 루트로 올라가며(후위 순회) 각 노드에서 자식 결과를 조합합니다. 인접 리스트와 DFS로 구현합니다.',
      tools: [
        {
          name: 'sys.setrecursionlimit',
          description: '트리 DP는 깊은 재귀를 사용하므로 노드 수 + 여유분으로 재귀 제한을 설정해야 합니다.',
          import: 'import sys',
        },
        {
          name: 'collections.defaultdict',
          description: '인접 리스트를 defaultdict(list)로 구성하면 키 존재 여부 확인 없이 간결하게 간선을 추가할 수 있습니다.',
          import: 'from collections import defaultdict',
        },
      ],
      codeExamples: [
        {
          title: '트리의 지름 구하기',
          code: `import sys
sys.setrecursionlimit(100001)

def tree_diameter(n: int, edges: list[tuple[int, int, int]]) -> int:
    """가중치 트리에서 가장 긴 경로(지름)를 구함"""
    graph = [[] for _ in range(n + 1)]
    for u, v, w in edges:
        graph[u].append((v, w))
        graph[v].append((u, w))

    diameter = 0

    def dfs(node: int, parent: int) -> int:
        nonlocal diameter
        max1 = max2 = 0  # 자식으로의 가장 긴 두 경로

        for child, weight in graph[node]:
            if child == parent:
                continue
            child_dist = dfs(child, node) + weight
            if child_dist > max1:
                max2 = max1
                max1 = child_dist
            elif child_dist > max2:
                max2 = child_dist

        diameter = max(diameter, max1 + max2)
        return max1

    dfs(1, -1)
    return diameter

# 예시: 5개 노드 트리
#   1 --(3)-- 2 --(4)-- 3
#   |                    |
#  (2)                  (5)
#   |                    |
#   4                    5
edges = [(1, 2, 3), (2, 3, 4), (1, 4, 2), (3, 5, 5)]
print(tree_diameter(5, edges))  # 12 (4->1->2->3->5: 2+3+4+5=14 아닌 5->3->2->1->4 경로 중 최대)`,
          explanation: '각 노드에서 자식으로 향하는 가장 긴 두 경로를 구하여 합산하면 해당 노드를 지나는 최장 경로입니다. 모든 노드에 대해 이 값의 최댓값이 트리의 지름입니다.',
        },
        {
          title: '트리에서 독립 집합 (최대 가중치)',
          code: `import sys
sys.setrecursionlimit(100001)

def max_independent_set(n: int, weights: list[int],
                        edges: list[tuple[int, int]]) -> int:
    """인접하지 않은 노드들의 최대 가중치 합"""
    graph = [[] for _ in range(n + 1)]
    for u, v in edges:
        graph[u].append(v)
        graph[v].append(u)

    # dp[node][0] = node를 선택하지 않을 때의 최대합
    # dp[node][1] = node를 선택할 때의 최대합
    dp = [[0, 0] for _ in range(n + 1)]

    def dfs(node: int, parent: int):
        dp[node][1] = weights[node - 1]  # 자신을 선택
        for child in graph[node]:
            if child == parent:
                continue
            dfs(child, node)
            dp[node][0] += max(dp[child][0], dp[child][1])  # 자식 선택/미선택 중 최대
            dp[node][1] += dp[child][0]  # 자식은 반드시 미선택

    dfs(1, -1)
    return max(dp[1][0], dp[1][1])

# 예시: 트리 1-2, 1-3, 2-4, 2-5
# 가중치: [1, 10, 5, 3, 8]
edges = [(1, 2), (1, 3), (2, 4), (2, 5)]
print(max_independent_set(5, [1, 10, 5, 3, 8], edges))  # 16 (3+5+8)`,
          explanation: '각 노드마다 "선택/미선택" 두 상태의 DP를 유지합니다. 선택하면 자식은 미선택, 미선택이면 자식은 자유롭게 선택 가능합니다.',
        },
      ],
      commonProblems: [
        { name: 'House Robber III', platform: 'leetcode', id: '337', slug: 'house-robber-iii', difficulty: 'Medium' },
        { name: '트리의 지름 구하기', platform: 'boj', id: '1167' },
        { name: '트리에서 독립 집합', platform: 'boj', id: '2213' },
        { name: '트리에서 최소 버텍스 커버', platform: 'boj', id: '2533' },
        { name: '서브트리 크기 구하기', platform: 'boj', id: '15681' },
        { name: '트리 DP로 경로 수 세기', platform: 'boj', id: '2533' },
      ],
      tips: [
        '트리 DP는 항상 후위 순회(자식 먼저 처리) 순서로 진행됩니다.',
        'parent를 인자로 전달하여 방문한 노드를 다시 방문하지 않도록 합니다.',
        'sys.setrecursionlimit을 충분히 높게 설정하세요 (노드 수 + 여유분).',
      ],
    },
  ],
}
