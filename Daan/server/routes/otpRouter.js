import express from 'express';
import { verifyOtpWithToken,resendOtp,verifyOtp,sendotp } from '../RouteFunctions/otpRoutes.js';

const router =express.Router();
router.use(express.urlencoded({ extended: true }));

router.post('/verify-token-otp', verifyOtpWithToken); 
router.post('/resend-otp', resendOtp); 

router.post('/send-otp', sendotp); 
router.post('/verify-otp', verifyOtp);

export default router;

