import  express from 'express';
import {Server} from 'socket.io';
import getUserDetailsFromToken from '../helper/getUserDetailFromToken.js';
import http from 'http';
import User from '../models/userModel.js';
import {ConversationModel} from '../models/chatModel.js';
const app=express();

const server=http.createServer(app);

 const io=new Server(server,{
    cors:{
        origin: 'http://localhost:5173',
        credentials :true,
    }
 });

 //online User

 const onlineUser = new Set();

 io.on('connection',async(socket)=>{
    console.log('a user connected',socket.id);
    const token=socket.handshake.auth.token;
  const user=await getUserDetailsFromToken(token);
  socket.join(user?._id);
 if (user && user._id) {
    socket.join(user._id.toString());

    onlineUser.add(user._id.toString());

    io.emit('onlineUser', Array.from(onlineUser));
    socket.on('message-page',async(userId)=>{
      console.log(userId)
      const user =await User.findById(userId);
      console.log(user)
      const payload={
         id:user._id,
         firstName:user.firstName,
         lastName:user.lastName,
         username:user.userName,
         profile_pic:user?.profile_pic,
         online:onlineUser.has(userId),
     }

     console.log("payload",payload)
     socket.emit('user-data',payload);

    });

    socket.on('new-message',async(data)=>{
      console.log("new-message",data);

      const conversation=await ConversationModel.findOne({
         "$or":[
            {sender:data?.sender,receiver:data?.receiver},
            {sender:data?.receiver,receiver:data?.sender}

         ]
      })
      //if not conversation

      if(!conversation){
         const createConversation=await  ConversationModel({
          sender:data?.sender,
          receiver:data?.receiver,
          // messages:[data]
         })
         conversation=await createConversation.save();
  }
  console.log("conversation",conversation);
   const message=await MessageModel({
   text:data?.text,
   msgByUserId:data?.msgByUserId,
   // sender:data?.sender,
   // receiver:data?.receiver,
   // conversationId:conversation._id
})
     const save_message=await message.save();


    })

 }

    socket.on('disconnect',()=>{
        console.log('a user disconnected');
    })
 })

 export {app,server};