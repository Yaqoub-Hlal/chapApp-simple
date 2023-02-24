import React, { useContext, useEffect, useState } from 'react'
import './App.css'
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import SingUp from './pages/signUp/SignUp'
import { ProtectHomeRoute, ProtectLoginRoute, VerifiedEmailProtect } from './routes/ProtectRoutes'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { AuthContext } from './context/authContext'
import EmailNotverifed from './components/EmailNotVerfied'


function App() {

  const [userState, setUserState] = useState("")
  const {currentUser} = useContext(AuthContext)


  const router = createBrowserRouter([
    {
      path: "/" ,
      element:<ProtectHomeRoute user={!!currentUser}><Home/></ProtectHomeRoute>
      
    },
    {
      path: "login",
      element: <ProtectLoginRoute user={!!currentUser} ><Login /></ProtectLoginRoute>,
    },
    {
      path: "singup",
      element:  <SingUp />,

    },
    {
      path:"verificationemail",
      element: 
      <VerifiedEmailProtect  user={currentUser}>
        <EmailNotverifed />
      </VerifiedEmailProtect>
    }
    
      
  ]);


  return (
    <div className="App">
     
    <RouterProvider router={router} />
      
  
      </div>
  )
}

export default App
