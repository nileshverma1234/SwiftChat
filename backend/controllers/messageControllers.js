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

export default sendMessage;