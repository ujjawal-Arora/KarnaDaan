import React, { useEffect, useState } from "react";
import SearchBox from "../material/SearchBox";
import Notifications from '../material/Notifications';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { authActions, authstate } from '../redux/Slice/slice.js';
import toast, { Toaster } from 'react-hot-toast';
import Cookies from 'js-cookie';
import { IoIosLogOut } from "react-icons/io";

function Appbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isLoggedIn = useSelector(authstate);
  const [showAppbar, setShowAppbar] = useState(false);

  useEffect(() => {
    // Trigger animation on component mount
    setShowAppbar(true);
  }, []);

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

  return (
    <div style={appbarStyle} className="bg-zinc-800">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="text-4xl font-bold">
        <h1 className="text-orange-500">
          कर्ण <span className="text-4xl text-white">Daan</span>
        </h1>
      </div>

      <div>
        <SearchBox />
      </div>

      <div className="flex gap-4 justify-around w-60">
        <div>
          <Notifications />
        </div>

        <div className=" hover:border-2 rounded-lg">
          <button
            onClick={() => {
              if (isLoggedIn) {
                dispatch(authActions.logout());
                Cookies.remove('token');
                toast.success('Successfully logged out');
              } else {
                navigate('/signup');
                window.location.reload();
              }
            }}
            className="bg-neutral-600  h-11 w-28 p-1 px-2 pb-1 rounded-lg text-white font-bold"
          >
            {isLoggedIn ? (
              <div className="flex items-center gap-2">
                <p className="text-xl">Logout</p>
                <IoIosLogOut className="text-2xl" />
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
            className="bg-orange-600 hover:bg-orange-500 h-11 w-24 p-1 rounded-lg text-white text-xl font-bold"
          >
            Donate
          </button>
        </div>

        <div className="flex items-center">
          <button
            onClick={() => {
              if (isLoggedIn) {
                navigate('/request');
              } else {
                toast.error('Login to Continue');
              }
            }}
            className="bg-orange-600 hover:bg-orange-500 h-11 w-24 p-2 rounded-lg text-white text-xl font-bold"
          >
            Request
          </button>
        </div>
      </div>
    </div>
  );
}

export default Appbar;
