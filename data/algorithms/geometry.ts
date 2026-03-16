import type { Category } from '../../types/algorithm'

export const geometryCategory: Category = {
  id: 'geometry',
  name: '기하학',
  icon: '📏',
  description: 'CCW, 볼록 껍질, 선분 교차 판정 등 좌표 기반 기하학 알고리즘 패턴을 학습합니다.',
  patterns: [
    {
      id: 'ccw',
      name: 'CCW (Counter-Clockwise)',
      description: '세 점의 방향성(시계 방향, 반시계 방향, 일직선)을 외적을 이용하여 O(1)에 판별하는 알고리즘입니다. 선분 교차, 볼록 껍질 등 기하 알고리즘의 기초가 됩니다.',
      timeComplexity: 'O(1)',
      spaceComplexity: 'O(1)',
      keyInsight: '외적의 부호로 세 점의 방향(시계/반시계/일직선)을 판별합니다. 양수면 반시계, 음수면 시계, 0이면 일직선입니다.',
      pythonTools: [
        {
          name: 'tuple',
          description: '좌표를 (x, y) 튜플로 표현하여 점을 다룹니다.',
          import: '내장 자료형',
        },
      ],
      codeExamples: [
        {
          title: 'CCW (외적으로 방향 판별)',
          code: `def ccw(p1: tuple[int, int], p2: tuple[int, int], p3: tuple[int, int]) -> int:
    """세 점의 방향을 판별
    양수: 반시계 방향 (CCW)
    음수: 시계 방향 (CW)
    0: 일직선 (Collinear)
    """
    x1, y1 = p1
    x2, y2 = p2
    x3, y3 = p3
    cross = (x2 - x1) * (y3 - y1) - (x3 - x1) * (y2 - y1)
    if cross > 0:
        return 1   # 반시계
    elif cross < 0:
        return -1  # 시계
    else:
        return 0   # 일직선

# 예시
print(ccw((0, 0), (4, 0), (2, 3)))   # 1 (반시계)
print(ccw((0, 0), (2, 3), (4, 0)))   # -1 (시계)
print(ccw((0, 0), (2, 2), (4, 4)))   # 0 (일직선)`,
          explanation: '벡터 (p1→p2)와 (p1→p3)의 외적을 계산합니다. 외적 값이 양수이면 p3가 p1→p2 기준으로 왼쪽(반시계), 음수이면 오른쪽(시계), 0이면 일직선 위에 있습니다.',
        },
      ],
      commonProblems: [
        { name: 'CCW', platform: 'boj', id: '11758' },
        { name: '선분 교차 1', platform: 'boj', id: '17386' },
        { name: '선분 교차 2', platform: 'boj', id: '17387' },
      ],
      tips: [
        'CCW는 기하 알고리즘의 기본 빌딩 블록입니다. 볼록 껍질, 선분 교차 등 대부분의 기하 문제에서 사용됩니다.',
        '좌표가 큰 경우 외적 계산 시 오버플로에 주의하세요. Python은 큰 정수를 지원하므로 걱정 없지만, 다른 언어에서는 long long을 사용해야 합니다.',
        '외적 값 자체가 두 벡터가 이루는 평행사변형의 넓이(부호 포함)이므로, 삼각형 넓이 계산에도 활용됩니다.',
      ],
    },
    {
      id: 'convex-hull',
      name: '볼록 껍질',
      description: '주어진 점들을 모두 포함하는 가장 작은 볼록 다각형을 구하는 알고리즘입니다. Graham Scan 또는 Andrew의 Monotone Chain 방법을 사용합니다.',
      timeComplexity: 'O(N log N)',
      spaceComplexity: 'O(N)',
      keyInsight: '점들을 정렬한 후 CCW를 이용하여 볼록성을 유지하면서 껍질을 구성합니다. 시계 방향으로 꺾이면 이전 점을 제거하는 것이 핵심입니다.',
      pythonTools: [
        {
          name: 'sorted / list.sort',
          description: '점들을 좌표 기준으로 정렬합니다. Andrew 알고리즘은 x좌표, Graham Scan은 기준점 대비 각도로 정렬합니다.',
          import: '내장 함수',
        },
        {
          name: 'math.atan2',
          description: 'Graham Scan에서 기준점 대비 각도를 계산할 때 사용합니다.',
          import: 'from math import atan2',
        },
      ],
      codeExamples: [
        {
          title: 'Andrew의 Monotone Chain 알고리즘',
          code: `def convex_hull(points: list[tuple[int, int]]) -> list[tuple[int, int]]:
    """볼록 껍질을 반환 (Andrew's Monotone Chain)"""
    points = sorted(set(points))
    if len(points) <= 1:
        return points

    def cross(o, a, b):
        return (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0])

    # 아래쪽 껍질
    lower = []
    for p in points:
        while len(lower) >= 2 and cross(lower[-2], lower[-1], p) <= 0:
            lower.pop()
        lower.append(p)

    # 위쪽 껍질
    upper = []
    for p in reversed(points):
        while len(upper) >= 2 and cross(upper[-2], upper[-1], p) <= 0:
            upper.pop()
        upper.append(p)

    return lower[:-1] + upper[:-1]

# 예시
points = [(1, 1), (3, 2), (5, 1), (4, 4), (2, 5), (0, 3)]
hull = convex_hull(points)
print(hull)  # [(0, 3), (1, 1), (5, 1), (4, 4), (2, 5)]`,
          explanation: '점들을 x좌표 기준으로 정렬한 뒤, 왼쪽→오른쪽(아래 껍질)과 오른쪽→왼쪽(위 껍질)을 각각 구합니다. 스택에서 시계 방향으로 꺾이면 pop하여 볼록성을 유지합니다.',
        },
      ],
      commonProblems: [
        { name: '볼록 껍질', platform: 'boj', id: '1708' },
        { name: '로버트 후드', platform: 'boj', id: '9240' },
        { name: 'Erect the Fence', platform: 'leetcode', id: '587', slug: 'erect-the-fence', difficulty: 'Hard' },
        { name: '볼록 껍질 위의 격자점', platform: 'boj', id: '2699' },
      ],
      tips: [
        'Monotone Chain은 구현이 간단하고 정렬 기반이라 안정적입니다. Graham Scan보다 추천됩니다.',
        '일직선 위의 점도 껍질에 포함해야 하는 문제에서는 cross 비교를 <= 0 대신 < 0으로 변경하세요.',
        '볼록 껍질의 점 개수는 최대 O(N)이지만, 정렬이 지배적이므로 전체 시간복잡도는 O(N log N)입니다.',
      ],
    },
    {
      id: 'line-intersection',
      name: '선분 교차 판정',
      description: 'CCW를 이용하여 두 선분이 교차하는지 O(1)에 판별하는 알고리즘입니다. 선분 그룹 문제 등에서 활용됩니다.',
      timeComplexity: 'O(1)',
      spaceComplexity: 'O(1)',
      keyInsight: '두 선분 AB, CD에 대해 CCW(A,B,C)×CCW(A,B,D) ≤ 0이고 CCW(C,D,A)×CCW(C,D,B) ≤ 0이면 교차합니다. 일직선 위의 경우는 좌표 범위로 추가 확인합니다.',
      pythonTools: [
        {
          name: 'tuple',
          description: '좌표를 (x, y) 튜플로 표현하여 선분의 양 끝점을 다룹니다.',
          import: '내장 자료형',
        },
      ],
      codeExamples: [
        {
          title: '선분 교차 판정 (CCW 기반)',
          code: `def ccw(p1, p2, p3):
    return (p2[0]-p1[0])*(p3[1]-p1[1]) - (p3[0]-p1[0])*(p2[1]-p1[1])

def on_segment(p, q, r):
    """q가 선분 pr 위에 있는지 확인"""
    return (min(p[0], r[0]) <= q[0] <= max(p[0], r[0]) and
            min(p[1], r[1]) <= q[1] <= max(p[1], r[1]))

def segments_intersect(a, b, c, d):
    """선분 AB와 CD가 교차하는지 판별"""
    d1 = ccw(a, b, c)
    d2 = ccw(a, b, d)
    d3 = ccw(c, d, a)
    d4 = ccw(c, d, b)

    if ((d1 > 0 and d2 < 0) or (d1 < 0 and d2 > 0)) and \\
       ((d3 > 0 and d4 < 0) or (d3 < 0 and d4 > 0)):
        return True

    # 일직선 위의 경우
    if d1 == 0 and on_segment(a, c, b): return True
    if d2 == 0 and on_segment(a, d, b): return True
    if d3 == 0 and on_segment(c, a, d): return True
    if d4 == 0 and on_segment(c, b, d): return True

    return False

# 예시
print(segments_intersect((0,0), (4,4), (0,4), (4,0)))  # True (X자 교차)
print(segments_intersect((0,0), (2,2), (3,3), (5,5)))  # False (평행)
print(segments_intersect((0,0), (4,4), (2,2), (6,6)))  # True (일직선 겹침)`,
          explanation: '두 선분의 교차 여부를 CCW 4번으로 판별합니다. 일반적인 교차는 외적의 부호가 반대인지 확인하고, 일직선 위의 경우는 좌표 범위 포함 여부를 추가로 검사합니다.',
        },
      ],
      commonProblems: [
        { name: '선분 교차 1', platform: 'boj', id: '17386' },
        { name: '선분 교차 2', platform: 'boj', id: '17387' },
        { name: '선분 그룹', platform: 'boj', id: '2162' },
        { name: '다각형의 면적', platform: 'boj', id: '2166' },
      ],
      tips: [
        '선분 교차 1(BOJ 17386)은 일직선 케이스를 무시해도 되지만, 선분 교차 2(BOJ 17387)는 꼭 처리해야 합니다.',
        '선분 그룹 문제는 선분 교차 판정 + Union-Find를 결합하여 풀 수 있습니다.',
        '교차점의 좌표가 필요한 경우 연립방정식을 세워 해를 구하되, 부동소수점 오차에 주의하세요.',
      ],
    },
  ],
}
