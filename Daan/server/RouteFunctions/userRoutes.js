import { SignUpSchema, SigninSchema } from "../Zod/zod.js";
import User from "../models/userModel.js";
import storeotp from "../Session/storeOtp.js";
import sendMail from '../Controller/sendOtpMail.js';
import jwt from 'jsonwebtoken';

import { sendWelcomeMail } from '../Controller/sendWelcomeMail.js';
const {JWT_SECRET}=process.env;
const SignUp = async (req, res) => {
  try {
    const body = req.body;
    console.log(body);

    const result = SignUpSchema.safeParse(body);
    const { userName, firstName, lastName, password, profile_pic } = body;

if(!userName || !firstName || !lastName||!password){
  return res.status(400).json({
    error: "Fill all the Details", 
    message: "Zod Error"
  });
}
    if (!result.success) {
      const errorMessage = result.error.errors.map(err => err.message).join(', ');
      return res.status(400).json({
        error: errorMessage, 
      });
    }

    const userAlreadyExists = await User.findOne({ userName });
    if (userAlreadyExists) {
      return res.status(400).json({ error: "User name already exists" });
    }

    const user = await User.create({
      userName,
      firstName,
      lastName,
      password,
      profile_pic,
    });

    return res.status(200).json({
      message: "User created successfully",
      user, 
    });

  } catch (error) {
    // Catch and log any other unexpected errors
    console.error("Error during SignUp process:", error);
    return res.status(500).json({
      error: "Something went wrong. Please try again later.",
    });
  }
};


const SignIn = async (req, res) => {
  try {
    const body = req.body;


    // Validate the body using Zod 
    const { userName, password } = body;
    if(!userName||!password){
      return res.status(400).json({ error: "Fill all the details"});
    }
    const result = SigninSchema.safeParse(body);
    if (!result.success) {
      // Extract and return only the error messages
      const errorMessage = result.error.errors.map(err => err.message).join(', ');
      return res.status(400).json({
        error: errorMessage, // Return just the error message(s)
      });
    }

   

    // Check if the user exists
    const userAlreadyExists = await User.findOne({ userName });
    if (!userAlreadyExists) {
      return res.status(400).json({ error: "User does not exist" });
    }

    // Check if the password is correct
    if (userAlreadyExists.password !== password) {
      return res.status(400).json({ error: "Password is incorrect" });
    }

    const userId = userAlreadyExists._id;

    // Generate a 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000);
    console.log("Generated OTP:", otp);

    // Store the user session and OTP
    req.session.userId = userId;
    req.session.userName = userName;
    storeotp({ req, otp });

    // Send the OTP via email
    await sendMail({ userName, otp });

    return res.status(200).json({ message: "OTP sent to your email." });

  } catch (error) {
    // Catch and log any unexpected errors
    console.error("Error during SignIn process:", error);
    return res.status(500).json({
      message: "Internal server error",
      error: "Something went wrong. Please try again later.",
    });
  }
};
const UpdatePassword = async (req, res) => {
  const userId = req.session.userId;
  console.log("User ID from session:", userId);
  
  const { password } = req.body;

  // Check if password is provided
  if (!password) {
    return res.status(400).json({ error: "Password is required" });
  }

  try {
    // Find user and update password
    const user = await User.findByIdAndUpdate(userId, { password }, { new: true });

    if (!user) {
      return res.status(404).json({ error: "User not found. Please try again." });
    }

    // Success message
    return res.status(200).json({ message: "Password updated successfully" });
    
  } catch (error) {
    console.error("Error updating password:", error);
    return res.status(500).json({ error: "An internal error occurred while updating the password. Please try again later." });
  }
};
const GoogleSignIn = async (req, res) => {
  const { email, firstName, lastName } = req.body;

  try {
    if (!email || !firstName || !lastName) {
      return res.status(400).json({ error: "All fields (email, firstName, lastName) are required" });
    }

    const password = "Signed in through Google";
    const userAlreadyExists = await User.findOne({ userName: email });
    let userId = null;

    if (!userAlreadyExists) {
      const user = await User.create({
        userName: email,
        firstName,
        lastName,
        password,
      });
      userId = user._id;
      console.log("New user created with ID:", userId);
    } else {
      userId = userAlreadyExists._id;
      console.log("User already exists with ID:", userId);
    }

    const token = jwt.sign({ userId }, JWT_SECRET);

    res.cookie("token", token, {
      httpOnly: false,
      maxAge: 2 * 60 * 60 * 1000, // 2 hours
    });

    res.setHeader('Authorization', `Bearer ${token}`);

    sendWelcomeMail({ email });

    return res.status(200).json({ message: "User signed in successfully" });

  } catch (error) {
    console.error("Error during Google sign-in:", error);
    return res.status(500).json({ error: "An error occurred while signing in through Google. Please try again later." });
  }
};

export { SignUp, SignIn,UpdatePassword,GoogleSignIn };
