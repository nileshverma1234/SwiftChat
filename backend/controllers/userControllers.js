import User from "../models/userModel.js";

const getUsers=async (req,res)=>{
    try {
        const loggedUser=req.user._id;
        const filteredUsers = await User.find({_id:{$ne:loggedUser}});

        return res.status(201).json(filteredUsers);
    } catch (error) {
        res.status(500).json({error:error.message});
    }
}

export default getUsers;