import type { PokemonType } from '../../../domain'
import { PokemonCategoryItem } from '../pokemon-category-item'

export type PokemonCategoryListProps = {
  types: PokemonType[]
  selectedType: string | null
  onSelectType: (typeName: string) => void
  className?: string
}

export function PokemonCategoryList({
  types,
  selectedType,
  onSelectType,
  className = '',
}: Readonly<PokemonCategoryListProps>) {
  return (
    <div
      role="listbox"
      aria-label="Categorías de Pokémon"
      className={[
        'flex flex-wrap gap-2',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {types.map((type) => (
        <PokemonCategoryItem
          key={type.id}
          name={type.name}
          selected={selectedType === type.name}
          onSelect={onSelectType}
        />
      ))}
    </div>
  )
}
