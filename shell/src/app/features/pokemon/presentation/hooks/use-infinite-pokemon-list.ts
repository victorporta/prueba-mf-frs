import { useInfiniteQuery } from '@tanstack/react-query'

import { pokemonRepository } from '../../infrastructure'
import {
  POKEMON_RETRY,
  POKEMON_STALE_TIME,
  pokemonKeys,
} from '../query-keys'

const DEFAULT_PAGE_SIZE = 30

type UseInfinitePokemonListOptions = {
  limit?: number
  enabled?: boolean
}

export function useInfinitePokemonList(
  options: UseInfinitePokemonListOptions = {},
) {
  const { limit = DEFAULT_PAGE_SIZE, enabled = true } = options

  return useInfiniteQuery({
    queryKey: pokemonKeys.list(limit),
    queryFn: ({ pageParam }) =>
      pokemonRepository.getPaginated(limit, pageParam),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextOffset ?? undefined,
    enabled,
    staleTime: POKEMON_STALE_TIME,
    retry: POKEMON_RETRY,
  })
}
