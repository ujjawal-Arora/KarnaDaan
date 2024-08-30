import express from 'express';
import multer from 'multer';
import { ImageUpload } from '../RouteFunctions/uploadImageRoutes.js';

const router = express.Router();

// Multer configuration
// const storage = multer.memoryStorage(); // Store file in memory buffer
// const upload = multer({ storage });
const upload = multer({
    limits: { fileSize: 50 * 1024 * 1024 }, // 50MB
  });
// Image upload route using multer
router.post('/upload-image', upload.single('image'), ImageUpload);

export default router;
