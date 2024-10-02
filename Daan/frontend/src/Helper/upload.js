const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUD_NAME}/upload`;
import axios from 'axios';
const uploadFile = async (file) => { 
    console.log(file);
    
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', "chatKaro");
  
    try {
      const response = await axios.post(CLOUDINARY_URL, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      console.log('File uploaded successfully:', response.data);
      return response.data; // Return the uploaded file data
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  };
export default uploadFile;