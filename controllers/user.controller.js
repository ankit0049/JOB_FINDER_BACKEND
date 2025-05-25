import { catchAsyncError } from "../middlewares/catchAsynncError.middleware.js"
import ErrorHandler from "../middlewares/error.middleware.js";
import { sendToken } from "../utils/jwttoken.util.js"; 
import { User } from "../models/user.model.js";


export const register =catchAsyncError( async(req , res , next)=>{
   const {name , email , phone , role , password} = req.body ;
   console.log("req.body" , req.body);
   if(!name || !email || !password || !role || !phone )
   {
    return next(new ErrorHandler("Please Fill All Credintial Carefully !" ,400));
   } 
   const isEmail = await User.findOne({email});

   if(isEmail)
   {
    return next(new ErrorHandler("crediantial Already Present Please Try Diffrent !" , 400));
   }
   
   if( role === 'Employer' && email!== process.env.ACCESS_EMAIL && password !== process.env.ACCESS_PASSWORD)
   {
  return next(new ErrorHandler("You can't Directly Login As a Employer . Connect With : ankitrajputji00@gmail and Take Permission " , 400));
   }
  const user = await User.create({
    name ,
    email ,
    phone ,
    role ,
    password
  }); 

  res.status(200).json({
    status : true ,
    message : "User Registered Successfully !" ,
    user
  });
  sendToken(user , 200 , res , "User Registered Succefully! , set Token" );
}); 




export const login = catchAsyncError( async(req , res , next)=>{
   
const {email , password ,role} = req.body ;

if(!email || !role || !password)
{
    return next(new ErrorHandler("Please Provide All Credintial Carefully !" , 400));
}

const user = await User.findOne({email}).select("+password");

if(!user)
{
    return next(new ErrorHandler("Invalid Email or Password  !" , 400));
}


const isPassword = await user.comparePassword(password); 

 
if(user.role !== role)
{
    return next(new ErrorHandler("Please Provide Correct Role !" , 400));
}

sendToken(user , 200 , res , "User Logged In")

}); 


export const logout = catchAsyncError( async (req , res , next)=>{
    res.status(201).cookie("token" , null , {
        httpOnly : true ,
        expires : new Date(Date.now())
    }) 
    .json({
        success : true ,
        message : "User Successfully Logged Out !"
    })
}) 

export const getUser = catchAsyncError((req, res, next) => {
    const user = req.user;
    res.status(200).json({
      success: true,
      user,
    });
  });