import {
    DEFAULT_POKEMON_TYPE,
    POKEMON_TYPES,
  } from '../constants/pokemon-type.constants'
  
  export function getPokemonType(type: string) {
    return POKEMON_TYPES[type] ?? DEFAULT_POKEMON_TYPE
  }