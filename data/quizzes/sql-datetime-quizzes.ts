import type { QuizQuestion } from '../../types/quiz'

export const sqlDatetimeQuizzes: Record<string, QuizQuestion[]> = {
  'date-extract': [
    {
      id: 'sql-date-extract-q1',
      type: 'output-prediction',
      question: "다음 쿼리의 결과는?\n\nSELECT YEAR('2024-03-15'), MONTH('2024-03-15');",
      options: ['2024, 3', '2024, 03', '24, 3', '24, 03'],
      answer: '2024, 3',
      explanation: 'YEAR는 4자리 연도를, MONTH는 정수형 월을 반환합니다. MONTH는 앞에 0을 붙이지 않고 정수 3을 반환합니다.',
    },
    {
      id: 'sql-date-extract-q2',
      type: 'fill-blank',
      question: "WHERE 절에서 YEAR(created_at) = 2024 형태로 조건을 걸면 해당 컬럼의 ___를 사용할 수 없게 된다.",
      answer: '인덱스',
      explanation: '컬럼에 함수를 적용하면 인덱스를 타지 못합니다. 인덱스를 활용하려면 WHERE created_at >= "2024-01-01" AND created_at < "2025-01-01" 형태로 범위 조건을 사용해야 합니다.',
    },
    {
      id: 'sql-date-extract-q3',
      type: 'output-prediction',
      question: "다음 쿼리의 결과는?\n\nSELECT DAYOFWEEK('2024-01-07');  -- 일요일",
      options: ['0', '1', '7', '0 (일요일=0)'],
      answer: '1',
      explanation: 'MySQL의 DAYOFWEEK는 일요일=1, 토요일=7을 반환합니다. 프로그래밍 언어에서 흔히 일요일=0인 것과 다르므로 주의해야 합니다.',
    },
  ],
  'date-arithmetic': [
    {
      id: 'sql-date-arith-q1',
      type: 'output-prediction',
      question: "다음 쿼리의 결과는?\n\nSELECT DATEDIFF('2024-03-01', '2024-03-10');",
      options: ['9', '-9', '10', '-10'],
      answer: '-9',
      explanation: "DATEDIFF(날짜1, 날짜2)는 날짜1 - 날짜2를 일 단위로 반환합니다. 3월 1일 - 3월 10일 = -9일입니다. 인자 순서에 주의해야 합니다.",
    },
    {
      id: 'sql-date-arith-q2',
      type: 'output-prediction',
      question: "다음 쿼리의 결과는?\n\nSELECT DATE_ADD('2024-01-31', INTERVAL 1 MONTH);",
      options: ["'2024-02-29'", "'2024-03-01'", "'2024-02-28'", "'2024-03-02'"],
      answer: "'2024-02-29'",
      explanation: '2024년은 윤년이므로 1월 31일에 1개월을 더하면 2월의 마지막 날인 2월 29일이 됩니다. MySQL은 월 덧셈 시 해당 월의 마지막 날을 초과하지 않도록 자동 조정합니다.',
    },
    {
      id: 'sql-date-arith-q3',
      type: 'fill-blank',
      question: "DATEDIFF(A, B)의 결과는 ___ - ___ 를 일(day) 단위로 반환한다.",
      answer: 'A - B',
      explanation: 'DATEDIFF는 첫 번째 인자에서 두 번째 인자를 빼는 순서입니다. 양수면 A가 더 미래, 음수면 B가 더 미래입니다.',
    },
  ],
}
