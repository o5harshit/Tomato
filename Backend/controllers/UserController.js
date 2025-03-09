import UserModel from "../Models/UserModel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import validator from "validator"

const CreateToken = (id) => {
    return jwt.sign({id},process.env.JWT_SERCET);
}


export const loginUser = async (req,res) => {
    const {email,password} = req.body;
    console.log(req.body);
    try{
        const user = await UserModel.findOne({email});
        if(!user){
            return res.json({success:false,message:"User Doesn`t exist"})
        }
       const isMatch =  await bcrypt.compare(password,user.password);
       if(!isMatch){
        return res.json({success:false,message:"Password is incorrect"})
       } 
       const token = CreateToken(user._id)
       return res.json({success:true,token});
    } catch(err) {
       return  res.json({success:false,message:err});
    }
}

export const registerUser = async (req,res) => {
    const {name,email,password} = req.body;
    console.log(req.body);
    try{
        const exists = await UserModel.findOne({email});
        if(exists){
            return res.json({success : true,message : "User Already Exists"});
        }
        if(!validator.isEmail(email)){
            return res.json({success : false,message : "Email is not Valid"});
        }
        if(password.length < 8){
            return res.json({success : false,message : "Please Enter Strong Password"});
        }
        // hashing user password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt);
        const User = await new UserModel({
            name : name,
            password : hashedPassword,
            email : email,
        });
       const user =  await User.save();
       const token = CreateToken(user._id)
       return res.json({success : true,token});
    } catch(err) {
        return res.json({success : false,message : err});
    }
}