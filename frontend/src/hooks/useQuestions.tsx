import { useMutation, useQuery } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'

import api from '../api/axios'
import { queryClient } from '../lib/queryClient'
import { useAuthStore } from '../stores/auth.store'
import { useQuestionFormStore } from '../stores/question-form.store'
import {
  QuestionResponse,
  UpdateQuestion,
} from '../types/question'

export const useGetQuestions = () => {
  const { user } = useAuthStore()

  return useQuery<Omit<QuestionResponse, 'patterns'>[]>({
    queryKey: ['questions', user?.id],
    queryFn: async () => {
      const res = await api.get('/questions')
      return res.data
    },
  })
}

export const useGetQuestionById = (id: string) => {
  const { user } = useAuthStore()

  return useQuery<QuestionResponse>({
    queryKey: ['question', id, user?.id],
    queryFn: async () => {
      const res = await api.get(`/questions/${id}`)
      return res.data
    },
  })
}

export const useCreateQuestion = () => {
  const { user } = useAuthStore()
  const { title, description, initialNumber, resetForm } = useQuestionFormStore()
  const navigate = useNavigate()

  return useMutation<Omit<QuestionResponse, 'patterns'>, void>({
    mutationFn: async () => {
      const res = await api.post('/questions', {
        title,
        description,
        initial_sequence: initialNumber,
      })
      return res.data
    },

    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['questions', user?.id]
      })
      navigate({
        to: '/questions/create/$questionId',
        params: { questionId: data.id }
      })
      resetForm()
    },

    onError: console.error,
  })
}

export const useUpdateQuestionById = (questionId: string) => {
  const { user } = useAuthStore()

  return useMutation({
    mutationFn: async (data: UpdateQuestion) => {
      const res = await api.patch(`/questions/${questionId}`, data)
      return res.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['questions', user?.id]
      })
    },
  })
}

export const useDeleteQuestionById = (questionId: string) => {
  const { user } = useAuthStore()

  return useMutation({
    mutationFn: async () => {
      await api.delete(`/questions/${questionId}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['questions', user?.id]
      })
    },
  })
}
