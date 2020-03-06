const express = require("express");
const dotenv = require('dotenv')
const app = express();

dotenv.config({path:"./config/config.env"})
PORT = process.env.PORT || 5000

app.listen(PORT,()=>{
    console.log(`listenig to ${process.env.NODE_ENV} to ${PORT}`)
})