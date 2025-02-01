import mongoose  from "mongoose";
import {Schema} from "mongoose"

const UserSchema = new Schema({
    name : {
        type : String,
        required : true,
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type:String,
        required:true,
    },
    cartData : {
        type : Object,
        default : {}
    }
},{minimize : false})

const UserModel = mongoose.models.user || mongoose.model("user",UserSchema);


export default UserModel;