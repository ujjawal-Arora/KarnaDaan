import express  from 'express';
const app= express();
const router=express.Router();
router.get('/',async   (req,res)=>{
return res.json("hello From Posts")
})
export default router;