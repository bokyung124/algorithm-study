import Link from 'next/link'
import { getRelatedPatterns, getRelatedPatternInfo } from '@/data/related-patterns'

interface Props {
  categoryId: string
  patternId: string
}

export default function RelatedPatterns({ categoryId, patternId }: Props) {
  const relatedPatterns = getRelatedPatterns(categoryId, patternId)

  if (relatedPatterns.length === 0) return null

  return (
    <section className="mb-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-3">관련 패턴</h2>
      <div className="space-y-2">
        {relatedPatterns.map((related) => {
          const info = getRelatedPatternInfo(related)
          if (!info) return null
          return (
            <Link
              key={`${related.categoryId}/${related.patternId}`}
              href={`/category/${related.categoryId}/${related.patternId}`}
              className="flex items-center gap-3 bg-gray-50 hover:bg-indigo-50 border border-gray-200 hover:border-indigo-200 rounded-lg px-4 py-3 transition-all group"
            >
              <span className="text-xl shrink-0">{info.category.icon}</span>
              <div className="min-w-0">
                <div className="text-sm font-medium text-gray-900 group-hover:text-indigo-600 transition-colors">
                  {info.pattern.name}
                  <span className="text-xs text-gray-400 ml-2">{info.category.name}</span>
                </div>
                <p className="text-xs text-gray-500 mt-0.5">{related.reason}</p>
              </div>
              <svg className="w-4 h-4 text-gray-300 group-hover:text-indigo-400 shrink-0 ml-auto transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
