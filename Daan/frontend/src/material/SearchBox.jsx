

import React, { useState, useRef, useCallback } from 'react';
import { LoadScript, Autocomplete } from '@react-google-maps/api';
import axios from 'axios';

const libraries = ['places'];

const SearchBox = () => {
  const [address, setAddress] = useState('');
  const [location, setLocation] = useState(null);
  const [category, setCategory] = useState('');
  const [properties, setProperties] = useState([]);
  const autocompleteRef = useRef(null);

  const handleLoad = useCallback((autocomplete) => {
    autocompleteRef.current = autocomplete;
  }, []);

  const handlePlaceChanged = useCallback(() => {
    if (autocompleteRef.current !== null) {
      const place = autocompleteRef.current.getPlace();
      setAddress(place.formatted_address || '');
      setLocation(place.geometry.location);
    } else {
      console.log('Autocomplete is not loaded yet!');
    }
  }, []);

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  const fetchProperties = async () => {
    console.log("hello")
  //   if (location && category) {
  //     try {
  //       const response = await axios.post('http://localhost:5000/api/properties', {
  //         lat: location.lat(),
  //         lng: location.lng(),
  //         category: category,
  //       });

  //       setProperties(response.data);
  //     } catch (error) {
  //       console.error('Error fetching properties:', error);
  //     }
  //   }
  };

  return (
    <div className='flex gap-2 '>
      <LoadScript googleMapsApiKey="AIzaSyB8M0ICKS8zNxJxJD42Xq_yAkaZBc5EJAM" libraries={libraries}>
        <Autocomplete onLoad={handleLoad} onPlaceChanged={handlePlaceChanged}>
          <input
            type="text"
            placeholder="Search a place"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className='border border-amber-950  h-10 w-80'
          />
        </Autocomplete>
      </LoadScript>

      <select className='w-52 border border-amber-950 px-7 rounded ' 
      onChange={handleCategoryChange} value={category}>
        <option value="">Select Category</option>
        <option value="restaurant">Restaurant</option>
        <option value="hospital">Hospital</option>
        <option value="school">School</option>
        <option value="store">Store</option>
        {/* Add more categories as needed */}
      </select>

      <button 
      className='bg-amber-950 p-2  w-20 rounded-lg text-white font-semibold '
      onClick={fetchProperties}>Search</button>

      {/* <div>
        {properties.length > 0 ? (
          <ul>
            {properties.map((property) => (
              <li key={property.id}>{property.name}</li>
            ))}
          </ul>
        ) : (
          <p>No properties found for the selected category at this location.</p>
        )}
      </div> */}
    </div>
  );
};

export default SearchBox;
