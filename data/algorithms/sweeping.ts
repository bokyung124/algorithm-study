import type { Category } from '../../types/algorithm'

export const sweepingCategory: Category = {
  id: 'sweeping',
  name: '스위핑',
  icon: '🧹',
  description: '이벤트를 정렬하고 순서대로 처리하는 스위핑(sweep line) 알고리즘 패턴을 학습합니다.',
  patterns: [
    {
      id: 'line-sweeping',
      name: '라인 스위핑',
      description: '이벤트를 x좌표(또는 특정 기준)로 정렬한 뒤 왼쪽에서 오른쪽으로 훑으며 처리하는 알고리즘입니다. 구간 합치기, 넓이 계산 등에 활용됩니다.',
      timeComplexity: 'O(N log N)',
      spaceComplexity: 'O(N)',
      keyInsight: '이벤트를 정렬하고 순서대로 처리하여 전체 탐색 없이 해결합니다. 정렬 후 한 번의 순회로 겹치는 구간이나 면적을 효율적으로 계산합니다.',
      tools: [
        {
          name: 'sorted / list.sort',
          description: '이벤트(시작점, 끝점 등)를 좌표 기준으로 정렬합니다.',
          import: '내장 함수',
        },
        {
          name: 'heapq',
          description: '스위핑 과정에서 우선순위 큐를 사용하여 활성 이벤트를 관리합니다.',
          import: 'import heapq',
        },
      ],
      codeExamples: [
        {
          title: '선 긋기 (구간 합치기)',
          code: `def total_length(segments: list[tuple[int, int]]) -> int:
    """겹치는 구간을 합쳐서 전체 길이를 구함"""
    segments.sort()
    total = 0
    current_start, current_end = segments[0]

    for start, end in segments[1:]:
        if start <= current_end:
            # 겹치는 구간: 끝점을 확장
            current_end = max(current_end, end)
        else:
            # 겹치지 않는 구간: 이전 구간 길이 추가
            total += current_end - current_start
            current_start, current_end = start, end

    total += current_end - current_start
    return total

# 예시
segments = [(1, 5), (3, 8), (6, 9), (2, 4)]
print(total_length(segments))  # 8 (1~9에서 겹치는 부분 제외한 전체 길이)`,
          explanation: '선분들을 시작점 기준으로 정렬한 뒤, 왼쪽에서 오른쪽으로 스위핑합니다. 현재 구간과 겹치면 끝점을 확장하고, 겹치지 않으면 새 구간을 시작합니다.',
        },
        {
          title: '스카이라인 문제',
          code: `import heapq

def get_skyline(buildings: list[list[int]]) -> list[list[int]]:
    """건물 목록에서 스카이라인 좌표를 반환"""
    events = []
    for left, right, height in buildings:
        events.append((left, -height, right))   # 건물 시작
        events.append((right, 0, 0))             # 건물 끝
    events.sort()

    result = [[0, 0]]
    heap = [(0, float('inf'))]  # (-높이, 끝점)

    for x, neg_h, end in events:
        if neg_h != 0:
            heapq.heappush(heap, (neg_h, end))

        # 만료된 건물 제거
        while heap[0][1] <= x:
            heapq.heappop(heap)

        max_h = -heap[0][0]
        if result[-1][1] != max_h:
            result.append([x, max_h])

    return result[1:]

# 예시
buildings = [[2,9,10],[3,7,15],[5,12,12],[15,20,10],[19,24,8]]
print(get_skyline(buildings))`,
          explanation: '건물의 시작과 끝을 이벤트로 만들어 x좌표 기준으로 정렬합니다. 최대 힙으로 현재 활성 건물의 최대 높이를 관리하며, 높이가 변할 때마다 스카이라인 점을 기록합니다.',
        },
      ],
      commonProblems: [
        { name: '선 긋기', platform: 'boj', id: '2170' },
        { name: '여러 직사각형의 전체 넓이', platform: 'boj', id: '2672' },
        { name: 'The Skyline Problem', platform: 'leetcode', id: '218', slug: 'the-skyline-problem', difficulty: 'Hard' },
        { name: '직사각형 합집합의 면적', platform: 'boj', id: '3392' },
      ],
      tips: [
        '스위핑의 핵심은 "정렬 후 한 번 순회"입니다. 정렬 기준을 잘 정하는 것이 중요합니다.',
        '2차원 넓이 문제는 한 축으로 스위핑하고 다른 축은 세그먼트 트리로 관리하는 경우가 많습니다.',
        '이벤트를 만들 때 시작과 끝을 구분하는 것이 핵심입니다. 보통 시작은 높이를 음수로, 끝은 0으로 표현합니다.',
      ],
    },
    {
      id: 'event-sweeping',
      name: '이벤트 스위핑',
      description: '구간의 시작과 끝을 이벤트로 분리하여 정렬한 뒤, 동시에 활성화된 구간의 수를 추적하는 알고리즘입니다. 회의실 배정, 구간 겹침 등에 활용됩니다.',
      timeComplexity: 'O(N log N)',
      spaceComplexity: 'O(N)',
      keyInsight: '구간의 시작과 끝을 별도의 이벤트로 분리하고 정렬합니다. 시작 이벤트에서 카운터를 증가시키고, 끝 이벤트에서 감소시키면 특정 시점의 활성 구간 수를 알 수 있습니다.',
      tools: [
        {
          name: 'sorted / list.sort',
          description: '이벤트를 시간순으로 정렬합니다.',
          import: '내장 함수',
        },
        {
          name: 'collections.Counter / defaultdict',
          description: '이벤트 카운팅이나 활성 구간 관리에 활용합니다.',
          import: 'from collections import defaultdict',
        },
      ],
      codeExamples: [
        {
          title: '최소 회의실 수 (Meeting Rooms II)',
          code: `def min_meeting_rooms(intervals: list[list[int]]) -> int:
    """동시에 필요한 최소 회의실 수를 반환"""
    events = []
    for start, end in intervals:
        events.append((start, 1))   # 회의 시작: +1
        events.append((end, -1))    # 회의 종료: -1
    events.sort()

    max_rooms = 0
    current_rooms = 0
    for _, delta in events:
        current_rooms += delta
        max_rooms = max(max_rooms, current_rooms)

    return max_rooms

# 예시
intervals = [[1, 3], [2, 5], [4, 7], [6, 8]]
print(min_meeting_rooms(intervals))  # 2`,
          explanation: '각 회의의 시작과 끝을 (+1, -1) 이벤트로 만들어 시간순 정렬합니다. 이벤트를 순서대로 처리하며 현재 활성 회의 수의 최댓값이 필요한 최소 회의실 수입니다.',
        },
        {
          title: '구간 합치기 (Merge Intervals)',
          code: `def merge_intervals(intervals: list[list[int]]) -> list[list[int]]:
    """겹치는 구간을 합침"""
    intervals.sort()
    merged = [intervals[0]]

    for start, end in intervals[1:]:
        if start <= merged[-1][1]:
            merged[-1][1] = max(merged[-1][1], end)
        else:
            merged.append([start, end])

    return merged

# 예시
intervals = [[1, 3], [2, 5], [4, 7], [8, 10]]
print(merge_intervals(intervals))  # [[1, 7], [8, 10]]`,
          explanation: '구간을 시작점 기준으로 정렬한 뒤, 이전 구간의 끝점과 현재 구간의 시작점을 비교합니다. 겹치면 끝점을 확장하고, 안 겹치면 새 구간을 추가합니다.',
        },
      ],
      commonProblems: [
        { name: 'Meeting Rooms II', platform: 'leetcode', id: '253', slug: 'meeting-rooms-ii', difficulty: 'Medium' },
        { name: '선 긋기', platform: 'boj', id: '2170' },
        { name: 'Merge Intervals', platform: 'leetcode', id: '56', slug: 'merge-intervals', difficulty: 'Medium' },
        { name: 'Non-overlapping Intervals', platform: 'leetcode', id: '435', slug: 'non-overlapping-intervals', difficulty: 'Medium' },
        { name: '강의실 배정', platform: 'boj', id: '11000' },
      ],
      tips: [
        '같은 시간에 시작과 끝이 동시에 일어날 때 정렬 순서가 결과에 영향을 줍니다. 문제 조건을 정확히 확인하세요.',
        '이벤트 스위핑은 "+1, -1" 패턴으로 기억하면 됩니다. 시작 +1, 끝 -1입니다.',
        '구간 문제가 나오면 먼저 정렬을 생각하세요. 정렬만으로 많은 구간 문제가 단순해집니다.',
      ],
    },
  ],
}
