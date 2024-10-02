import React from 'react';
import { Link } from 'react-router-dom';

export default function Funds() {
  return (
    <div className="flex min-h-screen bg-zinc-100 text-zinc-800">

      <div className="p-3 w-[35vw] text-black border border-zinc-300">
        <div className="mt-5 flex justify-center">
          <div className="w-40 h-40 rounded-full overflow-hidden border border-zinc-300">
            <img
              src={""}
              alt="Profile"
              className="w-full h-full object-cover object-top"
            />
          </div>
        </div>
        <h1 className='flex justify-center font-bold underline'>Hardik</h1>
        <div className='mt-20 flex flex-col items-center space-y-4'>
          <Link to="/request">
            <button className='text-zinc-800 bg-white hover:bg-orange-300 w-40 py-2 rounded-lg border border-zinc-300'>
              YOUR REQUEST
            </button>
          </Link>
          <Link to="/wishlist">
            <button className='text-zinc-800 bg-white hover:bg-orange-300 w-40 py-2 rounded-lg border border-zinc-300'>
              YOUR WISHLIST
            </button>
          </Link>
          <Link to="/funds">
            <button className='text-zinc-800 bg-white hover:bg-orange-300 w-40 py-2 rounded-lg border border-zinc-300'>
              YOUR FUNDS
            </button>
          </Link>
          <hr className="my-4 w-40 border-gray-300" />
          <button
            className='text-zinc-800 bg-white hover:bg-orange-300 w-40 border border-zinc-300 rounded-lg py-2'
          >
            LOGOUT
          </button>
        </div>

      </div>

      <div className="w-[65vw] text-zinc-800 flex flex-col border">
        <div className="p-0 h-[10vh] border-b border-zinc-300">
          <h1 className="text-center font-bold text-4xl md:text-5xl lg:text-6xl">YOUR Funds</h1>
        </div>
        <div className="flex-grow overflow-y-auto">
          <div className="p-4 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">
            {[1, 2, 3, 4, 5, 6].map((card) => (
              <div key={card} className="flex flex-col h-full border bg-white p-4 text-zinc-800 rounded-lg shadow-lg">
                <h2 className="text-xl font-bold">Card {card}</h2>
                <img
                  src="https://via.placeholder.com/150"
                  alt="Placeholder"
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                <p>Content for card</p>
                <p>More content for card {card}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
