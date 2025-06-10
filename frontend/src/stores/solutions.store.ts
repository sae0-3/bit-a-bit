import { create } from 'zustand'

import { SolutionState } from '../types/solutions'

export const useSolutionStore = create<SolutionState>((set, get) => ({
  initialSequence: [],
  finalSequence: [],
  answerList: [],
  answerCodes: [],

  addToAnswer: (item) => {
    set((state) => {
      const updatedList = [...state.answerList, item]
      const updatedCodes = updatedList.map(i => i.id.split('-')[0])

      return {
        answerList: updatedList,
        answerCodes: updatedCodes,
      }
    })
  },

  removeFromAnswer: (itemId) => {
    set((state) => {
      const updatedList = state.answerList.filter(item => item.id !== itemId)
      const updatedCodes = updatedList.map(i => i.id.split('-')[0])

      return {
        answerList: updatedList,
        answerCodes: updatedCodes,
      }
    })
  },

  reorderAnswer: (oldIndex, newIndex) => {
    set((state) => {
      const newList = [...state.answerList]
      const [moved] = newList.splice(oldIndex, 1)
      newList.splice(newIndex, 0, moved)

      return {
        answerList: newList,
        answerCodes: newList.map(i => i.id.split('-')[0]),
      }
    })
  },

  clearAnswer: () => {
    set({
      answerList: [],
      answerCodes: [],
      finalSequence: get().initialSequence,
    })
  },

  setInitialSequence: (sequence) => {
    set({ initialSequence: sequence, finalSequence: sequence })
  },

  setFinalSequence: (sequence) => {
    set({ finalSequence: sequence })
  },
}))
