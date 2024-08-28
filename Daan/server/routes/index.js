import express from 'express';
import userRouter from './userRouter.js';
import postRouter from './postRouter.js';
import requestRouter from './reqRouter.js';
import otpRouter from './otpRouter.js';
import imageUploaderRouter from './imageUploadRouter.js';
const router = express.Router();

router.use('/user', userRouter);
router.use('/posts',postRouter);
router.use('/request', requestRouter);
router.use('/otp', otpRouter);
router.use('/image',imageUploaderRouter);


export default router;
