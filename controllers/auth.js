const errorResponse = require("../utils/errorResponse")
const asyncHandler=require("../middleware/async")
const sendMail=require("../utils/resetPassword")
const User = require("../models/user")
const crypto = require("crypto")

exports.register=asyncHandler(async(req,res,next)=>{
    console.log('@@@@@@@',req.body)
 const  {name,email,password,role}=req.body
    const user = await User.create({name,email,password,role})
    sendTokenToCookie(user,200,res)
})

exports.login=asyncHandler(async(req,res,next)=>{
    const  {email,password}=req.body
    
   if(!email || !password){
   return   next(new errorResponse("please enter valid email or password ",400))
   }
const user = await User.findOne({email}).select('+password')
console.log('111',user)

if(!user)  {
   return  next(new errorResponse("invali credentials ",401))

}
 const isMatch = await user.matchPassword(password)

 if(!isMatch){
   return  next(new errorResponse("invali credentials ",401))
 }
     sendTokenToCookie(user,200,res)
   })
   


   exports.resetPassword=asyncHandler(async(req,res,next)=>{
    const resetPasswordToken= crypto.createHash('sha256').update(req.params.id).digest('hex')
    const user = await User.findOne({resetPasswordToken})

    if(!user){
      console.log("11111")
      return next(new errorResponse("invalid token"))
    }

    user.password=req.body.password
    user.resetPassword=undefined
    await user.save()
    sendTokenToCookie(user,200,res)
  })
 


   const sendTokenToCookie=(user,statusCode,res)=>{

    const token = user.getSignedToken()
   const options={
       httpOnly:true
   }
    res.status(statusCode).cookie('token',token,options).json({success:true,token})

   }

   exports.getMe=asyncHandler(async(req,res,next)=>{
       const user = await User.findById(req.user.id)
       res.status(200).json({success:true,data:user})
   })


   exports.forgotPassword=asyncHandler(async(req,res,next)=>{

    const user = await User.findOne({email:req.body.email})
     if(!user){
   return  next(new errorResponse("invalid credentials ",401))
     }

const  resetPassword = user.generateToken()
    await user.save({validateBeforeSave:false})
const url = `${req.protocol}://${req.get('host')}/api/forgotPassword/${resetPassword}`
const message = `email received from ${url}`
console.log('!!!',user.email)
try {
  await sendMail({email:user.email,subject:"sending message",message})
  res.status(200).json({success:true,data:'email sent'})

  
} catch (error) {
  user.resetPasswordToke=undefined
  console.log(error)
  await user.save({validateBeforeSave:false})

}
    res.status(200).json({success:true,data:user})
})



 