import { Navigate } from 'react-router-dom'

import { ThemeToggle } from '../../../theme'
import { ROUTES } from '../../../../router/routes'
import { LoginForm } from '../components/login-form'
import { useAuthStore } from '../stores/auth.store'

export function LoginPage() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)

  if (isAuthenticated) {
    return <Navigate to={ROUTES.HOME} replace />
  }

  return (
    <section className="relative flex flex-col gap-8 rounded-2xl border border-border bg-surface p-8 shadow-sm">
      <div className="absolute right-4 top-4">
        <ThemeToggle labels={false} />
      </div>

      <div className="flex flex-col items-center gap-3 text-center">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold text-text">Iniciar sesión</h1>
          <p className="text-sm text-text-secondary">Accede a tu Pokédex</p>
        </div>
      </div>

      <LoginForm />
    </section>
  )
}
