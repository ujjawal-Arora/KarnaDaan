import React, { useState } from "react";
import { CiCamera } from "react-icons/ci";
import { FaArrowLeft } from "react-icons/fa6";
import { Link } from "react-router-dom";
import axios from "axios";

function Requests() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [wishListed, setWishlisted] = useState(false);
  const [accepted, setaccepted] = useState(false);

  const [description, setDescription] = useState("");

  const [location, setLocation] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

 
  
  
  
  const HandleSubmit = async () => {
    try {

      const response = await axios.post(
        'http://localhost:3000/api/v1/requests/add-req',
        {
          title,
          category,
          description,
          location,
          wishListed,
          accepted,
          name,
          phoneNumber,
        },
        { withCredentials: true }
      );
  
      console.log("Req added successfully:", response.data);
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
        <h1 className="text-3xl font-bold mb-4">Post Your Request</h1>
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
          <div className="w-full">
              <label className="block mb-2">Name</label>
              <input
                type="text"
                className="w-full p-2 border rounded"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
         

          <div className="mb-4 mt-4">

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

export default Requests;
