export type PokemonStat = {
  name: string
  value: number
}

export type Pokemon = {
  id: number
  name: string
  imageUrl: string
  types: string[]
  stats: PokemonStat[]
}
