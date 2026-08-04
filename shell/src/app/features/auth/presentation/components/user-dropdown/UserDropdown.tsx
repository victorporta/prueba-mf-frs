import { useEffect, useId, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { ROUTES } from '../../../../../router/routes'
import { useAuthStore } from '../../stores/auth.store'

export type UserDropdownProps = {
  className?: string
}

export function UserDropdown({ className = '' }: Readonly<UserDropdownProps>) {
  const navigate = useNavigate()
  const user = useAuthStore((state) => state.user)
  const clearSession = useAuthStore((state) => state.clearSession)

  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const menuId = useId()

  useEffect(() => {
    if (!isOpen) return

    const onPointerDown = (event: MouseEvent) => {
      const target = event.target as Node
      if (!containerRef.current?.contains(target)) {
        setIsOpen(false)
      }
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false)
    }

    window.addEventListener('mousedown', onPointerDown)
    window.addEventListener('keydown', onKeyDown)
    return () => {
      window.removeEventListener('mousedown', onPointerDown)
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [isOpen])

  if (!user) return null

  const initial = user.name.trim().charAt(0).toUpperCase() || 'U'

  const onLogout = () => {
    clearSession()
    setIsOpen(false)
    void navigate(ROUTES.LOGIN, { replace: true })
  }

  return (
    <div
      ref={containerRef}
      className={['relative', className].filter(Boolean).join(' ')}
    >
      <button
        type="button"
        aria-label={`Menú de ${user.name}`}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        aria-controls={menuId}
        onClick={() => setIsOpen((open) => !open)}
        className={[
          'inline-flex h-10 items-center gap-2 rounded-full border border-border bg-surface-secondary pl-1.5 pr-3 text-sm font-semibold text-text',
          'hover:bg-border/40',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        ].join(' ')}
      >
        <span
          aria-hidden
          className="inline-flex size-7 items-center justify-center rounded-full bg-brand text-xs text-white"
        >
          {initial}
        </span>
        <span className="max-w-28 truncate">{user.name}</span>
      </button>

      {isOpen ? (
        <div
          id={menuId}
          role="menu"
          aria-label="Opciones de usuario"
          className="absolute right-0 top-[calc(100%+0.5rem)] z-50 min-w-44 overflow-hidden rounded-xl border border-border bg-surface shadow-lg"
        >
          <div className="border-b border-border px-3 py-2">
            <p className="truncate text-sm font-medium text-text">{user.name}</p>
            <p className="truncate text-xs text-text-muted">{user.email}</p>
          </div>

          <button
            type="button"
            role="menuitem"
            onClick={onLogout}
            className={[
              'flex w-full px-3 py-2.5 text-left text-sm text-text',
              'hover:bg-surface-secondary',
              'focus-visible:outline-none focus-visible:bg-surface-secondary',
            ].join(' ')}
          >
            Cerrar sesión
          </button>
        </div>
      ) : null}
    </div>
  )
}
