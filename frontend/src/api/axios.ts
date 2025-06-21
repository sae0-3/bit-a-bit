import axios from 'axios'

import { useAuthStore } from '../stores/auth.store'

const api = axios.create({
  baseURL: 'http://localhost:3000',
})

api.interceptors.request.use((config) => {
  const { token } = useAuthStore.getState()

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

export default api
