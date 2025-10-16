import dotenv from "dotenv";
dotenv.config();
import fs from "fs"
import { v2 as cloudinary } from 'cloudinary';


    // Configuration
  
    
    // Upload an image
  
    cloudinary.config(
    
        { 
            cloud_name: process.env.CLOUD_NAME, 
            api_key: process.env.API_KEY, 
            api_secret: process.env.API_SECRET
        },
    
        
    );
    const uploadToCloudinary = async(localFilePath)=>{

     try {
        if(!localFilePath)return null
        const uploadResult = await cloudinary.uploader
        .upload(
            localFilePath, {
                resource_type : "auto",
                public_id: 'shoes',
            }
        )

     
     console.log(uploadResult.url);
     fs.unlink(localFilePath,(err)=>{
        if(err){
            console.log(err)
        }else{
            console.log("file deleted successfully")
        }
     })
     return uploadResult;
     } catch (error) {
        console.log(error)
        fs.unlink(localFilePath)
        return null
     }
    }

  
    export {  uploadToCloudinary  }   
    
    // Optimize delivery by resizing and applying auto-format and auto-quality
    // const optimizeUrl = cloudinary.url('shoes', {
    //     fetch_format: 'auto',
    //     quality: 'auto'
    // });
    
    // console.log(optimizeUrl);
    
    // // Transform the image: auto-crop to square aspect_ratio
    // const autoCropUrl = cloudinary.url('shoes', {
    //     crop: 'auto',
    //     gravity: 'auto',
    //     width: 500,
    //     height: 500,
    // });
    
    // console.log(autoCropUrl);    
