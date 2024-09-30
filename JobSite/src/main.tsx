import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { GoogleOAuthProvider } from '@react-oauth/google'
import App from './App.tsx'
import './index.css'

// adminstrator view
// CRUD job posts
//add and remove rows from sql database

//job application page
//fix some css stuff, possibly move over to tailwindscss

createRoot(document.getElementById('root')!).render(
  <GoogleOAuthProvider clientId='654002577170-pgbrl8ep7k8hiohadh8q9fsgm2849287.apps.googleusercontent.com'>
  <StrictMode>
    <App />
  </StrictMode>,
  </GoogleOAuthProvider>
)
