import React from 'react'

import type { HistoryEntry } from '../../../../../shared/services'

export type HistoryCardProps = {
  entry: HistoryEntry
  className?: string
}

function formatLastVisited(timestamp: number): string {
  try {
    return new Intl.DateTimeFormat('es', {
      dateStyle: 'medium',
      timeStyle: 'short',
    }).format(new Date(timestamp))
  } catch {
    return new Date(timestamp).toLocaleString()
  }
}

export function HistoryCard({
  entry,
  className = '',
}: Readonly<HistoryCardProps>) {
  const visitsLabel = entry.visits === 1 ? '1 visita' : `${entry.visits} visitas`

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
          src={entry.image}
          alt={entry.name}
          loading="lazy"
          className="max-h-full max-w-full object-contain"
        />
      </div>

      <div className="flex w-full flex-col items-center gap-1 text-center">
        <h3 className="text-sm font-medium capitalize text-text">{entry.name}</h3>
        <p className="text-xs font-medium text-brand">{visitsLabel}</p>
        <p className="text-xs text-text-muted">
          Última visita: {formatLastVisited(entry.lastVisitedAt)}
        </p>
      </div>
    </article>
  )
}
