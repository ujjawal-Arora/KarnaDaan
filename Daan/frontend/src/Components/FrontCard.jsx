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
  onDonate,
  alreadyDonated
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
  
      await axios.put(`http://localhost:3000/api/v1/posts/toggle-wishlist/${cardId}`, {
        userId: localStorage.getItem("userId"),
        wishListed: newWishlistState,
      });
      
      if(newWishlistState){
        toast.success(`Post added to your wishlist`);
      }else{
        toast.success(`Post removed from your wishlist`);
      }
    } catch (error) {
      console.error("Error updating wishlist:", error);
      toast.error("Failed to update wishlist");
      setIsWishlisted((prevState) => !prevState);
    }
  };

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
  
  const handleDonateClick = async (e) => {
    e.stopPropagation();
    try {
      await axios.post(
        `http://localhost:3000/api/v1/posts/donate-done/${cardId}`,
        { userId: userId },
        { withCredentials: true }
      );
      toast.success("Thank You for your donation");
      onDeleteCard(cardId);
    } catch (error) {
      console.error("Error deleting post:", error);
      toast.error("Error deleting post");
    }
  };

  return (
    <div 
      className={`w-80 bg-white rounded-lg shadow-md p-4 flex flex-col transition-transform transform hover:scale-105 hover:shadow-xl ${!alreadyDonated ? 'opacity-50' : ''}`}
      style={!alreadyDonated ? { position: 'relative' } : {}}
    >
      {!alreadyDonated && (
        <div className="absolute inset-0 flex justify-center items-center text-white font-bold text-2xl bg-black bg-opacity-50">
          Donated
        </div>
      )}
      <div className="relative">
        <img
          src={imgSrc}
          alt={imgAlt}
          className="w-70 h-56 object-cover rounded-t-lg"
        />
        {alreadyDonated && !onDonate && !fromWish && (
          <FaHeart
            className={`absolute top-2 right-2 text-2xl cursor-pointer transition duration-300 ${
              isWishlisted ? "text-red-600" : "text-gray-400"
            }`}
            onClick={handleWishlistClick}
          />
        )}
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
              onClick={handleDeleteClick}
              className="text-white bg-red-600 text-sm font-bold rounded-lg px-4 py-2"
            >
              Delete
            </button>
            <button
              onClick={handleDonateClick}
              className="text-white bg-blue-800 text-sm font-bold rounded-lg px-4 py-2"
            >
              Donated
            </button>
          </>
        )}
      </div>
      {isEditMode && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 transition-opacity duration-300"
          onClick={handleCloseClick}
        >
          <div
            className="bg-white w-[90%] max-w-[700px] p-6 rounded-lg relative shadow-xl transition-transform transform hover:scale-105"
            onClick={stopPropagation}
          >
            <button
              onClick={handleCloseClick}
              className="absolute top-2 right-2 text-3xl font-bold text-gray-600 p-2 hover:text-gray-800"
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-6 text-center text-blue-600">Edit Information</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Form inputs here */}
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default FrontCard;
