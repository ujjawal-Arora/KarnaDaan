
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'; 
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Sidebar_per from './Sidebar_per';
import FrontCard from '../FrontCard'; 
import toast, { Toaster } from 'react-hot-toast';
import 'react-confirm-alert/src/react-confirm-alert.css';


export default function Wishlist() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [card,setCardId]=useState([]);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn); 
  
  const userId = useSelector((state) => state.auth._id);
  console.log("user id at posts"+userId);
  
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.post('http://localhost:3000/api/v1/posts/get-allusers-nondonated-posts', 
         { userId },
          {withCredentials: true,}
        );
        console.log("response",response);
        setData(response.data.data);

        const postIds = response.data.data.map((post) => post._id);
        setCardId(postIds);
        console.log("response at personal ",postIds);
      } catch (error) {
        console.log(error)
        console.error(error);
      }
    };

    if (userId) {
      getData();
    }
  }, [userId]);


   const handleCardUpdate = (updatedCard, sequentialId) => {
    const updatedDataSet = dataSet.map((card) => {
      if (card.sequentialId === sequentialId) {
        return { ...card, ...updatedCard };
      }
      return card;
    });

    setData(updatedDataSet);
    setFilteredCards(updatedDataSet);
  };



  const handleCardClick = (sequentialId, card) => {
    if (isLoggedIn) {
      navigate(`/maincard/${sequentialId}`, { state: { ...card, from: 'donations' } });
      window.location.reload(); 
    } else {
      toast.error('Login to Continue');
    }
  };
  
 
  
  const handleDeleteCard = (cardId) => {
    const updatedData = data.filter((card) => card._id !== cardId);
    setData(updatedData);
  };
  
  

  return (
    <div className="flex min-h-screen bg-zinc-100 text-zinc-800">

      <Sidebar_per />

      <div className="w-[75vw] text-zinc-800 flex flex-col border">
        <div className="p-0 h-[10vh] flex items-center justify-center bg-zinc-800 border-b border-zinc-300">
        <h1 className="font-semibold text-orange-600 text-3xl md:text-5xl lg:text-5xl">
        Your Posts
          </h1>
        </div>
        
        <div className="flex-grow overflow-y-auto p-4">
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5 max-h-[70vh] overflow-y-scroll">
            {data && data.length > 0 ? (
              data.map((card, index) => (
                <div key={card.sequentialId} onClick={() => handleCardClick(card.sequentialId, card)}>
                <FrontCard
                  key={index}
                  imgSrc={card.imageUrls[0]} 
                  imgAlt={card.title}
                  title={card.title}
                  description={card.description}
                  btntext="Learn More"
                //   wishlist={card.wishlist}
                  onUpdateCard={(updatedCard) => handleCardUpdate(updatedCard, card.sequentialId)}
                  onDeleteCard={handleDeleteCard} 
                  isFromDonation={true}
                  cardId={card._id}
                  locationInput={card.location}
                  name={card.name}
                  phoneNumber={card.phoneNumber}
                  onDonate={true}
                  alreadyDonated={true}

                  />
                 </div>
              ))
            ) : (
              <p>No items in donations</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
