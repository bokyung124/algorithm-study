import { Link } from 'react-router-dom'
import { categories } from '../data/categories'

export default function HomePage() {
  return (
    <div>
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
