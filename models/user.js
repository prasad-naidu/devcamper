const mongoose = require("mongoose")
const bcrypt =require('bcryptjs')
const crypto = require('crypto')
const jwt =require("jsonwebtoken")
const userSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        required:true,
        match:[
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'please enter valid email '
        ]
    },
    role:{
        type:String,
        required:true,
        enum:["user","publisher"]
    },
    password:{
    type:String,
    minlength:5,
    select:false
    },
    resetPasswordToken:String,
    resetPasswordExpire:Date,
    createdAt:{
        type:Date,
        default:Date.now()
    }
})

userSchema.pre('save',async function(next){
    if(!this.isModified('password')){
      next()
    }
const salt = await bcrypt.genSalt(10)
this.password= await bcrypt.hash(this.password,salt)
// next()
})

userSchema.methods.getSignedToken=function(){
  return  jwt.sign({id:this._id},process.env.JWT_SECRET)
}

userSchema.methods.matchPassword=function(enteredpassword){
    return bcrypt.compare(enteredpassword,this.password)
}

userSchema.methods.generateToken=function(){
  const resetToken = crypto.randomBytes(20).toString('hex')
  console.log('######',resetToken)   

  this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex')
  return resetToken

}

module.exports=mongoose.model("User",userSchema)