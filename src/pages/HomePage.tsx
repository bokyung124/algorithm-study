import { Link } from 'react-router-dom'
import { categories } from '../data/categories'
import { useTodayReviews } from '../hooks/useStudyRecords'

export default function HomePage() {
  const { records, loading: reviewLoading } = useTodayReviews()

  return (
    <div>
      {/* Review Summary */}
      {!reviewLoading && records.length > 0 && (
        <Link
          to="/review"
          className="flex items-center gap-3 bg-amber-50 border border-amber-200 hover:border-amber-300 rounded-lg px-4 py-3 mb-6 transition-colors group"
        >
          <span className="text-xl">🔄</span>
          <div className="flex-1">
            <span className="text-sm font-medium text-amber-800">
              오늘 복습할 패턴이 {records.length}개 있습니다
            </span>
          </div>
          <span className="text-sm text-amber-600 group-hover:text-amber-700">복습하기 →</span>
        </Link>
      )}

      <h1 className="text-2xl font-bold text-gray-900 mb-2">알고리즘 유형별 학습</h1>
      <p className="text-gray-500 mb-6">코딩테스트에 자주 출제되는 알고리즘 유형을 Python으로 학습하세요.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((cat) => (
          <Link
            key={cat.id}
            to={`/category/${cat.id}`}
            className="group bg-white rounded-xl border border-gray-200 p-5 hover:border-blue-300 hover:shadow-md transition-all"
          >
            <div className="text-3xl mb-3">{cat.icon}</div>
            <h2 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
              {cat.name}
            </h2>
            <p className="text-sm text-gray-500 mt-1 line-clamp-2">{cat.description}</p>
            <div className="mt-3 text-xs text-gray-400">
              {cat.patterns.length}개 패턴
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
