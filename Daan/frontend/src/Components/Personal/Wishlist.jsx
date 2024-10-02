import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IoIosArrowBack } from 'react-icons/io';
import axios from 'axios';
import Avator from '../Avator';
import FrontCard from '../FrontCard'; // Import FrontCard component
import Sidebar_per from './Sidebar_per';

export default function Wishlist() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/posts/get-all-wishlisted-posts', { withCredentials: true });
        setData(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  return (
    <div className="flex min-h-screen bg-zinc-100 text-zinc-800">

     <Sidebar_per/>

      {/* Main Content */}
      <div className="w-[65vw] text-zinc-800 flex flex-col border">
        <div className="p-0 h-[10vh] flex items-center justify-center bg-zinc-800 border-b border-zinc-300">
          <h1 className="font-semibold text-white text-3xl md:text-5xl lg:text-6xl">
            YOUR WISHLIST
          </h1>
        </div>
        
        {/* Scrollable FrontCard Container */}
        <div>
        <div className="flex-grow overflow-y-auto p-4">
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5 max-h-[70vh] overflow-y-scroll">
            {data && data.length > 0 ? (
              data.map((card, index) => (
                <FrontCard
                  key={index}
                  imgSrc={card.imageUrls[0]} // Assuming imageUrls is an array
                  imgAlt={card.title}
                  title={card.title}
                  description={card.description}
                  btntext="Learn More"
                  wishlist={card.wishlist}
                />
              ))
            ) : (
              <p>No items in wishlist</p>
            )}
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}
