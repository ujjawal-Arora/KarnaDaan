import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FrontCard from '../Components/FrontCard';
import axios from 'axios';
import Appbar from '../Components/Appbar'; // Ensure this path is correct

const FrontCards = () => {
  const [filteredCards, setFilteredCards] = useState([]);
  const [dataSet, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/posts/get-all-posts', { withCredentials: true });
        const postsWithIds = response.data.posts.map((post, index) => ({
          ...post,
          sequentialId: index + 1, // Assign sequential ID starting from 1
        }));
        setData(postsWithIds);
        setFilteredCards(postsWithIds); // Initialize with all posts
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);

  // Define the search handler function
  const handleSearch = (location, category) => {
    const filtered = dataSet.filter(card =>
      card.category.toLowerCase() === category.toLowerCase() &&
      card.location.toLowerCase() === location.toLowerCase()
    );
    setFilteredCards(filtered);
  };

  // const handleCardClick = (id) => {
    const handleCardClick = (sequentialId) => {
      navigate(`/maincard/${sequentialId}`);
    };
  // };

  return (
    <div className="min-h-screen w-full flex flex-col items-center bg-gray-100 p-4">
      {/* Ensure Appbar is rendered and passes the handleSearch function */}
      {/* <Appbar onSearch={handleSearch} /> */}
      
      <div className="w-full flex flex-wrap justify-center items-center gap-4 mt-4">
  {filteredCards.length > 0 ? (
    filteredCards.map((card) => (
      <div key={card.sequentialId} onClick={() => handleCardClick(card.sequentialId)}>
        <FrontCard
          imgSrc={card.imageUrls[0]}  // Assuming images is an array
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
