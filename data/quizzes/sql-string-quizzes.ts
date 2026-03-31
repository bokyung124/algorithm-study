import type { QuizQuestion } from '../../types/quiz'

export const sqlStringQuizzes: Record<string, QuizQuestion[]> = {
  'string-basics': [
    {
      id: 'sql-str-basics-q1',
      type: 'output-prediction',
      question: "다음 쿼리의 결과는?\n\nSELECT CONCAT('Hello', NULL, 'World');",
      options: ["'HelloWorld'", "NULL", "'Hello World'", "에러 발생"],
      answer: 'NULL',
      explanation: 'MySQL의 CONCAT 함수는 인자 중 하나라도 NULL이면 전체 결과가 NULL이 됩니다. NULL을 빈 문자열로 처리하려면 IFNULL이나 COALESCE를 사용해야 합니다.',
    },
    {
      id: 'sql-str-basics-q2',
      type: 'output-prediction',
      question: "다음 쿼리의 결과는?\n\nSELECT SUBSTRING('DATABASE', 5, 4);",
      options: ["'BASE'", "'ABAS'", "'ABASE'", "'BAS'"],
      answer: "'BASE'",
      explanation: "SQL의 SUBSTRING은 1-indexed입니다. 5번째 문자부터 4글자를 추출하므로 'DATABASE'에서 'BASE'가 반환됩니다.",
    },
    {
      id: 'sql-str-basics-q3',
      type: 'fill-blank',
      question: "SQL의 SUBSTRING 함수는 인덱스가 ___부터 시작한다. (프로그래밍 언어와 다른 점)",
      answer: '1',
      explanation: 'SQL의 SUBSTRING은 1-indexed입니다. 대부분의 프로그래밍 언어가 0-indexed인 것과 달리, SQL에서는 첫 번째 문자의 위치가 1입니다.',
    },
  ],
  'string-replace-format': [
    {
      id: 'sql-str-replace-q1',
      type: 'output-prediction',
      question: "다음 쿼리의 결과는?\n\nSELECT REPLACE('banana', 'na', 'XY');",
      options: ["'baXYna'", "'baXYXY'", "'bXYXY'", "'banaXY'"],
      answer: "'baXYXY'",
      explanation: "REPLACE는 문자열 내 모든 'na'를 'XY'로 치환합니다. 'banana'에서 'na'가 두 번 나타나므로 둘 다 치환되어 'baXYXY'가 됩니다.",
    },
    {
      id: 'sql-str-replace-q2',
      type: 'complexity-match',
      question: "멀티바이트 문자열 '안녕하세요'에 대해 LENGTH와 CHAR_LENGTH의 차이는?",
      options: ['둘 다 5 반환', 'LENGTH는 15, CHAR_LENGTH는 5', 'LENGTH는 5, CHAR_LENGTH는 15', '둘 다 15 반환'],
      answer: 'LENGTH는 15, CHAR_LENGTH는 5',
      explanation: 'LENGTH는 바이트 수를 반환하고, CHAR_LENGTH는 문자 수를 반환합니다. UTF-8에서 한글은 3바이트이므로 LENGTH는 15, CHAR_LENGTH는 5입니다.',
    },
    {
      id: 'sql-str-replace-q3',
      type: 'output-prediction',
      question: "다음 쿼리의 결과는?\n\nSELECT REPLACE('hello', 'xyz', 'ABC');",
      options: ["'hello'", "NULL", "에러 발생", "'ABC'"],
      answer: "'hello'",
      explanation: "REPLACE에서 찾을 문자열이 원본에 존재하지 않으면 원본 문자열이 그대로 반환됩니다.",
    },
  ],
}
