import type { Category } from '../../types/algorithm'

export const sqlDatetime: Category = {
  id: 'sql-datetime',
  name: '날짜/시간 함수',
  icon: '📅',
  description:
    '날짜와 시간을 조작, 추출, 연산하는 함수들입니다. 기간별 집계, 날짜 차이 계산, 포맷 변환 등에 필수입니다. DB 방언(MySQL/PostgreSQL/SQLite)에 따라 함수명이 다릅니다.',
  subject: 'sql',
  toolsLabel: 'SQL 핵심 함수',
  patterns: [
    {
      id: 'date-extract',
      name: '날짜 추출 및 포맷',
      description:
        '날짜에서 연도, 월, 일, 요일 등을 추출하거나 원하는 형식의 문자열로 변환합니다. 기간별(연/월/분기) 집계에 필수입니다.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(n)',
      keyInsight:
        '날짜 컬럼에 함수를 적용하면(YEAR(date), DATE_FORMAT 등) 인덱스를 사용하지 못합니다. 범위 조건은 날짜 함수 대신 BETWEEN이나 >= , < 비교로 쓰는 것이 성능에 유리합니다.',
      tools: [
        {
          name: 'YEAR(date) / MONTH(date) / DAY(date)',
          description: '날짜에서 연도, 월, 일을 추출합니다.',
          import: '날짜 함수',
        },
        {
          name: 'DATE_FORMAT(date, format)',
          description: '날짜를 지정 포맷의 문자열로 변환합니다. (MySQL)',
          import: '날짜 함수',
        },
        {
          name: 'EXTRACT(unit FROM date)',
          description: '날짜에서 특정 단위(YEAR, MONTH, DAY, HOUR 등)를 추출합니다. 표준 SQL.',
          import: '날짜 함수',
        },
        {
          name: 'DAYOFWEEK(date) / WEEKDAY(date)',
          description: '요일 번호를 반환합니다. DB마다 기준이 다릅니다.',
          import: '날짜 함수',
        },
      ],
      codeExamples: [
        {
          title: '날짜 추출 및 월별 집계',
          code: `-- 연도/월 추출로 그룹화
SELECT YEAR(order_date) AS year,
       MONTH(order_date) AS month,
       COUNT(*) AS order_count,
       SUM(amount) AS monthly_total
FROM orders
GROUP BY YEAR(order_date), MONTH(order_date)
ORDER BY year, month;

-- DATE_FORMAT으로 포맷 지정 (MySQL)
SELECT DATE_FORMAT(order_date, '%Y-%m') AS ym,
       COUNT(*) AS cnt
FROM orders
GROUP BY DATE_FORMAT(order_date, '%Y-%m');

-- 인덱스 친화적 범위 조건 (권장)
-- ❌ WHERE YEAR(order_date) = 2023  -- 인덱스 미사용
-- ✅ 아래 방식 사용
SELECT * FROM orders
WHERE order_date >= '2023-01-01'
  AND order_date < '2024-01-01';`,
          explanation:
            'DATE_FORMAT의 포맷 코드: %Y(4자리 연도), %m(2자리 월), %d(2자리 일), %H(시), %i(분). 인덱스 활용을 위해 날짜 함수 대신 범위 조건을 사용하세요.',
        },
      ],
      commonProblems: [
        { name: 'Monthly Transactions I', platform: 'leetcode', id: '1193', slug: 'monthly-transactions-i', difficulty: 'Medium' },
        { name: 'User Activity for the Past 30 Days I', platform: 'leetcode', id: '1141', slug: 'user-activity-for-the-past-30-days-i', difficulty: 'Easy' },
      ],
      tips: [
        'DATE_FORMAT은 MySQL 전용입니다. PostgreSQL은 TO_CHAR, SQLite는 strftime을 사용합니다',
        'QUARTER(date)로 분기(1~4)를 추출할 수 있습니다',
        '날짜 컬럼 인덱스 활용: 함수 호출 대신 범위(>=, <) 조건을 사용하세요',
      ],
    },
    {
      id: 'date-arithmetic',
      name: '날짜 연산',
      description:
        '날짜 간의 차이 계산, 날짜 더하기/빼기, 현재 시각 조회 등 날짜 연산 함수들입니다. 기간 필터링, D-Day 계산, 기간 내 활동 분석에 활용합니다.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(1)',
      keyInsight:
        'DATEDIFF는 두 날짜 사이의 일수를 반환합니다. DATE_ADD/DATE_SUB는 INTERVAL 키워드를 활용해 다양한 단위(DAY, MONTH, YEAR, HOUR)로 날짜를 이동할 수 있습니다.',
      tools: [
        {
          name: 'DATEDIFF(date1, date2)',
          description: 'date1 - date2의 일수 차이를 반환합니다. (MySQL)',
          import: '날짜 연산',
        },
        {
          name: 'DATE_ADD(date, INTERVAL n unit)',
          description: '날짜에 n만큼 더합니다. unit: DAY, MONTH, YEAR, HOUR 등.',
          import: '날짜 연산',
        },
        {
          name: 'NOW() / CURDATE() / CURTIME()',
          description: '현재 날짜+시간 / 현재 날짜 / 현재 시간을 반환합니다.',
          import: '날짜 연산',
        },
        {
          name: 'DATE(datetime)',
          description: 'DATETIME에서 날짜 부분만 추출합니다.',
          import: '날짜 연산',
        },
      ],
      codeExamples: [
        {
          title: '날짜 차이 및 연산',
          code: `-- 가입 후 첫 구매까지 걸린 일수
SELECT u.user_id,
       DATEDIFF(MIN(o.order_date), u.signup_date) AS days_to_first_order
FROM users u
JOIN orders o ON u.user_id = o.user_id
GROUP BY u.user_id, u.signup_date;

-- 최근 30일 내 활동한 사용자
SELECT DISTINCT user_id
FROM activity
WHERE activity_date >= DATE_SUB(CURDATE(), INTERVAL 30 DAY);

-- 만료일이 7일 이내인 구독
SELECT user_id, expire_date,
       DATEDIFF(expire_date, CURDATE()) AS days_remaining
FROM subscriptions
WHERE expire_date BETWEEN CURDATE()
                      AND DATE_ADD(CURDATE(), INTERVAL 7 DAY);`,
          explanation:
            'DATE_SUB(CURDATE(), INTERVAL 30 DAY)는 오늘로부터 30일 전 날짜를 반환합니다. DATEDIFF는 두 날짜 사이의 일수 차이입니다.',
        },
      ],
      commonProblems: [
        { name: 'Rising Temperature', platform: 'leetcode', id: '197', slug: 'rising-temperature', difficulty: 'Easy' },
        { name: 'Game Play Analysis I', platform: 'leetcode', id: '511', slug: 'game-play-analysis-i', difficulty: 'Easy' },
      ],
      tips: [
        'PostgreSQL에서는 날짜 - 날짜로 바로 일수 차이를 구할 수 있습니다',
        'TIMESTAMPDIFF(unit, date1, date2)로 월/연 단위 차이도 계산할 수 있습니다',
        'CURDATE()는 시간 없는 날짜, NOW()는 날짜+시간을 반환합니다. 날짜만 비교할 때는 CURDATE()를 사용하세요',
      ],
    },
  ],
}
