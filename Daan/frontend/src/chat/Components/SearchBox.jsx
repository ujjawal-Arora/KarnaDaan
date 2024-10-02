import React from 'react';
import { FaSearch } from 'react-icons/fa'; // Import the search icon

function SearchBox() {
  return (
    <div className="flex items-center border-2  rounded-3xl  border-gray-300 p-3">
      <input
        type="text"
        placeholder="Search..."
        className="flex-grow outline-none placeholder:text-gray-200 border-none bg-transparent text-gray-100"
      />
      <FaSearch className="ml-2 text-gray-300 text-xl cursor-pointer" />
    </div>
  );
}

export default SearchBox;
