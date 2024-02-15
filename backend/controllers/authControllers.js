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

        const boypic=`https://avatar.iran.liara.run/public/boy?username=${fullname}`;
        const girlpic=`https://avatar.iran.liara.run/public/girl?username=${fullname}`;

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
    const {value, password}= req.body;
    return res.status(201).json(req.body);
}

const logoutUser = (req,res)=>{
    res.send("Logout Done");
    console.log("Logout Done");
}

export {loginUser, signupUser, logoutUser} ;