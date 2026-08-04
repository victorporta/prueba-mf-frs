import React from 'react'

export type HistoryEmptyProps = {
  title?: string
  message?: string
  className?: string
}

export function HistoryEmpty({
  title = 'Sin Pokémon visitados',
  message = 'Cuando visites el detalle de un Pokémon, aparecerá aquí en tu historial.',
  className = '',
}: Readonly<HistoryEmptyProps>) {
  return (
    <div
      className={[
        'flex flex-col items-center gap-2 rounded-xl border border-dashed border-border bg-surface px-6 py-10 text-center',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <h2 className="text-base font-semibold text-text">{title}</h2>
      {message ? (
        <p className="max-w-md text-sm text-text-secondary">{message}</p>
      ) : null}
    </div>
  )
}
