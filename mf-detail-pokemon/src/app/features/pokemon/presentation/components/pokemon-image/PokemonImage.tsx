import React, { useEffect, useState } from 'react'

export type PokemonImageProps = {
  src: string
  alt: string
  accentColor?: string
  className?: string
}

export function PokemonImage({
  src,
  alt,
  accentColor,
  className = '',
}: Readonly<PokemonImageProps>) {
  const [hasError, setHasError] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setHasError(false)
    setIsLoaded(false)
  }, [src])

  const showImage = Boolean(src) && !hasError

  return (
    <div
      className={[
        'pokemon-image-stage group relative mx-auto flex w-full max-w-md items-center justify-center',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-[12%]  blur-3xl transition-opacity duration-500 group-hover:opacity-90"
        style={{
          background: accentColor
            ? `radial-gradient(circle, ${accentColor}33 0%, transparent 70%)`
            : 'radial-gradient(circle, rgba(198,40,40,0.18) 0%, transparent 70%)',
        }}
      />

      <div
        className={[
          'relative flex aspect-square w-full items-center justify-center rounded-[2rem] p-6 ',
          'transition-transform duration-500 ease-out group-hover:-translate-y-1 ',
        ].join(' ')}
      >
        {showImage ? (
          <img
            src={src}
            alt={alt}
            className={[
              'pokemon-image-enter max-h-full max-w-full object-contain drop-shadow-[0_18px_30px_rgba(0,0,0,0.28)] pokemon-image-move ',
              isLoaded ? 'opacity-100' : 'opacity-0',
            ].join(' ')}
            onLoad={() => setIsLoaded(true)}
            onError={() => setHasError(true)}
          />
        ) : (
          <span className="text-sm text-text-muted">Sin imagen</span>
        )}
      </div>
    </div>
  )
}
