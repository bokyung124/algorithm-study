import type { Category } from '../../types/algorithm'

export const sqlSelect: Category = {
  id: 'sql-select',
  name: 'SELECT & 필터링',
  icon: '🔍',
  description:
    '데이터를 조회하고 조건에 맞는 행을 필터링하는 가장 기본적인 SQL 구문입니다. WHERE 절과 다양한 연산자를 활용해 원하는 데이터를 정확히 추출합니다.',
  subject: 'sql',
  toolsLabel: 'SQL 핵심 키워드',
  patterns: [
    {
      id: 'where-basics',
      name: 'WHERE & 비교 연산자',
      description:
        '특정 조건을 만족하는 행만 조회합니다. =, !=, >, <, >=, <=, AND, OR, NOT 등의 연산자를 조합하여 복잡한 필터 조건을 만들 수 있습니다.',
      timeComplexity: 'O(n) - Full Table Scan (인덱스 없을 때)',
      spaceComplexity: 'O(k) - k: 결과 행 수',
      keyInsight:
        'MySQL 옵티마이저는 AND 조건의 작성 순서와 무관하게 최적 실행 계획을 스스로 결정합니다. 성능의 핵심은 조건에 사용되는 컬럼에 인덱스가 있는지 여부입니다. 인덱스가 있는 컬럼을 조건에 사용하면 O(n)에서 O(log n)으로 개선됩니다.',
      tools: [
        {
          name: 'WHERE',
          description: '조건에 맞는 행만 필터링합니다. AND/OR/NOT과 조합 가능합니다.',
          import: '필터링',
        },
        {
          name: 'BETWEEN ... AND ...',
          description: '범위 조건을 간결하게 표현합니다. 양 끝값 포함(inclusive)입니다.',
          import: '범위 조건',
        },
        {
          name: 'IN (...)',
          description: '여러 값 중 하나와 일치하는지 확인합니다. OR 조건을 간결하게 표현합니다.',
          import: '목록 조건',
        },
      ],
      codeExamples: [
        {
          title: 'WHERE 기본 사용',
          code: `-- 급여가 5000 이상이고 부서가 'IT'인 직원
SELECT employee_id, name, salary, department
FROM employees
WHERE salary >= 5000
  AND department = 'IT';

-- IN 연산자로 여러 값 필터링
SELECT name, department
FROM employees
WHERE department IN ('IT', 'HR', 'Finance');

-- BETWEEN으로 범위 조건
SELECT name, hire_date
FROM employees
WHERE hire_date BETWEEN '2020-01-01' AND '2022-12-31';`,
          explanation:
            'AND/OR로 조건을 결합하고, IN으로 목록 조건, BETWEEN으로 범위를 처리합니다. IN은 내부적으로 OR와 동일하지만 가독성이 높습니다.',
        },
      ],
      commonProblems: [
        { name: 'Recyclable and Low Fat Products', platform: 'leetcode', id: '1757', slug: 'recyclable-and-low-fat-products', difficulty: 'Easy' },
        { name: 'Find Customer Referee', platform: 'leetcode', id: '584', slug: 'find-customer-referee', difficulty: 'Easy' },
        { name: 'Big Countries', platform: 'leetcode', id: '595', slug: 'big-countries', difficulty: 'Easy' },
      ],
      tips: [
        'NULL 비교는 = 대신 IS NULL / IS NOT NULL을 사용해야 합니다',
        'WHERE 절에서 컬럼에 함수를 적용하면(예: YEAR(date) = 2023) 인덱스를 사용하지 못합니다',
        'OR 조건이 많다면 IN으로 리팩터링하면 가독성과 성능 모두 향상될 수 있습니다',
      ],
    },
    {
      id: 'like-pattern',
      name: 'LIKE & 패턴 매칭',
      description:
        '문자열 패턴 매칭에 사용합니다. %(임의의 0개 이상 문자)와 _(임의의 1개 문자) 와일드카드를 활용합니다.',
      timeComplexity: 'O(n) - 전체 스캔 (접두사 패턴은 인덱스 활용 가능)',
      spaceComplexity: 'O(k)',
      keyInsight:
        '`LIKE \'prefix%\'` 형태는 B-Tree 인덱스를 활용할 수 있지만, `LIKE \'%suffix\'`나 `LIKE \'%middle%\'`는 풀 스캔이 필요합니다. 대소문자 구분은 DB 설정(collation)에 따라 다릅니다.',
      tools: [
        {
          name: 'LIKE',
          description: '%, _ 와일드카드를 사용한 문자열 패턴 매칭입니다.',
          import: '문자열 필터링',
        },
        {
          name: 'NOT LIKE',
          description: '패턴과 일치하지 않는 행을 필터링합니다.',
          import: '문자열 필터링',
        },
      ],
      codeExamples: [
        {
          title: 'LIKE 패턴 매칭',
          code: `-- 이름이 'A'로 시작하는 직원
SELECT name FROM employees WHERE name LIKE 'A%';

-- 이메일이 '@gmail.com'으로 끝나는 사용자
SELECT email FROM users WHERE email LIKE '%@gmail.com';

-- 세 글자 이름 (정확히 3자)
SELECT name FROM employees WHERE name LIKE '___';

-- 이름에 'an'이 포함된 직원
SELECT name FROM employees WHERE name LIKE '%an%';`,
          explanation:
            '%는 0개 이상의 임의 문자, _는 정확히 1개의 임의 문자를 의미합니다. 접두사 검색(prefix%)만 인덱스 효율이 좋습니다.',
        },
      ],
      commonProblems: [
        { name: 'Patients With a Condition', platform: 'leetcode', id: '1527', slug: 'patients-with-a-condition', difficulty: 'Easy' },
      ],
      tips: [
        '대용량 테이블에서 %로 시작하는 LIKE 검색은 인덱스를 사용하지 못해 느립니다',
        '전문 검색이 필요하면 FULL-TEXT INDEX를 고려하세요',
        'LIKE 비교 시 escape 문자가 필요하다면 ESCAPE 절을 사용하세요 (예: LIKE \'100\\_000\' ESCAPE \'\\\\\')',
      ],
    },
    {
      id: 'distinct-dedup',
      name: 'DISTINCT & 중복 제거',
      description:
        'SELECT DISTINCT로 중복 행을 제거합니다. COUNT(DISTINCT col)로 고유 값의 수를 셀 수 있습니다. GROUP BY로도 동일한 중복 제거 효과를 낼 수 있습니다.',
      timeComplexity: 'O(n log n) - 정렬 또는 해시로 중복 제거',
      spaceComplexity: 'O(k) - k: 고유 값 수',
      keyInsight:
        'DISTINCT는 SELECT 결과 전체 행을 기준으로 중복을 제거합니다. 단일 컬럼이 아닌 모든 컬럼 조합이 동일해야 중복으로 처리됩니다. GROUP BY ... HAVING COUNT(*) > 1 패턴으로 중복된 행을 탐지할 수 있습니다.',
      tools: [
        {
          name: 'SELECT DISTINCT col',
          description: '결과에서 중복 행을 제거합니다. 모든 선택 컬럼 조합 기준입니다.',
          import: '중복 제거',
        },
        {
          name: 'COUNT(DISTINCT col)',
          description: '해당 컬럼의 고유 값 개수를 반환합니다.',
          import: '중복 제거',
        },
      ],
      codeExamples: [
        {
          title: 'DISTINCT와 중복 탐지',
          code: `-- 주문한 적 있는 고유 고객 목록
SELECT DISTINCT customer_id
FROM orders;

-- 부서별 고유 직책 수
SELECT department,
       COUNT(DISTINCT job_title) AS unique_roles
FROM employees
GROUP BY department;

-- 중복 이메일 탐지 (GROUP BY + HAVING)
SELECT email, COUNT(*) AS cnt
FROM users
GROUP BY email
HAVING COUNT(*) > 1;

-- 중복 행 중 id가 가장 큰 것만 남기고 나머지 삭제
DELETE FROM users
WHERE id NOT IN (
  SELECT MIN(id) FROM users GROUP BY email
);`,
          explanation:
            'DISTINCT는 결과를 반환할 때 중복을 제거하고, GROUP BY + HAVING COUNT(*) > 1은 중복된 데이터를 찾는 표준 패턴입니다.',
        },
      ],
      commonProblems: [
        { name: 'Duplicate Emails', platform: 'leetcode', id: '182', slug: 'duplicate-emails', difficulty: 'Easy' },
        { name: 'Delete Duplicate Emails', platform: 'leetcode', id: '196', slug: 'delete-duplicate-emails', difficulty: 'Easy' },
      ],
      tips: [
        'DISTINCT는 GROUP BY로 대체할 수 있습니다. GROUP BY는 집계 함수와 함께 사용 가능하므로 더 유연합니다',
        'COUNT(DISTINCT col)는 NULL을 제외한 고유 값 수를 반환합니다',
        '여러 컬럼에 DISTINCT를 쓰면 전체 컬럼 조합이 고유한 행만 남습니다',
      ],
    },
    {
      id: 'order-limit',
      name: 'ORDER BY / LIMIT / OFFSET',
      description:
        '결과를 정렬하고 원하는 행 수만 반환합니다. LIMIT N으로 상위 N개, LIMIT N OFFSET M으로 페이지네이션을 구현합니다.',
      timeComplexity: 'O(n log n) - 정렬 포함, LIMIT 적용 후 O(k)',
      spaceComplexity: 'O(k) - k: 반환 행 수',
      keyInsight:
        'ORDER BY는 결과를 정렬하고, LIMIT는 반환할 행 수를 제한합니다. N번째 값을 구할 때 LIMIT 1 OFFSET N-1 패턴을 사용하거나 서브쿼리에서 LIMIT를 활용합니다. NULL은 ASC 시 기본적으로 마지막에 정렬됩니다.',
      tools: [
        {
          name: 'ORDER BY col [ASC|DESC]',
          description: '결과를 오름차순(기본) 또는 내림차순으로 정렬합니다.',
          import: '정렬',
        },
        {
          name: 'LIMIT n',
          description: '상위 n개 행만 반환합니다.',
          import: '페이지네이션',
        },
        {
          name: 'LIMIT n OFFSET m',
          description: 'm번째 행부터 n개를 반환합니다. 페이지네이션에 활용합니다.',
          import: '페이지네이션',
        },
      ],
      codeExamples: [
        {
          title: 'ORDER BY & LIMIT 활용',
          code: `-- 급여 상위 3명 조회
SELECT name, salary
FROM employees
ORDER BY salary DESC
LIMIT 3;

-- 두 번째로 높은 급여 (LIMIT + OFFSET)
SELECT DISTINCT salary
FROM employees
ORDER BY salary DESC
LIMIT 1 OFFSET 1;

-- NULL-safe 두 번째로 높은 급여 (없으면 NULL 반환)
SELECT (
  SELECT DISTINCT salary
  FROM employees
  ORDER BY salary DESC
  LIMIT 1 OFFSET 1
) AS SecondHighestSalary;

-- 페이지네이션 (페이지 크기 10, 3페이지)
SELECT name, salary
FROM employees
ORDER BY id
LIMIT 10 OFFSET 20;  -- (페이지 번호 - 1) × 페이지 크기`,
          explanation:
            'LIMIT 1 OFFSET N-1로 N번째 값을 구할 수 있습니다. 결과가 없으면 NULL을 반환해야 하는 경우 바깥에 서브쿼리로 감싸세요.',
        },
      ],
      commonProblems: [
        { name: 'Second Highest Salary', platform: 'leetcode', id: '176', slug: 'second-highest-salary', difficulty: 'Medium' },
        { name: 'Nth Highest Salary', platform: 'leetcode', id: '177', slug: 'nth-highest-salary', difficulty: 'Medium' },
      ],
      tips: [
        'NULL은 ORDER BY ASC에서 기본적으로 마지막에 위치합니다. ORDER BY ISNULL(col), col ASC로 NULL을 맨 뒤로 명시적으로 지정하세요',
        'LIMIT 없이 ORDER BY만 쓰면 DB에 따라 결과 순서가 비결정적일 수 있습니다',
        'LIMIT 1 OFFSET N은 대용량 테이블에서 느릴 수 있습니다. 윈도우 함수 ROW_NUMBER()가 더 효율적입니다',
      ],
    },
    {
      id: 'null-handling',
      name: 'NULL 처리',
      description:
        'NULL은 "값이 없음"을 나타내는 특수값입니다. 일반 비교 연산자로는 NULL을 감지할 수 없으며, IS NULL / IS NOT NULL을 사용해야 합니다.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(k)',
      keyInsight:
        'NULL과의 모든 산술/비교 연산 결과는 NULL입니다. NULL = NULL도 NULL(false)입니다. COALESCE나 IFNULL로 기본값을 대체하면 NULL로 인한 예상치 못한 결과를 방지할 수 있습니다.',
      tools: [
        {
          name: 'IS NULL / IS NOT NULL',
          description: 'NULL 값 여부를 확인하는 유일한 올바른 방법입니다.',
          import: 'NULL 비교',
        },
        {
          name: 'COALESCE(v1, v2, ...)',
          description: '첫 번째 non-NULL 값을 반환합니다. NULL 기본값 대체에 활용합니다.',
          import: 'NULL 대체',
        },
        {
          name: 'IFNULL(expr, default)',
          description: 'expr이 NULL이면 default를 반환합니다. MySQL 전용입니다.',
          import: 'NULL 대체',
        },
      ],
      codeExamples: [
        {
          title: 'NULL 조회 및 처리',
          code: `-- NULL인 행 찾기
SELECT name, manager_id
FROM employees
WHERE manager_id IS NULL;  -- CEO 등 상위 관리자 없는 직원

-- COALESCE로 NULL을 기본값으로 대체
SELECT name,
       COALESCE(phone, 'N/A') AS phone,
       COALESCE(bonus, 0) + salary AS total_pay
FROM employees;

-- NULL 포함 집계 주의: COUNT(*)는 NULL 포함, COUNT(col)은 NULL 제외
SELECT COUNT(*) AS total_rows,
       COUNT(bonus) AS rows_with_bonus
FROM employees;`,
          explanation:
            'COUNT(*)는 NULL 포함 전체 행 수, COUNT(컬럼)은 NULL을 제외한 행 수를 반환합니다. 이 차이를 이용해 NULL 개수를 구할 수 있습니다.',
        },
      ],
      commonProblems: [
        { name: 'Find Users With Valid E-Mails', platform: 'leetcode', id: '1517', slug: 'find-users-with-valid-e-mails', difficulty: 'Easy' },
        { name: 'Employees with Missing Information', platform: 'leetcode', id: '1965', slug: 'employees-with-missing-information', difficulty: 'Easy' },
      ],
      tips: [
        'NULL != NULL이므로 두 컬럼을 JOIN할 때 NULL이 포함되면 매칭되지 않습니다',
        'ORDER BY에서 NULL은 기본적으로 마지막(DESC 시 처음)에 정렬됩니다',
        'NOT IN 사용 시 리스트에 NULL이 있으면 결과가 항상 빈 집합이 됩니다. 주의하세요',
      ],
    },
  ],
}
