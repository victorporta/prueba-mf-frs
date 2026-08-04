import React from 'react'

import type { PokemonStat } from '../../../domain'
import { PokemonStatCard } from '../pokemon-stat-card'

export type PokemonStatsProps = {
  stats: PokemonStat[]
  accentColor: string
  className?: string
}

export function PokemonStats({
  stats,
  accentColor,
  className = '',
}: Readonly<PokemonStatsProps>) {
  return (
    <section
      className={[
        'pokemon-detail-enter flex flex-col gap-4',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      aria-label="Estadísticas"
      style={{ animationDelay: '120ms' }}
    >
      <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-text-muted">
        Stats
      </h2>

      <div className="flex flex-col gap-3.5">
        {stats.map((stat) => (
          <PokemonStatCard
            key={stat.name}
            name={stat.name}
            value={stat.value}
            accentColor={accentColor}
          />
        ))}
      </div>
    </section>
  )
}
