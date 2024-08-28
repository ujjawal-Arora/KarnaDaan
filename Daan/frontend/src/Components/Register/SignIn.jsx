import axios from 'axios';
import React, { useState } from 'react';
import { FaArrowLeft } from "react-icons/fa6";
import { Link,useNavigate } from 'react-router-dom';
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
function SignIn() {
  const navigate = useNavigate();
  // Hooks to store email and password
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async () => {
    // Handle sign-in logic here
    try {
      const response = await axios.post('http://localhost:3000/api/v1/user/signin', 
        { userName: email, password: password }, 
        { withCredentials: true } // Ensure cookies are sent
      );
      console.log(response.status);
       if(response.status==200){
        navigate('/enter-otp');
      }
    } catch (error) {
      console.error('Error during sign-in:', error);
    }
  };
  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const credentialDecoded = jwtDecode(credentialResponse.credential);
      console.log(credentialDecoded);

      // Make an axios call to your backend with the Google token or decoded information
      const response = await axios.post(
        "http://localhost:3000/api/v1/user/google-signin",
        {
          email: credentialDecoded.email,
          firstName: credentialDecoded.given_name,
          lastName: credentialDecoded.family_name,
        }
      );

      console.log("Backend Response:", response);
      if (response.status === 200) {
        navigate("/"); // Redirect to your dashboard or desired route
      }
    } catch (error) {
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
                {/* <button
                  className='flex rounded-xl py-3 border-2 border-gray-100 items-center justify-center gap-2'
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5.26644 9.76453C6.19903 6.93863 8.85469 4.90909 12.0002 4.90909C13.6912 4.90909 15.2184 5.50909 16.4184 6.49091L19.9093 3C17.7821 1.14545 15.0548 0 12.0002 0C7.27031 0 3.19799 2.6983 1.24023 6.65002L5.26644 9.76453Z" fill="#EA4335"/>
                    <path d="M16.0406 18.0142C14.9508 18.718 13.5659 19.0926 11.9998 19.0926C8.86633 19.0926 6.21896 17.0785 5.27682 14.2695L1.2373 17.3366C3.19263 21.2953 7.26484 24.0017 11.9998 24.0017C14.9327 24.0017 17.7352 22.959 19.834 21.0012L16.0406 18.0142Z" fill="#34A853"/>
                    <path d="M19.8342 20.9978C22.0292 18.9503 23.4545 15.9019 23.4545 11.9982C23.4545 11.2891 23.3455 10.5255 23.1818 9.81641H12V14.4528H18.4364C18.1188 16.0119 17.2663 17.2194 16.0407 18.0108L19.8342 20.9978Z" fill="#4A90E2"/>
                    <path d="M5.27698 14.2663C5.03833 13.5547 4.90909 12.7922 4.90909 11.9984C4.90909 11.2167 5.03444 10.4652 5.2662 9.76294L1.23999 6.64844C0.436587 8.25884 0 10.0738 0 11.9984C0 13.918 0.444781 15.7286 1.23746 17.3334L5.27698 14.2663Z" fill="#FBBC05"/>
                  </svg>
                  Sign in with Google
                </button> */}
              </div>
              <div className="flex justify-center mt-5">
                  <div style={{ transform: "scale(1.5)", padding: "10px" }}>
                    <GoogleLogin
                      onSuccess={handleGoogleSuccess}
                      onError={() => {
                        console.log("Login Failed");
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
