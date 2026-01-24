const express=require('express')
const router= express.Router()
const userpost=require("../models/userpost")
const auth=require("../middleware/auth")

router.post("/userpost",auth,async(req,res)=>{
    try {

      const {text}=req.body
    if(!text){
        return res.status(400).json({message:"text is required"})
      }
     const savedpost= await userpost.create({
        userpost_id:req.userId,
        text:text
      })
      const fullpost= await savedpost.populate("userpost_id")
       res.status(200).json({message:"post created",fullpost})
      

    } catch (error) {
        console.log(error,"user not get")
        res.status(500).json({message:"user not get go and create account"})
    }
    
})

module.exports=router