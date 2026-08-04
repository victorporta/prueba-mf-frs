import { Actions } from './Actions'
import { Logo } from './Logo'
import { Navigation } from './Navigation'

export type HeaderProps = {
  className?: string
}

export function Header({ className = '' }: Readonly<HeaderProps>) {
  return (
    <header
      className={[
        'sticky top-0 z-40 border-b border-border bg-surface/90 backdrop-blur-sm',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-4 px-4">
        <div className="flex min-w-0 items-center gap-6">
          <Logo />
          <Navigation className="hidden sm:flex" />
        </div>
        <Actions />
      </div>
    </header>
  )
}
