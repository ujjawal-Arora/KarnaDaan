import mongoose from 'mongoose';
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
    profile_pic:{
        type:String,
    },
    posts:[
        {
            type:mongoose.Types.ObjectId,
            ref:'Post'
        }
       ],
       requests:[
        {
            type:mongoose.Types.ObjectId,
            ref:'Request'
        }
       ],

});
const User=mongoose.model('User',UserSchema);
export default User;