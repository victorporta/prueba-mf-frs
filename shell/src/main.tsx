import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './app/App.tsx'
import {
  AppProvider,
  QueryProvider,
  ThemeProvider,
} from './app/providers'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AppProvider>
      <QueryProvider>
        <ThemeProvider>
        <BrowserRouter>
            <App />
          </BrowserRouter>
        </ThemeProvider>
      </QueryProvider>
     </AppProvider>
  </StrictMode>,
)
