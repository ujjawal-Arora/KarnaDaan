import express  from 'express';
// const app= express();
const router=express.Router();
import authenticate from '../Controller/Auth.js';
import {addReq,updateReq,deleteReq,getAllUsersNonAcceptedReq,getAllUsersAcceptedReq,getAllAcceptedReq,getAllNonAcceptedReq} from '../RouteFunctions/reqRoutes.js'
router.post('/add-req',authenticate,addReq);

// router.get("/get-all-req",authenticate,getAllRequests);

// router.delete("/delete-req/:reqId",authenticate,deleteReq);

// router.put("/update-req/:reqId",authenticate,updateReq);

// router.get("/get-allusers-accepted-req",authenticate,getAllUsersAcceptedReq);

// router.get("/get-allusers-non-accepted-req",authenticate,getAllUsersNonAcceptedReq);

// router.get("/get-all-non-accepted-req",authenticate,getAllNonAcceptedReq);

// router.get("/get-all-accepted-req",authenticate,getAllAcceptedReq);

router.delete("/delete-req/:reqId",deleteReq);

router.put("/update-req/:reqId",updateReq);

router.get("/get-allusers-accepted-req",getAllUsersAcceptedReq);

router.get("/get-allusers-non-accepted-req",getAllUsersNonAcceptedReq);

router.get("/get-all-non-accepted-req",getAllNonAcceptedReq);

router.get("/get-all-accepted-req",getAllAcceptedReq);
export default router;