import { LoginPage, ProtectedRoute } from '../features/auth'
import { HomePage } from '../features/pokemon'
import { AuthLayout, MainLayout } from '../layouts'
import { ROUTES } from './routes'
import { RemoteErrorBoundary } from './RemoteErrorBoundary'
import { lazy, Suspense, useMemo, useState, type ComponentType } from 'react'
import { Navigate, Route, Routes, useParams } from 'react-router-dom'

const PokemonDetail = lazy(() => import('pokemon-detail/PokemonDetail'))

function loadHistoryRemote() {
  return import('pokemon-history/PokemonHistory').catch((error: unknown) => {
    console.error('Failed to load pokemon-history remote', error)
    return Promise.reject(
      error instanceof Error
        ? error
        : new Error('El historial no está disponible'),
    )
  })
}

function RemoteFallback() {
  return (
    <div
      className="h-64 animate-pulse rounded-2xl bg-surface-secondary"
      aria-hidden
    />
  )
}

function PokemonDetailRoute() {
  const { id } = useParams()
  const pokemonId = Number(id)
  const resolvedId =
    Number.isFinite(pokemonId) && pokemonId > 0 ? pokemonId : undefined

  return (
    <RemoteErrorBoundary
      title="No pudimos mostrar el detalle"
      message="Hubo un problema al cargar la información de este Pokémon. Inténtalo de nuevo en unos momentos."
    >
      <Suspense fallback={<RemoteFallback />}>
        <PokemonDetail id={resolvedId} />
      </Suspense>
    </RemoteErrorBoundary>
  )
}

function PokemonHistoryRoute() {
  const [retryKey, setRetryKey] = useState(0)

  const PokemonHistory = useMemo(
    () =>
      lazy(loadHistoryRemote) as ComponentType,
    [retryKey],
  )

  return (
    <RemoteErrorBoundary
      key={retryKey}
      title="No pudimos mostrar el historial"
      message="Hubo un problema al cargar tu historial de Pokémon. Inténtalo de nuevo en unos momentos."
      onRetry={() => setRetryKey((key) => key + 1)}
    >
      <Suspense fallback={<RemoteFallback />}>
        <PokemonHistory />
      </Suspense>
    </RemoteErrorBoundary>
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

        <Route path={ROUTES.HISTORY} element={<PokemonHistoryRoute />} />
      </Route>

      <Route path="*" element={<Navigate to={ROUTES.HOME} replace />} />
    </Routes>
  )
}
