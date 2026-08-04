import React from 'react'

export type HistorySkeletonProps = {
  count?: number
  className?: string
}

export function HistorySkeleton({
  count = 8,
  className = '',
}: Readonly<HistorySkeletonProps>) {
  return (
    <div
      className={[
        'grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      aria-hidden
    >
      {Array.from({ length: count }, (_, index) => (
        <div
          key={index}
          className="flex flex-col gap-3 rounded-xl border border-border bg-surface p-4"
        >
          <div className="aspect-square animate-pulse rounded-lg bg-surface-secondary" />
          <div className="mx-auto h-4 w-2/3 animate-pulse rounded bg-surface-secondary" />
          <div className="mx-auto h-3 w-1/3 animate-pulse rounded bg-surface-secondary" />
        </div>
      ))}
    </div>
  )
}
