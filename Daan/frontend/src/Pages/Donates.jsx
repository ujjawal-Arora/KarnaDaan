import React, { useState } from "react";
import { CiCamera } from "react-icons/ci";
import { FaArrowLeft } from "react-icons/fa6";
import { Link,useNavigate } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import uploadFile from "../Helper/upload";
import axios from "axios";
import {useDispatch,useSelector } from 'react-redux';


function Donates() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [wishListed, setWishlisted] = useState(false);
  const [donated, setDonated] = useState(false);

  const [description, setDescription] = useState("");
  const [images, setImages] = useState([null, null, null, null, null]);
  const [image, setImage] = useState(null);

  const [location, setLocation] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newImages = [...images];
        newImages[index] = reader.result;
        setImages(newImages);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleImageUrls = async () => {
    try {
      const uploadPromises = images.map((img) => {
        if (img) {
          return uploadFile(img); 
        } else {
          return Promise.resolve(null); 
        }
      });
  
      // Wait for all the promises to resolve
      const uploadedData = await Promise.all(uploadPromises);
  
      const uploadedUrls = uploadedData
        .filter(data => data !== null) 
        .map(data => data.secure_url); 
  
      return uploadedUrls; // Return only URLs
    } catch (error) {
      console.error('Error uploading images:', error);
      alert("Error uploading images");
      return [];
    }
  };
  const user=useSelector((state) => state.auth);
  console.log("user  at donate",user.email);
  
  const HandleSubmit = async () => {
    try {
      const urls = await handleImageUrls();
   //Wait for URLs to be populated
   console.log(urls)
      const response = await axios.post(
        'https://karnadaan.onrender.com/api/v1/posts/add-post',
        // 'http://localhost:3000/api/v1/posts/add-post',

        {
          title,
          category,
          description,
          imageUrls: urls, 
          location,
          wishListed,
          donated,
          name,
          phoneNumber,
          email:user.email,
        },
        { withCredentials: true }
      );
  
      console.log("Post added successfully:", response.data);
      toast.success(' Your Post Posted successfully');
      setTimeout(() => {
           navigate('/');
      },2000)
    } catch (error) {
      console.error("Error adding post:", error.response ? error.response.data : error.message);
    }
  };
  
  return (
    <div>
      <div className="bg-orange-50 flex items-center p-3 text-2xl text-gray-500 h-20 ">
        <div>
          <Link to="/">
            <FaArrowLeft />
          </Link>
        </div>
      </div>
      <div className="container mx-auto p-4">
      <Toaster position="top-center" reverseOrder={false} />

        <h1 className="text-3xl font-bold mb-4">Post Your Donation</h1>
        <div className="border p-4 mb-4">
          <h2 className="text-xl font-semibold mb-2">Categories</h2>
          <div className="mb-4">
            <label className="block mb-2">Select Category</label>
            <select
              className="w-full p-2 border rounded"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">Select a category</option>
              <option value="clothes">Clothes</option>
              <option value="shoes">Shoes</option>
              <option value="electronics">Electronics</option>
              <option value="books">Books</option>
              <option value="furniture">Furniture</option>
              <option value="toys">Toys</option>
              <option value="kitchen">Kitchen Items</option>
              <option value="sports">Sports Equipment</option>
              <option value="tools">Tools</option>
              <option value="art">Art Supplies</option>
              <option value="Cycle">Cycle</option>

            </select>
          </div>
        </div>
        <div className="border p-4 mb-4">
          <h2 className="text-xl font-semibold mb-2">Include Some Details</h2>
          <div className="mb-4">
            <label className="block mb-2">Title</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label className="block mb-2">Description</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>

        <div className="border p-4 mb-4">
          <h2 className="text-xl font-semibold mb-2">Upload Images</h2>

          <div className="flex gap-4">
            {images.map((image, index) => (
              <div
                key={index}
                className="relative w-24 h-24 border border-gray-300 rounded-lg overflow-hidden bg-gray-100"
              >
                <input
                  type="file"
                  accept="image/*"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  onChange={(e) => handleImageChange(e, index)}
                />
                {image ? (
                  image && (
                    <img
                      src={image}
                      alt={`Preview ${index}`}
                      className="w-full h-full object-cover"
                    />
                  )
                ) : (
                  <div className="flex items-center justify-center w-full h-full">
                    <CiCamera className="text-gray-500 text-3xl" />
                  </div>
                )}
              </div>
            ))}
           
          </div>
          
        </div>

        <div className="border p-4 mb-4">
          <h2 className="text-xl font-semibold mb-2">Confirm Your Location</h2>
          <div className="mb-4">
            <label className="block mb-2">Location</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
        </div>

        <div className="border p-4 mb-4">
          <h2 className="text-xl font-semibold mb-4">Review Your Details</h2>

          <div className="flex gap-8 items-center mb-4">
            <div className="relative w-24 h-24 border border-gray-300 rounded-full overflow-hidden bg-gray-100">
              <input
                type="file"
                accept="image/*"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                onChange={handleProfileImageChange}
              />
              {image ? (
                <img
                  src={image}
                  alt="Profile Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center w-full h-full">
                  <CiCamera className="text-gray-500 text-3xl" />
                </div>
              )}
            </div>
            <div className="w-full">
              <label className="block mb-2">Name</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block mb-2">Phone Number</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          </div>
        </div>
        <div className="flex justify-end gap-4">
          <button onClick={HandleSubmit} className="bg-blue-500 px-5 rounded text-white font-semibold py-2 text-xl">
            Submit
          </button>
  
  </div>
      </div>
    </div>
  );
}

export default Donates;
