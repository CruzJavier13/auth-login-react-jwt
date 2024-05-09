import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider} from 'react-router-dom'
import Login from './routes/Login'
import Logout from './routes/Logout'
import App from './App.tsx'
import './index.css'
import Dashboard from './routes/Dashboard.tsx'
import ProtectRoute from './routes/ProtectRoute.tsx'
import {AuthProvider} from './auth/AuthProvider.tsx'
import SignUp from './routes/SignUp.tsx'

const router = createBrowserRouter([
  {
    path:'/login',
    element: <Login />
  },
  {
    path:'/logout',
    element: <Logout />
  },
  {
    path:'/',
    element: <ProtectRoute />,
    children: [
      {
        path: '/dashboard',
        element: <Dashboard />
      }
    ]
  },
  {
    path: '/signup',
    element: <SignUp />
  }
  
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router}/>
    </AuthProvider>
  </React.StrictMode>,
)
