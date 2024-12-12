import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './assets/sass/styles.scss'
import Form from './components/form'
import SecondForm from './components/secondForm'
import ToolkitForm from './components/toolkitForm'
import KeywordRankingForm from './components/keywordRankingForm'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Form />
    <KeywordRankingForm />
    <SecondForm />
    <ToolkitForm />
  </StrictMode>,
)
