import React, { useState } from 'react';
import { FaHeart } from "react-icons/fa";
import { Link } from 'react-router-dom';

const FrontCard = ({
  imgSrc,
  imgAlt,
  title,
  description,
  btntext,
  link,
  wishlist,
}) => {
  const [isWishlisted, setIsWishlisted] = useState(wishlist);

  const handleWishlistClick = (e) => {
    e.stopPropagation(); // Prevents triggering any parent component's click events
    setIsWishlisted(prevState => !prevState);
    console.log('Wishlist toggled:', !isWishlisted); // Debugging log
  };

  return (
    <div className="w-80 bg-white rounded-lg shadow-md p-4 flex flex-col transition-transform transform hover:scale-105 hover:shadow-xl">
      <div className="relative">
        <img src={imgSrc} alt={imgAlt} className="w-70 h-56 object-cover  rounded-t-lg" />
        <FaHeart
          className={`absolute top-2 right-2 text-2xl cursor-pointer transition duration-300 ${isWishlisted ? 'text-red-600' : 'text-gray-400'} `}
          onClick={handleWishlistClick}
        />
      </div>
      <h2 className="text-lg font-bold mb-2">{title}</h2>
      <p className="text-zinc-600 mb-4 truncate">{description}</p>
      <div className="flex justify-end">
        <Link
          to={link}
          className="bg-zinc-800 text-white font-semibold rounded-lg py-2 px-4"
        >
          {btntext}
        </Link>
      </div>
    </div>
  );
};

export default FrontCard;
