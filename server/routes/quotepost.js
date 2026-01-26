const express=require("express")
const router= express.Router()

const userprofile= require("../models/user_profile")
const auth=require("../middleware/auth")

router.post("/updatequote",auth,async(req,res)=>{

     const {quote}=req.body
     const user=req.userId
     if(!quote){
         return res.status(400).json({message:"quote is required"})
     }
     console.log(quote)
      await userprofile.findOneAndUpdate({user_id:user},{bio:quote})

      return res.status(200).json({message:"quote updated",bio:quote})
    
})

module.exports=router