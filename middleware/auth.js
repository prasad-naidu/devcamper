const jwt = require("jsonwebtoken");

const asyncHandler=require("./errorHandler")

const errorResponse = require("../utils/errorResponse")

const User = require("../models/user")


exports.protect = async (req,res,next)=>{
    let  token
    if(req.headers.authorization ){
        token = req.headers.authorization;
    }
if(!token){
  return  next(new errorResponse("send token ",404))
}

try {
    const decoded = jwt.verify(token,process.env.JWT_SECRET)

    console.log('@@@@@@@@@@@@',decoded)

    req.user = await User.findById(decoded.id)
    console.log('######',req)
    
    next()

} catch (err) {
   return next(new errorResponse("send token ",404))
}
}
