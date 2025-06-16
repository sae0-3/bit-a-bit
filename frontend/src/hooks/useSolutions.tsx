import { useMutation, useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'

import api from '../api/axios'
import { queryClient } from '../lib/queryClient'
import { useAuthStore } from '../stores/auth.store'
import { useSolutionStore } from '../stores/solutions.store'
import {
  CreateSolutionResponse,
  SolutionsResponse,
} from '../types/solutions'

export const useSolutionValidation = () => {
  const { answerList } = useSolutionStore()

  const answerCount = answerList.length
  const isValidAnswer = answerList.length > 0
  const canSubmit = isValidAnswer
  const validationMessage = !isValidAnswer ? 'Debe agregar al menos un patrón' : null

  return {
    isValidAnswer,
    answerCount,
    canSubmit,
    validationMessage,
  }
}

export const useGetSolutionsFromQuestion = (questionId: string) => {
  const { user } = useAuthStore()

  return useQuery<SolutionsResponse[]>({
    queryKey: ['solutions', questionId, user?.id],
    queryFn: async () => {
      const res = await api.get(`/solutions/question/${questionId}`)
      return res.data
    },
  })
}

export const useCreateSolution = () => {
  const { user } = useAuthStore()
  const { answerList, clearAnswer } = useSolutionStore()
  const patterns = answerList.map(answer => answer.id.split('-')[0])

  return useMutation<CreateSolutionResponse, AxiosError, string>({
    mutationFn: async (question_id) => {
      const res = await api.post<CreateSolutionResponse>('/solutions', {
        question_id,
        path: patterns,
      })
      return res.data
    },

    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['solutions', data.question.id, user?.id]
      })
      clearAnswer()
    },

    onError: console.error,
  })
}

export const useUpdateSolutionById = (solutionId: string) => {
  const { user } = useAuthStore()

  return useMutation({
    mutationFn: async (path: string) => {
      const res = await api.patch<CreateSolutionResponse>(`/solutions/${solutionId}`, { path })
      return res.data
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['solutions', data.question.id, user?.id]
      })
    }
  })
}

export const useDeleteSolutionById = (questionId: string) => {
  const { user } = useAuthStore()

  return useMutation<void, AxiosError, string>({
    mutationFn: async (solutionId) => {
      await api.delete(`/solutions/${solutionId}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['solutions', questionId, user?.id]
      })
    },
    onError: console.error,
  })
}

export const useTransformSequence = () => {
  const { initialSequence, setFinalSequence, answerCodes } = useSolutionStore()

  return useMutation<Array<string>, AxiosError, void>({
    mutationFn: async () => {
      const res = await api.post('/patterns/transform', {
        sequence: initialSequence,
        path: answerCodes
      })
      return res.data
    },

    onSuccess: (data) => {
      setFinalSequence(data)
    },

    onError: console.error,
  })
}

export const useGetRandomSolution = (questionId: string) => {
  const { user } = useAuthStore()

  return useQuery<SolutionsResponse>({
    queryKey: ['solutions', 'random', questionId, user?.id],
    queryFn: async () => {
      const res = await api.get(`/solutions/random/${questionId}`)
      return res.data
    },
  })
}
