import React, { useEffect, useState } from "react";
import SearchBox from "./SearchBox";
import SearchCard from "./SearchCard";
import { IoChatbubbleEllipses } from "react-icons/io5";
import { useSelector } from "react-redux";
import { FaUserPlus } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { NavLink } from "react-router-dom";
import Avatar from "../Components/Avator";
import SearchUser from "./SearchUser";

function Sidebar() {
  const [openSearchUser, setOpenSearchUser] = useState(false);
  const user = useSelector((state) => state.auth);
  const [allUsers, setAllUsers] = useState([]);
  const socketConnection = user?.socketConnections;
  const [searchResults, setSearchResults] = useState([]);
  const [searchdata, setSearchData] = useState([]);

  useEffect(() => {
    if (socketConnection) {
      socketConnection.emit("sidebar", user._id);

      socketConnection.on("conversation", (conversation) => {
        const conversationData = conversation.map((convUser) => {
          const userDetails =
            convUser?.sender?._id === user._id
              ? convUser?.receiver
              : convUser?.sender;

          // Debugging logs to identify missing user details
          if (!userDetails?._id) {
            console.warn("Missing userDetails for convUser:", convUser);
          }

          return {
            ...convUser,
            userDetails: userDetails || {
              firstName: "Unknown User",
              profile_pic: "/img.jpg",
            }, // Fallback details
          };
        });
        const userDetailsArray = conversationData.map((convUser) => convUser.userDetails);
        setSearchData(userDetailsArray);

        setAllUsers(conversationData);
      });
    }
  }, [socketConnection, user]);

  return (
    <div className="w-full h-full grid grid-cols-[48px,1fr] bg-slate-50">
      <div className="bg-white w-12 h-[97vh] z-50 rounded-tr-lg rounded-br-lg py-5 text-slate-600 flex flex-col justify-between">
        <div>
          <NavLink
            to="/chat"
            className={({ isActive }) =>
              `w-12 h-12 text-slate-900 flex justify-center items-center cursor-pointer hover:bg-gray-800 rounded ${
                isActive ? "border border-gray-600" : ""
              }`
            }
            title="chat"
          >
            <IoChatbubbleEllipses size={20} />
          </NavLink>

          <button
            onClick={() => setOpenSearchUser(true)}
            className="w-12 h-12 text-black flex justify-center items-center cursor-pointer hover:border border-gray-600 rounded mt-2"
          >
            {/* <FaUserPlus size={20} /> */}
          </button>
        </div>

        <div className="flex flex-col items-center">
          <Avatar
            width={40}
            height={40}
            imageUrl={user.profile_pic}
            name={user.name}
          />
          <button
            title="logout"
            className="w-12 h-12 mt-2 flex justify-center items-center cursor-pointer hover:border border-gray-500 rounded"
          >
            <BiLogOut size={20} />
          </button>
        </div>
      </div>

      {/* Main Sidebar content */}
      <div className="w-[50vh] fixed h-screen p-4">
        {/* Fixed SearchBox */}
        <div className="fixed top-0 left-[5vh] w-[45vh] border-r-2 border-zinc-900 shadow-l bg-zinc-800 z-20 p-4">
          <SearchBox setSearchResults={setSearchResults} data={searchdata} />
        </div>

     <div className="mt-[4rem] mb-5 h-[calc(100vh-7rem)] w-[43vh] overflow-y-auto custom-scrollbar z-10 ml-[5vh]">
  {(searchResults.length > 0 || allUsers.length > 0) ? (
    (searchResults.length > 0 ? searchResults : allUsers).map((user) => {
      const userDetails = user.userDetails || user; // Use user object directly if userDetails is not present
      return (
        <SearchCard
          key={userDetails?._id || user._id}
          avatar={userDetails?.profile_pic}
          name={userDetails?.firstName || "Unknown User"}
          message={user?.lastMsg?.text || ""}
          date={
            user?.lastMsg?.createdAt
              ? new Date(user.lastMsg.createdAt).toLocaleDateString()
              : ""
          }
          userId={userDetails?._id || user._id}
        />
      );
    })
  ) : (
    <div className="text-center flex-col justify-center mt-5 text-gray-500">No conversation yet</div>
  )}
</div>


      </div>

      {openSearchUser && (
        <SearchUser onClose={() => setOpenSearchUser(false)} />
      )}
    </div>
  );
}

export default Sidebar;
