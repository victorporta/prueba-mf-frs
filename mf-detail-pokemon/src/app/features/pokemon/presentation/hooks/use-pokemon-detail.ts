import { useQuery } from '@tanstack/react-query'

import { pokemonRepository } from '../../infrastructure'
import {
  POKEMON_RETRY,
  POKEMON_STALE_TIME,
  pokemonKeys,
} from '../query-keys'

type UsePokemonDetailOptions = {
  enabled?: boolean
}

export function usePokemonDetail(
  id: number | null | undefined,
  options: UsePokemonDetailOptions = {},
) {
  const { enabled = true } = options
  const isValidId = typeof id === 'number' && Number.isFinite(id) && id > 0

  return useQuery({
    queryKey: pokemonKeys.detail(id ?? 0),
    queryFn: () => pokemonRepository.getById(id as number),
    enabled: enabled && isValidId,
    staleTime: POKEMON_STALE_TIME,
    retry: POKEMON_RETRY,
  })
}
