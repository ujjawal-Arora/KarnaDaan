import React, { useState } from 'react';
import Appbar from '../Components/Appbar';
import FrontCards from '../material/FrontCards';
import RequestCards from '../material/RequestCards';

function Home() {
  const [selectedPage, setSelectedPage] = useState('FrontCards'); // Default to 'FrontCards'

  return (
    <div className='bg-gray-200'>
      {/* Appbar at the top */}
      <div>
        <Appbar />
      </div>

      <div className="fixed top-[64px] mt-2 w-full space-x-4 bg-gray-200 ">
  <button 
    className={`p-2 w-50 rounded-lg mt-2 font-semibold transition-colors border duration-300 ${selectedPage === 'FrontCards' ? 'text-orange-600 border-black' : 'bg-gray-200'}`}
    onClick={() => setSelectedPage('FrontCards')}
  >
    Show Front Cards
  </button>

  <button 
    className={`p-2 w-50 rounded-lg font-semibold transition-colors duration-300 ${selectedPage === 'RequestCards' ? 'text-orange-600 border border-black' : 'bg-gray-200 text-black'}`}
    onClick={() => setSelectedPage('RequestCards')}
  >
    Show Request Cards
  </button>
</div>

      {/* Scrollable container for the cards */}
      <div className="pt-[100px]  overflow-y-auto">
        {selectedPage === 'FrontCards' ? <FrontCards /> : <RequestCards />}
      </div>
    </div>
  );
}

export default Home;
