'use client'

import { useState } from 'react'
import { getQuizzes } from '@/data/quizzes'
import type { QuizQuestion } from '@/types/quiz'

interface Props {
  categoryId: string
  patternId: string
}

function QuizItem({ question }: { question: QuizQuestion }) {
  const [selected, setSelected] = useState<string | null>(null)
  const [input, setInput] = useState('')
  const answered = selected !== null || (question.type === 'fill-blank' && input !== '')
  const [submitted, setSubmitted] = useState(false)

  const checkAnswer = () => {
    if (question.type === 'fill-blank') {
      setSelected(input.trim())
    }
    setSubmitted(true)
  }

  const isCorrect = () => {
    const userAnswer = question.type === 'fill-blank' ? input.trim() : selected
    if (!userAnswer) return false
    const answer = question.answer.toLowerCase()
    const user = userAnswer.toLowerCase()
    // fill-blank: 쉼표로 구분된 답 모두 포함 여부
    if (question.type === 'fill-blank' && answer.includes(',')) {
      const parts = answer.split(',').map((s) => s.trim())
      return parts.every((part) => user.includes(part))
    }
    return user === answer || user.includes(answer) || answer.includes(user)
  }

  const typeLabel = question.type === 'complexity-match' ? '복잡도' : question.type === 'output-prediction' ? '출력 예측' : '빈칸 채우기'

  return (
    <div className="border border-gray-200 rounded-lg p-4">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-xs font-medium px-2 py-0.5 rounded bg-violet-100 text-violet-700">
          {typeLabel}
        </span>
      </div>
      <p className="text-sm font-medium text-gray-800 mb-3">{question.question}</p>

      {question.options ? (
        <div className="space-y-2">
          {question.options.map((option) => {
            let style = 'bg-gray-50 border-gray-200 hover:bg-gray-100 text-gray-700'
            if (submitted) {
              if (option === question.answer) {
                style = 'bg-green-50 border-green-300 text-green-800'
              } else if (option === selected) {
                style = 'bg-red-50 border-red-300 text-red-800'
              }
            } else if (option === selected) {
              style = 'bg-blue-50 border-blue-300 text-blue-700'
            }
            return (
              <button
                key={option}
                onClick={() => { if (!submitted) { setSelected(option); setSubmitted(true) } }}
                className={`w-full text-left text-sm px-3 py-2 rounded-lg border transition-colors ${style}`}
              >
                {option}
              </button>
            )
          })}
        </div>
      ) : (
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter' && input.trim()) checkAnswer() }}
            disabled={submitted}
            placeholder="답을 입력하세요..."
            className="flex-1 text-sm border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-blue-300 disabled:bg-gray-50"
          />
          {!submitted && (
            <button
              onClick={checkAnswer}
              disabled={!answered}
              className="text-sm font-medium px-4 py-2 bg-blue-100 text-blue-700 hover:bg-blue-200 rounded-lg transition-colors disabled:opacity-50"
            >
              확인
            </button>
          )}
        </div>
      )}

      {submitted && (
        <div className={`mt-3 text-sm rounded-lg p-3 ${isCorrect() ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
          <span className="font-medium">{isCorrect() ? '정답!' : `오답 — 정답: ${question.answer}`}</span>
          <p className="mt-1 text-xs opacity-80">{question.explanation}</p>
        </div>
      )}
    </div>
  )
}

export default function QuizSection({ categoryId, patternId }: Props) {
  const quizzes = getQuizzes(categoryId, patternId)

  if (quizzes.length === 0) return null

  return (
    <section className="mb-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-3">셀프 테스트</h2>
      <div className="space-y-3">
        {quizzes.map((q) => (
          <QuizItem key={q.id} question={q} />
        ))}
      </div>
    </section>
  )
}
