import React from 'react'

export type PokemonBackButtonProps = {
  className?: string
}

export function PokemonBackButton({
  className = '',
}: Readonly<PokemonBackButtonProps>) {
  return (
    <button
      type="button"
      onClick={() => window.history.back()}
      aria-label="Volver"
      className={[
        'pokemon-detail-enter inline-flex items-center gap-2 rounded-md border border-border/70 bg-surface/80 px-3 py-2 text-sm font-medium text-text shadow-sm backdrop-blur-sm',
        'hover:-translate-x-0.5 hover:border-border hover:bg-surface',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background w-fit',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <span aria-hidden className="text-base leading-none">
        ←
      </span>
      <span className="hidden sm:inline">Volver</span>
    </button>
  )
}
