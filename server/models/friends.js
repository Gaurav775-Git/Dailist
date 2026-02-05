const  mongoose=require("mongoose")

const friendschema= new mongoose.Schema({
    from:{ type:mongoose.Schema.Types.ObjectId, ref:"user_account"},
    to:{ type:mongoose.Schema.Types.ObjectId, ref:"user_account"},
    status:{type:String,default: "pending"}

})

module.exports= mongoose.model("friends",friendschema)