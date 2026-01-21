const mongoose=require('mongoose')

 const connectdb=async ()=>{
   try {
    await mongoose.connect("mongodb://localhost:27017/dailist");
    console.log("db connected");
    
   } catch (error) {
    console.log(error.message);
   }    
}
module.exports=connectdb