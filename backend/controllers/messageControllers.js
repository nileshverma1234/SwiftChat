import Conversation from "../models/conversationModel.js";


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

        
    } catch (error) {
        res.status(401).json({error:error.message});
    }
}

export default sendMessage;