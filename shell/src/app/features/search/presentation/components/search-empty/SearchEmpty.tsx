export type SearchEmptyProps = {
  title?: string
  message?: string
  className?: string
}

export function SearchEmpty({
  title = 'Sin resultados',
  message = 'Escribe un nombre para buscar un Pokémon.',
  className = '',
}: Readonly<SearchEmptyProps>) {
  return (
    <div
      className={[
        'flex flex-col items-center gap-2 rounded-xl border border-dashed border-border bg-surface px-6 py-10 text-center',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <h3 className="text-base font-semibold text-text">{title}</h3>
      {message ? (
        <p className="max-w-md text-sm text-text-secondary">{message}</p>
      ) : null}
    </div>
  )
}
