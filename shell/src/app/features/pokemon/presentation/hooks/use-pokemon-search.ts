import { useQuery } from '@tanstack/react-query'

import { pokemonRepository } from '../../infrastructure'
import { POKEMON_STALE_TIME, pokemonKeys } from '../query-keys'

type UsePokemonSearchOptions = {
  enabled?: boolean
}

export function usePokemonSearch(
  name: string,
  options: UsePokemonSearchOptions = {},
) {
  const normalizedName = name.trim().toLowerCase()
  const { enabled = true } = options

  const query = useQuery({
    queryKey: pokemonKeys.search(normalizedName),
    queryFn: () => pokemonRepository.searchByName(normalizedName),
    enabled: enabled && normalizedName.length > 0,
    staleTime: POKEMON_STALE_TIME,
    retry: false,
  })

  return {
    ...query,
    isNotFound: query.isSuccess && query.data === null,
  }
}
