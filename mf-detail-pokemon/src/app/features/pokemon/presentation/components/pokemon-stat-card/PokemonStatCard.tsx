import React from 'react'

const STAT_MAX = 255

export type PokemonStatCardProps = {
  name: string
  value: number
  accentColor: string
  className?: string
}

function formatStatName(name: string) {
  return name.replaceAll('-', ' ')
}

export function PokemonStatCard({
  name,
  value,
  accentColor,
  className = '',
}: Readonly<PokemonStatCardProps>) {
  const percentage = Math.min(100, Math.round((value / STAT_MAX) * 100))
  const label = formatStatName(name)

  return (
    <article
      className={['flex flex-col gap-2', className].filter(Boolean).join(' ')}
    >
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-text-secondary">
          {label}
        </h3>
        <span className="text-sm font-bold tabular-nums text-text">{value}</span>
      </div>

      <div
        className="h-2.5 overflow-hidden rounded-full bg-surface-secondary/80"
        role="meter"
        aria-label={label}
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={STAT_MAX}
      >
        <div
          className="pokemon-stat-bar h-full rounded-full"
          style={{
            width: `${percentage}%`,
            backgroundColor: accentColor,
            opacity: 0.85,
          }}
        />
      </div>
    </article>
  )
}
