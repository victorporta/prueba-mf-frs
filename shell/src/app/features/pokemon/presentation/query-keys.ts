export const pokemonKeys = {
  all: ['pokemon'] as const,
  types: () => [...pokemonKeys.all, 'types'] as const,
  byType: (type: string) => [...pokemonKeys.all, 'type', type] as const,
  detail: (id: number) => [...pokemonKeys.all, 'detail', id] as const,
  search: (name: string) => [...pokemonKeys.all, 'search', name] as const,
  list: (limit?: number) =>
    limit === undefined
      ? ([...pokemonKeys.all, 'list'] as const)
      : ([...pokemonKeys.all, 'list', limit] as const),
}

export const POKEMON_STALE_TIME = 60_000
export const POKEMON_RETRY = 1
