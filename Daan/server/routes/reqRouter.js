import express  from 'express';
const app= express();
const router=express.Router();
router.get('/',async   (req,res)=>{
return res.json("hello from");
})
export default router;