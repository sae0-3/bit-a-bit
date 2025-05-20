import { Answer, Option } from './form-question'

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
