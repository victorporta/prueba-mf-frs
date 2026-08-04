import type { Pokemon } from '../../domain'
import type { PokemonDto } from '../schemas'

export function mapPokemonDtoToEntity(dto: PokemonDto): Pokemon {
  const dreamWorld = dto.sprites.other.dream_world.front_default
  const officialArtwork = dto.sprites.other['official-artwork'].front_default

  return {
    id: dto.id,
    name: dto.name,
    imageUrl: dreamWorld ?? officialArtwork ?? '',
    types: dto.types.map((entry) => entry.type.name),
    stats: dto.stats.map((entry) => ({
      name: entry.stat.name,
      value: entry.base_stat,
    })),
  }
}
