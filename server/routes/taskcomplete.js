const express= require("express")
const router= express.Router()
const userdailytask= require ("../models/Dailytask")
const auth =require("../middleware/auth")

router.post("/complete_task",auth,async(req,res)=>{

    const  change=req.body
    const  user_id=req.userID

    const info=await userdailytask.findOne({
        user:user_id
    })
    
    const changes= await userdailytask.findOneAndUpdate({
        user:user_id,

    })


})

module.exports=router