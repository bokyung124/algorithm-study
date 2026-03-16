import type { Category } from '../../types/algorithm'

export const greedy: Category = {
  id: 'greedy',
  name: '그리디',
  icon: '💰',
  description:
    '매 단계에서 지역적으로 최적인 선택을 하여 전역적 최적해를 구하는 알고리즘 설계 기법입니다. 그리디 선택 속성과 최적 부분 구조가 성립해야 적용할 수 있습니다.',
  patterns: [
    {
      id: 'activity-selection',
      name: '활동 선택 문제',
      description:
        '겹치지 않는 활동을 최대한 많이 선택하는 문제입니다. 종료 시간이 빠른 순서로 정렬하여 그리디하게 선택합니다.',
      timeComplexity: 'O(n log n) (정렬 포함)',
      spaceComplexity: 'O(n)',
      keyInsight:
        '종료 시간이 빠른 활동을 먼저 선택하면, 남은 시간에 더 많은 활동을 배치할 수 있습니다. 종료 시간 기준 정렬이 핵심입니다.',
      pythonTools: [
        {
          name: 'sorted()',
          description:
            'key=lambda x: (x[1], x[0])으로 종료 시간 기준 커스텀 정렬을 수행합니다. 그리디의 핵심 전처리 단계입니다.',
          import: '내장 함수',
        },
        {
          name: 'heapq',
          description:
            '최소 강의실 수 등 힙 기반 스케줄링에 사용합니다. heappush, heapreplace로 가장 빨리 끝나는 자원을 관리합니다.',
          import: 'import heapq',
        },
      ],
      codeExamples: [
        {
          title: '회의실 배정 (BOJ 1931)',
          code: `def max_meetings(meetings):
    # 종료 시간 기준 정렬, 같으면 시작 시간 기준
    meetings.sort(key=lambda x: (x[1], x[0]))

    count = 0
    last_end = 0

    for start, end in meetings:
        if start >= last_end:
            count += 1
            last_end = end

    return count

# 사용 예시
meetings = [(1, 4), (3, 5), (0, 6), (5, 7), (3, 8), (5, 9),
            (6, 10), (8, 11), (8, 12), (2, 13), (12, 14)]
print(max_meetings(meetings))  # 4`,
          explanation:
            '종료 시간이 빠른 회의부터 선택합니다. 현재 회의의 시작 시간이 마지막 선택한 회의의 종료 시간 이후이면 선택합니다.',
        },
        {
          title: '강의실 배정 (최소 강의실 수)',
          code: `import heapq

def min_rooms(lectures):
    """겹치는 강의를 모두 배치하기 위한 최소 강의실 수"""
    if not lectures:
        return 0

    lectures.sort(key=lambda x: x[0])  # 시작 시간 기준 정렬
    rooms = []  # 각 강의실의 종료 시간을 저장하는 최소 힙

    for start, end in lectures:
        if rooms and rooms[0] <= start:
            heapq.heapreplace(rooms, end)  # 기존 방 재사용
        else:
            heapq.heappush(rooms, end)  # 새 방 추가

    return len(rooms)

# 사용 예시
lectures = [(0, 30), (5, 10), (15, 20)]
print(min_rooms(lectures))  # 2`,
          explanation:
            '시작 시간 순으로 정렬하고, 가장 빨리 끝나는 강의실(힙의 최솟값)이 비었으면 재사용, 아니면 새 강의실을 추가합니다.',
        },
      ],
      commonProblems: [
        { name: '회의실 배정', platform: 'boj', id: '1931' },
        { name: '강의실 배정', platform: 'boj', id: '11000' },
        { name: '카드 정렬하기', platform: 'boj', id: '1715' },
        {
          name: 'Non-overlapping Intervals',
          platform: 'leetcode',
          id: '435',
          slug: 'non-overlapping-intervals',
          difficulty: 'Medium',
        },
        {
          name: 'Jump Game',
          platform: 'leetcode',
          id: '55',
          slug: 'jump-game',
          difficulty: 'Medium',
        },
      ],
      tips: [
        '정렬 기준을 잘 설정하는 것이 그리디 문제의 핵심입니다.',
        '종료 시간이 같을 때 시작 시간으로 한 번 더 정렬해야 하는 경우가 있습니다.',
        '그리디 선택이 최적인지 반례를 통해 검증하세요.',
      ],
    },
    {
      id: 'fractional-knapsack',
      name: '분할 가능 배낭 문제',
      description:
        '물건을 쪼갤 수 있는 배낭 문제입니다. 단위 무게당 가치가 높은 물건부터 담으면 최적해를 얻을 수 있습니다.',
      timeComplexity: 'O(n log n)',
      spaceComplexity: 'O(n)',
      keyInsight:
        '각 물건의 단위 무게당 가치(가치/무게)를 계산하여 내림차순으로 정렬합니다. 가성비가 높은 물건부터 최대한 담고, 남은 용량만큼 다음 물건을 쪼개서 담습니다.',
      pythonTools: [
        {
          name: 'sorted()',
          description:
            'key=lambda x: x[1]/x[0], reverse=True로 단위 가치 기준 내림차순 정렬합니다. 그리디 선택의 기준을 결정합니다.',
          import: '내장 함수',
        },
      ],
      codeExamples: [
        {
          title: '분할 가능 배낭 구현',
          code: `def fractional_knapsack(items, capacity):
    """items: [(무게, 가치), ...], capacity: 배낭 용량"""
    # 단위 무게당 가치 내림차순 정렬
    items.sort(key=lambda x: x[1] / x[0], reverse=True)

    total_value = 0
    remaining = capacity

    for weight, value in items:
        if remaining <= 0:
            break
        if weight <= remaining:
            total_value += value
            remaining -= weight
        else:
            # 남은 용량만큼만 쪼개서 담기
            total_value += value * (remaining / weight)
            remaining = 0

    return total_value

# 사용 예시
items = [(10, 60), (20, 100), (30, 120)]  # (무게, 가치)
capacity = 50
print(fractional_knapsack(items, capacity))  # 240.0`,
          explanation:
            '단위 무게당 가치가 6, 5, 4인 물건을 순서대로 담습니다. 첫 번째(10kg, 60), 두 번째(20kg, 100)를 전부 담고, 세 번째는 20kg만 담아 총 240입니다.',
        },
      ],
      commonProblems: [
        {
          name: 'Assign Cookies',
          platform: 'leetcode',
          id: '455',
          slug: 'assign-cookies',
          difficulty: 'Easy',
        },
        {
          name: 'Lemonade Change',
          platform: 'leetcode',
          id: '860',
          slug: 'lemonade-change',
          difficulty: 'Easy',
        },
      ],
      tips: [
        '물건을 쪼갤 수 없으면 0/1 배낭(DP)을 사용해야 합니다.',
        '단위 가치 기준 정렬이 핵심입니다.',
        '실수 연산 시 부동소수점 오차에 주의하세요.',
      ],
    },
    {
      id: 'coin-change-greedy',
      name: '동전 교환 (그리디)',
      description:
        '큰 단위의 동전부터 사용하여 최소 개수로 거스름돈을 만드는 문제입니다. 단, 그리디가 최적해를 보장하려면 동전 간 배수 관계가 성립해야 합니다.',
      timeComplexity: 'O(n) (동전 종류 수)',
      spaceComplexity: 'O(1)',
      keyInsight:
        '가장 큰 동전부터 최대한 많이 사용합니다. 한국 화폐(500, 100, 50, 10)처럼 배수 관계가 성립할 때만 그리디가 최적해를 보장합니다.',
      pythonTools: [
        {
          name: 'list',
          description:
            'list.sort(reverse=True)로 동전을 내림차순 정렬합니다. //(정수 나눗셈)과 %(나머지)로 동전 개수를 계산합니다.',
          import: '내장 자료형',
        },
        {
          name: 'sorted()',
          description:
            'sorted(coins, reverse=True)로 원본을 변경하지 않고 내림차순 정렬된 새 리스트를 반환합니다.',
          import: '내장 함수',
        },
      ],
      codeExamples: [
        {
          title: '거스름돈 최소 동전 수',
          code: `def min_coins_greedy(coins, amount):
    """큰 동전부터 사용하여 최소 동전 수 반환"""
    coins.sort(reverse=True)
    count = 0

    for coin in coins:
        if amount <= 0:
            break
        count += amount // coin
        amount %= coin

    return count if amount == 0 else -1

# 배수 관계가 성립하는 경우 (그리디 최적)
coins = [500, 100, 50, 10]
print(min_coins_greedy(coins, 1260))  # 6 (500*2 + 100*2 + 50*1 + 10*1)

# 배수 관계가 아닌 경우 (그리디 비최적 주의!)
# coins = [1, 5, 12], amount = 15
# 그리디: 12+1+1+1 = 4개, 최적: 5+5+5 = 3개`,
          explanation:
            '가장 큰 동전부터 가능한 한 많이 사용합니다. 배수 관계인 화폐에서는 최적이지만, 그렇지 않은 경우 DP를 사용해야 합니다.',
        },
        {
          title: '그리디 vs DP 비교',
          code: `def min_coins_dp(coins, amount):
    """DP로 최소 동전 수 (항상 최적해 보장)"""
    INF = float('inf')
    dp = [INF] * (amount + 1)
    dp[0] = 0

    for coin in coins:
        for a in range(coin, amount + 1):
            dp[a] = min(dp[a], dp[a - coin] + 1)

    return dp[amount] if dp[amount] != INF else -1

# 그리디가 실패하는 예시
coins = [1, 5, 12]
amount = 15
print(f"그리디: {min_coins_greedy(coins, amount)}")  # 4 (12+1+1+1)
print(f"DP:     {min_coins_dp(coins, amount)}")       # 3 (5+5+5)

# 그리디가 올바른 예시
coins = [500, 100, 50, 10]
amount = 1260
print(f"그리디: {min_coins_greedy(coins, amount)}")  # 6
print(f"DP:     {min_coins_dp(coins, amount)}")       # 6`,
          explanation:
            '동전 간 배수 관계가 없으면 그리디가 최적해를 보장하지 못합니다. 이런 경우 DP를 사용해야 합니다.',
        },
      ],
      commonProblems: [
        { name: '동전 0', platform: 'boj', id: '11047' },
        { name: '거스름돈', platform: 'boj', id: '5585' },
        {
          name: 'Lemonade Change',
          platform: 'leetcode',
          id: '860',
          slug: 'lemonade-change',
          difficulty: 'Easy',
        },
      ],
      tips: [
        '그리디가 적용 가능한지 반드시 확인하세요. 동전 간 배수 관계가 없으면 DP를 사용해야 합니다.',
        '코딩 테스트에서 "동전" 문제가 나오면 그리디/DP 중 어떤 것이 적합한지 먼저 판단하세요.',
        '그리디 풀이가 맞는지 확인하려면 작은 반례를 직접 만들어 보세요.',
      ],
    },
  ],
}
