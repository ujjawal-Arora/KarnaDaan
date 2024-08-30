import React from 'react';

function ImageThumbnil({ images, onThumbnailClick, selectedImageIndex }) {
  return (
    <div className="flex justify-center mt-5">
      {images.map((image, index) => (
        <img
          key={index}
          src={image} // Directly use the image URL
          alt={`Thumbnail ${index}`}
          className={`w-20 h-12 mx-1 cursor-pointer rounded-md transition-all duration-200 ${
            selectedImageIndex === index ? 'border-2 border-blue-500' : 'border-2 border-transparent'
          }`}
          onClick={() => onThumbnailClick(index)}
        />
      ))}
    </div>
  );
}

export default ImageThumbnil;











