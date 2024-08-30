import jwt from 'jsonwebtoken';
const {JWT_SECRET}=process.env;
import storeOtp from '../Session/storeOtp.js';
import sendMail from '../Controller/sendOtpMail.js';
import { sendWelcomeMail } from '../Controller/sendWelcomeMail.js';
import User from '../models/userModel.js';
const  verifyOtpWithToken = async (req,res)=>{
  const {otp}=req.body;
  
  try {
        if(!otp){
          return res.status(400).json({error:"OTP is required"});
      }
      console.log("sessionOtp",req.session.otp);
      console.log("Otp",otp);
      const userId=req.session.userId;
      console.log("userId at verify",userId);

      if(req.session.otp!=otp){
        return res.status(401).json({error:"Invalid OTP"});
      }
      // const userId=req.session.userId;

  const token=jwt.sign({
    userId
   },JWT_SECRET);
 
 
    res.cookie("token", token, 
       { 
       httpOnly: false,
       expires: new Date(Date.now() + 7200000),
 
       }
    );
 
 
   res.setHeader('Authorization',`Bearer ${token}`);
const userName=req.session.userName;
sendWelcomeMail({email:userName});
 
    return res.status(200).json({
     userId,
     token:token,
    })
 
    }
    catch(error){
        console.log(error);
        return res.status(500).json({ error: 'An error occurred while verifying OTP' });
    }
}

const resendOtp = async(req,res)=>{
   try {
    const userId=req.session.userId;
    if(!userId){
      return res.status(400).json({error:"User ID is required"});
    }
    const newOtp = Math.floor(100000 + Math.random() * 900000);
    storeOtp({ req: req, otp: newOtp });
    const userName=req.session.userName;
    if(!userName){
      return res.status(400).json({error:"User Name is required"});
    }
    await sendMail({ userName: userName, otp: newOtp });
    return res.status(200).json({ message: "OTP resent successfully" });
    
   } catch (error) {
    console.error("Error resending OTP:", error);
        return res.status(500).json({ error: "An error occurred while resending OTP" });
   }
}
const sendotp = async (req, res) => {
  try {
    const { userName } = req.body;

    if (!userName) {
      return res.status(400).json({ error: "User Name is required" });
    }

    const user = await User.findOne({ userName });

    if (!user) {
      return res.status(400).json({ error: "User does not exist" });
    }

    const userId = user._id;
    console.log("User ID:", userId);
    req.session.userId = userId;

    const newOtp = Math.floor(100000 + Math.random() * 900000);
    storeOtp({ req, otp: newOtp });
    
    await sendMail({ userName, otp: newOtp });

    return res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error("Error sending OTP:", error);
    return res.status(500).json({ error: "An error occurred while sending OTP" });
  }
};


const  verifyOtp = async (req,res)=>{
  const {otp}=req.body;
  try {
        if(!otp){
          return res.status(400).json({error:"OTP is required"});
      }
      console.log("sessionOtp",req.session.otp);
      if(req.session.otp!=otp){
        return res.status(401).json({error:"Invalid OTP"});
      }
      // const userId=req.session.userId;
     return res.status(200).json({
   message:"OTP verified successfully"
    })
    }
    catch(error){
        console.log(error);
        return res.status(500).json({ error: 'An error occurred while verifying OTP' });
    }
}

export {verifyOtpWithToken,resendOtp,sendotp,verifyOtp};