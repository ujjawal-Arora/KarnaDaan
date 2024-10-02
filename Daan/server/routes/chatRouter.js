import express from 'express';
import { searchFun  } from '../RouteFunctions/chatRoutes.js';
const router = express.Router();

router.use('/search',searchFun)


export default router;