import express from 'express';
import userRouter from './userRouter.js';
import postRouter from './postRouter.js';
import requestRouter from './reqRouter.js';
import otpRouter from './otpRouter.js';
const router = express.Router();

router.use('/user', userRouter);
router.use('/posts',postRouter);
router.use('/request', requestRouter);
router.use('/otp', otpRouter);


export default router;
