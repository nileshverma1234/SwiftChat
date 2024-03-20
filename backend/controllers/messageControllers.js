import Conversation from "../models/conversationModel.js";
import Message from '../models/messageModel.js';
import { getReceiverSocketId, io } from "../socket/socket.js";

const sendMessage = async(req,res)=>{
    try {
        const {message} = req.body;
        const {id} = req.params; 
        const senderId= req.user._id;

        let con = await Conversation.findOne({
            participants:{$all:[senderId,id]},
        });

        if(!con){
            con= await Conversation.create({
                participants:[senderId,id]
            });
        }

        const newMessage = await Message.create({
            senderId,
            reciverId:id,
            message
        });

        if(newMessage){
            con.messages.push(newMessage._id);
            await con.save();
        }

        await Promise.all([con.save(), newMessage.save()]);

        const receiverSocketId = getReceiverSocketId(id);
		if (receiverSocketId) {
			// io.to(<socket_id>).emit() used to send events to specific client
			io.to(receiverSocketId).emit("newMessage", newMessage);
		}

        return res.status(201).json(newMessage);
        
    } catch (error) {
        return res.status(401).json({error:error.message});
    }
}

const getMessage = async(req,res)=>{
    try {
        const{id} = req.params;
        const senderId = req.user._id;

        const con= await Conversation.findOne({
            participants:{$all:[senderId,id]}
        }).populate("messages");

        if(!con){
            return res.status(200).json([]);
        }

        const message= con.messages;
        return res.status(201).json(message);
    } catch (error) {
        return res.status(401).json({error:error});
    }
}

export  {sendMessage, getMessage};