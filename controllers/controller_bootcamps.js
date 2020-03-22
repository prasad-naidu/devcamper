
const errorResponse = require("../utils/errorResponse")
const asyncHandler=require("../middleware/async")
const Bootcamp = require("../models/bootcamp")

exports.getBootcamps=asyncHandler(async (req,res,next)=>{
    // console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
    const result=await Bootcamp.find()
    if(!result){
    next(new errorResponse(`Resourse not found of id `,400))
    }
        
    res.status(200).send({success:true,data:result})    
        
})

exports.getBootcamp=asyncHandler(async(req,res,next)=>{
    const result = await Bootcamp.findById(req.params.id)
    if(!result){
        // console.log('1111',req.params.id)
    next(new errorResponse(`Bootcamp not found of id ${req.params.id}`,400))
        
    }
    res.status(200).send({success:true,data:result})    
})

exports.postBootcamps= asyncHandler(async(req,res,next)=>{
        const result =await Bootcamp.create(req.body)
        res.status(200).send({
            success:true,
            data:result
        })
    
})

exports.updateBootcamps=asyncHandler(async(req,res,next)=>{
    const result = await Bootcamp.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})
        res.status(200).send({status:true,data:result})
        if(!result){
    next(new errorResponse(`Resourse not found of id `,400))

        }
    
})

exports.deleteBootcamps=asyncHandler(async(req,res,next)=>{
    const result = await Bootcamp.findByIdAndDelete(req.params.id)
    if(!result){
    return next(new errorResponse(`Resourse not found of id `,400))
            }

            res.status(200).send({
                success:true,
                data:result
    }) 
})