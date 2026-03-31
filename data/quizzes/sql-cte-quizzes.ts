import type { QuizQuestion } from '../../types/quiz'

export const sqlCteQuizzes: Record<string, QuizQuestion[]> = {
  'cte-basic': [
    {
      id: 'sql-cte-basic-q1',
      type: 'output-prediction',
      question: '다음 쿼리의 결과는?\n\nWITH cte AS (SELECT 1 AS num)\nSELECT * FROM cte;\nSELECT * FROM cte;',
      options: ['두 SELECT 모두 1을 반환', '첫 번째만 1을 반환, 두 번째는 에러', '두 SELECT 모두 에러', '두 번째만 1을 반환'],
      answer: '첫 번째만 1을 반환, 두 번째는 에러',
      explanation: 'CTE는 정의된 하나의 SQL문 내에서만 유효합니다. 첫 번째 SELECT에서 CTE가 소비되므로, 두 번째 SELECT에서는 cte를 참조할 수 없어 에러가 발생합니다.',
    },
    {
      id: 'sql-cte-basic-q2',
      type: 'fill-blank',
      question: 'CTE는 _____ 키워드를 사용하여 정의하며, 하나의 SQL문 내에서만 유효하다.',
      answer: 'WITH',
      explanation: 'CTE(Common Table Expression)는 WITH 키워드로 시작하여 임시 결과 집합을 정의합니다.',
    },
    {
      id: 'sql-cte-basic-q3',
      type: 'output-prediction',
      question: '다음 쿼리에서 CTE를 두 번 참조할 수 있는가?\n\nWITH cte AS (SELECT 1 AS val)\nSELECT a.val, b.val FROM cte a, cte b;',
      options: ['가능하다, 결과는 (1, 1)', '불가능하다, 에러 발생', '가능하지만 NULL 반환', '가능하지만 첫 번째만 반환'],
      answer: '가능하다, 결과는 (1, 1)',
      explanation: '같은 SQL문 내에서는 CTE를 여러 번 참조할 수 있습니다. 서브쿼리와 달리 CTE는 한 번 정의하고 여러 번 재사용이 가능합니다.',
    },
  ],
  'recursive-cte': [
    {
      id: 'sql-cte-recursive-q1',
      type: 'output-prediction',
      question: '다음 재귀 CTE의 결과 행 수는?\n\nWITH RECURSIVE cnt AS (\n  SELECT 1 AS n\n  UNION ALL\n  SELECT n + 1 FROM cnt WHERE n < 5\n)\nSELECT * FROM cnt;',
      options: ['4행', '5행', '6행', '무한 루프'],
      answer: '5행',
      explanation: '기저 조건에서 n=1로 시작하고, n < 5인 동안 n+1을 추가합니다. n이 1, 2, 3, 4, 5까지 생성되어 총 5행이 반환됩니다.',
    },
    {
      id: 'sql-cte-recursive-q2',
      type: 'complexity-match',
      question: '재귀 CTE에서 UNION ALL 대신 UNION을 사용하면 어떤 차이가 있는가?',
      options: ['차이 없음', '중복 행이 제거됨', '성능이 더 좋아짐', '재귀가 동작하지 않음'],
      answer: '중복 행이 제거됨',
      explanation: 'UNION은 중복을 제거하고 UNION ALL은 모든 행을 포함합니다. 재귀 CTE에서 UNION을 쓰면 이미 나온 값이 다시 나오면 재귀가 멈추므로, 그래프 순회 시 무한 루프 방지에 활용할 수 있습니다.',
    },
    {
      id: 'sql-cte-recursive-q3',
      type: 'fill-blank',
      question: '재귀 CTE는 반드시 _____ 부분(초기값)과 재귀 부분으로 구성되어야 한다.',
      answer: '기저(앵커)',
      explanation: '재귀 CTE는 기저(앵커) 멤버가 초기 결과 집합을 만들고, 재귀 멤버가 이전 결과를 참조하여 반복적으로 행을 추가하는 구조입니다.',
    },
  ],
}
