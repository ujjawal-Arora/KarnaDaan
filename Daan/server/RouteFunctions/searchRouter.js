import {Post} from "../models/postModel.js"; // Assuming Post is the model for posts

const searchPosts = async (request, response) => {
  try {
    const {location, category } = request.body;
    console.log(location,category)


    const query = {};

    if (location) {
      query["location"] = new RegExp(location, "i"); 
    }

    if (category) {
      query["category"] = new RegExp(category, "i"); 
    }

    const posts = await Post.find(query);

    if (posts.length === 0) {
      return response.status(200).json({
        message: 'No posts found matching the criteria',
        success: false
      });
    }

    // Return the posts data
    return response.json({
      message: 'Posts found',
      data: posts,
      success: true
    });

  } catch (error) {
    return response.status(500).json({
      message: error.message || 'Server Error',
      error: true
    });
  }
};

export { searchPosts };
