import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FrontCard from '../Components/FrontCard';
import axios from 'axios';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';

const FrontCards = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn); 
  const user = useSelector((state) => state.auth) ;
  console.log("at front",user,user.location)
  const [dataSet, setData] = useState([]); // All cards data
  const navigate = useNavigate();

  
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.post('https://karnadaan.onrender.com/api/v1/search/item', {location:user.location,category:user.category},{ withCredentials: true });
        console.log("response At post ",response)
        if(response.data.success){
        const postsWithIds = response.data.data.map((post, index) => ({
          ...post,
          sequentialId: index + 1, // Assign sequential ID starting from 1
        }));
        
        setData(postsWithIds);
        
      }else{
          toast.error('No results found in your location');
          setData([]);
  
      }
 // Store all posts
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, [user]);

  const handleCardClick = (sequentialId, card) => {
    if (isLoggedIn) {
      navigate(`/maincard/${sequentialId}`, { state: card });
      window.location.reload(); // Refresh the page
    } else {
      toast.error('Login to Continue');
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center bg-gray-200 p-4">
      <div className="w-full flex flex-wrap justify-center items-center gap-10 mt-4">
        {dataSet.length > 0 ? (
          dataSet.map((card) => (
            <div key={card.sequentialId} onClick={() => handleCardClick(card.sequentialId, card)}>
              <FrontCard
                imgSrc={card.imageUrls[0]} // Assuming images is an array
                imgAlt={card.title}
                title={card.title}
                description={card.description}
                btntext="Learn More"
                wishlist={card.wishlist}
              />
            </div>
          ))
        ) : (
          <p>No results found</p>
        )}
      </div>
    </div>
  );
};

export default FrontCards;
