import type { Category } from '../../types/algorithm'

export const sqlWindow: Category = {
  id: 'sql-window',
  name: '윈도우 함수',
  icon: '🪟',
  description:
    '그룹화 없이 행 간 순위, 누적합, 이전/이후 값 등을 계산합니다. GROUP BY와 달리 원본 행을 유지한 채 각 행에 집계 값을 추가로 부여합니다. OVER() 절로 적용 범위(파티션, 정렬)를 지정합니다.',
  subject: 'sql',
  toolsLabel: 'SQL 핵심 함수',
  patterns: [
    {
      id: 'rank-functions',
      name: 'RANK / DENSE_RANK / ROW_NUMBER',
      description:
        '행에 순위를 부여합니다. ROW_NUMBER는 고유 번호, RANK는 동점 시 순위 건너뜀, DENSE_RANK는 동점 시 순위를 건너뛰지 않습니다.',
      timeComplexity: 'O(n log n) - 정렬 포함',
      spaceComplexity: 'O(n)',
      keyInsight:
        'RANK vs DENSE_RANK: 점수가 [100, 100, 90]일 때 RANK는 [1, 1, 3], DENSE_RANK는 [1, 1, 2]를 반환합니다. ROW_NUMBER는 동점 구분 없이 항상 고유한 번호를 부여합니다. PARTITION BY로 그룹 내 순위를 매길 수 있습니다.',
      tools: [
        {
          name: 'ROW_NUMBER() OVER (...)',
          description: '파티션 내에서 고유한 순번을 부여합니다. 동점 무관 항상 다른 번호입니다.',
          import: '순위 함수',
        },
        {
          name: 'RANK() OVER (...)',
          description: '동점 시 같은 순위를 부여하고 다음 순위를 건너뜁니다. (1,1,3)',
          import: '순위 함수',
        },
        {
          name: 'DENSE_RANK() OVER (...)',
          description: '동점 시 같은 순위를 부여하지만 다음 순위를 건너뛰지 않습니다. (1,1,2)',
          import: '순위 함수',
        },
      ],
      codeExamples: [
        {
          title: '순위 함수 비교',
          code: `-- 전체 급여 순위 비교
SELECT name, salary,
       ROW_NUMBER() OVER (ORDER BY salary DESC) AS row_num,
       RANK()       OVER (ORDER BY salary DESC) AS rank_num,
       DENSE_RANK() OVER (ORDER BY salary DESC) AS dense_rank
FROM employees;

-- 부서별 급여 순위 (PARTITION BY)
SELECT name, department, salary,
       DENSE_RANK() OVER (
         PARTITION BY department
         ORDER BY salary DESC
       ) AS dept_rank
FROM employees;

-- 부서별 급여 2위까지 조회 (Top-N per group)
SELECT name, department, salary, dept_rank
FROM (
  SELECT name, department, salary,
         DENSE_RANK() OVER (
           PARTITION BY department ORDER BY salary DESC
         ) AS dept_rank
  FROM employees
) ranked
WHERE dept_rank <= 2;`,
          explanation:
            'PARTITION BY는 GROUP BY처럼 그룹을 나누지만 행을 합치지 않습니다. Top-N per group 패턴은 서브쿼리에서 순위를 계산하고 외부 쿼리에서 필터링합니다.',
        },
      ],
      commonProblems: [
        { name: 'Rank Scores', platform: 'leetcode', id: '178', slug: 'rank-scores', difficulty: 'Medium' },
        { name: 'Department Top Three Salaries', platform: 'leetcode', id: '185', slug: 'department-top-three-salaries', difficulty: 'Hard' },
        { name: 'Nth Highest Salary', platform: 'leetcode', id: '177', slug: 'nth-highest-salary', difficulty: 'Medium' },
      ],
      tips: [
        'WHERE 절에서 윈도우 함수를 직접 필터링할 수 없습니다. 서브쿼리나 CTE로 감싸서 사용하세요',
        'PARTITION BY를 생략하면 전체 결과를 하나의 파티션으로 처리합니다',
        '실행 순서: FROM → WHERE → GROUP BY → HAVING → 윈도우 함수 → SELECT → ORDER BY',
      ],
    },
    {
      id: 'lag-lead',
      name: 'LAG / LEAD',
      description:
        '현재 행의 이전 행(LAG) 또는 다음 행(LEAD) 값을 가져옵니다. 이전 대비 변화량, 연속성 분석, 날짜 간격 계산 등에 활용됩니다.',
      timeComplexity: 'O(n log n) - 정렬 포함',
      spaceComplexity: 'O(n)',
      keyInsight:
        'SELF JOIN 없이 이전/다음 행을 참조할 수 있어 훨씬 간결하고 효율적입니다. 세 번째 인수로 이전/다음 행이 없을 때의 기본값을 지정할 수 있습니다.',
      tools: [
        {
          name: 'LAG(col, n, default) OVER (...)',
          description: '파티션 내 n번째 이전 행의 값을 가져옵니다. 기본 n=1.',
          import: '오프셋 함수',
        },
        {
          name: 'LEAD(col, n, default) OVER (...)',
          description: '파티션 내 n번째 다음 행의 값을 가져옵니다. 기본 n=1.',
          import: '오프셋 함수',
        },
      ],
      codeExamples: [
        {
          title: 'LAG/LEAD 이전/다음 행 비교',
          code: `-- 일별 매출과 전날 대비 증감
SELECT order_date, daily_sales,
       LAG(daily_sales) OVER (ORDER BY order_date) AS prev_day_sales,
       daily_sales - LAG(daily_sales, 1, 0) OVER (ORDER BY order_date) AS diff
FROM daily_summary;

-- 사용자별 이전 로그인 날짜
SELECT user_id, login_date,
       LAG(login_date) OVER (
         PARTITION BY user_id
         ORDER BY login_date
       ) AS prev_login
FROM user_logins;

-- 연속 로그인 여부 (전날과의 날짜 차이가 1이면 연속)
SELECT user_id, login_date,
       DATEDIFF(login_date,
         LAG(login_date) OVER (PARTITION BY user_id ORDER BY login_date)
       ) AS days_since_last
FROM user_logins;`,
          explanation:
            'LAG/LEAD 세 번째 인수는 이전/다음 행이 없을 때 반환할 기본값입니다. 기본값 없으면 NULL이 반환됩니다.',
        },
      ],
      commonProblems: [
        { name: 'Rising Temperature', platform: 'leetcode', id: '197', slug: 'rising-temperature', difficulty: 'Easy' },
        { name: 'Human Traffic of Stadium', platform: 'leetcode', id: '601', slug: 'human-traffic-of-stadium', difficulty: 'Hard' },
      ],
      tips: [
        'LAG/LEAD는 SELF JOIN을 대체하여 코드를 훨씬 간결하게 만듭니다',
        '두 번째 인수로 오프셋을 지정할 수 있습니다. LAG(col, 7)는 7행 이전 값입니다',
        '기본값(세 번째 인수)을 지정하지 않으면 파티션 경계에서 NULL이 반환됩니다',
      ],
    },
    {
      id: 'window-aggregate',
      name: '윈도우 집계 (SUM/AVG OVER)',
      description:
        '행을 유지하면서 누적합, 이동평균 등 집계 값을 각 행에 추가합니다. ROWS/RANGE BETWEEN으로 집계 범위(프레임)를 세밀하게 지정할 수 있습니다.',
      timeComplexity: 'O(n log n)',
      spaceComplexity: 'O(n)',
      keyInsight:
        'GROUP BY 집계는 행을 합치지만, 윈도우 집계는 원본 행을 유지합니다. ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW로 누적합을, ROWS BETWEEN 2 PRECEDING AND CURRENT ROW로 이동평균을 구합니다.',
      tools: [
        {
          name: 'SUM(col) OVER (...)',
          description: '파티션/프레임 내 누적합이나 합계를 계산합니다.',
          import: '윈도우 집계',
        },
        {
          name: 'AVG(col) OVER (...)',
          description: '이동평균이나 파티션 평균을 계산합니다.',
          import: '윈도우 집계',
        },
        {
          name: 'ROWS BETWEEN ... AND ...',
          description: '집계 범위(프레임)를 행 단위로 지정합니다.',
          import: '프레임 지정',
        },
      ],
      codeExamples: [
        {
          title: '누적합과 이동평균',
          code: `-- 날짜별 누적 매출
SELECT order_date, amount,
       SUM(amount) OVER (ORDER BY order_date
         ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW
       ) AS running_total
FROM daily_sales;

-- 3일 이동평균
SELECT order_date, amount,
       AVG(amount) OVER (ORDER BY order_date
         ROWS BETWEEN 2 PRECEDING AND CURRENT ROW
       ) AS moving_avg_3
FROM daily_sales;

-- 부서별 급여 비율
SELECT name, department, salary,
       ROUND(salary * 100.0 /
         SUM(salary) OVER (PARTITION BY department), 2) AS pct_of_dept
FROM employees;`,
          explanation:
            'ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW는 첫 행부터 현재 행까지 누적합니다. ROWS BETWEEN 2 PRECEDING AND CURRENT ROW는 현재 행 포함 최근 3행을 집계합니다.',
        },
      ],
      commonProblems: [
        { name: 'Restaurant Growth', platform: 'leetcode', id: '1321', slug: 'restaurant-growth', difficulty: 'Medium' },
        { name: 'Trips and Users', platform: 'leetcode', id: '262', slug: 'trips-and-users', difficulty: 'Hard' },
        { name: 'Last Person to Fit in the Bus', platform: 'leetcode', id: '1204', slug: 'last-person-to-fit-in-the-bus', difficulty: 'Medium' },
      ],
      tips: [
        'ORDER BY 없이 OVER()만 쓰면 전체 파티션에 대한 집계가 각 행에 반복됩니다',
        'ROWS BETWEEN은 물리적 행 수 기준이라 예측 가능합니다. RANGE BETWEEN은 같은 ORDER BY 값을 가진 행을 모두 포함하므로 중복 날짜/값이 있을 때 의도치 않은 결과가 나올 수 있습니다. 누적합에는 ROWS BETWEEN이 더 안전합니다.',
        '윈도우 함수는 WHERE, GROUP BY, HAVING 이후에 실행됩니다',
      ],
    },
    {
      id: 'first-last-ntile',
      name: 'FIRST_VALUE / LAST_VALUE / NTILE',
      description:
        '파티션 내 첫 번째/마지막 값을 가져오거나(FIRST_VALUE/LAST_VALUE), 전체 행을 N등분하거나(NTILE), 백분위 순위를 구합니다(PERCENT_RANK/CUME_DIST).',
      timeComplexity: 'O(n log n) - 정렬 포함',
      spaceComplexity: 'O(n)',
      keyInsight:
        'LAST_VALUE는 기본 프레임(UNBOUNDED PRECEDING ~ CURRENT ROW)에서 현재 행 값을 반환합니다. 파티션의 실제 마지막 값을 얻으려면 반드시 ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING을 명시해야 합니다.',
      tools: [
        {
          name: 'FIRST_VALUE(col) OVER (...)',
          description: '파티션 내 첫 번째 행의 값을 반환합니다.',
          import: '값 참조 함수',
        },
        {
          name: 'LAST_VALUE(col) OVER (... ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING)',
          description: '파티션 내 마지막 행의 값을 반환합니다. 프레임 명시 필수입니다.',
          import: '값 참조 함수',
        },
        {
          name: 'NTILE(n) OVER (...)',
          description: '파티션을 n개 버킷으로 균등 분할하고 버킷 번호를 반환합니다.',
          import: '분위 함수',
        },
        {
          name: 'PERCENT_RANK() OVER (...)',
          description: '(rank - 1) / (total rows - 1)로 계산한 0~1 사이의 백분위 순위를 반환합니다.',
          import: '분위 함수',
        },
        {
          name: 'CUME_DIST() OVER (...)',
          description: '현재 값 이하인 행의 비율(누적 분포)을 반환합니다.',
          import: '분위 함수',
        },
      ],
      codeExamples: [
        {
          title: 'FIRST_VALUE / LAST_VALUE / NTILE',
          code: `-- 각 부서에서 가장 먼저 입사한 직원 이름
SELECT name, department, hire_date,
       FIRST_VALUE(name) OVER (
         PARTITION BY department
         ORDER BY hire_date
       ) AS first_hired
FROM employees;

-- 각 부서에서 가장 최근 입사한 직원 이름
-- LAST_VALUE는 프레임을 명시해야 올바른 결과를 반환!
SELECT name, department, hire_date,
       LAST_VALUE(name) OVER (
         PARTITION BY department
         ORDER BY hire_date
         ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING
       ) AS last_hired
FROM employees;

-- 급여를 4분위(Q1~Q4)로 나누기
SELECT name, salary,
       NTILE(4) OVER (ORDER BY salary) AS salary_quartile
FROM employees;

-- 백분위 순위 (상위 몇 %?)
SELECT name, salary,
       ROUND(PERCENT_RANK() OVER (ORDER BY salary) * 100, 1) AS percentile
FROM employees;`,
          explanation:
            'LAST_VALUE는 기본 프레임이 CURRENT ROW까지이므로 항상 현재 행 값을 반환합니다. 파티션의 마지막 값을 얻으려면 ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING을 반드시 추가하세요.',
        },
      ],
      commonProblems: [
        { name: 'Median Employee Salary', platform: 'leetcode', id: '569', slug: 'median-employee-salary', difficulty: 'Hard' },
      ],
      tips: [
        'LAST_VALUE()는 ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING 프레임을 명시하지 않으면 항상 현재 행 값을 반환하는 함정이 있습니다',
        'NTILE(n)에서 행 수가 n으로 나누어 떨어지지 않으면 앞 버킷이 1개씩 더 많아집니다',
        'PERCENT_RANK()는 0부터 시작하고 최솟값이 0, 최댓값이 1입니다. CUME_DIST()는 최솟값도 0보다 큽니다',
      ],
    },
  ],
}
