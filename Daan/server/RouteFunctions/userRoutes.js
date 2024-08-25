const {JWT_SECRET}=process.env;
import jwt from 'jsonwebtoken';
import { SignUpSchema,SigninSchema } from '../Zod/zod.js';
import User from '../models/userModel.js'


const SignUp = async (req,res)=>{
    const body=req.body;
    console.log(body);
const {success}=SignUpSchema.safeParse(body);
console.log(success);

if(!success) return res.status(400).json({error:"zod error"});
   const {userName,firstName,lastName,password}=req.body;
 
   const useAlreadyExsists=await User.findOne({
    userName:userName,
   })
   if(useAlreadyExsists){
    return res.status(400).json({error:"User name already exists"})
   }
   const user=await  User.create({
    userName,
    firstName,
    lastName,
    password,
   })
 
   return res.status(200).json({
    message:"user created",
   });

 }

 const SignIn =async  (req,res)=>{
    const body=req.body;
const {success}=SigninSchema.safeParse(body);
console.log(success);

if(!success) return res.status(400).json({error:"zod error"});
   const {userName,password}=req.body;
 
   
   const useAlreadyExsists=await User.findOne({
    userName:userName,
   })
   if(!useAlreadyExsists){
    return res.status(400).json({error:"User doesnot exists"})
   }

   if(useAlreadyExsists.password!=password){
    return res.status(400).json({error:"Password is incorrect"})
   }
   const userId=useAlreadyExsists._id;
   const token=jwt.sign({
    userId
   },JWT_SECRET);
   res.cookie("token",token);

   res.cookie("token", token, 
      { 
      httpOnly: true,
      sameSite: 'None',
      expires: new Date(Date.now() + 7200000),
      secure: true, // Set to true if using HTTPS

      }
   );


//   res.setHeader('Authorization',`Bearer ${token}`);
res.setHeader('Authorization', token);

   return res.status(200).json({
    userId,
    token:token,
   })

 }
 export {SignUp,SignIn};