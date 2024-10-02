import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ImageThumbnil from './MainCardCompo/ImageThumbnil';
import MapComponent from './MainCardCompo/MapComponent';
import { IoIosArrowForward } from "react-icons/io";
import { FaArrowLeft } from "react-icons/fa6";

const MainCard = () => {
  const location = useLocation();
  const navigate = useNavigate(); // Initialize the useNavigate hook
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

  const handleBackClick = () => {
    navigate('/'); // Navigate back to the previous page
    window.location.reload(); 
  };
  

  const latitude = 30.2110; 
  const longitude = 74.9455;

  return (
   <div className=''>
     <div className="m-20 ">
      {/* Arrow at the top left for navigating back */}
      <button
        className="absolute top-5 text-gray-700 left-5 p-2  rounded-full"
        onClick={handleBackClick}
      >
        <FaArrowLeft className="text-3xl" />
      </button>

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
          <div className='shadow-lg  hover:bg-zinc-700 items-center rounded-lg bg-zinc-800 text-white font-bold p-3 mt-7'>
            <div className='flex items-center justify-between'>
              <div className='flex gap-4 items-center'>
                <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-200">
                  <span className="text-xl text-gray-600 dark:text-gray-900">{data.name.charAt(0)}</span>
                </div>
                <h1 className='text-2xl'>{data.name}</h1>
              </div>
              <IoIosArrowForward className='text-2xl'/>
            </div>
            <h1 className='text-lg flex items-center justify-center mt-5 border p-2 text-gray-300 font-semibold'>Chat with Donor</h1>
          </div>
        </div>
      </div>
      <div className='mt-4'>
        <h2 className="text-xl font-bold mb-2">Description</h2>
        <p className="text-gray-700">{data.description}</p>
      </div>
    </div>
   </div>
  );
};

export default MainCard;
