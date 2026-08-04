export function PokemonCategories() {
  return (
    <section aria-label="Categorías Pokémon" className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <h2 className="text-lg font-semibold text-text">Categorías</h2>
        <p className="text-sm text-text-secondary">
          Placeholder — las categorías se cargarán en una fase posterior.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {Array.from({ length: 6 }, (_, index) => (
          <div
            key={index}
            className="h-9 w-24 rounded-lg border border-dashed border-border bg-surface-secondary/60"
            aria-hidden
          />
        ))}
      </div>
    </section>
  )
}
