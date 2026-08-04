export const pokemonKeys = {
  all: ['pokemon'] as const,
  detail: (id: number) => [...pokemonKeys.all, 'detail', id] as const,
}

export const POKEMON_STALE_TIME = 60_000
export const POKEMON_RETRY = 1
