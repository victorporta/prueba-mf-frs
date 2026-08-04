import { Link } from 'react-router-dom'

import type { PokemonSummary } from '../../../domain'

export type PokemonCardProps = {
  pokemon: PokemonSummary
  className?: string
}

export function PokemonCard({
  pokemon,
  className = '',
}: Readonly<PokemonCardProps>) {
  return (
    <Link
      to={`/pokemon/${pokemon.id}`}
      className={[
        'block rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      aria-label={`Ver detalle de ${pokemon.name}`}
    >
      <article className="flex h-full flex-col items-center gap-3 rounded-xl border border-border p-4 transition-colors hover:border-brand/40 hover:bg-surface-secondary/40">
        <div className="flex aspect-square w-full items-center justify-center rounded-lg  p-2">
          <img
            src={pokemon.imageUrl}
            alt={pokemon.name}
            loading="lazy"
            className="max-h-full max-w-full object-contain"
          />
        </div>
        <h3 className="text-center text-sm font-medium capitalize text-text">
          {pokemon.name}
        </h3>
      </article>
    </Link>
  )
}
