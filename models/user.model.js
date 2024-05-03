import mongoose, { Schema, model } from "mongoose";
import validator from "validator"; 
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const userSchema = new Schema({
   name:{
    type : String , 
    required : [true ,"Please Provide your name"] ,
    minLength : [3 ,"Name Should be 3 or more then 3 character"],
   } ,
   email :{
    type : String ,
    required : [true , "Please Provide Your Email"],
    validator :[validator.isEmail , "Please Provide valid email"]
   }, 
   phone:{
    type : Number , 
    required : true  
   },
   password :{
    type : String ,
    required:[true , 'Plese Provide Your Password'] , 
    minLength :[8 , "Please Provide At least 8 DIgit Password"] ,
    select : false
} ,
role:{
    type:String ,
    required:[true ,"please Ptovide your Role"],
    enum:["Job Seeker" ,"Employer"] ,
},
createdAt:{
    type : Date , 
    default : Date.now
}

},{timestamps:true}); 

userSchema.pre("save" , async function(next){ 
    if(this.isModified("password")) {
       this.password = await bcrypt.hash(this.password , 10);
    }
    next();
 }); 
 

userSchema.methods.comparePassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword , this.password);
}; 


userSchema.methods.geJWTToken = function(){
    return jwt.sign({id:this._id} , process.env.JWT_SECRET_KEY,{
        expiresIn:process.env.JWT_EXPIRE,
    } );
}
export const User = model('User' , userSchema);
