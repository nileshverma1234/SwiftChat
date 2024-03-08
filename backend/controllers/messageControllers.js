import Conversation from "../models/conversationModel.js";
import Message from '../models/messageModel.js';

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

        res.status(201).json(newMessage);
        
    } catch (error) {
        res.status(401).json({error:error.message});
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
            res.status(200).json([]);
        }

        const message= con.messages;
        res.status(201).json(message);
    } catch (error) {
        res.status(401).json({error:error});
    }
}

export  {sendMessage, getMessage};