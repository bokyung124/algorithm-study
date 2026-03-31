import type { Category } from '../../types/algorithm'

export const implementation: Category = {
  id: 'implementation',
  name: '구현',
  icon: '🔧',
  description:
    '알고리즘 자체보다 문제에서 요구하는 조건을 정확히 코드로 옮기는 것이 핵심인 유형입니다. 시뮬레이션, 문자열 처리, 행렬 회전 등이 포함됩니다.',
  patterns: [
    {
      id: 'simulation',
      name: '시뮬레이션',
      description:
        '문제에서 주어진 규칙을 그대로 코드로 구현하여 과정을 시뮬레이션하는 유형입니다. 정확한 구현력이 필요합니다.',
      timeComplexity: '문제에 따라 다름',
      spaceComplexity: '문제에 따라 다름',
      keyInsight:
        '문제의 조건을 빠짐없이 정확하게 코드로 번역하는 것이 핵심입니다. 방향 전환, 경계 처리, 상태 관리 등 세부 사항을 놓치지 않아야 합니다.',
      tools: [
        {
          name: 'collections.deque',
          description:
            '뱀 몸체 등 양방향 삽입/삭제가 필요한 시뮬레이션에 사용합니다. appendleft, pop으로 머리/꼬리를 O(1)에 관리합니다.',
          import: 'from collections import deque',
        },
        {
          name: 'list',
          description:
            '2차원 격자([[0]*m for _ in range(n)])와 방향 배열(dx, dy)을 생성하여 이동과 상태를 관리합니다.',
          import: '내장 자료형',
        },
      ],
      codeExamples: [
        {
          title: '로봇 청소기 시뮬레이션',
          code: `def robot_cleaner(n, m, r, c, d, room):
    """
    로봇 청소기 동작 시뮬레이션
    d: 0(북), 1(동), 2(남), 3(서)
    room: 0(빈 칸), 1(벽)
    """
    # 북, 동, 남, 서
    dx = [-1, 0, 1, 0]
    dy = [0, 1, 0, -1]
    cleaned = 0

    while True:
        # 1. 현재 위치 청소
        if room[r][c] == 0:
            room[r][c] = 2  # 청소 완료 표시
            cleaned += 1

        # 2. 주변 4칸 확인
        found = False
        for _ in range(4):
            d = (d + 3) % 4  # 반시계 회전
            nr, nc = r + dx[d], c + dy[d]
            if 0 <= nr < n and 0 <= nc < m and room[nr][nc] == 0:
                r, c = nr, nc
                found = True
                break

        if not found:
            # 후진
            br, bc = r - dx[d], c - dy[d]
            if 0 <= br < n and 0 <= bc < m and room[br][bc] != 1:
                r, c = br, bc
            else:
                break  # 후진 불가 -> 종료

    return cleaned

# 사용 예시
room = [
    [1, 1, 1, 1, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 0, 0, 0, 1],
    [1, 1, 1, 1, 1],
]
print(robot_cleaner(5, 5, 2, 2, 0, room))  # 9`,
          explanation:
            '방향 배열과 상태 관리를 통해 로봇의 동작을 시뮬레이션합니다. 반시계 회전은 (d+3)%4로 구현합니다.',
        },
        {
          title: '뱀 게임 시뮬레이션 (BOJ 3190)',
          code: `from collections import deque

def snake_game(n, apples, directions):
    """
    n: 보드 크기, apples: 사과 위치 set,
    directions: {시간: 방향} ('L': 왼쪽, 'D': 오른쪽 회전)
    """
    dx = [0, 1, 0, -1]  # 우, 하, 좌, 상
    dy = [1, 0, -1, 0]

    snake = deque([(0, 0)])
    body = {(0, 0)}
    d = 0  # 초기 방향: 오른쪽
    time = 0

    while True:
        time += 1
        # 머리 이동
        hx, hy = snake[0]
        nx, ny = hx + dx[d], hy + dy[d]

        # 벽 또는 자기 자신과 충돌
        if not (0 <= nx < n and 0 <= ny < n) or (nx, ny) in body:
            return time

        snake.appendleft((nx, ny))
        body.add((nx, ny))

        if (nx, ny) in apples:
            apples.discard((nx, ny))
        else:
            tail = snake.pop()
            body.discard(tail)

        # 방향 전환
        if time in directions:
            if directions[time] == 'L':
                d = (d + 3) % 4
            else:
                d = (d + 1) % 4

    return time

# 사용 예시
apples = {(0, 4), (3, 2)}
directions = {3: 'D', 6: 'D', 8: 'D'}
print(snake_game(6, apples, directions))`,
          explanation:
            '뱀의 몸체를 deque와 set으로 관리합니다. deque의 앞은 머리, 뒤는 꼬리입니다. 사과를 먹으면 꼬리를 제거하지 않아 길이가 늘어납니다.',
        },
      ],
      commonProblems: [
        { name: '로봇 청소기', platform: 'boj', id: '14503' },
        { name: '뱀', platform: 'boj', id: '3190' },
        { name: '주사위 굴리기', platform: 'boj', id: '14499' },
        { name: '치킨 배달', platform: 'boj', id: '15686' },
        {
          name: 'Spiral Matrix',
          platform: 'leetcode',
          id: '54',
          slug: 'spiral-matrix',
          difficulty: 'Medium',
        },
        {
          name: 'Game of Life',
          platform: 'leetcode',
          id: '289',
          slug: 'game-of-life',
          difficulty: 'Medium',
        },
      ],
      tips: [
        '방향 전환은 배열 인덱스 연산으로 처리하면 깔끔합니다.',
        '복잡한 시뮬레이션은 함수를 분리하여 가독성을 높이세요.',
        '경계 조건(범위 밖, 초기 상태 등)을 반드시 확인하세요.',
        '디버깅 시 각 단계의 상태를 출력하면 도움이 됩니다.',
      ],
    },
    {
      id: 'string-parsing',
      name: '문자열 처리',
      description:
        '문자열을 분석하고 변환하는 유형입니다. 파싱, 패턴 매칭, 변환 규칙 적용 등 다양한 형태로 출제됩니다.',
      timeComplexity: '문제에 따라 다름',
      spaceComplexity: '문제에 따라 다름',
      keyInsight:
        'Python의 강력한 문자열 메서드와 정규표현식을 활용하면 효율적으로 풀 수 있습니다. 인덱싱, 슬라이싱, split, join 등을 자유롭게 다루는 것이 중요합니다.',
      tools: [
        {
          name: 'str 내장 메서드',
          description:
            'split(), join(), strip(), replace(), isdigit() 등으로 문자열 파싱과 변환을 처리합니다. 불변 타입이므로 수정 시 리스트로 변환합니다.',
          import: '내장 자료형',
        },
        {
          name: 're',
          description:
            're.findall, re.sub, re.match로 복잡한 패턴 매칭과 치환을 수행합니다. 정규표현식이 필요한 파싱 문제에 필수입니다.',
          import: 'import re',
        },
      ],
      codeExamples: [
        {
          title: '괄호 유효성 검사',
          code: `def is_valid_parentheses(s):
    stack = []
    pairs = {')': '(', ']': '[', '}': '{'}

    for ch in s:
        if ch in '([{':
            stack.append(ch)
        elif ch in ')]}':
            if not stack or stack[-1] != pairs[ch]:
                return False
            stack.pop()

    return len(stack) == 0

# 사용 예시
print(is_valid_parentheses("({[]})"))  # True
print(is_valid_parentheses("({[)]}"))  # False
print(is_valid_parentheses("(("))      # False`,
          explanation:
            '여는 괄호는 스택에 넣고, 닫는 괄호가 나오면 스택 꼭대기와 매칭되는지 확인합니다. 최종적으로 스택이 비어 있으면 유효합니다.',
        },
        {
          title: '문자열 압축 (카카오 기출)',
          code: `def compress_string(s):
    """1부터 len(s)//2까지의 단위로 압축했을 때 가장 짧은 길이"""
    if len(s) <= 1:
        return len(s)

    min_len = len(s)

    for unit in range(1, len(s) // 2 + 1):
        compressed = []
        prev = s[:unit]
        count = 1

        for i in range(unit, len(s), unit):
            curr = s[i:i + unit]
            if curr == prev:
                count += 1
            else:
                compressed.append(f"{count}{prev}" if count > 1 else prev)
                prev = curr
                count = 1
        compressed.append(f"{count}{prev}" if count > 1 else prev)
        min_len = min(min_len, len(''.join(compressed)))

    return min_len

# 사용 예시
print(compress_string("aabbaccc"))       # 7 ("2a2ba3c")
print(compress_string("ababcdcdababcdcd"))  # 9 ("2ababcdcd")
print(compress_string("abcabcabcabc"))     # 6 ("4abc")`,
          explanation:
            '모든 가능한 단위 길이로 문자열을 잘라 압축을 시도합니다. 연속된 같은 패턴을 "횟수+패턴"으로 바꾸고 가장 짧은 결과를 반환합니다.',
        },
      ],
      commonProblems: [
        { name: '문자열 압축', platform: 'programmers', id: '60057' },
        { name: '그룹 단어 체커', platform: 'boj', id: '1316' },
        { name: 'AC', platform: 'boj', id: '5430' },
        { name: '부분합', platform: 'boj', id: '1806' },
        {
          name: 'String to Integer (atoi)',
          platform: 'leetcode',
          id: '8',
          slug: 'string-to-integer-atoi',
          difficulty: 'Medium',
        },
      ],
      tips: [
        'Python의 문자열은 불변(immutable)이므로 수정이 잦으면 리스트를 사용하세요.',
        'split(), join(), strip() 등 내장 메서드를 적극 활용하세요.',
        '정규표현식(re 모듈)은 복잡한 패턴 매칭에 유용합니다.',
        '인덱스 범위 초과에 항상 주의하세요.',
      ],
    },
    {
      id: 'matrix-rotation',
      name: '행렬 회전',
      description:
        '2차원 배열을 시계 또는 반시계 방향으로 회전하는 유형입니다. 좌표 변환 규칙을 이해하는 것이 핵심입니다.',
      timeComplexity: 'O(n * m)',
      spaceComplexity: 'O(n * m)',
      keyInsight:
        'n x m 행렬을 90도 시계 방향으로 회전하면 (r, c) -> (c, n-1-r)이 됩니다. Python에서는 zip과 reversed를 활용하면 간결하게 구현할 수 있습니다.',
      tools: [
        {
          name: 'zip()',
          description:
            'zip(*matrix)로 전치(transpose) 행렬을 만들고, zip(*matrix[::-1])으로 90도 시계 회전을 한 줄에 구현합니다.',
          import: '내장 함수',
        },
        {
          name: 'list',
          description:
            '[[0]*n for _ in range(m)]로 회전 결과를 담을 2차원 배열을 생성합니다. 슬라이싱([::-1])으로 행 뒤집기도 활용합니다.',
          import: '내장 자료형',
        },
      ],
      codeExamples: [
        {
          title: '90도 회전 (시계/반시계)',
          code: `def rotate_90_cw(matrix):
    """90도 시계 방향 회전"""
    n = len(matrix)
    m = len(matrix[0])
    # (r, c) -> (c, n-1-r)
    rotated = [[0] * n for _ in range(m)]
    for r in range(n):
        for c in range(m):
            rotated[c][n - 1 - r] = matrix[r][c]
    return rotated

def rotate_90_ccw(matrix):
    """90도 반시계 방향 회전"""
    n = len(matrix)
    m = len(matrix[0])
    # (r, c) -> (m-1-c, r)
    rotated = [[0] * n for _ in range(m)]
    for r in range(n):
        for c in range(m):
            rotated[m - 1 - c][r] = matrix[r][c]
    return rotated

# Pythonic한 방법
def rotate_cw_pythonic(matrix):
    return [list(row) for row in zip(*matrix[::-1])]

def rotate_ccw_pythonic(matrix):
    return [list(row) for row in zip(*matrix)][::-1]

# 사용 예시
matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
]
result = rotate_cw_pythonic(matrix)
for row in result:
    print(row)
# [7, 4, 1]
# [8, 5, 2]
# [9, 6, 3]`,
          explanation:
            '시계 방향 90도 회전: 행을 뒤집은 후 전치(transpose)합니다. zip(*matrix[::-1])으로 한 줄에 구현 가능합니다.',
        },
        {
          title: '배열 돌리기 (테두리 회전)',
          code: `def rotate_border(matrix, s_r, s_c, e_r, e_c):
    """주어진 범위의 테두리를 시계 방향으로 1칸 회전"""
    temp = matrix[s_r][s_c]

    # 왼쪽 열: 위로 당기기
    for r in range(s_r, e_r):
        matrix[r][s_c] = matrix[r + 1][s_c]
    # 아래쪽 행: 왼쪽으로 당기기
    for c in range(s_c, e_c):
        matrix[e_r][c] = matrix[e_r][c + 1]
    # 오른쪽 열: 아래로 당기기
    for r in range(e_r, s_r, -1):
        matrix[r][e_c] = matrix[r - 1][e_c]
    # 위쪽 행: 오른쪽으로 당기기
    for c in range(e_c, s_c + 1, -1):
        matrix[s_r][c] = matrix[s_r][c - 1]

    matrix[s_r][s_c + 1] = temp

# 사용 예시
matrix = [
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9, 10, 11, 12],
]
rotate_border(matrix, 0, 0, 2, 3)
for row in matrix:
    print(row)
# [2, 3, 4, 8]
# [1, 6, 7, 12]
# [5, 9, 10, 11]`,
          explanation:
            '테두리의 원소를 한 칸씩 시계 방향으로 이동합니다. 덮어쓰기 전에 첫 번째 값을 temp에 저장하고, 네 변을 순서대로 처리합니다.',
        },
      ],
      commonProblems: [
        { name: '배열 돌리기 1', platform: 'boj', id: '16926' },
        { name: '배열 돌리기 2', platform: 'boj', id: '16927' },
        { name: '미세먼지 안녕!', platform: 'boj', id: '17144' },
        { name: '행렬의 곱셈', platform: 'programmers', id: '12949' },
        {
          name: 'Rotate Image',
          platform: 'leetcode',
          id: '48',
          slug: 'rotate-image',
          difficulty: 'Medium',
        },
        {
          name: 'Spiral Matrix',
          platform: 'leetcode',
          id: '54',
          slug: 'spiral-matrix',
          difficulty: 'Medium',
        },
      ],
      tips: [
        '회전 공식: 시계 90도 (r,c)->(c,n-1-r), 반시계 90도 (r,c)->(m-1-c,r)',
        'Python의 zip과 슬라이싱을 활용하면 매우 간결하게 구현됩니다.',
        '180도 회전은 90도 회전을 두 번 수행하거나 (r,c)->(n-1-r,m-1-c)를 적용합니다.',
        '테두리 회전은 각 변을 따로 처리하면 실수를 줄일 수 있습니다.',
      ],
    },
  ],
}
