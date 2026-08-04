export type PokemonCategoryItemProps = {
  name: string
  selected?: boolean
  onSelect: (name: string) => void
  className?: string
}

export function PokemonCategoryItem({
  name,
  selected = false,
  onSelect,
  className = '',
}: Readonly<PokemonCategoryItemProps>) {
  return (
    <button
      type="button"
      onClick={() => onSelect(name)}
      aria-pressed={selected}
      className={[
        'rounded-lg px-3 py-2 text-sm font-medium capitalize transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        selected
          ? 'bg-brand text-white'
          : 'bg-surface-secondary text-text-secondary hover:bg-border/40 hover:text-text',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {name}
    </button>
  )
}
