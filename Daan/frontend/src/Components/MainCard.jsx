import React, { useState } from 'react';
import ImageSlider from './MainCardCompo/ImageSlider';
import ImageThumbnil from './MainCardCompo/ImageThumbnil';
import MapComponent from './MainCardCompo/MapComponent';

function MainCard() {
  const images = [
    { src: '/src/assets/img1.jpg', description: 'Description of Image 1' },
    { src: '/src/assets/img2.jpg', description: 'Description of Image 2' },
    { src: '/src/assets/img3.jpg', description: 'Description of Image 3' },
  ];

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const handleThumbnailClick = (index) => {
    setSelectedImageIndex(index);
  };

  const handleNextClick = () => {
    setSelectedImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrevClick = () => {
    setSelectedImageIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };
  const Location  = "Zirkpur Chandigarh"; // Assuming props contain location prop
  const latitude = 37.7749; // Replace with actual latitude
  const longitude = -122.4194;
  return (
    <div className="m-20">
  <div className="grid grid-cols-12 gap-10"> {/* Set gap to 0 for minimal space */}
    <div className="col-span-8 flex flex-col"> {/* Span 9 out of 12 columns for the image section */}
      <ImageSlider
        image={images[selectedImageIndex]}
        onNextClick={handleNextClick}
        onPrevClick={handlePrevClick}
      />
      <ImageThumbnil
        images={images}
        onThumbnailClick={handleThumbnailClick}
        selectedImageIndex={selectedImageIndex}
      />
    </div>
    <div className="col-span-4  p-2"> {/* Span 3 out of 12 columns for the other section, with reduced padding */}
      <div className='shadow p-3 h-30'>
        <h1 className='text-4xl font-semibold'>Posted in</h1>
        <h1 className='text-lg text-gray-500'>{Location}</h1>
      </div>
      <div className='shadow-xl  mt-10'>
        
      <MapComponent lat={latitude} lng={longitude} />
      </div>
    </div>
  </div>


  
      <div className=''>
          Description
      </div>
    </div>
  );
}

export default MainCard;
