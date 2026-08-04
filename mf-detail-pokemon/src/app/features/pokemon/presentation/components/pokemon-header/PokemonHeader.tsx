import React from 'react'

export type PokemonHeaderProps = {
  name: string
  id: number
  className?: string
}

export function PokemonHeader({
  name,
  id,
  className = '',
}: Readonly<PokemonHeaderProps>) {
  const paddedId = String(id).padStart(3, '0')

  return (
    <header
      className={[
        'pokemon-detail-enter flex flex-col gap-1 text-center lg:text-left',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <p className="text-sm font-semibold tracking-[0.2em] text-text-muted">
        #{paddedId}
      </p>
      <h1 className="text-4xl font-bold capitalize tracking-tight text-text sm:text-5xl">
        {name}
      </h1>
    </header>
  )
}
