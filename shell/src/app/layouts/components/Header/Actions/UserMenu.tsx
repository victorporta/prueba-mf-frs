export type UserMenuProps = {
  className?: string
}

export function UserMenu({ className = '' }: Readonly<UserMenuProps>) {
  return (
    <button
      type="button"
      aria-label="Menú de usuario"
      aria-haspopup="menu"
      className={[
        'inline-flex size-10 items-center justify-center rounded-full border border-border bg-surface-secondary text-sm font-semibold text-text',
        'hover:bg-border/40',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <span aria-hidden>U</span>
    </button>
  )
}
