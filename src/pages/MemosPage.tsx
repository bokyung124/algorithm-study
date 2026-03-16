import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { supabase } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'
import { getCategoryById } from '../data/categories'
import type { Memo } from '../types/memo'

export default function MemosPage() {
  const { user } = useAuth()
  const [memos, setMemos] = useState<Memo[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) return
    supabase
      .from('memos')
      .select('*')
      .eq('user_id', user.id)
      .order('updated_at', { ascending: false })
      .then(({ data }) => {
        if (data) setMemos(data)
        setLoading(false)
      })
  }, [user])

  if (loading) {
    return <div className="text-gray-500 text-center py-12">로딩 중...</div>
  }

  if (memos.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 mb-2">아직 작성한 메모가 없습니다.</p>
        <Link to="/" className="text-blue-600 hover:underline text-sm">
          알고리즘 학습 시작하기
        </Link>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-900 mb-6">내 메모</h1>
      <div className="space-y-3">
        {memos.map((memo) => {
          const category = getCategoryById(memo.category_id)
          const pattern = category?.patterns.find((p) => p.id === memo.pattern_id)
          return (
            <Link
              key={memo.id}
              to={`/category/${memo.category_id}/${memo.pattern_id}`}
              className="block bg-white border border-gray-200 rounded-xl p-4 hover:border-blue-300 hover:shadow-md transition-all"
            >
              <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                <span>{category?.icon}</span>
                <span>{category?.name}</span>
                <span>/</span>
                <span className="text-gray-600 font-medium">{pattern?.name ?? memo.pattern_id}</span>
              </div>
              <p className="text-sm text-gray-700 line-clamp-3 whitespace-pre-wrap">{memo.content}</p>
              <p className="text-xs text-gray-400 mt-2">
                {new Date(memo.updated_at).toLocaleDateString('ko-KR')} 수정
              </p>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
