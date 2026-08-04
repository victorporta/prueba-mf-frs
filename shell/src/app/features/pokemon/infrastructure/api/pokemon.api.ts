import { API } from '../../../../shared/config/api'

export const PokemonApi = {
  byId: (id: number) => `${API.BASE_URL}/pokemon/${id}`,
  byName: (name: string) =>
    `${API.BASE_URL}/pokemon/${encodeURIComponent(name)}`,
  byType: (typeName: string) =>
    `${API.BASE_URL}/type/${encodeURIComponent(typeName)}`,
  list: (limit: number, offset: number) =>
    `${API.BASE_URL}/pokemon?limit=${limit}&offset=${offset}`,
  types: () => `${API.BASE_URL}/type?limit=100`,
} as const
