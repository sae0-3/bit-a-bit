import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

import { useAuthStore } from '../stores/auth.store'

export const Route = createFileRoute('/_authenticated')({
  beforeLoad: async ({ location }) => {
    const { isAuthenticated } = useAuthStore.getState()

    if (!isAuthenticated()) {
      throw redirect({
        to: '/login',
        search: {
          redirect: location.href,
        },
        replace: true,
      })
    }
  },

  component: Outlet,
})
