'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import { getCategoryById } from '@/data/categories'
import CodeBlock from '@/components/algorithm/CodeBlock'
import ComplexityBadge from '@/components/algorithm/ComplexityBadge'
import MemoEditor from '@/components/memo/MemoEditor'
import RelatedPatterns from '@/components/algorithm/RelatedPatterns'
import StudyButton from '@/components/algorithm/StudyButton'
import QuizSection from '@/components/quiz/QuizSection'
import VisualizationSection from '@/components/visualization/VisualizationSection'
import ChatPanel from '@/components/chat/ChatPanel'
import type { Problem } from '@/types/algorithm'

function getProblemUrl(problem: Problem): string {
  switch (problem.platform) {
    case 'leetcode':
      return `https://leetcode.com/problems/${problem.slug ?? problem.id}/`
    case 'boj':
      return `https://www.acmicpc.net/problem/${problem.id}`
    case 'programmers':
      return `https://school.programmers.co.kr/learn/courses/30/lessons/${problem.id}`
  }
}

function PlatformBadge({ problem }: { problem: Problem }) {
  if (problem.platform === 'leetcode') {
    const color =
      problem.difficulty === 'Easy'
        ? 'bg-green-100 text-green-700'
        : problem.difficulty === 'Medium'
          ? 'bg-yellow-100 text-yellow-700'
          : problem.difficulty === 'Hard'
            ? 'bg-red-100 text-red-700'
            : 'bg-gray-100 text-gray-600'
    return (
      <span className="flex items-center gap-1.5">
        <span className={`text-xs font-medium px-1.5 py-0.5 rounded ${color}`}>
          {problem.difficulty ?? 'LC'}
        </span>
      </span>
    )
  }
  if (problem.platform === 'boj') {
    return (
      <span className="text-xs font-medium px-1.5 py-0.5 rounded bg-blue-100 text-blue-700">
        BOJ
      </span>
    )
  }
  return (
    <span className="text-xs font-medium px-1.5 py-0.5 rounded bg-purple-100 text-purple-700">
      프로그래머스
    </span>
  )
}

export default function PatternPage() {
  const params = useParams<{ categoryId: string; patternId: string }>()
  const category = getCategoryById(params.categoryId ?? '')
  const pattern = category?.patterns.find((p) => p.id === params.patternId)

  if (!category || !pattern) {
    return <div className="text-center text-gray-500 py-12">패턴을 찾을 수 없습니다.</div>
  }

  const patternIndex = category.patterns.findIndex((p) => p.id === pattern.id)
  const prevPattern = patternIndex > 0 ? category.patterns[patternIndex - 1] : null
  const nextPattern = patternIndex < category.patterns.length - 1 ? category.patterns[patternIndex + 1] : null

  return (
    <div className="max-w-3xl">
      {/* Breadcrumb */}
      <nav className="text-sm text-gray-400 mb-4 flex items-center gap-1.5">
        <Link href={`/category/${category.id}`} className="hover:text-blue-600 transition-colors">
          {category.icon} {category.name}
        </Link>
        <span>/</span>
        <span className="text-gray-600">{pattern.name}</span>
      </nav>

      {/* Header */}
      <div className="flex items-start justify-between gap-3 mb-2">
        <h1 className="text-2xl font-bold text-gray-900">{pattern.name}</h1>
        <StudyButton categoryId={category.id} patternId={pattern.id} />
      </div>
      <p className="text-gray-600 mb-4">{pattern.description}</p>

      <div className="flex flex-wrap gap-2 mb-6">
        <ComplexityBadge label="시간" value={pattern.timeComplexity} variant="time" />
        <ComplexityBadge label="공간" value={pattern.spaceComplexity} variant="space" />
      </div>

      {/* Visualization */}
      <VisualizationSection categoryId={category.id} patternId={pattern.id} />

      {/* Key Insight */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <h3 className="text-sm font-semibold text-blue-800 mb-1">핵심 아이디어</h3>
        <p className="text-sm text-blue-700">{pattern.keyInsight}</p>
      </div>

      {/* Python Tools */}
      {pattern.pythonTools.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">Python 필수 도구</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {pattern.pythonTools.map((tool, i) => (
              <div key={i} className="bg-emerald-50 border border-emerald-200 rounded-lg p-3">
                <div className="font-mono text-sm font-semibold text-emerald-800 mb-1">{tool.name}</div>
                <code className="block text-xs text-emerald-600 bg-emerald-100 rounded px-2 py-1 mb-2">{tool.import}</code>
                <p className="text-sm text-emerald-700">{tool.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Code Examples */}
      <section className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-3">코드 예시</h2>
        <div className="space-y-4">
          {pattern.codeExamples.map((example, i) => (
            <div key={i}>
              <CodeBlock code={example.code} title={example.title} />
              <p className="text-sm text-gray-600 mt-2 leading-relaxed">{example.explanation}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Tips */}
      {pattern.tips.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">풀이 팁</h2>
          <ul className="space-y-2">
            {pattern.tips.map((tip, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                <span className="text-blue-500 mt-0.5 shrink-0">•</span>
                {tip}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Quiz */}
      <QuizSection categoryId={category.id} patternId={pattern.id} />

      {/* Common Problems */}
      {pattern.commonProblems.length > 0 && (
        <section className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">관련 문제</h2>
          <ul className="space-y-1.5">
            {pattern.commonProblems.map((problem, i) => (
              <li key={i} className="text-sm bg-gray-50 px-3 py-2 rounded-lg">
                <a
                  href={getProblemUrl(problem)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between gap-2 text-gray-700 hover:text-blue-600 transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <PlatformBadge problem={problem} />
                    <span>{problem.platform === 'boj' ? `${problem.id} - ${problem.name}` : problem.name}</span>
                  </span>
                  <svg className="w-3.5 h-3.5 shrink-0 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Related Patterns */}
      <RelatedPatterns categoryId={category.id} patternId={pattern.id} />

      {/* AI Chat */}
      <ChatPanel
        categoryId={category.id}
        patternId={pattern.id}
        patternContext={{
          name: pattern.name,
          description: pattern.description,
          keyInsight: pattern.keyInsight,
        }}
      />

      {/* Memo */}
      <section>
        <MemoEditor categoryId={category.id} patternId={pattern.id} />
      </section>

      {/* Prev/Next Navigation */}
      <nav className="flex items-center justify-between mt-6 pt-6 border-t border-gray-200">
        {prevPattern ? (
          <Link
            href={`/category/${category.id}/${prevPattern.id}`}
            className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-blue-600 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            <span>{prevPattern.name}</span>
          </Link>
        ) : (
          <div />
        )}
        <span className="text-xs text-gray-400">{patternIndex + 1} / {category.patterns.length}</span>
        {nextPattern ? (
          <Link
            href={`/category/${category.id}/${nextPattern.id}`}
            className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-blue-600 transition-colors"
          >
            <span>{nextPattern.name}</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        ) : (
          <div />
        )}
      </nav>
    </div>
  )
}
