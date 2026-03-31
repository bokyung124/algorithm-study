import type { Category } from '../../types/algorithm'

export const sqlSetOps: Category = {
  id: 'sql-set-ops',
  name: '집합 연산',
  icon: '⊕',
  description:
    '두 SELECT 결과를 합치거나(UNION), 교집합을 구하거나(INTERSECT), 차집합을 구하는(EXCEPT/MINUS) 연산입니다. 두 쿼리의 컬럼 수와 타입이 일치해야 합니다.',
  subject: 'sql',
  toolsLabel: 'SQL 핵심 키워드',
  patterns: [
    {
      id: 'union',
      name: 'UNION / UNION ALL',
      description:
        '두 SELECT 결과를 세로로 합칩니다. UNION은 중복을 제거하고, UNION ALL은 중복을 포함합니다. 중복 제거가 필요 없다면 UNION ALL이 더 빠릅니다.',
      timeComplexity: 'UNION: O(n log n) - 중복 제거 정렬 포함, UNION ALL: O(n)',
      spaceComplexity: 'O(n + m)',
      keyInsight:
        'UNION은 중복 제거를 위해 정렬 또는 해시를 수행하므로 UNION ALL보다 느립니다. 중복이 없거나 중복을 포함해도 괜찮다면 항상 UNION ALL을 사용하세요. ORDER BY는 마지막 SELECT 뒤에 한 번만 씁니다.',
      tools: [
        {
          name: 'UNION',
          description: '두 결과를 합치고 중복 행을 제거합니다.',
          import: '집합 연산',
        },
        {
          name: 'UNION ALL',
          description: '두 결과를 합치며 중복을 포함합니다. UNION보다 빠릅니다.',
          import: '집합 연산',
        },
      ],
      codeExamples: [
        {
          title: 'UNION으로 결과 합치기',
          code: `-- 직원과 계약직 이름을 하나의 목록으로
SELECT name, 'employee' AS type FROM employees
UNION ALL
SELECT name, 'contractor' AS type FROM contractors
ORDER BY name;

-- 두 테이블의 공통 컬럼 합산 (UNION ALL로 빠르게)
SELECT product_id, sale_amount FROM online_sales
UNION ALL
SELECT product_id, sale_amount FROM offline_sales;

-- 중복 제거가 필요한 경우
SELECT email FROM newsletter_subscribers
UNION
SELECT email FROM app_users;  -- 양쪽 모두 있는 이메일 한 번만 출력`,
          explanation:
            'UNION ALL은 중복 제거 없이 단순 합치기라 성능이 좋습니다. 중복이 실제로 없는 상황(다른 테이블, 다른 날짜 범위)에서는 항상 UNION ALL을 사용하세요.',
        },
      ],
      commonProblems: [
        { name: 'Employees with Missing Information', platform: 'leetcode', id: '1965', slug: 'employees-with-missing-information', difficulty: 'Easy' },
      ],
      tips: [
        'UNION 결과의 컬럼명은 첫 번째 SELECT의 컬럼명을 사용합니다',
        'ORDER BY는 마지막 SELECT 다음에 한 번만 씁니다',
        '중복 제거가 불필요한 상황에서 UNION 대신 UNION ALL을 쓰면 성능이 크게 향상될 수 있습니다',
      ],
    },
    {
      id: 'intersect-except',
      name: 'INTERSECT / EXCEPT',
      description:
        '교집합(INTERSECT)과 차집합(EXCEPT/MINUS)을 구합니다. MySQL 8.0 미만에서는 지원하지 않으므로 JOIN이나 EXISTS로 대체합니다.',
      timeComplexity: 'O(n log n)',
      spaceComplexity: 'O(n + m)',
      keyInsight:
        'INTERSECT는 양쪽 모두에 있는 행, EXCEPT는 왼쪽에만 있는 행을 반환합니다. MySQL 8.0 미만에서는 INTERSECT를 INNER JOIN으로, EXCEPT를 LEFT JOIN ... WHERE IS NULL 패턴으로 대체합니다.',
      tools: [
        {
          name: 'INTERSECT',
          description: '두 결과의 교집합(양쪽 모두 존재하는 행)을 반환합니다.',
          import: '집합 연산',
        },
        {
          name: 'EXCEPT / MINUS',
          description: '첫 번째 결과에서 두 번째 결과를 뺀 차집합을 반환합니다. Oracle은 MINUS.',
          import: '집합 연산',
        },
      ],
      codeExamples: [
        {
          title: 'INTERSECT와 EXCEPT (+ MySQL 대안)',
          code: `-- INTERSECT: 두 테이블 모두에 있는 이메일
SELECT email FROM table_a
INTERSECT
SELECT email FROM table_b;

-- MySQL 대안 (INNER JOIN)
SELECT DISTINCT a.email
FROM table_a a
JOIN table_b b ON a.email = b.email;

-- EXCEPT: table_a에만 있는 이메일 (차집합)
SELECT email FROM table_a
EXCEPT
SELECT email FROM table_b;

-- MySQL 대안 (LEFT JOIN + IS NULL)
SELECT a.email
FROM table_a a
LEFT JOIN table_b b ON a.email = b.email
WHERE b.email IS NULL;`,
          explanation:
            'MySQL 8.0 미만에서는 INTERSECT/EXCEPT를 JOIN으로 대체해야 합니다. EXCEPT는 LEFT JOIN + IS NULL 패턴이 가장 일반적인 대안입니다.',
        },
      ],
      commonProblems: [
        { name: 'Customers Who Never Order', platform: 'leetcode', id: '183', slug: 'customers-who-never-order', difficulty: 'Easy' },
      ],
      tips: [
        'MySQL 8.0부터 INTERSECT와 EXCEPT를 지원합니다',
        'Oracle은 EXCEPT 대신 MINUS를 사용합니다',
        '호환성을 위해 LEFT JOIN + IS NULL 패턴이 더 널리 사용됩니다',
      ],
    },
  ],
}
