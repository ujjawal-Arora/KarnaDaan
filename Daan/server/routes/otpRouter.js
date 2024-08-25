import express from 'express';
import { verifyOtp } from '../RouteFunctions/otpRoutes.js';
import sessionConfig from '../Session/sessionConfig.js';

const router =express.Router();
router.use(sessionConfig)
router.use(express.urlencoded({ extended: true }));

router.post('/verify-otp', verifyOtp); 
export default router;

