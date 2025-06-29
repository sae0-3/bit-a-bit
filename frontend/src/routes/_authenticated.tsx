import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

import { Header } from '../components/Header'
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

  component: () => (
    <>
      <Header />

      <main>
        <Outlet />
      </main>
    </>
  ),
})
