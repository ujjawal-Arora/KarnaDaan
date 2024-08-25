import express from "express";
import sessionConfig from "../Session/sessionConfig.js";

const app = express();
app.use(express.json());
app.use(sessionConfig);

function storeOtp({ req, otp }) {
  if (req.session) {
    req.session.otp = otp;
    req.session.otpExpiresAt = Date.now() + 5 * 60 * 1000; // OTP valid for 5 minutes
  }
  console.log("OTP at store:", req.session.otp);
}

export default storeOtp;
