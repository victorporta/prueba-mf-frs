import React from 'react'

export type EmptyStateProps = {
  title?: string
  message?: string
  className?: string
}

export function EmptyState({
  title = 'Sin resultados',
  message = 'No hay información para mostrar por ahora.',
  className = '',
}: Readonly<EmptyStateProps>) {
  return (
    <div
      className={[
        'flex flex-col items-center gap-2 rounded-xl border border-dashed border-border bg-surface px-6 py-10 text-center',
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
