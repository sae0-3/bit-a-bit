import { create } from 'zustand'

import { SolutionState } from '../types/solutions'

export const useSolutionStore = create<SolutionState>((set, get) => ({
  initialSequence: [],
  finalSequence: [],
  sequenceIds: [],
  answerList: [],
  answerCodes: [],
  lastSequenceIds: [],

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

  setFinalSequence: (sequence) => {
    set({ finalSequence: sequence })
  },

  clearAnswer: () => {
    const initial = get().initialSequence;
    set({
      answerList: [],
      answerCodes: [],
      finalSequence: initial,
    })
    get().setInitialIds(initial);
  },

  setInitialSequence: (sequence) => {
    const newIds = sequence.map((_, i) => `card-${i}`);
    set({
      initialSequence: sequence,
      finalSequence: sequence,
      sequenceIds: newIds,
      lastSequenceIds: [...newIds],
    })
  },

  setInitialIds: (sequence) => {
    const newIds = sequence.map((_, i) => `card-${i}`);
    set({
      sequenceIds: newIds,
      lastSequenceIds: [...newIds]
    });
  },

  setSequenceIds: (ids) => {
    const currentIds = get().sequenceIds;
    set({
      sequenceIds: ids,
      lastSequenceIds: [...currentIds],
    })
  },

  setLastSequenceIds: (ids) => {
    set({ lastSequenceIds: ids })
  }
}))
