import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { authActions } from "../redux/Slice/slice";

const SearchBox = () => {
  const dispatch = useDispatch();
  const [address, setAddress] = useState("");
  const [category, setCategory] = useState("");

  const handlePlaceChanged = () => {
    if (address.trim() !== "") {
      dispatch(authActions.setSearch({ location: address, category }));
    }
  };

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setCategory(selectedCategory);
    dispatch(authActions.setSearch({ location: address, category: selectedCategory }));
  };

  return (
    <div className="flex gap-2">
      <input
        type="text"
        placeholder="Enter location"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        onBlur={handlePlaceChanged}
        className="border bg-zinc-200 text-zinc-800 placeholder:text-zinc-800 rounded p-2 outline-none h-10 w-80"
      />

      <select
        className="w-52 border bg-zinc-200 px-7 rounded"
        onChange={handleCategoryChange}
        value={category}
      >
        <option value="">Select Category</option>
        <option value="Clothes">Clothes</option>
        <option value="Shoes">Shoes</option>
        <option value="Furniture">Furniture</option>
        <option value="Books">Books</option>
      </select>

      <button
        className="bg-neutral-600 font-bold hover:bg-neutral-500 p-2 w-20 rounded-lg text-white"
        onClick={() => {
          console.log("Search Triggered", { location: address, category });
        }}
      >
        Search
      </button>
    </div>
  );
};

export default SearchBox;
