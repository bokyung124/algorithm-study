import type { QuizQuestion } from '../../types/quiz'

export const sqlWindowQuizzes: Record<string, QuizQuestion[]> = {
  'rank-functions': [
    {
      id: 'sql-win-rank-q1',
      type: 'output-prediction',
      question: '점수가 [100, 100, 90]일 때 RANK()의 결과는?',
      options: ['1, 1, 2', '1, 1, 3', '1, 2, 3', '1, 1, 1'],
      answer: '1, 1, 3',
      explanation: 'RANK()는 동점자에게 같은 순위를 부여하고, 다음 순위를 동점자 수만큼 건너뜁니다. 1등이 2명이므로 다음은 3등입니다.',
    },
    {
      id: 'sql-win-rank-q2',
      type: 'output-prediction',
      question: '점수가 [100, 100, 90]일 때 DENSE_RANK()의 결과는?',
      options: ['1, 1, 2', '1, 1, 3', '1, 2, 3', '1, 2, 2'],
      answer: '1, 1, 2',
      explanation: 'DENSE_RANK()는 동점자에게 같은 순위를 부여하되, 다음 순위를 건너뛰지 않습니다. 1등 2명 다음은 2등입니다.',
    },
    {
      id: 'sql-win-rank-q3',
      type: 'output-prediction',
      question: '점수가 [100, 100, 90]일 때 ROW_NUMBER()의 결과는?',
      options: ['1, 1, 2', '1, 1, 3', '1, 2, 3', '결과가 비결정적'],
      answer: '1, 2, 3',
      explanation: 'ROW_NUMBER()는 동점 여부와 관계없이 고유한 번호를 순차 부여합니다. 동점자 간의 순서는 비결정적이지만 번호 자체는 항상 1, 2, 3...입니다.',
    },
  ],
  'lag-lead': [
    {
      id: 'sql-win-lag-q1',
      type: 'output-prediction',
      question: 'LAG(salary, 1, 0) OVER (ORDER BY id)에서 첫 번째 행의 결과는?',
      options: ['NULL', '0', '자기 자신의 salary', '에러'],
      answer: '0',
      explanation: 'LAG의 세 번째 인자는 기본값입니다. 이전 행이 없는 첫 번째 행에서는 기본값 0이 반환됩니다. 기본값을 지정하지 않으면 NULL이 됩니다.',
    },
    {
      id: 'sql-win-lag-q2',
      type: 'fill-blank',
      question: 'LAG는 현재 행의 ___행을, LEAD는 현재 행의 ___행을 참조한다.',
      answer: '이전, 다음',
      explanation: 'LAG(col, n)은 현재 행에서 n행 이전 값을, LEAD(col, n)은 n행 다음 값을 가져옵니다. 전월 대비 변화율 등을 계산할 때 유용합니다.',
    },
    {
      id: 'sql-win-lag-q3',
      type: 'output-prediction',
      question: 'LAG(salary) OVER (ORDER BY id)에서 기본 오프셋은?',
      options: ['0 (자기 자신)', '1 (바로 이전 행)', '전체 파티션', '지정 필수'],
      answer: '1 (바로 이전 행)',
      explanation: 'LAG와 LEAD의 두 번째 인자(오프셋)를 생략하면 기본값 1이 적용됩니다. 즉 바로 이전/다음 행을 참조합니다.',
    },
  ],
  'window-aggregate': [
    {
      id: 'sql-win-agg-q1',
      type: 'output-prediction',
      question: 'SUM(val) OVER (ORDER BY id ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW)의 의미는?',
      options: ['전체 합계', '누적 합계', '이동 평균', '파티션 합계'],
      answer: '누적 합계',
      explanation: 'ROWS BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW는 처음부터 현재 행까지의 범위를 지정합니다. SUM과 결합하면 누적 합계(Running Sum)가 됩니다.',
    },
    {
      id: 'sql-win-agg-q2',
      type: 'complexity-match',
      question: 'ROWS와 RANGE 프레임의 차이점은?',
      options: [
        '차이 없음 (동의어)',
        'ROWS는 물리적 행 수 기준, RANGE는 값 기준',
        'ROWS는 정렬 필요, RANGE는 불필요',
        'RANGE가 항상 더 빠름',
      ],
      answer: 'ROWS는 물리적 행 수 기준, RANGE는 값 기준',
      explanation: 'ROWS는 물리적 행의 위치(몇 번째 행)를 기준으로 프레임을 정하고, RANGE는 ORDER BY 컬럼의 값 범위를 기준으로 합니다. 동일한 값이 여러 행에 있을 때 결과가 달라집니다.',
    },
  ],
  'first-last-ntile': [
    {
      id: 'sql-win-fl-q1',
      type: 'output-prediction',
      question: 'LAST_VALUE(salary) OVER (ORDER BY id)의 결과가 예상과 다른 이유는?',
      options: [
        'LAST_VALUE는 지원되지 않음',
        '기본 프레임이 CURRENT ROW까지라서',
        '정렬이 잘못되어서',
        'NULL 때문에',
      ],
      answer: '기본 프레임이 CURRENT ROW까지라서',
      explanation: 'ORDER BY 지정 시 기본 프레임은 RANGE BETWEEN UNBOUNDED PRECEDING AND CURRENT ROW입니다. LAST_VALUE가 파티션 마지막 값이 아닌 현재 행의 값을 반환합니다. ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING을 명시해야 합니다.',
    },
    {
      id: 'sql-win-fl-q2',
      type: 'output-prediction',
      question: '10개 행에 NTILE(3)을 적용하면 각 그룹의 행 수는?',
      options: ['3, 3, 4', '4, 3, 3', '3, 3, 3', '4, 4, 2'],
      answer: '4, 3, 3',
      explanation: 'NTILE(3)은 10행을 3개 그룹으로 나눕니다. 10 / 3 = 3 나머지 1이므로, 첫 번째 그룹에 1개 행이 추가되어 4, 3, 3으로 분배됩니다.',
    },
    {
      id: 'sql-win-fl-q3',
      type: 'fill-blank',
      question: 'FIRST_VALUE와 LAST_VALUE를 올바르게 사용하려면 반드시 ___ 절을 명시해야 한다.',
      answer: '프레임(ROWS/RANGE BETWEEN)',
      explanation: '기본 프레임이 CURRENT ROW까지이므로, LAST_VALUE가 의도대로 동작하려면 ROWS BETWEEN UNBOUNDED PRECEDING AND UNBOUNDED FOLLOWING처럼 프레임을 명시해야 합니다.',
    },
  ],
}
