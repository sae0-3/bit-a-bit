import { arrayMove } from '@dnd-kit/sortable'
import { create } from 'zustand'

import { Option, Response } from '../types/form-question'

interface QuestionFormStore {
  title: string
  description: string
  images: string[]
  options: Option[]
  responses: Response[]

  setTitle: (title: string) => void
  setDescription: (description: string) => void
  setImages: (images: string[]) => void
  addImage: (image: string) => void
  removeImage: (index: number) => void

  setOptions: (options: Option[]) => void
  addOption: (value: string) => void
  removeOption: (id: string) => void

  addResponse: (response: Omit<Response, 'id'>) => void
  removeResponse: (id: string) => void

  resetForm: () => void
  getOptionById: (id: string) => Option | undefined
}

export const useQuestionFormStore = create<QuestionFormStore>((set, get) => ({
  title: '',
  description: '',
  images: [],
  options: [],
  responses: [],

  setTitle: (title) => set({ title }),

  setDescription: (description) => set({ description }),

  setImages: (images) => set({ images }),

  addImage: (image) => set((state) => ({
    images: [...state.images, image]
  })),

  removeImage: (index) => set((state) => ({
    images: state.images.filter((_, i) => i !== index)
  })),

  setOptions: (options) => set({ options }),

  addOption: (value) => set((state) => ({
    options: [
      ...state.options,
      {
        id: crypto.randomUUID(),
        value,
      }
    ]
  })),

  removeOption: (id) => set((state) => ({
    options: state.options.filter(opt => opt.id !== id)
  })),

  reorderOptions: (activeId: string, overId: string) => {
    set((state) => {
      const oldIndex = state.options.findIndex(opt => opt.id === activeId)
      const newIndex = state.options.findIndex(opt => opt.id === overId)

      if (oldIndex === -1 || newIndex === -1 || oldIndex === newIndex) {
        return state
      }

      return {
        options: arrayMove(state.options, oldIndex, newIndex)
          .map((opt) => ({ ...opt }))
      }
    })
  },

  addResponse: (response) => set((state) => ({
    responses: [
      ...state.responses,
      {
        ...response,
        id: crypto.randomUUID(),
      }
    ]
  })),

  removeResponse: (id) => set((state) => ({
    responses: state.responses.filter(res => res.id !== id)
  })),

  resetForm: () => set({
    title: '',
    description: '',
    images: [],
    options: [],
    responses: [],
  }),

  getOptionById: (id) => get().options.find(opt => opt.id === id)
}))
