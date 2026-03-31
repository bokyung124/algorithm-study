import type { Category } from '../../types/algorithm'

export const sqlJoin: Category = {
  id: 'sql-join',
  name: 'JOIN',
  icon: '🔗',
  description:
    '두 개 이상의 테이블을 연결하여 데이터를 조회합니다. JOIN 종류에 따라 NULL이 포함되거나 포함되지 않는 결과가 나오므로 각 특성을 명확히 이해해야 합니다.',
  subject: 'sql',
  toolsLabel: 'SQL 핵심 키워드',
  patterns: [
    {
      id: 'inner-join',
      name: 'INNER JOIN',
      description:
        '두 테이블에서 조인 조건을 모두 만족하는 행만 반환합니다. 가장 일반적인 JOIN 유형이며, 단순히 JOIN이라고 써도 동일합니다.',
      timeComplexity: 'O(n × m) - 인덱스 없을 때, O(n log m) - 인덱스 있을 때',
      spaceComplexity: 'O(k) - k: 일치하는 행 수',
      keyInsight:
        'INNER JOIN은 교집합(intersection)입니다. 조인 조건에 사용되는 컬럼에 인덱스가 있으면 성능이 크게 향상됩니다. 여러 테이블을 JOIN할 때는 가장 선택도가 높은(결과를 많이 줄이는) 조인부터 수행하는 것이 효율적입니다.',
      tools: [
        {
          name: 'INNER JOIN ... ON ...',
          description: '두 테이블의 조건이 일치하는 행만 반환합니다.',
          import: 'JOIN',
        },
        {
          name: 'USING (column)',
          description: '양쪽 테이블에 동일한 컬럼명이 있을 때 ON 대신 간결하게 사용합니다.',
          import: 'JOIN',
        },
      ],
      codeExamples: [
        {
          title: 'INNER JOIN 기본',
          code: `-- 직원과 부서 테이블 연결
SELECT e.name, e.salary, d.department_name
FROM employees e
INNER JOIN departments d ON e.department_id = d.id;

-- 3개 테이블 JOIN
SELECT e.name, d.department_name, l.city
FROM employees e
JOIN departments d ON e.department_id = d.id
JOIN locations l ON d.location_id = l.id
WHERE e.salary > 5000;`,
          explanation:
            '조인 조건(ON)을 명확히 지정하세요. 조인 컬럼에 인덱스가 있으면 큰 성능 이점을 얻습니다.',
        },
      ],
      commonProblems: [
        { name: 'Combine Two Tables', platform: 'leetcode', id: '175', slug: 'combine-two-tables', difficulty: 'Easy' },
        { name: 'Employee Bonus', platform: 'leetcode', id: '577', slug: 'employee-bonus', difficulty: 'Easy' },
      ],
      tips: [
        '조인 컬럼에 외래키(FK) 인덱스를 추가하면 대부분의 JOIN 쿼리 성능이 향상됩니다',
        '여러 JOIN 시 쿼리 옵티마이저가 실행 순서를 결정하지만, EXPLAIN으로 확인하세요',
        '동일 테이블 명칭 충돌을 피하기 위해 항상 테이블 별칭(alias)을 사용하세요',
      ],
    },
    {
      id: 'left-right-join',
      name: 'LEFT / RIGHT JOIN',
      description:
        'LEFT JOIN은 왼쪽 테이블의 모든 행을 반환하고, 오른쪽에 매칭이 없으면 NULL을 채웁니다. RIGHT JOIN은 반대입니다. 매칭되지 않는 데이터를 포함해야 할 때 사용합니다.',
      timeComplexity: 'O(n + m) ~ O(n × m)',
      spaceComplexity: 'O(n) ~ O(n + m)',
      keyInsight:
        'LEFT JOIN 후 오른쪽 테이블의 컬럼이 IS NULL인 행을 필터링하면 "왼쪽에만 있는 데이터(차집합)"를 구할 수 있습니다. RIGHT JOIN은 LEFT JOIN의 순서를 바꾼 것과 동일하므로 LEFT JOIN으로 통일해 사용하는 것이 일반적입니다.',
      tools: [
        {
          name: 'LEFT JOIN',
          description: '왼쪽 테이블 전체 + 오른쪽 일치 행(없으면 NULL)을 반환합니다.',
          import: 'JOIN',
        },
        {
          name: 'RIGHT JOIN',
          description: '오른쪽 테이블 전체 + 왼쪽 일치 행(없으면 NULL)을 반환합니다.',
          import: 'JOIN',
        },
      ],
      codeExamples: [
        {
          title: 'LEFT JOIN & 차집합 패턴',
          code: `-- 모든 직원과 보너스 (보너스 없으면 NULL)
SELECT e.name, b.bonus
FROM employees e
LEFT JOIN bonuses b ON e.id = b.employee_id;

-- 보너스가 없는 직원만 조회 (차집합 패턴)
SELECT e.name
FROM employees e
LEFT JOIN bonuses b ON e.id = b.employee_id
WHERE b.employee_id IS NULL;`,
          explanation:
            'LEFT JOIN + WHERE 오른쪽테이블.id IS NULL 패턴은 "A에만 있고 B에 없는 데이터"를 찾는 표준 방법입니다. NOT IN보다 NULL-safe하고 성능도 좋습니다.',
        },
      ],
      commonProblems: [
        { name: 'Employee Bonus', platform: 'leetcode', id: '577', slug: 'employee-bonus', difficulty: 'Easy' },
        { name: 'Rising Temperature', platform: 'leetcode', id: '197', slug: 'rising-temperature', difficulty: 'Easy' },
        { name: 'Customer Who Visited but Did Not Make Any Transactions', platform: 'leetcode', id: '1581', slug: 'customer-who-visited-but-did-not-make-any-transactions', difficulty: 'Easy' },
      ],
      tips: [
        'LEFT JOIN 후 WHERE 절에 오른쪽 테이블 조건을 넣으면 INNER JOIN처럼 동작합니다. 조건은 ON 절에 넣으세요',
        'RIGHT JOIN보다 테이블 순서를 바꾼 LEFT JOIN이 가독성이 더 좋습니다',
        '성능상 LEFT JOIN의 왼쪽 테이블이 더 작을수록 유리합니다',
      ],
    },
    {
      id: 'cross-join',
      name: 'CROSS JOIN',
      description:
        '두 테이블의 모든 행 조합을 반환합니다(카티션 곱). 모든 가능한 조합을 생성해야 할 때, 또는 달력/숫자 테이블과 함께 누락된 데이터를 채울 때 활용합니다.',
      timeComplexity: 'O(n × m) - 두 테이블 행 수의 곱',
      spaceComplexity: 'O(n × m)',
      keyInsight:
        'CROSS JOIN은 WHERE 조건이 없으면 n×m개의 행을 생성합니다. "모든 학생 × 모든 과목 조합"처럼 기준 조합 집합을 만든 뒤 실제 데이터와 LEFT JOIN해서 누락된 항목을 찾는 패턴에 자주 사용됩니다.',
      tools: [
        {
          name: 'CROSS JOIN',
          description: '두 테이블의 모든 행 조합(카티션 곱)을 반환합니다.',
          import: 'JOIN',
        },
      ],
      codeExamples: [
        {
          title: 'CROSS JOIN으로 조합 생성',
          code: `-- 모든 학생과 과목 조합 생성 (출석 현황 분석용)
SELECT s.student_id, s.student_name, sub.subject_name
FROM Students s
CROSS JOIN Subjects sub
ORDER BY s.student_name, sub.subject_name;

-- CROSS JOIN + LEFT JOIN: 모든 조합에서 누락된 항목 찾기
SELECT s.student_id, s.student_name, sub.subject_name,
       IFNULL(COUNT(e.subject_name), 0) AS attended_exams
FROM Students s
CROSS JOIN Subjects sub
LEFT JOIN Examinations e
  ON s.student_id = e.student_id
  AND sub.subject_name = e.subject_name
GROUP BY s.student_id, s.student_name, sub.subject_name
ORDER BY s.student_id, sub.subject_name;

-- 연속 숫자 생성 (재귀 CTE 없이)
SELECT a.n + b.n * 10 AS num
FROM (SELECT 0 n UNION SELECT 1 UNION ... UNION SELECT 9) a
CROSS JOIN (SELECT 0 n UNION SELECT 1 UNION ... UNION SELECT 9) b
ORDER BY num;`,
          explanation:
            'CROSS JOIN + LEFT JOIN + GROUP BY 조합은 "모든 가능한 조합에서 실제 데이터와 매칭"하는 강력한 패턴입니다. 누락된 데이터 채우기, 결석 횟수 계산 등에 활용됩니다.',
        },
      ],
      commonProblems: [
        { name: 'Students and Examinations', platform: 'leetcode', id: '1280', slug: 'students-and-examinations', difficulty: 'Easy' },
        { name: 'Find the Missing IDs', platform: 'leetcode', id: '1613', slug: 'find-the-missing-ids', difficulty: 'Medium' },
      ],
      tips: [
        'CROSS JOIN은 WHERE 없으면 m×n 행을 생성합니다. 대용량 테이블에 사용 시 주의하세요',
        'FROM t1, t2 (콤마 구분)는 CROSS JOIN과 동일합니다. 명시적 CROSS JOIN이 가독성이 좋습니다',
        'CROSS JOIN + GROUP BY + IFNULL 패턴은 "결석/누락 데이터 집계" 문제의 표준 해법입니다',
      ],
    },
    {
      id: 'full-outer-join',
      name: 'FULL OUTER JOIN',
      description:
        '두 테이블 모두의 모든 행을 반환합니다. MySQL은 FULL OUTER JOIN을 직접 지원하지 않으므로 LEFT JOIN UNION RIGHT JOIN 패턴으로 시뮬레이션합니다.',
      timeComplexity: 'O(n + m)',
      spaceComplexity: 'O(n + m)',
      keyInsight:
        'MySQL에서 FULL OUTER JOIN이 필요할 때는 LEFT JOIN과 RIGHT JOIN을 UNION으로 합치는 패턴을 사용합니다. 양쪽 테이블에 없는 데이터를 동시에 찾아야 할 때 유용합니다.',
      tools: [
        {
          name: 'LEFT JOIN UNION RIGHT JOIN',
          description: 'MySQL에서 FULL OUTER JOIN을 시뮬레이션하는 패턴입니다.',
          import: 'JOIN',
        },
      ],
      codeExamples: [
        {
          title: 'FULL OUTER JOIN (MySQL 대안)',
          code: `-- 표준 SQL (PostgreSQL, SQL Server)
SELECT e.employee_id, e.name, d.department_name
FROM employees e
FULL OUTER JOIN departments d ON e.department_id = d.id;

-- MySQL 대안: LEFT JOIN UNION RIGHT JOIN
SELECT e.employee_id, e.name, d.department_name
FROM employees e
LEFT JOIN departments d ON e.department_id = d.id

UNION

SELECT e.employee_id, e.name, d.department_name
FROM employees e
RIGHT JOIN departments d ON e.department_id = d.id;

-- 두 테이블 모두에서 누락된 정보 찾기 (실전 패턴)
SELECT COALESCE(e1.employee_id, e2.employee_id) AS employee_id
FROM Employees e1
FULL JOIN Salaries e2 ON e1.employee_id = e2.employee_id
WHERE e1.employee_id IS NULL OR e2.employee_id IS NULL;

-- MySQL 대안 (위와 동일)
SELECT employee_id FROM Employees
WHERE employee_id NOT IN (SELECT employee_id FROM Salaries)
UNION
SELECT employee_id FROM Salaries
WHERE employee_id NOT IN (SELECT employee_id FROM Employees);`,
          explanation:
            'MySQL에서 FULL OUTER JOIN은 LEFT JOIN과 RIGHT JOIN의 UNION으로 구현합니다. UNION ALL이 아닌 UNION을 사용해야 중복이 제거됩니다.',
        },
      ],
      commonProblems: [
        { name: 'Employees with Missing Information', platform: 'leetcode', id: '1965', slug: 'employees-with-missing-information', difficulty: 'Easy' },
      ],
      tips: [
        'MySQL 8.0까지는 FULL OUTER JOIN을 지원하지 않습니다. LEFT JOIN UNION RIGHT JOIN으로 대체하세요',
        'UNION은 중복을 제거하므로 양쪽 모두에 있는 행이 한 번만 나옵니다',
        '단순 FULL OUTER JOIN보다 NOT IN + UNION 패턴이 더 직관적인 경우가 많습니다',
      ],
    },
    {
      id: 'self-join',
      name: 'SELF JOIN',
      description:
        '동일한 테이블을 두 번 JOIN합니다. 계층 구조(직원-관리자), 연속된 행 비교, 같은 테이블 내 행 간 관계를 분석할 때 사용합니다.',
      timeComplexity: 'O(n²) 최악, 인덱스 활용 시 O(n log n)',
      spaceComplexity: 'O(k)',
      keyInsight:
        '같은 테이블이므로 반드시 서로 다른 별칭(alias)을 사용해야 합니다. 계층 데이터나 이전/다음 행 비교 문제에서 자주 등장합니다.',
      tools: [
        {
          name: 'SELF JOIN (별칭 사용)',
          description: '동일 테이블에 두 가지 별칭을 부여해 JOIN합니다.',
          import: 'JOIN',
        },
      ],
      codeExamples: [
        {
          title: 'SELF JOIN으로 계층 구조 조회',
          code: `-- 직원과 해당 직원의 관리자 이름 함께 조회
SELECT e.name AS employee, m.name AS manager
FROM employees e
LEFT JOIN employees m ON e.manager_id = m.id;

-- 어제보다 온도가 높은 날짜 조회 (날짜 비교)
SELECT w1.id
FROM Weather w1
JOIN Weather w2 ON DATEDIFF(w1.recordDate, w2.recordDate) = 1
WHERE w1.temperature > w2.temperature;`,
          explanation:
            '같은 테이블을 e(직원)와 m(관리자)로 별칭을 달리 하여 JOIN합니다. LEFT JOIN을 사용하면 관리자가 없는 최상위 직원도 포함됩니다.',
        },
      ],
      commonProblems: [
        { name: 'Rising Temperature', platform: 'leetcode', id: '197', slug: 'rising-temperature', difficulty: 'Easy' },
        { name: 'Managers with at Least 5 Direct Reports', platform: 'leetcode', id: '570', slug: 'managers-with-at-least-5-direct-reports', difficulty: 'Medium' },
      ],
      tips: [
        '별칭을 의미 있게 지으면 가독성이 크게 향상됩니다 (e: employee, m: manager)',
        '날짜 기반 SELF JOIN에서는 DATEDIFF 함수가 자주 활용됩니다',
        '재귀적 계층 구조(n단계 깊이)는 SELF JOIN보다 재귀 CTE가 더 적합합니다',
      ],
    },
  ],
}
