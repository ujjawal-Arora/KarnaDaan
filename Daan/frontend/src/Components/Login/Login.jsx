import React, { useState } from 'react';
import { FaFacebook, FaGithub, FaGoogle } from 'react-icons/fa';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  const handleSignIn = () => {
    // Handle the sign-in logic here
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white rounded-2xl shadow-2xl flex flex-col justify-center w-full md:w-1/3 items-center max-w-4xl transition duration-1000 ease-out">
        <h2 className='p-3 text-3xl font-bold text-pink-400'>Horiz</h2>
        <div className="inline-block border-[1px] justify-center w-20 border-blue-400 border-solid"></div>
        <h3 className='text-xl font-semibold text-blue-400 pt-2'>Sign In!</h3>
        <div className='flex space-x-2 m-4 items-center justify-center'>
          <div className="socialIcon">
            <FaFacebook />
          </div>
          <div className="socialIcon">
            <FaGithub />
          </div>
          <div className="socialIcon">
            <FaGoogle />
          </div>
        </div>
        {/* Inputs */}
        <div className='flex flex-col items-center justify-center'>
          <input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='rounded-2xl px-2 py-1 w-4/5 md:w-full border-[1px] border-blue-400 m-1 focus:shadow-md focus:border-pink-400 focus:outline-none focus:ring-0'
            placeholder='Email'
          />
          <input
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='rounded-2xl px-2 py-1 w-4/5 md:w-full border-[1px] border-blue-400 m-1 focus:shadow-md focus:border-pink-400 focus:outline-none focus:ring-0'
            placeholder='Password'
          />
          <button
            onClick={handleSignIn}
            className='rounded-2xl m-2 text-white bg-blue-400 w-2/5 px-4 py-2 shadow-md hover:text-blue-400 hover:bg-white transition duration-200 ease-in'
          >
            Sign In
          </button>
        </div>
        <div className="inline-block border-[1px] justify-center w-20 border-blue-400 border-solid"></div>
        <p className='text-blue-400 mt-4 text-sm'>Don't have an account?</p>
        <p
          className='text-blue-400 mb-4 text-sm font-medium cursor-pointer'
          onClick={() => setIsLogin(false)}
        >
          Create a New Account?
        </p>
      </div>
    </div>
  );
};

export default Login;