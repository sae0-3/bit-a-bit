import { useQuery } from '@tanstack/react-query'

import api from '../api/axios'
import { useAuthStore } from '../stores/auth.store'
import { QuestionResponse } from '../types/question'

export const useGetQuestions = () => {
  const { user } = useAuthStore()

  return useQuery<Omit<QuestionResponse, 'patterns'>[]>({
    queryKey: ['questions', user?.id],
    queryFn: async () => {
      const res = await api.get('/questions')
      return res.data
    }
  })
}
