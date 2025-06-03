import { useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'

import api from '../api/axios'
import { useAuthStore } from '../stores/auth.store'
import { AuthResponse } from '../types/auth'

interface LoginInput {
  email: string
  password: string
}

export function useLogin() {
  const { login } = useAuthStore()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: async (data: LoginInput) => {
      const res = await api.post<AuthResponse>('/auth/login', data)
      return res.data.access_token
    },
    onSuccess: (token) => {
      login(token)
      navigate({
        to: '/',
        replace: true,
      })
    },
    onError: console.error,
  })
}
