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
import { useEffect } from 'react'
import Landing from  './Pages/Landing.jsx'

// import Footer from "./components/Footer";

import Message from './chat/Message.jsx'
function App() {
 const isLoggedIn = useSelector((state)=>state.auth.isLoggedIn)
 
 

  return (
    
    
   <BrowserRouter>
         <ToastContainer />
    <Routes>
    <Route exact path="/"  element={<Landing/>} />

     <Route exact path="/home"  element={<Home/>} />
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

export default App;



// import { useState, useEffect } from "react";
// import Navbar from "./components/Navbar";
// import HeroSection from "./components/HeroSection";
// import FeatureSection from "./components/FeatureSection";
// import Workflow from "./components/Workflow";
// import Footer from "./components/Footer";
// import Testimonials from "./components/Testimonials";
// import ProgressBar from "./components/ProgressBar";
// import PreLoader from "./components/PreLoader";

// const App = () => {
//   const [isLoaded, setIsLoaded] = useState(false);

//   useEffect(() => {
//     document.body.classList.add("no-scroll"); // Prevent scrolling

//     const timer = setTimeout(() => {
//       setIsLoaded(true);
//       document.body.classList.remove("no-scroll"); // Re-enable scrolling
//     }, 3000); // Preloader duration

//     return () => clearTimeout(timer);
//   }, []);

//   return (
//     <>
//       <PreLoader isLoaded={isLoaded} />
//       {isLoaded && (
//         <>
//           <style>
//             {`
//               @keyframes fadeIn {
//                 0% { opacity: 0; }
//                 100% { opacity: 1; }
//               }

//               .fade-in {
//                 animation: fadeIn 1s ease-in-out forwards;
//               }
//             `}
//           </style>
//           <div className="fade-in">
//             <ProgressBar />
//             <Navbar />
//             <div className="max-w-7xl mx-auto pt-20 px-6">
//               <HeroSection />
//               <div id="features">
//                 <FeatureSection />
//               </div>
//               <div id="workflow">
//                 <Workflow />
//               </div>
//               <div id="testimonials">
//                 <Testimonials />
//               </div>
//               <Footer />
//             </div>
//           </div>
//         </>
//       )}
//     </>
//   );
// };

// export default App;
