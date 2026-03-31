import type { QuizQuestion } from '../../types/quiz'

export const sqlJoinQuizzes: Record<string, QuizQuestion[]> = {
  'inner-join': [
    {
      id: 'sql-join-inner-q1',
      type: 'output-prediction',
      question: 'A 테이블에 3행, B 테이블에 5행이 있고 조인 조건에 매칭되는 쌍이 2개일 때, INNER JOIN 결과 행 수는?',
      options: ['2', '3', '5', '8'],
      answer: '2',
      explanation: 'INNER JOIN은 양쪽 테이블에서 조인 조건을 만족하는 행만 반환합니다. 매칭되는 쌍이 2개이므로 결과는 2행입니다.',
    },
    {
      id: 'sql-join-inner-q2',
      type: 'fill-blank',
      question: 'INNER JOIN에서 조인 조건의 컬럼명이 양쪽 테이블에서 동일할 때, ON 대신 ___를 사용할 수 있다.',
      answer: 'USING',
      explanation: 'USING(column_name)은 양쪽 테이블에서 동일한 이름의 컬럼으로 조인할 때 ON a.col = b.col 대신 간결하게 쓸 수 있는 문법입니다.',
    },
    {
      id: 'sql-join-inner-q3',
      type: 'complexity-match',
      question: 'SELECT * FROM A JOIN B ON A.id = B.id와 동일한 쿼리는?',
      options: [
        'SELECT * FROM A LEFT JOIN B ON A.id = B.id',
        'SELECT * FROM A INNER JOIN B ON A.id = B.id',
        'SELECT * FROM A CROSS JOIN B ON A.id = B.id',
        'SELECT * FROM A NATURAL JOIN B',
      ],
      answer: 'SELECT * FROM A INNER JOIN B ON A.id = B.id',
      explanation: 'JOIN은 INNER JOIN의 축약형입니다. 키워드 INNER를 생략해도 동일하게 동작합니다.',
    },
  ],
  'left-right-join': [
    {
      id: 'sql-join-left-q1',
      type: 'output-prediction',
      question: 'employees LEFT JOIN departments에서 부서가 없는 직원의 departments 컬럼 값은?',
      options: ['0', "빈 문자열 ''", 'NULL', '에러'],
      answer: 'NULL',
      explanation: 'LEFT JOIN에서 오른쪽 테이블에 매칭되는 행이 없으면 오른쪽 테이블의 모든 컬럼이 NULL로 채워집니다.',
    },
    {
      id: 'sql-join-left-q2',
      type: 'output-prediction',
      question: 'A LEFT JOIN B ON 조건 WHERE B.id IS NULL은 어떤 행을 반환하는가?',
      options: ['A와 B 모두에 있는 행', 'A에만 있고 B에는 없는 행', 'B에만 있는 행', '모든 행'],
      answer: 'A에만 있고 B에는 없는 행',
      explanation: 'LEFT JOIN 후 B.id IS NULL 조건은 B에 매칭되지 않은 행만 필터링합니다. 이를 안티 조인(Anti Join) 패턴이라 합니다.',
    },
    {
      id: 'sql-join-left-q3',
      type: 'fill-blank',
      question: 'A LEFT JOIN B는 B ___ JOIN A와 동일한 결과를 반환한다.',
      answer: 'RIGHT',
      explanation: 'LEFT JOIN과 RIGHT JOIN은 기준 테이블의 방향만 다릅니다. A LEFT JOIN B는 B RIGHT JOIN A와 동일합니다.',
    },
  ],
  'cross-join': [
    {
      id: 'sql-join-cross-q1',
      type: 'output-prediction',
      question: 'A 테이블에 3행, B 테이블에 4행이 있을 때, CROSS JOIN 결과 행 수는?',
      options: ['3', '4', '7', '12'],
      answer: '12',
      explanation: 'CROSS JOIN은 카테시안 곱(Cartesian Product)을 생성합니다. A의 모든 행과 B의 모든 행을 조합하므로 3 x 4 = 12행입니다.',
    },
    {
      id: 'sql-join-cross-q2',
      type: 'complexity-match',
      question: 'CROSS JOIN의 주요 활용 사례는?',
      options: [
        '두 테이블의 공통 행 추출',
        '모든 가능한 조합 생성 (예: 날짜 x 카테고리)',
        '중복 행 제거',
        '테이블 합치기 (UNION 대체)',
      ],
      answer: '모든 가능한 조합 생성 (예: 날짜 x 카테고리)',
      explanation: 'CROSS JOIN은 가능한 모든 조합을 만들 때 유용합니다. 예를 들어 모든 날짜와 모든 카테고리의 조합을 생성하여 매출 피벗 테이블의 빈 칸을 채울 수 있습니다.',
    },
  ],
  'full-outer-join': [
    {
      id: 'sql-join-full-q1',
      type: 'fill-blank',
      question: 'MySQL은 FULL OUTER JOIN을 지원하지 않으므로, LEFT JOIN과 RIGHT JOIN을 ___로 결합하여 구현한다.',
      answer: 'UNION',
      explanation: 'MySQL에서 FULL OUTER JOIN은 (A LEFT JOIN B) UNION (A RIGHT JOIN B)로 구현합니다. UNION이 자동으로 중복을 제거해 줍니다.',
    },
    {
      id: 'sql-join-full-q2',
      type: 'output-prediction',
      question: 'A에 {1,2,3}, B에 {2,3,4}가 있을 때 FULL OUTER JOIN 결과 행 수는? (조인 키 기준)',
      options: ['2', '3', '4', '6'],
      answer: '4',
      explanation: 'FULL OUTER JOIN은 양쪽 테이블의 합집합입니다. 키 1(A만), 2(양쪽), 3(양쪽), 4(B만) 총 4행이 반환됩니다.',
    },
  ],
  'self-join': [
    {
      id: 'sql-join-self-q1',
      type: 'output-prediction',
      question: 'employees 테이블에서 직원과 매니저를 함께 조회하려면 어떤 조인을 사용하는가?',
      options: ['CROSS JOIN', 'SELF JOIN (같은 테이블 조인)', 'NATURAL JOIN', 'FULL OUTER JOIN'],
      answer: 'SELF JOIN (같은 테이블 조인)',
      explanation: '직원 테이블의 manager_id가 같은 테이블의 id를 참조하므로, employees e JOIN employees m ON e.manager_id = m.id처럼 자기 자신과 조인합니다.',
    },
    {
      id: 'sql-join-self-q2',
      type: 'fill-blank',
      question: 'Self Join 시 같은 테이블을 두 번 참조하므로 반드시 ___를 지정해야 한다.',
      answer: '별칭(alias)',
      explanation: 'Self Join에서 같은 테이블을 구분하기 위해 별칭(alias)이 필수입니다. 예: FROM employees e1 JOIN employees e2',
    },
  ],
}
