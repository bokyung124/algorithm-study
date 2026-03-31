import type { QuizQuestion } from '../../types/quiz'

export const sqlConditionalQuizzes: Record<string, QuizQuestion[]> = {
  'case-when': [
    {
      id: 'sql-case-when-q1',
      type: 'output-prediction',
      question: "다음 쿼리에서 score=85일 때 결과는?\n\nSELECT CASE\n  WHEN score >= 60 THEN 'C'\n  WHEN score >= 80 THEN 'B'\n  WHEN score >= 90 THEN 'A'\n  ELSE 'F'\nEND AS grade;",
      options: ["'A'", "'B'", "'C'", "'F'"],
      answer: "'C'",
      explanation: "CASE WHEN은 위에서 아래로 순서대로 평가하며, 처음으로 참인 조건에서 멈춥니다. score=85는 첫 번째 조건 score >= 60에 이미 해당하므로 'C'가 반환됩니다. 올바른 결과를 얻으려면 조건을 큰 값부터 작성해야 합니다.",
    },
    {
      id: 'sql-case-when-q2',
      type: 'output-prediction',
      question: "다음 쿼리의 결과는?\n\nSELECT SUM(CASE WHEN status = 'active' THEN 1 ELSE 0 END) AS active_count\nFROM (SELECT 'active' AS status UNION ALL SELECT 'inactive' UNION ALL SELECT 'active') t;",
      options: ['1', '2', '3', '에러 발생'],
      answer: '2',
      explanation: "CASE WHEN은 집계 함수 내부에서 사용하여 조건부 집계가 가능합니다. status가 'active'인 행만 1로 계산되어 합계 2가 반환됩니다.",
    },
    {
      id: 'sql-case-when-q3',
      type: 'fill-blank',
      question: "CASE WHEN에서 어떤 조건도 만족하지 않고 ELSE도 없으면 ___가 반환된다.",
      answer: 'NULL',
      explanation: 'CASE 표현식에서 모든 WHEN 조건이 거짓이고 ELSE 절이 없으면 기본적으로 NULL을 반환합니다.',
    },
  ],
  'coalesce-nullif': [
    {
      id: 'sql-coalesce-q1',
      type: 'output-prediction',
      question: "다음 쿼리의 결과는?\n\nSELECT COALESCE(NULL, NULL, 'third', 'fourth');",
      options: ['NULL', "'third'", "'fourth'", '에러 발생'],
      answer: "'third'",
      explanation: "COALESCE는 인자를 왼쪽부터 순서대로 확인하여 처음으로 NULL이 아닌 값을 반환합니다. 첫 두 인자가 NULL이므로 세 번째 값 'third'가 반환됩니다.",
    },
    {
      id: 'sql-coalesce-q2',
      type: 'output-prediction',
      question: "다음 쿼리의 결과는?\n\nSELECT NULLIF(10, 10);",
      options: ['10', '0', 'NULL', '에러 발생'],
      answer: 'NULL',
      explanation: 'NULLIF(a, b)는 a와 b가 같으면 NULL, 다르면 a를 반환합니다. 10과 10이 같으므로 NULL이 반환됩니다. 0으로 나누기 방지 등에 활용됩니다.',
    },
    {
      id: 'sql-coalesce-q3',
      type: 'output-prediction',
      question: "다음 쿼리에서 0으로 나누기 에러가 발생하는가?\n\nSELECT 100 / NULLIF(0, 0);",
      options: ['에러 발생', 'NULL 반환', '0 반환', 'Infinity 반환'],
      answer: 'NULL 반환',
      explanation: 'NULLIF(0, 0)은 두 값이 같으므로 NULL을 반환합니다. 숫자를 NULL로 나누면 에러 없이 NULL이 반환됩니다. 이 패턴은 0으로 나누기를 안전하게 처리하는 관용적 방법입니다.',
    },
  ],
}
