import type { Category } from '../../types/algorithm'

export const simulationCategory: Category = {
  id: 'simulation',
  name: '시뮬레이션',
  icon: '🎮',
  description:
    '문제에서 주어진 규칙과 조건을 그대로 코드로 구현하여 결과를 도출하는 유형입니다. 복잡한 알고리즘보다는 정확한 구현력이 중요하며, 삼성 SW 역량테스트에서 자주 출제됩니다.',
  patterns: [
    {
      id: 'basic-simulation',
      name: '기본 시뮬레이션',
      description:
        '문제에서 요구하는 동작을 하나씩 순서대로 구현하는 패턴입니다. 조건 분기가 많고, 정확하게 구현하는 것이 핵심입니다.',
      timeComplexity: 'O(varies)',
      spaceComplexity: 'O(varies)',
      keyInsight:
        '문제를 작은 단계로 나누어 각 단계를 함수로 구현하면 관리하기 쉽습니다. 경계 조건과 예외 처리를 빠뜨리지 않는 것이 중요합니다.',
      tools: [
        {
          name: 'list (2차원 배열)',
          description: '격자 기반 시뮬레이션에서 보드 상태를 2차원 리스트로 관리합니다.',
          import: '내장 자료형',
        },
        {
          name: 'deque',
          description: 'BFS나 순서가 있는 시뮬레이션에서 큐 역할로 사용합니다.',
          import: 'from collections import deque',
        },
      ],
      codeExamples: [
        {
          title: '로봇 이동 시뮬레이션',
          code: `import sys
input = sys.stdin.readline

def simulate_robot(n, m, commands):
    """격자 위에서 로봇이 명령에 따라 이동"""
    # 방향: 0=북, 1=동, 2=남, 3=서
    dx = [-1, 0, 1, 0]
    dy = [0, 1, 0, -1]

    grid = [[0] * m for _ in range(n)]
    x, y, d = 0, 0, 0  # 시작 위치, 방향
    grid[x][y] = 1  # 방문 표시

    for cmd in commands:
        if cmd == 'L':  # 왼쪽 회전
            d = (d + 3) % 4
        elif cmd == 'R':  # 오른쪽 회전
            d = (d + 1) % 4
        elif cmd == 'F':  # 전진
            nx, ny = x + dx[d], y + dy[d]
            if 0 <= nx < n and 0 <= ny < m:
                x, y = nx, ny
                grid[x][y] = 1

    return x, y, sum(row.count(1) for row in grid)

n, m = 5, 5
commands = ['F', 'F', 'R', 'F', 'F', 'L', 'F']
x, y, visited = simulate_robot(n, m, commands)
print(f"최종 위치: ({x}, {y}), 방문 칸 수: {visited}")`,
          explanation:
            '방향 배열(dx, dy)로 이동을 처리하고, 회전은 방향 인덱스를 조정합니다. 경계 검사를 한 후 이동하며, 방문 상태를 격자에 기록합니다.',
        },
      ],
      commonProblems: [
        { name: '로봇 청소기', platform: 'boj', id: '14503' },
        { name: '드래곤 커브', platform: 'boj', id: '15685' },
        { name: '프렌즈4블록', platform: 'programmers', id: '17679' },
      ],
      tips: [
        '문제를 읽고 각 단계를 명확히 정리한 후 구현하세요.',
        '방향 배열(dx, dy)을 미리 정의하면 이동 로직이 깔끔해집니다.',
        '디버깅이 어려우면 각 단계의 상태를 출력하여 확인하세요.',
        '함수로 분리하면 코드 가독성과 디버깅이 쉬워집니다.',
      ],
    },
    {
      id: 'grid-movement',
      name: '격자 이동',
      description:
        '2차원 격자 위에서 방향 전환, 이동, 충돌 감지 등을 수행하는 시뮬레이션 패턴입니다. 방향 배열과 경계 검사가 핵심입니다.',
      timeComplexity: 'O(NM)',
      spaceComplexity: 'O(NM)',
      keyInsight:
        '방향을 숫자로 인코딩(0=상, 1=우, 2=하, 3=좌)하고, dx/dy 배열로 이동합니다. 회전은 방향 인덱스의 덧셈/뺄셈으로 처리합니다.',
      tools: [
        {
          name: 'dx, dy 방향 배열',
          description: '상하좌우 이동을 배열로 정의하여 반복문으로 처리합니다. dx = [-1, 0, 1, 0], dy = [0, 1, 0, -1].',
          import: '내장 자료형',
        },
        {
          name: 'deque',
          description: '뱀 게임 등에서 몸통을 관리하거나 BFS 탐색에 사용합니다.',
          import: 'from collections import deque',
        },
      ],
      codeExamples: [
        {
          title: '격자 이동 + 방향 전환',
          code: `import sys
from collections import deque
input = sys.stdin.readline

def grid_bfs(grid, n, m, sr, sc):
    """격자 BFS로 모든 도달 가능 칸 탐색"""
    dx = [-1, 0, 1, 0]
    dy = [0, 1, 0, -1]

    visited = [[False] * m for _ in range(n)]
    visited[sr][sc] = True
    queue = deque([(sr, sc, 0)])  # (행, 열, 거리)

    while queue:
        x, y, dist = queue.popleft()

        for i in range(4):
            nx, ny = x + dx[i], y + dy[i]
            if 0 <= nx < n and 0 <= ny < m and not visited[nx][ny] and grid[nx][ny] != 1:
                visited[nx][ny] = True
                queue.append((nx, ny, dist + 1))

    return visited

# 주사위 굴리기 예시
def roll_dice(dice, direction):
    """주사위를 direction 방향으로 굴림
    dice = [위, 아래, 앞, 뒤, 왼, 오른]
    direction: 0=동, 1=서, 2=북, 3=남
    """
    top, bottom, front, back, left, right = dice
    if direction == 0:    # 동
        return [left, right, front, back, bottom, top]
    elif direction == 1:  # 서
        return [right, left, front, back, top, bottom]
    elif direction == 2:  # 북
        return [front, back, bottom, top, left, right]
    else:                 # 남
        return [back, front, top, bottom, left, right]`,
          explanation:
            '격자 BFS는 dx/dy 배열로 4방향 이동하며, 경계와 장애물을 검사합니다. 주사위 굴리기처럼 방향에 따라 상태가 변하는 경우, 각 방향별 상태 전이를 명확히 정의합니다.',
        },
      ],
      commonProblems: [
        { name: '주사위 굴리기', platform: 'boj', id: '14499' },
        { name: '감시', platform: 'boj', id: '15683' },
        { name: '톱니바퀴', platform: 'boj', id: '14891' },
      ],
      tips: [
        '방향 인코딩을 일관되게 유지하세요 (예: 0=북, 1=동, 2=남, 3=서).',
        '경계 검사는 이동 후 바로 수행하세요: 0 <= nx < n and 0 <= ny < m.',
        '복잡한 상태 전이는 표나 그림으로 먼저 정리하면 실수를 줄일 수 있습니다.',
        'deepcopy 대신 직접 복사하는 것이 성능상 유리합니다.',
      ],
    },
    {
      id: 'gear-rotation',
      name: '회전/변환 시뮬레이션',
      description:
        '배열 회전, 톱니바퀴 회전 등 회전 및 변환 연산을 시뮬레이션하는 패턴입니다. 회전 방향과 연쇄 반응의 전파를 정확히 구현해야 합니다.',
      timeComplexity: 'O(N)',
      spaceComplexity: 'O(N)',
      keyInsight:
        '회전은 deque의 rotate나 인덱스 연산으로 처리합니다. 연쇄 회전은 먼저 회전 여부를 모두 판단한 후 한꺼번에 회전해야 합니다 (회전하면서 판단하면 안 됨).',
      tools: [
        {
          name: 'deque.rotate',
          description: 'deque의 rotate(1)은 시계방향, rotate(-1)은 반시계방향 회전입니다.',
          import: 'from collections import deque',
        },
        {
          name: 'list slicing',
          description: '배열 회전: arr[k:] + arr[:k]로 왼쪽 회전, arr[-k:] + arr[:-k]로 오른쪽 회전.',
          import: '내장 자료형',
        },
      ],
      codeExamples: [
        {
          title: '톱니바퀴 회전 시뮬레이션 (BOJ 14891)',
          code: `import sys
from collections import deque
input = sys.stdin.readline

# 톱니바퀴 4개 (인덱스 0~7, 12시부터 시계방향)
gears = []
for _ in range(4):
    gears.append(deque(map(int, input().strip())))

k = int(input())
for _ in range(k):
    num, direction = map(int, input().split())
    num -= 1  # 0-indexed

    # 1단계: 각 톱니바퀴의 회전 방향 결정
    rotations = [0] * 4
    rotations[num] = direction

    # 왼쪽으로 전파
    for i in range(num, 0, -1):
        if gears[i][6] != gears[i - 1][2]:
            rotations[i - 1] = -rotations[i]
        else:
            break

    # 오른쪽으로 전파
    for i in range(num, 3):
        if gears[i][2] != gears[i + 1][6]:
            rotations[i + 1] = -rotations[i]
        else:
            break

    # 2단계: 한꺼번에 회전
    for i in range(4):
        if rotations[i] != 0:
            gears[i].rotate(rotations[i])

# 점수 계산
score = sum((gears[i][0] << i) for i in range(4))
print(score)`,
          explanation:
            '먼저 모든 톱니바퀴의 회전 방향을 결정한 후, 한꺼번에 회전합니다. 인접한 톱니바퀴의 맞닿은 톱니(2번과 6번 인덱스)가 다르면 반대 방향으로 회전하고, 같으면 전파가 멈춥니다.',
        },
      ],
      commonProblems: [
        { name: '톱니바퀴', platform: 'boj', id: '14891' },
        { name: '톱니바퀴 (2)', platform: 'boj', id: '15662' },
        { name: '미세먼지 안녕!', platform: 'boj', id: '17144' },
      ],
      tips: [
        '연쇄 반응은 반드시 판단을 먼저 하고, 실행을 나중에 하세요.',
        'deque.rotate()를 사용하면 회전 구현이 간결해집니다.',
        '톱니바퀴 문제에서 맞닿은 부분의 인덱스를 정확히 파악하세요.',
        '배열 90도 회전: (i, j) → (j, n-1-i) 공식을 외워두면 편리합니다.',
      ],
    },
  ],
}
