import mongoose from 'mongoose';

const otpSchema = new mongoose.Schema({
  otp: { 
    type: String, 
    required: true
 },
  userId: {
     type: mongoose.Schema.Types.ObjectId, ref: 'User', 
     required: true
     },
  expiresAt: { type: Date, required: true },
});

otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 }); // Automatically delete expired OTPs

const OTP = mongoose.model('OTP', otpSchema);
export default OTP;
