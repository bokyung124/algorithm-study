import type { Category } from '../../types/algorithm'

export const bruteForceCategory: Category = {
  id: 'brute-force',
  name: '브루트 포스',
  icon: '💪',
  description:
    '가능한 모든 경우의 수를 탐색하여 정답을 찾는 기법입니다. 구현이 직관적이지만, 입력 크기가 작을 때만 사용할 수 있습니다. 다른 알고리즘의 기초가 되며, 정확성 검증에도 활용됩니다.',
  patterns: [
    {
      id: 'exhaustive-search',
      name: '완전 탐색',
      description:
        '모든 가능한 경우를 하나씩 시도하여 조건을 만족하는 답을 찾는 기본 패턴입니다. 반복문이나 재귀로 구현하며, N이 작을 때 유효합니다.',
      timeComplexity: 'O(N!) or O(2^N)',
      spaceComplexity: 'O(N)',
      keyInsight:
        '완전 탐색은 "모든 경우를 다 해본다"는 가장 단순한 접근입니다. N ≤ 20이면 2^N, N ≤ 10이면 N!도 충분합니다. 시간복잡도를 먼저 계산하여 가능한지 판단하세요.',
      pythonTools: [
        {
          name: 'for 중첩 반복문',
          description: '2~4중 반복문으로 모든 조합을 시도합니다. N이 작으면 가장 직관적인 방법입니다.',
          import: '내장 구문',
        },
        {
          name: 'itertools.product',
          description: '중첩 반복문을 대체하여 모든 경우의 수를 생성합니다.',
          import: 'from itertools import product',
        },
      ],
      codeExamples: [
        {
          title: '블랙잭 - 3장 카드 합 (BOJ 2798)',
          code: `import sys
input = sys.stdin.readline

n, m = map(int, input().split())
cards = list(map(int, input().split()))

best = 0
for i in range(n):
    for j in range(i + 1, n):
        for k in range(j + 1, n):
            total = cards[i] + cards[j] + cards[k]
            if total <= m:
                best = max(best, total)

print(best)`,
          explanation:
            '3중 반복문으로 3장의 카드를 선택하는 모든 조합을 시도합니다. N ≤ 100이므로 C(100,3) = 161,700가지로 충분히 빠릅니다.',
        },
      ],
      commonProblems: [
        { name: '블랙잭', platform: 'boj', id: '2798' },
        { name: '분해합', platform: 'boj', id: '2231' },
        { name: 'Subsets', platform: 'leetcode', id: '78', slug: 'subsets', difficulty: 'Medium' },
      ],
      tips: [
        '먼저 경우의 수를 계산하여 시간 내에 가능한지 확인하세요 (1초에 약 10^8 연산).',
        '완전 탐색으로 풀리는 문제를 억지로 최적화하지 마세요.',
        '답을 찾으면 즉시 종료하는 최적화를 고려하세요.',
        '완전 탐색 풀이를 먼저 작성하고, 이를 기반으로 최적화 방법을 찾는 것이 좋습니다.',
      ],
    },
    {
      id: 'permutation-combination',
      name: '순열/조합 탐색',
      description:
        'itertools의 permutations, combinations를 활용하거나 재귀로 순열/조합을 생성하여 모든 경우를 탐색합니다. N과 M 시리즈의 기본이 됩니다.',
      timeComplexity: 'O(N!)/O(nCr)',
      spaceComplexity: 'O(N)',
      keyInsight:
        '순열은 순서가 중요한 선택, 조합은 순서가 중요하지 않은 선택입니다. Python의 itertools 모듈을 사용하면 간결하게 구현할 수 있고, 직접 구현하면 가지치기를 추가할 수 있습니다.',
      pythonTools: [
        {
          name: 'itertools.permutations',
          description: '주어진 iterable에서 r개를 뽑아 순열을 생성합니다.',
          import: 'from itertools import permutations',
        },
        {
          name: 'itertools.combinations',
          description: '주어진 iterable에서 r개를 뽑아 조합을 생성합니다.',
          import: 'from itertools import combinations',
        },
      ],
      codeExamples: [
        {
          title: 'N과 M (1) - 순열 생성 (BOJ 15649)',
          code: `import sys
input = sys.stdin.readline

n, m = map(int, input().split())
used = [False] * (n + 1)
path = []

def solve():
    if len(path) == m:
        print(' '.join(map(str, path)))
        return

    for i in range(1, n + 1):
        if used[i]:
            continue
        used[i] = True
        path.append(i)
        solve()
        path.pop()
        used[i] = False

solve()

# itertools 사용 시:
# from itertools import permutations
# for p in permutations(range(1, n+1), m):
#     print(' '.join(map(str, p)))`,
          explanation:
            'used 배열로 이미 선택한 원소를 체크하고, path에 현재 선택을 저장합니다. m개를 선택하면 출력하고, 재귀에서 돌아올 때 상태를 복원합니다.',
        },
      ],
      commonProblems: [
        { name: 'N과 M (1)', platform: 'boj', id: '15649' },
        { name: 'N과 M (2)', platform: 'boj', id: '15650' },
        { name: 'Permutations', platform: 'leetcode', id: '46', slug: 'permutations', difficulty: 'Medium' },
      ],
      tips: [
        'itertools를 사용할 수 있다면 활용하되, 가지치기가 필요하면 직접 구현하세요.',
        '순열: 매번 1~N을 순회하며 used 체크. 조합: start 인덱스를 증가시켜 중복 방지.',
        'N ≤ 8이면 N! = 40,320으로 순열 전탐색이 가능합니다.',
        'path.append() / path.pop() 패턴을 익혀두세요.',
      ],
    },
    {
      id: 'bit-subset',
      name: '비트마스크 부분집합',
      description:
        '비트마스크를 사용하여 2^N개의 모든 부분집합을 열거하는 기법입니다. 각 원소를 포함/미포함으로 비트에 대응시킵니다.',
      timeComplexity: 'O(2^N)',
      spaceComplexity: 'O(N)',
      keyInsight:
        'N개 원소의 부분집합은 0부터 2^N - 1까지의 정수와 1:1 대응됩니다. i번째 비트가 1이면 i번째 원소를 포함합니다. 비트 연산으로 빠르게 포함 여부를 검사할 수 있습니다.',
      pythonTools: [
        {
          name: '비트 연산자',
          description: '&(AND), |(OR), ^(XOR), <<(왼쪽 시프트), >>(오른쪽 시프트)를 사용합니다.',
          import: '내장 연산자',
        },
        {
          name: 'bin()',
          description: '정수를 이진수 문자열로 변환하여 디버깅에 활용합니다.',
          import: '내장 함수',
        },
      ],
      codeExamples: [
        {
          title: '부분수열의 합 (BOJ 1182)',
          code: `import sys
input = sys.stdin.readline

n, s = map(int, input().split())
arr = list(map(int, input().split()))

count = 0
for mask in range(1, 1 << n):  # 공집합 제외
    total = 0
    for i in range(n):
        if mask & (1 << i):  # i번째 원소가 부분집합에 포함
            total += arr[i]
    if total == s:
        count += 1

print(count)`,
          explanation:
            '0부터 2^N - 1까지 각 정수를 부분집합으로 해석합니다. mask의 i번째 비트가 1이면 arr[i]를 합에 포함합니다. 공집합(mask=0)은 제외합니다.',
        },
      ],
      commonProblems: [
        { name: '부분수열의 합', platform: 'boj', id: '1182' },
        { name: 'Subsets', platform: 'leetcode', id: '78', slug: 'subsets', difficulty: 'Medium' },
        { name: '스타트와 링크', platform: 'boj', id: '14889' },
      ],
      tips: [
        'N ≤ 20이면 2^20 ≈ 100만으로 비트마스크 전탐색이 가능합니다.',
        'mask & (1 << i)로 i번째 원소 포함 여부를 O(1)에 확인합니다.',
        'bin(mask).count("1")로 부분집합의 크기를 쉽게 구할 수 있습니다.',
        '부분집합의 부분집합 열거: sub = mask; while sub > 0: sub = (sub - 1) & mask.',
      ],
    },
  ],
}
