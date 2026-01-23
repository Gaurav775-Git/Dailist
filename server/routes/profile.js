const express=require('express')
const router=express.Router()
const userprofile=require('../models/user_profile')
const  auth  = require('../middleware/auth')

router.get("/profile",auth,async(req,res)=>{
    try {
        const  userid=req.userId;
        const profile=await userprofile.findOne({user_id:userid})
        if(!profile){
            return res.status(400).json({message:"profile not found"})
        }
        
        res.status(200).json({
            success:true,
            profile
        });
        
    } catch (error) {
        console.log(error,"user not get")
        res.status(500).json({message:"user not get go and create account"})
    }

})

module.exports=router