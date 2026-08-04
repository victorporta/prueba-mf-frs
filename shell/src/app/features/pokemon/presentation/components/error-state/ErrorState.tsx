export type ErrorStateProps = {
  title?: string
  message?: string
  className?: string
}

export function ErrorState({
  title = 'Algo salió mal',
  message = 'No pudimos cargar la información. Inténtalo nuevamente.',
  className = '',
}: Readonly<ErrorStateProps>) {
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
      <h2 className="text-base font-semibold text-text">{title}</h2>
      <p className="max-w-md text-sm text-text-secondary">{message}</p>
    </div>
  )
}
