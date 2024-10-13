import  express from 'express';
import {Server} from 'socket.io';
import getUserDetailsFromToken from '../helper/getUserDetailFromToken.js';
import http from 'http';
import User from '../models/userModel.js';
import {ConversationModel,MessageModel} from '../models/chatModel.js';

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
     
     const getConversationMessage = await ConversationModel.findOne({
      "$or" : [
          { sender : user?._id, receiver : userId },
          { sender : userId, receiver :  user?._id}
      ]
  }).populate('messages').sort({ updatedAt : -1 })

  socket.emit('message',getConversationMessage?.messages || [])

    });

    socket.on('new-message',async(data)=>{
    console.log("new-message",data);

      let conversation=await ConversationModel.findOne({
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
         //  messages:[data]
         })
         conversation=await createConversation.save();
  }

  
  console.log("conversation",conversation);
   const message=await MessageModel({
   text:data?.text,
   msgByUserId:data?.msgByUserId,
   sender:data?.sender,
   receiver:data?.receiver,
   conversationId:conversation._id
})

     const save_message=await message.save();

     const updateOrappendMessage=await ConversationModel.updateOne({_id:conversation?._id},{
      $push:{messages:save_message?._id}
     });

     const getConversation=await ConversationModel.findOne({
       "$or":[
         {sender: data?.sender,receiver:data?.receiver},
         {sender:data?.receiver,receiver:data?.sender}
       ]
     }).populate('messages').sort({updatedAt:-1})//will spread the message column and show me all the messages
   //   console.log("getConversation",getConversation)

   //   io.to(user?._id).emit('message',getConversation);

     io.to(data?.sender).emit('message',getConversation.messages||[]);
     io.to(data?.receiver).emit('message',getConversation.messages||[]);

     //io.to is Used to send the data to the particular room
   //   const conversationSender = await getConversation(data?.sender)
   //   const conversationReceiver = await getConversation(data?.receiver)

   //   io.to(data?.sender).emit('conversation',conversationSender)
   //   io.to(data?.receiver).emit('conversation',conversationReceiver)
     console.log("Sending message to sender:", data?.sender);
     console.log("Sending message to receiver:", data?.receiver);
     



console.log(save_message)

    })

 }

    socket.on('disconnect',()=>{
        console.log('a user disconnected');
    })
 })

 export {app,server};