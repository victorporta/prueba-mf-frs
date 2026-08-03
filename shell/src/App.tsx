import { Component, lazy, Suspense, type ErrorInfo, type ReactNode } from 'react'

const PokemonDetail = lazy(() => import('pokemon-detail/PokemonDetail'))
const PokemonHistory = lazy(() => import('pokemon-history/PokemonHistory'))

class RemoteErrorBoundary extends Component<
  { children: ReactNode },
  { error: Error | null }
> {
  state: { error: Error | null } = { error: null }

  static getDerivedStateFromError(error: Error) {
    return { error }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Failed to load remote module', error, info)
  }

  render() {
    if (this.state.error) {
      return (
        <div role="alert">
          <p>No se pudo cargar un microfrontend.</p>
          <pre>{this.state.error.message}</pre>
          <p>
            Asegúrate de servir los remotes con <code>npm run serve</code> (build +
            preview) en los puertos 3001 y 3002.
          </p>
        </div>
      )
    }
    return this.props.children
  }
}

function App() {
  return (
    <>
      <h1>Shell</h1>
      <RemoteErrorBoundary>
        <Suspense fallback={<div>Loading...</div>}>
          <PokemonDetail />
          <PokemonHistory />
        </Suspense>
      </RemoteErrorBoundary>
    </>
  )
}

export default App
