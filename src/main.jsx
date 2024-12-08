import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './assets/sass/styles.scss'
import Form from './components/form'
import SecondForm from './components/secondForm'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Form />
    <SecondForm />
  </StrictMode>,
)
