import express from 'express';
import userRouter from './userRouter.js';
import postRouter from './postRouter.js';
import requestRouter from './reqRouter.js';
import otpRouter from './otpRouter.js';
import cors from 'cors';

import chatRouter from './chatRouter.js';
import imageUploaderRouter from './imageUploadRouter.js';
import  searchRouter  from './searchRouter.js';
const router = express.Router();
router.use(cors({
    origin: 'http://localhost:5173',
    credentials: true, 
  }));
router.use('/user', userRouter);
router.use('/posts',postRouter);
router.use('/requests', requestRouter);
router.use('/otp', otpRouter);
router.use('/image',imageUploaderRouter);
router.use('/search', searchRouter);
router.use('/chat', chatRouter);


export default router;
