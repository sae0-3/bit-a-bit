import {
  createRootRoute,
  createRoute,
  createRouter,
  Outlet
} from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

import App from '../App'
import CreateQuestion from '../pages/CreateQuestion'
import { Header } from '../components/Header'

export const rootRoute = createRootRoute({
  component: () => (
    <>
      <Header />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
})

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: () => <App />,
})

const createQuestionRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/create-question',
  component: () => <CreateQuestion />,
})

const routeTree = rootRoute.addChildren([
  indexRoute,
  createQuestionRoute,
])

export const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
