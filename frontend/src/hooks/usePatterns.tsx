import { useQuery } from '@tanstack/react-query'

import api from '../api/axios'
import {
  PatternResponse,
} from '../types/patterns'

export const useGetPatternsAvailable = () => {
  return useQuery<PatternResponse[]>({
    queryKey: ['patterns', 'active'],
    queryFn: async () => {
      const res = await api.get(`/patterns?active=true`)
      return res.data
    },
  })
}
