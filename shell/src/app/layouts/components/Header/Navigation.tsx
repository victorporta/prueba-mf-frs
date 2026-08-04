import { NavLink } from 'react-router-dom'

import { ROUTES } from '../../../router/routes'

const navItems = [
  { label: 'Home', to: ROUTES.HOME },
  { label: 'History', to: ROUTES.HISTORY },
] as const

export type NavigationProps = {
  className?: string
}

export function Navigation({ className = '' }: Readonly<NavigationProps>) {
  return (
    <nav
      aria-label="Principal"
      className={['flex items-center gap-1', className]
        .filter(Boolean)
        .join(' ')}
    >
      {navItems.map(({ label, to }) => (
        <NavLink
          key={to}
          to={to}
          end={to === ROUTES.HOME}
          className={({ isActive }) =>
            [
              'rounded-lg px-3 py-2 text-sm font-medium transition-colors',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background',
              isActive
                ? 'bg-surface-secondary text-text'
                : 'text-text-secondary hover:bg-surface-secondary hover:text-text',
            ].join(' ')
          }
        >
          {label}
        </NavLink>
      ))}
    </nav>
  )
}
