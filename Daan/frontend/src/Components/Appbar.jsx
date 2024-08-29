import React from "react";
import SearchBox from "../material/SearchBox";
import Notifications from '../material/Notifications'
import { useNavigate } from "react-router-dom";

function Appbar() {
    const navigate=useNavigate();
  return (
    <div className="border-b-2 bg-orange-50 h-20 p-2 items-center flex justify-evenly">
      <div className="text-3xl font-bold">
        <h1>
          Karan Daan<span className="text-amber-950">Daan</span>
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
            navigate('/signup')
        }} class="bg-amber-900 h-11 w-24 p-2 rounded-lg text-white text-xl font-bold">
          Login
        </button>
      </div>
      <div>
        <button onClick={()=>{
            navigate('/donate')
        }}  className="bg-orange-500 h-11 w-24 p-2 rounded-lg text-white text-xl font-bold ">Donate</button>
      </div>
      <div>
        <button onClick={()=>{
            navigate('/request')
        }}  className="bg-orange-500 h-11 w-24 p-2 rounded-lg text-white text-xl font-bold ">Request</button>
      </div>
     </div>
    </div>
  );
}

export default Appbar;
