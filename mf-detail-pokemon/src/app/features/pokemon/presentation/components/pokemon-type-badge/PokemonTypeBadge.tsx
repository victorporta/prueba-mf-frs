import React from 'react'

import { getPokemonType } from '../../../../../shared/utils/get-pokemon-type'

export type PokemonTypeBadgeProps = {
  type: string
  className?: string
}

export function PokemonTypeBadge({
  type,
  className = '',
}: Readonly<PokemonTypeBadgeProps>) {
  const style = getPokemonType(type.toLowerCase())

  return (
    <span
      className={[
        'inline-flex items-center rounded-full px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wide shadow-sm',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      style={{
        backgroundColor: style.color,
        color: style.textColor,
      }}
    >
      {style.label}
    </span>
  )
}
