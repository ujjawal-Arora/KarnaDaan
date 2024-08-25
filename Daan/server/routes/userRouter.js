import express from 'express';

import '../config.js'
import { SignIn,SignUp } from '../RouteFunctions/userRoutes.js';
const router = express.Router();


 router.post('/signup',SignUp);


 router.post('/signin',SignIn);


 export default  router