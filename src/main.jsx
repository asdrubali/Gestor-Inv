import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { GestorApp } from './GestorApp.jsx'
import { Provider } from 'react-redux'
import { store } from './store/store.js'

import './style.css'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={ store } >
         <BrowserRouter>
           <GestorApp />
         </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)
