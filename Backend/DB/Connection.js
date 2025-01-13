const mongoose = require('mongoose');
const dotenv = require("dotenv");
dotenv.config();

const connect = () =>{
  try {
    mongoose.connect(process.env.MONGODB_URI,{
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  }
  catch (error) {
    console.log("Error connecting to MongoDB",error);
  }
} 

module.exports = connect;