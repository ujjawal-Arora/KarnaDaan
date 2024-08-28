import cloudinary from '../ImageUpload/cloudinary.js'
const ImageUpload = async(req,res)=>{
    const imgage_url=req.body.preview;
  try{
         const result=await cloudinary.uploader.upload(imgage_url,{
            folder:"/cloudinary-demo",
              unique_filename: true,
         }
            
         );
        //  console.log(result);
         res.json({url:result.secure_url});
        //  console.log('Image uploaded successfully',result.secure_url);
     
  }catch(error){
    console.log('Error uploading image',error);
    return res.status(500).json({message:'Error uploading image'});
  }
}
export {ImageUpload}