import { useState } from 'react'
import Appbar from './Components/Appbar'
import {BrowserRouter, Routes,Route} from 'react-router-dom'
import Donates from './Pages/Donates'
import Login from './Components/Login/Login'
import SignUp from './Components/Register/SignUp'
import SignIn from './Components/Register/SignIn'

import Home from './Pages/Home'
import MainCard from './Components/MainCard'
import Forgot from './Components/Register/Forgot'
import FillOtp from './Components/Register/FillOtp'
function App() {
  const [count, setCount] = useState(0)

  return (
   <BrowserRouter>
    <Routes>
   
     <Route exact path="/"  element={<Home/>} />
     <Route exact path="/donate"  element={<Donates/>} />
     <Route exact path="/login"  element={<Login/>} />
     <Route exact path="/signup"  element={<SignUp/>} />
     <Route exact path="/signin"  element={<SignIn/>} />
     <Route exact path="/forgot"  element={<Forgot/>} />
     <Route exact path="/enter-otp"  element={<FillOtp/>} />



     <Route exact path="/main" element={<MainCard/>} />

    </Routes>
   </BrowserRouter>
  
  )
}

export default App
