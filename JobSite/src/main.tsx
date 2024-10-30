import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { LoggedInProvider } from './context/LoginContext.tsx'

createRoot(document.getElementById('root')!).render(

  <StrictMode>
    <LoggedInProvider>
    <App />
    </LoggedInProvider>
  </StrictMode>,

)
