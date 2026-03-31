import type { QuizQuestion } from '../../types/quiz'

export const sqlAggregateQuizzes: Record<string, QuizQuestion[]> = {
  'group-by-aggregate': [
    {
      id: 'sql-agg-group-q1',
      type: 'output-prediction',
      question: 'score 컬럼에 [100, NULL, 80, NULL, 90]이 있을 때, COUNT(*)와 COUNT(score)의 결과는?',
      options: ['5와 5', '5와 3', '3와 3', '3와 5'],
      answer: '5와 3',
      explanation: 'COUNT(*)는 NULL을 포함한 전체 행 수(5)를, COUNT(col)은 해당 컬럼이 NULL이 아닌 행 수(3)를 반환합니다.',
    },
    {
      id: 'sql-agg-group-q2',
      type: 'output-prediction',
      question: 'SELECT dept, name FROM employees GROUP BY dept는 정상 실행되는가? (MySQL 기준)',
      options: [
        '에러 발생',
        'name은 임의의 값으로 반환됨',
        'name이 NULL로 반환됨',
        '정상적으로 모든 name 반환',
      ],
      answer: 'name은 임의의 값으로 반환됨',
      explanation: 'MySQL의 ONLY_FULL_GROUP_BY가 비활성화된 경우 GROUP BY에 없는 컬럼은 그룹 내 임의의 값이 반환됩니다. 엄격 모드에서는 에러가 발생합니다.',
    },
    {
      id: 'sql-agg-group-q3',
      type: 'fill-blank',
      question: 'SUM, AVG 등 집계 함수는 기본적으로 NULL 값을 ___한다.',
      answer: '무시',
      explanation: 'SQL의 집계 함수(SUM, AVG, MIN, MAX)는 NULL 값을 자동으로 무시합니다. AVG는 NULL이 아닌 값들의 평균을 구합니다.',
    },
  ],
  'having': [
    {
      id: 'sql-agg-having-q1',
      type: 'complexity-match',
      question: 'SQL 실행 순서에서 WHERE와 HAVING의 실행 시점은?',
      options: [
        'WHERE → HAVING (둘 다 GROUP BY 전)',
        'HAVING → WHERE',
        'WHERE → GROUP BY → HAVING',
        'GROUP BY → WHERE → HAVING',
      ],
      answer: 'WHERE → GROUP BY → HAVING',
      explanation: 'SQL 실행 순서: FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY. WHERE는 그룹화 전 행을 필터링하고, HAVING은 그룹화 후 그룹을 필터링합니다.',
    },
    {
      id: 'sql-agg-having-q2',
      type: 'output-prediction',
      question: 'WHERE COUNT(*) > 5는 정상 실행되는가?',
      options: ['정상 실행', '에러 발생', 'DB마다 다름', '항상 빈 결과'],
      answer: '에러 발생',
      explanation: 'WHERE 절은 GROUP BY 전에 실행되므로 집계 함수를 사용할 수 없습니다. 집계 함수 조건은 반드시 HAVING 절에 작성해야 합니다.',
    },
    {
      id: 'sql-agg-having-q3',
      type: 'fill-blank',
      question: 'HAVING 절은 ___ 함수의 결과를 조건으로 그룹을 필터링할 때 사용한다.',
      answer: '집계',
      explanation: 'HAVING은 GROUP BY로 만들어진 그룹에 대해 집계 함수(COUNT, SUM, AVG 등)의 결과를 조건으로 필터링하는 절입니다.',
    },
  ],
  'group-concat': [
    {
      id: 'sql-agg-concat-q1',
      type: 'output-prediction',
      question: "GROUP_CONCAT(name SEPARATOR ', ')에서 SEPARATOR를 생략하면 기본 구분자는?",
      options: ["공백 ' '", "쉼표 ','", "쉼표+공백 ', '", '구분자 없음'],
      answer: "쉼표 ','",
      explanation: "GROUP_CONCAT의 기본 구분자(SEPARATOR)는 쉼표(',')입니다. 다른 구분자가 필요하면 SEPARATOR 절을 명시해야 합니다.",
    },
    {
      id: 'sql-agg-concat-q2',
      type: 'fill-blank',
      question: 'GROUP_CONCAT 결과의 기본 최대 길이는 ___바이트이며, group_concat_max_len 변수로 조절할 수 있다.',
      answer: '1024',
      explanation: 'MySQL의 GROUP_CONCAT 결과는 기본적으로 1024바이트로 제한됩니다. 긴 결과가 필요하면 SET group_concat_max_len = 값으로 늘려야 합니다.',
    },
  ],
}
