const mongoose=require('mongoose')

const userschema= new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    phone: {type: String, required: true},
    date: {type: String, required: true},
},
{timestamps: true}
)

module.exports= mongoose.model("users_account", userschema)