import React, { useState, useRef, useCallback, useEffect } from "react";
import { LoadScript, Autocomplete } from "@react-google-maps/api";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { authActions } from "../redux/Slice/slice";

const libraries = ["places"];

const SearchBox = () => {
  const dispatch = useDispatch();
  const [address, setAddress] = useState("");
  const [location, setLocation] = useState("");
  const [latlang, setLatLang] = useState({
    lat: null,
    lng: null,
  });
  const [category, setCategory] = useState("");
  const [properties, setProperties] = useState([]);
  const autocompleteRef = useRef(null);

  const handleLoad = useCallback((autocomplete) => {
    autocompleteRef.current = autocomplete;
  }, []);
  console.log("items", location, category);

  const getItems = async () => {
    console.log(location, category);
    // if (location || category) {
    dispatch(
      authActions.setSearch({
        location: location || "",
        category: category || "",
      })
    );

    localStorage.setItem(
      "search",
      JSON.stringify({
        location: location,
        category: category,
      })
    );

    console.log(localStorage.getItem("search"));
    // }
  };

  const handlePlaceChanged = useCallback(async () => {
    if (autocompleteRef.current !== null) {
      const place = autocompleteRef.current.getPlace();
      setAddress(place.formatted_address || "");

      if (place.geometry && place.geometry.location) {
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        setLatLang({ lat, lng });

        // Reverse Geocode to get the location name/address
        const fetchedAddress = await fetchCityFromLatLng(lat, lng);
        console.log("Address from Lat/Lng:", fetchedAddress);
        setLocation(fetchedAddress);
      } else {
        console.log("No geometry found for this place.");
      }
    } else {
      console.log("Autocomplete is not loaded yet!");
    }
  }, []);

  const fetchCityFromLatLng = async (lat, lng) => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyB8M0ICKS8zNxJxJD42Xq_yAkaZBc5EJAM`
      );

      if (response.data.status === "OK") {
        const addressComponents = response.data.results[0].address_components;

        // Find the component with the "locality" type (which is the city)
        const cityComponent = addressComponents.find((component) =>
          component.types.includes("locality")
        );

        if (cityComponent) {
          return cityComponent.long_name; // City name
        } else {
          return "City not found";
        }
      } else {
        throw new Error("Geocoding failed");
      }
    } catch (error) {
      console.error("Error fetching city:", error);
      return "Error fetching city";
    }
  };

  const handleCategoryChange = (e) => {
    dispatch(authActions.setSearch({ location: location, category:e.target.value}));
    setCategory(e.target.value);
  };

  return (
    <div className="flex gap-2 ">
      <LoadScript
        googleMapsApiKey="AIzaSyB8M0ICKS8zNxJxJD42Xq_yAkaZBc5EJAM"
        libraries={libraries}
      >
        <Autocomplete onLoad={handleLoad} onPlaceChanged={handlePlaceChanged}>
          <input
            type="text"
            placeholder="Search a place"
            value={address}
            onChange={(e) => {
              setAddress(e.target.value);
              if(e.target.value=="" || e.target.value==undefined){
                setLocation("");
                dispatch(authActions.setSearch({ location: "", category:category}));
              }
            }}
            className="border  bg-zinc-200 text-zinc-800 placeholder:text-zinc-800 rounded p-2 outline-none  h-10 w-80"
          />
        </Autocomplete>
      </LoadScript>

      <select
        className="w-52 border bg-zinc-200 px-7 rounded "
        onChange={handleCategoryChange}
        value={category}
      >
        <option value="">Select Category</option>
        <option value="Clothes">Clothes</option>
        <option value="Shoes">Shoes</option>
        <option value="Furniture">Furniture</option>
        <option value="Books">Books</option>
        {/* Add more categories as needed */}
      </select>

      <button
        className="bg-neutral-600 font-bold hover:bg-neutral-500 p-2  w-20 rounded-lg text-white  "
        onClick={getItems}
      >
        Search
      </button>
    </div>
  );
};

export default SearchBox;
