import type { Pokemon, PokemonSummary, PokemonType } from '../entities'

export type PokemonListPage = {
  count: number
  nextOffset: number | null
  previousOffset: number | null
  results: PokemonSummary[]
}

export interface PokemonRepository {
  getTypes(): Promise<PokemonType[]>
  getByType(typeName: string): Promise<PokemonSummary[]>
  getById(id: number): Promise<Pokemon>
  getPaginated(limit: number, offset: number): Promise<PokemonListPage>
  searchByName(name: string): Promise<PokemonSummary | null>
}
