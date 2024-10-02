import React, { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Components/Sidebar'
import { useDispatch,useSelector } from 'react-redux'
import io from 'socket.io-client'
import Cookies from 'js-cookie';
import { authActions } from '../redux/Slice/slice.js';

function Home() {
  const dispatch = useDispatch();


  useEffect(()=>{
    const socketConnection=io('http://localhost:3000',{
      auth:{
        token:Cookies.get('token')
      }
    })

    socketConnection.on('onlineUser',(data)=>{
      console.log("onlineData",data)
    
      dispatch(authActions.setOnlineUser(data));
    })
    dispatch(authActions.setSocketConnections(socketConnection))

    return ()=>{
      socketConnection.disconnect() // disconnecting the socket connection when the component unmounts
    }
  },[dispatch])
const user=useSelector((state) => state.auth);
console.log("user after online Update",user);
  return (
    <div className='grid grid-cols-[431px,1fr]  '>
        <div className="">
        <Sidebar/>
        </div>
      <section>
        <Outlet />
      </section>
    </div>
    
  )
}

export default Home
