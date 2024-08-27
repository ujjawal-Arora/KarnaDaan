import axios from 'axios';
import React, { useState } from 'react';
import { FaArrowLeft } from "react-icons/fa6";
import { Link,useNavigate } from 'react-router-dom';

function UpdatePassword() {
  const navigate = useNavigate();
  // Hooks to store email and password
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = async () => {
    // Handle sign-in logic here
    try {
      const response = await axios.put('http://localhost:3000/api/v1/user/update-password', 
        {  password: password }, 
        {withCredentials:true},
    
      );
      console.log(response.status);
       if(response.status==200){
        navigate('/signin');
      }
    } catch (error) {
      console.error('Error during sign-in:', error);
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
              
              <div className='mt-8 flex flex-col gap-y-4'>
                <button
                  className='py-3 rounded-xl bg-orange-400 text-white text-lg font-bold'
                  onClick={handleSignIn}
                >
                 Update Password
                </button>
              
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

export default UpdatePassword;
