import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

import { EmptyState } from '../components/empty-state'
import { ErrorState } from '../components/error-state'
import { PokemonCategoryList } from '../components/pokemon-category-list'
import { PokemonGrid } from '../components/pokemon-grid'
import { PokemonSkeleton } from '../components/pokemon-skeleton'
import { usePokemonByType, usePokemonTypes } from '../hooks'

const TYPE_PARAM = 'type'

export function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const typeFromUrl = searchParams.get(TYPE_PARAM)

  const {
    data: types,
    isPending: isTypesPending,
    isError: isTypesError,
  } = usePokemonTypes()

  const isValidTypeFromUrl = Boolean(
    typeFromUrl && types?.some((type) => type.name === typeFromUrl),
  )

  const selectedType = isValidTypeFromUrl
    ? typeFromUrl
    : (types?.[0]?.name ?? null)

  useEffect(() => {
    if (!types?.length) return
    if (isValidTypeFromUrl) return

    setSearchParams({ [TYPE_PARAM]: types[0].name }, { replace: true })
  }, [types, isValidTypeFromUrl, setSearchParams])

  const handleSelectType = (typeName: string) => {
    setSearchParams({ [TYPE_PARAM]: typeName })
  }

  const {
    data: pokemon,
    isPending: isPokemonPending,
    isError: isPokemonError,
    isFetching: isPokemonFetching,
  } = usePokemonByType(selectedType ?? '', {
    enabled: Boolean(selectedType),
  })

  const showTypesSkeleton = isTypesPending
  const showTypesError = isTypesError
  const showTypesEmpty =
    !isTypesPending && !isTypesError && (!types || types.length === 0)
  const showCategories =
    !isTypesPending && !isTypesError && Boolean(types && types.length > 0)

  const showPokemonSkeleton =
    showCategories && (isPokemonPending || (isPokemonFetching && !pokemon))
  const showPokemonError = showCategories && isPokemonError
  const showPokemonEmpty =
    showCategories &&
    !isPokemonPending &&
    !isPokemonError &&
    (!pokemon || pokemon.length === 0)
  const showPokemonGrid =
    showCategories &&
    !isPokemonPending &&
    !isPokemonError &&
    Boolean(pokemon && pokemon.length > 0)

  return (
    <div className="flex flex-col gap-8">
      <header className="flex flex-col gap-2">
        <p className="text-sm font-medium text-brand">Pokédex</p>
        <h1 className="text-3xl font-semibold tracking-tight text-text">
          Explora por categorías
        </h1>
        <p className="max-w-xl text-sm text-text-secondary">
          Selecciona un tipo para ver sus primeros Pokémon.
        </p>
      </header>

      {showTypesSkeleton ? (
        <div className="flex flex-col gap-6">
          <div className="flex flex-wrap gap-2" aria-hidden>
            {Array.from({ length: 8 }, (_, index) => (
              <div
                key={index}
                className="h-9 w-20 animate-pulse rounded-lg bg-surface-secondary"
              />
            ))}
          </div>
          <PokemonSkeleton count={10} />
        </div>
      ) : null}

      {showTypesError ? (
        <ErrorState
          title="No pudimos cargar las categorías"
          message="Revisa tu conexión e inténtalo nuevamente."
        />
      ) : null}

      {showTypesEmpty ? (
        <EmptyState
          title="No hay categorías"
          message="Todavía no hay tipos de Pokémon disponibles."
        />
      ) : null}

      {showCategories && types ? (
        <>
          <PokemonCategoryList
            types={types}
            selectedType={selectedType}
            onSelectType={handleSelectType}
          />

          {showPokemonSkeleton ? <PokemonSkeleton count={10} /> : null}

          {showPokemonError ? (
            <ErrorState
              title="No pudimos cargar los Pokémon"
              message={`Revisa tu conexión e inténtalo de nuevo para ver el tipo ${selectedType}.`}
            />
          ) : null}

          {showPokemonEmpty ? (
            <EmptyState
              title="Sin Pokémon"
              message={`No encontramos Pokémon para el tipo ${selectedType}.`}
            />
          ) : null}

          {showPokemonGrid && pokemon ? (
            <PokemonGrid pokemon={pokemon} />
          ) : null}
        </>
      ) : null}
    </div>
  )
}
