import type { PokemonListPage } from '../../domain'
import type { PokemonListDto } from '../schemas'
import { mapListItemToPokemonSummary } from './pokemon-summary.mapper'
import { pokemonUrlHelpers } from './url.helpers'

export function mapPokemonListDtoToPage(dto: PokemonListDto): PokemonListPage {
  return {
    count: dto.count,
    nextOffset: pokemonUrlHelpers.extractOffsetFromUrl(dto.next),
    previousOffset: pokemonUrlHelpers.extractOffsetFromUrl(dto.previous),
    results: dto.results.map(mapListItemToPokemonSummary),
  }
}
