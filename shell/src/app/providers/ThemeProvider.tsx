import { type ReactNode } from 'react'
import { useTheme } from '../features/theme'

type ThemeProviderProps = {
  children: ReactNode
}

export function ThemeProvider({ children }: Readonly<ThemeProviderProps>) {
  useTheme()
  return children
}
