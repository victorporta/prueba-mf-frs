import type { Pokemon, PokemonRepository } from '../../domain'
import { request } from '../../../../shared/http'
import { PokemonApi } from '../api'
import { mapPokemonDtoToEntity } from '../mappers'
import { PokemonSchema } from '../schemas'

export class PokemonApiRepository implements PokemonRepository {
  async getById(id: number): Promise<Pokemon> {
    const data = await request<unknown>(PokemonApi.byId(id))
    const dto = PokemonSchema.parse(data)
    return mapPokemonDtoToEntity(dto)
  }
}

export const pokemonRepository: PokemonRepository = new PokemonApiRepository()
