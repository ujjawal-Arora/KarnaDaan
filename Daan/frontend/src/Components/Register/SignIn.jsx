import axios from 'axios';
import React, { useState,useEffect } from 'react';
import { FaArrowLeft } from "react-icons/fa6";
import { Link, useNavigate,useLocation } from 'react-router-dom';
import { GoogleLogin } from "@react-oauth/google";
import {jwtDecode} from "jwt-decode";
import toast, { Toaster } from 'react-hot-toast';
// Hook to detect location changes

function SignIn() {
  const navigate = useNavigate();
  const location = useLocation(); 
  useEffect(() => {
   
    console.log('Location changed:', location);
  }, [location]);


  // Hooks to store email and password
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/v1/user/signin', 
        { userName: email, password: password }, 
        { withCredentials: true } // Ensure cookies are sent
      );

      if(response.status === 200){
        toast.success('OTP Sent to Your Mail successfully! Redirecting...');
        setTimeout(() =>{
          navigate('/enter-otp');
        },2000)
      }
    } catch (error) {
      toast.error('Error during sign-in. Please check your credentials.');
      console.error('Error during sign-in:', error);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const credentialDecoded = jwtDecode(credentialResponse.credential);

      const response = await axios.post(
        "http://localhost:3000/api/v1/user/google-signin",
        {
          email: credentialDecoded.email,
          firstName: credentialDecoded.given_name,
          lastName: credentialDecoded.family_name,
        }
      );

      if (response.status === 200) {
        toast.success('Google Sign-in successful! Redirecting...');
        setTimeout(() =>{
          navigate('/');
        },5000)
      }
    } catch (error) {
      toast.error('Error during Google Sign-In.');
      console.error("Error during Google Sign-In:", error);
    }
  };

  return (
    <div className='flex bg-slate-50 h-screen flex-col'>
      
      {/* Top Section with Back Arrow */}
      <div className='p-4'>
        <Link to="/">
          <FaArrowLeft className='text-2xl text-gray-600' />
        </Link>
      </div>
      
      <div className='flex justify-center gap-28 mb-10 flex-grow'>
        <Toaster position="top-center" reverseOrder={false} />
        
        <div className='flex items-center justify-center'>
          <div className='bg-white shadow-xl px-8 py-10 rounded-3xl border-2 border-gray-200 w-[60vh]'>
            <h1 className='text-5xl font-semibold text-center'>
              कर्ण-Daan Login
            </h1>
            <p className='font-medium text-lg text-gray-500 mt-4'>
              Welcome!! Please enter your information
            </p>
            <div className='mt-8'>
              <div>
                <label className="text-lg font-medium">Email</label>
                <input
                  className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                  placeholder='Enter your Email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className='mt-4'>
                <label className="text-lg font-medium">Password</label>
                <input
                  className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                  placeholder='Enter your Password'
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className='mt-8 flex justify-between items-center'>
                <div>
                  <input type="checkbox" id="remember" />
                  <label className="ml-2 font-medium text-base" htmlFor="remember">
                    Remember for 30 days
                  </label>
                </div>
                <button className="font-medium text-base text-orange-400">
                  <Link to='/forgot'>Forgot password</Link>
                </button>
              </div>
              <div className='mt-8 flex flex-col gap-y-4'>
                <button
                  className='py-3 rounded-xl bg-orange-400 text-white text-lg font-bold'
                  onClick={handleSignIn}
                >
                  Sign in
                </button>
              </div>
              <div className="flex justify-center mt-5">
                <div style={{ transform: "scale(1.5)", padding: "10px" }}>
                  <GoogleLogin
                    onSuccess={handleGoogleSuccess}
                    onError={() => {
                      toast.error('Google Login Failed');
                    }}
                  />
                </div>
              </div>
              <div className='mt-8 flex justify-center items-center'>
                <p className='font-medium text-base'>Don't have an account?</p>
                <button className='text-orange-400 text-base font-medium ml-2'>
                  <Link to="/signup">Sign Up</Link>
                </button>
              </div>
            </div> 
          </div>
        </div>
        
        <div className="hidden lg:flex h-[87vh] w-[30%] items-center justify-center relative">
          <div className="w-64 h-64 bg-gradient-to-tr from-orange-500 to-gray-200 rounded-full animate-spin" />
          <div className="w-full h-1/2 absolute bg-white/10 backdrop-blur-lg" />
        </div>
      </div>
    </div>
  );
}

export default SignIn;
