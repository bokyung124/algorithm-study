import type { QuizQuestion } from '../../types/quiz'

export const sortingQuizzes: Record<string, QuizQuestion[]> = {
  'bubble-sort': [
    {
      id: 'bubble-q1',
      type: 'complexity-match',
      question: '버블 정렬의 최악 시간복잡도는?',
      options: ['O(n)', 'O(n log n)', 'O(n²)', 'O(log n)'],
      answer: 'O(n²)',
      explanation: '매 라운드마다 인접 원소를 비교·교환하므로 총 n(n-1)/2번 비교 → O(n²)입니다.',
    },
    {
      id: 'bubble-q2',
      type: 'output-prediction',
      question: '[5, 3, 8, 1]에 버블 정렬 첫 번째 패스를 적용하면?',
      options: ['[3, 5, 1, 8]', '[1, 3, 5, 8]', '[3, 1, 5, 8]', '[5, 3, 1, 8]'],
      answer: '[3, 5, 1, 8]',
      explanation: '첫 패스에서 인접 원소를 비교·교환하여 가장 큰 값 8이 맨 뒤로 이동합니다.',
    },
    {
      id: 'bubble-q3',
      type: 'fill-blank',
      question: '버블 정렬에서 한 패스 동안 교환이 한 번도 일어나지 않으면 ___할 수 있다.',
      answer: '조기 종료',
      explanation: '교환이 없다는 것은 이미 정렬이 완료되었다는 의미이므로 조기 종료가 가능합니다.',
    },
  ],
  'merge-sort': [
    {
      id: 'merge-q1',
      type: 'complexity-match',
      question: '머지 정렬의 시간복잡도는?',
      options: ['O(n)', 'O(n log n)', 'O(n²)', 'O(log n)'],
      answer: 'O(n log n)',
      explanation: '배열을 반으로 나누는 과정이 log n번, 각 단계에서 n번 병합하므로 O(n log n)입니다.',
    },
    {
      id: 'merge-q2',
      type: 'complexity-match',
      question: '머지 정렬의 공간복잡도는?',
      options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
      answer: 'O(n)',
      explanation: '병합 과정에서 임시 배열이 필요하므로 O(n) 추가 공간이 필요합니다.',
    },
    {
      id: 'merge-q3',
      type: 'fill-blank',
      question: '머지 정렬은 ___ 기법을 사용하는 대표적인 정렬 알고리즘이다.',
      answer: '분할 정복',
      explanation: '배열을 반으로 분할하고, 각각 정렬한 후, 병합(정복)하는 분할 정복 기법입니다.',
    },
  ],
  'quick-sort': [
    {
      id: 'quick-q1',
      type: 'complexity-match',
      question: '퀵 정렬의 평균 시간복잡도는?',
      options: ['O(n)', 'O(n log n)', 'O(n²)', 'O(log n)'],
      answer: 'O(n log n)',
      explanation: '피벗이 중앙값에 가까울 때 평균적으로 O(n log n)입니다.',
    },
    {
      id: 'quick-q2',
      type: 'complexity-match',
      question: '퀵 정렬의 최악 시간복잡도는?',
      options: ['O(n)', 'O(n log n)', 'O(n²)', 'O(n² log n)'],
      answer: 'O(n²)',
      explanation: '이미 정렬된 배열에서 첫/마지막 원소를 피벗으로 선택하면 O(n²)이 됩니다.',
    },
  ],
  'counting-sort': [
    {
      id: 'counting-q1',
      type: 'complexity-match',
      question: '카운팅 정렬의 시간복잡도는? (k = 값의 범위)',
      options: ['O(n)', 'O(n + k)', 'O(n log n)', 'O(nk)'],
      answer: 'O(n + k)',
      explanation: '배열 순회 O(n) + 카운트 배열 순회 O(k) = O(n + k)입니다.',
    },
    {
      id: 'counting-q2',
      type: 'fill-blank',
      question: '카운팅 정렬은 ___ 기반 정렬이므로 비교 정렬의 O(n log n) 하한에 제약받지 않는다.',
      answer: '비비교',
      explanation: '원소를 직접 비교하지 않고 빈도를 세어 정렬하므로 비비교 기반입니다.',
    },
  ],
  'custom-sort': [
    {
      id: 'custom-q1',
      type: 'fill-blank',
      question: '두 수를 이어붙여 비교하는 정렬처럼 단순 key로 표현하기 어려운 기준에는 functools의 ___를 사용한다.',
      answer: 'cmp_to_key',
      explanation: 'cmp_to_key는 두 원소를 직접 비교하는 함수를 sorted()의 key 매개변수에 사용할 수 있도록 변환합니다.',
    },
    {
      id: 'custom-q2',
      type: 'output-prediction',
      question: '[3, 30, 34, 5, 9]를 이어붙여 가장 큰 수를 만들면?',
      options: ['9534330', '9534303', '9353430', '3534309'],
      answer: '9534330',
      explanation: '9 > 5 > 34 > 3 > 30 순으로 정렬하면 "9534330"이 됩니다. 3과 30을 비교할 때 "330" > "303"이므로 3이 앞에 옵니다.',
    },
    {
      id: 'custom-q3',
      type: 'fill-blank',
      question: '다중 기준 정렬에서 숫자를 내림차순으로 정렬하려면 key의 튜플에서 해당 값에 ___를 붙인다.',
      answer: '-',
      explanation: 'key=lambda x: (-x[1], x[0])처럼 음수 부호를 붙이면 값이 클수록 작은 key가 되어 내림차순 효과를 얻습니다.',
    },
  ],
}
