import express from 'express';
import bodyParser from 'body-parser';
// import cloudinary from '../ImageUpload/cloudinary.js';
import {ImageUpload} from '../RouteFunctions/uploadImageRoutes.js'
const router=  express.Router();
router.use(bodyParser.json({ limit: '50mb' }));
router.post('/upload-image',ImageUpload)
export default router;