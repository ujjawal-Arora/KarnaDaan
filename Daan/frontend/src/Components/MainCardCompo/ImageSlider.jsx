import React from 'react'

function ImageSlider({ image, onNextClick, onPrevClick }) {
    return (
        <div className="relative h-[400px]  overflow-hidden rounded-lg shadow-lg ">
          <img
            src={image.src}
            alt="Selected"
            className="w-[100%] h-[100%] object-contain"
          />
          <button
            onClick={onPrevClick}
            className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white border-none p-2 rounded-full cursor-pointer"
          >
            &#8249;
          </button>
          <button
            onClick={onNextClick}
            className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white border-none p-2 rounded-full cursor-pointer"
          >
            &#8250;
          </button>
        </div>
      );
      
}

export default ImageSlider
