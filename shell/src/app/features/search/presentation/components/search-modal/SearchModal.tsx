import { useEffect, useRef, type RefObject } from 'react'

import {
  useInfinitePokemonList,
  usePokemonSearch,
  type PokemonSummary,
} from '../../../../pokemon'
import { useSearchStore } from '../../../store/search.store'
import { SearchEmpty } from '../search-empty'
import { SearchError } from '../search-error'
import { SearchGrid } from '../search-grid'
import { SearchInput } from '../search-input'
import { SearchSkeleton } from '../search-skeleton'

export function SearchModal() {
  const isOpen = useSearchStore((state) => state.isOpen)
  const close = useSearchStore((state) => state.close)
  const submittedQuery = useSearchStore((state) => state.submittedQuery)

  const hasQuery = submittedQuery.length > 0

  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const loadMoreRef = useRef<HTMLDivElement>(null)

  const {
    data,
    isPending,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfinitePokemonList({
    enabled: isOpen && !hasQuery,
  })

  const {
    data: searchResult,
    isPending: isSearchPending,
    isError: isSearchError,
    isNotFound,
  } = usePokemonSearch(submittedQuery, {
    enabled: isOpen && hasQuery,
  })

  const pokemon = data?.pages.flatMap((page) => page.results) ?? []

  useEffect(() => {
    if (!isOpen) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previousOverflow
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        close()
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [isOpen, close])

  useEffect(() => {
    if (!isOpen || hasQuery) return

    const root = scrollContainerRef.current
    const sentinel = loadMoreRef.current
    if (!root || !sentinel) return

    const observer = new IntersectionObserver(
      (entries) => {
        const isVisible = entries[0]?.isIntersecting
        if (!isVisible || !hasNextPage || isFetchingNextPage) return
        void fetchNextPage()
      },
      {
        root,
        rootMargin: '200px',
        threshold: 0,
      },
    )

    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [
    isOpen,
    hasQuery,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    pokemon.length,
  ])

  if (!isOpen) return null

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col bg-background text-text"
      role="dialog"
      aria-modal="true"
      aria-labelledby="search-modal-title"
    >
      <div className="border-b border-border bg-surface">
        <div className="mx-auto flex w-full max-w-5xl items-center gap-3 px-4 py-4">
          <div className="min-w-0 flex-1">
            <h2 id="search-modal-title" className="sr-only">
              Buscar Pokémon
            </h2>
            <SearchInput />
          </div>

          <button
            type="button"
            onClick={close}
            aria-label="Cerrar buscador"
            className={[
              'inline-flex h-10 shrink-0 items-center justify-center rounded-lg border border-border bg-surface px-3 text-sm font-medium text-text',
              'hover:bg-surface-secondary',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background',
            ].join(' ')}
          >
            Cerrar
          </button>
        </div>
      </div>

      <div
        ref={scrollContainerRef}
        className="mx-auto w-full max-w-5xl flex-1 overflow-y-auto px-4 py-6"
      >
        {hasQuery ? (
          <SearchQueryResults
            isPending={isSearchPending}
            isError={isSearchError}
            isNotFound={isNotFound}
            result={searchResult}
          />
        ) : (
          <InfiniteListResults
            isPending={isPending}
            isError={isError}
            pokemon={pokemon}
            loadMoreRef={loadMoreRef}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
          />
        )}
      </div>
    </div>
  )
}

type SearchQueryResultsProps = {
  isPending: boolean
  isError: boolean
  isNotFound: boolean
  result: PokemonSummary | null | undefined
}

function SearchQueryResults({
  isPending,
  isError,
  isNotFound,
  result,
}: Readonly<SearchQueryResultsProps>) {
  if (isPending) return <SearchSkeleton count={1} />

  if (isNotFound) {
    return <SearchEmpty title="Pokémon no encontrado." message="" />
  }

  if (isError) {
    return (
      <SearchError
        title="No pudimos completar la búsqueda"
        message="Revisa tu conexión e inténtalo nuevamente."
      />
    )
  }

  if (!result) return null

  return <SearchGrid pokemon={[result]} />
}

type InfiniteListResultsProps = {
  isPending: boolean
  isError: boolean
  pokemon: PokemonSummary[]
  loadMoreRef: RefObject<HTMLDivElement | null>
  hasNextPage: boolean
  isFetchingNextPage: boolean
}

function InfiniteListResults({
  isPending,
  isError,
  pokemon,
  loadMoreRef,
  hasNextPage,
  isFetchingNextPage,
}: Readonly<InfiniteListResultsProps>) {
  if (isPending) return <SearchSkeleton count={12} />

  if (isError) {
    return (
      <SearchError
        title="No pudimos cargar los Pokémon"
        message="Revisa tu conexión e inténtalo nuevamente."
      />
    )
  }

  if (pokemon.length === 0) {
    return (
      <SearchEmpty
        title="Sin Pokémon"
        message="No hay Pokémon disponibles para mostrar."
      />
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <SearchGrid pokemon={pokemon} />

      <div
        ref={loadMoreRef}
        className="flex min-h-10 items-center justify-center py-2"
      >
        {isFetchingNextPage ? (
          <div
            className="flex items-center gap-2 text-sm text-text-secondary"
            aria-live="polite"
          >
            <span
              className="size-4 animate-spin rounded-full border-2 border-current border-r-transparent"
              aria-hidden
            />
            Cargando más Pokémon…
          </div>
        ) : null}

        {!hasNextPage && !isFetchingNextPage ? (
          <p className="text-sm text-text-muted">No hay más Pokémon</p>
        ) : null}
      </div>
    </div>
  )
}
