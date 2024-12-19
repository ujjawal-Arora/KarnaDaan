
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ImageThumbnil from "./MainCardCompo/ImageThumbnil";
import MapComponent from "./MainCardCompo/MapComponent";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { FaArrowLeft } from "react-icons/fa6";
import toast from "react-hot-toast";
import axios from "axios";

const MainCard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const data = location.state;

  if (!data || !data.imageUrls) {
    return <p className="text-center text-red-500 font-semibold">Card not found</p>;
  }

  const cardData = data.imageUrls;
  const finalLocalation=data.location;
  const description = data.description || "No description available.";
  const latitude = data.latitude || 0;
  const longitude = data.longitude || 0;
  const locationName = data.locationName || "Unknown Location";
  const name = data.name || "Unknown Name";
  const title = data.title || "Untitled";
  const wishlist = data.wishListed;

  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(wishlist);

  const handleWishlistClick = async (e) => {
    e.stopPropagation();

    try {
      const newWishlistState = !isWishlisted;
      setIsWishlisted(newWishlistState); 

      await axios.put(`http://localhost:3000/api/v1/posts/toggle-wishlist/${data._id}`, {
        userId: localStorage.getItem("userId"),
        wishListed: newWishlistState,
      });

      if (newWishlistState) {
        toast.success("Post added to your wishlist");
      } else {
        toast.success("Post removed from your wishlist");
      }
    } catch (error) {
      // Revert state update if API call fails
      console.error("Error updating wishlist:", error);
      toast.error("Failed to update wishlist");
      setIsWishlisted((prevState) => !prevState); // Revert to previous state
    }
  };

  const handleNextClick = () => {
    setSelectedImageIndex((prevIndex) => (prevIndex + 1) % cardData.length);
  };

  const handlePrevClick = () => {
    setSelectedImageIndex((prevIndex) => (prevIndex - 1 + cardData.length) % cardData.length);
  };

  const handleThumbnailClick = (index) => {
    setSelectedImageIndex(index);
  };

  const handleDonorchatClick = () => {
    navigate(`/chat/${data.user}`);
  };

  const handleBackClick = () => {
    navigate("/home");
    window.location.reload();
  };

  console.log(latitude, longitude)
  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-3xl shadow-lg">
      {/* Back Button */}
      <div className="mb-6">
        <button
          className="flex items-center text-gray-700 hover:text-gray-900 font-medium"
          onClick={handleBackClick}
        >
          <FaArrowLeft className="mr-2" /> Back
        </button>
      </div>

      {/* Title Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">{title}</h1>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Image Carousel */}
        <div className="lg:w-2/3">
          <div className="relative w-full bg-gray-100 rounded-xl overflow-hidden shadow-md">
            <button
              onClick={handlePrevClick}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow-md hover:scale-110 transition-all"
            >
              <IoIosArrowBack size={28} className="text-gray-600" />
            </button>

            <img
              src={cardData[selectedImageIndex]}
              alt="Main"
              className="w-full h-[400px] object-cover transition-transform duration-500 hover:scale-105"
            />

            <button
              onClick={handleNextClick}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow-md hover:scale-110 transition-all"
            >
              <IoIosArrowForward size={28} className="text-gray-600" />
            </button>
          </div>

          <div className="mt-4">
            <ImageThumbnil
              images={cardData}
              onThumbnailClick={handleThumbnailClick}
              selectedImageIndex={selectedImageIndex}
            />
          </div>
        </div>

        {/* Details Section */}
        <div className="lg:w-1/3">
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-gray-800">{name}</h2>
          </div>

          <div className="bg-gray-50 p-6 rounded-xl shadow-md">
            <h3 className="text-lg text-blue-600 font-semibold mb-3">{finalLocalation}</h3>

            <div className="rounded-lg overflow-hidden shadow-sm">
              <MapComponent locationName={finalLocalation}  />
            </div>
          </div>
        </div>
      </div>

      {/* Description Section */}
      <div className="mt-8 p-6 bg-gray-50 rounded-xl shadow-md">
        <h3 className="text-2xl font-bold text-gray-800 mb-4">Description</h3>
        <p className="text-gray-700 leading-relaxed">{description}</p>
      </div>

      {/* Buttons */}
      <div className="flex justify-center gap-4 mt-6">
        <button
          onClick={handleWishlistClick}
          className="px-5 py-3 text-white bg-orange-500 rounded-lg shadow-md hover:bg-orange-600 transition-all"
        >
          {isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
        </button>
        <button
          onClick={handleDonorchatClick}
          className="px-5 py-3 text-white bg-teal-500 rounded-lg shadow-md hover:bg-teal-600 transition-all"
        >
          Chat with Donor
        </button>
      </div>
    </div>
  );
};

export default MainCard;

