import { QuestionResponse } from './question'

export interface Item {
  id: string
  value: string
}

export interface SolutionState {
  initialSequence: Array<string>
  finalSequence: Array<string>
  answerList: Item[]
  answerCodes: Array<string>

  setInitialSequence: (sequence: Array<string>) => void
  setFinalSequence: (sequence: Array<string>) => void
  addToAnswer: (item: Item) => void
  removeFromAnswer: (itemId: string) => void
  reorderAnswer: (oldIndex: number, newIndex: number) => void
  clearAnswer: () => void
}

export interface SolutionsResponse {
  id: string
  path: Array<string>
  final_sequence: Array<string | number>
  created_at: string
  updated_at: string
}

export interface CreateSolutionResponse {
  id: string
  question: Omit<QuestionResponse, 'patterns'>
  path: Array<string>
  final_sequence: Array<string | number>
  created_at: string
  updated_at: string
}
