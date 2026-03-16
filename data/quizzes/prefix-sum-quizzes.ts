import type { QuizQuestion } from '../../types/quiz'

export const prefixSumQuizzes: Record<string, QuizQuestion[]> = {
  'prefix-sum-1d': [
    {
      id: 'ps1d-q1',
      type: 'complexity-match',
      question: '길이 N인 배열의 누적 합 배열을 만든 뒤, 구간 합 쿼리 하나를 처리하는 시간복잡도는?',
      options: ['O(N)', 'O(1)', 'O(N log N)', 'O(log N)'],
      answer: 'O(1)',
      explanation: '누적 합 배열을 전처리(O(N))한 뒤, 각 구간 합 쿼리는 prefix[r+1] - prefix[l]로 O(1)에 구합니다.',
    },
    {
      id: 'ps1d-q2',
      type: 'output-prediction',
      question: 'arr = [1, 3, 5, 7, 9]일 때, prefix = [0, 1, 4, 9, 16, 25]입니다. prefix[4] - prefix[1]의 값은?',
      options: ['15', '12', '16', '9'],
      answer: '15',
      explanation: 'prefix[4] - prefix[1] = 16 - 1 = 15. 이는 arr[1] + arr[2] + arr[3] = 3 + 5 + 7 = 15와 같습니다.',
    },
    {
      id: 'ps1d-q3',
      type: 'fill-blank',
      question: '누적 합 배열에서 구간 [l, r]의 합은 prefix[___] - prefix[l]로 구한다.',
      answer: 'r+1',
      explanation: 'prefix[i]가 arr[0]~arr[i-1]의 합이므로, arr[l]~arr[r]의 합은 prefix[r+1] - prefix[l]입니다.',
    },
  ],
  'prefix-sum-2d': [
    {
      id: 'ps2d-q1',
      type: 'complexity-match',
      question: 'N x M 크기의 2D 누적 합 테이블을 전처리하는 시간복잡도는?',
      options: ['O(N + M)', 'O(NM)', 'O(N²M²)', 'O(NM log NM)'],
      answer: 'O(NM)',
      explanation: '각 칸을 한 번씩 순회하며 누적 합을 계산하므로 O(NM)입니다.',
    },
    {
      id: 'ps2d-q2',
      type: 'output-prediction',
      question: '2D 누적 합에서 (r1,c1)~(r2,c2) 영역의 합을 구할 때, prefix[r2][c2] - prefix[r1-1][c2] - prefix[r2][c1-1] + prefix[r1-1][c1-1]에서 마지막에 더하는 이유는?',
      options: ['오버플로우 방지', '두 번 빠진 영역을 보정', '대각선 원소 포함', '음수 보정'],
      answer: '두 번 빠진 영역을 보정',
      explanation: '위쪽과 왼쪽 영역을 각각 빼면 왼쪽 위 영역이 두 번 빠지므로, 포함-배제 원리에 따라 한 번 더해줍니다.',
    },
    {
      id: 'ps2d-q3',
      type: 'fill-blank',
      question: '2D 누적 합 전처리 시 prefix[i][j] = arr[i][j] + prefix[i-1][j] + prefix[i][j-1] - prefix[___][___]',
      answer: 'i-1][j-1',
      explanation: '포함-배제 원리에 따라 왼쪽(prefix[i][j-1])과 위쪽(prefix[i-1][j])을 더하면 왼쪽 위(prefix[i-1][j-1])가 두 번 더해지므로 빼줍니다.',
    },
  ],
  'range-sum-query': [
    {
      id: 'rsq-q1',
      type: 'complexity-match',
      question: '누적 합 + 해시맵으로 "합이 K인 부분 배열의 개수"를 구하는 시간복잡도는?',
      options: ['O(N²)', 'O(N)', 'O(N log N)', 'O(N³)'],
      answer: 'O(N)',
      explanation: '배열을 한 번 순회하며 누적 합을 구하고, 해시맵에서 O(1)로 조회하므로 전체 O(N)입니다.',
    },
    {
      id: 'rsq-q2',
      type: 'output-prediction',
      question: 'nums = [1, 1, 1], k = 2일 때 합이 2인 부분 배열의 개수는?',
      options: ['1', '2', '3', '4'],
      answer: '2',
      explanation: '[1,1](인덱스 0~1)과 [1,1](인덱스 1~2), 총 2개입니다.',
    },
    {
      id: 'rsq-q3',
      type: 'fill-blank',
      question: '누적 합 + 해시맵 풀이에서 초기에 prefix_count[___] = 1로 설정해야 처음부터 시작하는 구간을 놓치지 않는다.',
      answer: '0',
      explanation: '누적 합이 정확히 k인 경우, prefix - k = 0이므로 prefix_count[0] = 1이 있어야 해당 구간을 셀 수 있습니다.',
    },
  ],
}
