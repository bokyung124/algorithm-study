'use client'

import { useState } from 'react'
import { useStudyRecord } from '@/hooks/useStudyRecords'
import { getQualityLabel, getQualityColor } from '@/lib/spaced-repetition'
import type { Quality } from '@/lib/spaced-repetition'

interface Props {
  categoryId: string
  patternId: string
}

const qualities: Quality[] = ['hard', 'normal', 'easy']

export default function StudyButton({ categoryId, patternId }: Props) {
  const { record, loading, recordStudy } = useStudyRecord(categoryId, patternId)
  const [saving, setSaving] = useState(false)
  const [showButtons, setShowButtons] = useState(false)

  if (loading) return null

  const handleStudy = async (quality: Quality) => {
    setSaving(true)
    await recordStudy(quality)
    setSaving(false)
    setShowButtons(false)
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    const today = new Date()
    const diff = Math.ceil((date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
    if (diff <= 0) return '오늘'
    if (diff === 1) return '내일'
    return `${diff}일 후`
  }

  if (showButtons) {
    return (
      <div className="flex items-center gap-1.5">
        {qualities.map((q) => (
          <button
            key={q}
            onClick={() => handleStudy(q)}
            disabled={saving}
            className={`text-xs font-medium px-2 py-1 rounded-md transition-colors ${getQualityColor(q)} disabled:opacity-50`}
          >
            {getQualityLabel(q)}
          </button>
        ))}
        <button
          onClick={() => setShowButtons(false)}
          className="text-xs text-gray-400 hover:text-gray-600 ml-0.5"
        >
          취소
        </button>
      </div>
    )
  }

  if (record) {
    return (
      <button
        onClick={() => setShowButtons(true)}
        className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-md bg-amber-100 text-amber-700 hover:bg-amber-200 transition-colors shrink-0"
      >
        <span>학습 완료</span>
        <span className="text-amber-500">·</span>
        <span className="text-amber-500 font-normal">{record.review_count}회 · 복습 {formatDate(record.next_review_at)}</span>
      </button>
    )
  }

  return (
    <button
      onClick={() => setShowButtons(true)}
      className="inline-flex items-center text-xs font-medium px-2.5 py-1 rounded-md bg-gray-100 text-gray-500 hover:bg-gray-200 transition-colors shrink-0"
    >
      학습 전
    </button>
  )
}
