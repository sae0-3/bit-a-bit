import { create } from 'zustand'

import { SolutionState } from '../types/solutions'

export const useSolutionStore = create<SolutionState>((set) => ({
  answerList: [],

  addToAnswer: (item) => {
    set(state => ({
      answerList: [...state.answerList, item],
    }))
  },

  removeFromAnswer: (itemId) => {
    set((state) => ({
      answerList: state.answerList.filter((item) => item.id !== itemId),
    }))
  },

  reorderAnswer: (oldIndex, newIndex) => {
    set((state) => {
      const newList = [...state.answerList]
      const [removed] = newList.splice(oldIndex, 1)
      newList.splice(newIndex, 0, removed)

      return {
        answerList: newList,
      }
    })
  },

  clearAnswer: () => {
    set({
      answerList: [],
    })
  },
}))
