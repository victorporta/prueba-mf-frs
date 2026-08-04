import { Navigate } from 'react-router-dom'
import type { ReactNode } from 'react'

import { ROUTES } from '../../../../router/routes'
import { useAuthStore } from '../stores/auth.store'

type ProtectedRouteProps = {
  children: ReactNode
}

export function ProtectedRoute({
  children,
}: Readonly<ProtectedRouteProps>) {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace />
  }

  return children
}
