import React,{useEffect} from "react";
import SearchBox from "../material/SearchBox";
import Notifications from '../material/Notifications'
import { useNavigate } from "react-router-dom";
import { useDispatch,useSelector } from'react-redux';
import { authActions,authstate } from '../redux/Slice/slice.js';
import toast, { Toaster } from 'react-hot-toast';

function Appbar() {
  const dispatch=useDispatch();
// useEffect(()=>{

// },[])
    const navigate=useNavigate();
    const isLoggedIn=useSelector(authstate);
    console.log(isLoggedIn);
  return (
    <div className="border-b-2 bg-orange-50 h-20 p-2 items-center flex justify-evenly">
       <Toaster position="top-center" reverseOrder={false} />
      <div className="text-3xl font-bold">
        <h1>
          Karan <span className="text-amber-950">Daan</span>
        </h1>
      </div>

      <div>
        <SearchBox />
      </div>

     <div className="flex gap-4  justify-around w-60">
     <div>
        <Notifications />
      </div>
    
      <div>
        <button  onClick={()=>{
          if(isLoggedIn) {
            dispatch(authActions.logout());
          }else{
            navigate('/signup')
          }
        }} class="bg-amber-900 h-11 w-24 p-2 rounded-lg text-white text-xl font-bold">
          { isLoggedIn==true?"logout":"login"}
        </button>
      </div>
      <div>
        <button onClick={()=>{
            if(isLoggedIn) {
            
              navigate('/donate')
            }else{
              toast.error('Login to Continue');

            }
        }}  className="bg-orange-500 h-11 w-24 p-2 rounded-lg text-white text-xl font-bold ">Donate</button>
      </div>
      <div>
        <button onClick={()=>{
            if(isLoggedIn) {
              navigate('/request')
            }else{
              toast.error('Login to Continue');

            }
        }}  className="bg-orange-500 h-11 w-24 p-2 rounded-lg text-white text-xl font-bold ">Request</button>
      </div>
     </div>
    </div>
  );
}

export default Appbar;
