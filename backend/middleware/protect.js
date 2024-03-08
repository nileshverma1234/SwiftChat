import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

const protect = async (req,res, next)=>{
    try {

        const token=req.cookies.jwt;
        
        if(!token){
            res.status(500).json({error:"No token Provided"});
        }

        const verified = jwt.verify(token,process.env.JWT_SECRET);

        if(!verified){
            res.status(401).json({error:"Unauthorized- Invalid Token"});
        }

        const user = await User.findById(verified.userID).select("-password");

        if(!user){
            res.status(404).json({error:"User Not Found"});
        }

        req.user=user;
        
        next();
    } catch (error) {
        res.status(500).json({errorMiddleware:error.message});
    }
}

export default protect;