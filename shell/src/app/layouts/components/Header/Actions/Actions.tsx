import { ThemeToggle } from '../../../../features/theme'
import { UserDropdown } from '../../../../features/auth'

import { SearchButton } from './SearchButton'

export type ActionsProps = {
  className?: string
}

export function Actions({ className = '' }: Readonly<ActionsProps>) {
  return (
    <div
      className={['flex items-center gap-2', className]
        .filter(Boolean)
        .join(' ')}
    >
      <SearchButton />
      <ThemeToggle labels={false} />
      <UserDropdown />
    </div>
  )
}
