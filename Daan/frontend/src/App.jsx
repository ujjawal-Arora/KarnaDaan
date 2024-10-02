import { useState } from 'react'
import {BrowserRouter, Routes,Route} from 'react-router-dom'
import Donates from './Pages/Donates'
import SignUp from './Components/Register/SignUp'
import SignIn from './Components/Register/SignIn'
import  { Toaster } from 'react-hot-toast';
import Home from './Pages/Home'
import MainCard from './Components/MainCard'
import Forgot from './Components/Register/Forgot'
import FillOtp from './Components/Register/FillOtp'
import FillOtpForget from './Components/Register/FillOtpForgot'
import UpdatePassword from './Components/Register/UpdatePassword'
import Requests from './Pages/Requests'
import Footer from './material/Footer'
import { useDispatch,useSelector } from'react-redux';
import { authActions } from './redux/Slice/slice.js';
import Donations from './Components/Personal/Donations.jsx'
import Funds from './Components/Personal/Funds.jsx'
import Wishlist from './Components/Personal/Wishlist.jsx'
import Req_ur from './Components/Personal/Req_ur.jsx'
import ToastContainer from './Helper/ToastCotainer.jsx'
import HomeChat from './chat/HomeChat.jsx'
import Message from './chat/Message.jsx'
function App() {
 const isLoggedIn = useSelector((state)=>state.auth.isLoggedIn)
 console.log(isLoggedIn)
 
  return (
   <BrowserRouter>
         <ToastContainer />

    <Routes>
     <Route exact path="/"  element={<Home/>} />
     <Route exact path="/donate"  element={<Donates/>} />
     <Route exact path="/request"  element={<Requests/>} />

     <Route exact path="/signup"  element={<SignUp/>} />
     <Route exact path="/signin"  element={<SignIn/>} />
     <Route exact path="/forgot"  element={<Forgot/>} />

     <Route exact path="/your-donations"  element={<Donations/>} />
     <Route exact path="/your-requests"  element={<Req_ur/>} />
     <Route exact path="/your-funds"  element={<Funds/>} />
     <Route exact path="/wishlist"  element={<Wishlist/>} />

     <Route exact path="/enter-otp"  element={<FillOtp/>} />
     <Route exact path="/enter-forget-otp"  element={<FillOtpForget/>} />

     <Route exact path="/update-password"  element={<UpdatePassword/>} />
     <Route exact path="/main" element={<MainCard/>} />
     <Route exact path='/maincard/:id' element={<MainCard/> }/>

     <Route path="/chat" element={<HomeChat />}>
          <Route path=":userId" element={<Message />} />
        </Route>

    </Routes>
    {/* <Footer/>  */}
   </BrowserRouter>

  )
}

export default App
