import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Components/Sidebar';
import { useDispatch, useSelector } from 'react-redux';
import io from 'socket.io-client';
import { authActions } from '../redux/Slice/slice.js';

function Home() {
  const dispatch = useDispatch();
  const location = useLocation();  // To get the current route

  useEffect(() => {
    const socketConnection = io('http://localhost:3000', {
      auth: {
        token: localStorage.getItem('token'),
      },
    });

    socketConnection.on('onlineUser', (data) => {
      console.log('onlineData', data);
      dispatch(authActions.setOnlineUser(data));
    });

    dispatch(authActions.setSocketConnections(socketConnection));

    return () => {
      socketConnection.disconnect(); // Disconnecting the socket connection when the component unmounts
    };
  }, [dispatch]);

  const user = useSelector((state) => state.auth);
  console.log('user after online Update', user);

  // Check if the current route is '/chat' (not '/chat/id')
  const isChatPage = location.pathname === '/chat';

  return (
    <div className='grid grid-cols-[431px,1fr]'>
      <div className="">
        <Sidebar />
      </div>

      <section>
        {/* Conditionally render something if we're on '/chat' route */}
        {isChatPage ? (
          <div className="flex justify-center items-center h-full">
            <p className="text-xl text-gray-500">Select a conversation to start chatting.</p>
          </div>
        ) : (
          <Outlet />
        )}
      </section>
    </div>
  );
}

export default Home;
