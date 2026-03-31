import type { QuizQuestion } from '../../types/quiz'

export const sqlSetOpsQuizzes: Record<string, QuizQuestion[]> = {
  'union': [
    {
      id: 'sql-union-q1',
      type: 'output-prediction',
      question: '다음 쿼리의 결과 행 수는?\n\nSELECT 1 UNION ALL SELECT 1 UNION ALL SELECT 2;',
      options: ['2행', '3행', '1행', '에러 발생'],
      answer: '3행',
      explanation: 'UNION ALL은 중복을 제거하지 않고 모든 행을 합칩니다. 1, 1, 2 총 3행이 반환됩니다.',
    },
    {
      id: 'sql-union-q2',
      type: 'output-prediction',
      question: '다음 쿼리의 결과 행 수는?\n\nSELECT 1 UNION SELECT 1 UNION SELECT 2;',
      options: ['2행', '3행', '1행', '에러 발생'],
      answer: '2행',
      explanation: 'UNION은 중복을 제거합니다. 1이 두 번 나오지만 하나로 합쳐져 1, 2 총 2행이 반환됩니다.',
    },
    {
      id: 'sql-union-q3',
      type: 'complexity-match',
      question: 'UNION ALL이 UNION보다 성능이 좋은 이유는?',
      options: ['인덱스를 더 잘 활용해서', '중복 제거를 위한 정렬/해싱이 없어서', '병렬 처리가 가능해서', '메모리를 적게 사용해서'],
      answer: '중복 제거를 위한 정렬/해싱이 없어서',
      explanation: 'UNION은 중복을 제거하기 위해 내부적으로 정렬이나 해싱을 수행합니다. UNION ALL은 이 과정이 없으므로 데이터가 크면 성능 차이가 큽니다. 중복이 없다고 확신할 때는 UNION ALL을 사용하는 것이 좋습니다.',
    },
  ],
  'intersect-except': [
    {
      id: 'sql-intersect-q1',
      type: 'fill-blank',
      question: 'MySQL에서 INTERSECT와 EXCEPT는 버전 ___ 이상부터 지원된다.',
      answer: '8.0.31',
      explanation: 'MySQL은 8.0.31 버전부터 INTERSECT와 EXCEPT를 공식 지원합니다. 이전 버전에서는 JOIN이나 서브쿼리, NOT IN 등으로 대체해야 합니다.',
    },
    {
      id: 'sql-intersect-q2',
      type: 'output-prediction',
      question: '다음 쿼리의 결과는?\n\n(SELECT 1 UNION ALL SELECT 2 UNION ALL SELECT 3)\nEXCEPT\n(SELECT 2 UNION ALL SELECT 4);',
      options: ['1, 3', '1, 2, 3', '2', '1, 3, 4'],
      answer: '1, 3',
      explanation: 'EXCEPT는 첫 번째 결과에서 두 번째 결과에 존재하는 행을 제외합니다. {1, 2, 3}에서 {2, 4}를 빼면 {1, 3}이 남습니다.',
    },
    {
      id: 'sql-intersect-q3',
      type: 'output-prediction',
      question: '집합 연산 쿼리에서 ORDER BY를 적용하려면 어디에 작성해야 하는가?\n\n(SELECT a FROM t1)\nUNION\n(SELECT a FROM t2)\nORDER BY a;',
      options: ['각 SELECT문 뒤에', '전체 쿼리 맨 마지막에', '첫 번째 SELECT문 뒤에만', 'UNION 키워드 앞에'],
      answer: '전체 쿼리 맨 마지막에',
      explanation: '집합 연산에서 ORDER BY는 최종 결과에 대해 한 번만 적용하며, 전체 쿼리의 맨 마지막에 작성합니다. 개별 SELECT문에 ORDER BY를 넣으면 에러가 발생하거나 무시됩니다.',
    },
  ],
}
