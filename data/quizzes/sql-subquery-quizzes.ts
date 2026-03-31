import type { QuizQuestion } from '../../types/quiz'

export const sqlSubqueryQuizzes: Record<string, QuizQuestion[]> = {
  'scalar-subquery': [
    {
      id: 'sql-sub-scalar-q1',
      type: 'output-prediction',
      question: '스칼라 서브쿼리가 2개 이상의 행을 반환하면 어떻게 되는가?',
      options: ['첫 번째 행만 사용', '마지막 행만 사용', '에러 발생', 'NULL 반환'],
      answer: '에러 발생',
      explanation: '스칼라 서브쿼리는 반드시 1행 1열의 단일 값을 반환해야 합니다. 2개 이상의 행을 반환하면 런타임 에러가 발생합니다.',
    },
    {
      id: 'sql-sub-scalar-q2',
      type: 'output-prediction',
      question: '스칼라 서브쿼리가 0개의 행을 반환하면 결과는?',
      options: ['에러 발생', '0 반환', 'NULL 반환', '빈 문자열 반환'],
      answer: 'NULL 반환',
      explanation: '스칼라 서브쿼리가 결과를 반환하지 않으면(0행) NULL로 처리됩니다. 에러가 발생하지 않으므로 주의가 필요합니다.',
    },
    {
      id: 'sql-sub-scalar-q3',
      type: 'fill-blank',
      question: '스칼라 서브쿼리는 반드시 ___행 ___열의 결과를 반환해야 한다.',
      answer: '1행 1열',
      explanation: '스칼라 서브쿼리는 단일 값(1행 1열)을 반환하는 서브쿼리입니다. SELECT 절, WHERE 절 등에서 하나의 값처럼 사용됩니다.',
    },
  ],
  'in-exists-subquery': [
    {
      id: 'sql-sub-in-q1',
      type: 'output-prediction',
      question: 'WHERE id NOT IN (1, 2, NULL)의 결과는?',
      options: ['id가 1, 2가 아닌 행', '모든 행', '빈 결과', 'NULL인 행만'],
      answer: '빈 결과',
      explanation: 'NOT IN 리스트에 NULL이 포함되면 결과가 항상 빈 집합입니다. id <> 1 AND id <> 2 AND id <> NULL에서 마지막 조건이 항상 UNKNOWN이 되기 때문입니다.',
    },
    {
      id: 'sql-sub-in-q2',
      type: 'complexity-match',
      question: 'NOT IN + NULL 함정을 피하려면 어떤 대안을 사용해야 하는가?',
      options: [
        'NOT IN을 그대로 사용',
        'NOT EXISTS 서브쿼리 사용',
        'HAVING 절 사용',
        'UNION ALL 사용',
      ],
      answer: 'NOT EXISTS 서브쿼리 사용',
      explanation: 'NOT EXISTS는 NULL에 영향을 받지 않습니다. 서브쿼리에 NULL이 있어도 행의 존재 여부만 판단하므로 안전합니다.',
    },
    {
      id: 'sql-sub-in-q3',
      type: 'fill-blank',
      question: 'EXISTS는 서브쿼리의 결과가 ___인지만 확인하므로 보통 SELECT 1을 사용한다.',
      answer: '존재하는지(한 건이라도 있는지)',
      explanation: 'EXISTS는 서브쿼리가 하나 이상의 행을 반환하는지만 확인합니다. 반환 값이 아닌 존재 여부만 중요하므로 SELECT 1 또는 SELECT *을 주로 씁니다.',
    },
  ],
  'correlated-subquery': [
    {
      id: 'sql-sub-corr-q1',
      type: 'complexity-match',
      question: '상관 서브쿼리의 특징은?',
      options: [
        '한 번만 실행되고 결과를 캐시함',
        '외부 쿼리의 각 행마다 반복 실행됨',
        '항상 비상관 서브쿼리보다 빠름',
        'JOIN으로 변환할 수 없음',
      ],
      answer: '외부 쿼리의 각 행마다 반복 실행됨',
      explanation: '상관 서브쿼리는 외부 쿼리의 컬럼을 참조하므로 외부 쿼리의 각 행마다 새로 실행됩니다. 행 수가 많으면 성능에 주의해야 합니다.',
    },
    {
      id: 'sql-sub-corr-q2',
      type: 'output-prediction',
      question: '부서별 최고 급여자를 구할 때 상관 서브쿼리와 윈도우 함수 중 성능이 일반적으로 더 좋은 것은?',
      options: ['상관 서브쿼리', '윈도우 함수', '항상 동일', '데이터 크기와 무관'],
      answer: '윈도우 함수',
      explanation: '상관 서브쿼리는 각 행마다 서브쿼리를 실행하지만, 윈도우 함수(ROW_NUMBER, RANK 등)는 한 번의 스캔으로 처리하므로 대부분 더 효율적입니다.',
    },
  ],
}
