import { useState, useEffect, useRef, useCallback } from 'react'
import { supabase } from '../../lib/supabase'
import { useAuth } from '../../contexts/AuthContext'

interface MemoEditorProps {
  categoryId: string
  patternId: string
}

export default function MemoEditor({ categoryId, patternId }: MemoEditorProps) {
  const { user } = useAuth()
  const [content, setContent] = useState('')
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle')
  const [loading, setLoading] = useState(true)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (!user) return
    setLoading(true)
    supabase
      .from('memos')
      .select('content')
      .eq('user_id', user.id)
      .eq('category_id', categoryId)
      .eq('pattern_id', patternId)
      .maybeSingle()
      .then(({ data }) => {
        if (data) setContent(data.content)
        setLoading(false)
      })
  }, [user, categoryId, patternId])

  const saveMemo = useCallback(async (text: string) => {
    if (!user) return
    setSaveStatus('saving')
    const { error } = await supabase.from('memos').upsert(
      {
        user_id: user.id,
        category_id: categoryId,
        pattern_id: patternId,
        content: text,
      },
      { onConflict: 'user_id,category_id,pattern_id' }
    )
    setSaveStatus(error ? 'error' : 'saved')
  }, [user, categoryId, patternId])

  const handleChange = (text: string) => {
    setContent(text)
    setSaveStatus('idle')
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => saveMemo(text), 800)
  }

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  if (loading) {
    return <div className="animate-pulse h-32 bg-gray-100 rounded-lg" />
  }

  return (
    <div className="border border-gray-200 rounded-lg bg-white">
      <div className="flex items-center justify-between px-4 py-2 border-b border-gray-100">
        <span className="text-sm font-medium text-gray-700">내 메모</span>
        <span className="text-xs text-gray-400">
          {saveStatus === 'saving' && '저장 중...'}
          {saveStatus === 'saved' && '저장됨'}
          {saveStatus === 'error' && '저장 실패'}
        </span>
      </div>
      <textarea
        value={content}
        onChange={(e) => handleChange(e.target.value)}
        placeholder="이 패턴에 대한 메모를 작성하세요..."
        className="w-full p-4 text-sm text-gray-700 placeholder-gray-400 resize-y min-h-[120px] outline-none rounded-b-lg"
      />
    </div>
  )
}
