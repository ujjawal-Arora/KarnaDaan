import express from 'express';
import jwt from 'jsonwebtoken';
import { SignUpSchema,SigninSchema } from '../Zod/zod.js';

import User from '../models/userModel.js'
import '../config.js'
const {JWT_SECRET}=process.env;
const router = express.Router();


 router.post('/signup',async  (req,res)=>{
    const body=req.body;
    console.log(body);
const {success}=SignUpSchema.safeParse(body);
console.log(success);

if(!success) return res.status(400).json({error:"zod error"});
   const {userName,firstName,lastName,password,confirmPassword}=req.body;
 
   if(password!=confirmPassword) return res.status(400).json({error:"Password doesnot matched"});
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
   })

 });


 router.post('/signin',async  (req,res)=>{
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
  
   const userId=useAlreadyExsists._id;
   const token=jwt.sign({
    userId
   },JWT_SECRET);
   return res.status(200).json({
    userId,
    token:token,
   })

 });


 export default  router