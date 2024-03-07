import User from '../models/userModel.js';
import bcrypt from 'bcryptjs';
import genAndSetToken from '../utils/generateToken.js';

const signupUser =async (req,res)=>{
    try {
        const {fullname, username, email, password, confirmPassword, gender} = req.body;
        var profilePic=req.body.profilePic;
        

        if(!fullname || !username || !email || !password || !confirmPassword || !gender){
            return res.status(401).json({error:"Please provide all feilds"});
        }

        if(password!==confirmPassword){
            return res.status(400).json({error:"passwords do not match"});
        }

        const mail =await User.findOne({email});
        if(mail){
            return res.status(400).json({error:"email already exist"});
        }

        const user =await User.findOne({userName:username}); 

        if(user) {
            return res.status(400).json({error:"username already exist"});
        }

        const salt= await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);

        const boypic=`https://avatar.iran.liara.run/public/boy?username=${fullname.trim().replace(' ',"%20")}`;
        const girlpic=`https://avatar.iran.liara.run/public/girl?username=${fullname.trim().replace(' ',"%20")}`;

        if(profilePic===''){
            if(gender === 'male'){
                profilePic=boypic;
            }
            else{
                profilePic=girlpic;
            }
        }

        const newUser = await User.create({
            fullName:fullname,
            userName:username,
            email,
            password:hashedPassword,
            gender,
            profilepic:profilePic
        });

        if(newUser){

            // generate JWT token
            genAndSetToken(newUser._id,res);
            await newUser.save();
            return res.status(201).json({
                fullname:newUser.fullName,
                userName:newUser.userName,
                email:newUser.email,
                gender:newUser.gender,
                profilepic:newUser.profilepic
            });
        }
        else{
            return res.status(400).json({error:"Invalid user Data"});
        }

        
    } catch (err) {
        return res.status(201).json({error:err.message});
    }
}


const loginUser = async (req,res)=>{
    try {
        const {value, password}= req.body;
        if(!value || !password){
            return res.status(400).json({error:"Please provide all values"});
        }
        const email = await User.findOne({email:value});
        const uname = await User.findOne({userName:value});
        if (email || uname) {
            const user = email === null ? uname : email;
            const isPasswordCorrect = await bcrypt.compare(password, user.password);
            if(!isPasswordCorrect){
                return res.status(400).json({error:"Invalid Password"});
            }
            genAndSetToken(user._id,res);

            
            return res.status(201).json({
                _id:user._id,
                fullName:user.fullName,
                userName:user.userName,
                email:user.email,
                profilePic:user.profilepic
            });
        } 
        
        return res.status(400).json({error:`user with ${value} not found`});
        
    } catch (err) {
        return res.status(401).json({error:err.message});
    }
    
    
}

const logoutUser = (req,res)=>{
    try {
        res.cookie("jwt","",{maxAge:0});
        res.status(201).json({massage:"Logout Sucessfully"});
    } catch (err) {
        return res.status(401).json({error:err.message});
    }
    res.send("Logout Done");
    console.log("Logout Done");
}

export {loginUser, signupUser, logoutUser} ;