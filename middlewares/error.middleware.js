class ErrorHandler extends Error{
    constructor (message , statusCode)
    {
        super(message);
        this.statusCode = statusCode
    }
} 


export const errroMiddleware =(err , req , res , next)=>{
 
    err.message = err.message || "Internal Error Aa Gaya Pta Nhi Kyu"; 
    err.statusCode = err.statusCode || 500 ; 


    if(err.name === 'CaseError')
    { 
        const message = `Resource Not Found , !Invalid ${err}`
        err = new ErrorHandler(message , 400);
    } 

    
    if(err.code === 11000)
    { 
        const message = `Duplicate  ${Object.keys(err.keyValue)} Entered`
        err = new ErrorHandler(message , 400);
    }


    
    if(err.name === 'JsonWebTokenError')
    { 
        const message = `JSON web TOken IS  , !Invalid ${err}`
        err = new ErrorHandler(message , 400);
    }

    
    if(err.name === 'TokenExpireError')
    { 
        const message = `Token Expired or , !Invalid ${err}`
        err = new ErrorHandler(message , 400);
    } 

    return res.status(err.statusCode).json({
        success : false ,
        message : err.message ,
    });
}; 

export default ErrorHandler;