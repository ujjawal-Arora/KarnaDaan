import jwt from 'jsonwebtoken';
const {JWT_SECRET}=process.env;
import OTP from '../models/otpModel.js';
import sendMail from '../Controller/sendOtpMail.js';
import { sendWelcomeMail } from '../Controller/sendWelcomeMail.js';
import User from '../models/userModel.js';


const verifyOtpWithToken = async (req, res) => {
  const { otp, userName } = req.body;  

  try {
    if (!otp) {
      return res.status(400).json({ error: "OTP is required" });
    }
    if (!userName) {
      return res.status(400).json({ error: "User name is required" });
    }

    const user = await User.findOne({ userName });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const userId = user._id;
    const otpRecord = await OTP.findOne({ userId }).sort({ createdAt: -1 });
    if (!otpRecord || otpRecord.otp !== otp) {
      return res.status(401).json({ error: "Invalid OTP" });
    }
    const token = jwt.sign({ userId }, JWT_SECRET);

    await OTP.deleteOne({ _id: otpRecord._id });

    res.cookie("token", token, {
      httpOnly: false,
      expires: new Date(Date.now() + 7200000), // 2 hours
    });

    res.setHeader('Authorization', `Bearer ${token}`);

    sendWelcomeMail({ email: user.userName });

    return res.status(200).json({
      userId,
      user,
      token: token,
      message: "OTP verified successfully and user logged in."
    });

  } catch (error) {
    console.error("Error during OTP verification:", error);
    return res.status(500).json({ message: 'An error occurred while verifying OTP. Please try again later.' });
  }
};
const resendOtp = async (req, res) => {
  try {
    const { userName } = req.body;
    
    if (!userName) {
      return res.status(400).json({ error: "User Name is required" });
    }

    const user = await User.findOne({ userName });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const userId = user._id;

    const newOtp = Math.floor(100000 + Math.random() * 900000);
  console.log("otp",newOtp)
    await storeOtp({ userId, otp: newOtp,       expiresAt: new Date(Date.now() + 10 * 60 * 1000) 
    });

    await sendMail({ userName: user.userName, otp: newOtp });

    return res.status(200).json({ message: "OTP resent successfully" });

  } catch (error) {
    console.error("Error resending OTP:", error);
    return res.status(500).json({ error: "An error occurred while resending OTP" });
  }
};

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

    const newOtp = Math.floor(100000 + Math.random() * 900000).toString();

    const otpEntry = new OTP({ userId, otp: newOtp });
    await otpEntry.save();

    await sendMail({ userName, otp: newOtp });

    return res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error("Error sending OTP:", error);
    return res.status(500).json({ error: "An error occurred while sending OTP" });
  }
};



const verifyOtp = async (req, res) => {
  const { otp, userName } = req.body;

  try {
    if (!otp) {
      return res.status(400).json({ error: "OTP is required" });
    }
    if (!userName) {
      return res.status(400).json({ error: "User Name is required" });
    }

    const user = await User.findOne({ userName });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const userId = user._id;
    const otpRecord = await OTP.findOne({ userId }).sort({ createdAt: -1 });

    if (!otpRecord || otpRecord.otp !== otp) {
      return res.status(401).json({ error: "Invalid OTP" });
    }
    return res.status(200).json({
      message: "OTP verified successfully"
    });

  } catch (error) {
    console.error("Error during OTP verification:", error);
    return res.status(500).json({ error: 'An error occurred while verifying OTP' });
  }
};

export default verifyOtp;

export {verifyOtpWithToken,resendOtp,sendotp,verifyOtp};