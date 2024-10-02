import React from 'react';
import { FaCircle } from 'react-icons/fa'; // Import a circle icon to represent the green dot
import Avator from './Avator';
function SearchCard({ avatar, name, message, date ,count,keys}) {
  return (
    <div className="flex items-center  p-4 border-b shadow border-gray-300 gap-4 rounded-md">
     <div>
     <Avator name={"Ujjawal Arora"} width={60} height={60} keys={keys} imageUrl={avatar}/>
     </div>
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <div>
            <div className="font-semibold text-lg">{name}</div>
            <div className="text-gray-600">{message}</div>
          </div>
          <div className="flex flex-col items-end text-gray-500 text-sm">
            <span>{date}</span>
            {/* <FaCircle className="text-red-500 text-xs mt-1" /> */}
            <div className={`text-white bg-orange-600 rounded-full flex justify-center place-items-center ${count<=9?"pr-[0.5rem] pl-[0.5rem] p-[0.1rem]":count<=99?"pr-[0.3rem] pl-[0.3rem] p-[0.2rem]":"pr-[0.3rem] pl-[0.3rem] p-[0.1rem]"}`}>
                <h1 className='rounded-full '>{count<=99?count:"99+"}</h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchCard;
