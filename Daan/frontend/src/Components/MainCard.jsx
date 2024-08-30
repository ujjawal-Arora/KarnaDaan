import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import ImageThumbnil from './MainCardCompo/ImageThumbnil';
import MapComponent from './MainCardCompo/MapComponent';

const MainCard = () => {
  const location = useLocation();
  const data = location.state;
  if (!data || !data.imageUrls) {
    return <p className="text-center text-red-500 font-semibold">Card not found</p>;
  }

  const cardData = data.imageUrls;
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const handleNextClick = () => {
    setSelectedImageIndex((prevIndex) => (prevIndex + 1) % cardData.length);
  };

  const handlePrevClick = () => {
    setSelectedImageIndex((prevIndex) => (prevIndex - 1 + cardData.length) % cardData.length);
  };

  const handleThumbnailClick = (index) => {
    setSelectedImageIndex(index);
  };
  const latitude = 30.6790; 
  const longitude = 76.8293;

  return (
    <div className="m-20">
      <div className="grid grid-cols-12 gap-10">
        <div className="col-span-8 flex flex-col"> 
          <div className="relative flex justify-center items-center">
            <button
              onClick={handlePrevClick}
              className="absolute left-0 top-1/2 transform -translate-y-1/2 rounded-full"
            >
              <span className="text-3xl">&#9664;</span> 
            </button>
            <div className="w-96 h-64 flex justify-center items-center overflow-hidden rounded-lg shadow-sm">
              <img
                src={cardData[selectedImageIndex]}
                alt={`${data.title} Image ${selectedImageIndex + 1}`}
                className="object-cover w-full h-full transition-all duration-300"
              />
            </div>
            <button
              onClick={handleNextClick}
              className="absolute right-0 top-1/2 transform -translate-y-1/2 rounded-full"
            >
              <span className="text-3xl">&#9654;</span>
            </button>
          </div>
          <ImageThumbnil
            images={cardData}
            onThumbnailClick={handleThumbnailClick}
            selectedImageIndex={selectedImageIndex}
          />
        </div>
        <div className="col-span-4 p-2"> 
          <div className='shadow p-3'>
            <h1 className='text-4xl font-semibold'>Posted in</h1>
            <h1 className='text-lg text-gray-500'>{data.location}</h1>
          </div>
          <div className='shadow-xl mt-10'>
            <MapComponent lat={latitude} lng={longitude} />
          </div>
        </div>
      </div>
      <div className='mt-4'>
        <h2 className="text-xl font-bold mb-2">Description</h2>
        <p className="text-gray-700">{data.description}</p>
      </div>
    </div>
  );
};

export default MainCard;