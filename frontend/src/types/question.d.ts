import { PatternResponse } from './patterns'

export interface QuestionFormStore {
  title: string
  description: string
  images: string[]
  initialNumber: string[]

  setTitle: (title: string) => void
  setDescription: (description: string) => void
  setImages: (images: string[]) => void
  addImage: (image: string) => void
  removeImage: (index: number) => void

  resetForm: () => void

  setInitialNumber: (number: string[]) => void
}

export interface QuestionResponse {
  id: string
  title: string
  description: string | null
  initial_sequence: Array<string>
  min_age: number | null
  max_age: number | null
  updated_at: string
  created_at: string
  patterns: Array<PatternResponse>
}

export interface CreateQuestion {
  title: string
  description?: string | null
  initial_sequence: Array<string>
  min_age?: number | null
  max_age?: number | null
  pattern_ids?: Array<number>
}

export type UpdateQuestion = Partial<CreateQuestion>
