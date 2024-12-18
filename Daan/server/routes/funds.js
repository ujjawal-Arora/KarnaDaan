import { Router } from 'express';
import payment from '../funds/payment.js';
const router = Router();

router.use('/payment',payment);
export default router;