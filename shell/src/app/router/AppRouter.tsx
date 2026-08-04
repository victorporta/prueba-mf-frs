import { LoginPage, ProtectedRoute } from '../features/auth'
import { HomePage } from '../features/pokemon'
import { AuthLayout, MainLayout } from '../layouts'
import { ROUTES } from './routes'
import { lazy, Suspense } from 'react'
import { Navigate, Route, Routes, useParams } from 'react-router-dom'

const PokemonDetail = lazy(() => import('pokemon-detail/PokemonDetail'))
const PokemonHistory = lazy(() => import('pokemon-history/PokemonHistory'))

function PokemonDetailRoute() {
  const { id } = useParams()
  const pokemonId = Number(id)
  const resolvedId =
    Number.isFinite(pokemonId) && pokemonId > 0 ? pokemonId : undefined

  return (
    <Suspense
      fallback={
        <div
          className="h-64 animate-pulse rounded-2xl bg-surface-secondary"
          aria-hidden
        />
      }
    >
      <PokemonDetail id={resolvedId} />
    </Suspense>
  )
}

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

        <Route path={ROUTES.POKEMON_DETAIL} element={<PokemonDetailRoute />} />

        <Route
          path={ROUTES.HISTORY}
          element={
            <Suspense
              fallback={
                <div
                  className="h-64 animate-pulse rounded-2xl bg-surface-secondary"
                  aria-hidden
                />
              }
            >
              <PokemonHistory />
            </Suspense>
          }
        />
      </Route>

      <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
    </Routes>
  )
}
