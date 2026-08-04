export interface PokemonTypeStyle {
  label: string
  color: string
  textColor: string
}

export const POKEMON_TYPES: Record<string, PokemonTypeStyle> = {
  normal: {
    label: 'Normal',
    color: '#A8A77A',
    textColor: '#FFFFFF',
  },
  fire: {
    label: 'Fire',
    color: '#EE8130',
    textColor: '#FFFFFF',
  },
  water: {
    label: 'Water',
    color: '#6390F0',
    textColor: '#FFFFFF',
  },
  electric: {
    label: 'Electric',
    color: '#F7D02C',
    textColor: '#1F2937',
  },
  grass: {
    label: 'Grass',
    color: '#7AC74C',
    textColor: '#FFFFFF',
  },
  ice: {
    label: 'Ice',
    color: '#96D9D6',
    textColor: '#1F2937',
  },
  fighting: {
    label: 'Fighting',
    color: '#C22E28',
    textColor: '#FFFFFF',
  },
  poison: {
    label: 'Poison',
    color: '#A33EA1',
    textColor: '#FFFFFF',
  },
  ground: {
    label: 'Ground',
    color: '#E2BF65',
    textColor: '#1F2937',
  },
  flying: {
    label: 'Flying',
    color: '#A98FF3',
    textColor: '#FFFFFF',
  },
  psychic: {
    label: 'Psychic',
    color: '#F95587',
    textColor: '#FFFFFF',
  },
  bug: {
    label: 'Bug',
    color: '#A6B91A',
    textColor: '#FFFFFF',
  },
  rock: {
    label: 'Rock',
    color: '#B6A136',
    textColor: '#FFFFFF',
  },
  ghost: {
    label: 'Ghost',
    color: '#735797',
    textColor: '#FFFFFF',
  },
  dragon: {
    label: 'Dragon',
    color: '#6F35FC',
    textColor: '#FFFFFF',
  },
  dark: {
    label: 'Dark',
    color: '#705746',
    textColor: '#FFFFFF',
  },
  steel: {
    label: 'Steel',
    color: '#B7B7CE',
    textColor: '#1F2937',
  },
  fairy: {
    label: 'Fairy',
    color: '#D685AD',
    textColor: '#FFFFFF',
  },
};

export const DEFAULT_POKEMON_TYPE: PokemonTypeStyle = {
  label: 'Unknown',
  color: '#6B7280',
  textColor: '#FFFFFF',
};