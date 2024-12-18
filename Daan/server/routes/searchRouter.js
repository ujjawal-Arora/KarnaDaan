import express from 'express';
import {searchPosts,searchReqPost} from '../RouteFunctions/searchRouter.js';
const router =express.Router();

router.post('/item',searchPosts);
router.post('/reqitem',searchReqPost);
export default router;