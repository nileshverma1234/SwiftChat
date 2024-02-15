import User from '../models/userModel.js';

const loginUser = async (req,res)=>{
    
    
}

const signupUser =async (req,res)=>{
    try {
        const {fullname, username, email, password, confirmPassword, gender} = req.body;
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
        // Password hashing

        const boypic=`https://avatar.iran.liara.run/public/boy?username=${fullname}`;
        const girlpic=`https://avatar.iran.liara.run/public/girl?username=${fullname}`;

        const newUser = await User.create({
            fullName:fullname,
            userName:username,
            email,
            password,
            gender,
            profilepic: gender === 'male' ? boypic : girlpic
        });

        await newUser.save();
        return res.status(201).json(newUser);
        
    } catch (err) {
        return res.status(201).json({error:err.message});
    }
}

const logoutUser = (req,res)=>{
    res.send("Logout Done");
    console.log("Logout Done");
}

export {loginUser, signupUser, logoutUser} ;