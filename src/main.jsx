import React, { createContext, useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/app.scss'



export const serverUrl = "https://nodejs-todo-app-okfn.onrender.com/api/v1"

export const Context = createContext({ isAuthenticated: false });

const AppWrapper = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(false)
  const [user, setUser] = useState({})
  return (
    <Context.Provider 
     value={{
      isAuthenticated,
      setIsAuthenticated,
      user,
      setUser,
      loading,
      setLoading,
     }}
    >
      <App />
    </Context.Provider>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>,
)
