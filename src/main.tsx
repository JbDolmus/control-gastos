import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { BudgetProvider } from './context/BudgetContext.tsx'
import Router from './router.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BudgetProvider>
      <Router/>
    </BudgetProvider>
  </React.StrictMode>,
)
