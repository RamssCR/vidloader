import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { 
  AuthContext,
  VideoContext
} from './context/index'
import './styles/css/main.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthContext>
      <VideoContext>
        <App />
      </VideoContext>
    </AuthContext>
  </React.StrictMode>,
)
