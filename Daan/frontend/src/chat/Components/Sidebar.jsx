import React,{useState} from "react";
import SearchBox from "./SearchBox";
import SearchCard from "./SearchCard";
import { IoChatbubbleEllipses } from "react-icons/io5";

import Image from "/img.jpg";
import { FaUserPlus } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { NavLink } from "react-router-dom";
import Avatar from "../Components/Avator";
import "../../App.css";
import SearchUser from "./SearchUser";
const isActive=true;
function Sidebar() {
  const [openSearchUser, setOpenSearchUser] = useState(false);
  return (
    <div className='w-full  h-full grid grid-cols-[48px,1fr] bg-slate-50 '>
       <div className=' bg-white w-12 h-[97vh] z-50  rounded-tr-lg rounded-br-lg py-5 text-slate-600 flex flex-col justify-between'>
                <div>
                    <NavLink className={({isActive})=>`w-12 h-12 text-slate-900 flex justify-center items-center  cursor-pointer hover:bg-gray-800 rounded ${isActive && " border border-gray-600"}`} title='chat'>
                        <IoChatbubbleEllipses
                            size={20}
                        />
                    </NavLink>

                    <div  onClick={()=>{
                        setOpenSearchUser(true)
                        console.log("object")
      
                    }}  className='w-12 text-black bg-slate-500h-12 flex justify-center items-center cursor-pointer hover:border border-gray-600 rounded' >
                        <FaUserPlus size={20}/>
                     
                    </div>
                </div>

                <div className='flex flex-col items-center'>
                  <button className='mx-auto' 
                  
                   >  {/* title={} */}
                        <Avatar
                            width={40}
                            height={40}
                          
                          
                        />
                    </button>
                    <button title='logout' className='w-12 h-12 flex justify-center items-center cursor-pointer hover:border border-gray-500 rounded' >
                        <span className='-ml-2 text-black'>
                            <BiLogOut size={20}/>
                            
                        </span>
                    </button>
                </div>
            </div>

      {/* Main Sidebar content */}
      <div className="w-[50vh] fixed   h-screen p-4" >
        {/* Fixed SearchBox */}
        <div className="fixed top-0 left-[5vh] w-[45vh] border-r-2 border-zinc-900 shadow-l bg-zinc-800 z-20 p-4">
          <SearchBox />
        </div>

        <div className="mt-[4rem] mb-5 h-[calc(100vh-7rem)] w-[43vh] overflow-y-auto custom-scrollbar z-10 ml-[5vh]">
          {/* Search cards */}
          <SearchCard
            avatar={Image}
            keys={10}
            count={44}
            message={"Hello! How are you !!!!"}
            name={"Ujjawal"}
            date={"Sep 15"}
          />
          {/* Add more SearchCards as needed */}
        </div>
      </div>
      {
                openSearchUser && (
                    <SearchUser onClose={()=>setOpenSearchUser(false)}/>
                )
            }
    </div>
  );
}

export default Sidebar;
