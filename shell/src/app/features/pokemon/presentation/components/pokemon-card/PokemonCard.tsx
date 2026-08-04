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
    <article
      className={[
        'flex flex-col items-center gap-3 rounded-xl border border-border bg-surface p-4',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div className="flex aspect-square w-full items-center justify-center rounded-lg bg-surface-secondary/60 p-2">
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
  )
}
