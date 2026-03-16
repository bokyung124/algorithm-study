import { useState, useEffect, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import { useAuth } from '@/contexts/AuthContext'
import { calculateNextReview } from '@/lib/spaced-repetition'
import type { Quality } from '@/lib/spaced-repetition'
import type { StudyRecord } from '@/types/review'

export function useStudyRecord(categoryId: string, patternId: string) {
  const supabase = createClient()
  const { user } = useAuth()
  const [record, setRecord] = useState<StudyRecord | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) return
    setLoading(true)
    supabase
      .from('study_records')
      .select('*')
      .eq('user_id', user.id)
      .eq('category_id', categoryId)
      .eq('pattern_id', patternId)
      .maybeSingle()
      .then(({ data }) => {
        setRecord(data as StudyRecord | null)
        setLoading(false)
      })
  }, [user, categoryId, patternId])

  const recordStudy = useCallback(async (quality: Quality) => {
    if (!user) return
    const currentRecord = record ?? {
      review_count: 0,
      interval_days: 1,
      ease_factor: 2.5,
    }

    const next = calculateNextReview(
      currentRecord.review_count,
      currentRecord.interval_days,
      currentRecord.ease_factor,
      quality,
    )

    const { data, error } = await supabase
      .from('study_records')
      .upsert(
        {
          user_id: user.id,
          category_id: categoryId,
          pattern_id: patternId,
          studied_at: new Date().toISOString(),
          review_count: (currentRecord.review_count ?? 0) + 1,
          ease_factor: next.easeFactor,
          interval_days: next.intervalDays,
          next_review_at: next.nextReviewAt,
        },
        { onConflict: 'user_id,category_id,pattern_id' },
      )
      .select()
      .single()

    if (!error && data) {
      setRecord(data as StudyRecord)
    }
    return { error }
  }, [user, record, categoryId, patternId])

  return { record, loading, recordStudy }
}

export function useTodayReviews() {
  const supabase = createClient()
  const { user } = useAuth()
  const [records, setRecords] = useState<StudyRecord[]>([])
  const [loading, setLoading] = useState(true)

  const fetchReviews = useCallback(async () => {
    if (!user) return
    setLoading(true)
    const { data } = await supabase
      .from('study_records')
      .select('*')
      .eq('user_id', user.id)
      .lte('next_review_at', new Date().toISOString())
      .order('next_review_at', { ascending: true })

    setRecords((data as StudyRecord[]) ?? [])
    setLoading(false)
  }, [user])

  useEffect(() => {
    fetchReviews()
  }, [fetchReviews])

  return { records, loading, refetch: fetchReviews }
}
