import { Component, type ErrorInfo, type ReactNode } from 'react'

import { Button } from '../shared'

type RemoteErrorBoundaryProps = {
  children: ReactNode
  title?: string
  message?: string
  onRetry?: () => void
}

type RemoteErrorBoundaryState = {
  hasError: boolean
}

export class RemoteErrorBoundary extends Component<
  RemoteErrorBoundaryProps,
  RemoteErrorBoundaryState
> {
  state: RemoteErrorBoundaryState = { hasError: false }

  static getDerivedStateFromError(): RemoteErrorBoundaryState {
    return { hasError: true }
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error('Remote microfrontend failed to load', error, info)
  }

  private retry = () => {
    this.setState({ hasError: false })
    this.props.onRetry?.()
  }

  render() {
    if (this.state.hasError) {
      const {
        title = 'Algo salió mal',
        message = 'No pudimos mostrar esta información ahora. Inténtalo de nuevo en unos momentos.',
      } = this.props

      return (
        <div
          role="alert"
          className="flex flex-col items-center gap-4 rounded-2xl border border-border bg-surface px-6 py-12 text-center shadow-sm"
        >
          <div className="flex flex-col items-center gap-2">
            <h2 className="text-lg font-semibold text-text">{title}</h2>
            <p className="max-w-md text-sm text-text-secondary">{message}</p>
          </div>

          <Button type="button" variant="secondary" onClick={this.retry}>
            Reintentar
          </Button>
        </div>
      )
    }

    return this.props.children
  }
}
