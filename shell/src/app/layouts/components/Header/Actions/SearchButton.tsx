import { useSearchStore } from '../../../../features/search'

export type SearchButtonProps = {
  className?: string
}

export function SearchButton({ className = '' }: Readonly<SearchButtonProps>) {
  const open = useSearchStore((state) => state.open)
  const isOpen = useSearchStore((state) => state.isOpen)

  return (
    <button
      type="button"
      onClick={open}
      aria-label="Buscar Pokémon"
      aria-haspopup="dialog"
      aria-expanded={isOpen}
      className={[
        'inline-flex size-10 items-center justify-center rounded-lg border border-border bg-surface text-text-secondary',
        'hover:bg-surface-secondary hover:text-text',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <svg
        aria-hidden
        viewBox="0 0 24 24"
        className="size-5"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-3.5-3.5" />
      </svg>
    </button>
  )
}
