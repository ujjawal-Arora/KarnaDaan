import jwt from 'jsonwebtoken';
const {JWT_SECRET}=process.env;
const  verifyOtp = async (req,res)=>{
  const {otp}=req.body;
  
  try {
        if(!otp){
          return res.status(400).json({error:"OTP is required"});
      }
      console.log("sessionOtp",req.session.otp);
      console.log("req at verify",req.session);
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
       httpOnly: true,
       sameSite: 'None',
       expires: new Date(Date.now() + 7200000),
       secure: true, // Set to true if using HTTPS
 
       }
    );
 
 
   res.setHeader('Authorization',`Bearer ${token}`);
//  res.setHeader('Authorization', token);
 
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
export {verifyOtp};