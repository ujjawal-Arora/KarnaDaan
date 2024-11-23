import React, { useState, useEffect,useRef } from 'react';
import { FaAngleLeft } from "react-icons/fa6";
import { HiDotsVertical } from "react-icons/hi";
import { FaImage, FaVideo, FaPlus } from "react-icons/fa6";
import { IoMdSend } from "react-icons/io";
import { useDispatch, useSelector } from 'react-redux';
import Avatar from '../Components/Avator';
import { Link, useParams } from 'react-router-dom';
import img from '/img.jpg';
import moment from 'moment';

function Message() {
  const params = useParams();
  const [openImageVideoUpload, setOpenImageVideoUpload] = useState(false);
  const user = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [dataSet, setData] = useState({
    firstName: "",
    lastName: "",
    profile_pic: "",
    online: false,
    id: "",
  });
  const [message, setMessage] = useState("");
  const [allMessage, setAllMessage] = useState([]);
  const currentMessage = useRef(null);

  const socketConnection = user?.socketConnections;

  useEffect(() => {
    if (socketConnection) {
      // Emit message-page event
      socketConnection.emit('message-page', params.userId);

      // Set up event listeners
      socketConnection.on('user-data', (data) => setData(data));
      socketConnection.on('message', (data) => setAllMessage(Array.isArray(data) ? data : []));

      // Clean up event listeners on component unmount
      return () => {
        socketConnection.off('user-data');
        socketConnection.off('message');
      };
    }
  }, [socketConnection, params?.userId, user]);

  const handleOnChange = (e) => setMessage(e.target.value);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message && socketConnection) {
      socketConnection.emit('new-message', {
        sender: user?._id,
        receiver: params.userId,
        text: message,
        msgByUserId: user?._id,
      });
      setMessage("");
    }
  };

  useEffect(() => {
    if (currentMessage.current) {
      currentMessage.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [allMessage]);
  
  if(dataSet.online){
     localStorage.setItem('online', dataSet.online)
  }

  return (
    <div className="flex flex-col text-white">
      {/* Header */}
      <header className="sticky top-0 h-[83.5px] bg-zinc-800 z-20 flex justify-between items-center px-4">
        <div className="flex items-center gap-4">
          <Link to="/" className="lg:hidden">
            <FaAngleLeft size={25} />
          </Link>
          <div>
            <Avatar width={50} height={50} imageUrl={dataSet.profile_pic || img} />
          </div>
          <div>
            <h3 className="font-semibold text-white text-xl my-0">
              {dataSet.firstName} {dataSet.lastName}
            </h3>
            <p className="text-sm text-slate-400">
              {dataSet.online ? (
                <span className="text-green-500 mt-1 text-lg">online</span>
              ) : (
                "offline"
              )}
            </p>
          </div>
        </div>
        <button className="cursor-pointer hover:text-primary">
          <HiDotsVertical className="text-xl" />
        </button>
      </header>

      {/* Mid Part */}
      <div className="flex-grow h-[calc(98vh-154px)] overflow-y-auto custom-scrollbar bg-slate-200 bg-opacity-50 p-4">
        {allMessage.map((msg, index) => (
          <div
            key={index}
            className={`p-1 font-sans text-lg mt-3 py-1 rounded text-black w-fit max-w-[280px] md:max-w-sm lg:max-w-md ${
              user._id === msg?.msgByUserId ? "ml-auto bg-orange-300 " : "bg-white"
            }`}
          >
            <p className="px-2">{msg.text}</p>
            <p className="text-xs ml-auto w-fit">
              {moment(msg.createdAt).format("hh:mm")}
            </p>
          </div>
        ))}
        <div ref={currentMessage}></div>
      </div>

      {/* Bottom Part */}
      <section className="sticky bottom-0 mr-1 h-[64px] bg-zinc-800 flex items-center px-4">
        <div className="relative">
          <button
            onClick={() => setOpenImageVideoUpload(!openImageVideoUpload)}
            className="flex justify-center items-center w-11 h-11 rounded-full hover:bg-primary hover:text-white"
          >
            <FaPlus size={20} />
          </button>
          
        </div>
        <form className="h-full w-full flex gap-2" onSubmit={handleSendMessage}>
          <input
            type="text"
            placeholder="Type your message..."
            className="py-1 px-4 outline-none bg-transparent w-full h-full"
            value={message}
            onChange={handleOnChange}
          />
          <button type="submit" className="text-white hover:text-secondary">
            <IoMdSend size={28} />
          </button>
        </form>
      </section>
    </div>
  );
}

export default Message;
