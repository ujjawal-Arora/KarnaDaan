import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { GoogleOAuthProvider } from '@react-oauth/google';
import {Provider} from 'react-redux'
import { store } from './redux/store.js';

ReactDOM.createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId="648774971739-p0675rts19lvejudqlgfpdtqvtog8apk.apps.googleusercontent.com">

  <React.StrictMode>
    <Provider store={store}>
      <App />     
    </Provider>
  </React.StrictMode>,
  </GoogleOAuthProvider>
)
