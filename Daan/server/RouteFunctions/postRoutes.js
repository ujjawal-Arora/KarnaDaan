import User from "../models/userModel.js";
import {Post} from '../models/postModel.js';

const addPost = async(req,res)=>{
const {email,title,description,imageUrls,location,name,phoneNumber,wishListed,donated,category}=req.body;
console.log("images url",imageUrls);
console.log("images url only")
imageUrls.map((i)=>{
    console.log(typeof i)
})
if (!email) {
    return res.status(404).json({ error: "Pls login " });
}
if(!title||!description||!location||!name||!phoneNumber||!category){
    return res.status(400).json({error:"please fill all the fields"});
}

const user = await User.findOne({ userName: email });

if (!user) {
    return res.status(404).json({ error: "User not found" });
}
const newPost = new Post({
    title,
    description,
    category,
    imageUrls,
    location,
    name,
    phoneNumber,
    wishListed,
    donated,
    user: user._id,  
});

try {
    console.log(newPost.toJSON());
    const savedPost = await newPost.save();

    user.posts.push(savedPost._id);
    await user.save();

} catch (error) {
    return res.status(404).json({error:"error saving user"});
}

return res.status(200).json({message:"post added successfully"})
}

const getAllPosts=async(req, res) => {
          const userId=req.user.userId;
          try {
            const user = await User.findById(userId).populate('posts');//what does populate means is thar first u get findBYid u get user and array of posts with id populate will return all the posts of the user 
    
            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }
    
            return res.status(200).json({ posts: user.posts });
        } catch (error) {
            console.error("Error retrieving posts:", error);
            return res.status(500).json({ error: "An error occurred while retrieving posts" });
        }
}

const deletePost = async (req, res) => {
   
    try {
      const { postId } = req.params;
      const userId = req.user.userId;
      const checkPost = await Post.findById(postId);
      if (!checkPost) {
        return res.status(404).json({ message: "Post not found" });
      }     
      await Post.findByIdAndDelete(postId);
      await User.findByIdAndUpdate(userId, { $pull: { posts: postId } });
  
      res.status(200).json({ message: "Post deleted successfully" });
    } catch (err) {
        console.error("Error deleting post:", err);
      res.status(500).json({ message: "An error occurred while deleting post" });
    }
  };

  const updatePost=async (req, res) => {
    try{
        const {postId} = req.params;
        const {title,description,imageUrls,location,name,phoneNumber,wishListed,donated}=req.body;

        if(!title||!description||!imageUrls||!location||!name||!phoneNumber||!wishListed||!donated){
            return res.status(400).json({error:"please fill all the fields"});
        }
        const check_post=await Post.findById(postId);
        if (!check_post) {
            return res.status(404).json({ message: "Post not found" });
          }
          await Post.findByIdAndUpdate(postId,{title,description,imageUrls,location,name,phoneNumber,wishListed,donated});
          return res.status(200).json({message: "Successfully updated post"})



    }catch (err) {
        console.error("Error updating post:", err);
      res.status(500).json({ message: "An error occurred while updating post" });
    }
  }

  const getAllUsersNonDonatedPosts = async (req, res) => {
    try {
      
        const posts = await Post.find({ donated: false }).sort({ createdAt: -1 });

        res.status(200).json({ data: posts });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "An error occurred while getting all non-donated posts" });
    }
};
const getAllUsersDonatedPosts = async (req, res) => {
    try {
      
        const posts = await Post.find({ donated: false }).sort({ createdAt: -1 });

        res.status(200).json({ data: posts });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "An error occurred while getting all non-donated posts" });
    }
};

  const getAllwishListedPosts=async (req,res)=>{
    try{
        const userId=req.user.userId;

        const userData=await User.findById(userId).populate({
            path:"posts",
            match:{wishListed:true},
            options:{sort:{createdAt:-1}}
        });//populate for getting whole daata

        const wishListed=userData.posts;
        res.status(200).json({data:wishListed});

  }catch(error){
       console.log(error);
       return res.status(500).json({message: "An error occurred while getting all wish lists"});
  }
}
  
  const getAlldonatedPosts=async (req,res)=>{
 try{
        const userId=req.user.userId;
        
        const userData=await User.findById(userId).populate({
            path:"posts",
            match:{donated:true},
            options:{sort:{createdAt:-1}}
        });//populate for getting whole daata

        const wishListed=userData.posts;
        res.status(200).json({data:wishListed});

  }catch(error){
       console.log(error);
       return res.status(500).json({message: "An error occurred while getting all donated lists"});
  }
  }

  const getAllnonWishPosts=async (req,res)=>{
    try{
           const userId=req.user.userId;
           
           const userData=await User.findById(userId).populate({
               path:"posts",
               match:{wishListed:false},
               options:{sort:{createdAt:-1}}
           });//populate for getting whole daata
   
           const wishListed=userData.posts;
           res.status(200).json({data:wishListed});
   
     }catch(error){
          console.log(error);
          return res.status(500).json({message: "An error occurred while getting all donated lists"});
     }
     }

     const getAllnonDonatedPosts=async (req,res)=>{
        try{
               const userId=req.user.userId;
               
               const userData=await User.findById(userId).populate({
                   path:"posts",
                   match:{donated:false},
                   options:{sort:{createdAt:-1}}
               });//populate for getting whole daata
       
               const wishListed=userData.posts;
               res.status(200).json({data:wishListed});
       
         }catch(error){
              console.log(error);
              return res.status(500).json({message: "An error occurred while getting all donated lists"});
         }
         }
    
       

   

export  {addPost,getAllPosts,deletePost,updatePost,getAllwishListedPosts,getAlldonatedPosts,getAllnonWishPosts,getAllUsersNonDonatedPosts,getAllUsersDonatedPosts,getAllnonDonatedPosts}