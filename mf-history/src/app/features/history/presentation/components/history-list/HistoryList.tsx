import React from 'react'

import type { HistoryEntry } from '../../../../../shared/services'
import { HistoryCard } from '../history-card'

export type HistoryListProps = {
  entries: HistoryEntry[]
  className?: string
}

export function HistoryList({
  entries,
  className = '',
}: Readonly<HistoryListProps>) {
  return (
    <div
      className={[
        'grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {entries.map((entry) => (
        <HistoryCard key={entry.id} entry={entry} />
      ))}
    </div>
  )
}
