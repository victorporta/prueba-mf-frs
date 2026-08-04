import React, { useEffect, useState } from 'react'

import {
  historyService,
  type HistoryEntry,
} from '../../../../shared/services'
import {
  HistoryEmpty,
  HistoryHeader,
  HistoryList,
  HistorySkeleton,
} from '../components'

export function HistoryPage() {
  const [entries, setEntries] = useState<HistoryEntry[] | null>(null)

  useEffect(() => {
    setEntries(historyService.getHistory())
  }, [])

  if (entries === null) {
    return (
      <section className="flex flex-col gap-6">
        <HistoryHeader total={0} />
        <HistorySkeleton />
      </section>
    )
  }

  return (
    <section className="flex flex-col gap-6">
      <HistoryHeader total={entries.length} />

      {entries.length === 0 ? (
        <HistoryEmpty />
      ) : (
        <HistoryList entries={entries} />
      )}
    </section>
  )
}
