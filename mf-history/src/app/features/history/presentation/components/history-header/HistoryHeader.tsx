import React from 'react'

export type HistoryHeaderProps = {
  total: number
  className?: string
}

export function HistoryHeader({
  total,
  className = '',
}: Readonly<HistoryHeaderProps>) {
  return (
    <header
      className={['flex flex-col gap-1', className].filter(Boolean).join(' ')}
    >
      <h1 className="text-2xl font-semibold text-text">Historial</h1>
      <p className="text-sm text-text-secondary">
        {total === 0
          ? 'Aún no has visitado ningún Pokémon.'
          : `${total} Pokémon visitado${total === 1 ? '' : 's'}`}
      </p>
    </header>
  )
}
