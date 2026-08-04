import { useCallback, useState } from 'react'

import { historyService, type HistoryEntry } from '../../../shared'

export function useLastVisitedToast() {
  // Only evaluate on page load / remount (refresh or entering the app again).
  // Do not react to in-session visits or SPA navigations.
  const [pokemon, setPokemon] = useState<HistoryEntry | null>(() =>
    historyService.getLastVisitedToast(),
  )

  const dismiss = useCallback(() => {
    historyService.dismissLastVisitedToast()
    setPokemon(null)
  }, [])

  return {
    pokemon,
    isVisible: pokemon !== null,
    dismiss,
  }
}
