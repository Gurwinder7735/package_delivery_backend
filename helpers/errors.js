const { sendResponse } = require(".");

exports.errorHandler = (err,req,res,next) => {

    console.log(err);
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 0

    if(process.env.NODE_ENV === 'development'){
 
     sendResponse(res,err.status,err.statusCode,err.message,{ stack: err.stack})

    }else if(process.env.NODE_ENV === 'production'){

        // Operational Error
 
        if(err.isOperarational){
            sendResponse(res,err.status,err.statusCode,err.message)

        // Programming or other unknown error
        }else{
            sendResponse(res,err.status,500,'Something Went Very Wrong!')
        }
      

    }
    
  

}

exports.catchAsync = fn => {
    // console.log('HI');
    return (req,res,next) => {   
        // console.log(fn);
        fn(req,res,next).catch(err => next(err))
    }
}
