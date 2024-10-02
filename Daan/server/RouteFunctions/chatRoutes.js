import User from "../models/userModel.js";
const  searchFun=async (req,res)=>{
      try{
        const {search}=req.body;
        console.log(search)
        const query = new RegExp(search,"i","g");
  
        const user = await User.find({
          "$or" : [
              { userName : query },
              { firstName : query }
          ]
      }).select("-password");
      
      return res.json({
          message : 'all user',
          data : user,
          success : true
      })
      }catch(err){
        console.error("Error searching posts:", err);
        return res.status(500).json({ message: "An error occurred while searching posts" });
      }
}
export {searchFun};