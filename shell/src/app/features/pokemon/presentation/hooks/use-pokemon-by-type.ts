import { useQuery } from '@tanstack/react-query'

import { pokemonRepository } from '../../infrastructure'
import {
  POKEMON_RETRY,
  POKEMON_STALE_TIME,
  pokemonKeys,
} from '../query-keys'

type UsePokemonByTypeOptions = {
  enabled?: boolean
}

export function usePokemonByType(
  typeName: string,
  options: UsePokemonByTypeOptions = {},
) {
  const normalizedType = typeName.trim().toLowerCase()
  const { enabled = true } = options

  return useQuery({
    queryKey: pokemonKeys.byType(normalizedType),
    queryFn: () => pokemonRepository.getByType(normalizedType),
    enabled: enabled && normalizedType.length > 0,
    staleTime: POKEMON_STALE_TIME,
    retry: POKEMON_RETRY,
  })
}
