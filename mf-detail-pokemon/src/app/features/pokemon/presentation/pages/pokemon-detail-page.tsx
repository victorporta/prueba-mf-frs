import React, { useEffect } from 'react'

import { historyService } from '../../../../shared/services'
import { getPokemonType } from '../../../../shared/utils/get-pokemon-type'
import { hexToRgba } from '../../../../shared/utils/hex-to-rgba'
import {
  EmptyState,
  ErrorState,
  PokemonBackButton,
  PokemonHeader,
  PokemonImage,
  PokemonSkeleton,
  PokemonStats,
  PokemonTypes,
} from '../components'
import { usePokemonDetail } from '../hooks'

function parsePokemonIdFromPath(): number | null {
  const match = window.location.pathname.match(/\/pokemon\/([^/]+)/)
  if (!match?.[1]) return null

  const id = Number(match[1])
  return Number.isFinite(id) && id > 0 ? id : null
}

export type PokemonDetailPageProps = {
  id?: number
}

export function PokemonDetailPage({
  id,
}: Readonly<PokemonDetailPageProps>) {
  const pokemonId = id ?? parsePokemonIdFromPath()
  const { data: pokemon, isPending, isError } = usePokemonDetail(pokemonId)

  useEffect(() => {
    if (!pokemon) return

    historyService.visitPokemon({
      id: pokemon.id,
      name: pokemon.name,
      image: pokemon.imageUrl,
    })
  }, [pokemon])

  if (!pokemonId) {
    return (
      <EmptyState
        title="Pokémon no encontrado"
        message="No encontramos un identificador válido en la URL."
      />
    )
  }

  if (isPending) {
    return <PokemonSkeleton />
  }

  if (isError) {
    return (
      <ErrorState
        title="No pudimos cargar el Pokémon"
        message="Revisa tu conexión e inténtalo nuevamente."
      />
    )
  }

  if (!pokemon) {
    return (
      <EmptyState
        title="Pokémon no encontrado"
        message="No existe información para este Pokémon."
      />
    )
  }

  const primaryType = getPokemonType(pokemon.types[0]?.toLowerCase() ?? '')
  const accentColor = primaryType.color
  const softTint = hexToRgba(accentColor, 0.1)
  const softerTint = hexToRgba(accentColor, 0.05)

  return (
    <div className="flex flex-col gap-4">
      <PokemonBackButton />

      <article
        className="pokemon-detail-card pokemon-detail-enter relative overflow-hidden rounded-[1.75rem] border border-border/60 p-5 shadow-[0_24px_60px_-36px_rgba(0,0,0,0.45)] sm:p-7 lg:p-8"
        style={{
          background: `linear-gradient(165deg, ${softTint} 0%, ${softerTint} 42%, transparent 72%), var(--color-surface)`,
        }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -right-16 -top-20 size-56 rounded-full blur-3xl"
          style={{ backgroundColor: hexToRgba(accentColor, 0.14) }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-24 -left-10 size-64 rounded-full blur-3xl"
          style={{ backgroundColor: hexToRgba(accentColor, 0.08) }}
        />

        <div className="relative flex flex-col gap-6 lg:grid lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-center lg:gap-10">
          <PokemonImage
            src={pokemon.imageUrl}
            alt={pokemon.name}
            accentColor={accentColor}
            className="order-2 lg:order-1 lg:row-span-3"
          />

          <PokemonHeader
            name={pokemon.name}
            id={pokemon.id}
            className="order-1 lg:order-2"
          />

          <PokemonTypes
            types={pokemon.types}
            className="order-3 lg:order-2"
          />

          <PokemonStats
            stats={pokemon.stats}
            accentColor={accentColor}
            className="order-4 lg:order-2"
          />
        </div>
      </article>
    </div>
  )
}
