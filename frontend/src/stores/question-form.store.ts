import { create } from 'zustand'

import { QuestionFormStore } from '../types/question'

export const useQuestionFormStore = create<QuestionFormStore>(set => ({
  title: '',
  description: '',
  images: [],
  initialNumber: [],

  setTitle: (title) => set({ title }),

  setDescription: (description) => set({ description }),

  setImages: (images) => set({ images }),

  addImage: (image) => set((state) => ({
    images: [...state.images, image]
  })),

  removeImage: (index) => set((state) => ({
    images: state.images.filter((_, i) => i !== index)
  })),

  resetForm: () => set({
    title: '',
    description: '',
    images: [],
    initialNumber: [],
  }),

  setInitialNumber: (number) => set({ initialNumber: number }),
}))
