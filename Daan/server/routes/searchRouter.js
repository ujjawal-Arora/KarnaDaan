import express from 'express';
import {searchPosts} from '../RouteFunctions/searchRouter.js';
const router =express.Router();

router.post('/item',searchPosts);
export default router;