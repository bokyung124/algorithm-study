import type { QuizQuestion } from '../../types/quiz'

export const searchingQuizzes: Record<string, QuizQuestion[]> = {
  'linear-search': [
    {
      id: 'linear-q1',
      type: 'complexity-match',
      question: '선형 탐색의 최악 시간복잡도는?',
      options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
      answer: 'O(n)',
      explanation: '배열의 모든 원소를 처음부터 끝까지 하나씩 확인하므로 최악의 경우 O(n)입니다.',
    },
    {
      id: 'linear-q2',
      type: 'output-prediction',
      question: '다음 코드의 출력은?\n\narr = [4, 2, 7, 1, 9]\nfor i, v in enumerate(arr):\n    if v == 7:\n        print(i)\n        break',
      options: ['0', '2', '7', '3'],
      answer: '2',
      explanation: 'enumerate로 인덱스와 값을 함께 순회하며, 값이 7인 원소의 인덱스는 2입니다.',
    },
    {
      id: 'linear-q3',
      type: 'fill-blank',
      question: '정렬되지 않은 데이터에서 특정 값을 찾을 때 사용하는 가장 기본적인 탐색 방법은 ___ 탐색이다.',
      answer: '선형',
      explanation: '정렬되지 않은 데이터에서는 처음부터 끝까지 순차적으로 확인하는 선형 탐색을 사용합니다.',
    },
  ],
  'binary-search-basic': [
    {
      id: 'binary-basic-q1',
      type: 'complexity-match',
      question: '이분 탐색의 시간복잡도는?',
      options: ['O(1)', 'O(log n)', 'O(n)', 'O(n log n)'],
      answer: 'O(log n)',
      explanation: '매 단계마다 탐색 범위를 절반으로 줄이므로 O(log n)입니다.',
    },
    {
      id: 'binary-basic-q2',
      type: 'output-prediction',
      question: '정렬된 배열 [1, 3, 5, 7, 9]에서 target=5를 이분 탐색할 때, 첫 번째 mid 값은? (mid = (left + right) // 2, left=0, right=4)',
      options: ['1', '2', '3', '5'],
      answer: '2',
      explanation: 'left=0, right=4일 때 mid = (0 + 4) // 2 = 2입니다. arr[2] = 5로 target과 일치하여 한 번의 비교로 찾습니다.',
    },
    {
      id: 'binary-basic-q3',
      type: 'fill-blank',
      question: '이분 탐색을 적용하기 위한 전제 조건은 데이터가 ___되어 있어야 한다는 것이다.',
      answer: '정렬',
      explanation: '이분 탐색은 중간 값과의 비교를 통해 탐색 범위를 절반으로 줄이므로, 데이터가 정렬되어 있어야 합니다.',
    },
  ],
  'parametric-search': [
    {
      id: 'parametric-q1',
      type: 'complexity-match',
      question: '매개변수 탐색에서 판별 함수의 시간복잡도가 O(n)일 때, 전체 시간복잡도는?',
      options: ['O(n)', 'O(log n)', 'O(n log n)', 'O(n²)'],
      answer: 'O(n log n)',
      explanation: '이분 탐색 O(log n)에 매 단계마다 판별 함수 O(n)을 호출하므로 O(n log n)입니다.',
    },
    {
      id: 'parametric-q2',
      type: 'fill-blank',
      question: '매개변수 탐색은 최적화 문제를 ___ 문제로 변환하여 이분 탐색을 적용하는 기법이다.',
      answer: '결정',
      explanation: '"최솟값/최댓값을 구하라"는 최적화 문제를 "이 값이 가능한가?"라는 결정(Yes/No) 문제로 바꾸어 이분 탐색합니다.',
    },
    {
      id: 'parametric-q3',
      type: 'output-prediction',
      question: '나무 높이 [20, 15, 10, 17]을 절단기로 자를 때, 절단 높이 15면 얻는 나무 길이의 합은?',
      options: ['7', '5', '12', '2'],
      answer: '7',
      explanation: '높이 15 이상인 부분만 가져갑니다: (20-15) + (15-15) + 0 + (17-15) = 5 + 0 + 0 + 2 = 7입니다.',
    },
  ],
}
