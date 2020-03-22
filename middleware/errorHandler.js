
const errorResponse=require("../utils/errorResponse")
const  errorHandler = (err,req,res,next)=>{
    error={...err}
    error.message=err.message

if(err.name=="CastError"){
    const message= `resourse not found on ${err.value} `
  error=  new errorResponse(message,404)
}
if(err.code==11000){
    const message="duplicate field value"
    error = new errorResponse(message,400)

}

// if(err.name="ValidationError"){
//     console.log('11111',err.name)
//     const message = Object.values(err.errors).map(i=>i.message)
//     error = new errorResponse(message,400)

// }
if(res){
    res.status(error.statusCode||500).json({success:false,err:error.message})

}
}

module.exports=errorHandler