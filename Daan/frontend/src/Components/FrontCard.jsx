import React,{useState,} from 'react';
import { FaHeart } from "react-icons/fa";
import { useNavigate,Link } from 'react-router-dom';

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

  const handleWishlistClick = () => {
    setIsWishlisted(!isWishlisted);
  };
  const navigate = useNavigate();

  return (
    <div className="w-80 bg-white rounded-lg shadow-md p-4 flex flex-col" onClick={()=>{
        navigate('/main')
    }}>
      <div className="relative">
        <img src={imgSrc} alt={imgAlt} className="w-70 h-56 object-cover rounded-t-lg" />
        <FaHeart className={`absolute top-2 right-2 text-2xl cursor-pointer  transition duration-300 ${isWishlisted ? 'text-red-600' : 'text-gray-400'} hover:text-red-600`}
          onClick={handleWishlistClick}/>
      </div>
      <h2 className="text-lg font-bold mb-2">{title}</h2>
      <p className="text-gray-600 mb-4">{description}</p>
      {/* <a href={link} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        {btntext}
      </a> */}
      <Link to="/LearnMore">Learn More</Link>
      {/* <button>Learn More</button> */}2
    </div>
  );
};

export default FrontCard;