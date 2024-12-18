import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "./redux/Slice/slice.js";
import { Toaster } from "react-hot-toast";


// Pages and Components
import Donates from "./Pages/Donates";
import ProtectedRoute from "./Pages/ProtectedRoute.jsx";
import SignUp from "./Components/Register/SignUp";
import SignIn from "./Components/Register/SignIn";
import Home from "./Pages/Home";
import MainCard from "./Components/MainCard";
import Forgot from "./Components/Register/Forgot";
import FillOtp from "./Components/Register/FillOtp";
import FillOtpForget from "./Components/Register/FillOtpForgot";
import UpdatePassword from "./Components/Register/UpdatePassword";
import Requests from "./Pages/Requests";
import Donations from "./Components/Personal/Donations.jsx";
import Funds from "./Components/Personal/Funds.jsx";
import Wishlist from "./Components/Personal/Wishlist.jsx";
import Req_ur from "./Components/Personal/Req_ur.jsx";
import ToastContainer from "./Helper/ToastCotainer.jsx";
import HomeChat from "./chat/HomeChat.jsx";
import Landing from "./Pages/Landing.jsx";
import Message from "./chat/Message.jsx";
import PageNotFound from "./Pages/PageNotFound.jsx";
import PaymentSuccessful from "./Pages/PaymentSuccessful.jsx";
import Stripe from "./Funds/Stripe.jsx";
import Posts from "./Components/Personal/Posts.jsx";
import MainReqCard from "./Components/MainReqCard.jsx";
function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  // State for user loading
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    console.log("storedUser", storedUser);
    if (storedUser) {
      dispatch(authActions.login()); // Set user as logged in
    }
    setLoading(false);
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>; // Show a loading state while checking login status
  }

  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route
          path="/signup"
          element={
            <ProtectedRoute reverseProtection>
              <SignUp />
            </ProtectedRoute>
          }
        />
        <Route
          path="/stripe"
          element={
            <ProtectedRoute>
              <Stripe />
            </ProtectedRoute>
          }
        />
        <Route path="/success" element={<PaymentSuccessful />} />

        <Route
          path="/signin"
          element={
            <ProtectedRoute reverseProtection>
              <SignIn />
            </ProtectedRoute>
          }
        />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/enter-otp" element={<FillOtp />} />
        <Route path="/enter-forget-otp" element={<FillOtpForget />} />
        <Route path="/update-password" element={<UpdatePassword />} />

        {/* Protected Routes */}
        <Route
          path="/donate"
          element={
            <ProtectedRoute>
              <Donates />
            </ProtectedRoute>
          }
        />
        <Route
          path="/request"
          element={
            <ProtectedRoute>
              <Requests />
            </ProtectedRoute>
          }
        />
        <Route
          path="/your-donations"
          element={
            <ProtectedRoute>
              <Donations />
            </ProtectedRoute>
          }
        />
        <Route
          path="/your-requests"
          element={
            <ProtectedRoute>
              <Req_ur />
            </ProtectedRoute>
          }
        />
        <Route
          path="/your-funds"
          element={
            <ProtectedRoute>
              <Funds />
            </ProtectedRoute>
          }
        />
        <Route
          path="/wishlist"
          element={
            <ProtectedRoute>
              <Wishlist />
            </ProtectedRoute>
          }
        />
        <Route
          path="/main"
          element={
            <ProtectedRoute>
              <MainCard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/maincard/:id"
          element={
            <ProtectedRoute>
              <MainCard />
            </ProtectedRoute>
          }
        />
          <Route
          path="/mainReqCard/:id"
          element={
            <ProtectedRoute>
              <MainReqCard />
            </ProtectedRoute>
          }
        />
      <Route
      
          path="/chat"
          element={
            <ProtectedRoute>
              <HomeChat />
            </ProtectedRoute>
          }
        >
          <Route path=":userId" element={<Message />} />
        </Route>

     <Route exact path="/your-posts"  element={<Posts/>} />
     {/* <Route exact path="/your-requests"  element={<Req_ur/>} />
     <Route exact path="/your-funds"  element={<Funds/>} />
     <Route exact path="/wishlist"  element={<Wishlist/>} />

     <Route exact path="/enter-otp"  element={<FillOtp/>} />
     <Route exact path="/enter-forget-otp"  element={<FillOtpForget/>} />

     <Route exact path="/update-password"  element={<UpdatePassword/>} />
     <Route exact path="/main" element={<MainCard/>} />
     <Route exact path='/maincard/:id' element={<MainCard/> }/>
     <Route exact path='/mainReqCard/:id' element={<MainReqCard/> }/> */}



        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
