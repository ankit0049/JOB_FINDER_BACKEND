export const catchAsyncError = (CheckFunction)=>{
    return (req , res , next)=>{
        Promise.resolve(CheckFunction(req,res,next)).catch(next);
    }
}