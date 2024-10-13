import express  from 'express';
const app= express();
const router=express.Router();
import authenticate from '../Controller/Auth.js';
import {addPost, deletePost,updatePost,getAllwishListedPosts,getAlldonatedPosts,getAllnonWishPosts,getAllUsersNonDonatedPosts,getAllUsersDonatedPosts,getAllnonDonatedPosts} from '../RouteFunctions/postRoutes.js'
import {getAllPosts} from '../RouteFunctions/postRoutes.js'

// router.post('/add-post',authenticate,addPost);

// router.get("/get-all-posts",authenticate,getAllPosts);

// router.delete("/delete-post/:postId",authenticate,deletePost);

// router.put("/update-post/:postId",authenticate,updatePost);

// router.get("/get-allusers-nondonated-posts",getAllUsersNonDonatedPosts);
// router.get("/get-allusers-donated-posts",authenticate,getAllUsersDonatedPosts);

// router.get("/get-all-wishlisted-posts",authenticate,getAllwishListedPosts);
// router.get("/get-all-donated-posts",authenticate,getAlldonatedPosts);

// router.get("/get-all-nonwishlisted-posts",authenticate,getAllnonWishPosts);

// router.get("/get-all-nondonated-posts",authenticate,getAllnonDonatedPosts);



router.post('/add-post',addPost);

router.get("/get-all-posts",getAllPosts);

router.delete("/delete-post/:postId",deletePost);

router.put("/update-post/:postId",updatePost);

router.get("/get-allusers-nondonated-posts",getAllUsersNonDonatedPosts);
router.get("/get-allusers-donated-posts",getAllUsersDonatedPosts);

router.get("/get-all-wishlisted-posts",getAllwishListedPosts);
router.get("/get-all-donated-posts",getAlldonatedPosts);

router.get("/get-all-nonwishlisted-posts",getAllnonWishPosts);

router.get("/get-all-nondonated-posts",getAllnonDonatedPosts);

export default router;