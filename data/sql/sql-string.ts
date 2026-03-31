import type { Category } from '../../types/algorithm'

export const sqlString: Category = {
  id: 'sql-string',
  name: '문자열 함수',
  icon: '📝',
  description:
    '문자열을 자르고, 합치고, 변환하는 함수들입니다. 데이터 정제, 포맷 변환, 패턴 추출 등에 활용됩니다. DB마다 함수명이 다를 수 있으므로 방언(dialect)에 주의합니다.',
  subject: 'sql',
  toolsLabel: 'SQL 핵심 함수',
  patterns: [
    {
      id: 'string-basics',
      name: '문자열 조작 기본',
      description:
        '문자열 결합(CONCAT), 추출(SUBSTRING), 길이(LENGTH), 대소문자 변환(UPPER/LOWER), 공백 제거(TRIM) 등 기본 문자열 처리 함수들입니다.',
      timeComplexity: 'O(n) - 문자열 길이에 비례',
      spaceComplexity: 'O(n)',
      keyInsight:
        '문자열 함수는 대부분 1-indexed(SUBSTRING의 시작 위치가 1)입니다. CONCAT은 NULL이 포함되면 NULL을 반환합니다. COALESCE로 NULL을 빈 문자열로 변환한 후 CONCAT하세요.',
      tools: [
        {
          name: 'CONCAT(s1, s2, ...)',
          description: '문자열을 연결합니다. NULL이 있으면 NULL 반환(MySQL). CONCAT_WS로 구분자 지정 가능.',
          import: '문자열 함수',
        },
        {
          name: 'SUBSTRING(str, pos, len)',
          description: 'pos 위치부터 len 길이만큼 추출합니다. 위치는 1부터 시작합니다.',
          import: '문자열 함수',
        },
        {
          name: 'LENGTH(str) / CHAR_LENGTH(str)',
          description: 'LENGTH는 바이트 수, CHAR_LENGTH는 문자 수를 반환합니다(멀티바이트 차이).',
          import: '문자열 함수',
        },
        {
          name: 'UPPER(str) / LOWER(str)',
          description: '대문자/소문자로 변환합니다.',
          import: '문자열 함수',
        },
        {
          name: 'TRIM([BOTH|LEADING|TRAILING] str)',
          description: '앞뒤 공백(또는 지정 문자)을 제거합니다.',
          import: '문자열 함수',
        },
      ],
      codeExamples: [
        {
          title: '문자열 함수 활용',
          code: `-- 이름 포맷팅
SELECT CONCAT(first_name, ' ', last_name) AS full_name,
       CONCAT(UPPER(SUBSTRING(first_name, 1, 1)), LOWER(SUBSTRING(first_name, 2))) AS capitalized,
       CHAR_LENGTH(last_name) AS last_name_len
FROM users;

-- 이메일에서 사용자명과 도메인 분리
SELECT email,
       SUBSTRING(email, 1, LOCATE('@', email) - 1) AS username,
       SUBSTRING(email, LOCATE('@', email) + 1) AS domain
FROM users;

-- 공백 정리 및 대소문자 정규화
SELECT TRIM(LOWER(name)) AS normalized_name
FROM raw_data;`,
          explanation:
            'LOCATE(substr, str)로 특정 문자의 위치를 찾아 SUBSTRING의 범위를 동적으로 지정할 수 있습니다.',
        },
      ],
      commonProblems: [
        { name: 'Fix Names in a Table', platform: 'leetcode', id: '1667', slug: 'fix-names-in-a-table', difficulty: 'Easy' },
        { name: 'Group Sold Products By The Date', platform: 'leetcode', id: '1484', slug: 'group-sold-products-by-the-date', difficulty: 'Easy' },
      ],
      tips: [
        'MySQL의 CONCAT_WS(separator, s1, s2)는 구분자를 넣어 연결하며, NULL 값을 자동으로 건너뜁니다',
        'SUBSTRING은 SUBSTR과 동의어입니다',
        '한글 등 멀티바이트 문자를 다룰 때는 LENGTH 대신 CHAR_LENGTH를 사용하세요',
      ],
    },
    {
      id: 'string-replace-format',
      name: 'REPLACE & FORMAT',
      description:
        '문자열 치환(REPLACE), 반복(REPEAT), 역순(REVERSE), 패딩(LPAD/RPAD) 등 데이터 정제와 포맷팅에 활용하는 함수들입니다.',
      timeComplexity: 'O(n)',
      spaceComplexity: 'O(n)',
      keyInsight:
        'REPLACE는 전체 문자열에서 모든 일치하는 부분을 치환합니다. 전화번호의 하이픈 제거, 특수문자 정제 등 데이터 정제에 자주 사용됩니다.',
      tools: [
        {
          name: 'REPLACE(str, from, to)',
          description: 'str에서 from을 모두 to로 치환합니다.',
          import: '문자열 함수',
        },
        {
          name: 'LPAD(str, len, pad) / RPAD',
          description: '문자열을 지정 길이가 될 때까지 왼쪽/오른쪽에 패딩 문자를 채웁니다.',
          import: '문자열 함수',
        },
        {
          name: 'REVERSE(str)',
          description: '문자열을 역순으로 반환합니다.',
          import: '문자열 함수',
        },
      ],
      codeExamples: [
        {
          title: 'REPLACE와 LPAD',
          code: `-- 전화번호 하이픈 제거
SELECT REPLACE(REPLACE(phone, '-', ''), ' ', '') AS clean_phone
FROM contacts;

-- 주문 ID를 8자리로 패딩
SELECT LPAD(order_id, 8, '0') AS padded_id
FROM orders;

-- 이름 뒤집기 (palindrome 확인)
SELECT name,
       REVERSE(name) AS reversed,
       CASE WHEN name = REVERSE(name) THEN 'palindrome' ELSE 'no' END AS is_palindrome
FROM words;`,
          explanation:
            'REPLACE를 중첩해서 여러 패턴을 순차적으로 치환할 수 있습니다. LPAD는 고정 길이 코드 생성에 유용합니다.',
        },
      ],
      commonProblems: [
        { name: 'Reverse Substrings Between Each Pair of Parentheses', platform: 'leetcode', id: '1190', slug: 'reverse-substrings-between-each-pair-of-parentheses', difficulty: 'Medium' },
      ],
      tips: [
        'REGEXP_REPLACE(MySQL 8.0+)로 정규식 패턴을 사용한 치환이 가능합니다',
        'LPAD/RPAD는 문자열이 이미 len 이상이면 잘라냅니다',
        '여러 REPLACE를 중첩하면 처리 순서를 주의해야 합니다',
      ],
    },
  ],
}
