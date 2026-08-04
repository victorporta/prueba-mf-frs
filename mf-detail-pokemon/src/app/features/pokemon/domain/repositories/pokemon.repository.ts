import type { Pokemon } from '../entities'

export interface PokemonRepository {
  getById(id: number): Promise<Pokemon>
}
