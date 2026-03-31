import type { Category } from '../../types/algorithm'

export const sqlSubquery: Category = {
  id: 'sql-subquery',
  name: '서브쿼리',
  icon: '🔄',
  description:
    'SQL 쿼리 안에 중첩된 또 다른 쿼리입니다. SELECT, FROM, WHERE 절 등에서 사용할 수 있으며, 복잡한 조건이나 다단계 집계를 표현할 때 유용합니다.',
  subject: 'sql',
  toolsLabel: 'SQL 핵심 키워드',
  patterns: [
    {
      id: 'scalar-subquery',
      name: '스칼라 서브쿼리',
      description:
        '단일 값(1행 1열)을 반환하는 서브쿼리입니다. SELECT 절이나 WHERE 조건에서 단일 값이 필요한 곳에 사용합니다.',
      timeComplexity: 'O(n) - 외부 쿼리 행마다 실행될 수 있음',
      spaceComplexity: 'O(1)',
      keyInsight:
        '스칼라 서브쿼리는 외부 쿼리의 각 행에 대해 실행될 수 있어 성능 문제가 생길 수 있습니다. 가능하면 JOIN으로 대체하거나 캐시 가능한 상수 서브쿼리로 만드세요.',
      tools: [
        {
          name: 'SELECT 절 스칼라 서브쿼리',
          description: '각 행에 대해 계산된 단일 값을 컬럼으로 반환합니다.',
          import: '서브쿼리',
        },
        {
          name: 'WHERE 절 비교 서브쿼리',
          description: '집계 결과와 비교할 때 주로 사용합니다.',
          import: '서브쿼리',
        },
      ],
      codeExamples: [
        {
          title: '스칼라 서브쿼리',
          code: `-- 전체 평균 급여보다 높은 직원 조회
SELECT name, salary
FROM employees
WHERE salary > (SELECT AVG(salary) FROM employees);

-- SELECT 절에서 각 부서의 최대 급여를 함께 표시
SELECT name, salary, department,
       (SELECT MAX(salary) FROM employees e2
        WHERE e2.department = e1.department) AS dept_max
FROM employees e1;`,
          explanation:
            'WHERE 절의 서브쿼리는 집계 결과를 비교값으로 쓸 때 유용합니다. SELECT 절 서브쿼리는 외부 쿼리 행마다 실행되므로 대용량에서는 JOIN으로 대체 검토가 필요합니다.',
        },
      ],
      commonProblems: [
        { name: 'Second Highest Salary', platform: 'leetcode', id: '176', slug: 'second-highest-salary', difficulty: 'Medium' },
        { name: 'Department Highest Salary', platform: 'leetcode', id: '184', slug: 'department-highest-salary', difficulty: 'Medium' },
      ],
      tips: [
        '서브쿼리가 2개 이상의 행을 반환하면 에러가 발생합니다. LIMIT 1이나 MAX/MIN을 활용하세요',
        '서브쿼리가 상수(outer 쿼리와 무관)라면 한 번만 실행되어 효율적입니다',
        '가능하면 JOIN이 서브쿼리보다 옵티마이저가 최적화하기 쉽습니다',
      ],
    },
    {
      id: 'in-exists-subquery',
      name: 'IN / EXISTS 서브쿼리',
      description:
        'IN은 서브쿼리 결과 목록에 포함되는지 확인합니다. EXISTS는 서브쿼리 결과가 1개 이상 존재하는지 확인합니다. 목적은 비슷하지만 성능 특성이 다릅니다.',
      timeComplexity: 'IN/EXISTS: 현대 옵티마이저(MySQL 5.6+)가 세미조인으로 동일하게 최적화',
      spaceComplexity: 'O(m) - 옵티마이저 전략에 따라 다름',
      keyInsight:
        '현대 옵티마이저(MySQL 5.6+, PostgreSQL)는 IN과 EXISTS를 세미조인(semi-join)으로 동일하게 최적화하므로 성능 차이는 거의 없습니다. 단, NOT IN 리스트에 NULL이 있으면 모든 비교가 UNKNOWN이 되어 항상 빈 결과를 반환합니다. 이것이 NOT EXISTS를 선호해야 하는 핵심 이유입니다.',
      tools: [
        {
          name: 'IN (subquery)',
          description: '서브쿼리 결과 집합에 값이 포함되면 TRUE입니다.',
          import: '서브쿼리',
        },
        {
          name: 'EXISTS (subquery)',
          description: '서브쿼리 결과가 1행 이상이면 TRUE입니다. 단락 평가로 효율적입니다.',
          import: '서브쿼리',
        },
        {
          name: 'NOT EXISTS (subquery)',
          description: '서브쿼리 결과가 없으면 TRUE입니다. NOT IN의 NULL-safe 대안입니다.',
          import: '서브쿼리',
        },
      ],
      codeExamples: [
        {
          title: 'IN vs EXISTS',
          code: `-- IN: 주문한 적 있는 고객 (소규모 서브쿼리에 적합)
SELECT name FROM customers
WHERE id IN (SELECT customer_id FROM orders);

-- EXISTS: 동일 결과, 대용량 서브쿼리에 더 효율적
SELECT name FROM customers c
WHERE EXISTS (
  SELECT 1 FROM orders o WHERE o.customer_id = c.id
);

-- NOT EXISTS: 주문한 적 없는 고객 (NOT IN의 NULL-safe 대안)
SELECT name FROM customers c
WHERE NOT EXISTS (
  SELECT 1 FROM orders o WHERE o.customer_id = c.id
);`,
          explanation:
            'EXISTS의 서브쿼리는 SELECT 1이나 SELECT *이나 성능 차이가 없습니다. 존재 여부만 확인하기 때문입니다.',
        },
      ],
      commonProblems: [
        { name: 'Customers Who Never Order', platform: 'leetcode', id: '183', slug: 'customers-who-never-order', difficulty: 'Easy' },
        { name: 'Employees with Missing Information', platform: 'leetcode', id: '1965', slug: 'employees-with-missing-information', difficulty: 'Easy' },
      ],
      tips: [
        'NOT IN 리스트에 NULL이 있으면 모든 결과가 UNKNOWN이 되어 빈 결과가 반환됩니다. NOT EXISTS를 사용하세요',
        'EXISTS의 서브쿼리는 SELECT 1이면 충분합니다',
        '상관 서브쿼리(correlated subquery)는 외부 쿼리 행마다 실행되어 느릴 수 있습니다. LEFT JOIN으로 리팩터링을 고려하세요',
      ],
    },
    {
      id: 'correlated-subquery',
      name: '상관 서브쿼리 (Correlated)',
      description:
        '외부 쿼리의 현재 행 값을 참조하는 서브쿼리입니다. 외부 쿼리의 각 행마다 서브쿼리가 다시 실행됩니다. 그룹 내 최대값 비교 등에 자주 쓰입니다.',
      timeComplexity: 'O(n × m) - 외부 쿼리 행마다 서브쿼리 실행',
      spaceComplexity: 'O(1)',
      keyInsight:
        '상관 서브쿼리는 부서별 최고 급여 직원 조회처럼 "그룹 내 비교"에 자주 등장합니다. 성능이 중요하면 윈도우 함수(RANK, MAX OVER PARTITION)로 대체하는 것이 효율적입니다.',
      tools: [
        {
          name: '외부 쿼리 별칭 참조',
          description: '서브쿼리 내에서 외부 테이블의 별칭으로 현재 행을 참조합니다.',
          import: '상관 서브쿼리',
        },
      ],
      codeExamples: [
        {
          title: '상관 서브쿼리',
          code: `-- 각 부서에서 최고 급여를 받는 직원 조회
SELECT name, department, salary
FROM employees e1
WHERE salary = (
  SELECT MAX(salary)
  FROM employees e2
  WHERE e2.department = e1.department  -- 외부 쿼리 참조
);

-- 자신보다 급여가 높은 직원 수 조회
SELECT name, salary,
       (SELECT COUNT(*) FROM employees e2
        WHERE e2.salary > e1.salary) AS higher_count
FROM employees e1
ORDER BY salary DESC;`,
          explanation:
            '서브쿼리 내 e1.department가 외부 쿼리의 현재 행을 참조합니다. 이를 상관(correlated) 서브쿼리라고 합니다.',
        },
      ],
      commonProblems: [
        { name: 'Department Highest Salary', platform: 'leetcode', id: '184', slug: 'department-highest-salary', difficulty: 'Medium' },
        { name: 'Department Top Three Salaries', platform: 'leetcode', id: '185', slug: 'department-top-three-salaries', difficulty: 'Hard' },
      ],
      tips: [
        '상관 서브쿼리는 대용량 테이블에서 매우 느릴 수 있습니다. 윈도우 함수로 대체하면 한 번의 스캔으로 처리됩니다',
        '부서별 top-N 문제는 윈도우 함수 RANK() OVER (PARTITION BY department ORDER BY salary DESC)로 효율적으로 해결 가능합니다',
      ],
    },
  ],
}
