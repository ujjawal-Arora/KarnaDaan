import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { GoogleOAuthProvider } from '@react-oauth/google';
import {Provider} from 'react-redux'
import { store } from './redux/store.js';

ReactDOM.createRoot(document.getElementById('root')).render(
  // <GoogleOAuthProvider clientId="http://295938804229-335m3u79ct6lkjko9ik4kpthd8vomb9n.apps.googleusercontent.com">

  <React.StrictMode>
    <Provider store={store}>
    <GoogleOAuthProvider clientId="295938804229-335m3u79ct6lkjko9ik4kpthd8vomb9n.apps.googleusercontent.com">
    <App />
    </GoogleOAuthProvider>
    </Provider> 
  </React.StrictMode>,
  {/* </GoogleOAuthProvider> */}
)
