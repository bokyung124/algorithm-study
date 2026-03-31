import type { Category } from '../../types/algorithm'

export const mathCategory: Category = {
  id: 'math',
  name: '수학',
  icon: '🔢',
  description: '소수 판별, 최대공약수, 모듈러 연산 등 코딩 테스트에서 자주 출제되는 수학적 알고리즘 패턴을 학습합니다.',
  patterns: [
    {
      id: 'prime-sieve',
      name: '소수 체 (에라토스테네스)',
      description: '2부터 N까지의 모든 소수를 O(N log log N)에 구하는 알고리즘입니다. 소수 판별, 소인수분해 등의 기초가 됩니다.',
      timeComplexity: 'O(N log log N)',
      spaceComplexity: 'O(N)',
      keyInsight: '각 소수의 배수를 순서대로 지워나가면, 지워지지 않고 남은 수가 소수입니다. 소수 p의 배수를 지울 때 p*p부터 시작하면 중복 작업을 줄일 수 있습니다.',
      tools: [
        {
          name: 'list',
          description: '에라토스테네스의 체에서 [True] * (n+1)로 bool 배열을 생성합니다. 인덱스가 곧 숫자를 나타내어 소수 여부를 표시합니다.',
          import: '내장 자료형',
        },
        {
          name: 'math.isqrt',
          description: '정수 제곱근을 정확하게 반환합니다. int(n**0.5) 대신 사용하면 부동소수점 오차를 방지할 수 있습니다.',
          import: 'from math import isqrt',
        },
      ],
      codeExamples: [
        {
          title: '에라토스테네스의 체',
          code: `def sieve_of_eratosthenes(n: int) -> list[int]:
    """2 이상 n 이하의 모든 소수를 반환"""
    if n < 2:
        return []
    is_prime = [True] * (n + 1)
    is_prime[0] = is_prime[1] = False

    for i in range(2, int(n**0.5) + 1):
        if is_prime[i]:
            # i*i부터 시작하여 i의 배수를 제거
            for j in range(i * i, n + 1, i):
                is_prime[j] = False

    return [i for i in range(2, n + 1) if is_prime[i]]

# 예시
print(sieve_of_eratosthenes(30))
# [2, 3, 5, 7, 11, 13, 17, 19, 23, 29]
print(len(sieve_of_eratosthenes(1000000)))  # 78498`,
          explanation: '2부터 sqrt(N)까지 순회하며 각 소수의 배수를 False로 표시합니다. i*i부터 시작하는 이유는 i*2, i*3, ... i*(i-1)은 이미 더 작은 소수에 의해 처리되었기 때문입니다.',
        },
        {
          title: '소인수분해 (최소 소인수 활용)',
          code: `def smallest_prime_factors(n: int) -> list[int]:
    """각 수의 최소 소인수(SPF)를 구함"""
    spf = list(range(n + 1))  # spf[i] = i로 초기화
    for i in range(2, int(n**0.5) + 1):
        if spf[i] == i:  # i가 소수인 경우
            for j in range(i * i, n + 1, i):
                if spf[j] == j:
                    spf[j] = i
    return spf

def factorize(x: int, spf: list[int]) -> dict[int, int]:
    """SPF 테이블을 이용한 O(log x) 소인수분해"""
    factors = {}
    while x > 1:
        p = spf[x]
        count = 0
        while x % p == 0:
            x //= p
            count += 1
        factors[p] = count
    return factors

# 예시
spf = smallest_prime_factors(100)
print(factorize(60, spf))   # {2: 2, 3: 1, 5: 1} (60 = 2^2 * 3 * 5)
print(factorize(84, spf))   # {2: 2, 3: 1, 7: 1} (84 = 2^2 * 3 * 7)
print(factorize(97, spf))   # {97: 1} (소수)`,
          explanation: '에라토스테네스의 체를 변형하여 각 수의 최소 소인수를 저장합니다. 이 테이블을 이용하면 임의의 수를 O(log x)에 소인수분해할 수 있어, 여러 수를 반복적으로 분해할 때 효율적입니다.',
        },
      ],
      commonProblems: [
        { name: 'Count Primes', platform: 'leetcode', id: '204', slug: 'count-primes', difficulty: 'Medium' },
        { name: 'Power of Two', platform: 'leetcode', id: '231', slug: 'power-of-two', difficulty: 'Easy' },
        { name: '소수 구하기', platform: 'boj', id: '1929' },
        { name: '골드바흐의 추측', platform: 'boj', id: '6588' },
        { name: '소인수분해', platform: 'boj', id: '11653' },
        { name: '약수의 합 구하기', platform: 'boj', id: '17425' },
        { name: '쌍둥이 소수 찾기', platform: 'boj', id: '1016' },
      ],
      tips: [
        '10^7 이하 범위는 에라토스테네스의 체로 충분히 처리 가능합니다.',
        '단일 수의 소수 판별은 sqrt(n)까지만 나누어 보면 O(sqrt(n))입니다.',
        'SPF 테이블은 소인수분해뿐 아니라 오일러 파이 함수, 뫼비우스 함수 계산에도 활용됩니다.',
      ],
    },
    {
      id: 'gcd-lcm',
      name: '최대공약수 / 최소공배수',
      description: '유클리드 호제법으로 두 수의 GCD를 O(log(min(a,b)))에 구하고, 이를 이용해 LCM을 계산합니다.',
      timeComplexity: 'O(log(min(a, b)))',
      spaceComplexity: 'O(1)',
      keyInsight: 'GCD(a, b) = GCD(b, a % b)라는 성질을 반복 적용합니다. LCM은 a * b // GCD(a, b)로 구합니다. 확장 유클리드 알고리즘으로 모듈러 역원도 구할 수 있습니다.',
      tools: [
        {
          name: 'math.gcd / math.lcm',
          description: 'GCD/LCM을 내장 함수로 바로 계산합니다. Python 3.9+에서는 여러 인자를 지원합니다: math.gcd(a, b, c).',
          import: 'from math import gcd, lcm',
        },
        {
          name: 'functools.reduce',
          description: '여러 수의 GCD/LCM을 순차적으로 누적 계산할 때 사용합니다. reduce(gcd, nums)로 리스트 전체의 GCD를 구합니다.',
          import: 'from functools import reduce',
        },
      ],
      codeExamples: [
        {
          title: 'GCD, LCM 및 확장 유클리드',
          code: `from math import gcd
from functools import reduce

def lcm(a: int, b: int) -> int:
    return a * b // gcd(a, b)

def gcd_of_list(nums: list[int]) -> int:
    """리스트 전체의 GCD"""
    return reduce(gcd, nums)

def lcm_of_list(nums: list[int]) -> int:
    """리스트 전체의 LCM"""
    return reduce(lcm, nums)

def extended_gcd(a: int, b: int) -> tuple[int, int, int]:
    """ax + by = gcd(a, b)를 만족하는 (g, x, y)를 반환"""
    if b == 0:
        return a, 1, 0
    g, x1, y1 = extended_gcd(b, a % b)
    return g, y1, x1 - (a // b) * y1

# 예시
print(gcd(12, 18))           # 6
print(lcm(12, 18))           # 36
print(gcd_of_list([12, 18, 24]))  # 6
print(lcm_of_list([4, 6, 10]))    # 60

g, x, y = extended_gcd(35, 15)
print(f"{g} = 35*{x} + 15*{y}")  # 5 = 35*1 + 15*(-2)`,
          explanation: '기본 GCD는 math.gcd를 사용하고, 리스트의 GCD/LCM은 reduce로 순차 적용합니다. 확장 유클리드는 ax+by=gcd를 만족하는 계수를 재귀적으로 구합니다.',
        },
        {
          title: '분수 연산',
          code: `from math import gcd

class Fraction:
    def __init__(self, num: int, den: int):
        if den < 0:
            num, den = -num, -den
        g = gcd(abs(num), abs(den))
        self.num = num // g
        self.den = den // g

    def __add__(self, other: 'Fraction') -> 'Fraction':
        return Fraction(
            self.num * other.den + other.num * self.den,
            self.den * other.den
        )

    def __repr__(self) -> str:
        return f"{self.num}/{self.den}"

# 예시: 1/3 + 1/6 = 1/2
a = Fraction(1, 3)
b = Fraction(1, 6)
print(a + b)  # 1/2

# 예시: 3/4 + 2/5 = 23/20
c = Fraction(3, 4)
d = Fraction(2, 5)
print(c + d)  # 23/20`,
          explanation: '분수를 생성할 때마다 GCD로 기약분수로 변환합니다. 덧셈은 통분 후 분자를 더하고 다시 약분합니다.',
        },
      ],
      commonProblems: [
        { name: 'GCD of Strings', platform: 'leetcode', id: '1071', slug: 'greatest-common-divisor-of-strings', difficulty: 'Easy' },
        { name: '최대공약수와 최소공배수', platform: 'boj', id: '2609' },
        { name: '분수 합 구하기', platform: 'boj', id: '1735' },
        { name: 'N개 수의 최소공배수', platform: 'boj', id: '1934' },
        { name: '캔디 분배 (확장 유클리드)', platform: 'boj', id: '3955' },
      ],
      tips: [
        'Python 3.9+에서는 math.gcd가 여러 인자를 지원합니다: math.gcd(a, b, c).',
        'LCM 계산 시 오버플로를 방지하려면 a // gcd(a, b) * b 순서로 계산하세요.',
        'GCD(0, n) = n, GCD(0, 0) = 0 이라는 경계 조건을 기억하세요.',
      ],
    },
    {
      id: 'modular-arithmetic',
      name: '모듈러 연산',
      description: '큰 수의 나머지 연산을 효율적으로 처리합니다. 거듭제곱, 조합, 역원 등을 모듈러 환경에서 계산하는 패턴입니다.',
      timeComplexity: 'O(log n) (거듭제곱)',
      spaceComplexity: 'O(1) ~ O(n) (팩토리얼 전처리)',
      keyInsight: '(a + b) % m = ((a % m) + (b % m)) % m, (a * b) % m = ((a % m) * (b % m)) % m 입니다. 나눗셈은 모듈러 역원을 곱하는 것으로 대체합니다.',
      tools: [
        {
          name: 'pow(base, exp, mod)',
          description: 'Python 내장 3인자 pow로 모듈러 거듭제곱을 O(log n)에 계산합니다. C로 구현되어 직접 구현보다 빠릅니다.',
          import: '내장 함수',
        },
        {
          name: 'math',
          description: 'math.comb(n, r)로 조합 계산, math.factorial(n)로 팩토리얼 계산 등 수학 관련 유틸리티를 제공합니다.',
          import: 'import math',
        },
      ],
      codeExamples: [
        {
          title: '빠른 거듭제곱과 모듈러 역원',
          code: `MOD = 10**9 + 7

def power(base: int, exp: int, mod: int = MOD) -> int:
    """분할 정복을 이용한 빠른 거듭제곱: base^exp % mod"""
    result = 1
    base %= mod
    while exp > 0:
        if exp % 2 == 1:
            result = result * base % mod
        exp //= 2
        base = base * base % mod
    return result

def mod_inverse(a: int, mod: int = MOD) -> int:
    """페르마 소정리를 이용한 모듈러 역원: a^(mod-2) % mod"""
    return power(a, mod - 2, mod)

# 예시
print(power(2, 100, MOD))          # 976371285
print(mod_inverse(2, MOD))         # 500000004
print(2 * mod_inverse(2, MOD) % MOD)  # 1 (검증)`,
          explanation: '거듭제곱을 이진수로 분해하여 O(log n)에 계산합니다. 모듈러 역원은 페르마 소정리(a^(p-1) = 1 mod p, p는 소수)에서 a^(-1) = a^(p-2) mod p를 이용합니다.',
        },
        {
          title: '조합 (nCr) 모듈러 계산',
          code: `MOD = 10**9 + 7

def precompute_factorials(n: int) -> tuple[list[int], list[int]]:
    """팩토리얼과 역팩토리얼을 전처리"""
    fact = [1] * (n + 1)
    for i in range(1, n + 1):
        fact[i] = fact[i - 1] * i % MOD

    inv_fact = [1] * (n + 1)
    inv_fact[n] = pow(fact[n], MOD - 2, MOD)
    for i in range(n - 1, -1, -1):
        inv_fact[i] = inv_fact[i + 1] * (i + 1) % MOD

    return fact, inv_fact

def nCr(n: int, r: int, fact: list[int], inv_fact: list[int]) -> int:
    """nCr mod MOD를 O(1)에 계산"""
    if r < 0 or r > n:
        return 0
    return fact[n] * inv_fact[r] % MOD * inv_fact[n - r] % MOD

# 예시
MAX_N = 200000
fact, inv_fact = precompute_factorials(MAX_N)

print(nCr(10, 3, fact, inv_fact))    # 120
print(nCr(100, 50, fact, inv_fact))  # 538992043
print(nCr(5, 0, fact, inv_fact))     # 1
print(nCr(5, 6, fact, inv_fact))     # 0`,
          explanation: 'nCr = n! / (r! * (n-r)!)에서 나눗셈을 역팩토리얼의 곱으로 대체합니다. 팩토리얼을 O(N)에 전처리하면 각 쿼리를 O(1)에 답할 수 있습니다.',
        },
      ],
      commonProblems: [
        { name: 'Pow(x, n)', platform: 'leetcode', id: '50', slug: 'powx-n', difficulty: 'Medium' },
        { name: '조합의 수 구하기 (nCr mod p)', platform: 'boj', id: '11401' },
        { name: '이항 계수', platform: 'boj', id: '11051' },
        { name: '행렬 거듭제곱으로 피보나치 구하기', platform: 'boj', id: '11444' },
        { name: '카탈란 수', platform: 'boj', id: '1670' },
        { name: '경우의 수 세기 문제', platform: 'boj', id: '11051' },
      ],
      tips: [
        'MOD가 소수일 때만 페르마 소정리로 역원을 구할 수 있습니다.',
        'Python 내장 pow(a, b, mod)는 C로 구현되어 직접 구현보다 빠릅니다.',
        '중간 계산마다 % MOD를 취해야 오버플로를 방지할 수 있습니다 (Python은 큰 수를 지원하지만 속도가 느려집니다).',
      ],
    },
  ],
}
