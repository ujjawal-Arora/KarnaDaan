import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar_per from './Sidebar_per';
import { useSelector } from 'react-redux';
import FrontCard from '../FrontCard';
import toast from 'react-hot-toast';

export default function Wishlist() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const userId = useSelector((state) => state.auth._id);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.post(
          'http://localhost:3000/api/v1/posts/get-all-wishlisted-posts',
          { userId },
          { withCredentials: true }
        );
        setData(response.data.data);
      } catch (error) {
        console.error('Error fetching wishlist:', error);
      }
    };
    getData();
  }, [userId]);

  // Handle card click
  const handleCardClick = (sequentialId, card) => {
    if (isLoggedIn) {
      navigate(`/maincard/${sequentialId}`, { state: card });
      window.location.reload(); // Refresh the page
    } else {
      toast.error('Login to Continue');
    }
  };

  return (
    <div className="flex min-h-screen bg-zinc-100 text-zinc-800">
      <Sidebar_per />
      {/* Main Content */}
      <div className="w-[75vw] text-zinc-800 flex flex-col border">
        <div className="p-0 h-[10vh] flex items-center justify-center bg-zinc-800 border-b border-zinc-300">
          <h1 className="font-semibold text-orange-600 text-3xl md:text-5xl lg:text-5xl">
            Your Wishlist
          </h1>
        </div>
        <div className="flex-grow overflow-y-auto p-4">
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5 max-h-[90vh]">
            {data && data.length > 0 ? (
              data.map((card, index) => (
                <div key={index} onClick={() => handleCardClick(index + 1, card)}>
                  <FrontCard
                    imgSrc={card.imageUrls[0]} // Assuming imageUrls is an array
                    imgAlt={card.title}
                    title={card.title}
                    description={card.description}
                    btntext="More Details"
                    wishlist={card.wishListed}
                    fromWish={true}
                  />
                </div>
              ))
            ) : (
              <p>No items in wishlist</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
