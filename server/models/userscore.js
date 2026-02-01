const mongoose =require("mongoose")
const userscore=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users_account",
        required:true,

    },
    score:{type:Number,
        required:true
    }

},{timestamps:true})

module.exports=mongoose.model("user_score",userscore)