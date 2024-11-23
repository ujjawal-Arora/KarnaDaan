import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import axios from 'axios';

function SearchBox({ setSearchResults,data }) {
  const [search, setSearch] = useState("");

  const handleSearchChange = async (e) => {
    const searchValue = e.target.value;
    setSearch(searchValue);

    if (searchValue) {
      try {
        const response = await axios.post('http://localhost:3000/api/v1/chat/searchSideBar', { search: searchValue,data: data});
        setSearchResults(response.data.data);
        console.log("at search usr e",response)

      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    } else {
      setSearchResults([]); // Clear results if search is empty
    }
  };

  return (
    <div className="flex items-center border-2 rounded-3xl border-gray-300 p-3">
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={handleSearchChange}
        className="flex-grow outline-none placeholder:text-gray-200 border-none bg-transparent text-gray-100"
      />
      <FaSearch className="ml-2 text-gray-300 text-xl cursor-pointer" />
    </div>
  );
}

export default SearchBox;
