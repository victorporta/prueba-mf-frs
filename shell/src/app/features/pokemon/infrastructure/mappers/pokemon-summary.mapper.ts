import type { PokemonSummary } from '../../domain'
import type { PokemonDto, PokemonListItemDto } from '../schemas'
import { pokemonUrlHelpers } from './url.helpers'

export function mapListItemToPokemonSummary(
  item: PokemonListItemDto,
): PokemonSummary {
  const id = pokemonUrlHelpers.extractIdFromUrl(item.url)

  return {
    id,
    name: item.name,
    imageUrl: pokemonUrlHelpers.buildOfficialArtworkUrl(id),
  }
}

export function mapPokemonDtoToSummary(dto: PokemonDto): PokemonSummary {
  const dreamWorld = dto.sprites.other.dream_world.front_default
  const officialArtwork = dto.sprites.other['official-artwork'].front_default
  const frontDefault = dto.sprites.front_default

  return {
    id: dto.id,
    name: dto.name,
    imageUrl: dreamWorld ?? officialArtwork ?? frontDefault ?? '',
  }
}
