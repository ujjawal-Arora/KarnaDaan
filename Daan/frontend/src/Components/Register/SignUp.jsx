import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import toast from 'react-hot-toast';
import LoadingAnimation from '../../assets/loading.json';
import { IoClose } from "react-icons/io5";
import { useDispatch } from "react-redux";
import Lottie from 'lottie-react';
import uploadFile from "../../Helper/upload";
import { authActions } from "../../redux/Slice/slice";
function SignUp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [uploadPhoto,setUploadPhoto] = useState("")
  const [profile_pic,setProfilePic]=useState("");

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
        firstName: firstName,
        lastName: lastName,
        userName: email,
        password: password,
        profile_pic:profile_pic,
      });

      if (response.status === 200) {
        toast.success(response.data.message);
        setTimeout(() => {
          navigate('/signin');
        }, 6000);
      }
    } catch (err) {
      if (err.response) {
        toast.error(err.response.data.error || "An error occurred during sign-up");
      } else {
        toast.error("Network error or server is unreachable");
      }
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const credentialDecoded = jwtDecode(credentialResponse.credential);
      const response = await axios.post("http://localhost:3000/api/v1/user/google-signin", {
        email: credentialDecoded.email,
        firstName: credentialDecoded.given_name,
        lastName: credentialDecoded.family_name,
      }, { withCredentials: true });
      const userData = response.data.user;
      console.log("resp",response)
      if (response.status === 200) {
        dispatch(authActions.setUser({
          _id: userData._id,
          name: userData.firstName,
          email: userData.userName,
        }));
        localStorage.setItem('user', JSON.stringify({
          _id: userData._id,
          name: userData.firstName,
          email: userData.userName,
          profile_pic: "",
        }));
        toast.success(response.data.message);
        navigate("/");
      }
    } catch (err) {
      console.log(err)
      if (err.response) {
        toast.error(err.response.data.error || "An error occurred during sign-up");
      } else {
        toast.error("Network error or server is unreachable");
      }
        }
  };
  const handleUploadPhoto =async(e)=>{

    const file = e.target.files[0];
  
    if (file) {
      try {
        const uploadResponse = await uploadFile(file);
        console.log("uploadPhoto", uploadResponse);
  
        setUploadPhoto(file);
  
        setProfilePic(
          uploadResponse?.url, // Store the uploaded file's URL
        );
      } catch (error) {
        console.error('Error uploading photo:', error);
      }
    }

  }
  const handleClearUploadPhoto=async(e)=>{
    e.stopPropagation()
    e.preventDefault()
    setUploadPhoto(null)
  }

  return (
    <div className="flex bg-slate-50 h-screen flex-col">
      {/* Top Section with Back Arrow */}
      <div className="p-4">
        <Link to="/">
          <FaArrowLeft className="text-2xl text-gray-600" />
        </Link>
      </div>

      <div className="flex justify-center gap-28 mb-10 flex-grow">

        {/* Adjust the form size using Tailwind breakpoints */}
        <div className="flex items-center justify-center">
          <form
            className="bg-white shadow-xl px-6 py-8 rounded-3xl border-2 border-gray-200 w-[90vw] max-w-[480px]" // Responsive form
            onSubmit={handleSubmit}
          >
            <h1 className="text-4xl font-semibold text-center">कर्ण-Daan SignUp</h1>
            <p className="font-medium text-lg text-gray-500 mt-4">
              Welcome!! Please enter your information
            </p>
            <div className="mt-7">
              <div className="flex gap-4">
                <div>
                  <label className="text-lg font-medium">First Name</label>
                  <input
                    className="w-full border-2 border-gray-100 rounded-xl p-3 bg-transparent"
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-lg font-medium">Last Name</label>
                  <input
                    className="w-full border-2 border-gray-100 rounded-xl p-3 bg-transparent"
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>
              <div className="mt-3">
                <label className="text-lg font-medium">Email</label>
                <input
                  className="w-full border-2 border-gray-100 rounded-xl p-3 bg-transparent"
                  placeholder="Enter your Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mt-3">
                <label className="text-lg font-medium">Password</label>
                <input
                  className="w-full border-2 border-gray-100 rounded-xl p-3 bg-transparent"
                  placeholder="Enter your Password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className='flex flex-col gap-1'>
                <label className='text-black mt-3  font-semibold' htmlFor='profile_pic'>Photo :

                  <div className='h-12 bg-white flex border  justify-center items-center  rounded hover:border-primary cursor-pointer'>
                      <p className='text-sm max-w-[300px] text-ellipsis line-clamp-1'>
                        {
                          uploadPhoto?.name ? uploadPhoto?.name : "Upload profile photo"
                        }
                      </p>
                      {
                        uploadPhoto?.name && (
                          <button className='text-lg ml-2 hover:text-red-600' onClick={handleClearUploadPhoto}>
                            <IoClose/>
                          </button>
                        )
                      }
                      
                  </div>
                
                </label>
                
                <input
                  type='file'
                  id='profile_pic'
                  name='profile_pic'
                  className='bg-slate-100 px-2 py-1 focus:outline-primary hidden'
                  onChange={handleUploadPhoto}
                />
              </div>

              <div className="mt-3 flex justify-between items-center">
                <div>
                  <input
                    type="checkbox"
                    id="remember"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <label className="ml-2 font-medium text-base" htmlFor="remember">
                    Remember for 30 days
                  </label>
                </div>
                <button className="font-medium text-base text-orange-400">
                  <Link to="/forgot">Forgot password</Link>
                </button>
              </div>
              <div className="mt-4 flex flex-col gap-y-4">
                <button
                  type="submit"
                  className="py-3 rounded-xl bg-orange-400 text-white text-lg font-bold"
                >
                  {loading ? (
                    <Lottie
                      animationData={LoadingAnimation}
                      style={{
                        width: 40,
                        height: 40,
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        margin: 'auto',
                      }}
                    />
                  ) : (
                    "Sign up"
                  )}
                </button>

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
              </div>
              <div className="mt-5 flex justify-center items-center">
                <p className="font-medium text-base">Already have an account?</p>
                <button className="text-orange-400 text-base font-medium ml-2">
                  <Link to="/signin">Sign in</Link>
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Extra decoration section remains unchanged */}
        <div className="hidden lg:flex h-[87vh] w-[30%] items-center justify-center relative">
          <div className="w-64 h-64 bg-gradient-to-tr from-orange-500 to-gray-200 rounded-full animate-spin" />
          <div className="w-full h-1/2 absolute bg-white/10 backdrop-blur-lg" />
        </div>
      </div>
    </div>
  );
}

export default SignUp;
