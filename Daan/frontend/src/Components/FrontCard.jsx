import { FaHeart } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import React, { useState } from "react";
import { useSelector } from 'react-redux';
const FrontCard = ({
  imgSrc,
  imgAlt,
  title,
  description,
  btntext,
  wishlist,
  cardId,
  onDeleteCard,
  isFromDonation,
  fromWish,
  locationInput,
  name,
  phoneNumber,
  category,
}) => {
  const [isWishlisted, setIsWishlisted] = useState(wishlist);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formTitle, setFormTitle] = useState(title);
  const [formDescription, setFormDescription] = useState(description);
  const [formLocation, setFormLocation] = useState(locationInput);
  const [formName, setFormName] = useState(name);
  const [formPhoneNumber, setFormPhoneNumber] = useState(phoneNumber);
  const [formCategory, setFormCategory] = useState(category);

  const categories = [
    "Clothing",
    "Books",
    "Furniture",
    "Electronics",
    "Toys",
    "Shoes",
    "Kitchen Items",
    "Art Supplies",
  ];
  const userId = useSelector((state) => state.auth._id);

  const handleWishlistClick = async (e) => {
    e.stopPropagation();
    
  
    try {
      const newWishlistState = !isWishlisted;
      setIsWishlisted(newWishlistState);
      console.log("wishList  f nfsdf",newWishlistState)
  
      await axios.put(`http://localhost:3000/api/v1/posts/toggle-wishlist/${cardId}`, {
        userId: localStorage.getItem("userId"),
        wishListed: newWishlistState,
      });
      
      if(newWishlistState){
        toast.success(`Post added to your wishlist`);
      }else{
        toast.success(`Post remove from your wishlist`);
      }
  
    } catch (error) {
      console.error("Error updating wishlist:", error);
      toast.error("Failed to update wishlist");
      // Revert state in case of error
      setIsWishlisted((prevState) => !prevState);
    }
  };
  ;

  const handleEditClick = (e) => {
    e.stopPropagation();
    setIsEditMode(true);
  };

  const handleCloseClick = (e) => {
    e.stopPropagation();
    setIsEditMode(false);
  };

  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:3000/api/v1/posts/update-post/${cardId}`,
        {
          title: formTitle,
          description: formDescription,
          location: formLocation,
          name: formName,
          phoneNumber: formPhoneNumber,
          category: formCategory,
        }
      );
      toast.success("Post edited successfully");
      setIsEditMode(false);
    } catch (error) {
      console.error("Error updating post:", error);
      toast.error("Error updating post");
    }
  };


  const handleDeleteClick = async (e) => {
    e.stopPropagation();
    try {
      await axios.delete(
        `http://localhost:3000/api/v1/posts/delete-post/${cardId}`,
        { userId: userId },
        { withCredentials: true }
      );
      toast.success("Post deleted successfully");
      onDeleteCard(cardId);
    } catch (error) {
      console.error("Error deleting post:", error);
      toast.error("Error deleting post");
    }
  };

  return (
    <div className="w-80 bg-white rounded-lg shadow-md p-4 flex flex-col transition-transform transform hover:scale-105 hover:shadow-xl">
      <div className="relative">
        <img
          src={imgSrc}
          alt={imgAlt}
          className="w-70 h-56 object-cover rounded-t-lg"
        />
        {
          !fromWish&&<FaHeart
          className={`absolute top-2 right-2 text-2xl cursor-pointer transition duration-300 ${
            isWishlisted ? "text-red-600" : "text-gray-400"
          }`}
          onClick={handleWishlistClick}
        />
        }
      </div>
      <h2 className="text-lg font-bold mb-2">{title}</h2>
      <p className="text-zinc-600 mb-4 truncate">{description}</p>
      <div className="flex justify-end gap-2">
        <button className="bg-zinc-800 text-white font-semibold rounded-lg py-2 px-4">
          {btntext}
        </button>
        {isFromDonation && (
          <>
            <button
              onClick={handleEditClick}
              className="bg-blue-600 text-white font-semibold rounded-lg py-2 px-4"
            >
              Edit
            </button>
            <button
              onClick={handleDeleteClick}
              className="text-white bg-red-600 text-sm font-bold rounded-lg px-4 py-2"
            >
              Delete
            </button>
          </>
        )}
      </div>
      {isEditMode && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={handleCloseClick}
        >
          <div
            className="bg-white w-[90%] md:w-[700px] p-6 rounded-lg relative shadow-lg"
            onClick={stopPropagation}
          >
            <button
              onClick={handleCloseClick}
              className="absolute top-2 right-2 text-2xl font-bold text-gray-600 p-2 hover:text-gray-800"
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-4">Edit Information</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Title</label>
                <input
                  type="text"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  className="w-full border-gray-300 rounded-lg p-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Description
                </label>
                <input
                  type="text"
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  className="w-full border-gray-300 rounded-lg p-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Category
                </label>
                <select
                  value={formCategory}
                  onChange={(e) => setFormCategory(e.target.value)}
                  className="w-full border-gray-300 rounded-lg p-2"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Location
                </label>
                <input
                  type="text"
                  value={formLocation}
                  onChange={(e) => setFormLocation(e.target.value)}
                  className="w-full border-gray-300 rounded-lg p-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full border-gray-300 rounded-lg p-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Phone Number
                </label>
                <input
                  type="text"
                  value={formPhoneNumber}
                  onChange={(e) => setFormPhoneNumber(e.target.value)}
                  className="w-full border-gray-300 rounded-lg p-2"
                />
              </div>
              <button
                type="submit"
                className="bg-blue-600 text-white py-2 px-4 rounded-lg"
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FrontCard;
