import type { Category } from '../../types/algorithm'

export const backtrackingCategory: Category = {
  id: 'backtracking',
  name: '백트래킹',
  icon: '🔙',
  description:
    '가능한 모든 경우를 탐색하되, 유망하지 않은 경로는 조기에 포기(가지치기)하여 탐색 공간을 줄이는 기법입니다. 조합 탐색, 제약 충족 문제 등에서 완전탐색보다 훨씬 효율적입니다.',
  patterns: [
    {
      id: 'n-queens',
      name: 'N-Queens 문제',
      description:
        'N×N 체스판에 N개의 퀸을 서로 공격할 수 없도록 배치하는 고전적인 백트래킹 문제입니다. 행 단위로 퀸을 배치하며, 열/대각선 충돌을 검사하여 가지치기합니다.',
      timeComplexity: 'O(N!) (가지치기로 실제는 훨씬 적음)',
      spaceComplexity: 'O(N)',
      keyInsight:
        '한 행에 퀸은 하나만 놓을 수 있으므로 행별로 열을 선택합니다. 열, 왼쪽 대각선(row-col), 오른쪽 대각선(row+col)의 사용 여부를 집합으로 관리하면 O(1)에 충돌을 검사할 수 있습니다.',
      pythonTools: [
        {
          name: 'list',
          description: '체스판 상태를 배열로 관리합니다. 각 행에 퀸이 놓인 열 번호를 저장하는 1차원 배열로 충분합니다.',
          import: '내장 자료형',
        },
        {
          name: 'set',
          description: '열(cols), / 대각선(row+col), \\ 대각선(row-col) 점유 여부를 집합으로 관리하여 O(1)에 충돌을 검사합니다.',
          import: '내장 자료형',
        },
      ],
      codeExamples: [
        {
          title: 'N-Queens 풀이 (BOJ 9663)',
          code: `import sys
input = sys.stdin.readline

def solve_n_queens(n):
    count = 0
    cols = set()        # 사용 중인 열
    diag1 = set()       # 사용 중인 / 대각선 (row + col)
    diag2 = set()       # 사용 중인 \\ 대각선 (row - col)

    def backtrack(row):
        nonlocal count
        if row == n:
            count += 1
            return

        for col in range(n):
            if col in cols or (row + col) in diag1 or (row - col) in diag2:
                continue

            cols.add(col)
            diag1.add(row + col)
            diag2.add(row - col)

            backtrack(row + 1)

            cols.remove(col)
            diag1.remove(row + col)
            diag2.remove(row - col)

    backtrack(0)
    return count

n = int(input())
print(solve_n_queens(n))`,
          explanation:
            '행 0부터 시작하여 각 행마다 가능한 열에 퀸을 놓습니다. 열(cols), / 대각선(row+col), \\ 대각선(row-col) 집합으로 충돌을 O(1)에 검사합니다. 놓은 뒤 다음 행으로 재귀하고, 돌아오면 복원(backtrack)합니다.',
        },
      ],
      commonProblems: [
        { name: 'N-Queen', platform: 'boj', id: '9663' },
        { name: '비숍', platform: 'boj', id: '1799' },
        { name: 'N-Queens', platform: 'leetcode', id: '51', slug: 'n-queens', difficulty: 'Hard' },
        { name: 'Permutations', platform: 'leetcode', id: '46', slug: 'permutations', difficulty: 'Medium' },
      ],
      tips: [
        '집합(set)을 사용하면 O(1)에 충돌 검사를 할 수 있습니다.',
        'Python에서 N=15 이상은 시간이 오래 걸리므로, N이 크면 비트마스크 최적화를 고려하세요.',
        '대칭성을 이용하면 탐색 공간을 절반으로 줄일 수 있습니다.',
      ],
    },
    {
      id: 'permutation-combination',
      name: '순열/조합 생성',
      description:
        '백트래킹으로 순열, 조합, 부분집합을 생성하는 기본 패턴입니다. 코딩 테스트에서 가장 자주 등장하는 백트래킹 유형으로, 조건에 따른 가지치기가 핵심입니다.',
      timeComplexity: '순열 O(N!), 조합 O(2^N) 또는 O(C(N,K))',
      spaceComplexity: 'O(N) (재귀 깊이)',
      keyInsight:
        '순열은 사용 여부를 체크하며 모든 위치를 순회하고, 조합은 시작 인덱스를 증가시켜 중복을 방지합니다. 가지치기 조건을 추가하면 탐색 공간을 대폭 줄일 수 있습니다.',
      pythonTools: [
        {
          name: 'itertools.permutations / itertools.combinations',
          description: '가지치기가 불필요한 경우 내장 함수로 순열/조합을 간결하게 생성할 수 있습니다. permutations(arr, r), combinations(arr, r)로 사용합니다.',
          import: 'from itertools import permutations, combinations',
        },
        {
          name: 'list',
          description: '직접 백트래킹 구현 시 used 배열(방문 체크)과 path 배열(현재 선택 상태)을 관리합니다.',
          import: '내장 자료형',
        },
      ],
      codeExamples: [
        {
          title: '순열과 조합 생성',
          code: `# 순열: N개 중 M개를 순서 있게 선택
def permutations(n, m):
    result = []
    used = [False] * (n + 1)
    path = []

    def backtrack():
        if len(path) == m:
            result.append(path[:])
            return
        for i in range(1, n + 1):
            if used[i]:
                continue
            used[i] = True
            path.append(i)
            backtrack()
            path.pop()
            used[i] = False

    backtrack()
    return result

# 조합: N개 중 M개를 순서 없이 선택
def combinations(n, m):
    result = []
    path = []

    def backtrack(start):
        if len(path) == m:
            result.append(path[:])
            return
        for i in range(start, n + 1):
            path.append(i)
            backtrack(i + 1)  # i+1부터 시작하여 중복 방지
            path.pop()

    backtrack(1)
    return result

# 사용 예시
print(permutations(3, 2))  # [[1,2],[1,3],[2,1],[2,3],[3,1],[3,2]]
print(combinations(4, 2))  # [[1,2],[1,3],[1,4],[2,3],[2,4],[3,4]]`,
          explanation:
            '순열: used 배열로 이미 선택한 원소를 추적하고, 매번 1부터 N까지 순회합니다. 조합: start 매개변수로 이전에 선택한 것보다 큰 번호만 선택하여 중복 조합을 방지합니다.',
        },
        {
          title: '가지치기가 있는 조합 (BOJ 15650 풀이 확장)',
          code: `import sys
input = sys.stdin.readline

def solve():
    n, m = map(int, input().split())
    path = []

    def backtrack(start):
        if len(path) == m:
            print(' '.join(map(str, path)))
            return

        # 가지치기: 남은 원소가 부족하면 중단
        remaining = n - start + 1
        needed = m - len(path)
        if remaining < needed:
            return

        for i in range(start, n + 1):
            path.append(i)
            backtrack(i + 1)
            path.pop()

    backtrack(1)

solve()`,
          explanation:
            '남은 원소 수(n - start + 1)가 아직 필요한 원소 수(m - len(path))보다 적으면 더 탐색해도 M개를 채울 수 없으므로 조기 종료합니다. 이런 가지치기 하나만으로도 큰 성능 향상을 얻을 수 있습니다.',
        },
      ],
      commonProblems: [
        { name: 'N과 M (1) ~ (12) 시리즈', platform: 'boj', id: '15649' },
        { name: '로또', platform: 'boj', id: '6603' },
        { name: '부분수열의 합', platform: 'boj', id: '1182' },
        { name: '스도쿠', platform: 'boj', id: '2580' },
        { name: 'Combinations', platform: 'leetcode', id: '77', slug: 'combinations', difficulty: 'Medium' },
        { name: 'Subsets', platform: 'leetcode', id: '78', slug: 'subsets', difficulty: 'Medium' },
      ],
      tips: [
        'path.append / path.pop 패턴으로 상태를 관리하세요.',
        '중복 순열은 used 체크를 제거하고, 중복 조합은 start를 i+1 대신 i로 바꿉니다.',
        '가지치기 조건을 먼저 생각하고, 없이 풀린다면 추가하지 않아도 됩니다.',
        'itertools.permutations, combinations를 쓸 수 있다면 활용하되, 가지치기가 필요하면 직접 구현해야 합니다.',
      ],
    },
    {
      id: 'sudoku',
      name: '스도쿠',
      description:
        '9×9 스도쿠 퍼즐을 백트래킹으로 해결합니다. 빈 칸에 1~9를 시도하며, 행/열/3×3 박스 제약을 만족하지 않으면 즉시 되돌립니다.',
      timeComplexity: 'O(9^(빈칸수)) (가지치기로 실제는 훨씬 적음)',
      spaceComplexity: 'O(빈칸수) (재귀 깊이)',
      keyInsight:
        '행, 열, 박스별로 사용된 숫자를 집합이나 비트마스크로 관리하면 O(1)에 제약 조건을 검사할 수 있습니다. 빈 칸이 적은 행/열부터 채우면 가지치기 효과가 극대화됩니다.',
      pythonTools: [
        {
          name: 'list',
          description: '9x9 보드를 2차원 리스트로 표현하고, 빈 칸 좌표를 리스트로 관리합니다.',
          import: '내장 자료형',
        },
        {
          name: 'set',
          description: '행별/열별/3x3 박스별 사용된 숫자를 집합으로 관리하여 O(1)에 중복 검사합니다. add/remove로 백트래킹 시 상태를 복원합니다.',
          import: '내장 자료형',
        },
      ],
      codeExamples: [
        {
          title: '스도쿠 풀기 (BOJ 2580)',
          code: `import sys
input = sys.stdin.readline

board = []
blanks = []

for i in range(9):
    row = list(map(int, input().split()))
    board.append(row)
    for j in range(9):
        if row[j] == 0:
            blanks.append((i, j))

# 행, 열, 박스별 사용된 숫자
row_used = [set() for _ in range(9)]
col_used = [set() for _ in range(9)]
box_used = [set() for _ in range(9)]

for i in range(9):
    for j in range(9):
        if board[i][j] != 0:
            num = board[i][j]
            row_used[i].add(num)
            col_used[j].add(num)
            box_used[(i // 3) * 3 + j // 3].add(num)

def solve(idx):
    if idx == len(blanks):
        return True  # 모든 빈 칸을 채움

    r, c = blanks[idx]
    b = (r // 3) * 3 + c // 3

    for num in range(1, 10):
        if num in row_used[r] or num in col_used[c] or num in box_used[b]:
            continue

        board[r][c] = num
        row_used[r].add(num)
        col_used[c].add(num)
        box_used[b].add(num)

        if solve(idx + 1):
            return True

        board[r][c] = 0
        row_used[r].remove(num)
        col_used[c].remove(num)
        box_used[b].remove(num)

    return False

solve(0)

for row in board:
    print(' '.join(map(str, row)))`,
          explanation:
            '빈 칸 리스트를 미리 만들고 순서대로 채워갑니다. 각 빈 칸에 1~9를 시도하며, row_used/col_used/box_used 집합으로 O(1)에 제약 검사합니다. 해를 찾으면 True를 반환하여 탐색을 종료하고, 못 찾으면 복원 후 다음 수를 시도합니다.',
        },
      ],
      commonProblems: [
        { name: '스도쿠', platform: 'boj', id: '2580' },
        { name: '스도쿠', platform: 'boj', id: '2239' },
        { name: 'Sudoku Solver', platform: 'leetcode', id: '37', slug: 'sudoku-solver', difficulty: 'Hard' },
      ],
      tips: [
        '빈 칸의 후보 수가 적은 것부터 채우면(MRV 휴리스틱) 성능이 크게 향상됩니다.',
        '비트마스크를 사용하면 집합 연산보다 빠르게 처리할 수 있습니다.',
        '해를 하나만 찾으면 되는 문제는 True 반환으로 즉시 종료하세요.',
        '박스 인덱스 계산: (row // 3) * 3 + col // 3 공식을 기억하세요.',
      ],
    },
  ],
}
