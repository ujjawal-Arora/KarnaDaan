import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import dataSet from '../Data/TempData';
import ImageThumbnil from './MainCardCompo/ImageThumbnil';
import MapComponent from './MainCardCompo/MapComponent';

const MainCard = () => {
  const { id } = useParams();
  const cardData = dataSet.find(card => card.id === parseInt(id));
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  if (!cardData) {
    return <p className="text-center text-red-500 font-semibold">Card not found</p>;
  }

  const handleNextClick = () => {
    setSelectedImageIndex((prevIndex) => (prevIndex + 1) % cardData.images.length);
  };

  const handlePrevClick = () => {
    setSelectedImageIndex((prevIndex) => (prevIndex - 1 + cardData.images.length) % cardData.images.length);
  };

  const handleThumbnailClick = (index) => {
    setSelectedImageIndex(index);
  };

  useEffect(() => {
    preloadImages(cardData.images);
  }, [cardData.images]);

  const preloadImages = (images) => {
    images.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  };

  const Location = "Zirkpur Chandigarh"; // Assuming props contain location prop
  const latitude = 30.6790; // Replace with actual latitude
  const longitude = 76.8293;

  return (
    <div className="m-20">
      <div className="grid grid-cols-12 gap-10"> {/* Set gap to 0 for minimal space */}
        <div className="col-span-8 flex flex-col"> {/* Span 9 out of 12 columns for the image section */}
          <div className="relative flex justify-center items-center">
            <button
              onClick={handlePrevClick}
              className="absolute left-0 top-1/2 transform -translate-y-1/2"
              style={{ borderRadius: '50%' }}
            >
              <span className="text-3xl">&#9664;</span> {/* Left Arrow */}
            </button>
            <div className="w-96 h-64 flex justify-center items-center overflow-hidden rounded-lg shadow-sm">
              <img
                src={cardData.images[selectedImageIndex]}
                alt={`${cardData.title} Image ${selectedImageIndex + 1}`}
                className="object-cover w-full h-full transition-all duration-300"
              />
            </div>
            <button
              onClick={handleNextClick}
              className="absolute right-0 top-1/2 transform -translate-y-1/2"
              style={{ borderRadius: '50%' }}
            >
              <span className="text-3xl">&#9654;</span> {/* Right Arrow */}
            </button>
          </div>
          <ImageThumbnil
            images={cardData.images}
            onThumbnailClick={handleThumbnailClick}
            selectedImageIndex={selectedImageIndex}
          />
        </div>
        <div className="col-span-4 p-2"> {/* Span 3 out of 12 columns for the other section, with reduced padding */}
          <div className='shadow p-3 h-30'>
            <h1 className='text-4xl font-semibold'>Posted in</h1>
            <h1 className='text-lg text-gray-500'>{Location}</h1>
          </div>
          <div className='shadow-xl mt-10'>
            <MapComponent lat={latitude} lng={longitude} />
          </div>
        </div>
      </div>
      <div className='mt-4'>
        <h2 className="text-xl font-bold mb-2">Description</h2>
        <p className="text-gray-700">{cardData.description}</p>
      </div>
    </div>
  );
};

export default MainCard;
