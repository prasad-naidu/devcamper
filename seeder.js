
const fs = require("fs")

const mongoose = require("mongoose")
const dotenv = require('dotenv')
dotenv.config({path:"./config/config.js"})

const Bootcamp = require("./models/bootcamp")

mongoose.connect("mongodb://localhost:27017",{useNewUrlParser:true,  useCreateIndex: true,useUnifiedTopology: true })

const bootcamp = JSON.parse(fs.readFileSync(`${__dirname}/_data/bootcamp.json`,'utf-8'))

const importData=async()=>{
try {
    await Bootcamp.create(bootcamp)
    console.log('imported successfully')
    process.exit()
} catch (error) {
    console.log(error)
}}

const deleteData=async()=>{
    try {
        await Bootcamp.deleteMany(bootcamp)
        console.log('deleted successfully')
    process.exit()

    } catch (error) {
        console.log(error)
    }}



    if(process.argv[2]==='-i'){
        importData()
    }
    else if(process.argv[2]==='-d'){
        deleteData()
    }