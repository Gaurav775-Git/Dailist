const mongoose = require("mongoose");

const userpostschema= new mongoose.Schema({
     userpost_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users_account",
        required:true,
     },
     text:{
        type:String,
        required:true
     },
     
    
},{
    timestamps: true
})

module.exports = mongoose.model("userpost", userpostschema)