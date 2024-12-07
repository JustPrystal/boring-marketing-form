import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './assets/sass/styles.scss'
import Form from './components/form'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Form />
  </StrictMode>,
)
