// import { useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import ImageThumbnil from "./MainCardCompo/ImageThumbnil";
// import MapComponent from "./MainCardCompo/MapComponent";
// import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
// import { FaArrowLeft } from "react-icons/fa6";
// import toast from "react-hot-toast";
// import axios from "axios";
// import { Link } from 'react-router-dom';


// const MainCard = () => {
//   const location = useLocation();
  
//   const navigate = useNavigate(); 
//   const data = location.state;

//   const handleWishlistClick = async (e) => {
//     e.stopPropagation();
  
//     try {
//       // Toggle the wishlist state before the API call
//       const newWishlistState = !isWishlisted;
//       setIsWishlisted(newWishlistState); // Update the UI immediately
  
//       // Make the API call to update the wishlist state in the backend
//       await axios.put(`http://localhost:3000/api/v1/posts/toggle-wishlist/${data._id}`, {
//         userId: localStorage.getItem("userId"),
//         wishListed: newWishlistState,
//       });
  
//       // Show a success message based on the updated state
//       if (newWishlistState) {
//         toast.success("Post added to your wishlist");
//       } else {
//         toast.success("Post removed from your wishlist");
//       }
//     } catch (error) {
//       // Handle errors and revert the state update if the API call fails
//       console.error("Error updating wishlist:", error);
//       toast.error("Failed to update wishlist");
//       setIsWishlisted((prevState) => !prevState); // Revert to previous state if error occurs
//     }
//   };
  
//   if (!data || !data.imageUrls) {
//     return <p className="text-center text-red-500 font-semibold">Card not found</p>;
//   }

//   const cardData = data.imageUrls;
//   const wishlist=data.wishListed;

//   const [isWishlisted, setIsWishlisted] = useState(wishlist);

//   const description = data.description || "No description available.";
//   const latitude = 0; // Ensure latitude is available
//   const longitude =  0; // Ensure longitude is available
//   const locationName = data.locationName || "Unknown Location"; // Add location name
//   const [selectedImageIndex, setSelectedImageIndex] = useState(0);

//   const handleNextClick = () => {
//     setSelectedImageIndex((prevIndex) => (prevIndex + 1) % cardData.length);
//   };

//   const handlePrevClick = () => {
//     setSelectedImageIndex((prevIndex) => (prevIndex - 1 + cardData.length) % cardData.length);
//   };

//   const handleThumbnailClick = (index) => {
//     setSelectedImageIndex(index);
//   };

//   const handleBackClick = () => {

//     navigate("/home");
//     window.location.reload();
//   };
//   console.log("wishlist lnldvanvld",wishlist)

//   return (

//     <div className="max-w-7xl mx-auto p-8 bg-white rounded-3xl shadow-2xl overflow-hidden">
//       {/* Back Button */}
//       <div className="mb-8">
//         <button
//           className="flex items-center text-black  hover:text-gray-800 font-semibold transition-transform hover:scale-110"
//           onClick={handleBackClick}
//         >
//           <FaArrowLeft className="mr-2 text-black" /> 
//         </button>
//       </div>

//       {/* Content Wrapper */}
//       <div className="flex flex-col lg:flex-row gap-12">
//         {/* Left Side - Image Section */}
//         <div className="lg:w-2/3">
//           <div className="relative w-full bg-gray-100 rounded-xl overflow-hidden shadow-md">
//             {/* Prev Button */}
//             <button
//               onClick={handlePrevClick}
//               className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow-lg hover:scale-125 transition-transform duration-300"
//             >
//               <IoIosArrowBack size={28} className="text-gray-600" />
//             </button>

//             {/* Main Image */}
//             <img
//               src={cardData[selectedImageIndex]}
//               alt="Main"
//               className="w-full h-[500px] object-contain transition-transform duration-500 hover:scale-105"
//             />

//             {/* Next Button */}
//             <button
//               onClick={handleNextClick}
//               className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow-lg hover:scale-125 transition-transform duration-300"
//             >
//               <IoIosArrowForward size={28} className="text-gray-600" />
//             </button>
//           </div>

//           {/* Thumbnails */}
//           <div className="mt-6">
//             <ImageThumbnil
//               images={cardData}
//               onThumbnailClick={handleThumbnailClick}
//               selectedImageIndex={selectedImageIndex}
//             />
//           </div>
//         </div>

//         {/* Right Side - Map Section */}
//         <div className="lg:w-1/3">
//           <div className="bg-gray-50 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
//             <h2 className="text-2xl font-bold text-gray-800 mb-4">Location</h2>
//             <h3 className="text-lg text-blue-600 font-semibold mb-2">{locationName}</h3>
//             {/* <div className="rounded-lg overflow-hidden shadow-md">
//               <MapComponent latitude={latitude} longitude={longitude} />
//             </div> */}
//             <div className="mt-4 text-gray-600 text-sm flex justify-between">
//               <span>
//                 <strong>Latitude:</strong> {latitude.toFixed(5)}
//               </span>
//               <span>
//                 <strong>Longitude:</strong> {longitude.toFixed(5)}
//               </span>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Description Section */}
//       <div className="mt-12 p-8 bg-gray-100 border-l-8 border-black rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-500">
//         <h3 className="text-4xl font-extrabold text-gray-900 mb-4 uppercase tracking-wider">
//           Description
//         </h3>
//         <p
//           className="text-lg text-gray-800 leading-relaxed transition-transform duration-300 hover:scale-105"
//         >
//           {description}
//         </p>
//         <div className="w-full h-1 bg-black mt-4"></div>

//         {/* Buttons */}
//         <div className="flex justify-center gap-8 mt-8">
//           <button onClick={handleWishlistClick} className="px-6 py-3 text-lg font-semibold text-white bg-gradient-to-r from-orange-500 to-red-500 rounded-full shadow-md hover:shadow-lg hover:scale-110 transition-all duration-300">
//             {!wishlist?"Add to Wishlist":"Remove from Wishlist"}
//           </button>
//           <Link to="/chat">
//           <button className="px-6 py-3 text-lg font-semibold text-white bg-gradient-to-r from-teal-400 to-green-500 rounded-full shadow-md hover:shadow-lg hover:scale-110 transition-all duration-300">
//             Chat with Donor
//           </button>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MainCard;

import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ImageThumbnil from "./MainCardCompo/ImageThumbnil";
import MapComponent from "./MainCardCompo/MapComponent";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { FaArrowLeft } from "react-icons/fa6";

const MainCard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state;

  if (!data || !data.imageUrls) {
    return <p className="text-center text-red-500 font-semibold">Card not found</p>;
  }

  const cardData = data.imageUrls;
  const description = data.description || "No description available.";
  const latitude = data.latitude || 0; // Ensure latitude is available
  const longitude = data.longitude || 0; // Ensure longitude is available
  const locationName = data.locationName || "Unknown Location"; // Add location name
  const name = data.name || "Unknown Name"; // Add name
  const title = data.title || "Untitled"; // Add title
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
    navigate("/home");
    window.location.reload();
  };

  return (
    <div className="max-w-7xl mx-auto p-8 bg-white rounded-3xl shadow-2xl overflow-hidden">
      {/* Back Button */}
      <div className="mb-8">
        <button
          className="flex items-center text-black hover:text-gray-800 font-semibold transition-transform hover:scale-110"
          onClick={handleBackClick}
        >
          <FaArrowLeft className="mr-2 text-black" /> Back
        </button>
      </div>

      {/* Title Section */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800">{title}</h1>
      </div>

      {/* Content Wrapper */}
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Left Side - Image Section */}
        <div className="lg:w-2/3">
          <div className="relative w-full bg-gray-100 rounded-xl overflow-hidden shadow-md">
            {/* Prev Button */}
            <button
              onClick={handlePrevClick}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow-lg hover:scale-125 transition-transform duration-300"
            >
              <IoIosArrowBack size={28} className="text-gray-600" />
            </button>

            {/* Main Image */}
            <img
              src={cardData[selectedImageIndex]}
              alt="Main"
              className="w-full h-[500px] object-contain transition-transform duration-500 hover:scale-105"
            />

            {/* Next Button */}
            <button
              onClick={handleNextClick}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow-lg hover:scale-125 transition-transform duration-300"
            >
              <IoIosArrowForward size={28} className="text-gray-600" />
            </button>
          </div>

          {/* Thumbnails */}
          <div className="mt-6">
            <ImageThumbnil
              images={cardData}
              onThumbnailClick={handleThumbnailClick}
              selectedImageIndex={selectedImageIndex}
            />
          </div>
        </div>

        {/* Right Side - Map Section */}
        <div className="lg:w-1/3">
          {/* Name above Map */}
          <div className="mb-4">
            <h2 className="text-2xl font-semibold text-gray-800">{name}</h2>
          </div>

          <div className="bg-gray-50 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
            {/* Location Name */}
            <h3 className="text-lg text-blue-600 font-semibold mb-2">{locationName}</h3>

            {/* Map Component */}
            <div className="rounded-lg overflow-hidden shadow-md">
              <MapComponent latitude={latitude} longitude={longitude} />
            </div>

            {/* Coordinates */}
            <div className="mt-4 text-gray-600 text-sm flex justify-between">
              <span>
                <strong>Latitude:</strong> {latitude.toFixed(5)}
              </span>
              <span>
                <strong>Longitude:</strong> {longitude.toFixed(5)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Description Section */}
      <div className="mt-12 p-8 bg-gray-100 border-l-8 border-black rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-500">
        <h3 className="text-4xl font-extrabold text-gray-900 mb-4 uppercase tracking-wider">
          Description
        </h3>
        <p className="text-lg text-gray-800 leading-relaxed transition-transform duration-300 hover:scale-105">
          {description}
        </p>
        <div className="w-full h-1 bg-black mt-4"></div>

        {/* Buttons */}
        <div className="flex justify-center gap-8 mt-8">
          <button className="px-6 py-3 text-lg font-semibold text-white bg-gradient-to-r from-orange-500 to-red-500 rounded-full shadow-md hover:shadow-lg hover:scale-110 transition-all duration-300">
            Add to Wishlist
          </button>
          <button className="px-6 py-3 text-lg font-semibold text-white bg-gradient-to-r from-teal-400 to-green-500 rounded-full shadow-md hover:shadow-lg hover:scale-110 transition-all duration-300">
            Chat with Donor
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainCard;