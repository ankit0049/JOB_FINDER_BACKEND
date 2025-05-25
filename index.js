import app from './app.js'  
import cloudinary from 'cloudinary' 
import dotenv from 'dotenv';
dotenv.config({ path: 'config.env' }); 

console.log("mongo" , process.env.MONGO_URI)

const PORT = process.env.PORT;
cloudinary.v2.config({
    cloud_name:process.env.CLOUDINARY_CLIENT_NAME , 
    api_key : process.env.CLOUDINARY_CLIENT_API , 
    api_secret : process.env.CLOUDINARY_CLIENT_SECRET
}) 

app.get("/hello" ,(req , res)=>{
    res.json(`Hello ${PORT}`);
})
app.listen(process.env.PORT , ()=>{ 
   
    console.log(`Server Running on the Port ${process.env.PORT}`);
})
