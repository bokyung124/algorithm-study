export type Quality = 'hard' | 'normal' | 'easy'

const qualityMap: Record<Quality, number> = {
  hard: 2,
  normal: 3,
  easy: 5,
}

export function calculateNextReview(
  reviewCount: number,
  intervalDays: number,
  easeFactor: number,
  quality: Quality,
): { intervalDays: number; easeFactor: number; nextReviewAt: string } {
  const q = qualityMap[quality]

  let newInterval: number
  let newEase = easeFactor + (0.1 - (5 - q) * (0.08 + (5 - q) * 0.02))

  if (newEase < 1.3) newEase = 1.3

  if (q < 3) {
    // 어려움: 처음부터 다시
    newInterval = 1
  } else if (reviewCount === 0) {
    newInterval = 1
  } else if (reviewCount === 1) {
    newInterval = 3
  } else {
    newInterval = Math.round(intervalDays * newEase)
    if (quality === 'easy') {
      newInterval = Math.round(newInterval * 1.3)
    }
  }

  const next = new Date()
  next.setDate(next.getDate() + newInterval)

  return {
    intervalDays: newInterval,
    easeFactor: Math.round(newEase * 100) / 100,
    nextReviewAt: next.toISOString(),
  }
}

export function isDueForReview(nextReviewAt: string): boolean {
  return new Date(nextReviewAt) <= new Date()
}

export function getQualityLabel(quality: Quality): string {
  switch (quality) {
    case 'hard': return '어려움'
    case 'normal': return '보통'
    case 'easy': return '쉬움'
  }
}

export function getQualityColor(quality: Quality): string {
  switch (quality) {
    case 'hard': return 'bg-red-100 text-red-700 hover:bg-red-200'
    case 'normal': return 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
    case 'easy': return 'bg-green-100 text-green-700 hover:bg-green-200'
  }
}
