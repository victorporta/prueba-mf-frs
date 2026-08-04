export type HistoryEntry = {
  id: number
  name: string
  image: string
  visits: number
  lastVisitedAt: number
}

export type VisitPokemonInput = {
  id: number
  name: string
  image: string
}

type HistorySnapshot = {
  entries: HistoryEntry[]
  lastVisitedId: number | null
  isLastVisitedToastDismissed: boolean
}

const STORAGE_KEY = 'mf-pokemon-history'
export const HISTORY_UPDATED_EVENT = 'mf-history-updated'

const EMPTY_SNAPSHOT: HistorySnapshot = {
  entries: [],
  lastVisitedId: null,
  isLastVisitedToastDismissed: false,
}

function canUseStorage(): boolean {
  return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined'
}

function notifyHistoryUpdated(): void {
  if (typeof window === 'undefined') return
  window.dispatchEvent(new CustomEvent(HISTORY_UPDATED_EVENT))
}

function readSnapshot(): HistorySnapshot {
  if (!canUseStorage()) {
    return { ...EMPTY_SNAPSHOT, entries: [] }
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return { ...EMPTY_SNAPSHOT, entries: [] }

    const parsed = JSON.parse(raw) as Partial<HistorySnapshot>
    const entries = Array.isArray(parsed.entries)
      ? parsed.entries.filter(isHistoryEntry)
      : []

    const lastVisitedId =
      typeof parsed.lastVisitedId === 'number' ? parsed.lastVisitedId : null

    return {
      entries,
      lastVisitedId,
      isLastVisitedToastDismissed: Boolean(parsed.isLastVisitedToastDismissed),
    }
  } catch {
    return { ...EMPTY_SNAPSHOT, entries: [] }
  }
}

function writeSnapshot(snapshot: HistorySnapshot): void {
  if (!canUseStorage()) return
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(snapshot))
  notifyHistoryUpdated()
}

function isHistoryEntry(value: unknown): value is HistoryEntry {
  if (!value || typeof value !== 'object') return false

  const entry = value as Partial<HistoryEntry>
  return (
    typeof entry.id === 'number' &&
    typeof entry.name === 'string' &&
    typeof entry.image === 'string' &&
    typeof entry.visits === 'number' &&
    typeof entry.lastVisitedAt === 'number'
  )
}

export class HistoryService {
  visitPokemon(pokemon: VisitPokemonInput): HistoryEntry {
    const snapshot = readSnapshot()
    const now = Date.now()
    const existingIndex = snapshot.entries.findIndex(
      (entry) => entry.id === pokemon.id,
    )

    let entry: HistoryEntry

    if (existingIndex >= 0) {
      const current = snapshot.entries[existingIndex]!

      // Avoid double-counting from React StrictMode remounts.
      if (now - current.lastVisitedAt < 300) {
        snapshot.lastVisitedId = current.id
        writeSnapshot(snapshot)
        return current
      }

      entry = {
        ...current,
        name: pokemon.name,
        image: pokemon.image,
        visits: current.visits + 1,
        lastVisitedAt: now,
      }
      snapshot.entries[existingIndex] = entry
    } else {
      entry = {
        id: pokemon.id,
        name: pokemon.name,
        image: pokemon.image,
        visits: 1,
        lastVisitedAt: now,
      }
      snapshot.entries.push(entry)
    }

    snapshot.lastVisitedId = entry.id
    snapshot.isLastVisitedToastDismissed = false
    writeSnapshot(snapshot)

    return entry
  }

  getHistory(): HistoryEntry[] {
    return readSnapshot()
      .entries
      .slice()
      .sort((a, b) => {
        if (b.visits !== a.visits) return b.visits - a.visits
        return b.lastVisitedAt - a.lastVisitedAt
      })
  }

  getLastVisited(): HistoryEntry | null {
    const snapshot = readSnapshot()
    if (snapshot.lastVisitedId == null) return null

    return (
      snapshot.entries.find((entry) => entry.id === snapshot.lastVisitedId) ??
      null
    )
  }

  getLastVisitedToast(): HistoryEntry | null {
    const snapshot = readSnapshot()
    if (snapshot.isLastVisitedToastDismissed) return null
    return this.getLastVisited()
  }

  dismissLastVisitedToast(): void {
    const snapshot = readSnapshot()
    snapshot.isLastVisitedToastDismissed = true
    writeSnapshot(snapshot)
  }

  clearHistory(): void {
    writeSnapshot({ ...EMPTY_SNAPSHOT, entries: [] })
  }
}

export const historyService = new HistoryService()
