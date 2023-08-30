// eslint-disable-next-line no-unused-vars
import React from 'react'
import ReactDOM from 'react-dom/client'
import {Provider} from "react-redux";
import store from "@/store/index.jsx";
import App from './View/App.jsx'
import './assets/index.css'


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>,
)
