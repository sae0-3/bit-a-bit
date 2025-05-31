import { arrayMove } from '@dnd-kit/sortable'
import { create } from 'zustand'

import { Answer, Option, predefinedOption } from '../types/form-question'

interface QuestionFormStore {
  title: string
  description: string
  images: string[]
  options: Option[]
  answers: Answer[]
  predefinedOptions: predefinedOption[]
  initialNumber: string[]
  resultNumber: string[]
  motionNumber: string[]

  setTitle: (title: string) => void
  setDescription: (description: string) => void
  setImages: (images: string[]) => void
  addImage: (image: string) => void
  removeImage: (index: number) => void

  setOptions: (options: Option[]) => void
  addOption: (value: string) => void
  removeOption: (id: string) => void

  addAnswer: (answer: Omit<Answer, 'id'>) => void
  removeAnswer: (id: string) => void

  resetForm: () => void
  getOptionById: (id: string) => predefinedOption | undefined

  setInitialNumber: (number: string[]) => void
  setResultNumber: (number: string[]) => void
  setMotionNumber: (number: string[]) => void
}

export const useQuestionFormStore = create<QuestionFormStore>((set, get) => ({
  title: '',
  description: '',
  images: [],
  options: [],
  answers: [],
  predefinedOptions: [
    { id: '1', value: 'Rotar a la izquierda', type: 'left' },
    { id: '2', value: 'Rotar a la derecha', type: 'right' },
    { id: '3', value: 'Simetría', type: 'mirror' }
  ],
  initialNumber: [],
  resultNumber: [],
  motionNumber: [],

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

  addAnswer: (answer) => set((state) => ({
    answers: [
      ...state.answers,
      {
        ...answer,
        id: crypto.randomUUID(),
      }
    ]
  })),

  removeAnswer: (id) => set((state) => ({
    answers: state.answers.filter(res => res.id !== id)
  })),

  resetForm: () => set({
    title: '',
    description: '',
    images: [],
    options: [],
    answers: [],
  }),

  getOptionById: (id) => get().predefinedOptions.find(opt => opt.id === id),

  setInitialNumber: (number: string[]) => set((state) => ({
    initialNumber: number.length > 0 ? number : state.initialNumber
  })),

  setResultNumber: (number: string[]) => set((state) => ({
    resultNumber: number.length > 0 ? number : state.resultNumber
  })),

  setMotionNumber: (number: string[]) => set((state) => ({
    motionNumber: number.length > 0 ? number : state.motionNumber
  })),
}))
