import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReqCard from '../Components/ReqCard';
import axios from 'axios';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';

const ReqCards = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const user = useSelector((state) => state.auth); // Fetch user data from Redux store
  const [dataSet, setData] = useState([]); // State to store fetched data
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      try {
        // API call to fetch requested cards based on location and category
        const response = await axios.post(
          'http://localhost:3000/api/v1/search/reqitem',
          { location: user.location, category: user.category }, // Pass location and category in the request body
          { withCredentials: true }
        );
        console.log('Response at ReqCards:', response);

        if (response.data.success) {
          // Map response data to include sequential IDs
          const postsWithIds = response.data.data.map((post, index) => ({
            ...post,
            sequentialId: index + 1,
          }));
          setData(postsWithIds); // Update state with fetched data
        } else {
          toast.error('No results found in your location');
          setData([]); // Clear data if no results
        }
      } catch (error) {
        console.error('API Error:', error);
        toast.error('Failed to fetch requested cards');
      }
    };

    getData(); // Fetch data on component mount or when user data changes
  }, [user]);

  const handleCardClick = (sequentialId, card) => {
    if (isLoggedIn) {
      navigate(`/mainReqCard/${sequentialId}`, { state: card });
      window.location.reload(); // Reload the page after navigation
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
              <ReqCard
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
                cardId={dataSet[card.sequentialId - 1]._id} // Use sequential ID for card
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

export default ReqCards;
