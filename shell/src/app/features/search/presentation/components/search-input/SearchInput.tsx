import type { FormEvent, KeyboardEvent } from 'react'

import { Button, TextInput } from '../../../../../shared'
import { useSearchStore } from '../../../store/search.store'

export type SearchInputProps = {
  className?: string
}

export function SearchInput({ className = '' }: Readonly<SearchInputProps>) {
  const draftQuery = useSearchStore((state) => state.draftQuery)
  const setDraftQuery = useSearchStore((state) => state.setDraftQuery)
  const submitSearch = useSearchStore((state) => state.submitSearch)

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    submitSearch()
  }

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== 'Enter') return
    event.preventDefault()
    submitSearch()
  }

  return (
    <form
      onSubmit={onSubmit}
      className={['flex w-full items-start gap-2', className]
        .filter(Boolean)
        .join(' ')}
    >
      <TextInput
        name="search"
        type="search"
        value={draftQuery}
        onChange={(event) => setDraftQuery(event.target.value)}
        onKeyDown={onKeyDown}
        placeholder="Buscar Pokémon por nombre"
        aria-label="Buscar Pokémon"
        autoComplete="off"
        containerClassName="min-w-0 flex-1"
      />

      <Button type="submit" className="shrink-0">
        Buscar
      </Button>
    </form>
  )
}
