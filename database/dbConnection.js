import mongoose from "mongoose";

export const dbConnection = ()=> {

      
     mongoose.connect(process.env.MONGO_URI).then((res)=>{
        console.log("DB CONNECTED ")
     }) .catch((err)=>{ 
        console.log(`DB CONNECTION FAILED ${err}`)
     })
    
  } 

