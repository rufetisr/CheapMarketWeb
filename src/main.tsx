import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { AppProvider } from './context/Context.tsx'

createRoot(document.getElementById('root')!).render(
  <>
    <BrowserRouter>
      <AppProvider>
        <App />
      </AppProvider>
    </BrowserRouter>
  </>,
)
