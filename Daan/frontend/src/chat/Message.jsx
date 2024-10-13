import React, { useState, useEffect,useRef } from 'react';
import { FaAngleLeft } from "react-icons/fa6";
import { HiDotsVertical } from "react-icons/hi";
import { FaImage, FaVideo, FaPlus } from "react-icons/fa6";
import { IoMdSend } from "react-icons/io";
import { useSelector } from 'react-redux';
import Avatar from '../Components/Avator';
import { Link, useParams } from 'react-router-dom';
import img from '/img.jpg';
import moment from 'moment';

function Message() {
  const params = useParams();
  const openImageVideoUpload = false;
  const user = useSelector((state) => state.auth);
  
  const [dataSet, setData] = useState({
    firstName: "",
    lastName: "",
    profile_pic: "",
    online: false,
    id: "",
  });

  const [message, setMessage] = useState("");
  const [allMessage, setAllMessage] = useState([]);

  const socketConnection = user?.socketConnections;

  useEffect(() => {
    if (socketConnection) {
      socketConnection.emit('message-page', params.userId);

      socketConnection.on('user-data', (data) => {
        setData(data);
      });

      socketConnection.on('message', (data) => {
        console.log("message-page vdvcdcdc", data)
        setAllMessage(Array.isArray(data) ? data : [])  });
    }
  }, [socketConnection, params?.userId,user]);

  const handleOnChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    console.log("Sending message: ", message);

    if(message&&socketConnection){
      socketConnection.emit('new-message',{
        sender:user?._id,
        receiver:params.userId,
        text:message,
        msgByUserId:user?._id

      })
    }
    setMessage(""); 
  };
  const currentMessage = useRef(null)

  useEffect(()=>{
    if(currentMessage.current){
        currentMessage.current.scrollIntoView({behavior : 'smooth', block : 'end'})
    }
},[allMessage])
console.log("All messages",allMessage)
  return (
    <div className='flex flex-col text-white'>
      {/* Header */}
      <header className='sticky top-0 h-[83.5px] bg-zinc-800 z-20 flex justify-between items-center px-4'>
        <div className='flex items-center gap-4'>
          <Link to={"/"} className='lg:hidden'>
            <FaAngleLeft size={25} />
          </Link>
          <div>
            <Avatar width={50} height={50} imageUrl={img} />
          </div>
          <div>
            <h3 className='font-semibold text-white text-xl my-0 text-ellipsis line-clamp-1'>
              {dataSet.firstName + " " + dataSet.lastName}
            </h3>
            <p className='-my-1 text-sm'>
              {dataSet.online ? (
                <span className='text-green-500 mt-1 text-lg'>online</span>
              ) : (
                <span className='text-slate-400 mt-1'>offline</span>
              )}
            </p>
          </div>
        </div>

        <div>
          <button className='cursor-pointer hover:text-primary'>
            <HiDotsVertical className='text-xl' />
          </button>
        </div>
      </header>

      {/* Mid Part */}
      <div className='flex-grow h-[calc(98vh-154px)] text-black overflow-y-auto custom-scrollbar bg-slate-200 bg-opacity-50 p-4' ref={currentMessage}>
      {
                      allMessage.map((msg,index)=>{
                        return(
                          <div className={` p-1 py-1 rounded w-fit max-w-[280px] md:max-w-sm lg:max-w-md ${user._id === msg?.msgByUserId ? "ml-auto bg-teal-100" : "bg-white"}`}>
                          
                            <p className='px-2'>{msg.text}</p>
                            <p className='text-xs ml-auto w-fit'>{moment(msg.createdAt).format('hh:mm')}</p>
                          </div>
                        )
                      })
                    }
      </div>
      {/* Bottom Part */}
      <section className='sticky bottom-0 mr-1 h-[64px] bg-zinc-800 flex items-center px-4'>
        <div className='relative'>
          <button className='flex justify-center items-center w-11 h-11 rounded-full hover:bg-primary hover:text-white'>
            <FaPlus size={20} />
          </button>

          {openImageVideoUpload && (
            <div className='bg-white shadow rounded absolute w-36 p-2'>
              <form>
                <label htmlFor='uploadImage' className='flex items-center p-2 px-3 gap-3 hover:bg-slate-200 cursor-pointer'>
                  <div className='text-primary'>
                    <FaImage size={18} />
                  </div>
                  <p>Image</p>
                </label>
                <label htmlFor='uploadVideo' className='flex items-center p-2 px-3 gap-3 hover:bg-slate-200 cursor-pointer'>
                  <div className='text-purple-500'>
                    <FaVideo size={18} />
                  </div>
                  <p>Video</p>
                </label>
                <input type='file' id='uploadImage' className='hidden' />
                <input type='file' id='uploadVideo' className='hidden' />
              </form>
            </div>
          )}
        </div>

        {/* Input Box */}
        <form className='h-full w-full flex gap-2' onSubmit={handleSendMessage}>
          <input
            type='text'
            placeholder='Type your message...'
            className='py-1 px-4 outline-none bg-transparent w-full h-full'
            value={message}
            onChange={handleOnChange}
          />
          <button type='submit' className='text-white hover:text-secondary'>
            <IoMdSend size={28} />
          </button>
        </form>
      </section>
    </div>
  );
}

export default Message;