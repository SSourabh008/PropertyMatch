const express=require('express');
const mongoose=require('mongoose');
const dotenv=require('dotenv').config();
const cors=require('cors');

const { MongoClient } = require('mongodb');
const authController = require('./controllers/authControler');
const propertyController = require('./controllers/propertyController');
const uploadController = require('./controllers/uploadController');
const app=express();

//connecting to database
// mongoose.connect();


const connectDB = async () => {
    try {
      const conn = await mongoose.connect("mongodb://localhost:27017/RealEstate");
  
      console.log("Mongo Db connected sucessfully");
    } catch (error) {
      console.log(error);
      process.exit();
    }
  };


connectDB();

app.use('/images',express.static('public/images'))
//routes & middelware
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({
    extended:true
}))
app.use("/auth",authController)
app.use("/property",propertyController)
app.use("/upload",uploadController)

app.listen(5000,()=>{
    console.log("Server started sucessfully")
})