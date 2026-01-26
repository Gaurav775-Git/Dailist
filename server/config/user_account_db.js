const mongoose=require('mongoose')
require("dotenv").config();

 const connectdb=async ()=>{
   try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("db atlas connected");
    
   } catch (error) {
    console.log(error.message);
   }    
}
module.exports=connectdb