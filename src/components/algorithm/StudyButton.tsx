import { useState } from 'react'
import { useStudyRecord } from '../../hooks/useStudyRecords'
import { getQualityLabel, getQualityColor } from '../../lib/spaced-repetition'
import type { Quality } from '../../lib/spaced-repetition'

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

  return (
    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-amber-800">학습 기록</h3>
          {record ? (
            <p className="text-xs text-amber-600 mt-0.5">
              {record.review_count}회 학습 · 다음 복습: {formatDate(record.next_review_at)}
            </p>
          ) : (
            <p className="text-xs text-amber-600 mt-0.5">아직 학습하지 않았습니다</p>
          )}
        </div>

        {!showButtons && (
          <button
            onClick={() => setShowButtons(true)}
            className="text-sm font-medium text-amber-700 bg-amber-100 hover:bg-amber-200 px-3 py-1.5 rounded-lg transition-colors"
          >
            학습 완료
          </button>
        )}
      </div>

      {showButtons && (
        <div className="mt-3 flex items-center gap-2">
          <span className="text-xs text-amber-700 mr-1">난이도:</span>
          {qualities.map((q) => (
            <button
              key={q}
              onClick={() => handleStudy(q)}
              disabled={saving}
              className={`text-xs font-medium px-3 py-1.5 rounded-lg transition-colors ${getQualityColor(q)} disabled:opacity-50`}
            >
              {getQualityLabel(q)}
            </button>
          ))}
          <button
            onClick={() => setShowButtons(false)}
            className="text-xs text-gray-400 hover:text-gray-600 ml-1"
          >
            취소
          </button>
        </div>
      )}
    </div>
  )
}
