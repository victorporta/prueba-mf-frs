import { SearchEmpty } from '../search-empty'

export type SearchResultsProps = {
  className?: string
}

export function SearchResults({ className = '' }: Readonly<SearchResultsProps>) {
  return (
    <div className={['flex flex-col gap-4', className].filter(Boolean).join(' ')}>
      <p className="text-sm text-text-secondary">
        Los resultados de búsqueda aparecerán aquí.
      </p>
      <SearchEmpty />
    </div>
  )
}
