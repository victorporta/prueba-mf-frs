import { MoonIcon, SunIcon } from './icons'
import { useTheme } from '../hooks/useTheme'

export type ThemeToggleProps = {
  className?: string
  labels?: boolean
}

export function ThemeToggle({
  className = '',
  labels = true,
}: Readonly<ThemeToggleProps>) {
  const { theme, toggleTheme, isDark } = useTheme()

  return (
    <div
      className={['inline-flex items-center gap-2', className]
        .filter(Boolean)
        .join(' ')}
    >
      {labels ? (
        <span
          className={[
            'text-xs font-medium',
            isDark ? 'text-text-muted' : 'text-text',
          ].join(' ')}
        >
          Light
        </span>
      ) : null}

      <button
        type="button"
        role="switch"
        aria-checked={isDark}
        aria-label={isDark ? 'Activar modo claro' : 'Activar modo oscuro'}
        onClick={toggleTheme}
        className={[
          'relative inline-flex h-7 w-12 shrink-0 cursor-pointer items-center rounded-full border border-border',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background',
          isDark ? 'bg-brand' : 'bg-surface-secondary',
        ].join(' ')}
      >
        <span
          aria-hidden
          className={[
            'pointer-events-none absolute left-0.5 top-0.5 flex size-5 items-center justify-center rounded-full bg-surface shadow-sm',
            'transition-transform duration-200 ease-out',
            isDark ? 'translate-x-5' : 'translate-x-0',
          ].join(' ')}
        >
          {isDark ? <MoonIcon /> : <SunIcon />}
        </span>
        <span className="sr-only">
          Tema actual: {theme === 'dark' ? 'oscuro' : 'claro'}
        </span>
      </button>

      {labels ? (
        <span
          className={[
            'text-xs font-medium',
            isDark ? 'text-text' : 'text-text-muted',
          ].join(' ')}
        >
          Dark
        </span>
      ) : null}
    </div>
  )
}
