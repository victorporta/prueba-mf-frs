export function WelcomeHeader() {
  return (
    <section aria-label="Bienvenida" className="flex flex-col gap-2">
      <p className="text-sm font-medium text-brand">Pokédex</p>
      <h1 className="text-3xl font-semibold tracking-tight text-text">
        Bienvenido
      </h1>
      <p className="max-w-xl text-sm text-text-secondary">
        Explora categorías y encuentra tu próximo Pokémon.
      </p>
    </section>
  )
}
