import axios from 'axios';
import React, { useState } from 'react';
import { FaFacebook, FaGithub, FaGoogle } from 'react-icons/fa';
import { account } from '../../AppWrite/appWrite';
import { OAuthProvider } from 'appwrite';
function SignUp() {
  // State for form inputs
  const [name, setName] = useState('');
  const [lname, setlName] = useState('');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setconfirmPassword] = useState('');
  

  // Handle form submission
  const handleSubmit = async (e) => {
    // const response=await axios.post('http://localhost:3000/api/v1/user/signup',{
    //             userName:email,
    //             firstName:name,
    //             lastName:lname,
    //             email,
    //             password,
    //             confirmPassword
        
    // });
    // console.log(response);
    account.createOAuth2Session(
        OAuthProvider.Google,
        'http://localhost:5173/',
        'http://localhost:5173/fail',
        
    )
    const acc = new account(client);

  };
  // const handleGoogleSuccess = async (response) => {
  //   try {
  //     const googleUser = await account.createOAuth2Session(
  //       'google',
  //       'http://localhost:5173/',
  //       'http://localhost:5173/fail'
  //     );
  //     console.log('Google login successful:', googleUser);
  //   } catch (error) {
  //     console.error('Error with Google login:', error);
  //   }
  // };

  return (
  //   <div className="flex items-center justify-center min-h-screen bg-gray-100">
  //     <div className="bg-gray-400 text-white rounded-2xl shadow-2xl flex flex-col w-full md:w-1/3 items-center max-w-4xl transition duration-1000 ease-in">
  //       <h2 className='p-3 text-3xl font-bold text-white'>Horiz</h2>
  //       <div className="inline-block border-[1px] justify-center w-20 border-white border-solid"></div>
  //       <h3 className='text-xl font-semibold text-white pt-2'>Create Account!</h3>
  //       <div className='flex space-x-2 m-4 items-center justify-center'>
  //         <div className="socialIcon border-white">
  //           <FaFacebook className="text-white"/>
  //         </div>
  //         <div className="socialIcon border-white">
  //           <FaGithub className="text-white"/>
  //         </div>
  //         <div className="socialIcon border-white">
  //           <FaGoogle className="text-white"/>  
  //         </div>
  //       </div>
  //       {/* Inputs */}
  //       <form className='flex flex-col items-center justify-center mt-2' >
  //         <input 
  //           type="text" 
  //           className='rounded-2xl text-black px-2 py-1 w-4/5 md:w-full border-[1px] border-blue-400 m-1 focus:shadow-md focus:border-pink-400 focus:outline-none focus:ring-0' 
  //           placeholder='Name' 
  //           value={name} 
  //           onChange={(e) => setName(e.target.value)} 
  //         />
  // <input 
  //           type="text" 
  //           className='rounded-2xl text-black px-2 py-1 w-4/5 md:w-full border-[1px] border-blue-400 m-1 focus:shadow-md focus:border-pink-400 focus:outline-none focus:ring-0' 
  //           placeholder=' last Name' 
  //           value={lname} 
  //           onChange={(e) => setlName(e.target.value)} 
  //         />

  //         <input 

  //           type='email' 
  //           className='rounded-2xl px-2 text-black py-1 w-4/5 md:w-full border-[1px] border-blue-400 m-1 focus:shadow-md focus:border-pink-400 focus:outline-none focus:ring-0' 
  //           placeholder='Email' 
  //           value={email} 
  //           onChange={(e) => setEmail(e.target.value)} 
  //         />
  //         <input 
  //           type="password" 
  //           className='rounded-2xl px-2 py-1 text-black w-4/5 md:w-full border-[1px] border-blue-400 m-1 focus:shadow-md focus:border-pink-400 focus:outline-none focus:ring-0' 
  //           placeholder='Password' 
  //           value={password} 
  //           onChange={(e) => setPassword(e.target.value)} 
  //         />
  //         <input 
  //           type="text" 
  //           className='rounded-2xl px-2 py-1 text-black w-4/5 md:w-full border-[1px] border-blue-400 m-1 focus:shadow-md focus:border-pink-400 focus:outline-none focus:ring-0' 
  //           placeholder='confirm Password...' 
  //           value={confirmPassword} 
  //           onChange={(e) => setconfirmPassword(e.target.value)} 
  //         />
  //         <button  onClick={handleSubmit}
  //           className='rounded-2xl m-4  text-blue-400 bg-white w-3/5 px-4 py-2 shadow-md hover:text-white hover:bg-blue-400 transition duration-200 ease-in'>
  //           Sign Up
            
  //         </button>
  //       </form>
  //       <div className="inline-block border-[1px] justify-center w-20 border-white border-solid"></div>
  //       <p className='text-white mt-4 text-sm'>Already have an account?</p>
  //       <p className='text-white mb-4 text-sm font-medium cursor-pointer' >Sign In to your Account?</p>
  //     </div>
  //   </div>
  <div>
     <button  onClick={handleSubmit}
            className='rounded-2xl m-4  text-blue-400 bg-white w-3/5 px-4 py-2 shadow-md hover:text-white hover:bg-blue-400 transition duration-200 ease-in'>
            Sign Up
            
          </button>
  </div>
  );
}

export default SignUp;
