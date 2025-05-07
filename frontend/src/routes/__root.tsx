import {
  createRootRoute,
  createRoute,
  createRouter,
  Outlet
} from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

import App from '../App'
import { Header } from '../components/Header'
import CreateQuestion from '../pages/CreateQuestion'
import ViewStudent from '../pages/ViewStudent'

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

const viewStudentRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/view-student',
  component: () => <ViewStudent />,
})

const routeTree = rootRoute.addChildren([
  indexRoute,
  createQuestionRoute,
  viewStudentRoute,
])

export const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
