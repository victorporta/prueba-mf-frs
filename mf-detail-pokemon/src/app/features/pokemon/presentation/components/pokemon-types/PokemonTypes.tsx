import React from 'react'

import { PokemonTypeBadge } from '../pokemon-type-badge'

export type PokemonTypesProps = {
  types: string[]
  className?: string
}

export function PokemonTypes({
  types,
  className = '',
}: Readonly<PokemonTypesProps>) {
  return (
    <ul
      className={[
        'pokemon-detail-enter flex flex-wrap justify-center gap-2 lg:justify-start',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      aria-label="Tipos"
    >
      {types.map((type) => (
        <li key={type}>
          <PokemonTypeBadge type={type} />
        </li>
      ))}
    </ul>
  )
}
