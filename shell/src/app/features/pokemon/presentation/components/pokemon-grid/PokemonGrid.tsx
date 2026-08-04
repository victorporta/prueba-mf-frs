import type { PokemonSummary } from '../../../domain'
import { PokemonCard } from '../pokemon-card'

const POKEMON_LIMIT = 10

export type PokemonGridProps = {
  pokemon: PokemonSummary[]
  className?: string
}

export function PokemonGrid({
  pokemon,
  className = '',
}: Readonly<PokemonGridProps>) {
  const items = pokemon.slice(0, POKEMON_LIMIT)

  return (
    <div
      className={[
        'grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {items.map((item) => (
        <PokemonCard key={item.id} pokemon={item} />
      ))}
    </div>
  )
}
