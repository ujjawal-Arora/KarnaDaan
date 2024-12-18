import React, { useState, useRef } from "react";
import axios from "axios";

function LocationSearch({ onLocationChange }) {
  const autocompleteRef = useRef(null);
  const wrapperRef = useRef(null);
  const [predictions, setPredictions] = useState([]);
  const [location, setLocation] = useState("");
  const [address, setAddress] = useState("");

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
    const cleanedLocation = place.description.split(",")[0].trim();
    setAddress(place.description);
    setLocation(cleanedLocation);
    setPredictions([]);

    if (onLocationChange) {
      onLocationChange(cleanedLocation); // Notify the parent with the cleaned location
    }

    if (autocompleteRef.current) {
      autocompleteRef.current.blur();
    }
  };

  return (
    <div>
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
    </div>
  );
}

export default LocationSearch;
