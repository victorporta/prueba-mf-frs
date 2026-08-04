import {
  PokemonCategories,
  PokemonGrid,
  WelcomeHeader,
} from '../components'

export function HomePage() {
  return (
    <div className="flex flex-col gap-10">
      <WelcomeHeader />
      <PokemonCategories />
      <PokemonGrid />
    </div>
  )
}
