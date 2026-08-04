import { API } from '../../../../shared/config/api'

export const PokemonApi = {
  byId: (id: number) => `${API.BASE_URL}/pokemon/${id}`,
} as const
