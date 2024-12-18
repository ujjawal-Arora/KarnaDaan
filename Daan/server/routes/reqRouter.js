import express  from 'express';
// const app= express();
const router=express.Router();
import authenticate from '../Controller/Auth.js';
import {addReq,getAllRequests,updateReq,deleteReq,getAllUsersNonAcceptedReq,getAllUsersAcceptedReq,getAllAcceptedReq,getAllNonAcceptedReq} from '../RouteFunctions/reqRoutes.js'
router.post('/add-req',addReq);

router.get("/get-all-req",getAllRequests);

router.delete("/delete-req/:reqId",deleteReq);

router.put("/update-req/:reqId",updateReq);

router.get("/get-allusers-accepted-req",getAllUsersAcceptedReq);

router.post("/get-allusers-non-accepted-req",getAllUsersNonAcceptedReq);

router.get("/get-all-non-accepted-req",getAllNonAcceptedReq);

router.get("/get-all-accepted-req",getAllAcceptedReq);
export default router;