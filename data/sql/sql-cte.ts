import type { Category } from '../../types/algorithm'

export const sqlCte: Category = {
  id: 'sql-cte',
  name: 'CTE',
  icon: '📋',
  description:
    'WITH 절로 정의하는 임시 결과 집합입니다. 복잡한 쿼리를 단계별로 분리해 가독성을 높이고, 같은 서브쿼리를 여러 번 참조할 때 유용합니다. 재귀 CTE로 계층 구조도 처리할 수 있습니다.',
  subject: 'sql',
  toolsLabel: 'SQL 핵심 키워드',
  patterns: [
    {
      id: 'cte-basic',
      name: 'CTE 기본 (WITH 절)',
      description:
        'WITH 절로 이름 있는 임시 테이블을 정의합니다. 서브쿼리를 이름으로 분리하여 쿼리를 모듈화하고, 같은 서브쿼리를 여러 번 재사용할 수 있습니다.',
      timeComplexity: '서브쿼리와 동일 (최적화기 판단에 따라 인라인 처리됨)',
      spaceComplexity: 'O(k) - CTE 결과 크기',
      keyInsight:
        'CTE는 가독성을 위한 도구입니다. 복잡한 서브쿼리를 의미 있는 이름으로 분리하여 단계적으로 쿼리를 읽을 수 있게 합니다. 대부분의 옵티마이저는 CTE를 인라인으로 처리하므로 성능은 서브쿼리와 유사합니다.',
      tools: [
        {
          name: 'WITH cte_name AS (SELECT ...)',
          description: 'CTE를 정의합니다. 콤마로 여러 개를 연속 정의할 수 있습니다.',
          import: 'CTE',
        },
        {
          name: '다중 CTE',
          description: 'WITH cte1 AS (...), cte2 AS (...) 형태로 여러 CTE를 순차 정의합니다.',
          import: 'CTE',
        },
      ],
      codeExamples: [
        {
          title: 'CTE로 쿼리 모듈화',
          code: `-- 단일 CTE: 부서별 평균 급여 계산 후 재사용
WITH dept_avg AS (
  SELECT department, AVG(salary) AS avg_sal
  FROM employees
  GROUP BY department
)
SELECT e.name, e.salary, d.avg_sal,
       e.salary - d.avg_sal AS diff_from_avg
FROM employees e
JOIN dept_avg d ON e.department = d.department;

-- 다중 CTE: 단계적 처리
WITH
  high_salary AS (
    SELECT * FROM employees WHERE salary > 7000
  ),
  it_dept AS (
    SELECT * FROM high_salary WHERE department = 'IT'
  )
SELECT name, salary FROM it_dept ORDER BY salary DESC;`,
          explanation:
            '동일한 서브쿼리를 여러 번 쓰는 대신 CTE로 한 번 정의하고 이름으로 참조합니다. 다중 CTE는 앞서 정의된 CTE를 뒤에서 참조할 수 있습니다.',
        },
      ],
      commonProblems: [
        { name: 'Department Top Three Salaries', platform: 'leetcode', id: '185', slug: 'department-top-three-salaries', difficulty: 'Hard' },
        { name: 'Game Play Analysis IV', platform: 'leetcode', id: '550', slug: 'game-play-analysis-iv', difficulty: 'Medium' },
      ],
      tips: [
        'CTE는 정의된 쿼리 내에서만 유효합니다. 다음 쿼리에서는 사라집니다',
        'MySQL 8.0+, PostgreSQL, SQL Server, SQLite 3.35+ 등 대부분의 최신 DB에서 지원됩니다',
        '깊이 중첩된 서브쿼리는 CTE로 풀어 쓰면 훨씬 읽기 쉬워집니다',
      ],
    },
    {
      id: 'recursive-cte',
      name: '재귀 CTE',
      description:
        '자기 자신을 참조하는 CTE입니다. 조직도, 폴더 구조, 경로 탐색 등 계층 데이터를 SQL에서 처리할 때 사용합니다. UNION ALL로 기저(base)와 재귀(recursive) 부분을 결합합니다.',
      timeComplexity: 'O(n) - 트리/그래프 노드 수에 비례',
      spaceComplexity: 'O(d) - d: 최대 깊이',
      keyInsight:
        '재귀 CTE의 구조: (1) 기저 케이스(초기 행) UNION ALL (2) 재귀 케이스(이전 결과를 참조해 새 행 생성). MAX_RECURSION 설정으로 무한 루프를 방지합니다. 계층 깊이를 추적하는 level 컬럼을 함께 계산하면 편리합니다.',
      tools: [
        {
          name: 'WITH RECURSIVE cte AS (...)',
          description: '재귀 CTE 선언입니다. UNION ALL로 기저와 재귀를 결합합니다.',
          import: '재귀 CTE',
        },
        {
          name: 'UNION ALL',
          description: '기저 쿼리와 재귀 쿼리를 결합합니다. UNION(중복 제거)이 아닌 ALL을 씁니다.',
          import: '재귀 CTE',
        },
      ],
      codeExamples: [
        {
          title: '재귀 CTE로 계층 구조 조회',
          code: `-- 직원 조직도: 특정 관리자의 모든 하위 직원
WITH RECURSIVE org_tree AS (
  -- 기저 케이스: 루트 직원
  SELECT id, name, manager_id, 0 AS level
  FROM employees
  WHERE manager_id IS NULL

  UNION ALL

  -- 재귀 케이스: 이전 결과의 직속 부하
  SELECT e.id, e.name, e.manager_id, ot.level + 1
  FROM employees e
  JOIN org_tree ot ON e.manager_id = ot.id
)
SELECT id, name, level,
       CONCAT(REPEAT('  ', level), name) AS indented_name
FROM org_tree
ORDER BY level, name;

-- 1~10 연속 숫자 생성
WITH RECURSIVE nums AS (
  SELECT 1 AS n
  UNION ALL
  SELECT n + 1 FROM nums WHERE n < 10
)
SELECT n FROM nums;`,
          explanation:
            '기저 케이스에서 시작해, 재귀 케이스가 이전 CTE 결과에 새 행을 추가합니다. 종료 조건(WHERE n < 10, 또는 JOIN이 더 이상 행을 반환하지 않을 때)이 없으면 무한 루프가 됩니다.',
        },
      ],
      commonProblems: [
        { name: 'Find the Quiet Students in All Exams', platform: 'leetcode', id: '1412', slug: 'find-the-quiet-students-in-all-exams', difficulty: 'Hard' },
        { name: 'The Number of Seniors and Juniors to Join the Company', platform: 'leetcode', id: '2010', slug: 'the-number-of-seniors-and-juniors-to-join-the-company', difficulty: 'Hard' },
      ],
      tips: [
        'MySQL에서는 재귀 깊이 기본값이 1000입니다. SET max_recursion_depth로 조절할 수 있습니다',
        '순환 참조(사이클)가 있는 데이터에서는 무한 루프가 발생합니다. 방문한 노드를 추적하는 visited 컬럼을 추가하세요',
        '단순 연속 숫자/날짜 생성에도 재귀 CTE가 유용합니다',
      ],
    },
  ],
}
