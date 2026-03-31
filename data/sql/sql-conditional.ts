import type { Category } from '../../types/algorithm'

export const sqlConditional: Category = {
  id: 'sql-conditional',
  name: '조건부 표현식',
  icon: '🔀',
  description:
    '쿼리 결과에서 조건에 따라 다른 값을 반환합니다. CASE WHEN은 if-else를 SQL로 표현하며, COALESCE/IFNULL은 NULL 처리에 활용됩니다. SELECT, WHERE, ORDER BY, GROUP BY 어디서든 사용할 수 있습니다.',
  subject: 'sql',
  toolsLabel: 'SQL 핵심 키워드',
  patterns: [
    {
      id: 'case-when',
      name: 'CASE WHEN',
      description:
        '조건에 따라 다른 값을 반환하는 SQL의 if-else 표현식입니다. 두 가지 형태가 있습니다: 검색형(CASE WHEN cond THEN val)과 단순형(CASE col WHEN val THEN result).',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(n)',
      keyInsight:
        'CASE WHEN은 SELECT, WHERE, ORDER BY, GROUP BY, 집계 함수 내부 등 거의 모든 곳에 쓸 수 있습니다. 조건 순서가 중요합니다: 첫 번째로 TRUE인 조건이 실행됩니다.',
      tools: [
        {
          name: 'CASE WHEN ... THEN ... ELSE ... END',
          description: '조건(검색형): 각 WHEN에 임의 조건을 씁니다.',
          import: '조건부 표현식',
        },
        {
          name: 'CASE col WHEN val THEN ... END',
          description: '단순형: 특정 컬럼의 값별로 분기합니다.',
          import: '조건부 표현식',
        },
      ],
      codeExamples: [
        {
          title: 'CASE WHEN 다양한 활용',
          code: `-- 급여 등급 분류
SELECT name, salary,
       CASE
         WHEN salary >= 10000 THEN 'Senior'
         WHEN salary >= 6000  THEN 'Mid'
         ELSE 'Junior'
       END AS grade
FROM employees;

-- CASE로 피벗 (행을 열로 변환)
SELECT department,
       SUM(CASE WHEN gender = 'M' THEN 1 ELSE 0 END) AS male_count,
       SUM(CASE WHEN gender = 'F' THEN 1 ELSE 0 END) AS female_count
FROM employees
GROUP BY department;

-- ORDER BY에서 커스텀 정렬
SELECT name, status
FROM tasks
ORDER BY CASE status
  WHEN 'urgent' THEN 1
  WHEN 'normal' THEN 2
  ELSE 3
END;`,
          explanation:
            'SUM(CASE WHEN 조건 THEN 1 ELSE 0 END) 패턴으로 조건별 COUNT를 한 쿼리에서 계산할 수 있습니다. 피벗 쿼리의 핵심 패턴입니다.',
        },
      ],
      commonProblems: [
        { name: 'Triangle Judgement', platform: 'leetcode', id: '610', slug: 'triangle-judgement', difficulty: 'Easy' },
        { name: 'Swap Salary', platform: 'leetcode', id: '627', slug: 'swap-salary', difficulty: 'Easy' },
        { name: 'Calculate Special Bonus', platform: 'leetcode', id: '1873', slug: 'calculate-special-bonus', difficulty: 'Easy' },
        { name: 'Reformat Department Table', platform: 'leetcode', id: '1179', slug: 'reformat-department-table', difficulty: 'Easy' },
      ],
      tips: [
        'ELSE 절을 생략하면 어떤 조건도 만족하지 않을 때 NULL이 반환됩니다',
        'CASE 내 집계 함수(SUM(CASE WHEN ...))는 조건별 집계를 한 번에 처리하는 강력한 패턴입니다',
        '조건 순서에 주의하세요. 범위가 좁은 조건(더 구체적인 조건)을 먼저 배치하세요',
      ],
    },
    {
      id: 'coalesce-nullif',
      name: 'COALESCE & NULLIF',
      description:
        'COALESCE는 여러 인수 중 첫 번째 non-NULL 값을 반환합니다. NULLIF는 두 값이 같으면 NULL을 반환합니다. NULL 처리와 0 나누기 방지에 활용합니다.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
      keyInsight:
        'COALESCE(a, b, c)는 a가 NULL이면 b, b도 NULL이면 c를 반환합니다. NULLIF(a, b)는 a=b일 때 NULL, 아니면 a를 반환합니다. NULLIF(col, 0)로 0을 NULL로 바꿔 0 나누기를 방지할 수 있습니다.',
      tools: [
        {
          name: 'COALESCE(v1, v2, ...)',
          description: '첫 번째 non-NULL 값을 반환합니다. 여러 fallback 값을 순서대로 지정합니다.',
          import: '조건부 표현식',
        },
        {
          name: 'NULLIF(expr1, expr2)',
          description: 'expr1 = expr2이면 NULL, 아니면 expr1을 반환합니다.',
          import: '조건부 표현식',
        },
        {
          name: 'IFNULL(expr, default)',
          description: 'expr이 NULL이면 default를 반환합니다. MySQL/SQLite 전용.',
          import: '조건부 표현식',
        },
      ],
      codeExamples: [
        {
          title: 'COALESCE와 NULLIF',
          code: `-- NULL을 기본값으로 대체
SELECT name,
       COALESCE(nickname, name) AS display_name,
       COALESCE(phone, mobile, 'N/A') AS contact
FROM users;

-- 0 나누기 방지 (NULLIF로 분모 0을 NULL로 변환)
SELECT product_id,
       total_revenue / NULLIF(total_units, 0) AS avg_price
FROM sales_summary;

-- NULLIF로 빈 문자열을 NULL로 처리
SELECT COALESCE(NULLIF(TRIM(address), ''), '주소 미입력') AS address
FROM customers;`,
          explanation:
            'COALESCE(NULLIF(val, 0), default) 패턴으로 0과 NULL 모두를 기본값으로 대체할 수 있습니다. 0 나누기 에러 방지에 자주 활용됩니다.',
        },
      ],
      commonProblems: [
        { name: 'Find Customer Referee', platform: 'leetcode', id: '584', slug: 'find-customer-referee', difficulty: 'Easy' },
      ],
      tips: [
        'COALESCE는 표준 SQL이므로 모든 DB에서 사용 가능합니다. IFNULL은 MySQL/SQLite 전용입니다',
        'NVL(Oracle), ISNULL(SQL Server)도 COALESCE의 방언입니다',
        'NULLIF(val, 0)은 0을 NULL로 바꾸므로, 이후 집계(AVG, SUM)에서 0이 제외됩니다',
      ],
    },
  ],
}
