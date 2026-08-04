import { type ReactNode } from 'react'

type AppProviderProps = {
  children: ReactNode
}

export function AppProvider({ children }: Readonly<AppProviderProps>) {
  return children
}
