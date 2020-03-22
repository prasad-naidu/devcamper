const mongoose = require('mongoose')
const slugify = require('slugify')
const geocoder=require("../utils/geocoder")
const BootcampSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    slug:String,
    description:{
        type:String,
        maxlength:500
    },
    website:{
        type:String,
        match:[/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,'please enter valid url with http-https']
    },
    phone:{
        type:String,
        maxlength:10
    },
    email:{
        type:String,
        required:true,
        match:[
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        'please enter valid email '
        ]
    },
    address:{
        type:String,
    },
    location:{
        type: {
            type: String, // Don't do `{ location: { type: String } }`
            enum: ['Point'], // 'location.type' must be 'Point'
          },
          coordinates: {
            type: [Number],
            required: true,
            index:'2d sphere'
          },
          formattedAddress:String,
          street:String,
          city:String,
          state:String,
          zipcode:String,
          country:String
    },
    careers:{
        type:[String],
        required:true,
        enum:['web devloper','ux/ui','machine learnig ','data science']
    },
    avgRating:{
        type:Number,
        min:1,
        max:10
    },
    avgCost:Number,
    photo:{
        type:String,
        default:'no-photo.jpg'
    },
    housing:{
        type:Boolean,
        default:false
    },
    jobAssiastance:{
        type:Boolean,
        default:false
    },
    jobGuarantee:{
        type:Boolean,
        default:false
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

BootcampSchema.pre('save',function(next){
    this.slug=slugify(this.name,{lower:true})
    next()
})

BootcampSchema.pre('save',async function(next){
    const loc = await geocoder.geocode(this.address)
    console.log('######',loc[0])
    this.location={
        type:'Point',
        coordinates:[loc[0].longitude,loc[0].latitude],
        formattedAddress:loc[0].formattedAddress,
        street:loc[0].streetName,
        city:loc[0].city,
        state:loc[0].stateCode,
        zipcode:loc[0].zipcode,
        country:loc[0].countryCode

    }
    this.address=undefined  
    next()
})
module.exports=mongoose.model("Bootcamp",BootcampSchema)