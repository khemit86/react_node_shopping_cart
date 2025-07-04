import { generateToken } from '../utils/generateToken.js';
import User from '../models/userModel.js';


const authUser = async (req,res)=>{
    const {email, password } = req.body;
    
    const user = await User.findOne({email});

    if(user && (await user.matchPassword(password))){
       generateToken(res,user._id);
       res.json({
             _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
       })

    }else{
        res.status(401);
        throw new Error("Invalid login details")
    }

}


const registerUser = async (req,res)=>{
    const {name, email, password} = req.body;
    const userExists = await User.findOne({email});
    if(userExists){
        res.status(400);
        throw new Error('User already exists.');
    }

    const user = await User.create({name,email,password});
    if(user){

        generateToken(res,user._id);
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        })    
    }else{
        res.status(400);
        throw new Error('Invalid user data')
    }


}

const getUserProfile = async(req,res)=>{
    const user = await User.findById(req.user._id);
    if(user){
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,

        })
    }else{
        res.status(201).json({message:'User not exists'})

    }

}

const updateUserProfile = async(req,res)=>{
    const user = await User.findById(req.user._id);
    if(user){
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email
        if(req.body.password){
                user.email = req.body.password 
        }
        const updatedUser =  await user.save();
        res.json({message:"User updated ssuccessfully"})
          
    }else{
        res.status(400).json({message:"User not exists"})

    }
   
}

const logoutUser = (req,res)=>{
    res.clearCookie('jwt');
    res.status(201).json({message:"Logged out successfully"})
}


const getUsers = async (req,res)=>{
    const users = await User.find({})
    res.json(users);
}    


const getUserById = (req,res)=>{
    
    const user =     User.findById(req.params.id).select('-password');
    if(user){
        res.json(user)
    }else{
        res.status(404);
       throw new Error('User not found')
    }

}


export { authUser, registerUser, logoutUser, getUserProfile, updateUserProfile, getUsers,getUserById}