import type { QuizQuestion } from '../../types/quiz'

export const sqlSelectQuizzes: Record<string, QuizQuestion[]> = {
  'where-basics': [
    {
      id: 'sql-sel-where-q1',
      type: 'output-prediction',
      question: 'WHERE age = NULL을 실행하면 결과는?',
      options: ['age가 NULL인 행 반환', '빈 결과 반환', '에러 발생', '모든 행 반환'],
      answer: '빈 결과 반환',
      explanation: 'NULL은 = 연산자로 비교할 수 없습니다. NULL 비교는 항상 UNKNOWN을 반환하므로 어떤 행도 조건을 만족하지 않습니다. IS NULL을 사용해야 합니다.',
    },
    {
      id: 'sql-sel-where-q2',
      type: 'output-prediction',
      question: "WHERE price BETWEEN 100 AND 200에서 price가 100, 200인 행은 포함되는가?",
      options: ['둘 다 포함', '100만 포함', '200만 포함', '둘 다 미포함'],
      answer: '둘 다 포함',
      explanation: 'BETWEEN은 경계값을 포함하는 연산자입니다. BETWEEN A AND B는 >= A AND <= B와 동일합니다.',
    },
    {
      id: 'sql-sel-where-q3',
      type: 'fill-blank',
      question: "WHERE 절에서 NULL 값을 찾으려면 = 대신 ___를 사용해야 한다.",
      answer: 'IS NULL',
      explanation: 'NULL은 어떤 값과도 = 비교가 불가능합니다. IS NULL 또는 IS NOT NULL을 사용해야 올바르게 NULL을 비교할 수 있습니다.',
    },
  ],
  'like-pattern': [
    {
      id: 'sql-sel-like-q1',
      type: 'output-prediction',
      question: "LIKE '_a%'는 어떤 문자열을 매칭하는가?",
      options: ["'a'로 시작하는 문자열", "두 번째 글자가 'a'인 문자열", "'a'를 포함하는 문자열", "'a'로 끝나는 문자열"],
      answer: "두 번째 글자가 'a'인 문자열",
      explanation: '_는 정확히 한 글자를 의미하고, %는 0개 이상의 임의 문자를 의미합니다. 따라서 _a%는 두 번째 글자가 a인 모든 문자열을 매칭합니다.',
    },
    {
      id: 'sql-sel-like-q2',
      type: 'output-prediction',
      question: "LIKE '%\\%%' ESCAPE '\\\\'로 검색하면 어떤 문자열이 매칭되는가?",
      options: ["'%'를 포함하는 문자열", "모든 문자열", "'\\\\%'를 포함하는 문자열", "에러 발생"],
      answer: "'%'를 포함하는 문자열",
      explanation: "ESCAPE 절을 사용하면 와일드카드 문자를 리터럴로 검색할 수 있습니다. \\%는 실제 '%' 문자를 의미하게 됩니다.",
    },
  ],
  'distinct-dedup': [
    {
      id: 'sql-sel-distinct-q1',
      type: 'complexity-match',
      question: 'SELECT DISTINCT a, b FROM t와 동일한 결과를 내는 쿼리는?',
      options: [
        'SELECT a, b FROM t GROUP BY a',
        'SELECT a, b FROM t GROUP BY a, b',
        'SELECT UNIQUE a, b FROM t',
        'SELECT a, b FROM t WHERE DISTINCT',
      ],
      answer: 'SELECT a, b FROM t GROUP BY a, b',
      explanation: 'DISTINCT는 SELECT한 모든 컬럼의 조합이 고유한 행을 반환합니다. GROUP BY a, b도 동일하게 (a, b) 조합의 고유한 행을 반환합니다.',
    },
    {
      id: 'sql-sel-distinct-q2',
      type: 'fill-blank',
      question: 'DISTINCT는 ___에 나열된 모든 컬럼의 조합을 기준으로 중복을 제거한다.',
      answer: 'SELECT',
      explanation: 'DISTINCT는 SELECT 절에 지정된 모든 컬럼의 조합을 기준으로 중복을 판별합니다. 단일 컬럼이 아닌 전체 행 조합이 동일해야 제거됩니다.',
    },
  ],
  'order-limit': [
    {
      id: 'sql-sel-order-q1',
      type: 'output-prediction',
      question: 'ORDER BY score DESC LIMIT 5 OFFSET 10은 몇 번째 행부터 반환하는가?',
      options: ['1번째~5번째', '6번째~10번째', '11번째~15번째', '10번째~14번째'],
      answer: '11번째~15번째',
      explanation: 'OFFSET 10은 처음 10개 행을 건너뛰고, LIMIT 5는 그 다음 5개 행을 반환합니다. 따라서 11번째부터 15번째 행이 반환됩니다.',
    },
    {
      id: 'sql-sel-order-q2',
      type: 'fill-blank',
      question: 'MySQL에서 상위 N개 행을 가져올 때 LIMIT N을 사용하고, Oracle에서는 ___를 사용한다.',
      answer: 'ROWNUM',
      explanation: 'Oracle에서는 ROWNUM <= N 또는 12c 이상에서 FETCH FIRST N ROWS ONLY를 사용하여 상위 N개 행을 제한합니다.',
    },
  ],
  'null-handling': [
    {
      id: 'sql-sel-null-q1',
      type: 'output-prediction',
      question: 'SELECT 1 + NULL의 결과는?',
      options: ['1', '0', 'NULL', '에러'],
      answer: 'NULL',
      explanation: 'NULL과의 모든 산술 연산 결과는 NULL입니다. NULL은 알 수 없는 값을 의미하므로 연산 결과도 알 수 없습니다.',
    },
    {
      id: 'sql-sel-null-q2',
      type: 'output-prediction',
      question: "SELECT COALESCE(NULL, NULL, 'hello', 'world')의 결과는?",
      options: ['NULL', "'hello'", "'world'", '에러'],
      answer: "'hello'",
      explanation: 'COALESCE는 인자를 왼쪽부터 평가하여 첫 번째 NULL이 아닌 값을 반환합니다. 세 번째 인자인 hello가 첫 번째 비NULL 값입니다.',
    },
    {
      id: 'sql-sel-null-q3',
      type: 'output-prediction',
      question: 'WHERE NOT (age > 20)에서 age가 NULL인 행은?',
      options: ['포함됨', '제외됨', '에러 발생', 'DB마다 다름'],
      answer: '제외됨',
      explanation: 'age가 NULL이면 age > 20은 UNKNOWN이고, NOT UNKNOWN도 UNKNOWN입니다. WHERE 절은 TRUE인 행만 반환하므로 UNKNOWN인 행은 제외됩니다.',
    },
  ],
}
