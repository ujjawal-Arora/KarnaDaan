
import React from 'react'
import { PiUserCircle } from "react-icons/pi";
import {useSelector} from 'react-redux'
const Avator = ({userId,name,imageUrl,width,height,keys}) => {
    // const isOnline = true;
    const isOnline = useSelector(state => state.auth?.online);

      let avatarName=" "
    if(name){
      const splitName = name?.split(" ")
   
      if(splitName.length > 1){
        avatarName = splitName[0][0]+splitName[1][0]
      }else{
        avatarName = splitName[0][0]
      }
    }
    const bgColor = [
        'bg-blue-400',
        'bg-green-400',
        'bg-orange-400',
        'bg-yellow-400',
        "bg-cyan-400",
        "bg-sky-400",
      ]

  return (
   <div className='relative' >
     <div className={`text-slate-800 overflow-hidden rounded-full font-bold relative`} style={{width : width+"px", height : height+"px" }}>
        {
            imageUrl ? (
                <img
                    src={imageUrl}
                   height={height}
                   width={width}
                    alt={name}
                    className='rounded-full'
                />
            ) : (
                name ? (
                    <div  style={{width : width+"px", height : height+"px" }} className={`overflow-hidden rounded-full flex justify-center items-center text-xl ${bgColor[keys%6]} text-white`}>
                        {avatarName}
                    </div>
                ) :(
                  <PiUserCircle
                    // size={100}
                    className={`text-gray-500 `}
                    style={{ fontSize: `${width+5}px` }} 
                  />
                )
            )
        }
    </div>
    {
          isOnline && (
            <div className='bg-[#D97706] absolute z-10 right-1 bottom-1 rounded-full h-3 w-3'></div>
        )
    }
   </div>
  )
}

export default Avator
