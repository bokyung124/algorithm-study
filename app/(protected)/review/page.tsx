'use client'

import Link from 'next/link'
import { useTodayReviews } from '@/hooks/useStudyRecords'
import { getCategoryById } from '@/data/categories'

export default function ReviewPage() {
  const { records, loading } = useTodayReviews()

  if (loading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="animate-pulse h-16 bg-gray-100 rounded-lg" />
        ))}
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">오늘의 복습</h1>
      <p className="text-gray-500 mb-6">
        스페이스드 리피티션 기반으로 복습할 패턴을 추천합니다.
      </p>

      {records.length === 0 ? (
        <div className="text-center py-16">
          <div className="text-4xl mb-4">🎉</div>
          <p className="text-gray-500 mb-2">오늘 복습할 패턴이 없습니다!</p>
          <p className="text-sm text-gray-400">
            패턴을 학습하면 복습 스케줄이 자동으로 생성됩니다.
          </p>
          <Link
            href="/"
            className="inline-block mt-4 text-sm text-blue-600 hover:text-blue-700"
          >
            학습하러 가기 →
          </Link>
        </div>
      ) : (
        <>
          <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 mb-6">
            <span className="text-sm font-medium text-amber-800">
              복습 대기: {records.length}개 패턴
            </span>
          </div>

          <div className="space-y-2">
            {records.map((record) => {
              const category = getCategoryById(record.category_id)
              const pattern = category?.patterns.find((p) => p.id === record.pattern_id)
              if (!category || !pattern) return null

              const daysOverdue = Math.floor(
                (Date.now() - new Date(record.next_review_at).getTime()) / (1000 * 60 * 60 * 24),
              )

              return (
                <Link
                  key={record.id}
                  href={`/category/${record.category_id}/${record.pattern_id}`}
                  className="flex items-center gap-3 bg-white border border-gray-200 hover:border-blue-300 hover:shadow-sm rounded-lg px-4 py-3 transition-all group"
                >
                  <span className="text-xl shrink-0">{category.icon}</span>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                      {pattern.name}
                    </div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs text-gray-400">{category.name}</span>
                      <span className="text-xs text-gray-300">·</span>
                      <span className="text-xs text-gray-400">{record.review_count}회 학습</span>
                    </div>
                  </div>
                  <div className="shrink-0">
                    {daysOverdue > 0 ? (
                      <span className="text-xs font-medium text-red-600 bg-red-50 px-2 py-1 rounded">
                        {daysOverdue}일 지남
                      </span>
                    ) : (
                      <span className="text-xs font-medium text-amber-600 bg-amber-50 px-2 py-1 rounded">
                        오늘
                      </span>
                    )}
                  </div>
                  <svg className="w-4 h-4 text-gray-300 group-hover:text-blue-400 shrink-0 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              )
            })}
          </div>
        </>
      )}
    </div>
  )
}
