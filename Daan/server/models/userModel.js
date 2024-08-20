import mongoose from 'mongoose';
import postSchema from './postModel.js';
import reqSchema from './reqModel.js'

const UserSchema= new mongoose.Schema({
    userName:{
        type:String,
        required:true,
        unique:true
    },
    firstName:{
        type:String,
        required:true,
    },
    lastName:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
        minlength:8,
    },
    post: {
        type: [postSchema], 
        default: [],
    },
    req: {
        type: [reqSchema], 
        default: [],
    },

});
const User=mongoose.model('User',UserSchema);
export default User;