import { Link } from 'react-router-dom'

import { ROUTES } from '../../../router/routes'

export type LogoProps = {
  className?: string
  to?: string
}

export function Logo({
  className = '',
  to = ROUTES.HOME,
}: Readonly<LogoProps>) {
  return (
    <Link
      to={to}
      className={[
        'inline-flex items-center gap-2 text-lg font-semibold tracking-tight text-text',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      aria-label="Metrica — inicio"
    >
      <span
        aria-hidden
        className="flex size-8 items-center justify-center rounded-lg bg-brand text-sm font-bold text-white"
      >
        M
      </span>
      <span>Metrica</span>
    </Link>
  )
}
