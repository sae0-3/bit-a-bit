import { createRootRoute, Outlet } from '@tanstack/react-router'

export const Route = createRootRoute({
  component: () => (
    <div className="min-h-screen bg-gradient-to-br from-primary-light via-secondary-1/10 to-secondary-2/10">
      <Outlet />
    </div>
  ),
})
