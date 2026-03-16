import type { Category } from '../../types/algorithm'

export const stackQueue: Category = {
  id: 'stack-queue',
  name: '스택/큐',
  icon: '📚',
  description:
    '스택(LIFO)과 큐(FIFO)는 가장 기본적인 자료구조입니다. 괄호 매칭, 히스토그램, 슬라이딩 윈도우 등 다양한 문제에서 핵심적으로 활용됩니다.',
  patterns: [
    {
      id: 'stack-basic',
      name: '스택 활용',
      description:
        '후입선출(LIFO) 자료구조를 활용하는 문제 유형입니다. 괄호 매칭, 후위 표기식, 히스토그램 넓이 등에 사용됩니다.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(n)',
      keyInsight:
        '스택은 가장 최근에 넣은 것을 먼저 꺼냅니다. 짝 맞추기(괄호), 되돌리기(undo), 깊이 추적 등의 패턴에 적합합니다.',
      pythonTools: [
        {
          name: 'list',
          description:
            'append()로 push, pop()으로 pop하여 스택을 구현합니다. [-1]로 peek이 가능하며 별도 import 없이 사용합니다.',
          import: '내장 자료형',
        },
        {
          name: 'dict',
          description:
            '괄호 매칭 쌍({")":"(", "]":"["})을 딕셔너리에 저장하여 O(1)에 짝을 확인합니다.',
          import: '내장 자료형',
        },
      ],
      codeExamples: [
        {
          title: '후위 표기식 계산',
          code: `def eval_postfix(expression):
    """후위 표기식 계산"""
    stack = []
    tokens = expression.split()

    for token in tokens:
        if token.lstrip('-').isdigit():
            stack.append(int(token))
        else:
            b = stack.pop()
            a = stack.pop()
            if token == '+':
                stack.append(a + b)
            elif token == '-':
                stack.append(a - b)
            elif token == '*':
                stack.append(a * b)
            elif token == '/':
                stack.append(int(a / b))  # 0에 가까운 쪽으로 버림

    return stack[0]

# 사용 예시
print(eval_postfix("2 3 + 4 *"))      # 20  ((2+3)*4)
print(eval_postfix("5 1 2 + 4 * + 3 -"))  # 14  (5+((1+2)*4)-3)`,
          explanation:
            '숫자를 만나면 스택에 넣고, 연산자를 만나면 두 개를 꺼내 계산한 결과를 다시 넣습니다. 최종적으로 스택에 남은 값이 결과입니다.',
        },
        {
          title: '히스토그램에서 가장 큰 직사각형',
          code: `def largest_rectangle(heights):
    """히스토그램에서 가장 큰 직사각형 넓이"""
    stack = []  # 인덱스 스택
    max_area = 0
    heights.append(0)  # 마지막에 0을 추가하여 남은 것 처리

    for i, h in enumerate(heights):
        while stack and heights[stack[-1]] > h:
            height = heights[stack.pop()]
            width = i if not stack else i - stack[-1] - 1
            max_area = max(max_area, height * width)
        stack.append(i)

    heights.pop()  # 원본 복구
    return max_area

# 사용 예시
print(largest_rectangle([2, 1, 5, 6, 2, 3]))  # 10 (5*2)
print(largest_rectangle([6, 2, 5, 4, 5, 1, 6]))  # 12 (4*3)`,
          explanation:
            '스택에 인덱스를 넣되, 현재 높이가 스택 꼭대기보다 작으면 꺼내면서 넓이를 계산합니다. 각 막대가 확장될 수 있는 최대 너비를 스택으로 효율적으로 구합니다.',
        },
      ],
      commonProblems: [
        { name: '괄호', platform: 'boj', id: '9012' },
        { name: '히스토그램에서 가장 큰 직사각형', platform: 'boj', id: '6549' },
        { name: '후위 표기식', platform: 'boj', id: '1918' },
        { name: '쇠막대기', platform: 'boj', id: '10799' },
        {
          name: 'Valid Parentheses',
          platform: 'leetcode',
          id: '20',
          slug: 'valid-parentheses',
          difficulty: 'Easy',
        },
        {
          name: 'Largest Rectangle in Histogram',
          platform: 'leetcode',
          id: '84',
          slug: 'largest-rectangle-in-histogram',
          difficulty: 'Hard',
        },
      ],
      tips: [
        'Python에서 스택은 리스트의 append()와 pop()으로 간단히 구현합니다.',
        '스택에 값 자체가 아닌 인덱스를 넣으면 더 많은 정보를 활용할 수 있습니다.',
        '처리 후 스택에 남은 원소 처리를 잊지 마세요.',
      ],
    },
    {
      id: 'queue-basic',
      name: '큐 활용',
      description:
        '선입선출(FIFO) 자료구조를 활용하는 문제 유형입니다. BFS, 프로세스 스케줄링, 슬라이딩 윈도우 등에 사용됩니다.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(n)',
      keyInsight:
        '큐는 먼저 넣은 것을 먼저 꺼냅니다. 순서대로 처리, 대기열, 레벨 순회 등에 적합합니다. deque를 사용하면 양쪽에서 O(1) 연산이 가능합니다.',
      pythonTools: [
        {
          name: 'collections.deque',
          description:
            'popleft() O(1)로 큐를 구현하고, rotate(k)로 원형 큐를 간편하게 시뮬레이션합니다. appendleft()로 앞쪽 삽입도 가능합니다.',
          import: 'from collections import deque',
        },
        {
          name: 'enumerate()',
          description:
            'enumerate(iterable)로 인덱스와 값을 동시에 순회하며, 원래 위치를 추적해야 하는 큐 문제에서 활용합니다.',
          import: '내장 함수',
        },
      ],
      codeExamples: [
        {
          title: '요세푸스 문제',
          code: `from collections import deque

def josephus(n, k):
    """n명이 원형으로 앉아 k번째 사람을 제거하는 순서"""
    queue = deque(range(1, n + 1))
    result = []

    while queue:
        queue.rotate(-(k - 1))  # k-1명을 뒤로 보냄
        result.append(queue.popleft())

    return result

# 사용 예시
print(josephus(7, 3))  # [3, 6, 2, 7, 5, 1, 4]`,
          explanation:
            'deque.rotate()를 활용하여 k-1명을 뒤로 보낸 뒤 맨 앞의 사람을 제거합니다. 원형 큐를 깔끔하게 시뮬레이션할 수 있습니다.',
        },
        {
          title: '프린터 큐 (프로그래머스)',
          code: `from collections import deque

def printer_queue(priorities, location):
    """특정 문서가 몇 번째로 인쇄되는지 반환"""
    queue = deque(enumerate(priorities))  # (원래 인덱스, 우선순위)
    order = 0

    while queue:
        idx, priority = queue.popleft()
        # 큐에 더 높은 우선순위가 있으면 뒤로 보냄
        if any(p > priority for _, p in queue):
            queue.append((idx, priority))
        else:
            order += 1
            if idx == location:
                return order

# 사용 예시
print(printer_queue([2, 1, 3, 2], 2))  # 1
print(printer_queue([1, 1, 9, 1, 1, 1], 0))  # 5`,
          explanation:
            '큐에서 꺼낸 문서보다 우선순위가 높은 문서가 있으면 다시 뒤에 넣습니다. 실제로 인쇄될 때 순서를 세어 목표 문서의 인쇄 순서를 반환합니다.',
        },
      ],
      commonProblems: [
        { name: '요세푸스 문제', platform: 'boj', id: '1158' },
        { name: '프린터 큐', platform: 'boj', id: '1966' },
        { name: '카드2', platform: 'boj', id: '2164' },
        { name: '덱', platform: 'boj', id: '10866' },
        {
          name: 'Implement Queue using Stacks',
          platform: 'leetcode',
          id: '232',
          slug: 'implement-queue-using-stacks',
          difficulty: 'Easy',
        },
      ],
      tips: [
        'collections.deque를 사용하세요. list.pop(0)은 O(n)이지만 deque.popleft()는 O(1)입니다.',
        'rotate()를 활용하면 원형 큐를 간단히 구현할 수 있습니다.',
        'deque는 양쪽 끝 연산만 O(1)이고, 중간 접근은 O(n)입니다.',
      ],
    },
    {
      id: 'monotone-stack',
      name: '단조 스택 (모노톤 스택)',
      description:
        '스택에 원소를 단조 증가 또는 단조 감소 순서로 유지하며, 각 원소에 대해 "다음 큰/작은 원소"를 효율적으로 찾는 기법입니다.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(n)',
      keyInsight:
        '스택에 원소를 넣기 전에, 스택 꼭대기와 비교하여 단조성을 깨뜨리는 원소들을 pop합니다. pop되는 시점이 곧 "다음 큰/작은 원소"를 만난 시점입니다.',
      pythonTools: [
        {
          name: 'list',
          description:
            'append()와 pop()으로 단조 스택을 구현합니다. 인덱스를 저장하여 거리 계산과 값 참조를 동시에 수행합니다.',
          import: '내장 자료형',
        },
      ],
      codeExamples: [
        {
          title: '오큰수 (Next Greater Element)',
          code: `def next_greater_element(arr):
    """각 원소의 오른쪽에서 처음으로 자기보다 큰 수 찾기"""
    n = len(arr)
    result = [-1] * n
    stack = []  # 인덱스 스택 (단조 감소)

    for i in range(n):
        while stack and arr[stack[-1]] < arr[i]:
            idx = stack.pop()
            result[idx] = arr[i]
        stack.append(i)

    return result

# 사용 예시
print(next_greater_element([3, 5, 2, 7]))
# [5, 7, 7, -1]

print(next_greater_element([9, 5, 4, 8]))
# [-1, 8, 8, -1]`,
          explanation:
            '스택에 인덱스를 유지하되 값이 단조 감소하도록 합니다. 새로운 원소가 스택 꼭대기보다 크면 pop하면서 해당 인덱스의 답을 현재 원소로 설정합니다.',
        },
        {
          title: '주식 가격 (가격이 떨어지지 않은 기간)',
          code: `def stock_prices(prices):
    """각 시점부터 가격이 떨어지지 않은 기간의 길이"""
    n = len(prices)
    answer = [0] * n
    stack = []  # 인덱스 스택

    for i in range(n):
        while stack and prices[stack[-1]] > prices[i]:
            idx = stack.pop()
            answer[idx] = i - idx
        stack.append(i)

    # 스택에 남은 원소: 끝까지 가격이 떨어지지 않음
    while stack:
        idx = stack.pop()
        answer[idx] = n - 1 - idx

    return answer

# 사용 예시
print(stock_prices([1, 2, 3, 2, 3]))
# [4, 3, 1, 1, 0]

print(stock_prices([5, 3, 1, 2, 4]))
# [1, 1, 3, 2, 0]`,
          explanation:
            '가격이 떨어지는 순간을 스택으로 감지합니다. 스택에 남아 있는 원소는 끝까지 가격이 떨어지지 않은 것이므로 (n-1-idx)가 답입니다.',
        },
      ],
      commonProblems: [
        { name: '오큰수', platform: 'boj', id: '17298' },
        { name: '탑', platform: 'boj', id: '2493' },
        { name: '주식가격', platform: 'programmers', id: '42584' },
        { name: '오아시스 재결합', platform: 'boj', id: '3015' },
        {
          name: 'Daily Temperatures',
          platform: 'leetcode',
          id: '739',
          slug: 'daily-temperatures',
          difficulty: 'Medium',
        },
        {
          name: 'Next Greater Element I',
          platform: 'leetcode',
          id: '496',
          slug: 'next-greater-element-i',
          difficulty: 'Easy',
        },
      ],
      tips: [
        '단조 스택은 "다음 큰 수", "다음 작은 수" 패턴을 O(n)에 해결합니다.',
        '스택에 값 대신 인덱스를 넣으면 거리 계산이 가능합니다.',
        '오른쪽에서 왼쪽으로 순회하면 "이전 큰/작은 수"를 구할 수 있습니다.',
        '각 원소는 스택에 최대 1번 push, 1번 pop되므로 전체 O(n)이 보장됩니다.',
      ],
    },
  ],
}
