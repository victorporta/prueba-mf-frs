// app/router/AppRouter.tsx

import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'

import { LoginPage } from '../features/auth'
import { HomePage } from '../features/pokemon'
import { AuthLayout, MainLayout } from '../layouts'
import { ProtectedRoute } from './ProtectedRoute'
import { ROUTES } from './routes'

const PokemonDetail = lazy(() => import('pokemon-detail/PokemonDetail'))
const PokemonHistory = lazy(() => import('pokemon-history/PokemonHistory'))

export function AppRouter() {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path={ROUTES.LOGIN} element={<LoginPage />} />
      </Route>

      <Route
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route path={ROUTES.HOME} element={<HomePage />} />

        <Route
          path={ROUTES.POKEMON_DETAIL}
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <PokemonDetail />
            </Suspense>
          }
        />

        <Route
          path={ROUTES.HISTORY}
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <PokemonHistory />
            </Suspense>
          }
        />
      </Route>

      <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
    </Routes>
  )
}
