import React from 'react'

export type PokemonSkeletonProps = {
  className?: string
}

export function PokemonSkeleton({
  className = '',
}: Readonly<PokemonSkeletonProps>) {
  return (
    <div className={['flex flex-col gap-4', className].filter(Boolean).join(' ')} aria-hidden>
      <div className="h-10 w-24 animate-pulse rounded-full bg-surface-secondary" />

      <div className="rounded-[1.75rem] border border-border/60 bg-surface p-5 sm:p-7 lg:p-8">
        <div className="flex flex-col gap-6 lg:grid lg:grid-cols-2 lg:items-center lg:gap-10">
          <div className="order-2 mx-auto aspect-square w-full max-w-md animate-pulse rounded-[2rem] bg-surface-secondary lg:order-1" />

          <div className="order-1 flex flex-col gap-4 lg:order-2">
            <div className="mx-auto h-4 w-16 animate-pulse rounded bg-surface-secondary lg:mx-0" />
            <div className="mx-auto h-10 w-48 animate-pulse rounded bg-surface-secondary lg:mx-0" />
          </div>

          <div className="order-3 flex justify-center gap-2 lg:order-2 lg:justify-start">
            <div className="h-8 w-20 animate-pulse rounded-full bg-surface-secondary" />
            <div className="h-8 w-20 animate-pulse rounded-full bg-surface-secondary" />
          </div>

          <div className="order-4 flex flex-col gap-3 lg:order-2">
            {Array.from({ length: 6 }, (_, index) => (
              <div key={index} className="flex flex-col gap-2">
                <div className="h-3 w-24 animate-pulse rounded bg-surface-secondary" />
                <div className="h-2.5 w-full animate-pulse rounded-full bg-surface-secondary" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
