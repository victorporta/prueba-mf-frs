import { ThemeToggle } from '../../../../features/theme'

import { SearchButton } from './SearchButton'
import { UserMenu } from './UserMenu'

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
      <UserMenu />
    </div>
  )
}
