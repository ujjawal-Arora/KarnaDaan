import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../redux/Slice/slice";

const SearchBox = () => {
  const dispatch = useDispatch();
  const [address, setAddress] = useState("");
  const [location, setLocation] = useState("");
  const [latlang, setLatLang] = useState({ lat: null, lng: null });
  const [category, setCategory] = useState("");
  const [predictions, setPredictions] = useState([]);
  const autocompleteRef = useRef(null);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setPredictions([]); 
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    dispatch(
      authActions.setSearch({
        location: location,
        category: e.target.value,
      })
    );
  };

  const handleAddressChange = async (e) => {
    setAddress(e.target.value);

    if (e.target.value.length > 2) {
      try {
        const response = await axios.get(
          `https://maps.gomaps.pro/maps/api/place/autocomplete/json`,
          {
            params: {
              input: e.target.value,
              key: "AlzaSyg2ZsvRWOu12bDuuYGKUK_Pculi6DBIwXr",
            },
          }
        );

        if (response.data.status === "OK") {
          setPredictions(response.data.predictions);
        } else {
          setPredictions([]);
        }
      } catch (error) {
        console.error("Error fetching autocomplete suggestions:", error);
        setPredictions([]);
      }
    } else {
      setPredictions([]);
    }
  };

  const handlePlaceSelect = async (place) => {
    // Clean and extract only the city name
    const cleanedLocation = place.description.split(",")[0].trim();
    setAddress(place.description);
    setLocation(cleanedLocation);
    setPredictions([]);
    if (autocompleteRef.current) autocompleteRef.current.blur();

    try {
      // Simulate fetching coordinates (replace with actual API response if needed)
      const lat = place.geometry?.location?.lat || 0;
      const lng = place.geometry?.location?.lng || 0;
      setLatLang({ lat, lng });

      console.log("Selected Location:", cleanedLocation);
    } catch (error) {
      console.error("Error selecting place:", error);
    }
  };
  const getItems = async () => {
    const normalizedLocation = location?.toLowerCase().trim() || "";
    const normalizedCategory = category?.toLowerCase().trim() || "";
  
    // Update Redux store with empty or updated values
    dispatch(
      authActions.setSearch({
        location: normalizedLocation,
        category: normalizedCategory,
      })
    );
  
    // Update local storage with empty or updated values
    localStorage.setItem(
      "search",
      JSON.stringify({
        location: normalizedLocation,
        category: normalizedCategory,
      })
    );
  
    console.log("Search Data:", {
      location: normalizedLocation,
      category: normalizedCategory,
    });
  };

  return (
    <div className="flex gap-2">
      <div ref={wrapperRef} className="relative">
        {/* Search Box */}
        <input
          ref={autocompleteRef}
          type="text"
          placeholder="Search for a place"
          value={address}
          onChange={handleAddressChange}
          className="border bg-zinc-200 text-zinc-800 placeholder:text-zinc-800 rounded p-2 outline-none h-10 w-80"
        />

        {/* Display Autocomplete Suggestions */}
        {predictions.length > 0 && (
          <ul className="absolute bg-white border mt-1 rounded w-80 max-h-60 overflow-y-auto z-10">
            {predictions.map((prediction) => (
              <li
                key={prediction.place_id}
                onClick={() => handlePlaceSelect(prediction)}
                className="p-2 hover:bg-gray-200 cursor-pointer"
              >
                {prediction.description}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Category Selector */}
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

      {/* Search Button */}
      <button
        className="bg-neutral-600 font-bold hover:bg-neutral-500 p-2 w-20 rounded-lg text-white"
        onClick={getItems}
      >
        Search
      </button>
    </div>
  );
};

export default SearchBox;
