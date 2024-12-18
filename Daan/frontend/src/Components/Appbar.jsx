import React, { useEffect, useState, useRef } from "react";
import SearchBox from "../material/SearchBox";
import Notifications from '../material/Notifications';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import Avator from "./Avator.jsx";
import { authActions, authstate } from '../redux/Slice/slice.js';
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';
import logo from '../assets/logo.png'
import { IoIosArrowDown } from "react-icons/io";

function Appbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector(authstate);
  const [showAppbar, setShowAppbar] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const [user, setUser] = useState(null);  // User state
  const [loading, setLoading] = useState(true);  // Loading state to wait for user data

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    console.log("storedUser", storedUser);
    if (storedUser) {
      setUser(JSON.parse(storedUser));  
      dispatch(authActions.login()); 
    } else {
      setUser(null);
    }
    setLoading(false);
  }, [dispatch]);
  
  // console.log("storedUser", storedUser);
// 
  useEffect(() => {
    setShowAppbar(true);
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    dispatch(authActions.logout()); // Perform logout
    localStorage.removeItem('user'); // Clear local storage
    Cookies.remove('token');
    toast.success('Successfully logged out');
    setUser(null);  // Clear the user state
  };

  const appbarStyle = {
    position: 'fixed',
    width: '100%',
    borderBottom: '2px solid',
    borderBottomColor: 'rgb(156 163 175)', // Tailwind's border-zinc-800
    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)',
    height: '80px',
    padding: '0.5rem',
    display: 'flex',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    zIndex: 10,
    transform: showAppbar ? 'translateY(0)' : 'translateY(-100%)',
    opacity: showAppbar ? 1 : 0,
    transition: 'transform 0.9s ease-out, opacity 0.5s ease-out',
  };

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  if (loading) {
    // Prevent rendering until loading completes
    return null;
  }

  return (
    <div style={appbarStyle} className="bg-zinc-800 ">
   
      <div className="text-4xl flex items-center justify-center font-bold">
      <div className="mb-2" >
        <img className="w-20" src={logo} alt="" />
      </div>
        <h1 className="text-orange-500">
          कर्ण <span className="text-4xl  text-white">Daan</span>
        </h1>
      </div>

      <div>
        <SearchBox />
      </div>

      <div className="flex gap-3 justify-around ">
        {/* <div className="mt-2">
          <Notifications />
        </div> */}

        <div className="hover:border-2 rounded-lg">
          <button
            onClick={() => {
              if (!isLoggedIn) {
                navigate('/signup');
                window.location.reload();
              }
            }}
            className="p-1 px-2 pb-1 rounded-lg text-white font-bold"
          >
            {isLoggedIn ? (
              <div className="relative inline-block text-left" ref={dropdownRef}>
                <div className="flex items-center gap-5 cursor-pointer" onClick={toggleDropdown}>
                  <div className="rounded-full mb-4 h-8 w-8">
                    {user && (
                      <Avator name={user.name} imageUrl={user.profile_pic} width={40} height={40} />
                    )}
                  </div>
                  <IoIosArrowDown className={`transition-transform mt-5 text-xl duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                </div>
                {isOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-zinc-800 border border-gray-300 rounded-lg shadow-lg">
                    <ul className="list-none p-2 m-0">
                      <li className="hover:bg-zinc-700 p-2 border-b cursor-pointer rounded-lg" onClick={() => navigate('/your-donations')}>
                        Your Donations
                      </li>
                      {/* <li className="hover:bg-zinc-700 p-2 border-b cursor-pointer rounded-lg" onClick={() => navigate('/your-requests')}>
                        Your Requests
                      </li> */}
                      {/* <li className="hover:bg-zinc-700 border-b p-2 cursor-pointer rounded-lg" onClick={() => navigate('/your-funds')}>
                        Your Funds
                      </li> */}
                      <li className="hover:bg-zinc-700 border-b p-2 cursor-pointer rounded-lg" onClick={() => navigate('/wishlist')}>
                        Wishlist
                      </li>
                      <li className="hover:bg-zinc-700 border-b p-2 cursor-pointer rounded-lg" onClick={handleLogout}>
                        Logout
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-2xl">Login</p>
            )}
          </button>
        </div>

      <div className="flex items-center">
          <button
            onClick={() => {
              if (isLoggedIn) {
                navigate('/donate');
              } else {
                toast.error('Login to Continue');
              }
            }}
            className="bg-orange-600  hover:bg-orange-500 h-11 w-24 p-1 rounded-lg text-white text-xl font-bold"
          >
            Donate
          </button>
        </div>

        <div className="flex overflow-hidden items-center">
          <button
            onClick={() => {
              if (isLoggedIn) {
                navigate('/request');
              } else {
                toast.error('Login to Continue');
              }
            }}
            style={{ fontFamily: 'Roboto, sans-serif' }}
            className="bg-orange-600 font-sans hover:bg-orange-500 h-11 w-24 p-2 rounded-lg text-white text-xl font-bold"
          >
            Request
          </button>
        </div>
        <div className="flex items-center">
          <button onClick={()=>{
            navigate('/stripe');
          }}
         
            style={{ fontFamily: 'Roboto, sans-serif' }}
            className="bg-orange-600 font-sans hover:bg-orange-500 h-11 w-24 p-2 rounded-lg text-white text-xl font-bold"
          >
            Fund
          </button>
      </div>
      </div>
    </div>
  );
}

export default Appbar;
