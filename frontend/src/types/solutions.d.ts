import { QuestionResponse } from './question'

export interface SolutionsResponse {
  id: string
  path: Array<string>
  final_sequence: Array<string | number>
  created_at: string
  updated_at: string
}

export interface CreateSolution {
  question_id: string
  path: Array<string>
}

export interface CreateSolutionResponse {
  id: string
  question: Omit<QuestionResponse, 'patterns'>
  path: Array<string>
  final_sequence: Array<string | number>
  created_at: string
  updated_at: string
}
