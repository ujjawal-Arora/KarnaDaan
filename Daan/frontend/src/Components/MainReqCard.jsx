// import { useState } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import ImageThumbnil from './MainCardCompo/ImageThumbnil';
// import MapComponent from './MainCardCompo/MapComponent';
// import { IoIosArrowForward } from "react-icons/io";
// import { FaArrowLeft } from "react-icons/fa6";
// import toast from "react-hot-toast";
// import axios from "axios";
// import { Link } from 'react-router-dom';

// const MainReqCard = () => {
//   const location = useLocation();
//   const navigate = useNavigate(); // Initialize the useNavigate hook
//   const data = location.state;
//   const description = data.description || "No description available.";

//   if (!data ) {
//     return <p className="text-center text-red-500 font-semibold">Card not found</p>;
//   }

//   const handleBackClick = () => {
//     const origin = data?.from === 'requests' ? '/your-requests' : '/home'; // Navigate based on origin
//     navigate(origin);
//   };
  
//   const latitude = 30.2110; 
//   const longitude = 74.9455;
//   const locationName = data.locationName || "Unknown Location"; // Add location name
//   const name = data.name || "Unknown Name"; // Add name

//   const title = data.title || "Untitled"; // Add title
//   return (
//     <div className="max-w-7xl mx-auto p-8 bg-white rounded-3xl shadow-2xl overflow-hidden">
//       {/* Back Button */}
//       <div className="mb-8">
//       {/* Arrow at the top left for navigating back */}
//       <button
//           className="flex items-center text-black  hover:text-gray-800 font-semibold transition-transform hover:scale-110"
//           onClick={handleBackClick}
//         >
//           <FaArrowLeft className="mr-2 text-black" /> 
//           </button>
//           </div>
//           <div className="mb-8">
//         <h1 className="text-4xl font-bold text-gray-800">{title}</h1>
//       </div>

//       <div className="flex flex-col lg:flex-row gap-12">
//         {/* Left section for description and chat */}
//         <div className="col-span-8 p-2"> 
//           {/* <div className='mt-4'>
//             <h2 className="text-xl font-bold mb-2">Description</h2>
//             <p className="text-gray-700">{data.description}</p>
//           </div> */}
//           {/* <div className='shadow-lg hover:bg-zinc-700  rounded-lg bg-zinc-800 text-white font-bold p-3 mt-9 w-[500px] '>
//             <div className='flex items-center justify-between'>
//               <div className='flex gap-4 items-center'>
//                 <div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-200">
//                   <span className="text-xl text-gray-600 dark:text-gray-900">{data.name.charAt(0)}</span>
//                 </div>
//                 <h1 className='text-2xl'>{data.name}</h1>
//               </div>
//               <IoIosArrowForward className='text-2xl'/>
//             </div>
//             <h1 className='text-lg flex items-center justify-center mt-5 border p-2 text-gray-300 font-semibold'>Chat with Donor</h1>
//           </div> */}
//         </div>

//        {/* Right section for map and posted in */}
// <div className="lg:w-1/3 ml-auto">
// <div className="mb-4">
//             <h2 className="text-2xl font-semibold text-gray-800">{name}</h2>
//           </div>
//   <div className="bg-gray-50 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
//     <h2 className="text-2xl font-bold text-gray-800 mb-4">Location</h2>
//     <h3 className="text-lg text-blue-600 font-semibold mb-2">{locationName}</h3>
//     {/* <div className="rounded-lg overflow-hidden shadow-md">
//       <MapComponent latitude={latitude} longitude={longitude} />
//     </div> */}
//     <div className="mt-4 text-gray-600 text-sm flex justify-between">
//       <span>
//         <strong>Latitude:</strong> {latitude.toFixed(5)}
//       </span>
//       <span>
//         <strong>Longitude:</strong> {longitude.toFixed(5)}
//       </span>
//     </div>
//   </div>
// </div>

//       </div>
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
//           {/* <button onClick={handleWishlistClick} className="px-6 py-3 text-lg font-semibold text-white bg-gradient-to-r from-orange-500 to-red-500 rounded-full shadow-md hover:shadow-lg hover:scale-110 transition-all duration-300">
//             {!wishlist?"Add to Wishlist":"Remove from Wishlist"}
//           </button> */}
//           <Link to="/chat">
//           <button className="px-6 py-3 text-lg font-semibold text-white bg-gradient-to-r from-teal-400 to-green-500 rounded-full shadow-md hover:shadow-lg hover:scale-110 transition-all duration-300">
//             Chat with Donor
//           </button>
//           </Link>
//         </div>
//       </div>
//    </div>
//   );
// };

// export default MainReqCard;

// ------------------------------------------

// import { useLocation, useNavigate } from "react-router-dom";
// import { FaArrowLeft } from "react-icons/fa6";
// import { Link } from "react-router-dom";
// import MapComponent from "./MainCardCompo/MapComponent";


// const MainReqCard = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const data = location.state;
//   const description = data.description || "No description available.";

//   if (!data) {
//     return <p className="text-center text-red-500 font-semibold">Card not found</p>;
//   }

//   const handleBackClick = () => {
//     const origin = data?.from === "requests" ? "/your-requests" : "/home";
//     navigate(origin);
//   };

//   const latitude = 30.211;
//   const longitude = 74.9455;
//   const locationName = data.locationName || "Unknown Location";
//   const name = data.name || "Unknown Name";
//   const title = data.title || "Untitled";

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
//       <div className="max-w-7xl w-full p-8 bg-white rounded-3xl shadow-2xl overflow-hidden">
//         {/* Back Button */}
//         <div className="mb-8">
//           <button
//             className="flex items-center text-black hover:text-gray-800 font-semibold transition-transform hover:scale-110"
//             onClick={handleBackClick}
//           >
//             <FaArrowLeft className="mr-2 text-black" />
//           </button>
//         </div>

//         {/* Main Content */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
//           {/* Left Section */}
//           <div>
//             <h1 className="text-4xl font-bold text-gray-800 mb-4">{title}</h1>
//             <div className="mt-6">
//               <h3 className="text-2xl font-bold text-gray-800 mb-2">Description</h3>
//               <p className="text-gray-700">{description}</p>
//             </div>
//           </div>

//           {/* Right Section */}
//           <div>
//             <div className="mb-6">
//               <h2 className="text-2xl font-semibold text-gray-800">{name}</h2>
//             </div>

//            <div className="bg-gray-50 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
//             {/* Location Name */}
//             <h3 className="text-lg text-blue-600 font-semibold mb-2">{locationName}</h3>

//             {/* Map Component */}
//             <div className="rounded-lg overflow-hidden shadow-md">
//               <MapComponent latitude={latitude} longitude={longitude} />
//             </div>

//             {/* Coordinates */}
//             <div className="mt-4 text-gray-600 text-sm flex justify-between">
//               <span>
//                 <strong>Latitude:</strong> {latitude.toFixed(5)}
//               </span>
//               <span>
//                 <strong>Longitude:</strong> {longitude.toFixed(5)}
//               </span>
//             </div>
//           </div>
//           </div>
//         </div>

//         {/* Bottom Section */}
//         <div className="mt-12 flex justify-center">
//           <Link to="/chat">
//             <button className="px-6 py-3 text-lg font-semibold text-white bg-gradient-to-r from-teal-400 to-green-500 rounded-full shadow-md hover:shadow-lg hover:scale-110 transition-all duration-300">
//               Chat with Donor
//             </button>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MainReqCard;


// -------------------------------------------

import { useLocation, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";
import { Link } from "react-router-dom";
import MapComponent from "./MainCardCompo/MapComponent";

const MainReqCard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state;
  const description = data.description || "No description available.";

  if (!data) {
    return <p className="text-center text-red-500 font-semibold">Card not found</p>;
  }

  const handleBackClick = () => {
    const origin = data?.from === "requests" ? "/your-requests" : "/home";
    navigate(origin);
  };

  const latitude = data.latitude || 0; // Ensure latitude is available
  const longitude = data.longitude || 0; // Ensure longitude is available
  const locationName = data.locationName || "Unknown Location";
  const name = data.name || "Unknown Name";
  const title = data.title || "Untitled";

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="max-w-7xl w-full p-8 bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Back Button */}
        <div className="mb-8">
          <button
            className="flex items-center text-black hover:text-gray-800 font-semibold transition-transform hover:scale-110"
            onClick={handleBackClick}
          >
            <FaArrowLeft className="mr-2 text-black" />
          </button>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Section */}
          <div>
            {/* Title with larger bottom margin */}
            <h1 className="text-4xl font-bold text-gray-800 mb-14">{title}</h1>

            <div className="mt-6">
              {/* Description Title */}
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Description</h3>
              <p className="text-gray-700">{description}</p>
            </div>

            {/* Chat Button below description */}
            <div className="mt-20 flex justify-center"> {/* Changed margin-top from mt-10 to mt-16 */}
              <Link to="/chat">
                <button className="px-6 py-3 text-lg font-semibold text-white bg-gradient-to-r from-teal-400 to-green-500 rounded-full shadow-md hover:shadow-lg hover:scale-110 transition-all duration-300">
                  Chat with Donor
                </button>
              </Link>
            </div>
          </div>

          {/* Right Section */}
          <div>
            <div className="mb-6">
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
      </div>
    </div>
  );
};

export default MainReqCard;







// import { useLocation, useNavigate } from 'react-router-dom';
// import MapComponent from './MainCardCompo/MapComponent';
// import { FaArrowLeft } from "react-icons/fa6";

// const MainReqCard = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const data = location.state;
//   const description = data.description || "No description available.";


//   if (!data) {
//     return <p className="text-center text-red-500 font-semibold">Card not found</p>;
//   }

//   const handleBackClick = () => {
//     const origin = data?.from === 'requests' ? '/your-requests' : '/home'; 
//     navigate(origin);
//   };

//   const latitude = 30.2110; 
//   const longitude = 74.9455;

//   return (
//     <div className="max-w-7xl mx-auto p-8 bg-white rounded-3xl shadow-2xl overflow-hidden">
//       {/* Back Button */}
//       <div className="mb-8">
//         <button
//           className="flex items-center text-black hover:text-gray-800 font-semibold transition-transform hover:scale-110"
//           onClick={handleBackClick}
//         >
//           <FaArrowLeft className="mr-2 text-black" />
//         </button>
//       </div>

//       {/* Content Wrapper */}
//       <div className="flex flex-col lg:flex-row gap-12">
//         {/* Left Side - Description and Chat Section */}
//         <div className="lg:w-2/3">

//           <div className="mt-12 p-8 bg-gray-100 border-l-8 border-black rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-500">
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
//           <button className="px-6 py-3 text-lg font-semibold text-white bg-gradient-to-r from-orange-500 to-red-500 rounded-full shadow-md hover:shadow-lg hover:scale-110 transition-all duration-300">
//             Add to Wishlist
//           </button>
//           <button className="px-6 py-3 text-lg font-semibold text-white bg-gradient-to-r from-teal-400 to-green-500 rounded-full shadow-md hover:shadow-lg hover:scale-110 transition-all duration-300">
//             Chat with Donor
//           </button>
//         </div>
//       </div>

//         </div>

//         {/* Right Side - Location Info and Map */}
//         <div className="lg:w-1/3">
//           <div className="bg-gray-50 p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300">
//             <h2 className="text-2xl font-bold text-gray-800 mb-4">Posted in</h2>
//             <h3 className="text-lg text-blue-600 font-semibold mb-2">{data.location}</h3>
//             <div className="rounded-lg overflow-hidden shadow-md">
//               <MapComponent lat={latitude} lng={longitude} />
//             </div>
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
//     </div>
//   );
// };

// export default MainReqCard;


// import { useState } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import ImageThumbnil from "./MainCardCompo/ImageThumbnil";
// import MapComponent from "./MainCardCompo/MapComponent";
// import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
// import { FaArrowLeft } from "react-icons/fa6";

// const MainReqCard = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const data = location.state;

//   if (!data || !data.imageUrls) {
//     return <p className="text-center text-red-500 font-semibold">Card not found</p>;
//   }

//   const cardData = data.imageUrls;
//   const description = data.description || "No description available.";
//   const latitude = data.latitude || 0; // Ensure latitude is available
//   const longitude = data.longitude || 0; // Ensure longitude is available
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
//     const origin = data?.from === 'requests' ? '/your-requests' : '/home'; // Navigate based on origin
//     navigate(origin);
//   };

//   return (
//     <div className="max-w-7xl mx-auto p-8 bg-white rounded-3xl shadow-2xl overflow-hidden">
//       {/* Back Button */}
//       <div className="mb-8">
//         <button
//           className="flex items-center text-black hover:text-gray-800 font-semibold transition-transform hover:scale-110"
//           onClick={handleBackClick}
//         >
//           <FaArrowLeft className="mr-2 text-black" /> Back
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
//             <div className="rounded-lg overflow-hidden shadow-md">
//               <MapComponent latitude={latitude} longitude={longitude} />
//             </div>
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
//         <p className="text-lg text-gray-800 leading-relaxed transition-transform duration-300 hover:scale-105">
//           {description}
//         </p>
//         <div className="w-full h-1 bg-black mt-4"></div>

//         {/* Buttons */}
//         <div className="flex justify-center gap-8 mt-8">
//           <button className="px-6 py-3 text-lg font-semibold text-white bg-gradient-to-r from-orange-500 to-red-500 rounded-full shadow-md hover:shadow-lg hover:scale-110 transition-all duration-300">
//             Add to Wishlist
//           </button>
//           <button className="px-6 py-3 text-lg font-semibold text-white bg-gradient-to-r from-teal-400 to-green-500 rounded-full shadow-md hover:shadow-lg hover:scale-110 transition-all duration-300">
//             Chat with Donor
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MainReqCard;