import React from 'react'

import { PokemonDetailPage } from './app/features/pokemon'
import { QueryProvider } from './app/providers'
import './index.css'

export type PokemonDetailProps = {
  id?: number
}

function PokemonDetail({ id }: Readonly<PokemonDetailProps>) {
  return (
    <QueryProvider>
      <PokemonDetailPage id={id} />
    </QueryProvider>
  )
}

export default PokemonDetail
