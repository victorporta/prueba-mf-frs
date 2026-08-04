import type {
  Pokemon,
  PokemonListPage,
  PokemonRepository,
  PokemonSummary,
  PokemonType,
} from '../../domain'
import { HttpError, request } from '../../../../shared/http'
import { PokemonApi } from '../api'
import {
  mapPokemonDtoToEntity,
  mapPokemonDtoToSummary,
  mapPokemonListDtoToPage,
  mapPokemonTypeDtoToSummaries,
  mapTypeListItemToPokemonType,
} from '../mappers'
import {
  PokemonListSchema,
  PokemonSchema,
  PokemonTypeSchema,
} from '../schemas'

export class PokemonApiRepository implements PokemonRepository {
  async getTypes(): Promise<PokemonType[]> {
    const data = await request<unknown>(PokemonApi.types())
    const dto = PokemonListSchema.parse(data)

    return dto.results.map(mapTypeListItemToPokemonType)
  }

  async getByType(typeName: string): Promise<PokemonSummary[]> {
    const data = await request<unknown>(PokemonApi.byType(typeName))
    const dto = PokemonTypeSchema.parse(data)

    return mapPokemonTypeDtoToSummaries(dto)
  }

  async getById(id: number): Promise<Pokemon> {
    const data = await request<unknown>(PokemonApi.byId(id))
    const dto = PokemonSchema.parse(data)

    return mapPokemonDtoToEntity(dto)
  }

  async getPaginated(limit: number, offset: number): Promise<PokemonListPage> {
    const data = await request<unknown>(PokemonApi.list(limit, offset))
    const dto = PokemonListSchema.parse(data)

    return mapPokemonListDtoToPage(dto)
  }

  async searchByName(name: string): Promise<PokemonSummary | null> {
    try {
      const data = await request<unknown>(
        PokemonApi.byName(name.trim().toLowerCase()),
      )
      const dto = PokemonSchema.parse(data)

      return mapPokemonDtoToSummary(dto)
    } catch (error) {
      if (error instanceof HttpError && error.status === 404) {
        return null
      }

      throw error
    }
  }
}

export const pokemonRepository: PokemonRepository = new PokemonApiRepository()
