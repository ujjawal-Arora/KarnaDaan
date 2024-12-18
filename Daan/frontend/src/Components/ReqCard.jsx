import { FaHeart } from "react-icons/fa";
import toast from 'react-hot-toast';
import React, { useState } from "react";

const ReqCard = ({
  title,
  description,
  btntext,
  wishlist,
  isMine,
  locationInput,
  name,
  phoneNumber,
  category,
  onUpdate, // Function to be called when Update button is clicked
  onDelete, // Function to be called when Delete button is clicked
}) => {
  const [isWishlisted, setIsWishlisted] = useState(wishlist);

  const handleWishlistClick = (e) => {
    e.stopPropagation();
    setIsWishlisted((prevState) => !prevState);
  };

  return (
    <div className="w-80 bg-white rounded-lg shadow-md p-4 flex flex-col transition-transform transform hover:scale-105 hover:shadow-xl">
      <div className="relative">
    {    !isMine&&<FaHeart
          className={`absolute top-2 right-2 text-2xl cursor-pointer transition duration-300 ${
            isWishlisted ? 'text-red-600' : 'text-gray-400'
          }`}
          onClick={handleWishlistClick}
        />}
      </div>
      <h2 className="text-lg font-bold mb-2">{title}</h2>
      <p className="text-zinc-600 mb-4 truncate">{description}</p>
      
      <div className="flex justify-end gap-2">
        {/* <button 
          className="bg-zinc-800 text-white font-semibold rounded-lg py-2 px-4" 
          onClick={onUpdate} // Call the onUpdate function when this button is clicked
        >
          Update
        </button>

        <button 
          className="bg-red-600 text-white font-semibold rounded-lg py-2 px-4" 
          onClick={onDelete} // Call the onDelete function when this button is clicked
        >
          Delete
        </button> */}

        <button className="bg-zinc-800 text-white font-semibold rounded-lg py-2 px-4">
          {btntext}
        </button>
      </div>
    </div>
  );
};

export default ReqCard;
