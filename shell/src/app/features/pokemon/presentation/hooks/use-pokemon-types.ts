import { useQuery } from '@tanstack/react-query'

import { pokemonRepository } from '../../infrastructure'
import {
  POKEMON_RETRY,
  POKEMON_STALE_TIME,
  pokemonKeys,
} from '../query-keys'

export function usePokemonTypes() {
  return useQuery({
    queryKey: pokemonKeys.types(),
    queryFn: () => pokemonRepository.getTypes(),
    staleTime: POKEMON_STALE_TIME,
    retry: POKEMON_RETRY,
  })
}
