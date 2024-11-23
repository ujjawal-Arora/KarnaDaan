import express from 'express';
import { Server } from 'socket.io';
import getUserDetailsFromToken from '../helper/getUserDetailFromToken.js';
import http from 'http';
import User from '../models/userModel.js';
import { ConversationModel, MessageModel } from '../models/chatModel.js';
import getConversation from '../helper/getConversation.js';

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173',
        credentials: true,
    }
});

const onlineUsers = new Set();

io.on('connection', async (socket) => {
    console.log('User connected:', socket.id);

    const token = socket.handshake.auth.token;
    const user = await getUserDetailsFromToken(token);

    if (!user || !user._id) {
        socket.disconnect();
        return;
    }

    const userId = user._id.toString();
    socket.join(userId);
    onlineUsers.add(userId);

    io.emit('onlineUser', Array.from(onlineUsers));

    socket.on('message-page', async (targetUserId) => {
        const targetUser = await User.findById(targetUserId);
        if (targetUser) {
            const payload = {
                id: targetUser._id,
                firstName: targetUser.firstName,
                lastName: targetUser.lastName,
                username: targetUser.userName,
                profile_pic: targetUser.profile_pic,
                online: onlineUsers.has(targetUserId),
            };

            socket.emit('user-data', payload);

            const conversation = await ConversationModel.findOne({
                $or: [
                    { sender: userId, receiver: targetUserId },
                    { sender: targetUserId, receiver: userId }
                ]
            }).populate('messages').sort({ updatedAt: -1 });

            socket.emit('message', conversation?.messages || []);
        }
    });

    socket.on('new-message', async (data) => {
        let conversation = await ConversationModel.findOne({
            $or: [
                { sender: data.sender, receiver: data.receiver },
                { sender: data.receiver, receiver: data.sender }
            ]
        });

        if (!conversation) {
            conversation = await new ConversationModel({
                sender: data.sender,
                receiver: data.receiver,
            }).save();
        }

        const message = await new MessageModel({
            text: data.text,
            msgByUserId: data.msgByUserId,
            sender: data.sender,
            receiver: data.receiver,
            conversationId: conversation._id
        }).save();

        await ConversationModel.updateOne({ _id: conversation._id }, {
            $push: { messages: message._id }
        });

        const updatedConversation = await ConversationModel.findOne({
            _id: conversation._id
        }).populate('messages');

        io.to(data.sender).emit('message', updatedConversation.messages || []);
        io.to(data.receiver).emit('message', updatedConversation.messages || []);

        const senderConversations = await getConversation(data.sender);
        const receiverConversations = await getConversation(data.receiver);

        io.to(data.sender).emit('conversation', senderConversations);
        io.to(data.receiver).emit('conversation', receiverConversations);
    });

    socket.on('sidebar', async (currentUserId) => {
        const conversations = await getConversation(currentUserId);
        socket.emit('conversation', conversations);
    });

    socket.on('disconnect', () => {
        onlineUsers.delete(userId);
        io.emit('onlineUser', Array.from(onlineUsers));
        console.log('User disconnected:', socket.id);
    });
});

export { app, server };
