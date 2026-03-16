'use client'

import { useParams } from 'next/navigation'
import Link from 'next/link'
import { getCategoryById } from '@/data/categories'
import ComplexityBadge from '@/components/algorithm/ComplexityBadge'

export default function CategoryPage() {
  const params = useParams<{ categoryId: string }>()
  const category = getCategoryById(params.categoryId ?? '')

  if (!category) {
    return <div className="text-center text-gray-500 py-12">카테고리를 찾을 수 없습니다.</div>
  }

  return (
    <div>
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-3xl">{category.icon}</span>
          <h1 className="text-2xl font-bold text-gray-900">{category.name}</h1>
        </div>
        <p className="text-gray-500">{category.description}</p>
      </div>

      <div className="space-y-3">
        {category.patterns.map((pattern) => (
          <Link
            key={pattern.id}
            href={`/category/${category.id}/${pattern.id}`}
            className="block bg-white rounded-xl border border-gray-200 p-5 hover:border-blue-300 hover:shadow-md transition-all"
          >
            <h3 className="font-semibold text-gray-900 mb-1">{pattern.name}</h3>
            <p className="text-sm text-gray-500 mb-3">{pattern.description}</p>
            <div className="flex flex-wrap gap-2">
              <ComplexityBadge label="시간" value={pattern.timeComplexity} variant="time" />
              <ComplexityBadge label="공간" value={pattern.spaceComplexity} variant="space" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
