const express = require("express");
const dotenv = require('dotenv')
const cookieParser=require('cookie-parser')
const morgan=require('morgan')
const mongoose = require("./config/db")
const errorHandler = require("./middleware/errorHandler")

const user=require("./router/auth")
const bootcamp = require("./router/bootcamp")
dotenv.config({path:"./config/config.env"})
const app = express();
app.use(express.json())


PORT = process.env.PORT || 5000

// app.use(morgan('dev'))
app.use("/api",user);
app.use("/api",bootcamp);

app.use(cookieParser())
app.use(errorHandler)

app.listen(PORT,()=>{
    console.log(`listenig to ${process.env.NODE_ENV} to ${PORT}`)
})
