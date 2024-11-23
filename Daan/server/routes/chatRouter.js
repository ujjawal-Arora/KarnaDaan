import express from 'express';
import { searchFun,searchForSide  } from '../RouteFunctions/chatRoutes.js';
const router = express.Router();

router.use('/search',searchFun)
router.use('/searchSideBar',searchForSide);


export default router;