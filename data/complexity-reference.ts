export const complexityData = [
  { notation: 'O(1)', name: '상수', estimation: '1', example: '해시 테이블 조회' },
  { notation: 'O(log N)', name: '로그', estimation: '≈20', example: '이진 탐색' },
  { notation: 'O(√N)', name: '제곱근', estimation: '≈1,000', example: '소수 판별' },
  { notation: 'O(N)', name: '선형', estimation: '10⁶', example: '단일 반복문' },
  { notation: 'O(N log N)', name: '로그 선형', estimation: '≈2×10⁷', example: '정렬 (Merge, Tim)' },
  { notation: 'O(N²)', name: '이차', estimation: '10¹²', example: '이중 반복문' },
  { notation: 'O(N³)', name: '삼차', estimation: '10¹⁸', example: '플로이드-워셜' },
  { notation: 'O(2^N)', name: '지수', estimation: '≈10³⁰⁰⁰⁰⁰', example: '부분집합 열거' },
  { notation: 'O(N!)', name: '팩토리얼', estimation: '매우 큼', example: '순열 열거' },
]
