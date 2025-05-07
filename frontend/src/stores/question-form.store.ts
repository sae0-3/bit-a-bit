import { create } from 'zustand'

interface QuestionFormStore {
  description: string
  images: string[]
  options: string[]

  setDescription: (description: string) => void
  setImages: (images: string[]) => void
  addImage: (image: string) => void
  removeImage: (index: number) => void
  setOptions: (options: string[]) => void
  addOption: (option: string) => void
  removeOption: (index: number) => void
  resetForm: () => void
}

export const useQuestionFormStore = create<QuestionFormStore>((set) => ({
  description: '',
  images: [],
  options: [],

  setDescription: (description) => set({ description }),

  setImages: (images) => set({ images }),

  addImage: (image) =>
    set((state) => ({ images: [...state.images, image] })),

  removeImage: (index) =>
    set((state) => ({
      images: state.images.filter((_, i) => i !== index)
    })),

  setOptions: (options) => set({ options }),

  addOption: (option) =>
    set((state) => ({ options: [...state.options, option] })),

  removeOption: (index) =>
    set((state) => ({
      options: state.options.filter((_, i) => i !== index)
    })),

  resetForm: () => set({
    description: '',
    images: [],
    options: []
  }),
}))
