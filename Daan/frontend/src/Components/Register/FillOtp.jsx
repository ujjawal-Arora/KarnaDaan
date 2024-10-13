import React, { useState, useEffect } from 'react';
import OtpCard from './OtpCard';
import { FaArrowLeft } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate,useLocation } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { useDispatch,useSelector } from'react-redux';
import { authActions } from '../../redux/Slice/slice.js';
import Lottie from 'lottie-react'

import LoadingAnimation from '../../assets/loading.json'

function FillOtp({istrue}) {
  const dispatch=useDispatch();
  const location = useLocation();
  const { userName } = location.state || {};
  const [loading, setLoading] = useState(false);

  const isLoggedIn = useSelector((state)=>state.auth.isLoggedIn)
    const [otp, setOtp] = useState("");
    const [timeLeft, setTimeLeft] = useState(240); // 2 minutes in seconds
    const[resend,setResend]=useState(false);

        const navigate=useNavigate();
    const handleChangeOtp = (newOtp) => {
      setOtp(newOtp);
    };
    // const[forgot,setForgot] = useState(false);
    if(istrue){
      setForgot(true);
    }
    const handleSubmit =  async() => {
        console.log("OTP submitted:", otp);
        setLoading(true);

        try{
              const response =await axios.post('https://karnadaan.onrender.com/api/v1/otp/verify-token-otp',{otp:otp,userName:userName},{ withCredentials: true });
              console.log("response",response);
              const userData = response.data.user;
              
              dispatch(authActions.setUser({
                _id: userData._id,
                name: userData.firstName,
                email: userData.userName,
                profile_pic: userData.profile_pic,
              }));
              localStorage.setItem('user', JSON.stringify({
                _id: userData._id,
                name: userData.firstName,
                email: userData.userName,
                profile_pic: userData.profile_pic,
              }));
              if(response.data.token){
                toast.success(response.data.message);
                localStorage.setItem('token',response.data.token);

              }
              dispatch(authActions.login());
             
          
               console.log(isLoggedIn)
              setTimeout(() =>{
                navigate('/');
              },3000)

        }catch(err){
          if (err.response) {
            toast.error(err.response.data.error || "An error occurred during sign-in");
          } else {
            toast.error("Network error or server is unreachable");
          }
          setLoading(false);

            console.error("Error submitting OTP:", err);

        }
    };

  

    useEffect(() => {
        if (timeLeft > 0) {
            const timer = setInterval(() => {
                setTimeLeft(timeLeft - 1);
            }, 1000);

            return () => clearInterval(timer); 
        }
    }, [timeLeft]);

    const resendOtp = async () => {
      try {
          const response = await axios.post('http://localhost:3000/api/v1/otp/resend-otp', {userName:userName}, { withCredentials: true });
          console.log("Resent OTP:", response.data.otp);
          toast.success(response.data.message);

          setTimeLeft(300); // Reset the timer to 5 minutes
          setResend(true); 
      } catch (err) {
        if (err.response) {
          toast.error(err.response.data.error || "An error occurred during OTP request");
        } else {
          toast.error("Network error or server is unreachable");
        }
          console.error("Error resending OTP:", err);
      }
  };
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
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
            <div className='bg-white shadow-xl px-8 py-10 rounded-3xl border-2 border-gray-200 w-[65vh]'>
              <h1 className='text-5xl font-semibold text-center'>
                कर्ण-Daan Login
              </h1>
              <p className='font-medium text-lg text-gray-500 mt-4'>
             {!resend ?"   Please enter your OTP from Your  email :-":"Enter Otp Resended at your email"}
              </p>
              <div className='mt-8'>
                <OtpCard length={6} onChangeOtp={handleChangeOtp} />
                <div className='mt-8 flex flex-col gap-y-4'>
                  <button
                    className='py-3 rounded-xl bg-orange-400 text-white text-lg font-bold'
                    onClick={handleSubmit}
                  >
                     {loading?
                 <Lottie
                 animationData={LoadingAnimation}
                 style={{
                   width: 40,
                   height: 40,
                   display: 'flex',
                   justifyContent: 'center',
                   alignItems: 'center',
                   margin: 'auto', // Centering horizontally 
                 }}
                 />
                   : "Submit"}
                  </button>
                </div>


                <div className='mt-8 flex justify-end items-center'>
                  
                  <button onClick={resendOtp} className="font-medium text-lg text-orange-400">
                    Resend OTP
                  </button>
                </div>

                {/* OTP Timer */}
                <div className='mt-4 text-center text-gray-600'>
                  {timeLeft > 0 ? (
                    <p>OTP is valid for {formatTime(timeLeft)} minutes.</p>
                  ) : (
                    <p className='text-red-500'>OTP expired. Please request a new OTP.</p>
                  )}
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

export default FillOtp;
