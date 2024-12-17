import express from 'express';
import '../config.js'
import { SignIn,SignUp,UpdatePassword,GoogleSignIn } from '../RouteFunctions/userRoutes.js';
const router = express.Router();
router.use(express.urlencoded({ extended: true }));


 router.post('/signup',SignUp);

 router.post('/signin',SignIn);
 router.post('/google-signin',GoogleSignIn);
 router.put('/update-password',UpdatePassword);



 export default  router;