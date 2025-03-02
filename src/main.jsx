import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.jsx'
import { ToastContainer, toast } from 'react-toastify';
import { Provider } from 'react-redux';
import store from "./store/index.js"
import "./index.css";

createRoot(document.getElementById('root')).render(


  // <StrictMode>
  <>

  <ToastContainer>

  </ToastContainer>
  <Provider store={store}>
     <App />
  </Provider>

  </>



  // </StrictMode>,
)
