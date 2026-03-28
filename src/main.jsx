import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css' // Esta línea conecta el CSS con el proyecto

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)