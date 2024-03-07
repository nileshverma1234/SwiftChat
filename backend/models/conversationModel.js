import mongoose from "mongoose";

const conModel= new mongoose.Schema({
    participants:[
        {
            type:mongoose.SchemaTypes.ObjectId,
            ref:"User"
        }
    ],
    messages:[
        {
            type:mongoose.SchemaType.ObjectId,
            ref:"Message",
            default:[]
        }
    ]
},{timestamps:true});

const Converstion = mongoose.model("Conversation" , conModel);

export default Converstion;