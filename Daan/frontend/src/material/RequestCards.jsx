

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ReqCard from '../Components/ReqCard';
import axios from 'axios';
import { useSelector } from 'react-redux';
import toast from 'react-hot-toast';

const Reqcards = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const user = useSelector((state) => state.auth);
  const [dataSet, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.post(
          'http://localhost:3000/api/v1/search/reqitem',
          { location: user.location, category: user.category },
          { withCredentials: true }
        );
        console.log("response At req post ",response)
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
      } catch (error) {
        console.error('API Error:', error);
        toast.error('Failed to fetch requested cards');
      }
    };

    getData();
  }, [user]);

  const handleCardClick = (sequentialId, card) => {
    if (isLoggedIn) {
      navigate(`/mainReqCard/${sequentialId}`, { state: card });
      window.location.reload();
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
                // imgAlt={card.title}
                title={card.title}
                description={card.description}
                btntext="More Details"
                cardId={dataSet[card.sequentialId - 1]._id}
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

export default Reqcards;
