export type QuizType = 'complexity-match' | 'output-prediction' | 'fill-blank'

export interface QuizQuestion {
  id: string
  type: QuizType
  question: string
  options?: string[]
  answer: string
  explanation: string
}
