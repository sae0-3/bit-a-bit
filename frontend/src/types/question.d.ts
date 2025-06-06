import { Answer, Option } from './form-question'
import { PatternResponse } from './patterns'

export interface Question {
  id: string
  title: string
  description: string | null
  images: string[] | null

  options: Option[]
  answers: Answer[]

  updated_at: string
  created_at: string
}

export interface QuestionResponse {
  id: string
  title: string
  description: string | null
  initial_sequence: Array<string | number>
  min_age: number | null
  max_age: number | null
  updated_at: string
  created_at: string
  patterns: Array<PatternResponse>
}
