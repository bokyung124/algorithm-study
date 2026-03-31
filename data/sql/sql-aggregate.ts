import type { Category } from '../../types/algorithm'

export const sqlAggregate: Category = {
  id: 'sql-aggregate',
  name: '집계 & 그룹화',
  icon: '📊',
  description:
    '여러 행을 그룹으로 묶고 통계값을 계산합니다. GROUP BY로 그룹을 나누고, 집계 함수(COUNT, SUM, AVG 등)로 각 그룹의 통계를 구합니다. HAVING으로 그룹 결과를 필터링합니다.',
  subject: 'sql',
  toolsLabel: 'SQL 핵심 함수',
  patterns: [
    {
      id: 'group-by-aggregate',
      name: 'GROUP BY & 집계 함수',
      description:
        'GROUP BY는 지정한 컬럼 값이 같은 행들을 하나의 그룹으로 묶습니다. 집계 함수(COUNT, SUM, AVG, MAX, MIN)는 각 그룹에 대해 하나의 값을 계산합니다.',
      timeComplexity: 'O(n log n) - 정렬 기반 그룹화',
      spaceComplexity: 'O(g) - g: 고유 그룹 수',
      keyInsight:
        'SELECT 절에는 GROUP BY에 포함된 컬럼이나 집계 함수만 쓸 수 있습니다. GROUP BY 없이 집계 함수만 쓰면 전체를 하나의 그룹으로 처리합니다. COUNT(*)는 NULL 포함, COUNT(col)은 NULL 제외입니다.',
      tools: [
        {
          name: 'COUNT(*) / COUNT(col)',
          description: '행 수를 셉니다. COUNT(col)은 NULL을 제외합니다.',
          import: '집계 함수',
        },
        {
          name: 'SUM(col)',
          description: '컬럼 값의 합계를 계산합니다. NULL은 무시됩니다.',
          import: '집계 함수',
        },
        {
          name: 'AVG(col)',
          description: '평균값을 계산합니다. NULL을 제외한 값으로 나눕니다.',
          import: '집계 함수',
        },
        {
          name: 'MAX(col) / MIN(col)',
          description: '최댓값/최솟값을 반환합니다.',
          import: '집계 함수',
        },
      ],
      codeExamples: [
        {
          title: 'GROUP BY 집계',
          code: `-- 부서별 직원 수와 평균 급여
SELECT department,
       COUNT(*) AS employee_count,
       AVG(salary) AS avg_salary,
       MAX(salary) AS max_salary
FROM employees
GROUP BY department;

-- 연도-월별 주문 합계
SELECT YEAR(order_date) AS year,
       MONTH(order_date) AS month,
       COUNT(*) AS order_count,
       SUM(amount) AS total_amount
FROM orders
GROUP BY YEAR(order_date), MONTH(order_date)
ORDER BY year, month;`,
          explanation:
            'GROUP BY 컬럼 기준으로 행을 묶어 집계합니다. SELECT에 GROUP BY에 없는 일반 컬럼을 쓰면 에러가 발생합니다(표준 SQL 기준).',
        },
      ],
      commonProblems: [
        { name: 'Classes More Than 5 Students', platform: 'leetcode', id: '596', slug: 'classes-more-than-5-students', difficulty: 'Easy' },
        { name: 'User Activity for the Past 30 Days I', platform: 'leetcode', id: '1141', slug: 'user-activity-for-the-past-30-days-i', difficulty: 'Easy' },
        { name: 'Average Selling Price', platform: 'leetcode', id: '1251', slug: 'average-selling-price', difficulty: 'Easy' },
      ],
      tips: [
        'GROUP BY 없이 WHERE 절로 집계 결과를 필터링하면 에러가 납니다. 집계 필터에는 HAVING을 쓰세요',
        'COUNT(DISTINCT col)로 고유 값 수를 셀 수 있습니다',
        'AVG는 NULL을 제외하므로 NULL이 많은 컬럼에서는 COUNT(*) / COUNT(col) 비율과 다를 수 있습니다',
      ],
    },
    {
      id: 'having',
      name: 'HAVING',
      description:
        'GROUP BY로 그룹을 만든 후, 집계 결과에 조건을 걸어 원하는 그룹만 남깁니다. WHERE는 개별 행에 적용되지만 HAVING은 그룹에 적용됩니다.',
      timeComplexity: 'O(n log n) - 그룹화 후 필터링',
      spaceComplexity: 'O(g)',
      keyInsight:
        'WHERE는 그룹화 전 개별 행 필터, HAVING은 그룹화 후 집계 결과 필터입니다. 실행 순서: FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT.',
      tools: [
        {
          name: 'HAVING',
          description: 'GROUP BY 결과에 조건을 적용합니다. 집계 함수를 조건으로 쓸 수 있습니다.',
          import: '그룹 필터링',
        },
      ],
      codeExamples: [
        {
          title: 'HAVING으로 그룹 필터링',
          code: `-- 직원이 3명 이상인 부서만 조회
SELECT department, COUNT(*) AS cnt
FROM employees
GROUP BY department
HAVING COUNT(*) >= 3;

-- WHERE + GROUP BY + HAVING 조합
-- 2023년 이후 입사자 중 부서별 평균 급여가 5000 이상인 부서
SELECT department, AVG(salary) AS avg_salary
FROM employees
WHERE hire_date >= '2023-01-01'   -- 행 필터 (그룹화 전)
GROUP BY department
HAVING AVG(salary) >= 5000;       -- 그룹 필터 (그룹화 후)`,
          explanation:
            'WHERE는 그룹화 전에, HAVING은 그룹화 후에 실행됩니다. 가능하면 WHERE로 먼저 데이터를 줄여야 성능이 좋습니다.',
        },
      ],
      commonProblems: [
        { name: 'Classes More Than 5 Students', platform: 'leetcode', id: '596', slug: 'classes-more-than-5-students', difficulty: 'Easy' },
        { name: 'Customer Placing the Largest Number of Orders', platform: 'leetcode', id: '586', slug: 'customer-placing-the-largest-number-of-orders', difficulty: 'Easy' },
      ],
      tips: [
        'HAVING에 집계 함수를 사용하면 WHERE 절로는 할 수 없는 그룹 레벨 필터링이 가능합니다',
        '실행 순서를 기억하세요: WHERE → GROUP BY → HAVING',
        'HAVING에 집계 함수 없이 일반 조건을 쓰면 WHERE로 옮겨 성능을 개선할 수 있습니다',
        'SELECT 절에서 정의한 별칭(alias)은 HAVING에서 사용할 수 없습니다(표준 SQL 기준). MySQL은 예외적으로 허용하지만, 이식성을 위해 HAVING에서 집계 함수를 직접 쓰세요',
      ],
    },
    {
      id: 'group-concat',
      name: 'GROUP_CONCAT / STRING_AGG',
      description:
        '그룹 내 여러 행의 값을 하나의 문자열로 연결하는 집계 함수입니다. MySQL은 GROUP_CONCAT, PostgreSQL/SQL Server는 STRING_AGG를 사용합니다.',
      timeComplexity: 'O(n log n) - 정렬 포함 시',
      spaceComplexity: 'O(n)',
      keyInsight:
        'GROUP BY + GROUP_CONCAT은 "여러 행을 하나의 셀로 요약"하는 패턴입니다. ORDER BY로 연결 순서를 지정하고, SEPARATOR로 구분자를 설정합니다. 기본 구분자는 쉼표(,)입니다.',
      tools: [
        {
          name: 'GROUP_CONCAT(col ORDER BY col SEPARATOR \',\')',
          description: 'MySQL에서 그룹 내 값을 하나의 문자열로 연결합니다. DISTINCT로 중복 제거, ORDER BY로 순서 지정이 가능합니다.',
          import: '집계 함수 (MySQL)',
        },
        {
          name: 'STRING_AGG(col, \',\') WITHIN GROUP (ORDER BY col)',
          description: 'PostgreSQL/SQL Server에서 GROUP_CONCAT과 동일한 기능을 합니다.',
          import: '집계 함수 (PostgreSQL/SQL Server)',
        },
      ],
      codeExamples: [
        {
          title: 'GROUP_CONCAT으로 행을 열로 요약',
          code: `-- 부서별 직원 이름 목록 (쉼표 구분)
SELECT department,
       GROUP_CONCAT(name ORDER BY name SEPARATOR ', ') AS employees
FROM employees
GROUP BY department;

-- DISTINCT로 중복 제거
SELECT user_id,
       GROUP_CONCAT(DISTINCT tag ORDER BY tag) AS tags
FROM user_tags
GROUP BY user_id;

-- 제품별 구매한 고객 ID 목록 (LC 1484 스타일)
SELECT sell_date,
       COUNT(DISTINCT product) AS num_sold,
       GROUP_CONCAT(DISTINCT product ORDER BY product SEPARATOR ',') AS products
FROM Activities
GROUP BY sell_date
ORDER BY sell_date;`,
          explanation:
            'GROUP_CONCAT(DISTINCT col ORDER BY col)은 중복 없이 정렬된 문자열을 반환합니다. LC 1484처럼 날짜별 제품 목록을 하나의 셀로 만드는 문제에서 자주 등장합니다.',
        },
      ],
      commonProblems: [
        { name: 'List the Products Ordered in a Period', platform: 'leetcode', id: '1327', slug: 'list-the-products-ordered-in-a-period', difficulty: 'Easy' },
        { name: 'Group Sold Products By The Date', platform: 'leetcode', id: '1484', slug: 'group-sold-products-by-the-date', difficulty: 'Easy' },
      ],
      tips: [
        'MySQL의 group_concat_max_len 시스템 변수 기본값이 1024바이트입니다. 긴 결과가 잘릴 수 있으므로 SET group_concat_max_len = 100000으로 늘릴 수 있습니다',
        'ORDER BY를 생략하면 연결 순서가 비결정적입니다. 일관된 결과가 필요하면 ORDER BY를 명시하세요',
        'PostgreSQL에서는 STRING_AGG(col, \',\') WITHIN GROUP (ORDER BY col) 형태로 사용합니다',
      ],
    },
  ],
}
