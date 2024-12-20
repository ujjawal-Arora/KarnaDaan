
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FrontCard from '../Components/FrontCard';
import axios from 'axios';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';

const FrontCards = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const user = useSelector((state) => state.auth);
  console.log("at front", user, user.location)
  const [dataSet, setData] = useState([]); // All cards data
  const navigate = useNavigate();


  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.post('http://localhost:3000/api/v1/search/item', { location: user.location, category: user.category }, { withCredentials: true });
        console.log("response At post ", response)
        if (response.data.success) {
          const postsWithIds = response.data.data.map((post, index) => ({
            ...post,
            sequentialId: index + 1,
          }));

          setData(postsWithIds);

        } else {
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
    <div className="h-screen w-full flex -z-50 flex-col mt-4 items-center bg-gray-200 p-4">
      <div className="w-full flex flex-wrap justify-center items-center gap-10 mt-4">
        {dataSet.length > 0 ? (
          dataSet.map((card) => (
            <div key={card.sequentialId} onClick={() => handleCardClick(card.sequentialId, card)}>
              <FrontCard
                imgSrc={card.imageUrls[0]}
                imgAlt={card.title}
                title={
                  <div className="truncate w-48 font-semibold text-gray-800">
                    {card.title}
                  </div>
                }
                description={
                  <div className="line-clamp-2 w-48 text-gray-600">
                    {card.description}
                  </div>
                }
                btntext="More Details"
                wishlist={card.wishListed}
                cardId={dataSet[card.sequentialId - 1]._id}
                isFromDonation={false}
                onDonate={false}
                alreadyDonated={true}

                // ={true}

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


