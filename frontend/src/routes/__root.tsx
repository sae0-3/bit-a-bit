import { createRootRoute, Outlet, useLocation } from '@tanstack/react-router'

import { Header } from '../components/Header'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  const location = useLocation()

  const routesWithoutHeader = ['/login', '/register']
  const shouldShowHeader = !routesWithoutHeader.includes(location.pathname)

  return (
    <>
      {shouldShowHeader && <Header />}
      <main>
        <Outlet />
      </main>
    </>
  )
}
