const express=require('express')
const bcrypt=require('bcryptjs')
const router=express.Router()
const user=require('../models/user_account.js')
router.post("/register",async(req,res)=>{
    const {name,email,password,phone,date}=req.body
    
    const exist=await user.findOne({email})
    if(exist){
        return  res.status(400).json({message:"email already exist"});
    }
    const salt=await bcrypt.genSalt(10);

    const hashedpassword=await bcrypt.hash(password,salt);

    const userdetails= await user.create({
        name,
        email,
        password:hashedpassword,
        phone,
        date
    })

   res.status(200).json({message:"user created",userdetails})
})
module.exports=router