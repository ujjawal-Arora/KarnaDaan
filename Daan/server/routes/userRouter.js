import express from 'express';
import '../config.js'
import { SignIn,SignUp } from '../RouteFunctions/userRoutes.js';
import sessionConfig from '../Session/sessionConfig.js';
const router = express.Router();
router.use(sessionConfig)
router.use(express.urlencoded({ extended: true }));


 router.post('/signup',SignUp);

 router.post('/signin',SignIn);


 export default  router;