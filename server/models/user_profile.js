const mongoose=require('mongoose')
const profileschema= new mongoose.Schema({

    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"users_account",
        required:true,
        unique:true
    },

    username:{type: String, required: true},
    bio: {type: String, required: true},
    image:{type: String, required:true}

},{timestamps: true})

module.exports = mongoose.model("users_profile", profileschema)