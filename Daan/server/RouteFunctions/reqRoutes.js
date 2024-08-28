import User from "../models/userModel.js";
import {Request} from '../models/reqModel.js';

const addReq = async(req,res)=>{
const {title,description,location,name,phoneNumber,wishListed,accepted,category}=req.body;

if(!title||!description||!location||!name||!phoneNumber){
    return res.status(400).json({error:"please fill all the fields"});
}

const userId=req.user.userId;
console.log(userId);

const user = await User.findById(userId);

if (!user) {
    return res.status(404).json({ error: "User not found" });
}
const newRequest = new Request({
    title,
    description,
    location,
    name,
    category,
    phoneNumber,
    wishListed,
    accepted,
    user: userId,  
    
});

try {
    const savedRequest = await newRequest.save();

    user.requests.push(savedRequest._id);
    await user.save();

} catch (error) {
    console.log(error)
    return res.status(404).json({error:"error saving user"});
}
return res.status(200).json({message:"Req added successfully"})
}
// const getAllRequests=async(req, res) => {
//     const userId=req.user.userId;
//     try {
//       const user = await User.findById(userId).populate('requests');

//       if (!user) {
//           return res.status(404).json({ error: "User not found" });
//       }

//       return res.status(200).json({ posts: user.requests });
//   } catch (error) {
//       console.error("Error retrieving requests:", error);
//       return res.status(500).json({ error: "An error occurred while retrieving posts" });
//   }
// }

const deleteReq = async (req, res) => {
   
    try {
      const { reqId } = req.params;
      const userId = req.user.userId;
      const checkReq = await Request.findById(reqId);
      if (!checkReq) {
        return res.status(404).json({ message: "Req not found" });
      }     
      await Request.findByIdAndDelete(reqId);
      await User.findByIdAndUpdate(userId, { $pull: { requests: reqId } });
  
      res.status(200).json({ message: "Request deleted successfully" });
    } catch (err) {
        console.error("Error deleting req:", err);
      res.status(500).json({ message: "An error occurred while deleting Request" });
    }
  };
  const updateReq=async (req, res) => {
    try{
        const {reqId} = req.params;
        const {title,description,location,name,phoneNumber,wishListed,accepted}=req.body;

        if(!title||!description||!location||!name||!phoneNumber||!wishListed||!accepted){
            return res.status(400).json({error:"please fill all the fields"});
        }
        const check_req=await Request.findById(reqId);
        if (!check_req) {
            return res.status(404).json({ message: "Req not found" });
          }
          await Request.findByIdAndUpdate(reqId,{title,description,location,name,phoneNumber,wishListed,accepted});
          return res.status(200).json({message: "Successfully updated Request"})



    }catch (err) {
        console.error("Error updating request:", err);
      res.status(500).json({ message: "An error occurred while updating Request" });
    }
  }
  const getAllUsersNonAcceptedReq = async (req, res) => {
    try {
      
        const requests = await Request.find({ accepted: false }).sort({ createdAt: -1 });

        res.status(200).json({ data: requests });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "An error occurred while getting all non-accepted req" });
    }
};
const getAllUsersAcceptedReq = async (req, res) => {
    try {
      
        const requests = await Request.find({ accepted: true }).sort({ createdAt: -1 });

        res.status(200).json({ data: requests });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "An error occurred while getting all accepted req" });
    }
};
const getAllAcceptedReq=async (req,res)=>{
    try{
           const userId=req.user.userId;
           
           const userData=await User.findById(userId).populate({
               path:"requests",
               match:{accepted:true},
               options:{sort:{createdAt:-1}}
           });//populate for getting whole daata
   
           const wishListed=userData.requests;
           res.status(200).json({data:wishListed});
   
     }catch(error){
          console.log(error);
          return res.status(500).json({message: "An error occurred while getting all accepted lists"});
     }
     }
     const getAllNonAcceptedReq=async (req,res)=>{
        try{
               const userId=req.user.userId;
               
               const userData=await User.findById(userId).populate({
                   path:"requests",
                   match:{accepted:false},
                   options:{sort:{createdAt:-1}}
               });//populate for getting whole daata
       
               const Accepted=userData.requests;
               res.status(200).json({data:Accepted});
       
         }catch(error){
              console.log(error);
              return res.status(500).json({message: "An error occurred while getting all accepted lists"});
         }
         }
export  {addReq,updateReq,deleteReq,getAllUsersNonAcceptedReq,getAllUsersAcceptedReq,getAllAcceptedReq,getAllNonAcceptedReq};