declare module 'pokemon-detail/PokemonDetail' {
  import type { ComponentType } from 'react'

  type PokemonDetailProps = {
    id?: number
  }

  const PokemonDetail: ComponentType<PokemonDetailProps>
  export default PokemonDetail
}

declare module 'pokemon-history/PokemonHistory' {
  import type { ComponentType } from 'react'
  const PokemonHistory: ComponentType
  export default PokemonHistory
}
