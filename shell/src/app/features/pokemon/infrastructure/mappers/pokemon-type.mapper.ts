import type { PokemonSummary, PokemonType } from '../../domain'
import type { PokemonListItemDto, PokemonTypeDto } from '../schemas'
import { mapListItemToPokemonSummary } from './pokemon-summary.mapper'
import { pokemonUrlHelpers } from './url.helpers'

export function mapTypeListItemToPokemonType(
  item: PokemonListItemDto,
): PokemonType {
  return {
    id: pokemonUrlHelpers.extractIdFromUrl(item.url),
    name: item.name,
  }
}

export function mapPokemonTypeDtoToEntity(dto: PokemonTypeDto): PokemonType {
  return {
    id: dto.id,
    name: dto.name,
  }
}

export function mapPokemonTypeDtoToSummaries(
  dto: PokemonTypeDto,
): PokemonSummary[] {
  return dto.pokemon.map((entry) => mapListItemToPokemonSummary(entry.pokemon))
}
