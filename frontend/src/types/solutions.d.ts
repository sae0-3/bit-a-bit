import { QuestionResponse } from './question'

export interface Item {
  id: string
  value: string
}

export interface SolutionState {
  initialSequence: Array<string>
  finalSequence: Array<string>
  sequenceIds: Array<string>
  answerList: Item[]
  answerCodes: Array<string>
  lastSequenceIds: Array<string>

  setInitialSequence: (sequence: Array<string>) => void
  setFinalSequence: (sequence: Array<string>) => void
  setSequenceIds: (ids: Array<string>) => void
  setInitialIds: (sequence: Array<string>) => void
  setLastSequenceIds: (ids: Array<string>) => void
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

export interface ValidateSolutionResponse {
  valid: boolean
  message: string
}
