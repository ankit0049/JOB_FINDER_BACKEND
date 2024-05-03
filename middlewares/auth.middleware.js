import { catchAsyncError } from "./catchAsynncError.middleware.js";
import ErrorHandeler from "./error.middleware.js"
import  jwt  from "jsonwebtoken"; 
import { User } from "../models/user.model.js";

export const isAutherized = catchAsyncError(async(req , res , next)=>{
    const token =  req.cookies.token;
    if(!token)
    {
       return next(new ErrorHandeler("User Not Autherized !" , 400));
    } 

    const decoded = jwt.verify(token , process.env.JWT_SECRET_KEY); 

    req.user = await User.findById(decoded.id) ;
    next(); 
})