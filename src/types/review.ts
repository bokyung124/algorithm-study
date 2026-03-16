export interface StudyRecord {
  id: string
  user_id: string
  category_id: string
  pattern_id: string
  studied_at: string
  review_count: number
  ease_factor: number
  interval_days: number
  next_review_at: string
}
