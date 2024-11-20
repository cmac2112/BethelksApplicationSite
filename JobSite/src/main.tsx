import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { LoggedInProvider } from './context/LoginContext.tsx'
import { ApplicationProvider } from './components/applicationPage/applicationContext.tsx'

createRoot(document.getElementById('root')!).render(

  <StrictMode>
    <LoggedInProvider>
      <ApplicationProvider>
    <App />
    </ApplicationProvider>
    </LoggedInProvider>
  </StrictMode>,

)
