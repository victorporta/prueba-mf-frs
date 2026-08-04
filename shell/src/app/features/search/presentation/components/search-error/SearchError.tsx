export type SearchErrorProps = {
  title?: string
  message?: string
  className?: string
}

export function SearchError({
  title = 'Algo salió mal',
  message = 'No pudimos completar la búsqueda. Inténtalo nuevamente.',
  className = '',
}: Readonly<SearchErrorProps>) {
  return (
    <div
      role="alert"
      className={[
        'flex flex-col items-center gap-2 rounded-xl border border-error/30 bg-error/5 px-6 py-10 text-center',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <h3 className="text-base font-semibold text-text">{title}</h3>
      <p className="max-w-md text-sm text-text-secondary">{message}</p>
    </div>
  )
}
