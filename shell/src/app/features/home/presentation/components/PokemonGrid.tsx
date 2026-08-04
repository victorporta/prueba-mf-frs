export function PokemonGrid() {
  return (
    <section aria-label="Listado de Pokémon" className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <h2 className="text-lg font-semibold text-text">Pokémon</h2>
        <p className="text-sm text-text-secondary">
          Placeholder — el grid se conectará a la PokeAPI más adelante.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {Array.from({ length: 10 }, (_, index) => (
          <div
            key={index}
            className="aspect-square rounded-xl border border-dashed border-border bg-surface-secondary/60"
            aria-hidden
          />
        ))}
      </div>
    </section>
  )
}
