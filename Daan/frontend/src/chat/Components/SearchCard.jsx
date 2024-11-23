import React from 'react';
import { FaCircle } from 'react-icons/fa'; // Import a circle icon to represent the green dot
import Avatar from './Avator';
import { useNavigate } from 'react-router-dom';

function SearchCard({ avatar, name, message, date, count, userId }) {
  const navigate = useNavigate();

  const openChat = () => {
    console.log("Opening chat with user ID:", userId);
    navigate(`/chat/${userId}`);
  };

  return (
    <div
      onClick={openChat} // Set up onClick properly
      className="flex items-center hover:bg-zinc-300 p-4 border-b shadow border-gray-300 gap-4 rounded-md cursor-pointer"
    >
      <div>
        <Avatar name={name} width={60} height={60} imageUrl={avatar} />
      </div>
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <div>
            <div className="font-semibold font-sans text-lg">{name}</div>
            <div className="text-gray-600">{message}</div>
          </div>
          <div className="flex flex-col items-end text-gray-500 text-sm">
            <span>{date}</span>
            {/* <div
              className={`text-white bg-orange-600 rounded-full flex justify-center items-center ${
                count <= 9
                  ? "pr-[0.5rem] pl-[0.5rem] p-[0.1rem]"
                  : count <= 99
                  ? "pr-[0.3rem] pl-[0.3rem] p-[0.2rem]"
                  : "pr-[0.3rem] pl-[0.3rem] p-[0.1rem]"
              }`}
            >
              <h1 className="rounded-full">{count <= 99 ? count : "99+"}</h1>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchCard;
