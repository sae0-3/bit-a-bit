import { createRootRoute, Outlet } from '@tanstack/react-router'

export const Route = createRootRoute({
  component: () => (
    <div className="min-h-screen bg-gradient-to-br from-primary-light via-secondary-2/20 to-secondary-1/20">
      <Outlet />
    </div>
  ),
})
