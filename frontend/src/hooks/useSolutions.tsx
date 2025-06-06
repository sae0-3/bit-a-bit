import { useMutation, useQuery } from '@tanstack/react-query'

import api from '../api/axios'
import { queryClient } from '../lib/queryClient'
import { useAuthStore } from '../stores/auth.store'
import {
  CreateSolution,
  CreateSolutionResponse,
  SolutionsResponse,
} from '../types/solutions'

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

  return useMutation({
    mutationFn: async (data: CreateSolution) => {
      const res = await api.post<CreateSolutionResponse>('/solutions', data)
      return res.data
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['solutions', data.question.id, user?.id]
      })
    }
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

export const useDeleteSolutionById = (solutionId: string, questionId: string) => {
  const { user } = useAuthStore()

  return useMutation({
    mutationFn: async () => {
      await api.delete(`/solutions/${solutionId}`)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['solutions', questionId, user?.id]
      })
    },
  })
}
