import { Link } from 'react-router-dom'

import { Button, type HistoryEntry } from '../../../../shared'
import { useLastVisitedToast } from '../../hooks/use-last-visited-toast'

export type LastVisitedToastProps = {
  className?: string
}

export function LastVisitedToast({
  className = '',
}: Readonly<LastVisitedToastProps>) {
  const { pokemon, isVisible, dismiss } = useLastVisitedToast()

  if (!isVisible || !pokemon) return null

  return (
    <LastVisitedToastView
      pokemon={pokemon}
      onDismiss={dismiss}
      className={className}
    />
  )
}

type LastVisitedToastViewProps = {
  pokemon: HistoryEntry
  onDismiss: () => void
  className?: string
}

function LastVisitedToastView({
  pokemon,
  onDismiss,
  className = '',
}: Readonly<LastVisitedToastViewProps>) {
  return (
    <aside
      role="status"
      aria-live="polite"
      aria-label="Último Pokémon visitado"
      className={[
        'fixed bottom-4 right-4 z-40 w-[min(100%-2rem,22rem)]',
        'rounded-2xl border border-border bg-surface p-4 shadow-lg',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div className="flex items-start gap-3">
        <div className="flex size-16 shrink-0 items-center justify-center rounded-xl  p-1">
          <img
            src={pokemon.image}
            alt={pokemon.name}
            className="max-h-full max-w-full object-contain"
          />
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-xs font-medium uppercase tracking-wide text-text-muted">
            Último visitado
          </p>
          <p className="truncate text-sm font-semibold capitalize text-text">
            {pokemon.name}
          </p>

          <div className="mt-3 flex flex-wrap gap-2">
            <Link
             onClick={onDismiss}
              to={`/pokemon/${pokemon.id}`}
              className={[
                'inline-flex h-8 items-center justify-center rounded-md bg-brand px-3 text-sm font-medium text-white',
                'hover:bg-brand-hover',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background',
              ].join(' ')}
            >
              Ver detalle
            </Link>

            <Button type="button" variant="secondary" size="sm" onClick={onDismiss}>
              Cerrar
            </Button>
          </div>
        </div>
      </div>
    </aside>
  )
}
