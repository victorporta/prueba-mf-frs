import type { PokemonSummary } from '../../../../pokemon'
import { SearchCard } from '../search-card'

export type SearchGridProps = {
  pokemon: PokemonSummary[]
  className?: string
}

export function SearchGrid({
  pokemon,
  className = '',
}: Readonly<SearchGridProps>) {
  return (
    <div
      className={[
        'grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {pokemon.map((item) => (
        <SearchCard key={item.id} pokemon={item} />
      ))}
    </div>
  )
}
