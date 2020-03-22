const mongoose = require('mongoose');
const dotenv = require('dotenv')
dotenv.config({path:"./config/config.env"})

mongoose.connect(process.env.dbHOST,{useNewUrlParser:true,  useCreateIndex: true,useUnifiedTopology: true })
.then(()=>{
    console.log('successfully connected to db')
})
.catch(()=>{
    console.log('error')
})


module.export=mongoose